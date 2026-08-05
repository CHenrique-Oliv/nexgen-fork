/**
 * Classe responsável pela gestão de alertas modais customizados
 * com suporte a diferentes tipos de severidade e funcionamento em iframes
 */
class JsAlerts {
	/**
	 * Construtor da classe
	 * Inicializa as propriedades e configura o rastreamento do elemento ativo
	 */
	constructor() {
		// Elemento atualmente em foco para restaurar após fechar o alert
		this.activeEl = null;
		
		// Inicializa os eventos de rastreamento de foco
		this.initFocusTracking();
	}

	/**
	 * Inicializa o rastreamento de elementos em foco
	 * Captura elementos nativos e elementos Select2 adicionados dinamicamente
	 */
	initFocusTracking() {
		const instance = this;

		// Aguarda o DOM estar completamente carregado
		document.addEventListener('DOMContentLoaded', function () {
			// Captura para elementos nativos já presentes no DOM
			document.querySelectorAll('input[type=text], input[type=checkbox], input[type=radio], select, textarea')
				.forEach(function (item) {
					item.addEventListener('focus', function (e) {
						instance.activeEl = e.target;
					});
				});

			// Delegação para elementos do Select2 que podem ser adicionados depois
			document.addEventListener('mousedown', function (e) {
				const select2 = e.target.closest('.form-select2');
				if (select2) {
					instance.activeEl = select2;
				}
			});

			// Evento adicional para captura de foco em Select2
			document.addEventListener('focusin', function (e) {
				const select2 = e.target.closest('.form-select2');
				if (select2) {
					instance.activeEl = select2;
				}
			});
		});
	}

	/**
	 * Exibe um alert modal customizado com diferentes tipos de severidade
	 * Suporta funcionamento em iframes aninhados e múltiplos alertas empilhados
	 * @param {string} msg - Mensagem do alert (pode incluir prefixo de severidade: #INFO;, #WARN;, #DANGER;, #SUCC;)
	 * @param {function|null} onClose - Callback executado ao fechar o alert
	 * @param {boolean} exibirBtnFechar - Define se o botão fechar deve ser exibido (padrão: true)
	 */
	alert(msg, onClose = null, exibirBtnFechar = true) {
		// Detecta o documento correto considerando estruturas de iframe aninhados
		let iframe = this.detectIframeDocument();
		
		if (iframe != null) {
			let body = iframe.body;
			
			// Processa a mensagem e extrai severidade se presente
			const { severity, texto } = this.processMessage(msg);
			
			// Define configurações visuais baseadas na severidade
			const { severityClass, title, iconTitle } = this.getSeverityConfig(severity);
			
			// Verifica se já existe um container de alert
			let div = iframe.getElementById("alert");
			
			if (div == null) {
				// Cria novo container de alert
				div = this.createAlertContainer(iframe, body, title, iconTitle, severityClass, texto, exibirBtnFechar, onClose);
			} else {
				// Adiciona alert empilhado ao container existente
				this.addStackedAlert(iframe, severityClass, texto);
			}
		}
	}

	/**
	 * Detecta o documento correto navegando pela hierarquia de iframes
	 * Suporta até 3 níveis de aninhamento de iframes
	 * @returns {Document} Documento do iframe ou documento principal
	 */
	detectIframeDocument() {
		let iframe;
		
		// Primeira tentativa: parent.parent.iframe
		if (parent.parent.iframe != null) {
			iframe = parent.parent.iframe.document;
		}
		
		// Segunda tentativa: parent.parent.parent.iframe
		if (iframe == null) {
			if (parent.parent.parent.iframe != null) {
				iframe = parent.parent.parent.iframe.document;
			}
		}
		
		// Fallback: documento atual
		if (iframe == null) {
			iframe = document;
		}
		
		return iframe;
	}

	/**
	 * Processa a mensagem de entrada extraindo severidade e texto
	 * Suporta prefixos de severidade no formato #TIPO; seguido da mensagem
	 * @param {string} msg - Mensagem de entrada
	 * @returns {object} Objeto com severity e array de texto separado por linhas
	 */
	processMessage(msg) {
		let severity = null;
		let texto;
		
		// Verifica se a mensagem contém prefixo de severidade
		if (msg.indexOf("#INFO;") !== -1 || msg.indexOf("#WARN;") !== -1 || 
			msg.indexOf("#DANGER;") !== -1 || msg.indexOf("#SUCC;") !== -1) {
			
			// Extrai severidade entre # e ;
			severity = msg.substring(msg.indexOf("#") + 1, msg.indexOf(";"));
			
			// Extrai texto após o ; e separa por linhas
			texto = msg.substring(msg.indexOf(";") + 1).split("\n");
		} else {
			// Sem severidade definida, separa texto por linhas
			texto = msg.split("\n");
		}
		
		return { severity, texto };
	}

