/*
 * 
 * 客户端JS脚本，UI组件，在JQuery库之后导入

 * yangwenjie
 * 
 */

/**
 * String 去空格函数
 */
String.prototype.trim = function(){
	return this.replace(/(^\s*)|(\s*$)/g, ""); 
};

String.prototype.replaceAll = function(s1,s2) { 
    return this.replace(new RegExp(s1,"gm"),s2); 
};
/***用于城市名字显示水印***/
$(function(){
	
	$("input[airportCity=airportCity]").each(function(){
		var value =$(this).val();
		if(value==""){
			$(this).attr("value","全拼/简拼/汉字");
			$(this).addClass("cityinput1");
		}
	});
	
	
	$("input[airportCity=airportCity]").bind("blur",function(){
		var value = $(this).val();
		if(value==''){
			$(this).attr("value","全拼/简拼/汉字");
			$(this).addClass("cityinput1");
			$(this).removeClass("cityinput2");
		}else{
			$(this).addClass("cityinput2");
			$(this).removeClass("cityinput1");
		}
	});
	
	$("input[airportCity=airportCity]").bind("focus",function(){
		$(this).addClass("cityinput2");
		$(this).removeClass("cityinput1");
		
		var value = $(this).val();
		if(value=='全拼/简拼/汉字'){
			value = "";
			$(this).attr("value","");
			$(this).autocomplete( "option", "source", hotcities );
		}
		$(this).autocomplete( "search", value );
		$(this).autocomplete( "option", "source", cities );
	});
});
/**禁用缓存*/
	$(function(){
	
		$.ajaxSetup({ cache: false });
	});

/**
 * 在当前页面显示loading遮罩层
 * 
 */
function showLoadingMask(msg){
	msg = msg || "";
	var mask = $("#client_mask_loading");
	if(mask.length == 0){
		mask = $('<div id="client_mask_loading" class="client_mask_loading" tabindex="1"><div class="mask"></div><div class="mask_div"><span>'+msg+'</span></div></div>');
		mask.appendTo(document.body);
		mask.keydown(function(e){
			if(e.shiftKey == true && e.altKey == true && e.which == 13){
				hideLoadingMask();
			}
		});
	}
	//mask.height(pageHeight());
	var pageHe = pageHeight();
	if(pageHe > 4000){
		mask.height(windowHeight());
		var curBody = $(document.body);
		mask.attr("needrecover", curBody.css("overflow"));
		curBody.css("overflow","hidden");
	}else{
		mask.height(pageHe);
	}
	mask.width("100%");
	
	var l = mask.find(".mask_div");
	var left = (windowWidth() - l.width()) / 2 ;
	left = left < 0 ? 10 :left;
	var top =  (windowHeight() - l.height()) / 2;
	top = top < 0 ? 10 : top;
	l.css("left",left);
	l.css("top",top + scrollTop());
	
	/*
	mask.animate({
		opacity:0.3
	},100);*/
	//mask.fadeIn();
	mask.show();
}

/**
 * 隐藏当前页面loading遮罩层
 */
function hideLoadingMask(){
	var mask = $("#client_mask_loading");
	var needrecover = mask.attr("needrecover");
	if(needrecover){
		var curBody = $(document.body);
		curBody.css("overflow",needrecover);
		mask.removeAttr("needrecover");
	}
	//mask.fadeOut(100);
	mask.hide();
}

 /**
 * 弹出对话框的类，使用new创建,参数domid为页面dialog内容所在容器ID,options仅支持 width ,height, modal, buttons
 * 
 * 示例：
 * var d = new Dialog("dialog",
	{
		width:550,
		height:200,
		modal:true,
		buttons:{
			'确定':function(){
				//do something
				this.hide();
			},
			'取消':function(){
				this.hide();
			}
		}
	});
	d.show();
	
	//d.hide();
	
	html:
	<div id="dialog" title="标题">
	成功！
	</div>
 * 
 * 
 */
function Dialog(domid,options){
	var _this = this;
	var opt = options || {};
	this.apply(options);
	this.id = "dialog_frame_" + domid;
	
	var o = $("#" + this.id);
	var div = $("#" + domid);
	if(div.length > 0 && o.length == 0){
		
		var title = div.attr("title") || "";
		div.removeAttr("title");
		div.css("display","");
		
		this.width = this.width || 260;
		this.height = this.height || '';
		
		var tmp = new Array();
		
		tmp.push('<div class="dialog_frame" id="'+this.id+'" _dialog_status="1" >');
		tmp.push('<div class="pop-tit">');
		tmp.push('<div class="cl cl-wh-big">&nbsp;</div>');
		tmp.push('<div class="bg-left bg-st">&nbsp;</div>');
		tmp.push('	<div class="tit-st dialog_drag"><div class="dialog_title_icon"><span id="title_span" class="dialog_title_span">'+title+'</span></div></div>');
		tmp.push('    <div class="bg-right bg-st">&nbsp;</div>');
		tmp.push('   </div>');
		tmp.push('   <div class="pop-con">');
		tmp.push('   	<div class="bg-wh">');
		tmp.push('      	<div class="pop-font-st pa-ast-10" id="dialog_content" style="overflow:auto;width:'+this.width+'px;height:'+this.height+'px;min-height: 30px;"> ');
		//tmp.push('      	<div class="pop-font-st pa-ast-10" style="overflow:auto;width:100%;height:100%"> ');
		//tmp.push(contentHtml);
		tmp.push('     		</div>');
		
		if(this.buttons){
			tmp.push('             <div class="hr-10"></div>');
			tmp.push('     	<div class="bg-st-gray pa-st-05 te-ce">');
			for(var key in this.buttons){
				tmp.push('<a class="Btn Btn-blue" id="'+key+'"><span>'+key+'</span></a>&nbsp;&nbsp;');
			}
			tmp.push('      </div>');
			tmp.push('      <div class="hr-10"></div>');
		}
		tmp.push('   </div>');
		tmp.push('  </div>');
		tmp.push('</div>');
		
		var t = $(tmp.join("\r"));
		t.appendTo(document.body);
		div.appendTo(t.find("#dialog_content"));
		
		t.find(".cl").click(function(){
			if(_this.closeAction){
				_this.closeAction();
			};
			_this.hide();
		});
		
		t.find(".Btn-blue").click(function(){
			var id = this.id;
			if(_this.buttons && _this.buttons[id]){
				_this.buttons[id].call(_this);
			}
		});
		
		var cX=0,cY=0,p=_this.getPosition(),clicked=false;
		t.find(".dialog_drag").mousedown(function(e){
			cX = e.clientX;
			cY = e.clientY;
			p = _this.getPosition();
			clicked = true;
		});
		
		$(document).mouseup(function(e){
			clicked = false;
		});
		
		t.find(".dialog_drag").mousemove(function(e){
			if(clicked == true){
				_this.setPosition(p.left + (e.clientX - cX), p.top + (e.clientY - cY));
			}
			return false;
		});

		this.domObj = t;
	}
};

Dialog.prototype.apply = function(attr){
	for(var key in attr){
		this[key] = attr[key]; 
	}
};

