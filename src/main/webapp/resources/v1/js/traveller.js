var showLine = 1;
var travellerIndex=0;
var pagenum;
var totalpagenum=0;
var adultCountInPage = 0;
var childCountInPage = 0;
var babyCountInPage = 0;
var customerIdType;
var memberType ;
var twosapcereg = /^((?! {2,}).)+$/;
var datajson;


/***
 * 获取日期
 * @param time
 * @param date
 * @returns {Boolean}
 */
function getDeadLineTime(time,date){
	var firstFlightDate = date.split("-");
	var flightDate = new Date(firstFlightDate[0],(Number(firstFlightDate[1])-1),firstFlightDate[2],time.substring(0, 2),time.substring(2, 4),00);
	var flightNow = new Date();
	var count = (flightDate.getTime() - flightNow.getTime())/60/60/1000;
	var lastDate ="";
	if(count <1){
		Dialog.alert("离起飞时间不足1小时，不允许预定，请选择其他航班！");

		$("#createPnr").bind("click",function(){
			Dialog.alert("离起飞时间不足1小时，不允许预定，请选择其他航班！");
		});
		return ;
	}
	$("#createPnr").bind("click",createPnr);
	if(count >1 && count <= 3){
		//加一小时
		flightDate.setHours(flightDate.getHours()-1, flightDate.getMinutes(), flightDate.getSeconds(), flightDate.getMilliseconds());
		lastDate = flightDate;
	}
	if(count > 3){
		//加3小时
		flightNow.setHours(flightNow.getHours()+3, flightNow.getMinutes(), flightNow.getSeconds(), flightNow.getMilliseconds());
		lastDate = flightNow;
	}
	var min = lastDate.getMinutes()<10?("0"+lastDate.getMinutes()):lastDate.getMinutes(); //minute 
	$("#reserveTicketDate").val(lastDate.getFullYear()+"-"+(lastDate.getMonth()+1)+"-"+lastDate.getDate());
	$("#reserveTicketDateHtml").text(lastDate.getFullYear()+"-"+(lastDate.getMonth()+1)+"-"+lastDate.getDate());
	$("#reserveTicketTime").val((lastDate.getHours())+":"+min);
	$("#reserveTicketTimeHtml").text((lastDate.getHours())+":"+min);
	return true;
}
$(function(){
	$("div.zlg_list").find("dl").click(function(){  // 查找dl
        var has=$(this).addClass("clickclass");// 查找是否含用clickclass样式
        if(has){
            $(this).removeClass("clickclass");
                }
        var chek=$(this).find(":input").attr("checked");
        if(chek){
            $(this).addClass("clickclass");
            }
        });
		$("div.zlg_list").find("dl").each(  function(i){
		  	 var chek=$(this).find(":input").attr("checked");
			if(chek){
				$(this).addClass("clickclass");
			}
		});
});

$(function(){
	customerId = parent.window.$("#customerId").val();
	pageSize = 10;
	pageNo = 1;
	pagenum = 1;
	sendRequest(pageNo,pageSize,'first');
	$("#addTable").bind("click",function(){
		
		var typevalue = -1;
		var type = document.getElementsByName("passagetype");
		for(var i = 0;i<type.length;i++){
			if(type[i].checked){
				typevalue = type[i].value;
				}
		}
		checkPersonCount(typevalue,null);
	});
	$(".inputInfo_usualUser").live('click',function(){
		// 点击div设置checkbox = true
		var classbox = $(this).attr("class");
		var checkBox = $(this).find("input[type=checkbox]");
		var boxData = $(this).find("input[type=checkbox]").attr("value").split("|");
		if(classbox.indexOf("boxBg1")>=0){
			$(checkBox).attr("checked", false);
			$(this).removeClass("boxBg1");
			$(this).css("background","#CCCCCC");
		}else {
			
			var data = [];
			data.push({chFullName:boxData[0],bigCustCode:boxData[4],birthDate:boxData[5],
				credType:boxData[1],credCode:boxData[2],memberCardType:boxData[6],memberCardCode:boxData[7],index:boxData[8]});

			if(boxData[3]=="ADULT"){
				
				if(adultCountInPage >= Number($("#getACount").val())){
					Dialog.alert("预选成人数为："+adultCountInPage+",若要添加成人，请先删除存在的成人旅客信息！");
					$(checkBox).attr("checked", false);
					return;
				}
				addAdult(data);
			}
			if(boxData[3]=="CHILD"){
			
				if(childCountInPage>=Number($("#getCCount").val())){
					$(checkBox).attr("checked", false);
					Dialog.alert("预选儿童数为："+childCountInPage+",若要添加儿童，请先删除存在的儿童旅客信息！");
					return;
				}
				addChild(data);
			}
			if(boxData[3]=="INFANT"){
			
				if(babyCountInPage >= Number($("#getBCount").val())){
					$(checkBox).attr("checked", false);
					Dialog.alert("预选婴儿数为："+babyCountInPage+",若要添加婴儿，请先删除存在的婴儿旅客信息！");
					return;
				}
				var isIntegral = true;
				$("input[al=adultName]").each(function(){
					
					if(this.value==''){
						isIntegral = false;
					}
				});
				if(!isIntegral){
				
					Dialog.alert("请先填写完整的成人姓名信息!");
					return;
				}
				if(babyCountInPage>=Number($("#getBCount").val())){
					
					Dialog.alert("预选婴儿数为："+babyCountInPage+",若要添加婴儿，请先删除存在的婴儿旅客信息！");
					return;
				}
				addBaby(data);
			}
		$(this).addClass("boxBg1");
		$(checkBox).attr("checked", true);
		$(this).css("background","#5EB000");
		var index  = $(".travellerIndex");
		for(var i = 0 ;i<index.length;i++){
			$(index[i]).html(i+1+"、");
		}
		}
	});
	// 旅客信息上一页
	$("#LeftArr").click(function(){
		if(pagenum == 1){sendRequest(pagenum,pageSize,'first');}
		if(pagenum>1){sendRequest(pagenum-1,pageSize,'up');}							  
	});
	// 旅客信息下一页
	$("#RightArr").click(function(){
		 if(totalpagenum>pagenum){
			 sendRequest(pagenum+1,pageSize,'down');
		 }	
		 if(totalpagenum == pagenum){
			 sendRequest(pagenum,pageSize,'last');
		 }			
	});
});

/***
 * 添加旅客
 * @param typevalue
 * @param data
 */
