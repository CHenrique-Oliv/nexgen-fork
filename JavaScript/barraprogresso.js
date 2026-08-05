var NNav = ((navigator.appName == "Netscape"));
var debugNav = false;
var AgntUsr	= navigator.userAgent.toLowerCase();
var AppVer	= navigator.appVersion.toLowerCase();
var DomYes	= document.getElementById ? 1:0;
var NavYes	= AgntUsr.indexOf('mozilla') != -1 && AgntUsr.indexOf('compatible') == -1 ? 1:0;
var ExpYes	= AgntUsr.indexOf('msie') != -1 ? 1:0;
var Opr		= AgntUsr.indexOf('opera')!= -1 ? 1:0;
var javaFX  = AgntUsr.indexOf('javafx')> -1 ? true:false;
var interval;
if(debugNav){
	alert("Agente: "+AgntUsr+" - Versao: "+AppVer+"\n"+
	"Netscape/Mozilla: "+NavYes+"\n"+
	"Internet Explorer: "+ExpYes+"\n"+
	"Opera: "+Opr);
	var i = i;
}
var isXseed = window.jForm ? true : false;
var isPopup = window.top == window ? true : false;

// xp_progressbar
// Copyright 2004 Brian Gosselin of ScriptAsylum.com
// v1.0 - Initial release
// v1.1 - Added ability to pause the scrolling action (requires you to assign
//        the bar to a unique arbitrary variable).
//      - Added ability to specify an action to perform after a x amount of
//      - bar scrolls. This requires two added arguments.
// v1.2 - Added ability to hide/show each bar (requires you to assign the bar
//        to a unique arbitrary variable).
// var xyz = createBar(total_width,total_height,background_color,border_width,border_color,block_color,scroll_speed,block_count,scroll_count,action_to_perform_after_scrolled_n_times)
// var xyz = createBar(LARGURA,ALTURA,COR FUNDO,TAMANHO BORDA,COR BORDA,COR BLOCOS,VELOCIDADE,NUMERO BLOCOS,NUMERO VEZES,ENDERE?O PARA EXECUTAR APOS FIM, MENSAGEM)
var w3c=(document.getElementById)?true:false;
var ie=(document.all)?true:false;
var N=-1;
var barraProgressoAjax;
//var deslocWidthBar = (ie) ? 10 : 5;
//var deslocHeightBar = (ie) ? 90 : 125;
var fluxoLoad = 0;
var abrirPopup = false;
function atalhoPopup(campo){
	if(campo == null) return;
	var nmCampo = campo.name;
	nmCampo = nmCampo.length > 3 && nmCampo.substring(0,3) == 'txt' ? nmCampo.substring(3) : nmCampo;
	nmCampo = nmCampo.substring(0,1).toUpperCase() + nmCampo.substring(1);
	var img = document.getElementById('img'+nmCampo);//innovation
	if(!img) img = document.getElementById('idIMG'+nmCampo);//xseed
	if(!img) return;
	var funcPopup = img.onclick;
	funcPopup(); 

}
function getLogin(){
	var login = window;
	if(isPopup){
		while(login.top == login){
				login = login.opener;
		}
	}
	login = login.top;	
	return login;
}
function getPagBotoes(){
	var login =	getLogin();
	return login.frames[0].frames[0].window;
}
/*campo com focus */
window.campoFocus = null;
/*cross browser - adiciona um evento */
function XBrowserAddHandler(target,eventName,handlerName) { 
  if ( target.addEventListener ) { 
    target.addEventListener(eventName, function(e){target[handlerName](e);}, true);
  } else if ( target.attachEvent ) { 
    target.attachEvent("on" + eventName, function(e){target[handlerName](e);});
  } else { 
    var originalHandler = target["on" + eventName]; 
    if ( originalHandler ) { 
      target["on" + eventName] = function(e){originalHandler(e);target[handlerName](e);}; 
    } else { 
      target["on" + eventName] = target[handlerName]; 
    } 
  } 
}
/*ao carregar a pagina insere os eventos em cada elemento input para verficar qual campo esta com focus */
function load_Focus() {

	
	var elems = document.forms[0].elements;//getElementsByTagName("INPUT");
	var tipo = "";
	setControleSubmit(false);
	
	for(var i=0; i<elems.length; i++)
	{
		var elem = elems[i];
		if(elem.style.visibility.toUpperCase() == 'HIDDEN') continue;
		tipo = elem.type;
		if (tipo) {tipo = tipo.toLowerCase();} else {tipo = "";}
		if(tipo == 'text'){
			elem.focusEvent = focus_Event;
			elem.blurEvent = blur_Event;
			elem.keyPressEvent = keyPress_event;
			XBrowserAddHandler(elem,"focus","focusEvent");
			XBrowserAddHandler(elem,"keypress","keyPressEvent");
			XBrowserAddHandler(elem,"blur","blurEvent");
		}
		if(elem.type && (tipo == 'text' || tipo == 'textarea' || tipo.indexOf('sel') != -1))
		{		
			elem.focusEvent2 = focus_Event2;
			elem.blurEvent2 = blur_Event2;
			XBrowserAddHandler(elem,"focus","focusEvent2");
			XBrowserAddHandler(elem,"blur","blurEvent2");		
		}

	}
	if(window.top == window) //o top eh igual ao window entao eh uma popup
	{


	  
/*		var input = document.createElement('input');//input  
		input.setAttribute('type', 'hidden');  
		input.setAttribute('name', 'controle_isSubmited');  
		input.setAttribute('id', 'controle_isSubmited');  
		input.setAttribute('value', ''); 
		document.forms[0].appendChild(input); 
	*/	
		if(window.notFirstLoad){ 
		
			return;
		}
		window.notFirstLoad = true;
		var vOpener = window.opener;
		while(vOpener.top == vOpener){
			vOpener = vOpener.opener;
		}
		vOpener.window.top.addPopup(window);
		
 
		
		window.fecharPopups = function(){

			//window.document.getElementById('controle_isSubmited').value = '';
			setControleSubmit(false);
			var login = window.opener;
			while(login && login.top == login){
				login = login.opener;	
			}
			if(!login)
				return;
			login = login.top;
			login.fecharPopups(window);
		}
		if(opener.top == opener){//popup
			
			opener.iniciarBarraProgresso();	
		}else{
			var pag = window.opener.top.frames[0].frames[0];
			
			pag.iniciarBarraProgresso();
		}
	}
}


function focus_Event(e) { 
	window.campoFocus = this; window.lastCampoFocus = this;
} 
function focus_Event2(e) { 
	this.oldBackgroundColor = this.style.backgroundColor; this.style.backgroundColor = '#CCFFFF';
} 
function blur_Event2(e) { 
	this.style.backgroundColor = this.oldBackgroundColor;
	};//'#FFFFFF';  };