Dialog.prototype.show = function(){
	var _this = this;
	var tar = $("#" + this.id);
	var left = (windowWidth() - tar.width()) / 2 ;
	left = left < 0 ? 10 :left;
	var top =  (windowHeight() - tar.height()) / 2;
	top = top < 0 ? 10 : top;
	if(left == 0 && top + scrollTop() == 0){
		$(document.body).one("focus",function(){
			if(top == 0 && top + scrollTop() == 0){
				_this.show();
			}
		});
	}else{
		tar.css("left",left);
		tar.css("top",top + scrollTop());
		var dialogLen = $(".dialog_frame:visible").length;
		tar.css("z-index",100 + dialogLen * 2);
		tar.show();
		
		if(this.modal == true){
			var mask = $("#client_mask_dialog_" + this.id);
			if(mask.length == 0){
				mask = $('<div id="client_mask_dialog_'+this.id+'" class="dialog_mask"></div>').appendTo(document.body);
			}
			var maskLen = $(".dialog_mask:visible").length;
			mask.css("z-index",99 + maskLen * 2);
			var currentPageHeight = pageHeight();
			if(currentPageHeight > 0){
				this.currentPageHeight = currentPageHeight;
			}
			mask.height(this.currentPageHeight);
			mask.width("100%");
			mask.show();
		}
	}
	
};

Dialog.prototype.hide = function(){
	if(this.modal != false){
		var mask = $("#client_mask_dialog_" + this.id);
		mask.hide();
	}
	$("#" + this.id).hide();
};

Dialog.prototype.setPosition = function(left,top){
	var tar = $("#" + this.id);
	tar.css("left",left);
	tar.css("top",top);
};

Dialog.prototype.getPosition = function(){
	var tar = $("#" + this.id);
	return tar.offset();
};

Dialog.prototype.isVisible = function(){
	return $("#" + this.id).is(":visible");
};

/**
 * 静态方法提示框 和 alert()函数类似
 * 
 * @param 
 * msg要提示的消息内容，
 * callback可选，点击确认按钮后的响应
 * modal可选，是否显示遮罩层
 * 
 * demo:
 * Dialog.alert("消息");
 * 
 * Dialog.alert("消息",function(){
 * 		alert(1);
 * });
 */
Dialog.alert = function(msg,callback,modal){
	
	modal = (modal == false ? false : true);
	
	$("#dialog_frame_dialog_alert").remove();
	
	if(msg){
		msg = msg.replace(/\r\n|[\r\n]/g,"<BR/>");
	}
	$('<div id="dialog_alert" title="消息提示"></div>').html(msg).appendTo($(document.body));
	var alertDialog = new Dialog("dialog_alert",{
		width:260,
		modal:modal,
		closeAction:callback,
		buttons:{
			'确 定':function(){
				this.hide();
				if(callback){
					callback();
				}
			}
		}
	});
	
	alertDialog.show();
};


/**
 * Dialog静态方法确认框 和 confirm()函数类似
 * 
 * @param msg要提示的消息内容，positiveCb[可选]，点击确认按钮后的响应,nagativeCb[可选]，点击取消按钮后的响应
 * 
 * demo:
 * Dialog.comfirm("消息");
 * 
 * Dialog.comfirm("消息?",function(){
 * 		alert(1);
 * },function(){
 * 		alert(2);
 * });
 */
Dialog.confirm = function(msg,positiveCb,nagativeCb){
	$("#dialog_frame_dialog_confirm").remove();
	
	if(msg){
		msg = msg.replace(/\r\n|[\r\n]/g,"<BR/>");
	}
	
	$('<div id="dialog_confirm" title="确认提示"></div>').html(msg).appendTo($(document.body));
	var confirmDialog = new Dialog("dialog_confirm",{
		width:250,
		modal:true,
		closeAction:nagativeCb,
		buttons:{
			'确 定':function(){
				this.hide();
				if(positiveCb){
					positiveCb();
				}
			},
			'取 消':function(){
				this.hide();
				if(nagativeCb){
					nagativeCb();
				}
			}
		}
	});
	
	confirmDialog.show();
};

/**
 * 即时消息显示，自动隐藏
 * @param msg
 * @param millisecond
 */
Dialog.toast = function(msg, millisecond){
	millisecond = millisecond || 2000;
	millisecond = isNaN(millisecond) || millisecond <= 0 ? 2000 : millisecond;
	var $div = $("<div class='dialog_notify'></div>");
	if(msg){
		msg = msg.replace(/\r\n|[\r\n]/g,"<BR/>");
	}
	$div.html(msg);
	$div.appendTo(document.body);
	$div.css("left", (windowWidth() - $div.width()) / 2);
	$div.css("bottom", windowHeight() * 0.1);
	$div.hide();
	$div.fadeIn(500).delay(millisecond).fadeOut(500,function(){
		$(this).remove();
	});
};

/******************************Dialog end*************************/

/******************************Tab页******************************/

/**
 * @param domid 待渲染的dom元素ID
 * theme 主题，可选参数，默认 peo-nav
 * scroll 能否滚动，默认false
 * 
 * demo:
 * var tab = new Tab("tab");
 * 
 * 对应待渲染的HTML格式：
 * 
 * <div id="tab">
		<ul>
			<li isMain="true"><a href="#tab_1">主页</a></li>
			<li closable="true"><a href="#tab_2">TAB2</a></li>
			<li closable="true"><a href="#tab_3">TAB3</a></li>
		</ul>
		
		<div id="tab_1">
			TAB_1
		</div>
		<div id="tab_2">
			TAB_2
		</div>
		<div id="tab_3">
			TAB_3
		</div>
	</div>

	说明 ： 
	<li>可选参数  isMain(是否为主TAB),closable(是否可关闭)
	<a>标签 href属性 必须与 下方DIV的ID对应 ( href值前多一"#"号 )
	
 */
function Tab(domid,theme,scoll,dbclkcls){
	var _this = this;
	this.seq_id = 0;
	this.id = domid;
	this.height = "";
	this.theme = theme || "peo-nav";
	this.scoll = (scoll == true ? true : false);
	this.init();
	if(this.scoll == true){
		var roll = this.nav.find(".roll");
		if(roll.length == 0){
			roll = $('<div class="roll"><div>').insertAfter(this.ul);
		}
		var left = $('<a class="roll_lt" href="javascript:void(0);" title="左移">&lt;</a>').click(function(){
			if(_this.nav){
				_this.nav.scrollLeft(_this.nav.scrollLeft() - 80);
			}
		});
		var right = $('<a class="roll_rt" href="javascript:void(0);" title="右移">&gt;</a>').click(function(){
			if(_this.nav){
				_this.nav.scrollLeft(_this.nav.scrollLeft() + 80);
			}
		});;
		roll.append(left);
		roll.append(right);
		roll.hide();
		this.roll = roll;
	}
	
    if(dbclkcls == true){
    	$("#" + this.id + " li").live("dblclick",function(){
    		var $li = $(this);
    		$li.find(".cl").click();
    	});
    }
    if(false == $("#"+this.id).is(":visible")){
    	$("#"+this.id).show();
    }
}

/**
 * Tab页容器初始化
 * 
 * 
 */
