class JsTable {
    constructor() {}

    gerarTable(tableId, header, dados = [], isExibirTotais = false, isExibirRowCount = true) {
    	let tableIdSelector = '#'+tableId;
        this.gerarTableHeader(tableIdSelector, header);
        this.gerarTableRows(tableIdSelector, header, dados);
        if (isExibirRowCount) {
            this.gerarTableRowCount(tableIdSelector, header, dados);
        }
        if (isExibirTotais) {
            this.gerarTableTotal(tableIdSelector, header, dados);
        }
        this.inicializarTable(tableIdSelector);
    }

    gerarTableHeader(tableId, header) {
        const table = $(tableId);
        const thead = $('<thead>');
        const headerRow = $('<tr>');
        header.forEach(col => {
            const th = $('<th>');
            th.addClass('text-center');
            th.attr('scope', 'col').css('width', col.width || 'auto')
            
            if (col.sortable) {
            	th.addClass('sortable');
            	th.attr('data-type', col.type || 'text')
                .attr('data-mask', col.mask || '')
                .attr('data-field', col.field || '')
                .attr('data-align', col.align || 'left');
                th.html(`${col.label} <i class="bi bi-arrow-down-up"></i>`);
            } else if (col.actions) {
                th.attr('data-actions', JSON.stringify(col.actions));
                th.addClass('text-center');
                th.html('AÃ§Ãµes');
            } else if (col.isCheckbox) {
                th.addClass('text-center');
                th.html('<input type="checkbox" class="form-check-input check-all">');
            } else {
            	th.attr('data-type', col.type || 'text')
                .attr('data-mask', col.mask || '')
                .attr('data-field', col.field || '')
                .attr('data-align', col.align || 'left');
                th.text(col.label);
            }
            if (col.content) th.html(col.content);
            headerRow.append(th);
        });
        thead.append(headerRow);
        table.append(thead);
    }

    gerarTableRows(tableId, header, dados) {
        const table = $(tableId);
        const tbody = $('<tbody>');
        const actionsConfig = JSON.parse(table.find('thead th[data-actions]').attr('data-actions') || '[]');
        const hasCheckbox = table.find('thead th:has(input[type="checkbox"])').length > 0;
        
        if (dados.length > 0) {
	        dados.forEach(item => {
	            const row = $('<tr></tr>');
	            if (hasCheckbox) {
	                const checkbox = $('<td style="text-align: center;"><input type="checkbox" class="form-check-input check-item"></td>');
	                row.append(checkbox);
	            }
	            if (actionsConfig.length > 0) {
	                const actionsCell = $('<td class="actions" style="text-align: center;"></td>');
	                actionsConfig.forEach(action => {
	                    const button = $(`<button type="button" class="btn ${action.class || 'btn-primary'}" style="margin: 0 0.125rem;">${action.label}</button>`);
	                    button.on('click', () => window[action.onClick](item));
	                    actionsCell.append(button);
	                });
	                row.append(actionsCell);
	            }
	            this.ajustarCelulasTable(table, row, item);
	            tbody.append(row);
	        });
        } else {
        	const row = $(`<tr class="row-not-found"><td colspan="${header.length}">Nenhum registro foi encontrado.</td></tr>`);
        	tbody.append(row);
        }
        table.append(tbody);
    }
    
    inicializarTable(tableId) {
    	this.inicializarChkAllTable(tableId);
    	this.inicializarSortTable(tableId);
    }
    
    inicializarChkAllTable(tableId) {
    	const instance = this;
   		$(tableId + ' .check-all').on('change', function () {
   			const table = $(this).closest('table');
    	    const checked = this.checked;
    	    $(table).find('.check-item').prop('checked', checked);
    	    $(this).prop('indeterminate', false);
   	  	});

   	  	$(tableId + ' .check-item').on('change', function () {
   	  	instance.updateCheckAllStateTable(tableId);
   	  	});
    }
    
    updateCheckAllStateTable(tableId) {
	    const $table = $(tableId);
	    const $checkAll = $table.find('.check-all');
	    const $items = $table.find('.check-item');
	    const total = $items.length;
	    const checked = $items.filter(':checked').length;

	    $checkAll.prop('indeterminate', checked > 0 && checked < total);
	    $checkAll.prop('checked', checked === total);
	}
    
