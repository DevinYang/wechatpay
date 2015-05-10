jQuery.extend(jQuery.validator.defaults, {
	errorPlacement: function(error, element) { 
		error.css("color", "#FF0000");
	    if ( element.is(":radio") ){
	    	if(element.parent().is("label")){
	    		error.appendTo ( element.parent().parent() );
	    	}else{
	    		error.appendTo ( element.parent() );
	    	}
	    } 
	    else if ( element.is(":checkbox") ){
	    	if(element.parent().is("label")){
	    		error.appendTo ( element.parent().parent() );
	    	}else{
	    		error.appendTo ( element.parent() );
	    	}
	    }else if( element.hasClass("ui-spinner-box")){
	    	error.appendTo ( element.parent().parent() );
	    }else if( element.hasClass("group")){
	    	error.appendTo(element.parent());
	    }else{
	    	error.insertAfter(element);
	    }
	},
	onkeyup: function(element) { $(element).valid(); }
}   
);

//$.metadata.setType("attr", "validate");

// required:true 必输字段
// remote:"check.php" 使用ajax方法调用check.php验证输入值
// email:true 必须输入正确格式的电子邮件
// url:true 必须输入正确格式的网址
// date:true 必须输入正确格式的日期
// dateISO:true 必须输入正确格式的日期(ISO)，例如：2010-01-01，2010/01/01 只验证格式，不验证有效性
// number:true 必须输入合法的数字(负数，小数)
// digits:true 必须输入整数
// creditcard: 必须输入合法的信用卡号
// equalTo:"#field" 输入值必须和#field相同
// accept: "gif|png|jpg" 输入拥有合法后缀名的字符串（上传文件的后缀），多个后缀之间用’|’隔开
// maxlength:5 输入长度最多是5的字符串(汉字算一个字符)
// minlength:10 输入长度最小是10的字符串(汉字算一个字符)
// rangelength:[5,10] 输入长度必须介于 5 和 10 之间的字符串")(汉字算一个字符)
// range:[5,10] 输入值必须介于 5 和 10 之间
// max:5 输入值不能大于5
// min:10 输入值不能小于10 