function checkPersonCount(typevalue,data){
	var hasPnr = ($("#pnr").val() != "" && $("#pnr").val() != null);
	if(typevalue==1){
			if(hasPnr){
				Dialog.alert("临时PNR已生成，不能再添加成人和儿童旅客！");
				return ;
			}
			if(adultCountInPage>=Number($("#getACount").val())){
				Dialog.alert("预选成人数为："+adultCountInPage+",若要添加成人，请先删除存在的成人旅客信息！");
				return;
			}
			addAdult(data);
			
	}
	if(typevalue==2){
			if(hasPnr){
				Dialog.alert("临时PNR已生成，不能再添加成人和儿童旅客！");
				return ;
			}
			if(childCountInPage>=Number($("#getCCount").val())){
				
				Dialog.alert("预选儿童数为："+childCountInPage+",若要添加儿童，请先删除存在的儿童旅客信息！");
				return;
			}
			addChild(data);
	}
	if(typevalue==3){
		if(babyCountInPage >= Number($("#getBCount").val())){
			
			Dialog.alert("预选婴儿数为："+babyCountInPage+",若要添加婴儿，请先删除存在的婴儿旅客信息！");
			return;
		}
		if(babyCountInPage >adultCountInPage){
			
			Dialog.alert("婴儿人数不能大于成人人数！");
			return;
		}
		if(babyCountInPage==Number($("#getBCount").val())){
			
			Dialog.alert("预选婴儿数为："+babyCountInPage+",若要添加婴儿，请先删除存在的婴儿旅客信息！");
			return;
		}
		addBaby(data);
	}
	
	var index  = $(".travellerIndex");
	for(var i = 0 ;i<index.length;i++){
		$(index[i]).html(i+1+"、");
	}
}
	function createPnr(){
		trimDSpace();
		$("#linkManNamebackPhone").attr("value",$("#linkManNamebackPhone").val().replace("-",""));
		if(!pnrFormCheck()){
			return ;
			}
		var adultCount = $("#getACount").val();
		var childCount = $("#getCCount").val();
		var infantCount = $("#getBCount").val();
		
		if(Number(adultCount)>adultCountInPage || Number(childCount) > childCountInPage || Number(infantCount) > babyCountInPage){
			Dialog.confirm("乘机人信息和预选信息不符：(成人人数："+adultCount+")、(儿童人数："+childCount+")、(婴儿人数："+infantCount+"),请确认是否要建立PNR！", toCreatPnr, cancelCreatePnr);
		}else{
			toCreatPnr();
		}
	}

function cancelCreatePnr(){
}
/**
 * worina
 * @returns {Boolean}
 */
function checkAdultAndChildCount(){
	// 校验预选成人数
	if(adultCountInPage<1){
		Dialog.alert("成人人数至少选择一个！");
		return false;
	}
	return true;
}
/**
 * worina
 * @returns {Boolean}
 */
function checkAllCount(){
	var adultCount =adultCountInPage;
	var childCount = childCountInPage;
	var babyCount = babyCountInPage;
	if(adultCount <= 0){
		Dialog.alert("成人人数至少选择一个！");
		return false;
	}
	if(adultCount < babyCount){
		
		Dialog.alert("婴儿数不能大于成人数！");
		return false;
	}
	var totalCount = parseInt(adultCount) + parseInt(childCount);
	if(totalCount>9){
		
		Dialog.alert("成人加儿童数不能大于9");
		return false;
	}
	return true;
}

/**
 * 获取PNR前的验证
 */
function pnrFormCheck(){
	trimDSpace();
	//验证成人和儿童的人数
	if(!checkAdultAndChildCount()){
		
		return false;
	}
	//验证姓名
	if(!checkAdultAndChildName()){
		return false;
	}
	return checkLinkManMsg() ;
}
/***
 * 验证成人儿童姓名
 */
function checkAdultAndChildName(){
	var names = [];
	var adultName = $("input[al=adultName]");
	for(var i = 0;i<adultName.length;i++){
		if(!checkName(adultName[i].value,0,adultName[i])){
			return false;
		}
		names.push(adultName[i].value);
	}
	var childName = $("input[al=childName]");
	for(var i = 0;i<childName.length;i++){
		if(!checkName(childName[i].value,0,childName[i])){
			return false;
		}
		names.push(childName[i].value);
	}
	if(names.length >1){
		var sortname = names.sort();
		for(var j = 0;j<sortname.length-1;j++){
			if(sortname[j] == sortname[j+1]){
				Dialog.alert("旅客姓名【"+sortname[j]+"】重复，请确认后重新输入！");
				return false;
			}
		}
	}
	return true;
}
//验证儿童生日
function checkChildBirthDate(){
	var childBirthDate = $("input[childBirthDate=childBirthDate]");
	for(var i =0;i<childBirthDate.length;i++){
		var birthDate = childBirthDate[i].value;
		if(getRightAge(birthDate)!='CHILD'){
			Dialog.alert("儿童生日有误，请重新输入！",function(){objFocus(childBirthDate[i]);});
			return false;
		}
	}
	return true;
}
function preStep(){
	Dialog.confirm("您所选的座位将在离开本页面后取消。是否离开本页面？",cancelPnr,stayThispage);
}
function stayThispage(){
}
/***
 * 审核婴儿名字
 * @returns {Boolean}
 */
function checkInfantName(){
	var infantNames = $("input[al=infantName]");
	for(var i = 0;i<infantNames.length;i++){
		var name = $(infantNames[i]).val();
		if(name==""){
			Dialog.alert("旅客姓名不能为空!",function(){objFocus(infantNames[i]);});
			return false;
		}
		if(!checkName(name,7,infantNames[i])){
			return false;
		}
	}
	return true;
}
//点击下一步验证名字唯一
function checkSameName(){
	//验证姓名不重复
	var travellerName = $("input[name$=cnFullName]");
	var names = [];
	for(var i = 0;i<travellerName.length;i++){
		names.push(travellerName[i].value);
	}
	if(names.length>1){
		var tname = names.sort();
		for(var j = 0;j<tname.length-1;j++){
			if(tname[j] == tname[j+1]){
				Dialog.alert("旅客姓名【"+tname[j]+"】重复，请确认后重新输入！");
				return false;
			}
		}
	}
	return true;
}
/**
 * 表单提交验证
 * @returns {Boolean}
 */
