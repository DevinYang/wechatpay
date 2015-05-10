var passengerAll = new Map();//所有旅客

var adultPassengers = new Map();//携带人
var childPassengers = new Map();
var infantPassengers = new Map();

var adultNum = 0;
var childNum = 0;
var infantNum = 0;

$(document).ready(function(){
	setPassengerNum();
	$("input[name=travelleries]").click(function(){
		var travellerType = $(this).attr("travellerType");
			var index = $(this).attr("index");
			var cid = $("#cid").val();
			var cnName = $("#cnName"+index).val();
			var birthday = $("#birthday"+index).val();
			var idcardNo = $("#idcardNo"+index).val();
			var passpordNo = $("#passpordNo"+index).val();
			var otherNo = $("#otherNo0").val();
			var idcardNoParam = dealCardNo(idcardNo,birthday);
			
			if(this.checked == true){
				if(checkTraveller(travellerType)){
					
					var freeOrder = $("#form").serialize();
					var url =basePath+"/free-order/"+cid+"/"+cnName.replace("/","@")+"/"+idcardNoParam+"/getReduceNo";
					$.post(url,freeOrder,function(json){
						if(json != null && json != ""){
							var reduceMileage = Number(json.reduceMileage);
							var reduceNo = json.reduceNo;
							var realreduce = dealRealreduce(reduceMileage);
							var ticketPrice = 0;
							if(reduceMileage != realreduce){
								ticketPrice = dealTicketpricve(Number(availableMileage)-reduceMileage);
							}
							availableMileage = Number(availableMileage)-reduceMileage>0 ? Number(availableMileage)-reduceMileage:0;
							
							var params = { 
										   "cid":cid,
										   "cnName":cnName,
										   "birthday":birthday,
										   "idcardNo":idcardNo,
										   "passpordNo":passpordNo,
										   "otherNo":otherNo,
										   "reduceMileage":reduceMileage,
										   "realreduce":realreduce,
										   "ticketPrice":ticketPrice,
										   "reduceNo":reduceNo,
										   "travellerType":travellerType,
										   "index":index
									  	};
							addPassengers(params);
							appendTravellers();
						}else{
							Dialog.alert("网络延迟，请重试！");
						}
					});
				}else{
					return false;
				}
			}
			
			if(this.checked == false){
				if(isNotParent(cnName)){
					removeAdultPassengers(index);
					removeChildPassengers(index);
					removeInfantPassengers(index);
					removePassenger(index);
					appendTravellers();
				}else{
					alert("请先删除携带婴儿！");
					return false;
				}
			}
		
	});
});

function dealCardNo(cardId,birthday){
	
	if(cardId == ""){
		if(birthday == ""){
			Dialog.alert("您选择的旅客证件为空，且生日也为空！");
			return false;
		}else{
			var newCard = birthday.split("-")[0]+birthday.split("-")[1]+birthday.split("-")[2].substring(0,2);
			return newCard ; 
		}
	}
	return cardId;
}
function checkTraveller(travellerType){
	if(travellerType==2) {
		if(adultPassengers.size()<infantPassengers.size){
			Dialog.alert("携带人不能为空！请先选择成人旅客！");
			return false;
		}
	}
	
	var adultNumTmp = $(".travellerType_0").length;
	var childNumTmp = $(".travellerType_1").length;
	var infantNumTmp = $(".travellerType_2").length;
	
	if(adultNumTmp == adultNum){
		if(travellerType == 0 || travellerType == -1){
			Dialog.alert("可选成人超数！");
			return false;
		}
	}
	if(childNumTmp == childNum){
		if(travellerType == 1){
			Dialog.alert("可选儿童超数！");
			return false;
		}
	}
	if(infantNumTmp == infantNum){
		if(travellerType == 2){
			Dialog.alert("可选婴儿超数！");
			return false;
		}
	}
	return true;
}
function setPassengerNum(){
	adultNum = $("#getACount").val();
	childNum = $("#getCCount").val();
	infantNum = $("#getBCount").val();
}

//function checkPassengerNum(){
//	if(adultPassengers.size()>parseInt($("#getACount").val())){
//		return false;
//	}
//	if(childPassengers.size()>parseInt($("#getCCount").val())){
//		return false;
//	}
//	if(infantPassengers.size()>parseInt($("#getBCount").val())){
//		return false;
//	}
//	return true;
//}