Tab.prototype.init = function(){
	var _this = this;
	var _tab = $("#" + this.id);
	this.tab = _tab;
	var _ul = _tab.children("ul");
	if(_ul.length == 0){
		var nav = _tab.children("#" + _this.id + "_nav");
		this.nav = nav;
		_ul = nav.children("ul");
	}
	_this.ul = _ul;
	_ul.addClass(_this.theme);
	var _divs = _tab.children("div[id!="+ _this.id + "_nav]").addClass("dis-no");
	_this.divs = _divs;
	var _li = _ul.children();
	this.li = _li;
	var lastId = '';
	_li.each(function(i,d){
		var $d = $(d); 
		if($d.attr('inited') == "true"){
			return true;
		}
		var href = $d.find("a").attr("href") || "#";
		$d.find("a").removeAttr("href");
		$d.attr("href",href);
		if(!$d.attr("id"))
		{
			$d.attr("id","tab_autoid_" + (_this.seq_id++));
		}
		if($d.attr("isMain") == "true"){
			$d.addClass("main");
		}else if($d.attr("closable") == "true"){
			$('<span class="cl">&nbsp;</span>').click(function(){
				_this.removeTab($d.attr("id"));
			}).appendTo($d);
		}
		
		//switch event
		$d.click(function(){
			var tab = $("#" + _this.id);
			tab.find("ul").find(".hover").removeClass("hover");
			if($(this).attr("isMain") != "true"){
				$(this).addClass("hover");
			}
			_this.divs.removeClass("dis-bl").addClass("dis-no");
			var contentDiv = $(href);
			contentDiv.removeClass("dis-no");
			contentDiv.addClass("dis-bl");
			
			//将焦点指向页面
			var iframes = contentDiv.children("iframe");
			if(iframes && iframes.length == 1){
				try{
					var childBody = iframes.contents().find("body");
					if(childBody.length > 0){
						iframes[0].focus();
						childBody[0].focus();
					}
				}
				catch(e){
					//console.log("Exception");
				}
			}
			
			_this.resizeNav();
			return false;
		});
		
		if(i == 0){
			$d.click();
		}
		$d.attr("inited","true");
		lastId = $d.attr("id");
	});
	return lastId;
};

/***
 * 获取当前激活的Tab页对象
 * @returns
 */
Tab.prototype.getCurrentTab = function(){
	var cur = $("#" + this.id).find("ul li.hover");
	if(cur.length > 0){
		return cur;
	}else {
		return $("#" + this.id).find("ul li.main");
	}
};

/***
 * 获取当前激活的Tab页的ID
 * @returns
 */
Tab.prototype.getCurrentTabId = function(){
	return this.getCurrentTab().attr("id");
};

/***
 * 获取当前激活的Tab页对应内容DIV的ID
 * @returns
 */
Tab.prototype.getCurrentContentId = function(){
	return this.getCurrentTab().attr("href");
};

/***
 * 激活当前tab页的下一页
 * @returns
 */
Tab.prototype.moveToNext = function(){
	var curr = this.getCurrentTab();
	var nextLi = curr.next();
	if(nextLi.length == 0){
		return false;
	}
	this.moveTo(nextLi.attr("id"));
	return true;
};

/***
 * 激活当前tab页的上一页
 * @returns
 */
Tab.prototype.moveToPrev = function(){
	var curr = this.getCurrentTab();
	var prevLi = curr.prev();
	if(prevLi.length == 0){
		return false;
	}
	this.moveTo(prevLi.attr("id"));
	return true;
};

/***
 * 激活指定位置TAB页
 * @returns
 */
Tab.prototype.moveTo = function(tabid){
	$("#" + tabid).click();
};

/**
 * 在尾部新增TAB页
 * @param o 参数
 * 支持：
 * id 指定tab的id，可选
 * label tab页的标签内容
 * content tab页的html内容
 * closable (true/false)是否可以关闭，可选，默认true
 * isMain (true/false)是否为主TAB，可选,默认false
 * 
 * demo:
 * 
 * tab.addTab({
		id:"tab_4",
		label:'客户信息',
		content:'<p>XXXXXXXX<p>',
		closable:false,
		url:index.html,
		closeAction:function(){
			//关闭事件
			//该function当返回false时不关闭当前tab页
		}
	});
 * 
 */
Tab.prototype.addTab = function(o){
	var _tab = $("#" + this.id);
	var _ul = this.ul;
	var closable = o.closable ? o.closable : true;
	var isMain = o.isMain ? o.isMain : false;
	var label = o.label || '&nbsp;';
	var content = o.content || '';
	var reload = (o.reload == true) ? true : false;
	var autoid = "#div_autoid_" + (this.seq_id++);
	var li = $('<li closable="'+closable+'" isMain="'+isMain+'"></li>');
	li.append($('<a>'+label+'</a>').attr("href",autoid));
	if(o.id){
		var currLi = _tab.find("#" + o.id); 
		if(currLi.length > 0){
			this.moveTo(o.id);
			if(reload){
				var href = currLi.attr("href");
				var frame = $(href + ' iframe');
				frame.attr("src",frame.attr("src"));
			}
			return;
		}
		li.attr("id",o.id);
	}
	li.appendTo(_ul);
	var divHeight = (this.height ? this.height + 'px' : '')  || "100%";
	if(o.url){
		_tab.append('<div id="'+autoid.substring(1)+'" style="height:'+divHeight+';"><iframe src="'+o.url+'" name="tab_frame_'+autoid+'" width="100%" style="height:100%;" scrolling="auto" frameborder="0"></iframe></div>');
	}else{
		_tab.append('<div id="'+autoid.substring(1)+'" style="height:'+divHeight+';">'+content+'</div>');
	}
	var lastId = this.init();
	this.moveTo(lastId);
	if(o.closeAction){
		var _this = this;
		var cl = $("#" + lastId).find(".cl");
		cl.unbind("click");
		cl.click(function(){
			if(o.closeAction.call(_this) != false){
				_this.removeTab($(this).parent().attr("id"));
			}
		});
	}
	if(o.addAction){
		o.addAction.call(this);
	}
};

Tab.prototype.resizeNav = function(){
	if(!this.scroll && !this.nav){
		return;
	}
	var curTab = this.getCurrentTab();
	var prevTab = curTab.prev();
	if(prevTab.length > 0){
		var oleft = prevTab.attr("offsetLeft");
		if(oleft + prevTab.outerWidth(true) + curTab.outerWidth(true) >= this.navWidth){
			var ulWidth = this.ul.width();
			this.ul.width(ulWidth + curTab.outerWidth(true));
		}
	}
	
	//超出导航条右侧
	var i = curTab.attr("offsetLeft") + curTab.outerWidth(true) - this.nav.scrollLeft() + 28;
	if(i > this.navWidth){
		this.roll.show();
		this.nav.scrollLeft(this.nav.scrollLeft() + (i - this.navWidth) + 60);
	}
	
	//超出导航条左侧
	var j = curTab.attr("offsetLeft") - this.nav.scrollLeft();
	if(j < 0 ){
		this.roll.show();
		this.nav.scrollLeft(this.nav.scrollLeft() + j - 60);
	}
	
	var totalWidth = 0;
	this.li.each(function(i,d){
		totalWidth += $(d).outerWidth(true);
	});
	if(totalWidth < this.navWidth){
		this.roll.hide();
		this.nav.scrollLeft(0);
		this.ul.width(this.navWidth);
	}
};

/**
 * 移除指定id的tab页
 * @param tabid
 */
Tab.prototype.removeTab = function(tabid){
	var $d = $("#" + tabid);
	if($d.attr("className").indexOf("hover") > -1){
		if(this.moveToNext() == false){
			this.moveToPrev();
		}
	}
	var ifmDiv = $($d.attr('href'));
	var ifm = $(ifmDiv).find("iframe")[0];
	ifm.src = "about:blank";
	ifm.contentWindow.document.write('');
	ifm.parentNode.removeChild(ifm);
	//ifm.remove();
	delete ifm;
	$.browser.msie && CollectGarbage();
	ifmDiv.remove();
	$d.remove();
};