$(document).ready(function () {
	//字符验证
	 jQuery.validator.addMethod("flightNo", function(value, element) {
		 $(element).val($(element).val().trim().toUpperCase());
	     return this.optional(element) || /^[\w]{2}[0-9]{3,4}$/.test(value);       
	 }, "航班号格式错误");
	 jQuery.validator.addMethod("pnrConment", function(value, element) {
		 var fag=false;
		 if(value.length<=12)
			fag= this.optional(element) || /^SSR[\s][A-Za-z]{4}[\s][A-Za-z0-9]{2}[\s]{0,1}$/.test(value);
		 else
			fag= this.optional(element) || (/^SSR[\s][A-Za-z]{4}[\s][A-Za-z0-9]{2}[\s]$/.test(value.substring(0,12))&&!(/^.*([P][0-9]{1})+.*$/.test(value.substring(12,value.length))));
		 return fag;
	 }, "PNR备注格式错误");
	 jQuery.validator.addMethod("airLine", function(value, element) {
		 $(element).val($(element).val().trim().toUpperCase());
	     return this.optional(element) || /^[A-Z]{3}-[A-Z]{3}$/.test(value);       
	 }, "格式为AAA-BBB");
	 jQuery.validator.addMethod("schedule", function(value, element) {
		 $(element).val($(element).val().trim().toUpperCase());
	     return this.optional(element) || /^(?:([1-7])(?!.*?\\1)){1,7}$/.test(value);       
	 }, "班期格式错误");
	 jQuery.validator.addMethod("empNo", function(value, element) {
	     return this.optional(element) || /^[0-9]{4}$/.test(value);       
	 }, "工号为4位数字");
	 jQuery.validator.addMethod("ticketNo", function(value, element) {       
	     return this.optional(element) || /^(880|888|826|847|859|895|898)-?\d{10}$/.test(value);       
	 }, "票号格式不正确");
	 jQuery.validator.addMethod("ticketNos", function(value, element) {       
	     var ticketNos = /^(880|888|826|847|859|895|898)-?\d{10}(,(880|888|826|847|859|895|898)-?\d{10})*$/;   
	     return this.optional(element) || ticketNos.test(value);       
	 }, "票号格式不正确");
	 jQuery.validator.addMethod("bigCustCode", function(value, element) {       
	     return this.optional(element) || /^\d{7}$/.test(value) || /^[a-zA-Z]{3}\d{7}$/.test(value);       
	 }, "大客户号格式不正确");
	 jQuery.validator.addMethod("orderNo", function(value, element) {       
	     return this.optional(element) || /^([B|C|R]+\d{15})+$/.test(value);       
	 }, "订单号格式不正确");
	 jQuery.validator.addMethod("busNo", function(value, element,param) {
		 $(element).val($(element).val().trim().toUpperCase());
	     return this.optional(element) || /^([B|C|R]+\d{15})+$/.test(value) || /^(880|888|826|847|859|895|898)-?\d{10}$/.test(value) || /^[\w\d]{6}$/.test(value);       
	 }, "格式不正确");
	 //非法字符验证，只能包含汉字、中文标点符号、英文、"/"线，空格
	 jQuery.validator.addMethod("effectiveWord", function(value, element) {
	     return this.optional(element) || /^[\u0391-\uFFE5\w\s\r\n\/]+$/.test(value);
	 }, "存在非法字符");
	 jQuery.validator.addMethod("onlychinese", function(value, element) {
	     return this.optional(element) || /^[\u4e00-\u9fa5]+$/.test(value);
	 }, "只能包括中文");
	 jQuery.validator.addMethod("chEnNum", function(value, element) {
	     return this.optional(element) || /^[\u4e00-\u9fa5\w]+$/.test(value);
	 }, "只能包括中英文、数字");
	 jQuery.validator.addMethod("alnum", function(value, element) {
			return this.optional(element) || /^[a-zA-Z0-9]+$/.test(value);
	 }, "只能包括英文字母和数字");
	 jQuery.validator.addMethod("az", function(value, element) {
			return this.optional(element) || /^[a-zA-Z]+$/.test(value);
	 }, "只能包括英文字母");
	 jQuery.validator.addMethod("ename", function(value, element) {
			return this.optional(element) || /^[A-Za-z]{2,}(\s[A-Za-z]+|\/[A-Za-z]+){0,2}$/.test(value);
	 }, "英文名格式错误");
	 //中文       
	 jQuery.validator.addMethod("chinese", function(value, element, param) {       
	     var flag = true;
	     for(var i = 0; i < value.length; i++){       
	         if(value.charCodeAt(i) <= 127){
	        	 flag = false;
	         }       
	     }       
	     return this.optional(element) || flag;       
	 }, "请输入中文");
	 
	//不能输入中文
	 jQuery.validator.addMethod("noChinese", function(value, element, param) {       
	     var flag = true;
	     for(var i = 0; i < value.length; i++){       
	         if(value.charCodeAt(i) > 127){
	        	 flag = false;
	         }       
	     }       
	     return this.optional(element) || flag;       
	 }, "不能输入中文");
	
	 jQuery.validator.addMethod("linkname", function(value, element, param) {       
	     var flag = true;
	     for(var i = 0; i < value.length; i++){       
	         if(value.charCodeAt(i) <= 127){
	        	 flag = false;
	         }       
	     }       
	     return this.optional(element) || flag || /^[A-Za-z]{2,}(\s[A-Za-z]+|\/[A-Za-z]+){0,2}$/.test(value);       
	 }, "姓名格式错误");
	 jQuery.validator.addMethod("threeWordCode", function(value, element) {
			return this.optional(element) || /^[A-Z]{3}$/.test(value);
	 }, "请输入有效的三字码(A-Z)");
	 jQuery.validator.addMethod("permName", function(value, element) {
			return this.optional(element) || /^[a-zA-Z]+:[\a-zA-Z]+$/.test(value);
	 }, "权限名称格式不正确");
	 jQuery.validator.addMethod("pnrCode", function(value, element) {
		 $(element).val($(element).val().trim().toUpperCase());
		 return this.optional(element) || /^[\w\d]{5,6}$/.test(value);
	 }, "PNR格式不正确");
	 
	 //正整数
	 jQuery.validator.addMethod("integer", function(value, element) {
		return this.optional(element) || /^(\+|-)?\d+$/.test( value ) || value<0;
	 }, "请输入正整数");
	 
	 //操作人工号
	 jQuery.validator.addMethod("artificialNo", function(value, element) {
		return this.optional(element) || /^(\+|-)?\d+$/.test( value ) || value<0;
	 }, "请输入正确的人工号");
	 
	 // 字节长度验证
	 jQuery.validator.addMethod("byteRangeLength", function(value, element, param) {
	     var length = value.length;
	     for (var i = 0; i < value.length; i++) {
	         if (value.charCodeAt(i) > 127) {
	             length++;
	         }
	     }
	     return this.optional(element) || (length >= param[0] && length <= param[1]);
	 }, $.validator.format("请确保输入的值在{0}-{1}个字节之间(一个中文字算2个字节)"));
	
	 //日期范围验证
	 jQuery.validator.addMethod("dateAfter", function(value, element, param) {
		 if(value =='')return true;
		 if($(param[0]).val() == '')return true;
		 return new Date(Date.parse(value.replace("-", "/"))) > new Date(Date.parse($(param[0]).val().replace("-", "/"))); 
	 }, $.validator.format("必须大于{1}"));
	 
	 //日期范围验证
	 jQuery.validator.addMethod("dateBefore", function(value, element, param) {
		 if(value =='')return true;
		 if($(param[0]).val() == '')return true;
		 return new Date(Date.parse(value.replace("-", "/"))) < new Date(Date.parse($(param[0]).val().replace("-", "/"))); 
	 }, $.validator.format("必须小于{1}"));
	 
	//日期范围验证
	 jQuery.validator.addMethod("dateBeforOrEq", function(value, element, param) {
		 if(value =='')return true;
		 if($(param[0]).val() == '')return true;
		 return new Date(Date.parse(value.replace("-", "/"))) <= new Date(Date.parse($(param[0]).val().replace("-", "/"))); 
	 }, $.validator.format("必须小于或等于{1}"));
	 
	jQuery.validator.addMethod("dateBeforNow", function(value, element, param) {
		 if(value =='')return true;
		 return new Date(Date.parse(value.replace("-", "/"))) <= new Date(); 
	 }, $.validator.format("必须小于或等于当前日期"));
	
	jQuery.validator.addMethod("dateAfterNow", function(value, element, param) {
		 if(value =='')return true;
		 return new Date(Date.parse(value.replace("-", "/"))) >= new Date(); 
	 }, $.validator.format("必须大于或等于当前日期"));
	
	 jQuery.validator.addMethod("dateAfterOrEq", function(value, element, param) {
		 if(value =='')return true;
		 if($(param[0]).val() == '')return true;
		 return new Date(Date.parse(value.replace("-", "/"))) >= new Date(Date.parse($(param[0]).val().replace("-", "/"))); 
	 }, $.validator.format("必须大于或等于{1}"));
	 
	 jQuery.validator.addMethod("dateBeforOrEqLe", function(value, element, param) {
		 if(value =='')return true;
		 if($(param[0]).val() == '')return true;
		 var startDate = new Date(Date.parse(value.replace("-", "/")));
		 var endDate = new Date(Date.parse($(param[0]).val().replace("-", "/")));
		 var times = param[2]*24*60*60*1000;
		 return  (endDate-startDate)>=0 && ((endDate-startDate) <= times); 
	 }, $.validator.format("必须小于或等于{1}并且间隔小于{2}天"));
	 
	 jQuery.validator.addMethod("dateAfterOrEqLe", function(value, element, param) {
		 if(value =='')return true;
		 if($(param[0]).val() == '')return true;
		 var endDate = new Date(Date.parse(value.replace("-", "/")));
		 var startDate = new Date(Date.parse($(param[0]).val().replace("-", "/")));
		 var times = param[2]*24*60*60*1000;
		 return  (endDate-startDate)>=0 && ((endDate-startDate) <= times); 
	 }, $.validator.format("必须大于或等于{1}并且间隔小于{2}天"));
	 
	 jQuery.validator.addMethod("requiredTo", function(value, element, param) {
		 return (value!='' || $(param[0]).val() != '');
	 }, $.validator.format("{1}必须输入一项"));
	 
	 jQuery.validator.addMethod("certNo", function(value, element) {       
	     return this.optional(element) || isIdCardNo(value) || checknumber(value);       
	 }, "证件号码格式不正确");
	 // 身份证号码验证       
	 jQuery.validator.addMethod("idCardNo", function(value, element) {       
	     return this.optional(element) || isIdCardNo(value);       
	 }, "请输入正确的身份证号码");    
	 
	 jQuery.validator.addMethod("passport", function(value, element) { 
		  return this.optional(element) || checknumber(value);     
 	 }, "请输入正确的护照编号"); 
	 
	 // 手机号码验证       
	 jQuery.validator.addMethod("mobile", function(value, element) {       
	     var length = value.length;   
	     var mobile = /^(((13[0-9]{1})|(15[0-9]{1})|(18[0-9]{1}))+\d{8})$/;   
	     return this.optional(element) || (length == 11 && mobile.test(value));       
	 }, "请输入正确的手机号码");       
	 // 手机号码验证       
	 jQuery.validator.addMethod("mobiles", function(value, element) {       
	     var mobile = /^((((13[0-9]{1})|(15[0-9]{1})|(18[0-9]{1}))+\d{8}),)*(((13[0-9]{1})|(15[0-9]{1})|(18[0-9]{1}))+\d{8})$/;   
	     return this.optional(element) || mobile.test(value);       
	 }, "请输入正确的手机号码,多个以','分隔");
	 // 电话号码验证       
	 jQuery.validator.addMethod("tel", function(value, element) {       
	     var tel = /^\d{3,4}-?\d{7,9}$/;    //电话号码格式010-12345678      
	     return this.optional(element) || (tel.test(value));       
	 }, "请输入正确的电话号码");   
	// 电话号码验证       
	 jQuery.validator.addMethod("fax", function(value, element) {       
	     var tel = /^(\d{3,4}-?)?\d{7,9}$/;    //电话号码格式010-12345678      
	     return this.optional(element) || (tel.test(value));       
	 }, "请输入正确的传真号码，本区内可以不用区号");
	
	 // 联系电话(手机/电话皆可)验证   
	 jQuery.validator.addMethod("phone", function(value,element) {   
	     var mobile = /^(((13[0-9]{1})|(15[0-9]{1})|(18[0-9]{1}))+\d{8})$/;   
	     var tel = /^\d{3,4}-?\d{7,9}$/;   
	     return this.optional(element) || (tel.test(value) || mobile.test(value));   
	 }, "请输入正确的电话或手机号码");   
	 
	// 联系电话(手机/电话皆可)验证   (忽略空白)
	 jQuery.validator.addMethod("phoneS", function(val,element) { 
		 var value = "";
			var splitstring = val.split(" ");
			for(i = 0; i < splitstring.length; i++)
				{
				value += splitstring[i];
				}
	     var mobile = /^(((13[0-9]{1})|(15[0-9]{1})|(18[0-9]{1}))+\d{8})$/;   
	     var tel = /^\d{3,4}-?\d{7,9}$/;   
	     return this.optional(element) || (tel.test(value) || mobile.test(value));   
	 }, "请输入正确的电话或手机号码");   
	 
	 // 邮政编码验证
	 jQuery.validator.addMethod("postCode", function(value, element) {       
	     var tel = /^[0-9]{6}$/;       
	     return this.optional(element) || (tel.test(value));       
	 }, "请输入正确的邮政编码");
	 
	 /* 小数验证，小数点位数按照max参数的小数点位数进行判断
	* 不能为空、只能输入数字 */
	$.validator.addMethod("isDecimal", function(value, element, params) {
		if(isNaN(params[0])) {
			return false;
		}
		if(typeof(value) == undefined || value == "") {
			return false;
		}
		var regX = "";
		if(typeof(params[0]) == undefined || params[0] == 0) {
			regX = /^\d+$/;
		} else {
			var regxStr = "^\\d+(\\.\\d{1,"+params[0]+"})?$";
			regX = new RegExp(regxStr);
		}
	    return this.optional(element) || (regX.test(value));
	 }, $.validator.format("请输入最多{0}位小数的数字"));
	 
	 // HH:MM或者HHMM格式的时间，如09:10或者0910
	 jQuery.validator.addMethod("HH:MM", function(value, element) {       
	     var time = /^([0-1][0-9]|2[0-3])[:]?([0-5][0-9])$/;       
	     return this.optional(element) || (time.test(value));       
	 }, "格式错误，请输入HH:MM或HHMM格式时间!");
	 
	 // HH小时格式的时间，如09
	 jQuery.validator.addMethod("hour", function(value, element) {       
	     var time = /^([0-1][0-9]|2[0-3])$/;       
	     return this.optional(element) || (time.test(value));       
	 }, "格式错误，请输入HH格式时间!");
	
	 // MM分钟格式的时间，如35
	 jQuery.validator.addMethod("minute", function(value, element) {       
	     var time = /^([0-5][0-9])$/;       
	     return this.optional(element) || (time.test(value));       
	 }, "格式错误，请输入MM格式时间!");
	 
	 // 日期验证，支持以下格式：YYYY-MM-DD  YYYY/MM/DD  YYYY_MM_DD  YYYY.MM.DD
	 jQuery.validator.addMethod("Date", function(value, element) {       
	     var date = /^(([0-9]{3}[1-9]|[0-9]{2}[1-9][0-9]{1}|[0-9]{1}[1-9][0-9]{2}|[1-9][0-9]{3})[-\/\._](((0[13578]|1[02])[-\/\._](0[1-9]|[12][0-9]|3[01]))|((0[469]|11)[-\/\._](0[1-9]|[12][0-9]|30))|(02-(0[1-9]|1[0-9]|2[0-8]))))|((([0-9]{2})(0[48]|[2468][048]|[13579[26]))|((0[48]|[2468][048]|[13579][26])00)[-\/\._]02[-\/\._]29)$/;       
	     return this.optional(element) || (date.test(value));       
	 }, "格式错误，请输入格式日期!");
	 
	 // 纯数字 
	 jQuery.validator.addMethod("isNumber", function(value, element) {       
	     var num = /^\d*$/;       
	     return this.optional(element) || (num.test(value));       
	 }, "格式错误，请输入数字!");
	 
	 //留票时限时限 HH:mm格式 08:10
	 jQuery.validator.addMethod("onlytime", function(value, element) {       
		 var time = /^([0-1][0-9]|2[0-3]):([0-5][0-9])$/;
	     return this.optional(element) || (time.test(value));
	 }, "请输入[时:分]格式");
	 
	//留票时限时限 HH:mm格式 08:10
	 jQuery.validator.addMethod("passwd", function(value, element) {       
		 var passwd = /^\S*$/;
	     return this.optional(element) || (passwd.test(value));
	 }, "密码不能有空格");
	//留票时限时限 HH:mm格式 08:10
	 jQuery.validator.addMethod("rewardNo", function(value, element) {       
		 var reward = /^\d{7}$/;
	     return this.optional(element) || (reward.test(value));
	 }, "凭证号长度必须是7位且必须为数字");
	
	 // 多个邮箱用英文逗号分隔
	 jQuery.validator.addMethod("moreEmail", function(value, element) {       
	    var email = /^([\w-]+(\.[\w-]+)*@[\w-]+(\.[\w-]+)+;)+$/;       
	     return this.optional(element) || (email.test(value.trim() + ";"));       
	 }, "请输入正确邮箱，多个之间用英文分号分隔!");
	 
	 // 金鹏卡号
	 jQuery.validator.addMethod("goldenCard", function(value, element) {
		 $(element).val($(element).val().trim());
	     //var email = /^HU\d{10}$/;     
	     var email = /^(HU)?\d{10}$/;   

	     return this.optional(element) || (email.test(value.trim()));       
	 }, "请输入正确的金鹏卡号!");
	 
	 // 多个航班号，以英文/分隔
	 jQuery.validator.addMethod("moreFlightNo", function(value, element) {
		 $(element).val($(element).val().trim().toUpperCase());
		 var no = /^([\w]{2}[0-9]{3,4}\/)+$/;
	     return this.optional(element) || no.test(value.trim() + "/");       
	 }, "航班号格式错误，多个间以英文/分隔");
	 
	 jQuery.validator.addMethod("moreTicketNo", function(value, element) {
		 $(element).val($(element).val().trim());
	     return this.optional(element) || /^((880|888|826|847|859|895|898)-?\d{10}\/)+$/.test(value.trim() + "/");       
	 }, "票号格式不正确，多个间用/分隔");
	 
	 jQuery.validator.addMethod("moreAirLine", function(value, element) {
		 $(element).val($(element).val().trim().toUpperCase());
	     return this.optional(element) || /^([A-Z]{3}-?[A-Z]{3}\/)+$/.test(value.trim() + "/");       
	 }, "格式为AAA-BBB或AAABBB，多个间用/分隔");
	 
	 jQuery.validator.addMethod("morePnrCode", function(value, element) {
		 $(element).val($(element).val().trim().toUpperCase());
		 return this.optional(element) || /^([\w\d]{5,6}\/)+$/.test(value.trim() + "/");
	 }, "PNR格式不正确，多个间用/分隔");
	 
	 // 航班号，包括HUOPEN这种
	 jQuery.validator.addMethod("flightNoOpen", function(value, element) {
		 $(element).val($(element).val().trim().toUpperCase());
		 var no = /^[\w]{2}([0-9]{3,4}|OPEN|VOID)$/;
	     return this.optional(element) || no.test(value.trim());       
	 }, "航班号格式错误");
	 
	 jQuery.validator.addMethod("airLine2", function(value, element) {
		 $(element).val($(element).val().trim().toUpperCase());
		 return this.optional(element) || /^[A-Z]{3}-[A-Z]{3}$/.test(value)||/^[A-Z]{3}-[A-Z]{3}-[A-Z]{3}$/.test(value);      
	 }, "格式为AAA-BBB或者AAA-BBB-CCC");

	 jQuery.validator.addMethod("airType", function(value, element) {
			return this.optional(element) || /^[0-9]+$/.test(value)|| /^[0-9]+\/[0-9]+$/.test(value);
	 }, "机型只能为AAA或者AAA/BBB");
	 
	 //退票客票查询输入验证，票号和PNR只能输入一项
	 jQuery.validator.addMethod("allowOne", function(value, element, param) {
		 if(value == '' && $(param[0]).val() == '') return false;
		 if(value != '' && $(param[0]).val() != '') return false;
		 return true; 
	 }, $.validator.format("请输入其中一项"));

	 //退票客票查询输入验证，根据选择的类型，判断输入的有效性
	 jQuery.validator.addMethod("allowType", function(value, element, param) {
		 if(value == '') return true;
		 if($(param[0]).val() == 'TICKET') return /^(880|888|826|847|859|895|898)-?\d{10}$/.test(value);
		 //if($(param[0]).val() == 'NI') return isIdCardNo(value);
		 //if($(param[0]).val() == 'PP') return checknumber(value);
		 return true; 
	 }, $.validator.format("号码格式不正确"));
});

//验证护照是否正确
function checknumber(number){
	var str=number;
	//var reg = /^(P\d{7}|G\d{8}|S\d{7,8}|D\d+|1[4,5]\d{7})$/;
	var reg = /^[\w\d]{2,18}$/;
	if(reg.test(str)==true){
	   return true;
	}else{
	   return false;
	} 
}

//身份证验证
function isIdCardNo(num) {
    var factorArr = new Array(7, 9, 10, 5, 8, 4, 2, 1, 6, 3, 7, 9, 10, 5, 8, 4, 2, 1);
    var parityBit = new Array("1", "0", "X", "9", "8", "7", "6", "5", "4", "3", "2");
    var varArray = new Array();
    var lngProduct = 0;
    var intCheckDigit;
    var intStrLen = num.length;
    var idNumber = num;
    // initialize
    if ((intStrLen != 15) && (intStrLen != 18)) {
        return false;
    }
    // check and set value
    for (var i=0; i < intStrLen; i++) {
        varArray[i] = idNumber.charAt(i);
        if ((varArray[i] < '0' || varArray[i] > '9') && (i != 17)) {
            return false;
        } else if (i < 17) {
            varArray[i] = varArray[i] * factorArr[i];
        }
    }
    if (intStrLen == 18) {
        //check date
        var date8 = idNumber.substring(6, 14);
        if (isDate8(date8) == false) {
            return false;
        }
        // calculate the sum of the products
        for (var i=0; i < 17; i++) {
            lngProduct = lngProduct + varArray[i];
        }
        // calculate the check digit
        intCheckDigit = parityBit[lngProduct % 11];
        // check last digit
        if (varArray[17] != intCheckDigit) {
            return false;
        }
    }
    else { //length is 15
        //check date
        var date6 = idNumber.substring(6, 12);
        if (isDate6(date6) == false) {
            return false;
        }
    }
    return true;
}

function isDate6(sDate) {
    if (!/^[0-9]{6}$/.test(sDate)) {
        return false;
    }
    var year, month;
    year = sDate.substring(0, 4);
    month = sDate.substring(4, 6);
    if (year < 1700 || year > 2500) return false;
    if (month < 1 || month > 12) return false;
    return true;
}

function isDate8(sDate) {
    if (!/^[0-9]{8}$/.test(sDate)) {
        return false;
    }
    var year, month, day;
    year = sDate.substring(0, 4);
    month = sDate.substring(4, 6);
    day = sDate.substring(6, 8);
    var iaMonthDays = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
    if (year < 1700 || year > 2500) return false;
    if (((year % 4 == 0) && (year % 100 != 0)) || (year % 400 == 0)) iaMonthDays[1] = 29;
    if (month < 1 || month > 12) return false;
    if (day < 1 || day > iaMonthDays[month - 1]) return false;
    return true;
}

function getBirthday(idNum){
	if(isIdCardNo(idNum)){
		if(idNum.length == 18){
			return idNum.substring(6, 10)+"-"+idNum.substring(10,12)+"-"+idNum.substring(12,14);
		}else if(idNum.length == 15){
			return "19"+idNum.substring(6, 8)+"-"+idNum.substring(8,10)+"-"+idNum.substring(10,12);
		}
	}
	return "";
}

//过滤空格、全角
function ignoreSpaces(string) {
	var result=""; 
	　　for (var i = 0; i < string.length; i++){ 
	　　　if (string.charCodeAt(i)==12288){ 
	　　　　result+= String.fromCharCode(string.charCodeAt(i)-12256); 
	　　　　continue; 
	　　　} 
	　　　if (string.charCodeAt(i)>65280 && string.charCodeAt(i)<65375) result+= String.fromCharCode(string.charCodeAt(i)-65248); 
	　　　else result+= String.fromCharCode(string.charCodeAt(i)); 
	　　} 
	var temp = "";
	string = '' + result;
	splitstring = result.split(" ");
	for(i = 0; i < splitstring.length; i++)
	{
		temp += splitstring[i];
	}
	return temp;
}