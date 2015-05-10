var chinese_numbers = {
	"1" : "一",
	"2" : "二",
	"3" : "三",
	"4" : "四",
	"5" : "五",
	"6" : "六",
	"7" : "七",
	"8" : "八",
	"9" : "九"
};

function genFlightResult(flights, cIndex, isVolun, isTransfer, leaveDate, origCabin) {
	var divCss = "flightInfo_list_" + cIndex;
	if (!flights || flights.length < 1) {
		searchEmptyPrompt(divCss, ((isVolun && !isTransfer)?9:8));
		return false;
	}
	
	var flightDate = setFormatDate(flights[0].date);
	if (leaveDate != flightDate) {
		$("#tripLeaveDate"+cIndex).html("<font color='red'>"+flightDate+"</font>");
		$("#tripLeaveDay"+cIndex).html(toWeek(flightDate));
		$("#tripCountDay"+cIndex).html(calcDays(flightDate));
	}
	
	var html = "";
	for (var i=0; i<flights.length; i++) {
		var flightObj = flights[i];
		html += genFlightTR(flightObj, i, cIndex, isVolun, isTransfer, origCabin);
	}
	var tbody = $("."+divCss).find(".details");
	tbody.empty();
	tbody.html(html);
	tbody.find("tr:visible").each(function(i,d) {
		if (i % 2 == 0) $(d).addClass("jqdemo");
	});
	hiddecss();//鼠标划过改变样式
	$(".hiddenTr").hide();
	$(".pjxx").css("display","none");
}

function genFlightTR(flightObj, i, cIndex, isVolun, isTransfer, origCabin) {
	var cabinFlag = "cabin_"+cIndex+"_"+i;
	var segObj = flightObj.segments[0];
	var tr = "<tr class='flight_tr'>";
	tr += "<td>"+(i+1)+genFlightHidden(flightObj.date, segObj, segObj.cabins[0])+"</td>";
	tr += "<td><a title='"+AirportCache.getCnName(segObj.departAirport)+"'>"+segObj.departAirport+"("+segObj.departTerminal+")</a>";
	tr += "-<a title='"+AirportCache.getCnName(segObj.arriveAirport)+"'>"+segObj.arriveAirport+"("+segObj.arriveTerminal+")</a></td>";
	tr += "<td>"+segObj.departTime+" "+segObj.arriveTime+"</td>";
	tr += "<td>"+genFlightNoDiv(segObj, cabinFlag)+"</td>";
	tr += "<td>"+segObj.planType+"</td>";
	tr += "<td><a title='"+segObj.stopInfo+"'>"+segObj.stops+"</a></td>";
	tr += "<td class='pnrMeal'>"+segObj.mealType+"</td>";
	if (isVolun && !isTransfer) {
		tr += "<td><a title='"+getUseCondition(segObj.cabins[0])+"'>"+segObj.cabins[0].name;
		tr += "("+getStatus(segObj.cabins[0])+")"+getDiscount(segObj.cabins[0])+"</a></td>";
		tr += "<td>"+genFlightPrice(segObj.cabins[0], cIndex)+"</td>";
	} else {
		tr += "<td><a title='"+getUseCondition(segObj.cabins[0])+"'>"+segObj.cabins[0].name;
		tr += "("+getStatus(segObj.cabins[0])+")</a>";
		tr += genCabinRadio(segObj.cabins[0], cIndex, isVolun, isTransfer, origCabin)+"</td>";
	}
	tr += "</tr>";
	
	//循环舱位
	for (var j=1; j<segObj.cabins.length; j++) {
		var cabinObj = segObj.cabins[j];
		tr += "<tr name='"+cabinFlag+"' class='hiddenTr'>";
		tr += "<td>"+genFlightHidden(flightObj.date, segObj, cabinObj)+"&nbsp;</td>";
		tr += "<td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td>";
		if (isVolun && !isTransfer) {
			tr += "<td><a title='"+getUseCondition(cabinObj)+"'>"+cabinObj.name;
			tr += "("+getStatus(cabinObj)+")"+getDiscount(cabinObj)+"</a></td>";
			tr += "<td>"+genFlightPrice(cabinObj, cIndex)+"</td>";
		} else {
			tr += "<td><a title='"+getUseCondition(cabinObj)+"'>"+cabinObj.name;
			tr += "("+getStatus(cabinObj)+")</a>";
			tr += genCabinRadio(cabinObj, cIndex, isVolun, isTransfer, origCabin)+"</td>";
		}
		tr += "</tr>";
	}
	return tr;
}