function checkRightPersonMsg(){
	
	if(!pnrFormCheck()){
		return false;
	}
	//审核婴儿名字
	if(!checkInfantName()){
		return false;
	}
	//审核姓名
	if(!checkSameName()){
		return false;
	}
	//审核人数
	if(!checkAllCount()){
		return false;
	}
	//审核成人生日
	var adultBirthDates = $("input[birthDate=adultBirthDate]");
	for(var i = 0;i<adultBirthDates.length;i++){
		
		var birthday = $(adultBirthDates[i]).val();
		if(birthday !="" && getRightAge(birthday) != "ADULT"){
			
			Dialog.alert("成人出生日期有误，请重新输入!",function(){objFocus(adultBirthDates[i]);});
			return false;
		}
	}
	//审核成人生日
	var childBirthDates = $("input[childbirthDate=childBirthDate]");
	for(var i = 0;i<childBirthDates.length;i++){
		
		var birthday = $(childBirthDates[i]).val();
		if(birthday =="" || getRightAge(birthday) != "CHILD"){
			
			Dialog.alert("儿童出生日期有误，请重新输入!",function(){objFocus(childBirthDates[i]);});
			return false;
		}
	}
	//审核大客户号
	var bigCode = $("input[bigCode=bigCode]");
	var fareType = $("#fareType").val();
	var bigCustCode = "";
	if(fareType == 2){
		bigCustCode = $("#bigCoustomerCode").val();
	}
	for(var i = 0;i<bigCode.length;i++){
		var code = $(bigCode[i]).val();
		if(bigCustCode!=""){
			 if(bigCustCode != code){
				 Dialog.alert("当前旅客信息大客户号"+bigCustCode+"必须一致");
				 return false;
			 }
		}
		if(bigCustCode==""){
			if(code != "" && !checkBigcustomerCode(code,bigCode[i])){
				return false;
			}
		}
		
	}
	var codes = [];
	//审核成人儿童证件
	var credType  = $("select[credType=credType]");
	var credCode  = $("input[credCode=credCode]");
	for(var i = 0 ;i<credType.length;i++){
		var type = $(credType[i]).val();
		var code = $(credCode[i]).val();
		var index = $(credCode[i]).attr("index");
		var travellerType = $("#travellerType"+i).val();
		if(type==0 && travellerType==0){
			Dialog.alert("成人证件类型不能为空！",function(){objFocus(credCode[i]);});
			return false;
		}
		if(type==1){
			if(!checksId(code,credCode[i])){
				return false;
			}
			if($("#birthDate_"+index).val()!=getBirthDateBycode(code)){
				Dialog.alert("身份证和输入的生日不符，请重新输入！",function(){
					hideLoadingMask();
					objFocus(credCode[i]);});
				return false;
			}
		}
		if(type==2){
			if(!checkPassCard(code,credCode[i])){
				return false;
			}
		}
		if(type==3){
			if(code=="" || code.length>30){
				Dialog.alert("证件号输入有误，请重新输入！",function(){objFocus(credCode[i]);});
				return false;
			}
		}
		if(code!=""){
			codes.push(code);
		}
	}
	//验证证件好不重复
	var allcodes = codes.sort();
	for(var j = 0;j<allcodes.length-1;j++){
		if(allcodes[j] == allcodes[j+1]){
			Dialog.alert("旅客证件号【"+allcodes[j]+"】重复，请确认后重新输入！");
			return false;
		}
	}
	
	//审核会员卡号
	var memberType  = $("select[memberType=memberType]");
	var memberCode  = $("input[memberCode=memberCode]");
	var fareType = $("#fareType").val();
	var tt = "";
	for(var i = 0 ;i<memberType.length;i++){
		var type = $(memberType[i]).val();
		var code = $(memberCode[i]).val();
		if(fareType==3){
			
			if(type!="B"&&type!="C"){
				Dialog.alert("您选择的金鹿卡运价，请填写金鹿卡信息！",function(){objFocus(memberCode[i]);});
				return false;
			}
			if(tt==""){
				tt = type;
			}else if(tt!=type){
				Dialog.alert("金鹿卡运价只能统一选择新金鹿卡或老金鹿卡！",function(){objFocus(memberCode[i]);});
				return false;
			}
		}
		if(type=="" && code!=""){
			//$(memberCode[i]).attr("value","");
			Dialog.alert("会员类型不能为空！",function(){objFocus(memberCode[i]);});
			return false;
		}
		if(type =="A"){
			if(!kingPCard(code,memberCode[i])){
				return false;
			}
		}
		if(type =="B"){
			if(!kingLCard(code,memberCode[i])){
				return false;
			}
		}
		if(type =="C"){
			if(!kingLCardO(code,memberCode[i])){
				return false;
			}
		}
		if(type =="M"){
			if(code==""){
				Dialog.alert("会员卡号不能为空！",function(){objFocus(memberCode[i]);});
				return false;
			}
		}
	}

	//审核婴儿生日
	var infantBirthDates = $("input[birthDate=infantBirthDate]");
	for(var i = 0;i<infantBirthDates.length;i++){
		var birthday = $(infantBirthDates[i]).val();

		if(getRightAge(birthday) != "INFANT"){
			
			Dialog.alert("婴儿出生日期有误，请重新输入!",function(){objFocus(infantBirthDates[i]);});
			return false;
		}
	}

	//验证携带人
	if(!checkInfantPname()){
		return false;
	}
	return true;
}
/***
 * 
 * @returns {Boolean}
 */
function checkInfantPname(){
	var infantPname = $("select[babyParent=babyParent]");

	var arr = [];
	for(var i = 0;i<infantPname.length;i++){
		arr[i] = $(infantPname[i]).val();
	}
	var nary=arr.sort();  
	  
	 for(var i=0;i<arr.length;i++){
		 if (nary[i]==nary[i+1]){  
		  
			 Dialog.alert("一个成人只能携带一个婴儿！");
			 return false;
		 } 
	} 
	return true ;
}
function objFocus(obj){
	obj.focus();
}
/**
 * 验证姓名,当验证婴儿时，isInfant为7，否则为0
 * @returns {Boolean}
 */
function checkName(name,isInfant,obj){
	if(name==""){
		Dialog.alert("旅客姓名不能为空！",function(){objFocus(obj);});
		return false;
	}
	//英文正则
	var englishReg = /^[a-zA-Z]{0,}\s?[a-zA-Z]{2,}(\/?)[a-zA-Z]+(\s?[a-zA-Z]\s?)+$/;//长度不大于40
	if(englishReg.test(name) && twosapcereg.test(name)){
		if((name.length+isInfant)>40){
			Dialog.alert("姓名输入格式错误，请重新输入！",function(){objFocus(obj);});
			return false;
		}
		if((name.length+isInfant)<=40){
			return true;
		}
	}
	//匹配中文
	var reg = /^[\u4e00-\u9fa5]+$/;
	if(reg.test(name)){
		var pinyin = codefans_net_CC2PY(name);
		var length = name.length*2+pinyin.length+4+isInfant;
		if(length>55){
			Dialog.alert("姓名输入格式错误，请重新输入！",function(){objFocus(obj);});
			return false;
		}
		if(length<=55){
			
			return true;
		}
	}
	//匹配非中文
	var noCn = /[^\u4e00-\u9fa5]/g;
	//中英文正则
	var cnenReg = /^[\u4e00-\u9fa5]{0,}\s?([a-zA-Z]+\s?){0,}/;
	if(cnenReg.test(name) && twosapcereg.test(name)){
		var cn = name.replace(noCn,'');
		var pinyin = codefans_net_CC2PY(cn);
		var length = cn.length+name.length+pinyin.length+4+isInfant;
		if(length>55){
			Dialog.alert("姓名输入格式错误，请重新输入！",function(){objFocus(obj);});
			return false;
		}
		if(length<=55){
			return true;
		}
	}
	Dialog.alert("姓名输入格式错误，请重新输入！",function(){objFocus(obj);});
	return false;
}
/***
 * 验证联系人信息
 * @returns {Boolean}
 */
function checkLinkManMsg(){
	var linkName = $("#linkManName").val();
	if(linkName.length == 0){
		
		Dialog.alert("联系人姓名不能为空！",function(){objFocus(document.getElementById("linkManName"));});
		return false;
	}
	if(linkName.length>40){
		
		Dialog.alert("联系人姓名长度不能大于40！",function(){objFocus(document.getElementById("linkManName"));});
		return false;
	}
	var cnnameReg = /^[\u4e00-\u9fa5A-Za-z\/\s?]+$/;
	if(!cnnameReg.test(linkName)){
		Dialog.alert("联系人姓名输入有误！",function(){objFocus(document.getElementById("linkManName"));});
		return false;
	}
	if(!twosapcereg.test(linkName)){
		Dialog.alert("联系人姓名输入有误！",function(){objFocus(document.getElementById("linkManName"));});
		return false;
	}
	reg = /^1[3,4,5,6,7,8,9]\d{9}$/;
	reg2 = /^\d{3,4}-?\d{7,8}$/;
	if(!reg.test($("#linkManNamePhone").val())){
		
		Dialog.alert("输入手机号码错误！",function(){objFocus(document.getElementById("linkManNamePhone"));});
		return false;
	}
	if($("#linkManNamebackPhone").val()!=""){
		if(!reg.test($("#linkManNamebackPhone").val())&&!reg2.test($("#linkManNamebackPhone").val())){
				
			Dialog.alert("联系人备用电话不合法！",function(){objFocus(document.getElementById("linkManNamebackPhone"));});
			return false;
		}
		if($("#linkManNamebackPhone").val() == $("#linkManNamePhone").val()){
			Dialog.alert("手机号和备用电话不能相同！",function(){objFocus(document.getElementById("linkManNamebackPhone"));});
			return false;
		}
	}
	return true;
}

/**
 * 验证出生日期与年龄的合法性
 * @param birthday
 * @returns {String}
 */