function isNotParent(name){
	var isParent = true;
	$("select[class^=parentNames_]").each(function(){
		if(name == $(this).val()){
			isParent = false;
		}
	});
	return isParent;
}

function addPassengers(params){
	
	passengerAll.put("traveller_"+params.index,params);
	
	if(params.travellerType==0||params.travellerType==-1) {
		adultPassengers.put("adultPassengers_"+params.index, params);
	}
	if(params.travellerType==1) {
		childPassengers.put("childPassengers_"+params.index, params);
	}
	if(params.travellerType==2) {
		infantPassengers.put("infantPassengers_"+params.index, params);
	}
	
}


function removePassenger(index){
	passengerAll.remove("traveller_"+index);
}
function removeAdultPassengers(index){
	if(adultPassengers.get("adultPassengers_"+index) != null){
		adultPassengers.remove("adultPassengers_"+index);
	}
}
function removeChildPassengers(index){
	if(childPassengers.get("childPassengers_"+index) != null){
		childPassengers.remove("childPassengers_"+index);
	}
}
function removeInfantPassengers(index){
	if(infantPassengers.get("infantPassengers_"+index) != null){
		infantPassengers.remove("infantPassengers_"+index);
	}
}

function appendTravellers(){
	
	$("#travelleries").empty();
	if(!passengerAll.isEmpty()){
		var keyArr = passengerAll.arr;
		for(var i=0;i<keyArr.length;i++){
			var passenger = passengerAll.get(keyArr[i].key);
			$("#travelleries").append("<div class=\"hr-10\"></div><div>");
			var travellerType = passenger.travellerType==-1?0:passenger.travellerType;
			if(travellerType == 0) {
				appendAdultInfo(i,passenger);
			}
			if(travellerType == 1) {
				appendChildInfo(i,passenger);
			}
			if(travellerType == 2){
				appendInfantInfo(i,passenger);
			} 
			$("#travelleries").append("</div>");
		}
	}
}