    inicializarSortTable(tableId) {
    	const instance = this;
    	$(tableId + ' .sortable').on('click', function () {
    	    const $header = $(this);
    	    const $table = $header.closest('table');
    	    const columnIndex = $header.index();
    	    const isAsc = !$header.hasClass('asc');
    	    const type = $header.data('type') || 'string';
    	    const mask = $header.data('mask') || '';
    	    const $sortable = $table.find('.sortable');
    	    const $tbody = $table.find('tbody');
    	    
    	    $sortable.removeClass('asc desc');
    	    $sortable.find('i').removeClass('bi-arrow-down-up bi-sort-up bi-sort-down');
    	    $sortable.find('i').addClass('bi-arrow-down-up');
    	    
    	    if (isAsc) {
    	        $header.addClass('asc').find('i').addClass('bi-sort-up');
    	    } else {
    	        $header.addClass('desc').find('i').addClass('bi-sort-down');
    	    }
    	    
    	    const $rows = $tbody.find('tr').get();

    	    $rows.sort((a, b) => {
    	    	const aText = $(a).children().eq(columnIndex).text().toLowerCase();
    	      	const bText = $(b).children().eq(columnIndex).text().toLowerCase();
    	      
    	      	const aValue = instance.parseValue(aText, type);
    	      	const bValue = instance.parseValue(bText, type);
    	      
    	      	if (type === "number" || type === "date") {
                  	return isAsc ? aValue - bValue : bValue - aValue;
              	}

              	return isAsc ? aValue.localeCompare(bValue) : bValue.localeCompare(aValue);
    	    });

    	    $.each($rows, (_, row) => $tbody.append(row));
		});
    }
    
    ajustarCelulasTable(table, row, item) {
        const ths = table.find('thead th').not('[data-actions]').not(':has(input[type="checkbox"])');
        ths.each((index, th) => {
            const $th = $(th);
            const field = $th.data('field') || Object.keys(item)[index];
            const valor = item[field] || "";
            const tipo = $th.data('type');
            const mascara = $th.data('mask');
            const align = $th.data('align') || 'left';
            const cell = $('<td></td>').css('text-align', align);

            if (mascara && tipo) {
                if (tipo === 'number') {
                    cell.text(this.aplicarMascaraNumber(valor, mascara));
                } else if (tipo === 'date') {
                	const timestamp = this.parseValue(valor, tipo, mascara);
                    cell.text(this.formatarData(timestamp));
                } else {
                    cell.text(this.aplicarMascara(valor, mascara));
                }
            } else {
                cell.text(valor);
            }

            row.append(cell);
        });
    }

    gerarTableRowCount(tableId, header, dados) {
        const table = $(tableId);
        const tfoot = $('<tfoot>');
        const tfootRow = $(`
            <tr>
                <td colspan="${header.length}">
                    <div class="row gx-3">
                        <label class="col-auto col-form-label">Quantidade:</label>
                        <div class="col-auto">
                            <input type="text" class="form-control-plaintext row-count-table" value="${dados.length}" readonly>
                        </div>
                    </div>
                </td>
            </tr>
        `);
        tfoot.append(tfootRow);
        table.append(tfoot);
        const input = table.find('tfoot input.row-count-table');
        this.updateRowCountTable(table, input);
        const tbody = table.find('tbody');
        const observer = new MutationObserver(() => this.updateRowCountTable(table, input));
        observer.observe(tbody[0], { childList: true });
    }
    
    updateRowCountTable(table, input) {
   		const rowCount = table.find('tbody tr:not(.row-not-found)').length;
   		input.val(rowCount);
	}
    
    gerarTableTotal(tableId, header, dados) {
        const table = $(tableId);
        const tfoot = table.find('tfoot').length ? table.find('tfoot') : $('<tfoot>');
        const tfootRow = $('<tr class="table-secondary table-totals">');

        header.forEach((col, index) => {
        	const align = col.align || 'left';  
            const cell = $('<td></td>').css('text-align', align);
            cell.attr('data-field', col.field || '');
            
            if (col.total) {
                const total = dados.reduce((acc, item) => {
                    const valor = this.parseValue(item[col.field], 'number', col.mask || '');
                    return acc + (isNaN(valor) ? 0 : valor);
                }, 0);
                
                const totalFormatado = this.aplicarMascaraNumber(total, col.mask || '#.##0,00');
                cell.text(totalFormatado);
            }
            
            tfootRow.append(cell);
        });

        table.append(tfoot.prepend(tfootRow));

        const tbody = table.find('tbody');
        const observer = new MutationObserver(() => this.updateTableTotals(table, header));
        observer.observe(tbody[0], { childList: true, subtree: true });

        if (!table.data('observer')) {
            table.data('observer', observer);
        }
    }
    
    updateTableTotals(table, header) {
        const tbody = table.find('tbody');
        const rows = tbody.find('tr');
        const totals = {};

        header.forEach(col => {
            const th = table.find(`thead th[data-field="${col.field}"]`);
            if (col.type === 'number' && col.total) {
                totals[col.field] = 0;
            }
        });

        rows.each((_, row) => {
            $(row).find('td').each((index, cell) => {
                const col = header[index];
                const field = col.field;
                const valor = $(cell).text().trim();

                if (col.type === 'number' && col.total && field) {
                    const numero = this.parseValue(valor, 'number', col.mask || '#.##0,00');
                    if (!isNaN(numero)) {
                        totals[field] += numero;
                    }
                }
            });
        });

        const tfootRow = table.find('tfoot tr');
        header.forEach((col, index) => {
            if (col.type === 'number' && col.total && col.field) {
                const total = totals[col.field] || 0;
                const totalFormatado = this.aplicarMascaraNumber(total, col.mask || '#.##0,00');
                
                const cell = tfootRow.find(`td[data-field="${col.field}"]`);
                cell.text(totalFormatado);
            }
        });
    }