function getRightAge(birthday){
	var minDate = new Date($("#firstFlightDate").val().replace("-", "/").replace("-", "/"));
	var msg = '';
	birthday = birthday.replace("-", "/").replace("-", "/");
	var birth = new Date(birthday);
	var age = (minDate.getTime() - birth.getTime())/(1000 * 60 * 60 * 24 * 365);
	if(age>=12) msg = "ADULT";
	if(age>=2 && age<=12) msg = "CHILD";
	
	if(age<2){
		if(((minDate.getTime() - birth.getTime())/(1000 * 60 * 60*24))<14){
			
			msg = "ERROR";
		}else{
			msg = "INFANT";
		}
	}
	return msg;
}

/***
 * 验证大客户号
 * @param code
 */
function checkBigcustomerCode(code,obj){
	var reg = /^[a-zA-Z]{0,3}\d{7}$/;
	if(!reg.test(code)){
		
		Dialog.alert("大客户号为0-3位字母加7位有效数字，请重新输入，",function(){objFocus(obj);});
		return false;
	}
	return true ;
}
/***
 * 因私普通护照号码格式有:14/15+7位数,G+8位数因公普通的是:P.+7位数；公务的是：S.+7位数 或者 S+8位数,以D开头的是外交护照
 * 验证护照
 * @returns {Boolean}
 */
function checkPassCard(code,obj){
	//var reg = /^(P\d{7}|G\d{8}|S\d{7,8}|D\d+|1[4,5]\d{7})$/;
	var reg = /^[\w\d]{2,18}$/;
	if(!reg.test(code)){
		//Dialog.alert("护照格式不正确：14/15+7位数或G+8位数或P+7至8位数或S+7至8位数 或者 S+7至8位数或D+至少1位数字，请重新输入！",function(){objFocus(obj);});
		Dialog.alert("护照格式不正确：字母、数字组合长度2-18，请重新输入！",function(){objFocus(obj);});
		return false;
	}
	return true;
}

/***
 * 验证身份证
 * @param code
 * @returns
 */
function checksId(code,obj){ 
	if(!idCardValidate(code)){
		hideLoadingMask();
		Dialog.alert("身份证输入有误，请重新输入！",function(){objFocus(obj);});
		return false;
	}
	return true;
}
/***
 * 验证金鹏卡
 * @param code
 * @returns {Boolean}
 */
function kingPCard(code,obj){
	if(code.indexOf("HU")<0){
		code = "HU"+code;
		$(obj).val(code);
	}
	var reg = /^HU\d{10}$/;
	if(!reg.test(code)){
		
		Dialog.alert("金鹏卡卡号输入有误，由HU+10位数字，请重新输入！",function(){objFocus(obj);});
		return false;
	}
	return true;
}
/***
 * 验证新金鹿卡
 * @param code
 * @returns {Boolean}
 */
function kingLCard(code,obj){
	if(code.indexOf("CCCC")<0){
		code = "CCCC"+code;
		$(obj).val(code);
	}
	var reg = /^CCCC\d{8}$/;
	if(!reg.test(code)){
		Dialog.alert("新金鹿卡卡号输入有误，由CCCC+8位数字，请重新输入！",function(){objFocus(obj);});
		return false;
	}
	return true;
}
/***
 * 验证新金鹿卡
 * @param code
 * @returns {Boolean}
 */
function kingLCardO(code,obj){
	if(code.indexOf("AAAA")<0){
		code = "AAAA"+code;
		$(obj).val(code);
	}
	var reg = /^AAAA\d{5}$/;
	if(!reg.test(code)){
		Dialog.alert("旧金鹿卡卡号输入有误，由AAAA+5位数字，请重新输入！",function(){objFocus(obj);});
		return false;
	}
	return true;
}