/**
 * 移除所有tab页
 * @param tabid
 */
Tab.prototype.removeAll = function(){
	var _this = this;
	var _tab = $("#" + this.id);
	var d = _tab.find("ul li[isMain!=true]");
	d.each(function(i,data){
		_this.removeTab(data.id);
	});
};

/**
 * 调整内容div高度
 * @param tabid
 */
Tab.prototype.setHeight = function(height){
	var _divs = this.divs;
	this.height = height;
	_divs.height(height);
};

/**
 * 调整TAB页最大化
 * @param tabid
 */
Tab.prototype.maxMode = function(){
	this.setHeight(this.tab.height() - this.ul.outerHeight() - 2);
};

/**
 * 调整导航条div宽度
 * @param tabid
 */
Tab.prototype.setNaviWidth = function(width){
	var nav = this.nav;
	if(nav){
		nav.width(width);
	}
	this.navWidth = width;
};



/******************************Tab页 end******************************/



$(function() {
	
	//初始化页面日历控件
	initCalendarDefault();
	
	var calendars = new Array();
	
	$(".datepicker").live("focus",function(){
		var cld = this._calendar;
		if(!cld){
			cld = new Calendar();
			this._calendar = cld;
			calendars.push(cld);
		}
		cld.show(this);
	 });
	
	$(document).click(function(e){
		var target = e.target;
		if(!target._calendar){
			for(var i = 0; i < calendars.length;i++){
				calendars[i].hide();
			}
		}
	});
	
	//*即时通讯全局快捷键*///
	$(document).keydown(function(e){
		var code = e.which;
		var isChatShow = (top && typeof top.dialog !="undefined" && top.dialog && e.ctrlKey == true);
		var isCalendarShow = (typeof calendar !="undefined" && calendar  && calendar.panel.style.display == "block");
		//CTRL + 9
		if(code == 57 && isChatShow){
			top.chat_form();
		}
		//CTRL + 10
		else if(code == 48 && isChatShow){
			top.chat_form_hide();
		}else if(code == 37 && isCalendarShow){///键盘方向键--左
			calendar.goPrevMonth(calendar);
		}else if(code == 39 && isCalendarShow){//右
			calendar.goNextMonth(calendar);
		}else if(code == 38 && isCalendarShow){//上
			var currentYear = $(calendar.form.yearSelect).val();
			$(calendar.form.yearSelect).val((Number(currentYear)-1)+"");
			calendar.update(calendar);
		}else if(code == 40 && isCalendarShow){//下
			var currentYear = $(calendar.form.yearSelect).val();
			$(calendar.form.yearSelect).val((Number(currentYear)+1)+"");
			calendar.update(calendar);
		}
	});
	
	
	//tr变色
	$('.Box_Tab').each(function(index, element) {
		$('.tjTable tbody:even').addClass('gray');
		$('.tjTable tbody:odd').addClass('');
		$('.tjTablet tbody:even').addClass('gray');
		$('.tjTate tbody:even').addClass('gray1');
		$('.trSt tr:odd').addClass('gray');
	});

	//tr鼠标效果
	$('.tableHover tr').hover(function(){
		$(this).addClass('bg-blue1');
	},function(){
		$(this).removeClass('bg-blue1');
	});
	
	$("input[ignore!='true']:text,input[ignore!='true']:file").addClass("input1");
	
	$("select[ignore!='true']").addClass("select1");
	
});


/*********************** Menu *************************/
function Menu(domid,data){
	var _this = this;
	this.id = domid;
	
	var _div = $("#" + domid).addClass("con-input");
	
	var handler = {}; 
	var tmp = new Array();
	
	data = data || {};
	tmp.push('<ul id="nav" class="menu_all">');
	for(var i = 0; i < data.items.length; i++){
		var item = data.items[i];
		tmp.push('<li class="one" id="mainlevel_01"><a href="javascript:void(0);">'+item.text+'</a>');
		tmp.push('<ul id="sub_06" class="sub">');
		tmp.push('<li>');
		var menu = item.menu.items;
		for(var j = 0; j < menu.length; j++){
			var menuItem = menu[j];
			tmp.push('<a class="menu_item" url="'+menuItem.url+'" text="'+menuItem.text+'" oindex="'+i+'-'+j+'">'+menuItem.text+'</a>');
			handler[i + "-" + j] = menuItem.click;
		}
		tmp.push(' </li>');
		tmp.push(' </ul>');
		tmp.push(' </li>');
	}
    
    tmp.push('</ul>');
    
    $(tmp.join("\r")).appendTo(_div);
    
    //-------------menu----------
    _div.find('li.one').mousemove(function(){
		  $(this).find('ul').show();//you can give it a speed
	  });
    _div.find('li.one').mouseleave(function(){
		  $(this).find('ul').hide();
	  });
    
    _div.find(".menu_item").click(function(){
    	var $this = $(this);
    	var oindex = $this.attr("oindex");
    	if(handler[oindex]){
    		var item = {};
    		item.text = $this.attr("text");
    		item.url = $this.attr("url");
    		handler[oindex].call(this,item);
    	}
    });
  
}
/*********************** Menu end**********************/

/*********************** grid begin**********************/

/**
 * Demo:
 * 
 * var grid = new Grid("maingrid",{ //maingrid为待填充的div容器的ID ,必填，且必须有效
                url : "${ctx}/security-user/",
                method : "GET",//ajax请求方式
                page: true,//是否启用分页，不启用分页的情况下，root属性无效，默认遍历返回的List对象，非QueryPage对象
                checkbox : true,//是否包含复选框
                autoLoad: true, //是否自动加载数据,效果等于调用当前对象loadData()方法
                sn:true,//是否显示序号，可选，默认不显示
                root:"result", //后台返回数据中结果列表所在字段，可选，默认为result
                parms : { //参数 可选，初始化时的查询条件
                	"name" : ""	
                },
                width:1200,//指定表格内容宽度，当表格字段过多需要横向滚动时，可选，默认不滚动
                heigth:300,//指定表格高度
                headfixed: true,//在滚动的时候是否固定表头
                bgcolor: [
                	{name:"type",mapping:{'1':'#000000','2':'#FFFFFF'},defaultColor:"#FF0000"},
                	{name:"name",mapping:{'111':'#000000','222':'#FFFFFF'},defaultColor:"#FF0000"}
                ] //可选，自定义数据行的颜色，格式{name="属性字段名",mapping:{'属性值':'颜色', ... },defaultColor:"颜色"} ，
                				//	如{name:"type",mapping:{'1':'#000000','2':'#FFFFFF'}},则type结果为1的行背景为黑色，2的为白色,默认为#FF0000
                //列说明： display为表格标题 ，
                //name为返回数据的属性名，可支持多属性合并显示 ，格式"name{,}email",显示结果为 "张三,11@11.com" 
                //type 列类型默认都是字符串，可选值 date(日期),datetime(日期时间),alink(超链接) 
                //handler 属性，当type为alink时点击超链接的回调函数
                //alinkName 属性，当type为alink时链接显示的文本，可选，如果有则name属性将无效
                //mapping 属性，类型为对象，字段翻译对照表，属性设置例如 mapping:{'1':'开放','2':关闭},则自动将结果中的1翻译成"开放"
                //width 属性，指定列的宽度，值为“100px”或百分比“10%” 
                //css属性 自定义某一列内容的样式 update by huangtzh
                //如 css:[{name:'status',style:'color',mapping:{0:'red',1:'blue'}}],则status结果为0时把内容改为红色，1为蓝色
                //defaultCss 默认样式 update by XuMiao defaultCss:[{style:'text-align',styleValue:'left'}]
                columns: [  
                { display: 'ID', name: 'id', width:'10%'},
                { display: '用户名', name: 'name' },
                { display: '邮箱地址', name: 'email' },
                { display: '性别', name: 'gender' },
                { display: '登陆名', name: 'account.username' },
                { display: '更新日期', name: 'account.username' ,type:"datetime"}
                ],
                operations: {
                	'编辑':function(data){ //data当前行的行数据对象
                		alert(this.dataid);
                	},
                	'删除':function(data){
                		alert(this.dataid);
                	}
                },
                operationColWidth:100 //操作列的宽度
            });
 * 
 */