function keyPress_event(e) {

	 window.campoFocus = this; 
	 if(abrirPopup) 
	 { 
	 	atalhoPopup(this);
	    abrirPopup = false; 
	 } 
};
function blur_Event(e) { window.campoFocus = null; };

/*carrega a funcao load_focus*/
window.loadFocus = load_Focus;
window.loadAntigo = window.onload;
window.onload = function (){}//zerando evento onload
XBrowserAddHandler(window,"load","loadFocus");//adicionando evento capturador de focus
XBrowserAddHandler(window,"load","loadAntigo");//adicionando o evento normal onload para depois do evento capturador de focus
function isPopupClosed()
{
	var submited = false;
//	if(window.document.getElementById('controle_isSubmited') && 
//		window.document.getElementById('controle_isSubmited').value != '')
	var login = window;
	if(isPopup){
		while(login.top == login){
				login = login.opener;
		}
	}
	login = login.top;

	if(login.controle_isSubmited)
		submited = true;
	if(window.submitedByEvent)
		submited = true;
	//if(login.frames[0].frames[0].document.getElementById('txtControleIsSubmited') && 
  //login.frames[0].frames[0].document.getElementById('txtControleIsSubmited').value == 'true')
		//submited = true;
//	if(document.getElementById('txtAcao') && document.getElementById('txtAcao').value != '')
//		submited = true;
	
	
	
	if(submited) return false;
	else return true;

}
if (!javaFX) {
	if(window.top == window){

		window.onunload = function(){

				if( isPopupClosed() )
				{
					if(window.unload)
						window.unload();
					
					window.fecharPopups();				
				}
		}
		//XBrowserAddHandler(window,"onunload","eonunload");//adicionando o evento normal onload para depois do evento capturador de focus
	}
}
/*------*/
function barraProgresso_ClickBotao()
{
//	if(window.document.getElementById('controle_isSubmited'))
//		window.document.getElementById('controle_isSubmited').value = 'sim';

	
	setControleSubmit(true);
	try{
	if(window.top == window){//popup
		window.iniciarBarraProgresso();
	}else{
		window.top.frames[0].frames[0].iniciarBarraProgresso();	
	}
	}catch(e){
	}
		
}

var deslocWidthBar = (ie) ? 30 : 20;
var deslocHeightBar = (ie) ? 100 : 135;
//var deslocWidthBar = (ie) ? 0 : 0;
//var deslocHeightBar = (ie) ? 0 : 0;
function createBar(w,h,bgc,brdW,brdC,blkC,speed,blocks,count,action,msg)
{
	var centroBar 	= getPosicaoCentro(w,h);//200,200);
	var tamWindow	= getTamanhoWindow();
	var centroFundo = getPosicaoCentro(tamWindow.tamX, tamWindow.tamY);
	return createBarFinal(centroBar,tamWindow, centroFundo, w,h,bgc,brdW,brdC,blkC,speed,blocks,count,action,msg);
}
function createBarFixa(winX,winY,fundX,fundY,barraX,barraY,w,h,bgc,brdW,brdC,blkC,speed,blocks,count,action,msg)
{
	var centroBar 	= getPosicaoCentro(w,h);//200,200);
	var tamWindow	= getTamanhoWindow();
	var centroFundo = getPosicaoCentro(tamWindow.tamX, tamWindow.tamY);
	
	tamWindow.tamX = winX;//700;
	tamWindow.tamY = winY;//600;
	centroFundo.moveCentroY = fundY;//1;
	centroFundo.moveCentroX = fundX;//1;
	centroBar.moveCentroY = barraY;//150;
	centroBar.moveCentroX = barraX;//180;
	
	return createBarFinal(centroBar,tamWindow, centroFundo, w,h,bgc,brdW,brdC,blkC,speed,blocks,count,action,msg);
}
function focusPopup()
{
	var w = window;
	while(w == w.top)
	{
		w = w.opener;	
	}
	w.top.focarPopups();
}
function createBarFinal(centroBar,tamWindow, centroFundo, w,h,bgc,brdW,brdC,blkC,speed,blocks,count,action,msg){
/*	var centroBar 	= getPosicaoCentro(w,h);//200,200);
	var tamWindow	= getTamanhoWindow();
	var centroFundo = getPosicaoCentro(tamWindow.tamX, tamWindow.tamY);*/
	var ajusteX = 0;//45;//248;
	var ajusteY = 0;//40;//235;
	deslocWidthBar = 0;//-20;
	deslocHeightBar = 0;//-20;
	
	tamWindow	= getTamanhoWindow();
	centroFundo = getPosicaoCentro(tamWindow.tamX, tamWindow.tamY);
	centroBar = getPosicaoCentro(w, h);

	if(ie||w3c){
		var t='';
		//t+='<a href="#" onclick="barraProgresso(); return false;">Barra</a>';
		if (javaFX) {
			t+='<div id="fundoBar" onclick="focusPopup();" style="z-index:7; display:None; position:absolute; top:0; left:0; width:'+(tamWindow.tamX - deslocWidthBar)+'px; height:'+(tamWindow.tamY - deslocHeightBar)+'px;'
			t+='"></div>';
		} else {
			t+='<div id="fundoBar" onclick="focusPopup();" style="background-color:lavender; z-index:7; display:None; position:absolute; top:0; left:0; width:'+(tamWindow.tamX - deslocWidthBar)+'px; height:'+(tamWindow.tamY - deslocHeightBar)+'px;opacity:0.6;'
			t+=(ie)?'filter:alpha(opacity='+60+')':'-Moz-opacity:'+(0.6);
			t+='"></div>';
		}
		//t+='<div id="fundoBar" onclick="focusPopup();" style="background-color:red; z-index:7; display:None; position:absolute; width:100%; heigth:100%;'
//		t+='<div id="fundoBar" onclick="focusPopup();" style="background-color:lavender; z-index:7; display:None; position:absolute; top:1; left:1; width:400px; height:100%;';
		//<div id=\"divData\" style = \"position:absolute;top:72px;left:12px;height:18px;width:55px;background-color:D4D0C8;z-index:6;display:None;font-family:Verdana;font-size:11;font-style:normal;font-weight:normal;-moz-box-sizing:border-box;\">");
		t+='<div id="barraProgresso" style="visibility:visible; z-index:8; position:absolute; top:'+(centroBar.moveCentroY-ajusteY)+'; left:'+(centroBar.moveCentroX-ajusteX)+';">';
		//t+='<div id="barraProgresso" style="visibility:visible; z-index:300; position:absolute; top:'+300+'; left:'+300+';">';
		t+='<div id="_xpbar'+(++N)+'" style="display:none; position:relative; z-index:8; overflow:hidden; width:'+w+'px; height:'+h+'px; background-color:'+bgc+'; border-color:'+brdC+'; border-width:'+brdW+'px; border-style:solid; font-size:1px;">';
		t+='<span id="blocks'+N+'" style="left:-'+(h*2+1)+'px; position:absolute; font-size:1px">';
		for(i=0; i<blocks; i++){
			t+='<span style="background-color:'+blkC+'; left:-'+((h*i)+i)+'px; font-size:1px; position:absolute; width:'+h+'px; height:'+h+'px; '
			if (!javaFX) {
				t+=(ie)?'filter:alpha(opacity='+(100-i*(100/blocks))+')':'-Moz-opacity:'+((100-i*(100/blocks))/100);
			}
			t+='"></span>';
		}
		//t+='</span><span style="vertical-align:\'middle\';"><table border="0"><tr><td style="vertical-align:\'middle\';'+estiloFonte+'; width:'+w+'px; height:'+h+'px;text-align:\'center\';"><center><b>'+msg+'</b></center></td></tr></table></span></div>';
		t+='</span><span style="font: 10px Verdana; width:'+w+'px; height:'+h+'px;text-align:\'center\';"><center><b>'+msg+'</b></center></span></div>';
		t+='</div>';

		document.write(t);


		var barraProgressoAjax=(ie)?document.all['blocks'+N]:document.getElementById('blocks'+N);
		barraProgressoAjax.fundo = new Object();
		barraProgressoAjax.fundo=(ie)?document.all['fundoBar']:document.getElementById('fundoBar');
		barraProgressoAjax.bar=(ie)?document.all['_xpbar'+N]:document.getElementById('_xpbar'+N);
		barraProgressoAjax.blocks=blocks;
		barraProgressoAjax.N=N;
		barraProgressoAjax.w=w;
		barraProgressoAjax.h=h;
		barraProgressoAjax.speed=speed;
		barraProgressoAjax.ctr=0;
		barraProgressoAjax.count=count;
		barraProgressoAjax.action=action;
		//barraProgressoAjax.togglePause=togglePause;
		barraProgressoAjax.showBar=function(){
			//this.bar.style.visibility="visible";
			this.bar.style.display="block";
			this.fundo.style.display="block";
//			hideFormSelect();
//			hideIframe();
		}
		barraProgressoAjax.hideBar=function(){
			//this.bar.style.visibility="hidden";
			this.bar.style.display="none";
			this.fundo.style.display="none";
//			showFormSelect();
//			showIframe();
		}
		barraProgressoAjax.initBar=function(){
			this.showBar()
			barraProgressoAjax.tid=setInterval('startBar('+N+')',speed);
		}
		barraProgressoAjax.stopBar=function(){
			this.hideBar()
			clearInterval(barraProgressoAjax.tid);
		}
		//this.hide();
		return barraProgressoAjax;
	}
}