function genFlightHidden(flightDate, segObj, cabinObj) {
	var input = "<input type='hidden' name='flightDate' value='"+flightDate+"'/>";
	input += "<input type='hidden' name='carrier' value='"+segObj.carrier+"'/>";
	input += "<input type='hidden' name='depart' value='"+segObj.departAirport+"'/>";
	input += "<input type='hidden' name='arrival' value='"+segObj.arriveAirport+"'/>";
	input += "<input type='hidden' name='flightNo' value='"+segObj.number+"'/>";
	input += "<input type='hidden' name='departTime' value='"+segObj.departTime+"'/>";
	input += "<input type='hidden' name='arriveTime' value='"+segObj.arriveTime+"'/>";
	input += "<input type='hidden' name='stops' value='"+segObj.stops+"'/>";
	input += "<input type='hidden' name='mealType' value='"+segObj.mealType+"'/>";
	input += "<input type='hidden' name='planType' value='"+segObj.planType+"'/>";
	input += "<input type='hidden' name='departTerminal' value='"+segObj.departTerminal+"'/>";
	input += "<input type='hidden' name='arriveTerminal' value='"+segObj.arriveTerminal+"'/>";
	input += "<input type='hidden' name='cabin' value='"+cabinObj.name+"'/>";
	input += "<input type='hidden' name='status' value='"+cabinObj.status+"'/>";
	input += "<input type='hidden' name='phyPrice' value='"+cabinObj.phyPrice+"'/>";
	return input;
}

function genCabinRadio(cabinObj, cIndex, isVolun, isTransfer, origCabin) {
	if (isVolun && cabinObj.avaliableSeat) {
		return "<input type='radio' class='priceRadio' name='cabinRadio"+cIndex+"' cIndex='"+cIndex+"' fareType='FD'/>";
	}
	if (!isTransfer && cabinObj.name == origCabin) {
		return "<input type='radio' class='cabinRadio' name='cabinRadio"+cIndex+"' cIndex='"+cIndex+"'/>";
	}
	if (!isVolun && isTransfer) {
		return "<input type='radio' class='cabinRadio' name='cabinRadio"+cIndex+"' cIndex='"+cIndex+"'/>";
	}
	return "";
}

function genFlightNoDiv(segObj, cabinFlag) {
	if (!segObj.sharing && !segObj.chartAilne) {
		return "<div onclick=\"showOrhidden('"+cabinFlag+"')\" class='showTd1'><b>"+segObj.number+"</b></div>";
	}
	if (!segObj.sharing && segObj.chartAilne) {
		return "<div onclick=\"showOrhidden('"+cabinFlag+"')\" class='showTd2'><b>"+segObj.number+"</b></div>";
	}
	if (segObj.sharing  && !segObj.chartAilne){
		return "<div onclick=\"showOrhidden('"+cabinFlag+"')\" title='实际承运人："+segObj.shareCarrier+"' class='showTd2'><b>*"+segObj.number+"</b></div>";
	}
	if (segObj.sharing  && segObj.chartAilne){
		return "<div onclick=\"showOrhidden('"+cabinFlag+"')\" title='实际承运人："+segObj.shareCarrier+"' class='showTd2'><b>*"+segObj.number+"</b></div>";
	}
	return "";
}

function genFlightPrice(cabinObj, cIndex) {
	var price = "";
	var prodInfos = cabinObj.flightCabinProductInfoes;
	for (var j=0; j<prodInfos.length; j++) {
		var infoObj = prodInfos[j];
		if (!infoObj.hasMatch || !infoObj.hasSeat) {
			price += infoObj.productName+"(￥"+infoObj.ticketPrice+")";
			continue;
		}
		price += "<input type='radio' class='priceRadio' name='cabinRadio"+cIndex+"'";
		price += " cIndex='"+cIndex+"' prodCode='"+infoObj.productCode+"'/>";
		price += infoObj.productName+"(￥"+infoObj.ticketPrice+")";
	}
	return price;
}