function appendAdultInfo(i,passenger){
	$("#travelleries").append(
			     getTravellerTypeHtml(i,passenger.travellerType)
			   +"<div class=\"tab7-st\" id=\"con_pop_1\">"
			   +"<input type=\"hidden\" name=\"salesTravellerDto["+(i)+"].travellerType\" class=\"travellerType_0\" value=\""+0+"\">"
			   +"<input type=\"hidden\" name=\"salesTravellerDto["+(i)+"].reduceMileage\" value=\""+passenger.reduceMileage+"\">"
			   +"<input type=\"hidden\" name=\"salesTravellerDto["+(i)+"].realreduce\" value=\""+passenger.realreduce+"\">"
			   +"<input type=\"hidden\" name=\"salesTravellerDto["+(i)+"].ticketPrice\" value=\""+passenger.ticketPrice+"\">"
			   +"<input type=\"hidden\" name=\"salesTravellerDto["+(i)+"].reduceNo\" value=\""+passenger.reduceNo+"\">"
			   +"<table border=\"0\" cellspacing=\"0\" cellpadding=\"0\">"
			   +"<tr>"
			   +"<td width=\"110\" class=\"tab-bg-gr ri\">旅客姓名：</td>"
			   +"<td class=\"le\">"
			   +"<input value=\""+passenger.cnName+"\" name=\"salesTravellerDto["+i+"].cnFullName\" readonly=\"readonly\" />&nbsp;&nbsp;<span class=\"FRed\">*</span>"
			   +"</td>"
			   +"<td width=\"110\" class=\"tab-bg-gr ri\">证件类型：</td>"
			   +"<td class=\"le\">"
			   +"<select name=\"salesTravellerDto["+(i)+"].credType\" id=\"noType_"+i+"\" onchange=\"paddingNo('"+i+"','"+passenger.idcardNo+"','"+passenger.passpordNo+"','"+passenger.otherNo+"')\" >"
			   +getcredTypeOptions(passenger.idcardNo,passenger.passpordNo,passenger.otherNo)
			   +"</select  >&nbsp;&nbsp;<span class=\"FRed\">*</span>"
			   +"</td>"
			   +"<td width=\"110\" class=\"tab-bg-gr ri\">证件号：</td>"
			   +"<td class=\"le\"><input id=\"No_"+i+"\" name=\"salesTravellerDto["+(i)+"].credCode\" value=\""+passenger.idcardNo+"\" readonly=\"readonly\" />&nbsp;<span class=\"FRed\">*</span>&nbsp;&nbsp;&nbsp;</td>"
			   +"</tr>"
			   +"<tr>"
			   +"<td class=\"tab-bg-gr ri\">出生日期：</td>"
			   +"<td class=\"le\"><input class=\"time\" name=\"salesTravellerDto["+(i)+"].birthDate\" value=\""+passenger.birthday+"\" readonly=\"readonly\" />"
			   +"&nbsp;<span class=\"FRed\">*</span></td>"
			   +"<td class=\"tab-bg-gr ri\">会员卡号：</td>"
			   +"<td colspan=\"3\" class=\"le\"><input name=\"salesTravellerDto["+(i)+"].memberCardCode\" value=\""+passenger.cid+"\" />&nbsp;<span class=\"FRed\">*</span>&nbsp;&nbsp;&nbsp;</td>"
			   +"</tr>"
			   +"</table>"
			   +"</div>"
			);
}
function appendChildInfo(i,passenger){
	$("#travelleries").append(
			     getTravellerTypeHtml(i,passenger.travellerType)
			   +"<div class=\"tab7-st\" id=\"con_pop_1\">"
			   +"<input type=\"hidden\" name=\"salesTravellerDto["+(i)+"].travellerType\" class=\"travellerType_1\" value=\""+1+"\">"
			   +"<input type=\"hidden\" name=\"salesTravellerDto["+(i)+"].reduceMileage\" value=\""+passenger.reduceMileage+"\">"
			   +"<input type=\"hidden\" name=\"salesTravellerDto["+(i)+"].realreduce\" value=\""+passenger.realreduce+"\">"
			   +"<input type=\"hidden\" name=\"salesTravellerDto["+(i)+"].ticketPrice\" value=\""+passenger.ticketPrice+"\">"
			   +"<input type=\"hidden\" name=\"salesTravellerDto["+(i)+"].reduceNo\" value=\""+passenger.reduceNo+"\">"
			   +"<table border=\"0\" cellspacing=\"0\" cellpadding=\"0\">"
			   +"<tr>"
			   +"<td width=\"110\" class=\"tab-bg-gr ri\">旅客姓名：</td>"
			   +"<td class=\"le\">"
			   +"<input value=\""+passenger.cnName+"\" name=\"salesTravellerDto["+i+"].cnFullName\" readonly=\"readonly\" />&nbsp;&nbsp;<span class=\"FRed\">*</span>"
			   +"</td>"
			   +"<td width=\"110\" class=\"tab-bg-gr ri\">证件类型：</td>"
			   +"<td class=\"le\">"
			   +"<select name=\"salesTravellerDto["+(i)+"].credType\" id=\"noType_"+i+"\" onchange=\"paddingNo('"+i+"','"+passenger.idcardNo+"','"+passenger.passpordNo+"','"+passenger.otherNo+"')\" >"
			   +getcredTypeOptions(passenger.idcardNo,passenger.passpordNo,passenger.otherNo)
			   +"</select  >&nbsp;&nbsp;<span class=\"FRed\">*</span>"
			   +"</td>"
			   +"<td width=\"110\" class=\"tab-bg-gr ri\">证件号：</td>"
			   +"<td class=\"le\"><input id=\"No_"+i+"\" name=\"salesTravellerDto["+(i)+"].credCode\" value=\""+passenger.idcardNo+"\" readonly=\"readonly\" />&nbsp;&nbsp;&nbsp;&nbsp;</td>"
			   +"</tr>"
			   +"<tr>"
			   +"<td class=\"tab-bg-gr ri\">出生日期：</td>"
			   +"<td class=\"le\"><input class=\"time\" name=\"salesTravellerDto["+(i)+"].birthDate\" value=\""+passenger.birthday+"\" readonly=\"readonly\" />"
			   +"&nbsp;<span class=\"FRed\">*</span></td>"
			   +"<td class=\"tab-bg-gr ri\" style=\"display:none \">会员卡号：</td>"
			   +"<td colspan=\"3\" class=\"le\" style=\"display:none \" ><input type=\"hidden\" name=\"salesTravellerDto["+(i)+"].memberCardCode\" value=\""+passenger.cid+"\" />&nbsp;<span class=\"FRed\">*</span>&nbsp;&nbsp;&nbsp;</td>"
			   +"</tr>"
			   +"</table>"
			   +"</div>"
			);
}
function appendInfantInfo(i,passenger){
	$("#travelleries").append(
			     getTravellerTypeHtml(i,passenger.travellerType)
			   +"<div class=\"tab7-st\" id=\"con_pop_1\">"
			   +"<input type=\"hidden\" name=\"salesTravellerDto["+(i)+"].travellerType\" class=\"travellerType_2\" value=\""+2+"\">"
			   +"<input type=\"hidden\" name=\"salesTravellerDto["+(i)+"].reduceMileage\" value=\""+passenger.reduceMileage+"\">"
			   +"<input type=\"hidden\" name=\"salesTravellerDto["+(i)+"].realreduce\" value=\""+passenger.realreduce+"\">"
			   +"<input type=\"hidden\" name=\"salesTravellerDto["+(i)+"].ticketPrice\" value=\""+passenger.ticketPrice+"\">"
			   +"<input type=\"hidden\" name=\"salesTravellerDto["+(i)+"].reduceNo\" value=\""+passenger.reduceNo+"\">"
			   +"<table border=\"0\" cellspacing=\"0\" cellpadding=\"0\">"
			   +"<tr>"
			   +"<td width=\"110\" class=\"tab-bg-gr ri\">旅客姓名：</td>"
			   +"<td class=\"le\">"
			   +"<input value=\""+passenger.cnName+"\" name=\"salesTravellerDto["+i+"].cnFullName\" readonly=\"readonly\" />&nbsp;&nbsp;<span class=\"FRed\">*</span>"
			   +"</td>"
			   +"<td class=\"tab-bg-gr ri\">出生日期：</td>"
			   +"<td class=\"le\"><input class=\"time\" name=\"salesTravellerDto["+(i)+"].birthDate\" value=\""+passenger.birthday+"\" readonly=\"readonly\" />"
			   +"&nbsp;<span class=\"FRed\">*</span>"
			   +"</td>"
			   +"<td width=\"110\" class=\"tab-bg-gr ri\">携带人：</td>"
			   +"<td class=\"le\">"
			   +"<select name=\"salesTravellerDto["+(i)+"].parentName\" class=\"parentNames_"+i+"\" >"
			   +getParentOptions()
			   +"</select>&nbsp;&nbsp;<span class=\"FRed\">*</span>"
			   +"</td>"
			   +"<td class=\"tab-bg-gr ri\" style=\"display:none \">会员卡号：</td>"
			   +"<td colspan=\"3\" class=\"le\" style=\"display:none \"><input type=\"hidden\" name=\"salesTravellerDto["+(i)+"].memberCardCode\" value=\""+passenger.cid+"\" />&nbsp;<span class=\"FRed\">*</span>&nbsp;&nbsp;&nbsp;</td>"
			   +"</tr>"
			   +"</table>"
			   +"</div>"
			);
}

