import java.io.*;
import javax.servlet.*;
import javax.servlet.http.*;
import xseedRts.*;
import java.sql.ResultSet;
import java.util.HashMap;
import java.util.Map;
import org.json.JSONArray;



public class PagBotoesNew extends TemplatePage
{
/** Fields */
private static final long serialVersionUID = -3227074934815371442L;


@DefaultInstances
DstraVO dstraVO;
RulNovidades rulNovidades;

/** Controls */
XseedTag    tagBotoes;
XseedIFrame    ifrTransacoes;
XseedTag    tagCsc;
XseedTag    tagScripts;
XseedTextbox    txtAcao;
XseedTextbox    txtAcaoConfirmada;
XseedTextbox    txtAutorizacao;
XseedTextbox    txtBotoesBloq;
XseedTextbox    txtCampoAcao;
XseedTextbox    txtCampoCursor;
XseedTextbox    txtCamposRetorno;
XseedTextbox    txtCamposSalvar;
XseedTextbox    txtCodTra;
XseedTextbox    txtControleIsSubmited;
XseedTextbox    txtHelp;
XseedTextbox    txtJsonHidden;
XseedTextbox    txtInibirNovidades;
public void start(HttpServletRequest request, HttpServletResponse response)
   throws ServletException, IOException
{
    PagBotoesNew wPage = new PagBotoesNew();
    Rts wRts = new Rts();
    Msg wMsg = new Msg();
    try
    {
        wPage.cycle(request, response, wRts, wMsg);
    }
    catch (Exception e) { }
}
public String classDescription()
  throws Exception
{
    return "Paguina que renderiza os botões das transações";
}
public void classInitialize()
  throws Exception
{
    session.currentClass = "PagBotoesNew";
    session.currentVersion = "2026_07_29_154409";
}
public void rulesInitialize ()
  throws Exception
{
    super.rulesInitialize();
    rulNovidades = new RulNovidades(session);
    createRuleList(rulNovidades);
}

public void tablesInitialize ()
  throws Exception
{
    super.tablesInitialize();
    if(dstraVO == null) { dstraVO = new DstraVO(session); }
    createTableList(dstraVO);
}

public void associationsInitialize ()
    throws Exception
{
}

/** Fields */
public void fieldsInitialize()
  throws Exception
{
}
/** Controls */
public void formInitialize()
  throws Exception
{
    form = new XseedForm(session);
    form.name = "PagBotoes";
    form.visibleHeight = "2048";
    form.visibleWidth = "2048";
    form.caption = "PagBotoes";
    form.tabIndex = "-1";
    form.borderStyle = "None";
    form.fontFamily = "Verdana";
    form.fontSize = "11";
    form.fontStyle = "normal";
    form.fontWeight = "normal";
    form.marginRight = "0";
    form.marginLeft = "0";
    form.paddingRight = "0";
    form.paddingLeft = "0";
}
public void controlsInitialize() throws Exception
{
    super.controlsInitialize();
    tagBotoes_Initialize();
    ifrTransacoes_Initialize();
    tagCsc_Initialize();
    tagScripts_Initialize();
    txtAcao_Initialize();
    txtAcaoConfirmada_Initialize();
    txtAutorizacao_Initialize();
    txtBotoesBloq_Initialize();
    txtCampoAcao_Initialize();
    txtCampoCursor_Initialize();
    txtCamposRetorno_Initialize();
    txtCamposSalvar_Initialize();
    txtCodTra_Initialize();
    txtControleIsSubmited_Initialize();
    txtHelp_Initialize();
    txtJsonHidden_Initialize();
    txtInibirNovidades_Initialize();
}
public void tagBotoes_Initialize() throws Exception
{
   tagBotoes = new XseedTag(form);
   tagBotoes.name = "tagBotoes";
   tagBotoes.left = 459;
   tagBotoes.top = 6;
   tagBotoes.width = 278;
   tagBotoes.height = 9;
   tagBotoes.encapsulated = "False";
}
public void ifrTransacoes_Initialize() throws Exception
{
   ifrTransacoes = new XseedIFrame(form);
   ifrTransacoes.name = "ifrTransacoes";
   ifrTransacoes.left = 0;
   ifrTransacoes.top = 21;
   ifrTransacoes.width = 780;
   ifrTransacoes.height = 538;
   ifrTransacoes.scrolling = "Auto";
   ifrTransacoes.tabIndex = "-1";
   ifrTransacoes.borderStyle = "None";
   ifrTransacoes.borderWidth = "0";
   ifrTransacoes.overflowX = "Auto";
   ifrTransacoes.overflowY = "Auto";
}
public void tagCsc_Initialize() throws Exception
{
   tagCsc = new XseedTag(form);
   tagCsc.name = "tagCsc";
   tagCsc.left = 93;
   tagCsc.top = 4;
   tagCsc.width = 26;
   tagCsc.height = 14;
   tagCsc.addHtml("<LINK REL=StyleSheet HREF=\"../css/style.css\" TYPE=\"text/css\" MEDIA=screen>");
   tagCsc.addHtml("<LINK REL=StyleSheet HREF=\"../css/PagBotoes.css\" TYPE=\"text/css\" MEDIA=screen> ");
   tagCsc.addHtml("<LINK REL=StyleSheet HREF=\"../css/RedimencionarNexgen.css\" TYPE=\"text/css\" MEDIA=screen>");
   tagCsc.addHtml("<link href=\"../css/botoes.css\" rel=\"stylesheet\" type=\"text/css\" />");
   tagCsc.addHtml("");
   tagCsc.encapsulated = "False";
   tagCsc.addScript("");
}
public void tagScripts_Initialize() throws Exception
{
   tagScripts = new XseedTag(form);
   tagScripts.name = "tagScripts";
   tagScripts.left = 45;
   tagScripts.top = 3;
   tagScripts.width = 26;
   tagScripts.height = 14;
   tagScripts.addHtml("<script src=\"../JavaScript/barraprogresso.js\" type=\"text/javascript\"></script>");
   tagScripts.addHtml("<script src=\"../JavaScript/JsPropriedadesBotao.js\" type=\"text/javascript\"></script>");
   tagScripts.addHtml("");
   tagScripts.addHtml("<script src=\"../JavaScript/JsAutorizacao.js\" type=\"text/javascript\"></script>");
   tagScripts.addHtml("<script src=\"../JavaScript/JsObjetos.js\" type=\"text/javascript\"></script>");
   tagScripts.addHtml("<script>");
   tagScripts.addHtml("if(typeof barraProgressoAjax == \"undefined\"){");
   tagScripts.addHtml("	barraProgressoAjax = createBar(320,15,'lightyellow',1,'black','green',50,7,9999,'','');");
   tagScripts.addHtml("	barraProgressoAjax.hideBar();");
   tagScripts.addHtml("");
   tagScripts.addHtml("}");
   tagScripts.addHtml("/*");
   tagScripts.addHtml("	variaveis");
   tagScripts.addHtml("*/");
   tagScripts.addHtml("var indicador_valor = '$valor_';");
   tagScripts.addHtml("var sep_retorno_1 = '$,';");
   tagScripts.addHtml("var sep_retorno_2 = '$=';");
   tagScripts.addHtml("var isFirstLoad = true;");
   tagScripts.addHtml("/*");
   tagScripts.addHtml("	funcoes globais");
   tagScripts.addHtml("*/");
   tagScripts.addHtml("function getElemIfr(e){		");
   tagScripts.addHtml("	var elem = ifrTransacoes.document.getElementById(e);		");
   tagScripts.addHtml("	if(elem)			");
   tagScripts.addHtml("		return elem;		");
   tagScripts.addHtml("	elem = ifrTransacoes.document.getElementById('id'+e);			");
   tagScripts.addHtml("	if(elem)				");
   tagScripts.addHtml("		return elem;		");
   tagScripts.addHtml("}");
   tagScripts.addHtml("function getBotaoXseed(acao){");
   tagScripts.addHtml("	var botoes = ifrTransacoes.document.getElementsByTagName(\"BUTTON\");");
   tagScripts.addHtml("	var botao = null;");
   tagScripts.addHtml("	for(var i =0; i < botoes.length; i++){");
   tagScripts.addHtml("		botao = botoes[i];");
   tagScripts.addHtml("		if(botao.name.length > 8 && botao.name.substring(0,8) == 'BT_ACAO_'){");
   tagScripts.addHtml("			var idBot = 'id' + botao.name.substring(8, botao.name.indexOf('*')) + '*'+ acao;");
   tagScripts.addHtml("			botao = ifrTransacoes.document.getElementById(idBot);");
   tagScripts.addHtml("			return botao;");
   tagScripts.addHtml("		}");
   tagScripts.addHtml("	}");
   tagScripts.addHtml("	return null;");
   tagScripts.addHtml("}");
   tagScripts.addHtml("");
   tagScripts.addHtml("/*");
   tagScripts.addHtml("	preenchendo os campos da tela com os ");
   tagScripts.addHtml("	valores da transacao que chamou");
   tagScripts.addHtml("*/	");
   tagScripts.addHtml("function preencherCampos()");
   tagScripts.addHtml("{");
   tagScripts.addHtml("	if(!isFirstLoad) return;");
   tagScripts.addHtml("	//funcao criada caso a funcao seja executada antes da pagina carregar todos campos");
   tagScripts.addHtml("	try{");
   tagScripts.addHtml("		var campo = document.getElementById('txtCamposSalvar').value;");
   tagScripts.addHtml("	}catch(e){");
   tagScripts.addHtml("		setTimeout('preencherCampos()',200);");
   tagScripts.addHtml("		return;");
   tagScripts.addHtml("	}");
   tagScripts.addHtml("	var camposSalvar = document.getElementById('txtCamposSalvar').value;");
   tagScripts.addHtml("	");
   tagScripts.addHtml("	// Adicionado para mover o cursor inicial na tela");
   tagScripts.addHtml("	// Lucas Pereira de Lima - 24/06/2016");
   tagScripts.addHtml("	var campoCursor = document.getElementById('txtCampoCursor').value;");
   tagScripts.addHtml("	if(!(campoCursor === \"undefined\"))");
   tagScripts.addHtml("	{	");
   tagScripts.addHtml("		if(campoCursor != '')");
   tagScripts.addHtml("		{");
   tagScripts.addHtml("			campoFocus = getElemIfr(campoCursor);");
   tagScripts.addHtml("			campoFocus.focus();		");
   tagScripts.addHtml("			document.getElementById('txtCampoCursor').value = '';");
   tagScripts.addHtml("		}");
   tagScripts.addHtml("	}");
   tagScripts.addHtml("	//");
   tagScripts.addHtml("	");
   tagScripts.addHtml("	var map = new Map('camposSalvar');");
   tagScripts.addHtml("	map.construir(camposSalvar,sep_retorno_1,sep_retorno_2);");
   tagScripts.addHtml("	while(map.next())");
   tagScripts.addHtml("	{");
   tagScripts.addHtml("			getElemIfr(map.getKey()).value = map.getValue();");
   tagScripts.addHtml("	}");
   tagScripts.addHtml("	isFirstLoad = false;");
   tagScripts.addHtml("	");
   tagScripts.addHtml("	var acao = document.getElementById('txtCampoAcao').value;");
   tagScripts.addHtml("	if(acao != ''){");
   tagScripts.addHtml("		/*PagBotoes*/");
   tagScripts.addHtml("		if(document.getElementById('bot'+acao)){");
   tagScripts.addHtml("			document.getElementById('bot'+acao).click();");
   tagScripts.addHtml("			/*Innovation*/");
   tagScripts.addHtml("		}else if(getElemIfr('bot'+acao)){");
   tagScripts.addHtml("			getElemIfr('bot'+acao).click();");
   tagScripts.addHtml("		}else{ /*Xseed*/");
   tagScripts.addHtml("			var bot = getBotaoXseed(acao);");
   tagScripts.addHtml("			if(bot) bot.click();");
   tagScripts.addHtml("		}");
   tagScripts.addHtml("		");
   tagScripts.addHtml("	}");
   tagScripts.addHtml("}");
   tagScripts.addHtml("");
   tagScripts.addHtml("");
   tagScripts.addHtml("</script>");
   tagScripts.encapsulated = "False";
}
public void txtAcao_Initialize() throws Exception
{
   txtAcao = new XseedTextbox("Text",-1,"",form);
   txtAcao.name = "txtAcao";
   txtAcao.left = 208;
   txtAcao.top = 9;
   txtAcao.width = 30;
   txtAcao.height = 14;
   txtAcao.tabIndex = "-1";
   txtAcao.fontFamily = "Verdana";
   txtAcao.fontSize = "11";
   txtAcao.fontStyle = "normal";
   txtAcao.fontWeight = "normal";
   txtAcao.position = "absolute";
   txtAcao.visibility = "Hidden";
   txtAcao.addScript("");
}

public void txtAcaoConfirmada_Initialize() throws Exception
{
   txtAcaoConfirmada = new XseedTextbox("Text",-1,"",form);
   txtAcaoConfirmada.name = "txtAcaoConfirmada";
   txtAcaoConfirmada.left = 119;
   txtAcaoConfirmada.top = 4;
   txtAcaoConfirmada.width = 30;
   txtAcaoConfirmada.height = 14;
   txtAcaoConfirmada.tabIndex = "-1";
   txtAcaoConfirmada.fontFamily = "Verdana";
   txtAcaoConfirmada.fontSize = "11";
   txtAcaoConfirmada.fontStyle = "normal";
   txtAcaoConfirmada.fontWeight = "normal";
   txtAcaoConfirmada.position = "absolute";
   txtAcaoConfirmada.visibility = "Hidden";
   txtAcaoConfirmada.addScript("");
}

public void txtAutorizacao_Initialize() throws Exception
{
   txtAutorizacao = new XseedTextbox("Text",-1,"",form);
   txtAutorizacao.name = "txtAutorizacao";
   txtAutorizacao.left = 342;
   txtAutorizacao.top = 1;
   txtAutorizacao.width = 30;
   txtAutorizacao.height = 14;
   txtAutorizacao.tabIndex = "-1";
   txtAutorizacao.fontFamily = "Verdana";
   txtAutorizacao.fontSize = "11";
   txtAutorizacao.fontStyle = "normal";
   txtAutorizacao.fontWeight = "normal";
   txtAutorizacao.position = "absolute";
   txtAutorizacao.visibility = "Hidden";
   txtAutorizacao.addScript("");
}

public void txtBotoesBloq_Initialize() throws Exception
{
   txtBotoesBloq = new XseedTextbox("Text",-1,"",form);
   txtBotoesBloq.name = "txtBotoesBloq";
   txtBotoesBloq.left = 397;
   txtBotoesBloq.top = 2;
   txtBotoesBloq.width = 30;
   txtBotoesBloq.height = 14;
   txtBotoesBloq.tabIndex = "-1";
   txtBotoesBloq.fontFamily = "Verdana";
   txtBotoesBloq.fontSize = "11";
   txtBotoesBloq.fontStyle = "normal";
   txtBotoesBloq.fontWeight = "normal";
   txtBotoesBloq.position = "absolute";
   txtBotoesBloq.visibility = "Hidden";
   txtBotoesBloq.addScript("");
}

public void txtCampoAcao_Initialize() throws Exception
{
   txtCampoAcao = new XseedTextbox("Text",-1,"",form);
   txtCampoAcao.name = "txtCampoAcao";
   txtCampoAcao.left = 11;
   txtCampoAcao.top = 4;
   txtCampoAcao.width = 26;
   txtCampoAcao.height = 14;
   txtCampoAcao.tabIndex = "-1";
   txtCampoAcao.fontFamily = "Verdana";
   txtCampoAcao.fontSize = "11";
   txtCampoAcao.fontStyle = "normal";
   txtCampoAcao.fontWeight = "normal";
   txtCampoAcao.position = "absolute";
   txtCampoAcao.visibility = "Hidden";
   txtCampoAcao.addScript("");
}

public void txtCampoCursor_Initialize() throws Exception
{
   txtCampoCursor = new XseedTextbox("Text",-1,"",form);
   txtCampoCursor.name = "txtCampoCursor";
   txtCampoCursor.left = 374;
   txtCampoCursor.top = 2;
   txtCampoCursor.width = 21;
   txtCampoCursor.height = 14;
   txtCampoCursor.fontFamily = "Verdana";
   txtCampoCursor.fontSize = "11";
   txtCampoCursor.fontStyle = "normal";
   txtCampoCursor.fontWeight = "normal";
   txtCampoCursor.position = "absolute";
   txtCampoCursor.visibility = "Hidden";
}
public void txtCamposRetorno_Initialize() throws Exception
{
   txtCamposRetorno = new XseedTextbox("Text",-1,"",form);
   txtCamposRetorno.name = "txtCamposRetorno";
   txtCamposRetorno.left = 253;
   txtCamposRetorno.top = 2;
   txtCamposRetorno.width = 26;
   txtCamposRetorno.height = 14;
   txtCamposRetorno.tabIndex = "-1";
   txtCamposRetorno.fontFamily = "Verdana";
   txtCamposRetorno.fontSize = "11";
   txtCamposRetorno.fontStyle = "normal";
   txtCamposRetorno.fontWeight = "normal";
   txtCamposRetorno.position = "absolute";
   txtCamposRetorno.visibility = "Hidden";
   txtCamposRetorno.addScript("");
}

public void txtCamposSalvar_Initialize() throws Exception
{
   txtCamposSalvar = new XseedTextbox("Text",-1,"",form);
   txtCamposSalvar.name = "txtCamposSalvar";
   txtCamposSalvar.left = 296;
   txtCamposSalvar.top = 5;
   txtCamposSalvar.width = 26;
   txtCamposSalvar.height = 14;
   txtCamposSalvar.tabIndex = "-1";
   txtCamposSalvar.fontFamily = "Verdana";
   txtCamposSalvar.fontSize = "11";
   txtCamposSalvar.fontStyle = "normal";
   txtCamposSalvar.fontWeight = "normal";
   txtCamposSalvar.position = "absolute";
   txtCamposSalvar.visibility = "Hidden";
   txtCamposSalvar.addScript("");
}

public void txtCodTra_Initialize() throws Exception
{
   txtCodTra = new XseedTextbox("Text",-1,"",form);
   txtCodTra.name = "txtCodTra";
   txtCodTra.left = 65;
   txtCodTra.top = 5;
   txtCodTra.width = 26;
   txtCodTra.height = 14;
   txtCodTra.tabIndex = "-1";
   txtCodTra.fontFamily = "Verdana";
   txtCodTra.fontSize = "11";
   txtCodTra.fontStyle = "normal";
   txtCodTra.fontWeight = "normal";
   txtCodTra.position = "absolute";
   txtCodTra.visibility = "Hidden";
}
public void txtControleIsSubmited_Initialize() throws Exception
{
   txtControleIsSubmited = new XseedTextbox("Text",-1,"",form);
   txtControleIsSubmited.name = "txtControleIsSubmited";
   txtControleIsSubmited.left = 161;
   txtControleIsSubmited.top = 1;
   txtControleIsSubmited.width = 30;
   txtControleIsSubmited.height = 14;
   txtControleIsSubmited.tabIndex = "-1";
   txtControleIsSubmited.fontFamily = "Verdana";
   txtControleIsSubmited.fontSize = "11";
   txtControleIsSubmited.fontStyle = "normal";
   txtControleIsSubmited.fontWeight = "normal";
   txtControleIsSubmited.position = "absolute";
   txtControleIsSubmited.visibility = "Hidden";
   txtControleIsSubmited.addScript("");
}

public void txtHelp_Initialize() throws Exception
{
   txtHelp = new XseedTextbox("Text",-1,"",form);
   txtHelp.name = "txtHelp";
   txtHelp.left = 62;
   txtHelp.top = 4;
   txtHelp.width = 26;
   txtHelp.height = 14;
   txtHelp.tabIndex = "-1";
   txtHelp.fontFamily = "Verdana";
   txtHelp.fontSize = "11";
   txtHelp.fontStyle = "normal";
   txtHelp.fontWeight = "normal";
   txtHelp.position = "absolute";
   txtHelp.visibility = "Hidden";
}
public void txtJsonHidden_Initialize() throws Exception
{
   txtJsonHidden = new XseedTextbox("Text",-1,"",form);
   txtJsonHidden.name = "txtJsonHidden";
   txtJsonHidden.left = 258;
   txtJsonHidden.top = 7;
   txtJsonHidden.width = 26;
   txtJsonHidden.height = 14;
   txtJsonHidden.tabIndex = "-1";
   txtJsonHidden.fontFamily = "Verdana";
   txtJsonHidden.fontSize = "11";
   txtJsonHidden.fontStyle = "normal";
   txtJsonHidden.fontWeight = "normal";
   txtJsonHidden.position = "absolute";
   txtJsonHidden.visibility = "Hidden";
   txtJsonHidden.addScript("");
}

public void txtInibirNovidades_Initialize() throws Exception
{
   txtInibirNovidades = new XseedTextbox("Text",-1,"",form);
   txtInibirNovidades.name = "txtInibirNovidades";
   txtInibirNovidades.left = 744;
   txtInibirNovidades.top = 3;
   txtInibirNovidades.width = 30;
   txtInibirNovidades.height = 14;
   txtInibirNovidades.tabIndex = "-1";
   txtInibirNovidades.fontFamily = "Verdana";
   txtInibirNovidades.fontSize = "11";
   txtInibirNovidades.fontStyle = "normal";
   txtInibirNovidades.fontWeight = "normal";
   txtInibirNovidades.position = "absolute";
   txtInibirNovidades.visibility = "Hidden";
   txtInibirNovidades.addScript("");
}

public void controlsAssignments() throws Exception
{
   super.controlsAssignments();
}
/** User Methods */
public void scripts() throws Exception
{
   super.scripts();
   sendScript("function keyPressed(evt){");
   sendScript("    evt = evt || window.event;");
   sendScript("    var key = evt.keyCode || evt.which;");
   sendScript("    return String.fromCharCode(key); ");
   sendScript("}");
   sendScript("");
   sendScript("document.onkeypress = function(evt) {");
   sendScript("    var str = keyPressed(evt);");
   sendScript("	fkey(evt);");
   sendScript("    console.log(str);");
   sendScript("};");
   sendScript("");
   sendScript("function fkey(e){");
   sendScript("        e = e || window.event;");
   sendScript("       if( foiPressionado ) return; ");
   sendScript("");
   sendScript("        if (e.keyCode == 116) {");
   sendScript("             alert(\"F5 pressionado\");");
   sendScript("            foiPressionado = true;");
   sendScript("        }else {");
   sendScript("            alert(\"Proibido\");");
   sendScript("        }");
   sendScript(" }");
   sendScript(" ");
   sendScript("function clickBotao(nmBot) {");
   sendScript("	document.getElementById(nmBot).click();");
   sendScript("}");
   sendScript("/*");
   sendScript("	retorna para a transacao que chamou");
   sendScript("	e restaura os valores de acordo com a string ");
   sendScript("	enviada para a transacao atual");
   sendScript("*/");
   sendScript("// foi alterado o nome para corrigir problema quando era alterado na Barra de progresso e perdia a referencia da function");
   sendScript("function retornarOriginal(strAcoes) {");
   sendScript("	try {		");
   sendScript("		var trans = parent.popTran();");
   sendScript("		if(trans != null && trans.length != 0) {");
   sendScript("			var codTra = trans[0];");
   sendScript("			callajax(codTra);");
   sendScript("			var acao = null;");
   sendScript("			if(strAcoes && strAcoes != '') {");
   sendScript("				var acoes = strAcoes.split(',');");
   sendScript("				for(var i = 0; i<acoes.length; i++) {");
   sendScript("					var array = acoes[i].split('=');");
   sendScript("					if(array[0] == codTra) acao = array[1];");
   sendScript("				}");
   sendScript("			}");
   sendScript("");
   sendScript("			var camposRetorno = trans[1];");
   sendScript("			var map = new Map('camposRetorno');");
   sendScript("			map.sep1 = sep_retorno_1;");
   sendScript("			map.sep2 = sep_retorno_2;");
   sendScript("");
   sendScript("			//construindo o objeto Map com a string salva");
   sendScript("			map.construir(camposRetorno,sep_retorno_1,sep_retorno_2);");
   sendScript("			while(map.next()) {");
   sendScript("				var campoR = map.getKey();");
   sendScript("				var campoV = map.getValue();");
   sendScript("				var i = campoV.indexOf(indicador_valor);");
   sendScript("				if(i != -1) {");
   sendScript("					campoV = campoV.substring(indicador_valor.length);");
   sendScript("				} else if(getElemIfr(campoV)) {");
   sendScript("					campoV = getElemIfr(campoV).value;");
   sendScript("				} else {");
   sendScript("					campoV = '';");
   sendScript("				}	");
   sendScript("				map.set(campoR,campoV);");
   sendScript("			}");
   sendScript("			camposRetorno = map.toStr();");
   sendScript("			");
   sendScript("			document.getElementById('txtCodTra').value = codTra;");
   sendScript("			document.getElementById('txtCamposSalvar').value = camposRetorno;");
   sendScript("			document.getElementById('txtAcao').value = 'RETOR';");
   sendScript("			document.getElementById('txtCampoAcao').value = acao != null ? acao : '';");
   sendScript("			document.forms[0].submit();");
   sendScript("			return;");
   sendScript("		} else {");
   sendScript("			alert('Não existe transação para retorno.');");
   sendScript("			ifrTransacoes.pararBarraProgresso();");
   sendScript("		}				");
   sendScript("	} catch(e) {");
   sendScript("		alert('erro');");
   sendScript("		// OC 85109");
   sendScript("		ifrTransacoes.pararBarraProgresso();");
   sendScript("		return;");
   sendScript("	}");
   sendScript("}");
   sendScript("");
   sendScript("/*");
   sendScript("	redirecionando para a transacao ");
   sendScript("	params ");
   sendScript("	codTra = codigo da transacao");
   sendScript("	camposTela = string com os campos da proxima tela que");
   sendScript("	irao receber valores dos campos da tela atual");
   sendScript("	ex: txtTelaNova=txtTelaAntiga,txtTelaNova2=txtTelaAntiga2");
   sendScript("	separador1 = ,");
   sendScript("	separador2 = =");
   sendScript("	caso um campo seja do tipo retorno, quando retornar da");
   sendScript("	tela, restaura o valor");
   sendScript("	ex: txtTelaAntiga1=txtTelaNova,retorno=txtTelaAntiga2	");
   sendScript("*/");
   sendScript("// foi alterado o nome para corrigir problema quando era alterado na Barra de progresso e perdia a referencia da function");
   sendScript("function redirectOriginal(codTra, camposTela, acaoBotao) {");
   sendScript("	var camposSalvar;");
   sendScript("	var camposRetornar;");
   sendScript("	var campoFocus;");
   sendScript("	var lastTra = document.getElementById('txtCodTra').value;");
   sendScript("	if(camposTela && camposTela != '' && camposTela != ' ') {");
   sendScript("		var campos = new Map('campos');");
   sendScript("		//construindo o objeto map com a string salva na CBTRA");
   sendScript("		campos.construir(camposTela,',','=');");
   sendScript("		var retorno = new Map('retorno');");
   sendScript("		var cursor;");
   sendScript("		while(campos.next()) {");
   sendScript("			var campoR = campos.getKey();");
   sendScript("			var campoV = campos.getValue();");
   sendScript("			if(campoR == 'retorno') {");
   sendScript("				retorno.set(campoV, indicador_valor+getElemIfr(campoV).value);");
   sendScript("				campos.remove(campoR);			");
   sendScript("			} else if(campoR == 'cursor') {");
   sendScript("				cursor = campoV;");
   sendScript("				campos.remove(campoR);");
   sendScript("			} else {");
   sendScript("				campos.set(campoR, getElemIfr(campoV).value);");
   sendScript("				retorno.set(campoV,campoR);");
   sendScript("			}");
   sendScript("		}");
   sendScript("		retorno.sep1 = sep_retorno_1;");
   sendScript("		retorno.sep2 = sep_retorno_2;");
   sendScript("		campos.sep1 = retorno.sep1;");
   sendScript("		campos.sep2 = retorno.sep2;");
   sendScript("	");
   sendScript("		camposRetornar = retorno.toStr();");
   sendScript("		camposSalvar = campos.toStr();");
   sendScript("		campoFocus = cursor;	");
   sendScript("	} else {");
   sendScript("		camposSalvar = '';");
   sendScript("		camposRetornar = '';");
   sendScript("		campoFocus = '';");
   sendScript("	}			");
   sendScript("	parent.pushTran(lastTra,camposRetornar);");
   sendScript("	document.getElementById('txtCodTra').value = codTra;");
   sendScript("	document.getElementById('txtCamposSalvar').value = camposSalvar;");
   sendScript("	document.getElementById('txtCamposRetorno').value = camposRetornar;");
   sendScript("	document.getElementById('txtCampoCursor').value = campoFocus;");
   sendScript("	document.getElementById('txtAcao').value = 'REDIRECT';");
   sendScript("	document.getElementById('txtCampoAcao').value = acaoBotao ? acaoBotao : '';");
   sendScript("	document.forms[0].submit();		");
   sendScript("}");
   sendScript("");
   sendScript("function bloquearBotoes() {");
   sendScript("	document.getElementById('txtBotoesBloq').value='S';");
   sendScript("}");
   sendScript("");
   sendScript("function desbloquearBotoes() {");
   sendScript("	document.getElementById('txtBotoesBloq').value='';");
   sendScript("}");
   sendScript("");
   sendScript("function  retornar(strAcoes) {");
   sendScript("	// OC 85109 - Inicia a barra de progresso, se existir");
   sendScript("	if (typeof window.iniciarBarraProgresso === \"function\") {");
   sendScript("		iniciarBarraProgresso();");
   sendScript("	}");
   sendScript("	//");
   sendScript("	retornarOriginal(strAcoes);");
   sendScript("}");
   sendScript("");
   sendScript("function redirect(codTra, camposTela, acaoBotao) {");
   sendScript("	// OC 85109 - Inicia a barra de progresso, se existir");
   sendScript("	if (typeof window.iniciarBarraProgresso === \"function\") {");
   sendScript("		iniciarBarraProgresso();");
   sendScript("	}");
   sendScript("	//");
   sendScript("	redirectOriginal(codTra, camposTela, acaoBotao);");
   sendScript("}");
   sendScript("");
   sendScript("function callajax(trans) {");
   sendScript("  var wUrl = \"AjaxRetornoTransacao?input=\"+trans;");
   sendScript("  var wResultado = ajax_request(wUrl);");
   sendScript("}");
   sendScript("");
   sendScript("function exibirNovidades(){");
   sendScript("	let arrNovidades = JSON.parse(document.getElementById('txtJsonHidden').value);");
   sendScript("	let iframe;");
   sendScript("	if(parent.parent.iframe != null) {");
   sendScript("		iframe = parent.parent.iframe.document;");
   sendScript("	}	");
   sendScript("	");
   sendScript("	if (iframe == null) {");
   sendScript("		if(parent.parent.parent.iframe != null) {");
   sendScript("			iframe = parent.parent.parent.iframe.document;");
   sendScript("		}");
   sendScript("	}");
   sendScript("	");
   sendScript("	if(iframe == null) {");
   sendScript("		iframe = document;");
   sendScript("	}");
   sendScript("	");
   sendScript("	if (iframe != null) {");
   sendScript("		");
   sendScript("		let body = iframe.body;");
   sendScript("		");
   sendScript("		let texto;");
   sendScript("		let title = 'O que há de novo';");
   sendScript("		let html;");
   sendScript("			");
   sendScript("		let div = iframe.getElementById(\"modal\");");
   sendScript("		");
   sendScript("		if (div == null) {");
   sendScript("			");
   sendScript("			div = document.createElement(\"div\");");
   sendScript("			div.setAttribute(\"id\", \"modal-novidades\");");
   sendScript("			div.className = \"modal modal-fade\"");
   sendScript("			");
   sendScript("			html = '<div class=\"modal-dialog\">'");
   sendScript("				 + '    <div class=\"modal-content\" style=\"width: 600px;\">'");
   sendScript("				 + '        <div class=\"modal-header\">'");
   sendScript("				 + '            <h1 class=\"modal-title\">' + title + '</h1>'");
   sendScript("				 + '        </div>'");
   sendScript("				 + '        <div id=\"bodyModalNovidade\" class=\"modal-body\">'");
   sendScript("				 + '	        <div class=\"card\">'");
   sendScript("				 + '                <div class=\"card-body\">'		");
   sendScript("				 + '                    <div class=\"card-list\">';");
   sendScript("				");
   sendScript("			if (arrNovidades.length > 0) {");
   sendScript("				");
   sendScript("				arrNovidades.forEach(function(item, index) {");
   sendScript("					html += '                        <div class=\"card-list-item\">';");
   sendScript("					if (item.titulo != null && item.titulo != '') {");
   sendScript("						html += '                            <h5 class=\"card-title\">'+item.titulo+'</h5>';");
   sendScript("					}");
   sendScript("					html += '                            <p class=\"card-text\">'+item.descricao+'</p></div>';");
   sendScript("				});");
   sendScript("			}");
   sendScript("			");
   sendScript("			html += ' </div></div></div></div>'");
   sendScript("			      + '        <div class=\"modal-footer\" style=\"display: flex; align-items: center; justify-content: space-between;\">'");
   sendScript("			      + '            <label style=\"display: flex; align-items: center; gap: 6px; cursor: pointer; font-size: 14px;\">'");
   sendScript("			      + '                <input type=\"checkbox\" id=\"chkInibirNovidades\" style=\"cursor: pointer;\">'");
   sendScript("			      + '                Não exibir novamente'");
   sendScript("			      + '            </label>'");
   sendScript("			      + '            <button id=\"btnFecharModal\" type=\"button\" class=\"btn btn-fechar\" style=\"color: white;background-color: #548897;border-color: #548897;position: relative;display: flex;width: auto;justify-content: center;\">Fechar</button>'");
   sendScript("			      + '        </div>'");
   sendScript("			      + '    </div>'");
   sendScript("				  + '</div>';");
   sendScript("			");
   sendScript("			div.innerHTML = html;");
   sendScript("			body.appendChild(div);");
   sendScript("			");
   sendScript("			setTimeout(function() {");
   sendScript("				");
   sendScript("				div.classList.add(\"modal-show\");");
   sendScript("				");
   sendScript("				iframe.getElementById(\"btnFecharModal\").focus();");
   sendScript("				");
   sendScript("				iframe.getElementById(\"chkInibirNovidades\").addEventListener('change', function() {");
   sendScript("					document.getElementById('txtInibirNovidades').value = this.checked ? 'S' : 'N';");
   sendScript("				});");
   sendScript("				");
   sendScript("			}, 500);");
   sendScript("			");
   sendScript("			let btnFecharModal = iframe.getElementById(\"btnFecharModal\");");
   sendScript("			");
   sendScript("			btnFecharModal.addEventListener('mouseup', function(e) {");
   sendScript("				");
   sendScript("				if (e.which === 1) {");
   sendScript("					");
   sendScript("					e.preventDefault();");
   sendScript("					e.stopPropagation();");
   sendScript("					");
   sendScript("					inibirNovidade();");
   sendScript("					");
   sendScript("					let div = iframe.getElementById(\"modal-novidades\");");
   sendScript("					div.classList.remove(\"modal-show\");");
   sendScript("					");
   sendScript("					setTimeout(function() {");
   sendScript("						");
   sendScript("						body.removeChild(div);");
   sendScript("						");
   sendScript("						if (activeEl != null) {");
   sendScript("							activeEl.focus();");
   sendScript("						}");
   sendScript("						");
   sendScript("					}, 100);	");
   sendScript("				}");
   sendScript("			});");
   sendScript("			");
   sendScript("			btnFecharModal.addEventListener('keydown', function(e) {");
   sendScript("				");
   sendScript("				if (e.keyCode == 13) {");
   sendScript("					");
   sendScript("					e.preventDefault();");
   sendScript("					e.stopPropagation();");
   sendScript("					");
   sendScript("					inibirNovidade();");
   sendScript("					");
   sendScript("					let div = iframe.getElementById(\"modal-novidades\");");
   sendScript("					div.classList.remove(\"modal-show\");");
   sendScript("					");
   sendScript("					setTimeout(function() {");
   sendScript("						");
   sendScript("						body.removeChild(div);");
   sendScript("						if (activeEl != null) {");
   sendScript("							activeEl.focus();");
   sendScript("						}");
   sendScript("						");
   sendScript("					}, 100);");
   sendScript("					");
   sendScript("				} else if (e.keyCode == 9) {");
   sendScript("					e.preventDefault();");
   sendScript("					e.stopPropagation();	");
   sendScript("				}	");
   sendScript("			});");
   sendScript("		}");
   sendScript("		");
   sendScript("		div.addEventListener('mouseup', function(e) {");
   sendScript("			let btnFecharModal = iframe.getElementById(\"btnFecharModal\");");
   sendScript("			btnFecharModal.focus();");
   sendScript("			");
   sendScript("		});		");
   sendScript("	}	");
   sendScript("}");
   sendScript("");
   sendScript("function inibirNovidade() {");
   sendScript("	ajax_optionGetBrowserValues = 'False';");
   sendScript("	ajax_submitFields = 'txtInibirNovidades';");
   sendScript("	ajaxInvoke('inibirNovidade');");
   sendScript("}");
   sendScript("//OC 85778");
   sendScript("function manterSessaoAtiva() {");
   sendScript("	const urlAtual = new URL(window.location.href);");
   sendScript("	const pathArray = urlAtual.pathname.split('/');");
   sendScript("	const urlCompletaBase = `${urlAtual.origin}/${pathArray[1]}`");
   sendScript("	");
   sendScript("    $.ajax({");
   sendScript("        url: urlCompletaBase + '/servicos/device/servico-disponivel',");
   sendScript("        type: 'GET',");
   sendScript("        success: function (res) {   },");
   sendScript("        error: function (xhr, status, error) {");
   sendScript("            console.log('Erro ao manter sessão ativa');");
   sendScript("            console.log('HTTP:', xhr.status);");
   sendScript("            console.log('Status:', status);");
   sendScript("            console.log('Erro:', error);");
   sendScript("            console.log('Resposta:', xhr.responseText);");
   sendScript("        },");
   sendScript("        complete: function () {");
   sendScript("            setTimeout(manterSessaoAtiva, 5 * 60 * 1000);");
   sendScript("        }");
   sendScript("    });");
   sendScript("}");
   sendScript("");
   sendScript("manterSessaoAtiva();");
   sendScript("");
}
public void declaratives() throws Exception {
	form.addCssFiles("<link rel=\"stylesheet\" type=\"text/css\" href=\"../css/card.css\" />");
	//
	// OC 85436
	form.addJsFiles("<script src=\"../JavaScript/JsControleRequisicao.js\" type=\"text/javascript\"></script>");
		
	//OC 85778
	form.addJsFiles("<script src=\"../JavaScript/jquery/jquery-3.7.0.min.js\" type=\"text/javascript\"></script>");
}

public void initialize() throws Exception {
	boolean bloqueioPorEdicao = false;
	ResultSet valida = null;
	DstraVO dstraVO = null;
	
	try {	
		if(form.onload == null) {
			form.onload = "";
		}
		String codUsu = getClipArea("GL_COD_USU") == null ? "" : getClipArea("GL_COD_USU");
		String codEmp = getClipArea("GL_COD_EMP");
		String codLoja = getClipArea("GL_COD_LOJ")!=null?getClipArea("GL_COD_LOJ"):"";

		if(codUsu.trim().equals("")) {
			form.onload = "parent.document.form.submit();";
			return;
		}
				
		RulHelperSession.removeTemp(session);

		String codTransacao = null;
		String transacaoReal = "";
				
		String pagImpl = getParameter("PAGIMPL");		
		int posicaoAtual = 780;  //tamanho do iframe para posicionar os botões
		XseedButton botoes[] = null;		
		if(pagImpl != null) {			
			if(pagImpl.equals("GPE")) {
				ifrTransacoes.src = "DSUSU?COD_TRA=CUSU";
			} else {
				ifrTransacoes.src = "DSUSU?COD_TRA=USUA";
			}
							
			txtHelp.set("../Doc/DSUSU.html");
									
			tagBotoes.addHtml("<div class=\"full tabs\">");
			tagBotoes.addHtml("<!-- / left -->");
			tagBotoes.addHtml("<span class=\"lft ttl\"><span class=\"titulo\">Cadastro de Usuarios</span>  <span class=\"ttl-cod\">[ CUSU ]</span></span>");
			tagBotoes.addHtml("<!-- left / -->");
			tagBotoes.addHtml("<span>");
			tagBotoes.addHtml("<ul class=\"tb\">");
			tagBotoes.addHtml("       <li><a href=\"javascript: clickBotao('botINC');\" class=\"tb-link\" title=\"Incluir (F11)\" data-button=\"botINC\">Incluir </a></li>");
			tagBotoes.addHtml("       <li><a href=\"javascript: clickBotao('botALT');\" class=\"tb-link\" title=\"Alterar (F4)\" data-button=\"botALT\">Alterar </a></li>");
			tagBotoes.addHtml("       <li><a href=\"javascript: clickBotao('botEXC');\" class=\"tb-link\" title=\"Excluir (F11)\" data-button=\"botEXC\">Excluir </a></li>");
			tagBotoes.addHtml("       <li><a href=\"javascript: clickBotao('botCON');\" class=\"tb-link\" title=\"Consultar (F8)\" data-button=\"botCON\">Consultar </a></li>");
			tagBotoes.addHtml("</ul>   ");
			tagBotoes.addHtml("</span>");
			tagBotoes.addHtml("<!-- right / -->");
			tagBotoes.addHtml("    ");
			tagBotoes.addHtml("    ");
			tagBotoes.addHtml("</div>");			
		} else {
			if(getParameter("CODTRA") != null && getParameter("CODTRA").contains("DASHB")) {
				ifrTransacoes.htmlclass = "ifrFull";
				
				String nomeSistema = getNomeSistema(getClipArea("GL_COD_SISTEMA"));
				boolean existe = DaoDashbUsuario.existeDashb(codEmp, codUsu, nomeSistema, session);
				
				if (!existe) {
					
					existe = DaoDashbPosto.existeDashb(codEmp, codUsu, nomeSistema, session);
					
					if (!existe) {
						ifrTransacoes.src = "../BemVindo.html" + "?nomeUsuario=" + getParameter("nomeUsuario") + "&temAlertaComunicado=" + getParameter("temAlertaComunicado") + "&codSistema=" + getClipArea("GL_COD_SISTEMA");
					}
					
				}
				
				if (existe) {
					ifrTransacoes.src = "../Dashboard.html" + "?nomeUsuario=" + getParameter("nomeUsuario") + "&temAlertaComunicado=" + getParameter("temAlertaComunicado") + "&codSistema=" + getClipArea("GL_COD_SISTEMA");
				}
			} else {
				if(!txtCodTra.get().equals("")) {
					codTransacao = txtCodTra.get();
					if(!txtCamposSalvar.get().equals("")) {
						ifrTransacoes.onload = "do { flg = false; try{ preencherCampos(); } catch(e){ flg = true; } } while(flg);";
					}
				} else {
					codTransacao = getParameter("CODTRA");				
					//a chamada foi feita pelo menu da PagPrincipal
					if(codTransacao.indexOf("*") != -1) {
						codTransacao = codTransacao.substring(0,codTransacao.indexOf("*"));  //codigo da transação
					} else { // a chamada e feita pelo botao ir da PagPrincipal pois a string transacao contem apenas o codigo da transacao					
						codTransacao = codTransacao.trim();
					}
					move(codTransacao, txtCodTra);
				}
				
				bloqueioPorEdicao = DaoValidaTransacao.transacaoRestritaPorEdicao(codEmp, codLoja, codTransacao, session);
				if(bloqueioPorEdicao) {
					alert("Transação Inválida para esta edição do produto!");				
					txtCodTra.set("");
					return;
				}
				
				//verifica se a acao foi atravez do usuario pela PagPrincipal ou se foi por um botao (REDIRECT e RETOR)
				boolean isPagPrincipal = (getParameter("pagPrinc") != null && getParameter("pagPrinc").equals("true") && !txtAcao.get().equals("REDIRECT") && !txtAcao.get().equals("RETOR"));
				
				//verifica se usuário está logado
				if(RulPerfilEmpresa.isPerfilEmpresa(codEmp, session)) {
					String codSis = nvl(getClipArea("GL_COD_SISTEMA"), "").equals("NEXGEN")?"SIC":getClipArea("GL_COD_SISTEMA");
					if (RulPerfilEmpresa.validarTransacao(codEmp, codUsu, codSis, codTransacao, session)) {
						valida = DaoValidaTransacao.find(codEmp,codUsu, codTransacao, getClipArea("GL_COD_SISTEMA"), session);
					}
				} else {
					valida = DaoValidaTransacao.find(codEmp,codUsu, codTransacao, getClipArea("GL_COD_SISTEMA"), session);
				}
				
				if(valida != null && getParameter("pagPrinc") != null) {
					if(isPagPrincipal && valida.getString("pHieTra").equals("0")) {
						valida = null;
					}
				}
				
				if(valida == null) { //se não encontrar a permisão
					alert("Transação Inválida!!!");								
					txtCodTra.set("");
					return;
				}
				
	            dstraVO = RulTransacoes.consultarTransacao(codTransacao, session);
		        if(dstraVO != null) {
	                if(dstraVO.getFlSomenteMobile().equals("S")){
			            alert("Transação disponível somente no ambiente Mobile.");
			            txtCodTra.set("");
			            return;
	                }
		        }
				
		        RulIpAcessado.gravarIpAcessado((String)session.httpSession.getAttribute("GLB_FULLSTN"), codEmp, codLoja, codUsu, codTransacao, session);
				
				String cdLoja = getClipArea("GL_COD_LOJ")!=null?getClipArea("GL_COD_LOJ"):""; 
				String msg = RulReplicacao.verificarReplicacao(codEmp, cdLoja, codTransacao, session);
				if (msg != null) {
					alert(msg);
					txtCodTra.set("");
					return;
				}
				
				// Verifica se a transação só pode ser utilizada através do browser próprio da Secrel
				// Aplicavel somente ao NexAC e NexgenLITE
				boolean browserProprio = getClipArea("BROWSER_PROPRIO") != null && getClipArea("BROWSER_PROPRIO").trim().length() > 0?true:false; 
				msg = RulReplicacao.verificarBrowser(codTransacao, browserProprio, session);
				if (msg != null) {
					alert(msg);
					txtCodTra.set("");
					return;
				}
				// Verifica se a transação só pode ser utilizada no ambiente de nnuvem quando está o estado de contingência está ligado
				// Aplicavel somente ao NexAC e NexgenLITE
				msg = RulReplicacao.verificarSomenteContingencia(codEmp, cdLoja, codTransacao, session);
				if (msg != null) {
					alert(msg);
					txtCodTra.set("");
					return;
				}
				
				// Verifica a validade da licenca para alerta ou bloqueio da transacao
				// Aplicavel somente ao NexAC e NexgenLITE
				msg = RulReplicacao.verificarBloqueioLicencaTransacao(codEmp, cdLoja, codTransacao, session);
				if(msg != null) {
					if(msg.startsWith("000")) {
						msg = msg.substring(3);
						alert(msg);
					} else {
						alert(msg);
						txtCodTra.set("");
						return;
					}
				}
				
				//Validação de horário de funcionamento da transação
				if(RulTransacoes.horarioInutilizacaoTransacao(codTransacao, session)){
					alert("Transação Fora de Horário de Funcionamento");
					txtCodTra.set("");
					return;
				}
				
				//Dados jogados na sessão para serem usados na auditoria
				session.httpSession.setAttribute("DBEngine", session.DBEngine);
	
				transacaoReal = valida.getString("pTrnReal"); // Transação que chame Ispec ou Relatório		
				
				//seta a transação a ser mostrada no iframe
				if(valida.getString("pTipoTra").equals("R")) {
					ifrTransacoes.src = transacaoReal.trim() + "?COD_TRA=" +codTransacao+ "#" + valida.getString("pDescTra"); 
				} else {
					ifrTransacoes.src = transacaoReal.trim() + "?COD_TRA=" +codTransacao;
				}
				
				//transacao que chamou
				String transChamou = getClipArea("CodTra") != null ? getClipArea("CodTra") : "";  
				if(!transChamou.equals(codTransacao)) {
					form.onload = form.onload != null 
								  ? form.onload + " parent.document.getElementById('txtLastTran').value = '"+transChamou+"';"
								  : " parent.document.getElementById('txtLastTran').value = '"+transChamou+"';";
				}
				
				//transacao atual
				setClipArea("CodTra",codTransacao);
				setClipArea("desTrans", valida.getString("pDescTra") + "  ( " + codTransacao.toUpperCase() + " )");			
				txtHelp.set("../Doc/" + transacaoReal+".html");
				RulRenderizaBotoes renderiza = new RulRenderizaBotoes(session);
				renderiza.setForm(form);
				renderiza.setPosicaoAtual(posicaoAtual);
				//se a transacao for um relatorio , renderiza os botoes com a transacao RELA1
				botoes = renderiza.renderizar(valida.getString("pTipoTra").equals("R") ? "RELA1" : codTransacao);
	
				tagBotoes.addHtml("<div class=\"full tabs\">");
				tagBotoes.addHtml("<!-- / left -->");
				tagBotoes.addHtml("<span class=\"lft titulo_tela\"><span class=\"titulo\">"+valida.getString("pDescTra")+"</span>  <span class=\"ttl-cod\">[ "+codTransacao.toUpperCase()+" ]</span></span>");
				tagBotoes.addHtml("<!-- left / -->");
				tagBotoes.addHtml("<span>");
				tagBotoes.addHtml("<ul class=\"tb botoes\">");
				if(botoes != null) {
					for(XseedButton botao : botoes) {
						botao.visibility = "Hidden";
						tagBotoes.addHtml("       <li class=\"botao\"><a href=\"javascript: clickBotao('"+botao.name+"');\" class=\"tb-link\" title=\""+botao.title+"\" data-button=\"" + botao.name + "\" >"+botao.caption+" </a></li>");
						botao.caption = "";
						botao.left = 2;
					}
				}
				tagBotoes.addHtml("</ul>   ");
				tagBotoes.addHtml("</span>");
				tagBotoes.addHtml("<!-- right / -->");
				tagBotoes.addHtml("    ");
				tagBotoes.addHtml("    ");
				tagBotoes.addHtml("</div>");
			}
		}
		if (ifrTransacoes.htmlclass == null) {
			ifrTransacoes.htmlclass = "fullHeight";
		} else {
			ifrTransacoes.htmlclass += " fullHeight";
		}
	} catch(Exception exc) {
		exc.printStackTrace();
		throw new Exception(exc.getMessage());
	} catch(Error exc) {
		exc.printStackTrace();
		throw new Exception(exc.toString());
	} finally {
		if(valida != null) {
			try {
				if(valida.getStatement() != null) {
					valida.getStatement().close();
				}
				valida.close();
				valida = null;
			} catch (Exception e2) {
				valida = null;
			}
		}
		if(dstraVO != null) {
			try {
				if(dstraVO.sql != null) {
					dstraVO.sql.close();
				}
				dstraVO.close();
				dstraVO = null;
			} catch (Exception e) {
				dstraVO = null;
			}		
		}
	}
}

private String getNomeSistema(String sistema) {
	if (sistema.equals("ADM") || sistema.equals("NEXADM") || sistema.equals("FIS") || sistema.equals("GBE") || sistema.equals("GCO") || sistema.equals("GFI") || sistema.equals("GPA") || sistema.equals("GRE")) {
		return "NEXADM";
	} else if(sistema.equals("NEXGEN") || sistema.equals("SIC")) {
		return "NEXGEN";
	} else if(sistema.equals("PDV")) {
		return "NEXGEN";
	} else if(sistema.equals("LAB")) {
		return "NEXLAB";
	} else if(sistema.equals("GPE")) {
		return "NEXGPE";
	}
	return "NEXGEN";
}

public void load() throws Exception {
	try {
		session.httpSession.removeAttribute("gridInstances");
		if(nvl(getClipArea("release"),"").isEmpty()){
			setClipArea("release", getParameter("release").replace("V. ", ""));			
		}
		consultarNovidades();	
		if(txtJsonHidden.isNotEmpty()){
			form.onload += ";exibirNovidades();";
		}
	} catch(Exception exc) {
		exc.printStackTrace();
		throw new Exception(exc.getMessage());
	} catch(Error exc) {
		exc.printStackTrace();
		throw new Exception(exc.toString());
	}
}

public void submit() throws Exception {

}

public void consultarNovidades() throws Exception{
	RulNovidades rulNovidades = new RulNovidades(session);
	try {
		Text release = new Text(30, getClipArea("release"));
		Text codEmp = new Text(30, getClipArea("GL_COD_EMP"));
		Text codSis = new Text(30, getClipArea("GL_COD_SISTEMA") == null ? "" : getClipArea("GL_COD_SISTEMA"));
		Text codTra = new Text(30, getParameter("CODTRA").indexOf("*") != -1 ? getParameter("CODTRA").substring(0, getParameter("CODTRA").indexOf("*")).trim() : getParameter("CODTRA").trim());
		Text codUsu = new Text(30, getClipArea("GL_COD_USU") == null ? "" : getClipArea("GL_COD_USU"));
		
		txtJsonHidden.initialize();
		txtJsonHidden.set(rulNovidades.consultarNovidades(codEmp, codSis, codTra, release, codUsu));
	} catch (Exception e){
		e.printStackTrace();
	}
}

public void inibirNovidade() throws Exception {
	RulNovidades rulNovidades = new RulNovidades(session);
	try {
		if (isAjax()) {
			sendTag();
			txtInibirNovidades.receive();
		}
		if(txtInibirNovidades.equal("S")){
			Text release = new Text(30, getClipArea("release"));
			Text codEmp = new Text(30, getClipArea("GL_COD_EMP"));
			Text codSis = new Text(30, getClipArea("GL_COD_SISTEMA") == null ? "" : getClipArea("GL_COD_SISTEMA"));
			Text codTra = new Text(30, getClipArea("CodTra").indexOf("*") != -1 ? getClipArea("CodTra").substring(0, getClipArea("CodTra").indexOf("*")).trim() : getClipArea("CodTra").trim());
			Text codUsu = new Text(30, getClipArea("GL_COD_USU") == null ? "" : getClipArea("GL_COD_USU"));
			
			rulNovidades.inibirNovidade(codEmp, codSis, release, codTra, codUsu);
		}

	} catch (Exception e){
		e.printStackTrace();
	}
}



} /** End Class */