	/**
	 * Retorna configurações visuais baseadas no tipo de severidade
	 * Define classe CSS, título e ícone SVG apropriados
	 * @param {string|null} severity - Tipo de severidade (INFO, WARN, DANGER, SUCC)
	 * @returns {object} Objeto com severityClass, title e iconTitle
	 */
	getSeverityConfig(severity) {
		let severityClass = "warning";
		let title = "Atenção";
		let iconTitle = '<svg xmlns="http://www.w3.org/2000/svg" class="alert-icon-title" viewBox="0 0 16 16" role="img" aria-label="Warning:"><path d="M8.982 1.566a1.13 1.13 0 0 0-1.96 0L.165 13.233c-.457.778.091 1.767.98 1.767h13.713c.889 0 1.438-.99.98-1.767L8.982 1.566zM8 5c.535 0 .954.462.9.995l-.35 3.507a.552.552 0 0 1-1.1 0L7.1 5.995A.905.905 0 0 1 8 5zm.002 6a1 1 0 1 1 0 2 1 1 0 0 1 0-2z"/></svg>';

		if (severity == "DANGER") {
			severityClass = "danger";
			title = "Erro";
			iconTitle = '<svg xmlns="http://www.w3.org/2000/svg" class="alert-icon-title" viewBox="0 0 16 16" role="img" aria-label="Danger:"><path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0M5.354 4.646a.5.5 0 1 0-.708.708L7.293 8l-2.647 2.646a.5.5 0 0 0 .708.708L8 8.707l2.646 2.647a.5.5 0 0 0 .708-.708L8.707 8l2.647-2.646a.5.5 0 0 0-.708-.708L8 7.293z"/></svg>';
		} else if (severity == "INFO") {
			severityClass = "info";
			title = "Informação";
			iconTitle = '<svg xmlns="http://www.w3.org/2000/svg" class="alert-icon-title" viewBox="0 0 16 16" role="img" aria-label="Info:"><path d="M8 16A8 8 0 1 0 8 0a8 8 0 0 0 0 16zm.93-9.412-1 4.705c-.07.34.029.533.304.533.194 0 .487-.07.686-.246l-.088.416c-.287.346-.92.598-1.465.598-.703 0-1.002-.422-.808-1.319l.738-3.468c.064-.293.006-.399-.287-.47l-.451-.081.082-.381 2.29-.287zM8 5.5a1 1 0 1 1 0-2 1 1 0 0 1 0 2z"/></svg>';
		} else if (severity == "WARN") {
			severityClass = "warning";
			title = "Atenção";
			iconTitle = '<svg xmlns="http://www.w3.org/2000/svg" class="alert-icon-title" viewBox="0 0 16 16" role="img" aria-label="Warning:"><path d="M8.982 1.566a1.13 1.13 0 0 0-1.96 0L.165 13.233c-.457.778.091 1.767.98 1.767h13.713c.889 0 1.438-.99.98-1.767L8.982 1.566zM8 5c.535 0 .954.462.9.995l-.35 3.507a.552.552 0 0 1-1.1 0L7.1 5.995A.905.905 0 0 1 8 5zm.002 6a1 1 0 1 1 0 2 1 1 0 0 1 0-2z"/></svg>';
		} else if (severity == "SUCC") {
			severityClass = "success";
			title = "Sucesso";
			iconTitle = '<svg xmlns="http://www.w3.org/2000/svg" class="alert-icon-title" viewBox="0 0 16 16" role="img" aria-label="Success:"><path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zm-3.97-3.03a.75.75 0 0 0-1.08.022L7.477 9.417 5.384 7.323a.75.75 0 0 0-1.06 1.06L6.97 11.03a.75.75 0 0 0 1.079-.02l3.992-4.99a.75.75 0 0 0-.01-1.05z"/></svg>';
		}

		return { severityClass, title, iconTitle };
	}