function Grid(domid,options){
	var _this = this;
	this.id = domid;
	this.selectedDataArray = new Array();
	this.options = options || {};
	var o = this.options;
	o.root = o.root || "result";
	
	//总列数
	this.columnCount = 0;
	
	var dom = $("#" + domid);
	if(dom.length == 0){
		return;
	}
	
	this.columnReg = /([^\{\}]*)\{*([^\}]*)\}*/g;
	
	this.html_div = $('<div class="tab1-st ma-ast-5 alink-st pop-st"></div>').appendTo(dom);
	this.html_div.css("overflow","auto");
	this.html_table = $('<table></table>').appendTo(this.html_div);
	if(o.width){
		this.html_table.css("width",o.width);
	}
	if(o.height){
		this.html_div.height(o.height);
	}
	
	if(o.columns){
		var html_thead = $("<tr></tr>").appendTo($('<thead></thead>').appendTo(this.html_table));
		this.html_thead = html_thead;
		if(o.sn == true){
			html_thead.append('<th colspan="'+count+'">序号</th>');
			this.columnCount++;
		}
		if(o.checkbox == true){
			$('<input type="checkbox" class="chkall">').
				appendTo($("<th></th>").appendTo(html_thead)).click(function(){
					$(".cb_" + _this.id).attr("checked",this.checked);
					$(".cb_" + _this.id).change();
			});
			this.columnCount++;
		}
		for(var i = 0; i < o.columns.length; i++){
			var item = o.columns[i];
			var th = $('<th>'+item.display+'</th>');
			if(item.width){
				th.css("width",item.width);
			}
			th.appendTo(html_thead);
			this.columnCount++;
		}
		if(o.renders) {
			for(var m = 0; m < o.renders.length; m++){
				var item = o.renders[m];
				var th = $('<th>'+item.display+'</th>');
				if(item.width){
					th.css("width",item.width);
				}
				th.appendTo(html_thead);
				this.columnCount++;
			}
		}
		if(o.operations){
			var count = 0;
			for(var k in o.operations){
				count++;
			}
			var col = $('<th colspan="'+count+'">操作</th>');
			if(o.operationColWidth){
				col.css("width", o.operationColWidth);
			}
			html_thead.append(col);
			this.columnCount += count;
		}
		
		//初始化标志
		this.initiazed = true;
		
		if(o.autoLoad == true){
			this.loadData();
		}
	}
}

/**
 * 
 * 
 * @param
 * parms 可选，用来重新查询的参数 
 * resetPage true/false 可选，是否将页码归置到第一页
 * 
 * 格式：
 * 
 */