    aplicarMascaraNumber(valor, mascara) {
        const temDecimal = /[,]/.test(mascara);
        let input;
        if (!temDecimal) {
            input = $('<input>').val(valor);
            input.mask(mascara, { reverse: true });
            return input.val();
        }
        
        let casasDecimais = 0;
        if (temDecimal) {
            const partes = mascara.split(/[,]/);
            if (partes.length > 1) {
                casasDecimais = partes[1].length;
            }
        }
        
        if (typeof valor === "string") {
            valor = valor.replace(/[^\d,\.]/g, '').replace(',', '.');
        }
        
        let valorNumerico = parseFloat(valor);
        if (isNaN(valorNumerico)) return '';
        if (casasDecimais > 0) {
            valorNumerico = valorNumerico.toFixed(casasDecimais);
        }
        
        input = $('<input>').val(valorNumerico);
        input.mask(mascara, { reverse: true });
        return input.val();
    }

    aplicarMascara(valor, mascara) {
        const input = $('<input>').val(valor);
        input.mask(mascara);
        return input.val();
    }
    
    formatarData(data, formato = null) {
        if (!data) return "";
        const dateObj = new Date(data);
        if (isNaN(dateObj.getTime())) return "";

        const dia = String(dateObj.getDate()).padStart(2, '0');
        const mes = String(dateObj.getMonth() + 1).padStart(2, '0');
        const ano = String(dateObj.getFullYear());
        const meses = ["janeiro", "fevereiro", "marï¿½o", "abril", "maio", "junho", "julho", "agosto", "setembro", "outubro", "novembro", "dezembro"];

        const usadoFormato = formato || this.detectedDateFormat || this.dataFormat;

        switch (usadoFormato) {
            case "DD/MM/YYYY":
                return `${dia}/${mes}/${ano}`;
            case "MM/DD/YYYY":
                return `${mes}/${dia}/${ano}`;
            case "YYYY-MM-DD":
                return `${ano}-${mes}-${dia}`;
            case "DD de MMMM de YYYY":
                return `${dia} de ${meses[dateObj.getMonth()]} de ${ano}`;
            default:
                return `${dia}/${mes}/${ano}`;
        }
    }
    
    parseValue(value, type, mask) {
    	if (!value) {
    		return 0;
      	}
        value = value.trim();

        if (type === "number" || (mask && mask.includes("#"))) {
        	const matches = value.match(/-?\d+([.,]?\d+)*%?/g);
            if (matches && matches.length > 0) {
            	let cleaned = matches[0];
              	const isPercentage = cleaned.includes("%");
              	cleaned = cleaned.replace("%", "").replace(/\.(?=\d{3})/g, "").replace(",", ".");

              	const parsedNumber = parseFloat(cleaned);
              	if (isNaN(parsedNumber)) {
              		return 0;
              	} else if (isPercentage) {
              		return parsedNumber / 100;
              	}
              	return parsedNumber;
            }
            return 0;
            
        }

        // Trata datas com detecï¿½ï¿½o automï¿½tica
        if (type === "date") {
            // Normaliza para evitar problemas com acentos
            value = value.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase();

            // Tenta detectar e converter os formatos suportados
            const isoMatch = value.match(/^\d{4}-\d{2}-\d{2}$/);
            const brMatch = value.match(/^\d{2}\/\d{2}\/\d{4}$/);
            const usMatch = value.match(/^\d{2}\/\d{2}\/\d{4}$/);
            const extensoMatch = value.match(/^(\d{1,2}) de ([a-z]+) de (\d{4})$/);

            if (isoMatch) {
                this.detectedDateFormat = "YYYY-MM-DD";
                return new Date(value).getTime();
            }

            if (brMatch) {
                const [day, month, year] = value.split("/").map(Number);
                this.detectedDateFormat = "DD/MM/YYYY";
                return new Date(year, month - 1, day).getTime();
            }

            if (usMatch) {
                const [month, day, year] = value.split("/").map(Number);
                this.detectedDateFormat = "MM/DD/YYYY";
                return new Date(year, month - 1, day).getTime();
            }

            if (extensoMatch) {
                const [, day, monthName, year] = extensoMatch;
                const meses = ["janeiro", "fevereiro", "marco", "abril", "maio", "junho", "julho", "agosto", "setembro", "outubro", "novembro", "dezembro"];
                const monthIndex = meses.indexOf(monthName) + 1;
                this.detectedDateFormat = "DD de MMMM de YYYY";
                return new Date(Number(year), monthIndex - 1, Number(day)).getTime();
            }

            // Fallback para 0 se nï¿½o reconhecer o formato
            return 0;
        }

        return value.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase();
    }
}
const jsTable = new JsTable();