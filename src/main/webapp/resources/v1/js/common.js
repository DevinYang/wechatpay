function CommonUtils(){}
/**
 * 打开窗体
 * @param url
 * @param winName
 * @param width
 * @param height
 */
CommonUtils.openWindow=function(url,winName,width,height){
	var openWindow;
	var top = (window.screen.height - height) / 2;
	var left = (window.screen.width - width) / 2;
	openWindow = window.open(url,winName,"height="+ height +",width=" + width +",top="+top +",left="+left + ", resizable=no, scroll=no, status=no");
	openWindow.focus();//让窗口获取焦点
	openWindows.push(openWindow);
	return openWindow;
}
/**
 * 初始化校验器
 * @param cfg {form : 'InofForm'} //optional
 * @return
 * @example
	   <code>
	    //初始化（也可以传递一个具体的Form ID作为参数）
	  	var validator = null;
	  	$(function() {
			validator = initValidator();
       }); 
	  	
	  	//form提交时
	  	if(!validator.form())return;
		</code>
 */
CommonUtils.initValidator = function(cfg){
	$.metadata.setType("attr", "validate");
	var form = (cfg && cfg.form) ? "#"+cfg.form : "form";
	var validator = $(form).validate({
   	 onfocusout: function (element) {
            if (!this.checkable(element) && (element.name in this.submitted || !this.optional(element))) {
           	 if(this.element(element)){
           		 $(element).removeClass("x-form-text-invalid");
           	 }else{
           		 $(element).addClass("x-form-text-invalid");
           	 }
            }
        },
        onkeyup: function (element) {
            if (element.name in this.submitted || element == this.lastElement){
           	 if(this.element(element)){
           		 $(element).removeClass("x-form-text-invalid");
           	 }else{
           		 $(element).addClass("x-form-text-invalid");
           	 }
            }
        },
        errorPlacement: function(lable, element) {
       	element.addClass("x-form-text-invalid");
       	lable.css({"color":"red","padding-left":"18px","background":'url("../../images/unchecked.gif") no-repeat 0px 0px'});
       	if(element.parent().get(0).tagName == "TD"){
       		element.parent().append("<div></div>");       	
       	 	lable.appendTo(element.parent());       	
       	}else{
       	 	lable.appendTo(element.parent().parent());       	
       	}
       	},
        submitHandler: function() {
            $("input",$(form)).removeClass("x-form-text-invalid");
            $("textarea",$(form)).removeClass("x-form-text-invalid");
        }
    });
    $(form).ligerForm();
    return validator;
}
/**
 * 基于jquery组件同步取数据，要使用该方法，必须导入 TC.js
 * @param url
 * @return
 */
CommonUtils.getData=function (url){
	var tmp;
	$.json(url,function(json){tmp = json;},true);	
	 return tmp;
 }
CommonUtils.close=function(){
	parent.opener.openWindow.close();
}
/**
 * 根据浏览器的不同选择alert方式
 */
CommonUtils.alert=function(data){
	var alertType;
	if($.browser.msie || $.browser.compatible){//IE
		alertType = alert(data);
	}else if($.browser.opera){//opera
		alertType = $.ligerDialog.alert(data);
	}else if($.browser.gecko){//mozilla
		alertType = $.ligerDialog.alert(data);
	}else{//others
		alertType = alert(data);
	}
	return alertType;
}

CommonUtils.hasReaderActiveX=function(){
	var axObj = null;		
	if (window.ActiveXObject) {
		try{
			axObj = new ActiveXObject("AcroPDF.PDF");			
			if(!axObj){
				axObj = new ActiveXObject("PDF.PdfCtrl");//If "AcroPDF.PDF" didn't work, try "PDF.PdfCtrl"
			}
		}catch(e){}		
		if (axObj !== null) {//If either "AcroPDF.PDF" or "PDF.PdfCtrl" are found, return true
			return true;
		}
	}//If you got to this point, there's no ActiveXObject for PDFs		
	return false;		
}
CommonUtils.hasReader = function (){	
	var i,n = navigator.plugins,count = n.length,regx = /Adobe Reader|Adobe PDF|Acrobat/gi;		
	for(i=0; i<count; i++){
		if(regx.test(n[i].name)){
			return true;
		}
	}		
	return false;	
}
CommonUtils.hasGeneric = function (){//Determines what kind of PDF support is available: Adobe or generic
	var plugin = navigator.mimeTypes["application/pdf"];
	return (plugin && plugin.enabledPlugin);
}
CommonUtils.checkPDFObjectIsInstall = function(){
	var type = null,o = this;;		
	if(o.hasReader() || o.hasReaderActiveX()){			
		type = "Adobe";		
	} else if(o.hasGeneric()) {		
		type = "generic";		
	}
	return type;	
}

//Tab通用函数
function setTab(name,cursel,n,t){
	for(var i=1;i<=n;i++){	
		var menu=document.getElementById(name+i);
		if(!menu){
			if (t==0)cursel++;
			continue;
		}
		var con=document.getElementById("con_"+name+"_"+i);
		menu.className=(i==cursel?"hover":"");
		con.style.display=(i==cursel?"block":"none");
	}
}