Grid.prototype.loadData = function(parms,resetPage,callback){
	var _this = this;
	if(_this.initiazed != true){
		return;
	}
	var o = this.options;
	if(!o.pageNo || resetPage == true){
		o.pageNo = 1;
	}
	o.parms = parms || o.parms;
	
	var reqData = {pageNo:o.pageNo };
	if(!isNullOrEmpty(o.parms )){
		reqData.params = o.parms;
	}
	ajaxRequest(o.url, reqData, 
		function(data){
			_this.data = data;
			_this.html_div.find(".chkall").attr("checked",false);
			
			if(!_this.html_tbody){
				_this.html_tbody = $("<tbody></tbody>").appendTo(_this.html_table);
			}else{
				_this.html_tbody.empty();
			}
			var list = (o.page == false) ? (data[o.root] || data) : data[o.root];
			if(!list || list.length == 0){
				$("<tr><td colspan='"+_this.columnCount+"'><font color='red'>没有找到满足条件的记录！</font></td></tr>").appendTo(_this.html_tbody);
				if(_this.html_pagediv){
					_this.html_pagediv.empty();
				}
			}else{
				for(var j = 0; j < list.length; j++){
					var dataItem = list[j];
					
					var data_tr = $("<tr></tr>").appendTo(_this.html_tbody);
					if(o.sn == true){
						var sn = j;
						if(data.first){
							sn += data.first;
						}
						$('<td class="bo-ri">'+sn+'</td>').appendTo(data_tr);
					}
					if(o.checkbox == true){
						var checkBox = $('<input type="checkbox" class="cb_'+_this.id+'" value="'+dataItem.id+'" oindex="'+j+'" >').appendTo($('<td class="bo-ri"></td>').appendTo(data_tr));
						checkBox.change(function(){
							$this = $(this);
							if($this.attr("checked")){
								_this.selectedDataArray.push(list[$this.attr("oindex")]);
							}else{
								var index = $.inArray(list[$this.attr("oindex")],_this.selectedDataArray);
								if(index >= 0){_this.selectedDataArray.splice(index, 1); }
							}
						});
					}
					
					if(o.bgcolor){
						var bgs = o.bgcolor;
						for(var i = 0; i < bgs.length; i++){
							var bg = bgs[i]; 
							var color = null;
							if(bg.name && bg.mapping){
								var value = null;
								try{
									value = eval("dataItem." + bg.name);
								}catch(e){}
								
								if(value){
									color = bg.mapping[value];
								}
								
								color = color || bg.defaultColor;
								
								if(color){
									data_tr.css("background-color", color);
								}
							}
						}
					}
					
					
					for(var i = 0; i < o.columns.length; i++){
						var text = "";
						
						var colName = o.columns[i].name;
						if(colName){
							colName = colName.replace(_this.columnReg,function(g,col,sp){
								if(!col){
									return "";
								}
								var result = "(dataItem." + col + " || dataItem." + col + "===0? dataItem."+ col +" : '') +'"+sp+"'";
								if(o.columns[i].type == "datetime"){
									result = "parseDatetime(" + result + ")";
								}else if(o.columns[i].type == "date"){
									result = "parseDate(" + result + ")";
								}
								return result + "+";
							});
							
							try {
								text = eval(colName + "''");
							} catch (e) {
								
							}
						}
						
						text = (text == undefined || text == null) ? "" : text;
						
						var mapping = o.columns[i].mapping;
						if(mapping){
							if(mapping[text]){
								text = mapping[text];
							}
						}
						
						if(o.columns[i].type == "alink"){
							text = o.columns[i].alinkName || text || o.columns[i].display;
							var alink = $('<a>'+text+'</a>').attr("oindex",j).attr("cindex",i).appendTo($("<td></td>").appendTo(data_tr));
							alink.click(function(){
								//alert(this.innerText);
								var $this = $(this);
								var fun = o.columns[$this.attr("cindex")].handler; 
								if(fun){
									fun.call(this,list[$this.attr("oindex")]);
								}
							});
							alink.mouseover(function(){
								var $this = $(this);
								var fun = o.columns[$this.attr("cindex")].mouseover; 
								if(fun){
									fun.call(this,list[$this.attr("oindex")]);
								}
							});
							alink.mouseout(function(){
								var $this = $(this);
								var fun = o.columns[$this.attr("cindex")].mouseout; 
								if(fun){
									fun.call(this,list[$this.attr("oindex")]);
								}
							});
						}
						else{
							/*if(o.columns[i].type == "datetime"){
							text = parseDatetime(text);
						}else if(o.columns[i].type == "date"){
							text = parseDate(text);
						}
							 */
							//$('<td class="bo-ri">'+text+'</td>').appendTo(data_tr);
							$('<td>'+text+'</td>').attr("oindex",j).attr("cindex",i).appendTo(data_tr);
						}
						
						//这里是修改列中内容的样式 add by huangtzh
						if(o.columns[i].css) {
							var css = o.columns[i].css;
							for(var x = 0; x < css.length; x++) {
								var nameValue = css[x].name || o.columns[i].name;
								var key = null;
								try{
									key = eval("dataItem." + nameValue);
								}catch(e){}
								
								key = (key == undefined || key == null) ? "" : key;
								if(o.columns[i].type == "alink") {
									$(data_tr).find("a[cindex='"+i+"']").css(css[x].style,css[x].mapping[key]);
								} else {
									$(data_tr).find("td[cindex='"+i+"']").css(css[x].style,css[x].mapping[key]);
								}
							}
						}
						if(o.columns[i].defaultCss){
							var css = o.columns[i].defaultCss;
							for(var x = 0; x < css.length; x++) {
								if(o.columns[i].type == "alink") {
									if(css[x].style && css[x].styleValue){
										$(data_tr).find("a[cindex='"+i+"']").css(css[x].style,css[x].styleValue);
									}
								} else {
									if(css[x].style && css[x].styleValue){
										$(data_tr).find("td[cindex='"+i+"']").css(css[x].style,css[x].styleValue);
									}
								}
							}
						}
					}
					if(o.renders) {
						for(var m in o.renders) {
							$(o.renders[m].renderHtml).attr('oindex',j).appendTo($('<td></td>').appendTo(data_tr));
						}
					}
					if(o.operations){
						for(var k in o.operations){
							$('<a dataid="'+dataItem.id+'" id="'+k+'" class="btn_oper_selector" >'+k+'</a>').attr("oindex",j).appendTo($('<td></td>').appendTo(data_tr));
						}
						
					}
				}
				
				if(o.operations){
					_this.html_tbody.find(".btn_oper_selector").click(function(){
						var id = this.id;
						this.dataid = $(this).attr("dataid");
						var oindex = $(this).attr("oindex");
						o.operations[id].call(this,list[oindex]);
					});
				}
				
				_this.html_table.find("tr:even").addClass("table_tr_even");
				
				///加载分页控件
				
				if(!_this.html_pagediv){
					_this.html_pagediv = $('<div class="list_page"></div>').appendTo($("#" + _this.id));
				}else{
					_this.html_pagediv.empty();
				}
				
				if(o.page != false && list.length != 0){
					var maxSize = 5;
					
					var ulWidth = 180 + (data.totalPages > maxSize ? (28 * (maxSize + 5) + 10) : 28 * data.totalPages);
					var ul = $('<ul class="lsfy"></ul>').appendTo(_this.html_pagediv).width(ulWidth);
					
					$('<li><a title="上一页">&lt;&lt;</a></li>').appendTo(ul);
					
					
					var start = data.pageNo - parseInt(maxSize / 2);
					var end = data.pageNo + parseInt(maxSize / 2 - (maxSize % 2 == 0 ? 1 : 0));
					//alert(start + "-" + end);
					if(start <= 0){
						end = end - start + 1;
						start = 1;
					}
					if(end > data.totalPages){
						end = data.totalPages;
						start = end - maxSize + 1;
						start = (start <= 0 ? 1 : start); 
					}
					
					if(start == 2){
						$('<li><a><span>'+(1)+'</span></a></li>').appendTo(ul);
					}
					else if(start >= 3){
						$('<li><a><span>'+(1)+'</span></a></li>').appendTo(ul);
						$('<li>...</li>').appendTo(ul);
						//$('<li><a><span>'+(2)+'</span></a></li>').appendTo(ul);
					}
					
					/*if(start >= 4){
					$('<li>...</li>').appendTo(ul);
				}*/
					
					for(var i = start; i <= end; i++){
						$('<li><a><span class="'+(i == data.pageNo ? "over" : "")+'">'+(i)+'</span></a></li>').appendTo(ul);
					}
					
					if(data.totalPages - end > 2){
						$('<li>...</li>').appendTo(ul);
					}
					
					if(data.totalPages - end >= 2){
						$('<li><a><span>'+(data.totalPages - 1)+'</span></a></li>').appendTo(ul);
						$('<li><a><span>'+(data.totalPages)+'</span></a></li>').appendTo(ul);
					}else if(data.totalPages - end >= 1){
						$('<li><a><span>'+(data.totalPages)+'</span></a></li>').appendTo(ul);
					}
					
					$('<li><a title="下一页">&gt;&gt;</a></li>').appendTo(ul);
					$('<li class="ym">共 '+data.totalPages+' 页</li> ').appendTo(ul);
					//$('<li class="ym"> '+data.totalCount+' 条</li> ').appendTo(ul);
					$('<li><input class="fytextbox" name="" type="text"></li>').appendTo(ul);
					$('<li><a>GO</a></li>').appendTo(ul);
					
					ul.find("a").click(function(){
						var $this = $(this);
						//alert($this.text());
						var curPageNo = 0;
						switch($this.text()){
						case '<<':
							curPageNo = data.pageNo - 1;
							break;
						case '>>':
							curPageNo = data.pageNo + 1;
							break;
						case 'GO':
							var fytextbox = ul.find(".fytextbox").val();
							if(!isNaN(fytextbox)){
								curPageNo = parseInt(fytextbox);
							}
							break;
						default:
							curPageNo = parseInt($this.text());
						}
						
						//alert(curPageNo);
						if(curPageNo >= 1 && curPageNo <= data.totalPages){
							o.pageNo = curPageNo;
							_this.loadData(null,null,callback);
						}
						
					});
				};
			}
		
			if(callback){
				callback.call(_this);
			}
			
			if(o.headfixed == true){
				//固定表头
				var headerCols = _this.html_thead.children();
				if(!_this.fixedTable){
					var fixedTable = $("<table></table>")
						.css("position","absolute")
						.css("top",0)
						.css("left",0)
						.attr("id",_this.id + "_grid_fixed_header");
					var fixedHeader = $("<tr></tr>").appendTo($("<thead></thead>").appendTo(fixedTable));
					fixedTable.insertBefore(_this.html_table);
					_this.fixedTable = fixedTable;
					_this.fixedHeader = fixedHeader;
					_this.html_div.scroll(function(){
						var scrollTop = _this.html_div.scrollTop();
						//scrollTop = scrollTop <= tp.top ? tp.top : scrollTop;
						//scrollTop += tp.top;
						fixedTable.css("top",scrollTop);
					});
				}
				
				_this.fixedTable.width(_this.html_table.outerWidth());
				//var tp = _this.html_table.position();
				//.css("top",0 + tp.top);
				//.css("left",0 + tp.left);
				
				if(_this.html_thead.is(":visible")){
					_this.fixedHeader.empty();
					//console.log("headerCols : " + headerCols.length);
					headerCols.each(function(){
						var $$this = $(this);
						var ctd = $$this.clone();
						var owidth = $$this.width();
						//console.log("width:" + owidth + ",scollWidth:" + this.scrollWidth);
						if(owidth > 0){
							ctd.width(owidth);
						}
						_this.fixedHeader.append(ctd);
					});
				}
			}
			
	}, true, o.method);
};