// addpart part
function addAdult(json){
	
	var credTypeOption ="<option value='0'>请选择</option>";
	var memberTypeOption ="<option value=''>请选择</option>";
	for(var j = 0;j<customerIdType.length;j++){
		
		credTypeOption +="<option value="+customerIdType[j].code+">"+customerIdType[j].name+"</option>";
	}
	for(var k = 0;k<memberType.length;k++){
		memberTypeOption +="<option value="+memberType[k].code+">"+memberType[k].name+"</option>";
	}
	
	var i =createUUID();
	var $id = $("#adultTable");
	if(json == null){
		var bigCustCode = "";
		var fareType = $("#fareType").val();
		if(fareType == 2){
			bigCustCode = $("#bigCoustomerCode").val();
		}
		var inMsg = "<div id='travellerTD_"+i+"'><div class=\"hr-10\"></div><div class=\"tit3-green\">"
		+"<span><label class='travellerIndex'></label>旅客类型：</span><form class=\"label1-st\">"
		+"<label  style=\"width:100px;\"  class=\"hover\"><input type=\"radio\" checked=\"checked\"  disabled/>&nbsp;成人</label>"
		+"<label></label>"
		+"<label></label>"
		+"</form><div class=\"notbabydelete\" onclick=\"deletethis(this.id,'"+i+"','-1')\" id=\"adult_deletethis"+i+"\" ><a class=\"Btn-cl\"><strong>删除旅客</strong></a>"
		+"</div></div><div class=\"tab7-st normal-input-st\" id=\"con_pop_1\">"
		+"<table border=\"0\" cellspacing=\"0\" cellpadding=\"0\">"
		
		+"<tr><td width=\"110\" class=\"tab-bg-gr ri\">旅客姓名：</td>"
		+"<td class=\"le\"><input type=\"hidden\" name=\"salesTraveller["+i+"].travellerType\" id=\"travellerType"+i+"\" value=0 /><input type=\"hidden\" name=\"salesTraveller["+i+"].pageId\" value='"+i+"' />"
		+"<input type=\"hidden\" name=\"salesTraveller["+i+"].vpOrCP\" id='vpOrCP"+i+"' value='' />"
		+"<input type=\"hidden\" name=\"salesTraveller["+i+"].pIndexOfPnr\" id='pIndexOfPnr"+i+"' value=0 />"
		+"<input name=\"salesTraveller["+i+"].cnFullName\" type=\"text\" id=\"salesTravellerCN_"+i+"\" al = 'adultName' index='"+i+"' onchange = 'setParentName()' /><span class=\"FRed deleteFred\">*</span></td>"
		
		+"<td width=\"110\" class=\"tab-bg-gr ri\">大客户号：</td>"
		+"<td class=\"le\"><input type=\"text\" name=\"salesTraveller["+i+"].customerCode\" size=\"15\" id='customerCode_"+i+"' bigCode='bigCode' value='"+bigCustCode+"' /></td>"
		
		+"<td width=\"110\" class=\"tab-bg-gr ri\">出生日期：</td>"
		+"<td class=\"le\"><input type=\"text\" birthDate = 'adultBirthDate'  name=\"salesTraveller["+i+"].birthDate\" class=\"datepicker\" id=\"birthDate_"+i+"\" readonly = \"readonly\"/></td></tr>"
		+"<tr><td class=\"tab-bg-gr ri\">证件类型：</td><td class=\"le\"><select style='width:156px;'  index=\""+i+"\" id=\"credType_"+i+"\" name=\"salesTraveller["+i+"].credType\" credType = 'credType' >"+credTypeOption+"</select><font color=\"red\">*</font></td>"
		+"<td class=\"tab-bg-gr ri\">会员类别：</td>"
		+"<td colspan=\"3\" class=\"le\"><select style='width:156px;' name=\"salesTraveller["+i+"].memberCardType\" id=\"memberCardType_"+i+"\" memberType='memberType' >"+memberTypeOption+"</select></td>"
		+"</tr>"
		
		
		+"<tr><td class=\"tab-bg-gr ri\">证件号：</td>"
		+"<td class=\"le\"><input type=\"text\" name=\"salesTraveller["+i+"].credCode\" onblur=\"setBirthByNI('"+i+"')\" id=\"credCode_"+i+"\" index=\""+i+"\" credCode = 'credCode'  maxlength='30' /><font color=\"red\">*</font>&nbsp;&nbsp;&nbsp;<a href=\"javascript:getCustomerMsgByCred('"+i+"',0)\" class=\"Btn Btn-blue\"><span>提取客户</span></a></td>"
		+"<td class=\"tab-bg-gr ri\">会员卡号：</td>"
		+"<td colspan=\"3\" class=\"le\"><input type=\"text\" name=\"salesTraveller["+i+"].memberCardCode\" id=\"memberCardCode_"+i+"\" memberCode='memberCode' />&nbsp;&nbsp;&nbsp;<a href=\"javascript:getCustomerMsgByCred('"+i+"',1)\" class=\"Btn Btn-blue\"><span>提取客户</span></a></td>"
		+"</tr>" 
		
		+"</table></div></div>";
		$id.append(inMsg);
		
	}else {
		var index = -1;
		if(json[0].index != null && json[0].index!=""){
			
			index = json[0].index;
		}
		if(json[0].chFullName==null){
			json[0].chFullName="";
			}
		
		var fareType = $("#fareType").val();
		if(fareType == 2){
			json[0].bigCustCode = $("#bigCoustomerCode").val();
		}
		if(json[0].bigCustCode == null){
			json[0].bigCustCode = "";
		}
		if(json[0].birthDate==null){
			json[0].birthDate="";
		}
		if(json[0].credType=="NI"){
			json[0].credType=1;
		}if(json[0].credType=="PP"){
			json[0].credType=2;
		}if(json[0].credType=="OTHER"){
			json[0].credType=3;
		}
		if(json[0].credCode==null){
			json[0].credCode="";
		}
		if(json[0].memberCardCode==null){
			json[0].memberCardCode="";
		}
		var inMsg = "<div id='travellerTD_"+i+"'><div class=\"hr-10\"></div><div class=\"tit3-green\">"
			+"<span><label class='travellerIndex'></label>旅客类型：</span><form class=\"label1-st\">"
			+"<label style=\"width:100px;\" class=\"hover\"><input type=\"radio\" checked=\"checked\" disabled/>&nbsp;成人</label>"
			+"</form><div class=\"notbabydelete\" onclick=\"deletethis(this.id,'"+i+"','"+index+"')\" id=\"adult_deletethis"+i+"\"><a class=\"Btn-cl\"><strong>删除旅客</strong></a>"
			+"</div></div><div class=\"tab7-st normal-input-st\" id=\"con_pop_1\"><input type=\"hidden\" name = \"travellerId\" value=\"\"/>"
			+"<table border=\"0\" cellspacing=\"0\" cellpadding=\"0\">"
			+"<tr><td width=\"110\" class=\"tab-bg-gr ri\">旅客姓名：</td>"
			+"<td class=\"le\">"
			+"<input type=\"hidden\" name=\"salesTraveller["+i+"].travellerType\" id=\"travellerType"+i+"\" tocheck = 'check' value=0 />"
			+"<input type=\"hidden\" name=\"salesTraveller["+i+"].pageId\" value='"+i+"' />"
			+"<input type=\"hidden\" name=\"salesTraveller["+i+"].vpOrCP\" id='vpOrCP"+i+"' value='' />"
			+"<input type=\"hidden\" name=\"salesTraveller["+i+"].pIndexOfPnr\" id='pIndexOfPnr"+i+"' value=0 />"
			+"<input onchange = 'setParentName()' name=\"salesTraveller["+i+"].cnFullName\" index='"+i+"' type=\"text\" al = 'adultName' id=\"salesTravellerCN_"+i+"\" value=\""+json[0].chFullName+"\"/><span class=\"FRed deleteFred\">*</span></td>"
			+"<td width=\"110\" class=\"tab-bg-gr ri\">大客户号：</td>"
			+"<td class=\"le\"><input type=\"text\" name=\"salesTraveller["+i+"].customerCode\" id='customerCode_"+i+"' bigCode='bigCode' size=\"15\" value=\""+json[0].bigCustCode+"\" /></td>"
			+"<td width=\"110\" class=\"tab-bg-gr ri\">出生日期：</td>"
			+"<td class=\"le\"><input type=\"text\" birthDate = 'adultBirthDate' readonly=\"readonly\"  readonly=\"readonly\" value='"+json[0].birthDate+"' name=\"salesTraveller["+i+"].birthDate\" class=\"datepicker\" id=\"birthDate_"+i+"\" /></td>"
			+"</tr>" 
			+"<tr><td class=\"tab-bg-gr ri\">证件类型：</td><td class=\"le\"><select name=\"salesTraveller["+i+"].credType\" style='width:156px;' index=\""+i+"\" id=\"credType_"+i+"\" credType = 'credType' >"+credTypeOption+"</select><font color=\"red\">*</font></td>"
			+"<td class=\"tab-bg-gr ri\">会员类别：</td>"
			+"<td colspan=\"3\" class=\"le\"><select style='width:156px;' memberType='memberType' id=\"memberCardType_"+i+"\"  name=\"salesTraveller["+i+"].memberCardType\">"+memberTypeOption+"</select></td>"
			+"</tr>" 
			+"<tr><td class=\"tab-bg-gr ri\">证件号：</td>"
			+"<td class=\"le\"><input   type=\"text\" name=\"salesTraveller["+i+"].credCode\" maxlength='30' onblur=\"setBirthByNI('"+i+"')\" value='"+json[0].credCode+"' id=\"credCode_"+i+"\" index=\""+i+"\" credCode = 'credCode' /><span class=\"FRed\">*</span>&nbsp;&nbsp;&nbsp;<a href=\"javascript:getCustomerMsgByCred('"+i+"',0)\"  class=\"Btn Btn-blue\"><span>提取客户</span></a></td>"
			+"<td class=\"tab-bg-gr ri\">会员卡号：</td>"
			+"<td colspan=\"3\" class=\"le\"><input type=\"text\" name=\"salesTraveller["+i+"].memberCardCode\" id=\"memberCardCode_"+i+"\"  memberCode='memberCode' value='"+json[0].memberCardCode.toUpperCase()+"' />&nbsp;&nbsp;&nbsp;<a href=\"javascript:getCustomerMsgByCred('"+i+"',1)\" class=\"Btn Btn-blue\"><span>提取客户</span></a></td>"
			+"</tr></table></div></div>";
		$id.append(inMsg);
		$("#memberCardType_"+i).val(json[0].memberCardType);
		$("#credType_"+i).val(json[0].credType);
		setBirthByNI(i);
	}
	adultCountInPage++;
	memberCodeToUpperCase();
	setParentName();
}
function addChild(json){
	var credTypeOption ="<option value=\"0\">请选择</option>";
	for(var j = 0;j<customerIdType.length;j++){
		credTypeOption +="<option value='"+customerIdType[j].code+"'>"+customerIdType[j].name+"</option>";
	}
	var i = createUUID();
	var $id = $("#childTable");
	if(json==null){
		var inMsg = "<div id='travellerTD_"+i+"'><div class=\"hr-10\"></div><div class=\"tit3-green\">"
			+"<span><label class='travellerIndex'></label>旅客类型：</span><form class=\"label1-st\">"
			+"<label style=\"width:100px;\" class=\"hover\"><input type=\"radio\" disabled checked=\"checked\" />&nbsp;儿童</label>"
			+"</form><div class=\"notbabydelete\" onclick=\"deletethis(this.id,'"+i+"','-1')\" id=\"child_deletethis"+i+"\"><a  class=\"Btn-cl\"><strong>删除旅客</strong></a>"
			+"</div></div><div class=\"tab7-st normal-input-st\" id=\"con_pop_1\">"
			+"<table border=\"0\" cellspacing=\"0\" cellpadding=\"0\"><tr><td width=\"110\" class=\"tab-bg-gr ri\">旅客姓名：</td>"
			+"<td class=\"le\"><input type=\"hidden\" name=\"salesTraveller["+i+"].travellerType\" id=\"travellerType"+i+"\" value=1 />"
			+"<input type=\"hidden\" name=\"salesTraveller["+i+"].pageId\" value='"+i+"' />"
			+"<input type=\"hidden\" name=\"salesTraveller["+i+"].pIndexOfPnr\" id='pIndexOfPnr"+i+"' value=0 />"
			+"<input name=\"salesTraveller["+i+"].cnFullName\" al = 'childName' index='"+i+"' type=\"text\" id=\"salesTravellerCN_"+i+"\" /><span class=\"FRed deleteFred\">*</span></td>"
			+"<td width=\"110\" class=\"tab-bg-gr ri\">证件类型：</td>"
			+"<td class=\"le\"><select style='width:156px;' name=\"salesTraveller["+i+"].credType\"   id='credType_"+i+"' index=\""+i+"\" credType = 'credType' > "+credTypeOption+"</select></td>"
			+"<td width=\"110\" class=\"tab-bg-gr ri\">证件号：</td>"
			+"<td class=\"le\"><input type=\"text\" name=\"salesTraveller["+i+"].credCode\" onblur=\"setBirthByNI('"+i+"')\" maxlength='30' id='credCode_"+i+"' index=\""+i+"\" credCode = 'credCode' />&nbsp;&nbsp;&nbsp;&nbsp;</td>"
			+"</tr><tr><td class=\"tab-bg-gr ri\">出生日期：</td><td class=\"le\" colspan=\"3\"><input type=\"text\" childBirthDate = 'childBirthDate' name=\"salesTraveller["+i+"].birthDate\" class=\"datepicker\"  id='birthDate_"+i+"'  readonly = \"readonly\"/><span class=\"FRed deleteFred\">*</span></td>"
			+"</tr></table></div></div>";
		$id.append(inMsg);
	}else {
		var index = -1;
		if(json[0].index != null && json[0].index!=""){
			
			index = json[0].index;
		}
		if(json[0].chFullName==null){
			json[0].chFullName="";
		}
		if(json[0].birthDate==null){
			json[0].birthDate="";
		}
		if(json[0].credType=="NI"){
			json[0].credType=1;
		}if(json[0].credType=="PP"){
			json[0].credType=2;
		}if(json[0].credType=="OTHER"){
			json[0].credType=3;
		}
		if(json[0].credCode==null){
			json[0].credCode="";
		}
		var inMsg = "<div id='travellerTD_"+i+"'><div class=\"hr-10\"></div><div class=\"tit3-green\">"
			+"<span><label class='travellerIndex'></label>旅客类型：</span><form class=\"label1-st\">"
			+"<label style=\"width:100px;\" class=\"hover\"><input type=\"radio\" disabled checked=\"checked\" />&nbsp;儿童</label>"
			+"</form><div class=\"notbabydelete\" onclick=\"deletethis(this.id,'"+i+"','"+index+"')\" id=\"child_deletethis"+i+"\"><a  class=\"Btn-cl\"><strong>删除旅客</strong></a>"
			+"</div></div><div class=\"tab7-st normal-input-st\" id=\"con_pop_1\"><input type=\"hidden\" name = \"travellerId\" />"
			+"<table border=\"0\" cellspacing=\"0\" cellpadding=\"0\"><tr><td width=\"110\" class=\"tab-bg-gr ri\">旅客姓名：</td>"
			+"<td class=\"le\"><input type=\"hidden\" name=\"salesTraveller["+i+"].travellerType\" id=\"travellerType"+i+"\"  value=1  />"
			+"<input type=\"hidden\" name=\"salesTraveller["+i+"].pageId\" value='"+i+"' />" 
			+"<input type=\"hidden\" name=\"salesTraveller["+i+"].pIndexOfPnr\" id='pIndexOfPnr"+i+"' value=0 />"
			+"<input name=\"salesTraveller["+i+"].cnFullName\" type=\"text\" id=\"salesTravellerCN_"+i+"\" al = 'childName' index='"+i+"' value=\""+json[0].chFullName+"\"/><span class=\"FRed deleteFred\">*</span></td>"
			+"<td width=\"110\" class=\"tab-bg-gr ri\">证件类型：</td>"
			+"<td class=\"le\"><select style='width:156px;' name=\"salesTraveller["+i+"].credType\" id='credType_"+i+"' index=\""+i+"\" credType = 'credType' >"+credTypeOption+"</select></td>"
			+"<td width=\"110\" class=\"tab-bg-gr ri\">证件号：</td>"
			+"<td class=\"le\"><input type=\"text\" name=\"salesTraveller["+i+"].credCode\" id='credCode_"+i+"' onblur=\"setBirthByNI('"+i+"')\" credCode = 'credCode' index=\""+i+"\" value=\""+json[0].credCode+"\"/>&nbsp;&nbsp;&nbsp;&nbsp;</td>"
			+"</tr><tr><td class=\"tab-bg-gr ri\">出生日期：</td><td class=\"le\" colspan=\"3\"><input value='"+json[0].birthDate+"' id='birthDate_"+i+"' type=\"text\" readonly name=\"salesTraveller["+i+"].birthDate\" childBirthDate = 'childBirthDate' class=\"datepicker\" /><span class=\"FRed deleteFred\">*</span></td>"
			+"</tr></table></div></div>";

		$id.append(inMsg);
		$("#credType_"+i).val(json[0].credType);
		setBirthByNI(i);
	}
	childCountInPage++;
	
}
function addBaby(json){
	
	var i = createUUID();
	var $babyid = $("#babyTable");
	if(json== null){
		var inMsg = "<div id='travellerTD_"+i+"'><div class=\"hr-10\"></div><div><div class=\"tit3-green\"><span><label class='travellerIndex'></label>旅客类型：</span>"
                +"<form class=\"label1-st\"><label style=\"width:100px;\" class=\"hover\"><input type=\"radio\"  checked=\"checked\" disabled />&nbsp;婴儿</label>"
                +"</form> <div class=\"fr babydelete\" onclick=\"deletethis(this.id,'"+i+"','-1')\" id=\"baby_deletethis"+i+"\"><a class=\"Btn-cl\"><strong>删除旅客</strong></a></div></div>"
                +"<div class=\"tab7-st normal-input-st\" id=\"con_pop_3\">"
                +"<table border=\"0\" cellspacing=\"0\" cellpadding=\"0\">"
                +"<tr><td width=\"110\" class=\"tab-bg-gr ri\">旅客姓名：</td>"
                +"<td class=\"le\"><input type=\"hidden\" tocheck = 'check' name=\"salesTraveller["+i+"].travellerType\" id=\"travellerType"+i+"\"  value=2 />"
                +"<input type=\"hidden\" name=\"salesTraveller["+i+"].pageId\" value='"+i+"' />"
                +"<input type=\"hidden\" name=\"salesTraveller["+i+"].pIndexOfPnr\" id='pIndexOfPnr"+i+"' value=0 />"
                +"<input name=\"salesTraveller["+i+"].cnFullName\" style=\"width:150px;\" al = 'infantName' index='"+i+"'  type=\"text\" /><span class=\"FRed\">*</span></td>"
                +"<td class=\"tab-bg-gr ri\">出生日期：</td>"
                +"<td class=\"le\"><input type=\"text\" birthDate = 'infantBirthDate' readonly name=\"salesTraveller["+i+"].birthDate\"  size=\"15\" class=\"datepicker\" id=\"birthDate_"+i+"\"/>"
                +"&nbsp;<span class=\"FRed\">*</span></td><td width=\"110\" class=\"tab-bg-gr ri\">携带人姓名：</td>"
                +"<td class=\"le\"><select class=\"zh01\" babyParent='babyParent' name=\"salesTraveller["+i+"].parentName\" ></select>&nbsp;<span class=\"FRed\">*</span>&nbsp;&nbsp;&nbsp;</td>"
                +"</tr></table></div><div>";
		$babyid.append(inMsg);
	}else{
		var index = -1;
		if(json[0].index != null && json[0].index!=""){
			
			index = json[0].index;
		}
		if(json[0].chFullName==null){
			json[0].chFullName="";
		}
		if(json[0].birthDate==null){
			json[0].birthDate="";
		}
		var inMsg = "<div id='travellerTD_"+i+"'><div class=\"hr-10\"></div><div><div class=\"tit3-green\"><span><label class='travellerIndex'></label>旅客类型：</span>"
            +"<form class=\"label1-st\"><label style=\"width:100px;\" class=\"hover\"><input type=\"radio\"  checked=\"checked\" disabled />&nbsp;婴儿</label>"
            +"</form> <div class=\"fr babydelete\" onclick=\"deletethis(this.id,'"+i+"','"+index+"')\" id=\"baby_deletethis"+i+"\"><a class=\"Btn-cl\"><strong>删除旅客</strong></a></div></div>"
            +"<div class=\"tab7-st normal-input-st\" id=\"con_pop_3\"><input type=\"hidden\" name = \"travellerId\" value=\""+json[4]+"\"/>" 
            +"<table border=\"0\" cellspacing=\"0\" cellpadding=\"0\">"
            +"<tr><td width=\"110\" class=\"tab-bg-gr ri\">旅客姓名：</td>"
            +"<td class=\"le\"><input type=\"hidden\" name=\"salesTraveller["+i+"].pIndexOfPnr\" id='pIndexOfPnr"+i+"' value=0 /><input type=\"hidden\" tocheck = 'check' name=\"salesTraveller["+i+"].travellerType\" id=\"travellerType"+i+"\" value=2  /><input type=\"hidden\" name=\"salesTraveller["+i+"].pageId\" value='"+i+"' /><input name=\"salesTraveller["+i+"].cnFullName\" style=\"width:150px;\" type=\"text\" index='"+i+"' al = 'infantName' value=\""+json[0].chFullName+"\"/><span class=\"FRed\">*</span></td>"
            +"<td class=\"tab-bg-gr ri\">出生日期：</td>"
            +"<td class=\"le\"><input type=\"text\" value=\""+json[0].birthDate+"\" readonly=\"readOnly\"  birthDate = 'infantBirthDate' name=\"salesTraveller["+i+"].birthDate\"  size=\"15\" class=\"datepicker\" id=\"birthDate_"+i+"\" />"
            +"&nbsp;<span class=\"FRed\">*</span></td><td width=\"110\" class=\"tab-bg-gr ri\">携带人姓名：</td>"
            +"<td class=\"le\"><select class=\"zh01\" babyParent='babyParent' name=\"salesTraveller["+i+"].parentName\" ></select>&nbsp;<span class=\"FRed\">*</span>&nbsp;&nbsp;&nbsp;</td>"
            +"</tr></table></div><div>";
		$babyid.append(inMsg);
	}
	setParentName();
	babyCountInPage++;
	$("#salesTravellerCN_"+i).focus();
}
function memberCodeToUpperCase(){	
	var memberCodes = $("input[memberCode=memberCode]");
	if(memberCodes.length==0){return ;}
	$(memberCodes).each(function(){
		$(this).bind('blur',function(){
			$(this).attr("value",$(this).val().toUpperCase());
		});
	});
}
function setBirthByNI(i){
	var type = $("#credType_"+i).val();
	var idNum = $("#credCode_"+i).val();
	var birthDay = "";
	if(type==1){
		if(idNum==""){return ;}
		if(checksId(idNum,document.getElementById("credCode_"+i))){
			
			birthDay = getBirthDateBycode(idNum);
			$("#birthDate_"+i).attr("value",birthDay);
		}
	}
}
//根据code获取生日
function getBirthDateBycode(idNum){
	var birthDay = "";
	if(idNum.length == 18){
		birthDay =  idNum.substring(6, 10)+"-"+idNum.substring(10,12)+"-"+idNum.substring(12,14);
	}else if(idNum.length == 15){
		birthDay = "19"+idNum.substring(6, 8)+"-"+idNum.substring(8,10)+"-"+idNum.substring(10,12);
	}
	return birthDay;
}
function setParentName(){
	var adultName = $("input[al=adultName]");
	var length = adultName.length;
	var infantPname = $("select[babyParent=babyParent]");
	for(var i = 0;i<infantPname.length;i++){
		$(infantPname[i]).empty();
		for(var j = 0; j<length ; j++){
			var value = $.trim(adultName[j].value);
			if(value!=""){
				$(infantPname[i]).append("<option value='"+value+"' >"+value+"</option>");
			}
		}
	}
}
/***
 * 创建UUID
 * @returns {String}
 */