	/**
	 * Cria um novo container de alert modal com estrutura HTML completa
	 * Inclui header, body, footer e eventos de interação
	 * @param {Document} iframe - Documento onde criar o alert
	 * @param {HTMLElement} body - Elemento body do documento
	 * @param {string} title - Título do alert
	 * @param {string} iconTitle - HTML do ícone do título
	 * @param {string} severityClass - Classe CSS da severidade
	 * @param {Array} texto - Array de linhas de texto
	 * @param {boolean} exibirBtnFechar - Se deve exibir botão fechar
	 * @param {function|null} onClose - Callback de fechamento
	 * @returns {HTMLElement} Elemento div do alert criado
	 */
	createAlertContainer(iframe, body, title, iconTitle, severityClass, texto, exibirBtnFechar, onClose) {
		const instance = this;
		
		// Cria elemento container principal
		let div = document.createElement("div");
		div.setAttribute("id", "alert");
		div.className = "alert alert-fade";

		// Constrói HTML da estrutura do alert
		let html = '<div class="alert-dialog">'
			+ ' <div class="alert-content">'
			+ '  <div class="alert-header">'
			+ iconTitle
			+ '   <h1 class="alert-title">' + title + '</h1>'
			+ '  </div>'
			+ '  <div id="bodyAlert" class="alert-body">'
			+ '   <div class="alert-severity alert-' + severityClass + '">';

		// Adiciona parágrafos do texto
		if (texto.length > 0) {
			texto.forEach(function (item, index) {
				html += '    <p>' + item + '</p>';
			});
		}

		html += '   </div>'
			+ '  </div>';

		// Adiciona footer com botão fechar se solicitado
		if (exibirBtnFechar == null || exibirBtnFechar == true) {
			html += '  <div class="alert-footer">'
				+ '   <button id="btnFecharAlert" type="button" class="btn btn-fechar">Fechar</button>'
				+ '  </div>';
		}

		html += ' </div>'
			+ '</div>';

		div.innerHTML = html;
		body.appendChild(div);

		// Animação de entrada e foco no botão
		setTimeout(function () {
			div.classList.add("alert-show");

			if (exibirBtnFechar == null || exibirBtnFechar == true) {
				iframe.getElementById("btnFecharAlert").focus();
			}
		}, 500);

		// Configura eventos do botão fechar se presente
		if (exibirBtnFechar == null || exibirBtnFechar == true) {
			this.setupCloseButton(iframe, body, onClose);
		}

		// Evento de clique no background para focar no botão
		div.addEventListener('mouseup', function (e) {
			let btnFecharAlert = iframe.getElementById("btnFecharAlert");
			if (btnFecharAlert) {
				btnFecharAlert.focus();
			}
		});

		return div;
	}

	/**
	 * Adiciona um alert empilhado ao container existente
	 * Permite múltiplos alertas no mesmo modal
	 * @param {Document} iframe - Documento do iframe
	 * @param {string} severityClass - Classe CSS da severidade
	 * @param {Array} texto - Array de linhas de texto
	 */
	addStackedAlert(iframe, severityClass, texto) {
		const divBodyAlert = iframe.getElementById("bodyAlert");

		// Cria div para alert empilhado
		const div = document.createElement("div");
		div.className = 'alert-severity alert-stack alert-' + severityClass;

		// Constrói HTML do conteúdo
		let html = '';
		if (texto.length > 0) {
			texto.forEach(function (item, index) {
				html += '    <p>' + item + '</p>';
			});
		}

		div.innerHTML = html;
		divBodyAlert.appendChild(div);
	}

	/**
	 * Configura eventos de interação do botão fechar
	 * Suporta clique do mouse e tecla Enter, previne propagação de Tab
	 * @param {Document} iframe - Documento do iframe
	 * @param {HTMLElement} body - Elemento body do documento
	 * @param {function|null} onClose - Callback de fechamento
	 */
	setupCloseButton(iframe, body, onClose) {
		const instance = this;
		const btnFecharAlert = iframe.getElementById("btnFecharAlert");

		// Evento de clique do mouse
		btnFecharAlert.addEventListener('mouseup', function (e) {
			if (e.which === 1) { // Clique esquerdo
				e.preventDefault();
				e.stopPropagation();

				instance.closeAlert(iframe, body, onClose);
			}
		});

		// Evento de teclado
		btnFecharAlert.addEventListener('keydown', function (e) {
			if (e.keyCode == 13) { // Enter
				e.preventDefault();
				e.stopPropagation();

				instance.closeAlert(iframe, body, onClose);
			} else if (e.keyCode == 9) { // Tab
				// Previne navegação por Tab para manter foco no modal
				e.preventDefault();
				e.stopPropagation();
			}
		});
	}

	/**
	 * Executa o fechamento do alert com animação e cleanup
	 * Restaura o foco para o elemento anteriormente ativo
	 * @param {Document} iframe - Documento do iframe
	 * @param {HTMLElement} body - Elemento body do documento
	 * @param {function|null} onClose - Callback de fechamento
	 */
	closeAlert(iframe, body, onClose) {
		const instance = this;
		const div = iframe.getElementById("alert");
		
		// Inicia animação de saída
		div.classList.remove("alert-show");

		// Remove elemento do DOM após animação
		setTimeout(function () {
			body.removeChild(div);

			// Executa callback ou restaura foco
			if (typeof onClose === 'function') {
				onClose();
			} else if (instance.activeEl != null) {
				instance.activeEl.focus();
			}
		}, 100);
	}
}

// Instância global da classe para uso em toda a aplicação
const jsAlerts = new JsAlerts();

// Função global de conveniência que utiliza a instância da classe
function alert(msg, onClose = null, exibirBtnFechar = true) {
	jsAlerts.alert(msg, onClose, exibirBtnFechar);
}