var winPopupBarra;
var interval;
function iniciarBarraProgresso(winPopup){
	
	if(navigator.userAgent.indexOf("Firefox")!= -1){
		var temp = navigator.userAgent.indexOf("Firefox") + 8;
		var versao = navigator.userAgent.substring(temp, temp + 6);
		var numeroVersao =versao.split(".");
		if(numeroVersao[0] > 13){
			bloqueiaTeclado();
		}
	}else{
		bloqueiaTeclado();
	}
	
	
	
	
	
	if(typeof barraProgressoAjax == "undefined"){
		barraProgressoAjax = createBar(320,15,'lightyellow',1,'black','green',50,7,9999,'','');
		barraProgressoAjax.hideBar();
	}
	barraProgressoAjax.initBar();
	if(winPopup){
		winPopupBarra = winPopup;
		interval = setInterval('testePararBarra()',1);
	}
	
}
function testePararBarra(){
	clearInterval(interval);
	interval = setInterval('testePararBarra()',1);
	if(winPopupBarra && winPopupBarra.closed){
		clearInterval(interval);
		barraProgressoAjax.hideBar();
	}
}

/**
* Para a barra de progresso
*/
function pararBarraProgresso(){
	
	
	if(navigator.userAgent.indexOf("Firefox")!= -1){
		var temp = navigator.userAgent.indexOf("Firefox") + 8;
		var versao = navigator.userAgent.substring(temp, temp + 6);
		var numeroVersao =versao.split(".");
		if(numeroVersao[0] > 13){
			load_apos_parada();
			restaurarJkey();
		}
	}else{
		load_apos_parada();
		restaurarJkey();
	}
	
	
	
	
	if(parent.barraProgressoAjax) {
		parent.barraProgressoAjax.stopBar();
		//window.top.frames[0].frames[0].barraProgressoAjax.stopBar();	
		
	}
	if(isPopup){
		setControleSubmit(false);	
	}
}

/**
* Inicia a barra de progresso
*/
function startBar(bn){
	var t=(ie)?document.all['blocks'+bn]:document.getElementById('blocks'+bn);
	try {

	  if( this.tid != 0){
		if(t.style && parseInt(t.style.left)+t.h+1-(t.blocks*t.h+t.blocks)>t.w){
			t.style.left=-(t.h*2+1)+'px';
			t.ctr++;
			if(t.ctr >= t.count){
				eval(t.action);
				clearInterval(this.tid)
				this.tid=0;
				t.ctr=0;
			}
		}else
			t.style.left=(parseInt(t.style.left)+t.h+1)+'px';
	  }
	  } catch (e) {
	    // Nao precisa tratar
	  }

		//Posiciona a barra e fundo caso haja scroll na p?gina
		var posScroll = getPosicaoScroll();
		//redimensionaElementoPor("fundoBar", posScroll.posEsquerda, posScroll.posTopo);
		//posicionaElementoPor("barraProgresso", posScroll.posTopo, posScroll.posEsquerda);
}

function getPosicaoCentro(w,h,posX, posY){

	var moveCentroX 	= 0;
	var moveCentroY 	= 0;

	if( (posX && posX != "") || (posY && posY != "") ) {
		if(posX && posX != "")
			moveCentroX = posX;
		if(posY && posY != "")
			moveCentroY = posY;
	}
	else {
	
		if(document.all)
		{

			moveCentroX = document.body.clientWidth/2;
			moveCentroX = moveCentroX - (w/2);
			moveCentroY = document.body.clientHeight/2;
			moveCentroY = moveCentroY - (h/2);
			//netscape.security.PrivilegeManager.enablePrivilege("UniversalBrowserRead");
			//netscape.security.PrivilegeManager.enablePrivilege("UniversalBrowserWrite");
		}
		else
		{
			moveCentroX = (window.innerWidth/2);
			moveCentroX = moveCentroX - (w/2);
			moveCentroY = (window.innerHeight/2);
			moveCentroY = moveCentroY - (h/2);
		}
	}

	var posicaoCentro = new Object(moveCentroX, moveCentroY);
	posicaoCentro.moveCentroX 	= moveCentroX;
	posicaoCentro.moveCentroY 	= moveCentroY;
	return posicaoCentro;
}