function getTravellerTypeHtml(i,travellerType){
	
	var travellerTypeHtml = "<div class=\"tab7-st\" id=\"con_pop_1\">"
						   +"<div class=\"tit3-green\">"
						   +"<span><label name=\"label_"+(i+1)+"\" >"+(i+1)+"</label>、旅客类型：</span>"
						   +gettravellerTypeLabel(i,travellerType)
//						   +"<div class=\"fr\">"
//						   +"<a href=\"\" class=\"Btn-cl\"><strong>删除旅客</strong></a>"
//						   +"</div>"
						   +"</div>";
	return travellerTypeHtml;
}

function gettravellerTypeLabel(i,travellerType){
	var label = "";
	if(travellerType == -1)	{
		label += "<label id=\"pop1\" class=\"hover\" onclick=\"\"><input name=\"radio_"+i+"\" type=\"radio\" id=\"radio\" checked=true value=\"radio\" />&nbsp;成人会员</label>"
	}
	if(travellerType == 0) {
		label += "<label id=\"pop1\" class=\"hover\" onclick=\"\"><input name=\"radio_"+i+"\" type=\"radio\" id=\"radio\" checked=true value=\"radio\"  />&nbsp;成人</label>"
	}
	if(travellerType == 1){
		label += "<label id=\"pop2\" onclick=\"\"><input type=\"radio\" name=\"radio_"+i+"\" id=\"radio\"  checked=true value=\"radio\" />&nbsp;儿童</label>";
	} 
	if(travellerType == 2){
		label += "<label id=\"pop3\" onclick=\"\"><input type=\"radio\" name=\"radio_"+i+"\" id=\"radio\" checked=true value=\"radio\"  />&nbsp;婴儿</label>";
	} 
	return label;
}