function createUUID() {
	var index = travellerIndex;
	travellerIndex++;
    return index;
};
function setUICmemberInfo(uicmember,i,mark){
	if(uicmember.bigCustomerCode!=null&&uicmember.bigCustomerCode!=""){
		$("#customerCode_"+i).attr("value",uicmember.bigCustomerCode);
	}
	var name="";
	if(uicmember.name!=null && uicmember.name!=""){
		name = uicmember.name;
	}else{
		name = (uicmember.firstname==null?"":uicmember.firstname)+(uicmember.lastname==null?"":uicmember.lastname);
	}
	$("#salesTravellerCN_"+i).attr("value",name);
	$("#birthDate_"+i).attr("value",uicmember.birthday);
	if(mark == 0){
		$("#memberCardType_"+i).attr("value","A");
		$("#memberCardCode_"+i).attr("value",uicmember.cid);
	}
	if(mark == 1){
		if(uicmember.idcardNo != null && uicmember.idcardNo!=""){
				$("#credCode_"+i).attr("value",uicmember.idcardNo);
				$("#credType_"+i).attr("value",1);
			}
		else if(uicmember.passportNo != null && uicmember.passportNo !=""){
				$("#credCode_"+i).attr("value",uicmember.passportNo);
				$("#credType_"+i).attr("value",2);
			}
		else if(uicmember.otherNo != null && uicmember.otherNo !=""){
				$("#credCode_"+i).attr("value",uicmember.otherNo);
				$("#credType_"+i).attr("value",3);
			}
	}
}
/***
 * 删除
 * @param id
 * @param i
 */