function getTamanhoWindow(){

	var tamX	= 0;
	var tamY	= 0;

	//Centralizar janela popup
	if(NNav)
	{
		tamX	= window.outerWidth;
		tamY	= window.outerHeight;
	}
	else
	{
		tamX	= screen.availWidth;
		tamY	= screen.availHeight;
	}
	
	if(document.all)//ie
	{
		tamX = document.body.clientWidth;
		tamY = document.body.clientHeight;
	}else{
		tamX = window.innerWidth;
		tamY = window.innerHeight;
	}
	
	
	var tamWindow = new Object(tamX, tamY);
	tamWindow.tamX 	= tamX;
	tamWindow.tamY 	= tamY;
	return tamWindow;
}


function hideFormSelect()
{
  if (!document.all)
  {
    return; // only Internet Explorer is affected by the bug
  }
  var dfl = document.forms.length;
  for (var i = 0; i < dfl; i++)
  { 
    var dfle = document.forms[i].elements.length;
    for (var j = 0; j < dfle; j++)
    {
      if (document.forms[i].elements[j].type)
      {
         // hide type select and button on IE 
         if (document.forms[i].elements[j].type.indexOf('sel') != -1 || document.forms[i].elements[j].type.indexOf('button') != -1) 
         {
            document.forms[i].elements[j].style.visibility = 'hidden'
            //document.forms[i].elements[j].disabled = true
         }
      }
    }
  }
}


function showFormSelect()
{
  if ( !document.all)
  {
    return; // only Internet Explorer is affected by the bug
  }
  var dfl = document.forms.length;
  for (var i = 0; i < dfl; i++)
  {
    var dfle = document.forms[i].elements.length;
    for (var j = 0; j < dfle; j++)
    {
      if (document.forms[i].elements[j].type)
      {
        // show type select and button on IE 
        if (document.forms[i].elements[j].type.indexOf('sel') != -1 || document.forms[i].elements[j].type.indexOf('button') != -1 )
        {
            document.forms[i].elements[j].style.visibility = 'visible';
            //document.forms[i].elements[j].disabled = false
        }
      }
    }
  }
}

function hideIframe()
{
	if(document.frames){
		for(i = 0; i < document.frames.length; i++)
		{
			try{
				var ifUrl = document.frames[i].location.href;
				setVisible(document.frames[i].name, "hidden");
			}catch(e){
				plcLog.debug("IFRAME SEM PERMISSAO DE ACESSO");
			}
		}
	}
}

function showIframe()
{
	if(document.frames){
		for(i = 0; i < document.frames.length; i++)
		{
			try{
				var ifUrl = document.frames[i].location.href;
				setVisible(document.frames[i].name, "visible")
			}catch(e){
				plcLog.debug("IFRAME SEM PERMISSAO DE ACESSO");
			}
		}
	}
}

function getPosicaoScroll(){

	var dsocleft = document.all? getDocumento().scrollLeft : pageXOffset;
	var dsoctop	=	document.all? getDocumento().scrollTop : pageYOffset;

	var posicaoScroll = new Object();
	posicaoScroll.posEsquerda 	= dsocleft;
	posicaoScroll.posTopo 			= dsoctop;
	return posicaoScroll;
}

function getDocumento(){
	return (document.compatMode && document.compatMode!="BackCompat") ? document.documentElement : document.body
}


function getElementoStyle(elementoID){

	var crossElemento = getElementoPorId(elementoID);
	var crossElementoStyle = "";
	if(crossElemento){
		if (document.all||document.getElementById)
			crossElementoStyle =  eval(crossElemento.style);
		else if (document.layers)
			crossElementoStyle =  crossElemento;
	}
	return crossElementoStyle;
}


function posicionaElemento(elementoID, posX, posY, incremental){
	var crossElementoStyle = getElementoStyle(elementoID);
	incremental = incremental != "" || typeof incremental != "undefined" ? incremental : false;
	var crossElementoStyle = getElementoStyle(elementoID);
	if(posX && posX != "" && typeof posX != "undefined")
		crossElementoStyle.top = incremental ? getVarGlobal("topo"+elementoID) + parseInt(posX) : parseInt(posX) ;
	if(posY && posY != "" && typeof posY != "undefined")
		crossElementoStyle.left = incremental ? getVarGlobal("esquerda"+elementoID) + parseInt(posY) : parseInt(posY);
}

function posicionaElementoPor(elementoID, posX, posY){
	var crossElementoStyle = getElementoStyle(elementoID);
	if(getVarGlobal("esquerda"+elementoID) == null)
		setVarGlobal("esquerda"+elementoID,parseInt(crossElementoStyle.left));
	if(getVarGlobal("topo"+elementoID) == null)
		setVarGlobal("topo"+elementoID,parseInt(crossElementoStyle.top));

	posicionaElemento(elementoID, posX, posY, true);
}

function redimensionaElemento(elementoID, wa, ha, incremental){

	incremental = incremental != "" || typeof incremental != "undefined" ? incremental : false;
	var crossElementoStyle = getElementoStyle(elementoID);
	if(wa && wa != "" && typeof wa != "undefined")
		crossElementoStyle.width = incremental ? getVarGlobal("largura"+elementoID) + wa : wa;
	if(ha && ha != "" && typeof ha != "undefined")
		crossElementoStyle.height = incremental ? getVarGlobal("altura"+elementoID) + ha : ha;
}

function redimensionaElementoPor(elementoID, wa, ha){
	var crossElementoStyle = getElementoStyle(elementoID);
	if(getVarGlobal("altura"+elementoID) == null)
		setVarGlobal("altura"+elementoID,parseInt(crossElementoStyle.height));
	if(getVarGlobal("largura"+elementoID) == null)
		setVarGlobal("largura"+elementoID,parseInt(crossElementoStyle.width));

	redimensionaElemento(elementoID, wa, ha,true);
}

function getElementoPorId(elementoID){
	var crossElemento = null;
	if(document.all && eval("document.all."+elementoID))
		crossElemento = eval("document.all."+elementoID);
	else if(document.getElementById && document.getElementById(elementoID))
		crossElemento = document.getElementById(elementoID)
	else if (eval("document."+elementoID))
		return eval("document."+elementoID);
	return crossElemento;
}