/**
 * 返回多选框选择的值 返回数组
 * @returns
 */
Grid.prototype.getSelectedIdArray = function(){
	var tmp = new Array();
	$(".cb_" + this.id + ":checked").each(function(i,d){
		var $d = $(d);
		tmp.push($d.val());
	});
	return tmp;
};

/**
 * 返回多选框选择的值，格式： id 使用","隔开
 * @returns
 */
Grid.prototype.getSelectedIds = function(){
	var tmp = this.getSelectedIdArray();
	return tmp.join(",");
};

/**
 * 返回当前表格的数据集合
 * @returns
 */
Grid.prototype.getData = function(){
	return this.data;
};

/**
 * 返回当前表格的选择的数据集合
 * @returns
 */
Grid.prototype.getSelectedData = function(){
	var selectedData = new Array();
	var selectedIds = this.getSelectedIdArray();
	var datas = this.data.result;
	for(var j = 0; j < datas.length; j++){
		var dataItem = datas[j];
		if($.inArray(dataItem.id+'', selectedIds) >= 0){
			selectedData.push(dataItem);
		}
	}
	return selectedData;
};

Grid.prototype.getAllSelectedData = function(){
	return this.selectedDataArray;
}

Grid.prototype.clearAllSelectedData = function(){
	this.selectedDataArray = new Array();
	$(".cb_" + this.id + ":checked").each(function(i,d){
		var $d = $(d);
		$d.removeAttr("checked");
	});
	$(".chkall:checked").each(function(i,d){
		$(d).removeAttr("checked");
	});
}
/**
 * 设置请求数据的URL
 * @returns
 */
Grid.prototype.setUrl = function(url){
	var o = this.options;
	o.url = url || o.url;
	return this;
};


/*********************** grid end**********************/

/* 当前页面高度 */
function pageHeight() {
	return $(document).height();
}

/* 当前页面宽度 */
function pageWidth() {
	return $(document).width();
};

function windowHeight(){
	return $(window).height();
};

function windowWidth(){
	return $(window).width();
};

function scrollTop(){
	return $(document).scrollTop();
}


/***********************将表单数据转化为js对象，用于ajax提交***********************************/
function formToObj(formName){
	var o = {};
	/*var input = $(formName).find("input[type!=radio],input:radio:checked,textarea,select");
	input.each(function(i,n){
		var $n = $(n);
		o[$n.attr("name")] = $n.val();
	});
	return o;*/
	if(formName){
		var items = $(formName).serializeArray();
		for(var i = 0; i < items.length; i++){
			var item = items[i];
			if(o[item.name]){
				o[item.name] += ("," + item.value.trim());
			}else{
				o[item.name] = item.value.trim();
			}
			
		}
	}
	
	return o;
}

function fillForm(form,data){
	for(var attr in data){ 
        if(typeof(data[attr])=='function'){                     
          continue; 
        } 
        var $input = form.find("input[name="+attr+"],textarea[name="+attr+"],select[name="+attr+"]");
        //var $input = form.find("input[name='"+attr+"']"); 
        var type = $input.attr("type");
        if(data[attr] != null){
        	if(type=="checkbox" ||type=="radio"){ 
                var avalues = data[attr].split(","); 
                for(var v=0; v<avalues.length;v++){ 
                  $input.each(function(i,n){ 
                      var value = $(n).val();                         
                      if(value == avalues[v]){                        
                        $(n).attr("checked","checked"); 
                      } 
                  }); 
              } 
            }else{ 
              $input.val(data[attr]); 
            } 
        }
      }      
}

/**
 * 去除表单中所有结果的前后空格
 */
function trimForm(form){
	var target = $(form);
	target.find("input,textarea").each(function(){
		var $this = $(this);
		var val = $this.val();
		if(val){
			$this.val(val.trim());
		}
	});
}

//----------------------Tab切换----------------------------
function setTab(name,cursel,n){
	for(var i=1;i<=n;i++){
	   var menu=document.getElementById(name+i);
	   var con=document.getElementById("con_"+name+"_"+i);
	   menu.className=i==cursel?"hover":"";
	   con.style.display=i==cursel?"block":"none";
	}
}

//获取URL通用函数 用法：var request=new Object; var val=GetRequest(); alert(val('参数1')
function getRequest() {
	var url = location.search; //获取url中"?"符后的字串  
	var theRequest = new Object();
	if (url.indexOf("?") != -1) {
		var str = url.substr(1);
		strs = str.split("&");
		for ( var i = 0; i < strs.length; i++) {
			theRequest[strs[i].split("=")[0]] = unescape(strs[i].split("=")[1]);
		}
	}
	return theRequest;
}

/**
 * 使用jquery的ajax进行访问的简化方法
 * @param url 必填
 * @param params 请求参数 ,可选
 * @param callback 请求成功后的回调函数，可选
 * @param mask 是否显示遮罩层 可选，默认true
 * @param method 请求方式 POST/GET 可选，默认 POST
 * @param dataType 返回对象类型，可选，默认 json
 * @param async 是否异步 默认true
 * @param contentType 默认application/x-www-form-urlencoded
 */
function ajaxRequest(url,params,callback,mask,method,dataType,async,contentType){
	if(!url){
		return;
	}
	params = params || {};
	method = method || "POST";
	dataType = dataType || "json";
	contentType = contentType || "application/x-www-form-urlencoded";
	mask = (mask == false) ? false : true;
	async = (async == false)? false : true;
	
var request = $.ajax({ 
		dataType:dataType,
		type: method, 
		url: url,
		data:params,
		async:async,
		contentType:contentType,
		timeout : 120000, //超时时间设置，单位毫秒
		beforeSend:function(){
			if(mask){
				showLoadingMask();
			}
		},
		success: function(o){
			if(o && o.success == false){
				if(o.code =='401'){
					window.top.location.href = 'login';
				}else if(o.code =='500'){
					Dialog.alert((o.msg=='')?"内部错误!":o.msg,null,false);
				}else{
					Dialog.alert((o.msg=='')?"内部错误!":o.msg,null,false);
				}
			}else{
				if(callback){
					try{
						callback(o);
					}catch(e){
						//alert("请求回调函数发生异常！");
					}
				}
			}
		},
		error:function(a,b,c){
			if(b == 'timeout'){
				Dialog.alert("数据交互超时！");
				return;
			}
			var msg = "数据交互出错！";
			if(b){
				msg += "<br/>错误描述:" + b;
			}
			if(c){
				msg += "<br/>errorThrown:" + c;
			}
			if(a){
				try{
					msg += "<br/>错误内容：" + a.statusText + "<br/>错误代码：" + a.status;
				}catch(e){
				}
			}
			Dialog.alert(msg);
		},
		complete:function(XMLHttpRequest,status){
			if(mask){
				hideLoadingMask();
			}
		}
	});
}