function deletethis(id,i,historyIndex){
	var flag = id.substr(0,id.indexOf("_"));
	if(flag == "adult"){
			if(adultCountInPage > 0){
				$("#travellerTD_"+i).empty();
				adultCountInPage--;
				setParentName();
			}
		}
	if(flag == "child"){
		if(childCountInPage > 0){
			$("#travellerTD_"+i).empty();
			childCountInPage--;
			}
		}
	
	if(flag == "baby"){
		if(babyCountInPage > 0){
			$("#travellerTD_"+i).empty();
			babyCountInPage--;
			}
		}
	if(historyIndex!="-1"){
		var  inputInfo_usualUser = $(".inputInfo_usualUser");
		var checkBox = $(inputInfo_usualUser[historyIndex]).find("input[type=checkbox]");
		var checked = $(checkBox).attr("checked");
		if(checked){
			$(checkBox).attr("checked", false);
			$(inputInfo_usualUser[historyIndex]).removeClass("boxBg1");
			$(inputInfo_usualUser[historyIndex]).css("background","#CCCCCC");
		}
	}
	var index  = $(".travellerIndex");
	for(var i = 0 ;i<index.length;i++){
		$(index[i]).html(i+1+"、");
	}
}
/**
 * 格式化时间
 * @param time
 * @returns {String}
 */