function getUseCondition(cabinObj) {
	var useCondition = cabinObj.useCondition;
	if (!useCondition || useCondition == null) {
		return "";
	}
	return useCondition;
}

function getDiscount(cabinObj) {
	var discount = cabinObj.discount;
	if (!discount || discount == "") {
		return "";
	}
	if (discount == 10) {
		return "/全价";
	}
	if (discount != 0 && discount != 10) {
		return "/"+discount+"折";
	}
	return "";
}

function getStatus(cabinObj) {
	if (cabinObj.status == "A") {
		return ">9";
	}
	return cabinObj.status;
}

function showOrhidden(name) {
	$("tr[name='"+name+"']").toggle();
}

function hiddecss(){
	$(".hiddenTr").mouseover(function(){
		$(this).css("background-color","#F9FFB8");
	}).mouseout(function(){
		$(this).css("background-color","#fff");						
	});
}

function searchingPrompt(divCss, colspan) {
	var tbody = $("."+divCss).find(".details");
	tbody.empty();
	tbody.html("<tr><td colspan='"+colspan+"'>正在查询航班，请稍后...</td></tr>");
}

function searchErrorPrompt(divCss, colspan) {
	var tbody = $("."+divCss).find(".details");
	tbody.empty();
	tbody.html("<tr><td colspan='"+colspan+"' style='color:red;'>查询航班失败，请重试！</td></tr>");
}

function searchEmptyPrompt(divCss, colspan) {
	var tbody = $("."+divCss).find(".details");
	tbody.empty();
	tbody.html("<tr><td colspan='"+colspan+"' style='color:red;'>暂无航班数据！</td></tr>");
}

function checkFlightTime(flightDate, departTime) {
	var items = setFormatDate(flightDate).split("-");
	var year = items[0];
	var month = Number(items[1]) - 1;
	var day = items[2];
	var hour = departTime.substring(0, 2);
	var min = departTime.substring(2, 4);
	var flightTime = new Date(year, month, day, hour, min, 00);
	var count = (flightTime.getTime() - new Date().getTime())/60/60/1000;
	if (count < 1) return false;
	return true;
}

//比较两个时间yyyy-MM-dd
function afterTime(compareDate1 , compareDate2) {
	var date1 = new Date(compareDate1.replaceAll("-", "/"));
	var date2 = new Date(compareDate2.replaceAll("-", "/"));
	if ((date1.getTime()) > (new Date(date2)).getTime()) {
		return false;
	}
	return true;
}

//将ddMMMyy格式的时间串转成yyyy-MM-dd形式
function setFormatDate(upCaseDate){
	var date = upCaseDate.toUpperCase();
	var m = ['JAN','FEB','MAR','APR','MAY','JUN','JUL','AUG','SEP','OCT','NOV','DEC'];
	for(key in m){
		if(date.substr(2,3)==m[key]){
			var month = (Number(key)+1)<10?0+""+(Number(key)+1):(Number(key)+1);
			var newDate = "20"+date.substr(5,7)+"-"+month+"-"+date.substr(0,2);
			return newDate;
		}
	}
}

function formatTime(time) {
	return time.substr(0,2) + ":" + time.substr(2,time.length);
}

//获取星期
function toWeek(flightDate) {
	var date = new Date(flightDate.replaceAll("-","/")).getDay();
	switch (date) {
		case 1 : return "星期一";
		case 2 : return "星期二";
		case 3 : return "星期三";
		case 4 : return "星期四";
		case 5 : return "星期五";
		case 6 : return "星期六";
		case 0 : return "星期日";
	}
	return "";
}

//计算天数
function calcDays(flightDate) {
	var today = new Date();
	today = new Date(today.getFullYear(), today.getMonth(), today.getDate());
	var endDate = new Date(flightDate.replaceAll("-", "/"));
	var days = Math.floor((endDate.getTime()-today.getTime())/(24*3600*1000));
	return "距今日&nbsp;<font color='red'>"+days+"</font>&nbsp;天";
}