function apply(obj,attr){
	if(attr){
		for(var k in attr){
			obj[k] = attr[k];
		}
	}
}

function isNullOrEmpty(obj){
	if(obj){
		for(var k in obj){
			return false;
		}
	}
	return true;
}

function parseDatetime(time){
	var text = time;
	if(time && time != null && !isNaN(time)){
		var d = new Date(parseInt(time));
		text = d.getFullYear() + "-" 
			+ ((d.getMonth() + 1) < 10 ? "0" + (d.getMonth() + 1) : (d.getMonth() + 1)) + "-" 
			+ (d.getDate() < 10 ? ("0" + d.getDate()) : d.getDate()) + " "
			+ (d.getHours() < 10 ? ("0" + d.getHours()) : d.getHours()) + ":"
			+ (d.getMinutes() < 10 ? ("0" + d.getMinutes()) : d.getMinutes()); 
	}
	return text;
}

function parseDate(time){
	var text = time;
	if(time && time != null && !isNaN(time)){
		var d = new Date(time);
		text = d.getFullYear() + "-" 
			+ ((d.getMonth() + 1) < 10 ? "0" + (d.getMonth() + 1) : (d.getMonth() + 1)) + "-" 
			+ (d.getDate() < 10 ? ("0" + d.getDate()) : d.getDate()); 
	}
	return text;
}

function parseMMddEEEEDate(time){
	var text = time;
	if(time && time != null && !isNaN(time)){
		var d = new Date(time);
		var day = d.getDay();
		var week = formatDayOfWeek(day,"周");
		text = ((d.getMonth() + 1) < 10 ? "0" + (d.getMonth() + 1) : (d.getMonth() + 1)) + "-" 
			+ (d.getDate() < 10 ? ("0" + d.getDate()) : d.getDate())
			+ " " + week;
	}
	return text;
}

function formatDayOfWeek(day,preWord)
{
	preWord = preWord || "星期";
	switch(day){
	case 1:
		return preWord + '日';
	case 2:
		return preWord + '一';
	case 3:
		return preWord + '二';
	case 4:
		return preWord + '三';
	case 5:
		return preWord + '四';
	case 6:
		return preWord + '五';
	case 7:
		return preWord + '六';
	}
}

function nullToEmpty(str){
	if(!str && str != false){
		return "";
	}
	return str;
}

function addCookie(name, value, expiresHours) {
	var cookieString = name + "=" + escape(value);
	// 判断是否设置过期时间
	if (expiresHours > 0) {
		var date = new Date();
		date.setTime(date.getTime + expiresHours * 3600 * 1000);
		cookieString = cookieString + "; expires=" + date.toGMTString();
	}
	document.cookie = cookieString;
} 

function getCookie(name) {
	var strCookie = document.cookie;
	var arrCookie = strCookie.split("; ");
	for ( var i = 0; i < arrCookie.length; i++) {
		var arr = arrCookie[i].split("=");
		if (arr[0] == name)
			return arr[1];
	}
	return "";
}
function toInt(value){
	value = parseInt( value );
    return isNaN( value ) ? 0 : value;
}
function toFloat(value){
	value = parseFloat( value );
    return isNaN( value ) ? 0 : value;
}

/**
 * 初始化日期控件value为空的值，默认为当天
 * 参数：jqueryObj 可选，若不传参则为当前页面所有 init!="false" 的datepicker
 */
function initCalendarDefault(jqueryObj){
	if(jqueryObj){
		jqueryObj.val(parseDate(new Date().getTime()));
	}else{
		$(".datepicker[init]").each(function(){
			var $this = $(this);
			var init = $this.attr("init");
			if(!$this.val() && (init == "" || (init != false && init != "false"))){
				$this.val(parseDate(new Date().getTime()));
			}
		});
	}
}

// 处理键盘事件 禁止后退键（Backspace）密码或单行、多行文本框除外
function fnBanBackSpace(e) {
	var ev = e || window.event;// 获取event对象
	if(ev.keyCode != 8){
		return;
	}
	var obj = ev.target || ev.srcElement;// 获取事件源
	var t = obj.type || obj.getAttribute('type');// 获取事件源类型
	// 获取作为判断条件的事件类型
	var vReadOnly = obj.getAttribute('readonly');
	var vDisabled = obj.getAttribute('disabled');
	// 处理null值情况
	vReadOnly = vReadOnly ? true : false;
	vDisabled = vDisabled ? true : false;
	// 当敲Backspace键时，事件源类型为密码或单行、多行文本的，
	// 并且readonly属性为true或disabled属性为true的，则退格键失效
	var flag1 = ((t == "password" || t == "text" || t == "textarea") && (vReadOnly == true || vDisabled == true)) ? true
			: false;
	// 当敲Backspace键时，事件源类型非密码或单行、多行文本的，则退格键失效
	var flag2 = (t != "password" && t != "text" && t != "textarea") ? true
			: false;
	// 判断
	//alert("flag1=" + flag1 + ",flag2=" + flag2 + ",keycode=" + ev.keyCode + ",type=" + t);
	if (flag2 == true) {
		return false;
	}
	if (flag1 == true) {
		return false;
	}
}

// 禁止后退键 作用于Firefox、Opera
document.onkeypress = fnBanBackSpace;
// 禁止后退键 作用于IE、Chrome
document.onkeydown = fnBanBackSpace;

function getCursorPos(ctrl){ 
	var CaretPos = 0; 
	if (document.selection) { // IE Support 
	ctrl.focus(); 
	var Sel = document.selection.createRange(); 
	Sel.moveStart('character', -ctrl.value.length); 
	CaretPos = Sel.text.length; 
	}else if(ctrl.selectionStart || ctrl.selectionStart == '0'){// Firefox support 
	CaretPos = ctrl.selectionStart; 
	} 
	return (CaretPos); 
}
//设置光标位置函数 
function setCursorPos(ctrl, pos) {
	if (ctrl.setSelectionRange) {
		ctrl.focus();
		ctrl.setSelectionRange(pos, pos);
	} else if (ctrl.createTextRange) {
		var range = ctrl.createTextRange();
		range.collapse(true);
		range.moveEnd('character', pos);
		range.moveStart('character', pos);
		range.select();
	}
}
//replace之后光标置到原位置
function replaceAndSetPos(obj, pattern, text) {
	if (event.shiftKey || event.altKey || event.ctrlKey
			|| event.keyCode == 16 || event.keyCode == 17
			|| event.keyCode == 18
			|| (event.shiftKey && event.keyCode == 36))
		return;
	var pos = getCursorPos(obj);//保存原始光标位置
	var temp = obj.value; //保存原始值
	obj.value = temp.replace(pattern, text);//替换掉非法值
	pos = pos - (temp.length - obj.value.length);//当前光标位置
	setCursorPos(obj, pos);//设置光标
}
/****
 * 
 * 去空格
 * 
 * 
 * */
function trimDSpace(){
	$("input[type=text]").each(function(){
		
		var value = $.trim($(this).val());
		$(this).attr("value",value);
	});
}
function inputToHidden(id,id2){
	$("#"+id).css("display","none");
	$("#"+id2).text($("#"+id).val());
}