function formatTime(time){
	var hour = time.substr(0,2);
	var min = time.substr(2,time.length);
	return hour+":"+min;
}

function successPnrCreate(pnrReturnVO){
	$("#fareType").attr("value",pnrReturnVO.fareType);
	var listUseCondition = pnrReturnVO.cabinUseConditiones;
	for(var j = 0;j<listUseCondition.length;j++){
		var condition = listUseCondition[j];
		$("input[refundCondCondition=refundCondCondition"+j+"]").attr("value",condition.refundCondCondition);
		$("input[refundCondConditionDetail=refundCondConditionDetail"+j+"]").attr("value",condition.refundCondConditionDetail);
		$("input[changeCondContion=changeCondContion"+j+"]").attr("value",condition.changeCondContion);
		$("input[changeCondContionDetail=changeCondContionDetail"+j+"]").attr("value",condition.changeCondContionDetail);
		$("input[transferCondContion=transferCondContion"+j+"]").attr("value",condition.transferCondContion);
	}
	var list = pnrReturnVO.flightAllTypeFareVOes;
	$("#fareInfo").empty();
	$("#fareInfo").append(
			 "<input type=text name=adultEI value=\""+pnrReturnVO.adultEI+"\">"
			+"<input type=text name=adultFC value=\""+pnrReturnVO.adultFC+"\">"
			+"<input type=text name=adultFN value=\""+pnrReturnVO.adultFN+"\">"
			+"<input type=text name=adultFP value=\""+pnrReturnVO.adultFP+"\">"
			+"<input type=text name=childEI value=\""+pnrReturnVO.childEI+"\">"
			+"<input type=text name=childFC value=\""+pnrReturnVO.childFC+"\">"
			+"<input type=text name=childFN value=\""+pnrReturnVO.childFN+"\">"
			+"<input type=text name=childFP value=\""+pnrReturnVO.childFP+"\">"
			+"<input type=text name=infantEI value=\""+pnrReturnVO.infantEI+"\">"
			+"<input type=text name=infantFC value=\""+pnrReturnVO.infantFC+"\">"
			+"<input type=text name=infantFN value=\""+pnrReturnVO.infantFN+"\">"
			+"<input type=text name=infantFP value=\""+pnrReturnVO.infantFP+"\">"
			+"<input type=text name=adultTotalTicketPrice value=\""+pnrReturnVO.adultTotalTicketPrice+"\">"
			+"<input type=text name=childTotalTicketPrice value=\""+pnrReturnVO.childTotalTicketPrice+"\">"
			+"<input type=text name=infantsTotalTicketPrice value=\""+pnrReturnVO.infantsTotalTicketPrice+"\">"
			+"<input type=text name=adultTotalCN value=\""+pnrReturnVO.adultTotalCN+"\">"
			+"<input type=text name=adultTotalYQ value=\""+pnrReturnVO.adultTotalYQ+"\">"
			+"<input type=text name=childTotalYQ value=\""+pnrReturnVO.childTotalYQ+"\">"
			+"<input type=text name=totalTicketPrice value=\""+pnrReturnVO.totalTicketPrice+"\">"
			+"<input type=text name=totalCN value=\""+pnrReturnVO.totalCN+"\">"
			+"<input type=text name=totalYQ value=\""+pnrReturnVO.totalYQ+"\">"
			);
	for(var i =0 ;i<list.length;i++){
		$("#fareInfo").append(
				 "<input type=\"text\" name=flightAllTypeFareVOes["+i+"].adultTicketFare value = \""+list[i].adultTicketFare+"\">"
				+"<input type=\"text\" name=flightAllTypeFareVOes["+i+"].adultFareLevel value=\""+list[i].adultFareLevel+"\">"
				+"<input type=\"text\" name=flightAllTypeFareVOes["+i+"].adultCN value=\""+list[i].adultCN+"\">"
				+"<input type=\"text\" name=flightAllTypeFareVOes["+i+"].adultYQ value=\""+list[i].adultYQ+"\">"
				+"<input type=\"text\" name=flightAllTypeFareVOes["+i+"].adultUseCondition value=\""+list[i].adultUseCondition+"\">"
				+"<input type=\"text\" name=flightAllTypeFareVOes["+i+"].childUseCondition value=\""+list[i].childUseCondition+"\">"
				+"<input type=\"text\" name=flightAllTypeFareVOes["+i+"].childTicketFare value=\""+list[i].childTicketFare+"\" >"
				+"<input type=\"text\" name=flightAllTypeFareVOes["+i+"].childFareLevel value=\""+list[i].childFareLevel+"\">"
				+"<input type=\"text\" name=flightAllTypeFareVOes["+i+"].childCN value=\""+list[i].childCN+"\">"
				+"<input type=\"text\" name=flightAllTypeFareVOes["+i+"].childYQ value=\""+list[i].childYQ+"\">"
				
				+"<input type=\"text\" name=flightAllTypeFareVOes["+i+"].infantsTicketFare value=\""+list[i].infantsTicketFare+"\">"
				+"<input type=\"text\" name=flightAllTypeFareVOes["+i+"].infantsFareLevel value=\""+list[i].infantsFareLevel+"\">"
				+"<input type=\"text\" name=flightAllTypeFareVOes["+i+"].infantsCN value=\""+list[i].infantsCN+"\">"
				+"<input type=\"text\" name=flightAllTypeFareVOes["+i+"].infantsYQ value=\""+list[i].infantsYQ+"\">"
				);
	}
	if(pnrReturnVO.travellerInfoes!=null&&pnrReturnVO.travellerInfoes.length>0){
		importantInfo(pnrReturnVO.travellerInfoes);
	}
	$("#pnr").attr("value",pnrReturnVO.pnr);
	$("#form").submit();
}
function importantInfo(data){
	var names = $("input[al $=Name]");
	for(var i = 0;i<data.length;i++){
		var name = data[i].name;
		for(var j =0;j<names.length;j++){
			if(name==names[j].value.toUpperCase()){
				var index = $(names[j]).attr("index");
				if(data[i].vpOrCP!=null){
					$("#vpOrCP"+index).attr("value",data[i].vpOrCP);
				}
				if(data[i].memberCardType!=null && data[i].memberCardCode!=null && $("#memberCardType_"+index).val() == "" && $("#memberCardType_"+index).val() == ""){
					
					if(data[i].memberCardType=="JPK"){
						$("#memberCardType_"+index).val("A");
					}else{
						$("#memberCardType_"+index).val("B");
					}
					$("#memberCardCode_"+index).attr("value",data[i].memberCardCode);
				}
				$("#pIndexOfPnr"+index).attr("value",data[i].seq);
			}
		}
	}
}