function getParentOptions(){
	var options = "";
	var keyArr = adultPassengers.arr;
	 for(var j=0;j<keyArr.length;j++){
		   var parentName = (adultPassengers.get(keyArr[j].key)).cnName;
		   options += "<option value=\""+parentName+"\" >"+parentName+"</option>";
	 }
	 return options;
}

function getcredTypeOptions(idcardNo,passpordNo,otherNo){
	var options = "";
	if(idcardNo!=null&&idcardNo!=undefined&&idcardNo!=""){
		options += "<option value=\"1\">身份证</option>";
	}
	if(passpordNo!=null&&passpordNo!=undefined&&passpordNo!=""){
		options += "<option value=\"2\">护照</option>";
	}
	if(otherNo!=null&&otherNo!=undefined&&otherNo!=""){
		options += "<option value=\"3\">其他</option>";
	}
	return options;
}

function paddingNo(index,idcardNo,passpordNo,otherNo){
	
	var tmp = $("#noType_"+index).val();
	if(tmp == 1){
		$("#No_"+index).attr("value",idcardNo);
	}else if(tmp == 2){
		$("#No_"+index).attr("value",passpordNo);
	}else{
		$("#No_"+index).attr("value",otherNo);
	}
}

function dealRealreduce(reduceMileage){
	
	if(Number(availableMileage)-reduceMileage>0){
		return reduceMileage;
	}else{
		return availableMileage;
	}
	
}

function dealTicketpricve(difference){
	if(difference < 0){
		difference = parseFloat(difference)*-1;
	}
	if(difference < 100){
		difference = 100;
	}
	if(difference%100!=0){
		difference = difference-(difference%100)+100;
	}
	return (difference/100)*10;
}

/***
 * 获取日期
 * @param time
 * @param date
 * @returns {Boolean}
 */
function getDeadLineTime(time,date){
	var firstFlightDate = date.split("-");
	var firstYear = firstFlightDate[0];
	var firstMonth = Number(firstFlightDate[1])+1;
	var firstDay = firstFlightDate[2];
	var firstHour = time.substring(0, 2);
	var firstMin = time.substring(2, 4);
	
	var flightDate = new Date(firstYear,firstMonth,firstDay,firstHour,firstMin,00);
	var flightNow = new Date();
	var count = (flightDate.getTime() - flightNow.getTime())/60/60/1000;
	var lastDate ="";
	if(count <1){
		Dialog.alert("离起飞时间不足1小时，不允许预定，请选择其他航班！");
		
		return false;
	}
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
	var year = lastDate.getFullYear();
	var month = lastDate.getMonth()+1;
	var day =  lastDate.getDate(); //day 
	var hour = lastDate.getHours(); //hour 
	var min = lastDate.getMinutes()<10?("0"+lastDate.getMinutes()):lastDate.getMinutes(); //minute 
	 
	$("#reserveTicketDate").val(year+"-"+month+"-"+day);
	$("#reserveTicketTime").val(hour+":"+min);
	return true;
}

function Map() {
	 var struct = function(key, value) {
	  this.key = key;
	  this.value = value;
	 }
	 
	 var put = function(key, value){
	  for (var i = 0; i < this.arr.length; i++) {
	   if ( this.arr[i].key === key ) {
	    this.arr[i].value = value;
	    return;
	   }
	  }
	   this.arr[this.arr.length] = new struct(key, value);
	 }
	 
	 var get = function(key) {
	  for (var i = 0; i < this.arr.length; i++) {
	   if ( this.arr[i].key === key ) {
	     return this.arr[i].value;
	   }
	  }
	  return null;
	 }
	 
	 var remove = function(key) {
	  var v;
	  for (var i = 0; i < this.arr.length; i++) {
	   v = this.arr.pop();
	   if ( v.key === key ) {
	    continue;
	   }
	   this.arr.unshift(v);
	  }
	 }
	 
	 var size = function() {
	  return this.arr.length;
	 }
	 
	 var isEmpty = function() {
	  return this.arr.length <= 0;
	 }
	 
	 this.arr = new Array();
	 this.keys = new Array();
	 this.get = get;
	 this.put = put;
	 this.remove = remove;
	 this.size = size;
	 this.isEmpty = isEmpty;
	 
	}