/*********************************
* Switch Content script- ? Dynamic Drive (www.dynamicdrive.com)
* This notice must stay intact for legal use. Last updated Mar 23rd, 2004.
* Visit http://www.dynamicdrive.com/ for full source code
***********************************************/
/********************************************************************************
IMPORTANTE: ESTE PAR?METRO DEVE ESTAR COM VALOR "off" PARA EVITAR PROBLEMA DE
QUEDA DE SESS?O PELA SUBSTITUI??O DO COOKIE DE SESS?O
********************************************************************************/
var enablepersist="off" //Enable saving state of content structure using session cookies? (on/off)
/********************************************************************************/

var collapseprevious="no" //Collapse previously open content when opening present? (yes/no)

if (document.getElementById){
document.write('<style type="text/css">')
document.write('.expandeRetraiPlc{display:none;}')
document.write('</style>')
}

function getElementbyClass(classname){
ccollect=new Array()
var inc=0
var alltags=document.all? document.all : document.getElementsByTagName("*")
for (i=0; i<alltags.length; i++){
if (alltags[i].className==classname)
ccollect[inc++]=alltags[i]
}
}

/* ---------------------------------------------------------------------- *\
  Function    : setVarGlobal
  Description : set a variable with a global scope
  Usage       : setVarGlobal(varName, value);
  Arguments   : varName - name of the global variable to set
                value - value of the global variable to set
\* ---------------------------------------------------------------------- */
function setVarGlobal(nome, valor) {
   if (this.cache == null) {this.cache = new Object();}
   this.cache[nome] = valor;
}
/* ---------------------------------------------------------------------- *\
  Function    : getGlobalVar
  Description : get a variable in a global scope
  Usage       : value = getGlobalVar(varName);
  Arguments   : varName - name of the global variable to get
                value - value of the global variable to get
\* ---------------------------------------------------------------------- */
function getVarGlobal(nome, valor) {
   if (this.cache == null) {
     return null;
   } else {
     return this.cache[nome];
   }
}


/* ---------------------------------------------------------------------- *\
	FUN??O PARA TRATAMENTO DE ERROS
\* ---------------------------------------------------------------------- */
function stoperror(){

    // Comentado devido a erro Desconhecido Mozila
    //var strErro = 	"ALERTA DE ERRO\n";
	//var strErro = "ALERTA DE ERRO. Ocorreu um erro no javascript desta pagina.\n";
	//alert(strErro+"Mensagem: "+arguments[0]+"\n"+arguments[1]+" [Linha: "+arguments[2]+"]");
	//return true;
}

/*-----------------------------------------------------*\

                        FUN??ES PARA LOG JAVASCRIPT EM CONSOLE

\*-----------------------------------------------------*/

function PlcLog (){

            this.isEnabled = false;

            this.console = new Object();

}

var plcLog = new PlcLog();

 

PlcLog.prototype.newLogErros = function(){

            plcLog.logErros = new Object();

            plcLog.logErros["TAMANHO"] = 0;

}

 

PlcLog.prototype.logErros = new plcLog.newLogErros();

 

PlcLog.prototype.logEvent = function (evt){}

 

//Envia alerta de excecao

PlcLog.prototype.alertaExcecao = function (ex, msg){alert(plcLog.montaMsgExcecao(ex,msg));}

 

//Envia log de excecao

PlcLog.prototype.logExcecao = function (ex, msg){plcLog.debug(plcLog.montaMsgExcecao(ex,msg));}

 

PlcLog.prototype.logMostraErros = function (){

            plcLog.debug("LOG MOSTRA ERROS")

            var erros = plcLog.logPreparaErros()

            if(plcLog.logErros["TAMANHO"] > 0){

                        getElementoStyle("MENSAGEM_TABELA").display  = 'none';

                        getElementoStyle("VALIDACAO_TABELA_JAVASCRIPT").display  = 'block';

                        getElementoPorId("VALIDACAO_ERROS_JAVASCRIPT").innerHTML = erros;

                        plcLog.debug("ERROS "+erros)

                        plcLog.newLogErros();

            }

}

 

PlcLog.prototype.logEscondeErros = function (){

            //plcLog.debug("LOG ESCONDE ERROS")

            var tabela = getElementoStyle("VALIDACAO_TABELA_JAVASCRIPT");

            var erros = getElementoPorId("VALIDACAO_ERROS_JAVASCRIPT");

            if (tabela && erros) {

                        tabela.display = "none";

                erros.innerHTML = "";

                        plcLog.newLogErros();

            }

}

 

PlcLog.prototype.logPreparaErros= function (){

            plcLog.debug("LOG PREPARA ERROS")

            var msgErros = "";

            var k = 0;

            var naoInformouCamposObrigatorios = false;

            for (var propErro in plcLog.logErros){

                        if(propErro != "TAMANHO"){

                                   plcLog.debug("PROP: "+propErro);

                                   plcLog.debug("ERRO: "+plcLog.logErros[propErro]);

                                   if(plcLog.logErros[propErro] != "OBRIGATORIO"){

                                               msgErros += "<img align='ABSMIDDLE' alt='Erro' height='11' hspace='4' src='"+plcGeral.contextPath+"/plc/midia/msgVermelho/lin.gif' vspace='4' width='11'>";

                                               msgErros += plcLog.logErros[propErro] + "<br>";

                                   }else

                                               naoInformouCamposObrigatorios = true;

                        //          alert('propErro='+propErro);

                          //  alert('valor='+getCampo(propErro));

                           //  alert('valor aval ='+getCampo(propErro)+ " tipo="+(typeof getCampo(propErro)));

                                   if ((!(getCampo(propErro)) && !(getCampo(propErro).type) &&

                                        getCampo(propErro).length && getCampo(propErro).length>1)) {

                                               for (var j = 0; j<getCampo(propErro).length; j++) {

                                                           alteraClasse ("OBJETO",getCampo(propErro)[j],"CLASSE","campoComErro","NOVACLASSE");

                                               }

                                   }  else {

                                                           alteraClasse ("CAMPO",propErro,"CLASSE","campoComErro","NOVACLASSE");

                                   }

 

                                   if(k == 0)

                                               setFocus(propErro);

                                   k++;

                        }

            }

            if(naoInformouCamposObrigatorios){

                        msgErros += "<img align='ABSMIDDLE' alt='Erro' height='11' hspace='4' src='"+plcGeral.contextPath+"/plc/midia/msgVermelho/lin.gif' vspace='4' width='11'>";

                        msgErros += plcGeral.obrigatorioMsg;

            }

 

            return msgErros;

}

 

PlcLog.prototype.logAdicionaErro = function (){

            plcLog.debug("ADICIONA ERRO")

            if(arguments.length == 1){

                        this.ID   = "ERRO_"+plcLog.logErros.TAMANHO;

                        this.ERRO        = arguments[0];

            }else{

                        for(var j = 0; j < arguments.length; j++)

                        {

                                   if(arguments[j] == "ID")

                                               this.ID = arguments[++j];

                                   if(arguments[j] == "ERRO")

                                               this.ERRO = arguments[++j];

                        }

            }

            plcLog.debug("ADD ERRO - ID: "+this.ID)

            plcLog.debug("ADD ERRO - ERRO: "+this.ERRO)

            plcLog.logErros[this.ID] = this.ERRO;

            plcLog.logErros["TAMANHO"] = plcLog.logErros.TAMANHO + 1;

}

 

PlcLog.prototype.logAdicionaErroCampo = function (nomeCampo, erro){

            plcLog.debug("ADICIONA ERRO CAMPO");

            plcLog.logAdicionaErro("ID", nomeCampo, "ERRO", erro);

}

 

PlcLog.prototype.logEnviaErro = function (erro){

            plcLog.debug("ENVIA ERRO");

            plcLog.logAdicionaErro(erro);

            plcLog.logMostraErros();

}

 

PlcLog.prototype.logEnviaErroCampo = function (nomeCampo, erro){

            plcLog.debug("ENVIA ERRO CAMPO");

            plcLog.logAdicionaErro("ID", nomeCampo, "ERRO", erro);

            plcLog.logMostraErros();

}

 

//Monta mensagem de excecao

PlcLog.prototype.montaMsgExcecao = function (ex, msg){

            var msgExPadrao = "ALERTA DE ERRO. Ocorreu um erro no javascript desta pagina.";

            var descEx = plcLog.logGetDescExcecao(ex);

            if(typeof msg != "undefined")

                        msgExPadrao += "\n" + msg;

            var msgEx = msgExPadrao + "\nExcecao: "+ ex.name +".\nDescricao: "+ descEx;

            return msgEx;

}

 

//Recupera descri??o da exce??o

PlcLog.prototype.logGetDescExcecao = function (ex){
    return ExpYes ? ex.description : ex.message;
}

if (ExpYes){
	document.onkeydown   = function() { plcLog.logEvent(event); }
}else {
    document.onkeydown   = function(evt){
       plcLog.logEvent(evt);
   }
}

 

var strChave = "";

PlcLog.prototype.logEvent = function (evt){

            var ord = ""; // ascii order of key pressed

            if (ExpYes) {ord = evt.keyCode;} else {ord = evt.which;}

            var altKey    = evt.altKey;
            var ctrlKey   = evt.ctrlKey;
            var shiftKey  = evt.shiftKey;
			window.submitedByEvent = (isXseed && (ord == 13 || ord == 34)) ? true : false;
			if(window.submitedByEvent)
			   barraProgresso_ClickBotao();
             /*alert(
            "evt.type: "+evt.type+"\n"+
            "ctrlKey: "+ctrlKey+"\n"+
            "altKey: "+altKey+"\n"+
            "shiftKey: "+shiftKey+"\n"+
            "ord: "+ord+"\n"
            )*/
			//Botões Externos iframe mais interno
            if (ord != '' && evt.type == 'keydown') {
               var form = document.forms[0];
               var parentForm = self;

				/* apontando o parentForm para PagPrincipal */
	            while(parentForm != parentForm.parent && parentForm.parent.document.forms.length != 0){
					parentForm = parentForm.parent;
	            }
 

               var lAccessKey = ord;
               
               // Construindo acceskey composto
               if (altKey || ctrlKey || shiftKey && (ord != '')) {
                  lAccessKey="";
                  if (ctrlKey)  {lAccessKey="17|"}
                  if (shiftKey) {lAccessKey="16|"}
                  if (altKey)   {lAccessKey="18|"}
                  lAccessKey += ord;
               }
               // Desabilitando Tecla de Atalho do Browser
			   // permitibdo apenas ctrl+C,ctrl+P,ctrl+V,ctrl+X
               if( (ctrlKey && (ord != 67 && ord != 80 && ord != 86 && ord != 88) ) | altKey | (ord == 112) | (ord == 113) | (ord == 114) | (ord == 115) | (ord == 116) | (ord == 117) | (ord == 118) | (ord == 119) | (ord == 120) | (ord == 121) | (ord == 122) | (ord == 123) | (form.barraProgressoAjax != undefined) ) { // (f11)
                   if (evt.preventDefault) {
                       evt.preventDefault(); // The W3C DOM way
                       evt.stopPropagation(); 
                   } else {
                       evt.returnValue = false; // The IE way
                       evt.cancelBubble=true;
                       evt.keyCode = false;
                   }
               }
               var encontrou = false;
               var tipo = "";
 			   if(ctrlKey && ord == 72){
					if(window.campoFocus != null){
						atalhoPopup(window.campoFocus);
 					}else{
	 			   		abrirPopup = true; 					
 					}
					encontrou = true;
            	}

               // Botões Internos - Referência Page Interna
               var dfel = form.elements.length;
               for (var j = 0; j < dfel; j++) {
                   tipo = form.elements[j].type;
                   if (tipo) {tipo = tipo.toLowerCase();} else {tipo = "";}
                   if (tipo =='button') {
                   		if (form.elements[j].accessKey==lAccessKey) {
                   			encontrou = true;
                   			direcionarTeclaAtalho(form, form.elements[j]);
                   		}
                   }
               }
               form = parentForm.document.forms[0];
               // Referência txtLocalizarTransacao - PagPrincipal
               if (ctrlKey && (ord==73)) {

                   var dfel = form.elements.length;
                   for (var j = 0; j < dfel; j++) {
                      tipo = form.elements[j].type;
                      if (tipo) {tipo = tipo.toLowerCase();} else {tipo = "";}
                      if (tipo =='text' && form.elements[j].name=='txtLocalizarTransacao') {
                          form.elements[j].select();
                      }
                   }
               }

               // Botões Externos - Chamada click() quando focus no Frame Interno
               if(parent.document.form != undefined && !encontrou){
	               var dfel = parent.document.form.elements.length;
	               for (var j = 0; j < dfel; j++) {
                                tipo = parent.document.form.elements[j].type;
                                tipo = tipo.toLowerCase();
                                if (tipo =='button') {
	               			if (parent.document.form.elements[j].accessKey==lAccessKey) {
	                   			encontrou = true;
	                                        direcionarTeclaAtalho(parent.document.form, parent.document.form.elements[j]);
	                      	}
	                   }
	               }
	           }
               // Botões Externos - Chamada click() quando focus no Frame PagBotões
               var dfel = form.elements.length;
               if(!encontrou){
               for (var j = 0; j < dfel; j++) {
                        tipo = form.elements[j].type;
                        if (tipo) {tipo = tipo.toLowerCase();} else {tipo = "";}
                        if (tipo == 'button') {
               			if (form.elements[j].accessKey==lAccessKey) {
                	            encontrou = true;
                                    direcionarTeclaAtalho(form, form.elements[j]);
                      	}
                   }
               }
               }
               return false;
            }
            
            //Clicando SHIFT + CTRL + C
            if (shiftKey && ctrlKey && (ord == 67) && evt.type == 'keydown') {     //Abrir console javascript
                evt.returnValue = false;  evt.cancelBubble = true;
                plcLog.isEnabled = !plcLog.isEnabled;
                if (plcLog.isEnabled){
                    plcLog.console.window = window.open("","CONSOLE");
                    plcLog.console.window.document.writeln("<input type='button' onclick='window.document.all.CONSOLE.innerHTML=\"\"' value='Limpar'>");
                    plcLog.console.window.document.write("<input type='button' onclick='window.close()' value='Fechar'>");
                    plcLog.console.window.document.writeln("<H3>CONSOLE JAVASCRIPT</H3>");
                    plcLog.console.window.document.writeln("<div id='CONSOLE'>");
                    plcLog.console.window.document.writeln("</div>");
                }else{
                    plcLog.console.window.close();
                }
            }

            var retornoEvento = "undefined";//executarAtalho(evt);
            
            try{
                document.focus() ;
            }catch(e){
            }
            if(retornoEvento) return retornoEvento;

            //if (!ctrlKey | !altKey | !(ord == 122)) return true;
            return true;

}
 

PlcLog.prototype.debug = function (log) {

            if (plcLog.isEnabled) {
                if (eval(plcLog.console.window) && !plcLog.console.window.closed) {
                    plcLog.console.window.focus();
                    var htmlLog = plcLog.console.window.document.all.CONSOLE.innerHTML;
                    htmlLog += "<br>" + log;
                    plcLog.console.window.document.all.CONSOLE.innerHTML = htmlLog;
                }
            }

}

function direcionarTeclaAtalho(form, element){
/*	//if(element.style.visibility != "hidden"){
		if(element.name.substring(0, 8) == 'BT_ACAO_'){
			//Se botão interno do Xseed, procura o campo de acao.
			for (var i = 0; i < form.elements.length; i++){
				var elementoForm = form.elements[i].name;
				var elementoProcurado = element.name.substring(8).split('*')[0];
				if ( elementoForm == elementoProcurado ){
					var acao = element.name.substring(8).split('*')[1]
					form.elements[i].value = acao;
					break;
				}
            }
	        form.BT_SUBMIT.click();
	    //Se não for xseed, apenas dá um click no botao.
	    //Obs.: Tanto no xseed quanto no innovation, usa-se botoes para
	    //atalho interno, entretanto, no xseed não é possível indicar
	    //uma função a ser executada no evento onclick.
	    }else{
			element.click();
		}
	//}*/
	if(element.name.substring(0, 8) == 'BT_ACAO_'){
		var idBotClick = 'id'+element.name.substring(8);
		var botClick = document.getElementById(idBotClick);

		botClick.click();
	
	}
	else
		element.click();
}

window.onerror=stoperror;

function winPopUpGenerica( strServlet, strAtribRetorno, strAtribFiltro, strExecAuto, strTipoRetorno)
{
win = strServlet + '?P_TELA=formAppCliente&P_SERVLET='+ strServlet +'&P_ATRIB_RETORNO=' + encodeURIComponent(strAtribRetorno) + '&P_ATRIB_FILTRO=' + strAtribFiltro + '&P_EXEC_AUTO=' + strExecAuto + '&P_TIPO_RETORNO=' + strTipoRetorno;
tela = window.open(win, strServlet,'titlebar=yes,alwaysRaised=yes,height=580,width=880,top=1,left=1,menubar=0,resizable=1,scrollbars=1,status=1');
tela.focus();
}
function winPopUpGenericaRet( strServlet, strAtribRetorno, strAtribFiltro, strExecAuto, strTipoRetorno,pTelaRetorno)
{
	win = strServlet + '?P_TELA=formAppCliente&P_SERVLET='+ strServlet +'&P_ATRIB_RETORNO=' + encodeURIComponent(strAtribRetorno) + '&P_ATRIB_FILTRO=' + strAtribFiltro + '&P_EXEC_AUTO=' + strExecAuto + '&P_TIPO_RETORNO=' + strTipoRetorno+'&P_TELA_RETORNO='+pTelaRetorno;
	tela = window.open(win, strServlet,'titlebar=yes,alwaysRaised=yes,height=580,width=880,top=1,left=1,menubar=0,resizable=1,scrollbars=1,status=1');
	tela.focus();
}
function fecharPopupLoad(){

	window.loadToClose = function(){
		window.close();	
	}
	XBrowserAddHandler(window,"load","loadToClose");

	//document.getElementById('controle_isSubmited').value = '';
	//document.forms[0].submit();
}
function fecharPopup()
{
	setControleSubmit(false);
	window.close();
}
function setControleSubmit(flag)
{
	var login = window;
	if(isPopup){
		while(login.top == login){
				login = login.opener;
		}
	}
	login = login.top;
	login.controle_isSubmited = flag;
	//login.frames[0].frames[0].document.getElementById('txtControleIsSubmited').value = flag ? 'true' : 'false';
	

}
function submitFormXseed()
{
	setControleSubmit(true);
	// window.document.getElementById('controle_isSubmited').value = 'sim';
	window.document.forms[0].submit();
//jXmit();   	
}
function barraProgresso_submit()
{
	
	barraProgresso_ClickBotao();	
	
	
	// window.document.getElementById('controle_isSubmited').value = 'sim';
	window.document.forms[0].submit();
}


//quando for popup criar barra de progresso
//observacao : antes o codigo ficava dentro de cada popup
if(window.top == window){//popup
	
   if(typeof barraProgressoAjax == "undefined")
   {
     barraProgressoAjax = createBar(320,15,'lightyellow',1,'black','green',50,7,9999,'','');
     barraProgressoAjax.hideBar();
   }
   else 
   {
	
	 pararBarraProgresso();
   }

}else{
	 if(typeof parent.barraProgressoAjax != "undefined"){
			pararBarraProgresso();
	
    }	
}

function bloquearEvento(event){
	if (event.preventDefault) {
        event.preventDefault(); // The W3C DOM way
        event.stopPropagation(); 
    } else {
        event.returnValue = false; // The IE way
        event.cancelBubble=true;
        event.keyCode = false;
    }
}

function restaurarJkey(){
	
	
	//if(getLogin().isAlteradaFuncao=='S' && typeof getLogin().funcaoJkey!= "undefined"){
	//getLogin().isAlteradaFuncao=='S' && 
	if(typeof getLogin().funcaoJkey!= "undefined"){
		//window['jKey']=getLogin().funcaoJkey;
		
		window.jKey=function (pEvent){
		if (flagEnter == 0)
  {
     flagEnter = 999;
     return false;
  }
  if (pEvent.keyCode == 8)
  {
     if (flagTxt == 999)
     {
        return true;
     }
     window.event.keyCode = 0;
     return false;
  }
  if (pEvent.keyCode == 122)
  {
     alert("A tecla F11 está desabilitada.");
     window.event.keyCode = 0;
     return false;
  }
  if (pEvent.ctrlKey && pEvent.keyCode == 85)
  {
     alert("A tecla CTRL-U está desabilitada.");
     return false;
  }
  if (pEvent.ctrlKey && pEvent.keyCode == 78)
  {
     alert("A tecla CTRL-N está desabilitada.");
     return false;
  }
  if (pEvent.altKey && pEvent.keyCode == 37)
  {
     alert("A tecla ALT <- está desabilitada.");
     return false;
  }
  if (pEvent.altKey && pEvent.keyCode == 39)
  {
     alert("A tecla ALT -> está desabilitada.");
     return false;
  }
  if (pEvent.keyCode == 27) jMsg(false);
  if (pEvent.keyCode == 13) jXmit();
  if (pEvent.keyCode == 35) frmPEDCV_PECAS_PAGE.XFL_ACAO7.focus();
  if (pEvent.keyCode == 36) frmPEDCV_PECAS_PAGE.PED_NUM.focus();
	
		};
		getLogin().isAlteradaFuncao='N';
		
	}
}


function bloqueiaTeclado(){
	var login =	getLogin();
	//if(typeof login.window.name= == 'login.html'){
	//if(typeof login != 'undefined'){
	//	if(typeof login.frames[0] != 'undefined'){
	//		if(typeof login.frames[0].frames[0] != 'undefined'){
	//			if(typeof login.frames[0].frames[0].window != 'undefined'){
				
			var  pagBotoes= getPagBotoes();
			
			document.onkeydown   = function(evt){
			
			}
			PlcLog.prototype.logEvent = function (evt){
			
			}
			
			pagBotoes.redirect =function(codTra, camposTela, acaoBotao) {
				//alert('testando');
			}
			//alert(pagBotoes.redirect);
			pagBotoes.retornar =function(variavel) {
				//alert('testando');
			}
			//alert(pagBotoes.retornar);
			if(isPopup){
				var elems = document.forms[0].elements;
			}else{
				var doc = document.getElementById('ifrTransacoes');
				var elems = doc.contentWindow.document.forms[0].elements;
				
			}	
			//if(typeof doc != 'undefined' && typeof doc.contentWindow['jKey'] != 'undefined'){
			if(typeof doc.contentWindow['jKey'] != 'undefined'){
			
			
				getLogin().funcaoJkey=doc.contentWindow['jKey'];
				getLogin().isAlteradaFuncao='S';
				
				doc.contentWindow['jKey']= function (pEvent){
			
				}
			}
			var tipo = "";
			//setControleSubmit(false);
			
			for(var i=0; i<elems.length; i++)
			{	var elem = elems[i];
				
				tipo = elem.type;
				if (tipo) {tipo = tipo.toLowerCase();} else {tipo = "";}
				
				if(tipo == 'text'){
				
					
					elem.keyPressEvent = bloquearEvento;
					elem.keyDownEvent=bloquearEvento;
					elem.keyup=bloquearEvento;
					elem.focusEvent = bloquearEvento;
					elem.blurEvent = bloquearEvento;
					
					
				}
				if(elem.type && (tipo == 'text' || tipo == 'textarea' || tipo.indexOf('sel') != -1))
				{		
					elem.focusEvent2 = bloquearEvento;
					elem.blurEvent2 = bloquearEvento;
					
				}
		
		}
	//}}}}
	//}
}

function load_apos_parada() {

	
	var elems = document.forms[0].elements;//getElementsByTagName("INPUT");
	if(elems.length ==0){
		 elems = parent.document.forms[0].elements;//getElementsByTagName("INPUT");
	}
	var tipo = "";
	setControleSubmit(false);
	
	var login =	getLogin();
	
	if(typeof login != 'undefined'){
		if(typeof login.frames[0] != 'undefined'){
			if(typeof login.frames[0].frames[0] != 'undefined'){
				if(typeof login.frames[0].frames[0].window != 'undefined'){
					login.frames[0].frames[0].window.redirect =login.frames[0].frames[0].window.redirectOriginal;
					login.frames[0].frames[0].window.retornar =login.frames[0].frames[0].window.retornarOriginal;
				}
			}
		}
	}
	
	
	//alert(pagBotoes.retornar);
	for(var i=0; typeof elems != 'undefined' && i<elems.length; i++)
	{
		var elem = elems[i];
		if(elem.style.visibility.toUpperCase() == 'HIDDEN') continue;
		tipo = elem.type;
		if (tipo) {tipo = tipo.toLowerCase();} else {tipo = "";}
		if(tipo == 'text'){
			elem.focusEvent = focus_Event;
			elem.blurEvent = blur_Event;
			elem.keyPressEvent = keyPress_event;
			
		}
		if(elem.type && (tipo == 'text' || tipo == 'textarea' || tipo.indexOf('sel') != -1))
		{		
			elem.focusEvent2 = focus_Event2;
			elem.blurEvent2 = blur_Event2;
				
		}

	}
	if(window.top == window) //o top eh igual ao window entao eh uma popup
	{


	  
/*		var input = document.createElement('input');//input  
		input.setAttribute('type', 'hidden');  
		input.setAttribute('name', 'controle_isSubmited');  
		input.setAttribute('id', 'controle_isSubmited');  
		input.setAttribute('value', ''); 
		document.forms[0].appendChild(input); 
	*/	
		if(window.notFirstLoad){ 
		
			return;
		}
		window.notFirstLoad = true;
		var vOpener = window.opener;
		while(vOpener.top == vOpener){
			vOpener = vOpener.opener;
		}
		vOpener.window.top.addPopup(window);
		
 
		
		window.fecharPopups = function(){

			//window.document.getElementById('controle_isSubmited').value = '';
			setControleSubmit(false);
			var login = window.opener;
			while(login && login.top == login){
				login = login.opener;	
			}
			if(!login)
				return;
			login = login.top;
			login.fecharPopups(window);
		}
		if(opener.top == opener){//popup
			
			opener.iniciarBarraProgresso();	
		}else{
			var pag = window.opener.top.frames[0].frames[0];
			
			pag.iniciarBarraProgresso();
		}
	}
}

