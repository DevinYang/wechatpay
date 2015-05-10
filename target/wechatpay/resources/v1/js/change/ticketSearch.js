function genTicketResult(tickets) {
	if (!tickets || tickets.length < 1) {
		searchEmptyPrompt("ticketInfo", 9);
		return false;
	}
	var html = "";
	for (var i=0; i<tickets.length; i++) {
		var tktObj = tickets[i];
		html += genTicketTR(tktObj, i);
	}
	var tbody = $(".ticketInfo").find(".details");
	tbody.empty();
	tbody.html(html);
	$(".applyChangeDiv").show();
}

function genTicketTR(tktObj, i) {
	var tr = "";
	var couponSize = tktObj.coupons.length;
	for (var j=0; j<couponSize; j++) {
		var couponObj = tktObj.coupons[j];
		tr += "<tr>";
		if (j == 0) {
			tr += "<td rowspan='"+couponSize+"'>"+(i+1)+"</td>";
			tr += "<td rowspan='"+couponSize+"'>"+tktObj.travellerName+"/"+tktObj.travellerType+"</td>";
			tr += "<td rowspan='"+couponSize+"'>"+tktObj.ticketNoText+"</td>";
		}
		tr += "<td>"+(j + 1)+"</td>";
		tr += "<td>"+couponObj.flightNo+"</td>";
		tr += "<td>"+couponObj.flightDateFormatString+"</td>";
		tr += "<td><a title='"+couponObj.depart+"'>"+couponObj.depart+"</a>";
		tr += " - <a title='"+couponObj.arrival+"'>"+couponObj.arrival+"</a></td>";
		tr += "<td>"+couponObj.status+"</td>";
		if (j == 0) {
			tr += "<td rowspan='"+couponSize+"'><input type='checkbox' name='tickets'";
			if (tktObj.operable !== true) {
				tr += " disabled='disabled' title='只有存在OPEN状态的客票才能进行变更'";
			}
			tr += " tn='"+tktObj.ticketNo+"' ptn='"+tktObj.adultTicketNo+"'";
			tr += " ctn='"+tktObj.firstConjTicketNo+"' pName='"+tktObj.travellerName+"'";
			tr += " pType='"+tktObj.travellerType+"' caInfo='"+tktObj.carrierInfo+"'";
			tr += " coInfo='"+tktObj.couponInfo+"'/></td>";
		}
		tr += "</tr>";
	}
	return tr;
}

var guestCount = 0, tktCount = 0, cpnCount = 0;
function genCouponResult(applyVO) {
	var html = "";
	var travellers = applyVO.travellers;
	guestCount = 0;
	tktCount = 0;
	for (var i=0; i<travellers.length; i++) {
		var pObj = travellers[i];
		cpnCount = 0;
		for (var j=0; j<pObj.tickets.length; j++) {
			var tktObj = pObj.tickets[j];
			html += genCouponTR(pObj, tktObj, i, j);
			html += genTicketParam(tktObj, i, j);
		}
		html += genTravellerParam(pObj, i);
		guestCount = guestCount + 1;
	}
	html += genCommonParam(applyVO);
	var tbody = $(".couponInfo").find(".details");
	tbody.empty();
	tbody.html(html);
	$(".submitApplyDiv").show();
}
function getMemberInfo(pObj){
	var memberInfo = "";
	if(pObj.jlkCode && pObj.jlkCode != ""){
		memberInfo = pObj.jlkCode;
	}else if(pObj.memberCardCode && pObj.memberCardCode != ""){
		memberInfo = pObj.memberCardCode+"/"+pObj.memberCardLevel;
	}
	return memberInfo;
}
function genCouponTR(pObj, tktObj, i, j) {
	tktCount = tktCount + 1;
	var tr = "";
	var couponSize = tktObj.coupons.length;
	for (var k=0; k<couponSize; k++) {
		cpnCount = cpnCount + 1;
		var couponObj = tktObj.coupons[k];
		tr += "<tr>";
		if (k == 0) {
			tr += "<td rowspan='"+couponSize+"'>"+tktCount+"</td>";
			tr += "<td rowspan='"+couponSize+"'>"+pObj.name+"/"+pObj.typeText+"</td>";
			tr += "<td rowspan='"+couponSize+"'>"+getMemberInfo(pObj)+"</td>";
			tr += "<td rowspan='"+couponSize+"'>"+tktObj.ticketNoText+"</td>";
		}
		tr += "<td>"+couponObj.pnrNo+"</td>";
		tr += "<td>"+(k+1)+"</td>";
		tr += "<td>"+couponObj.origFlightNo+"</td>";
		tr += "<td>"+couponObj.origFlightDateStr+"</td>";
		tr += "<td><a title='"+couponObj.depart+"'>"+couponObj.depart+"</a>";
		tr += " - <a title='"+couponObj.arrival+"'>"+couponObj.arrival+"</a></td>";
		tr += "<td>"+couponObj.status+"</td><td>&nbsp;</td>";
		tr += "<td><input type='checkbox' value='1'";
		tr += " name='travellers["+i+"].tickets["+j+"].coupons["+k+"].changeType'";
		if (!/^OPEN.*$/.test(couponObj.status)) {
			tr += " disabled='disabled' title='只有OPEN状态的票联才能进行变更'";
		}
		tr += " pnr='"+couponObj.pnrNo+"' seq='"+cpnCount+"'";
		tr += " cabin='"+couponObj.origCabin+"' pType='"+pObj.type+"'";
		tr += " pName='"+pObj.name+"' cpName='"+pObj.carryPeopleName+"'/></td>";
		tr += "</tr>";
		tr += genCouponParam(couponObj, i, j, k);
	}
	return tr;
}

function genPNRResult(pnrTravellers, ticketMap, selTravellers) {
	var html = "";
	for (var i=0; i<pnrTravellers.length; i++) {
		var traveller = pnrTravellers[i];
		var key = traveller.name + "/" + traveller.type;
		var tktKey = traveller.seq + ((traveller.type == "INFANT") ? "INF" : "");
		html += "<tr>";
		html += "<td>" + traveller.name+"/"+traveller.typeName + "</td>";
		html += "<td>" + (isNullOrEmpty(traveller.credNo)?traveller.birthDate:traveller.credNo) + "</td>";
		html += "<td>" + ticketMap[tktKey] + "</td>";
		html += "<td><input type='checkbox' name='travellers'";
		if (selTravellers[key]) {
			html += " checked='checked' disabled='disabled' selInfo='"+selTravellers[key]+"'";
		}
		html += " seq='"+traveller.seq+"' pName='"+traveller.name+"' pType='"+traveller.type+"'";
		html += " cpName='"+(isNullOrEmpty(traveller.parentName)?"":traveller.parentName)+"'";
		html += " ticketNos='"+ticketMap[tktKey]+"' credType='"+traveller.credType+"'";
		html += " credNo='"+traveller.credNo+"' birthDate='"+traveller.birthDate+"'";
		html += " cardType='"+traveller.memberCardType+"' cardCode='"+traveller.memberCardCode+"'";
		html += " cardLevel='"+traveller.cardLevel+"'/></td></tr>";
	}
	var tbody = $("#dialog_pnrInfo").find(".details");
	tbody.empty();
	tbody.html(html);
}

function checkTicket(cBoxs) {
	var voidNos = new Array();
	cBoxs.each(function() {
		var tn = $(this).attr("tn");
		//var caInfo = $(this).attr("caInfo");
		if (!/^(880|898|895|826|847|859|886|666)-?\d{10}$/.test(tn)) {
			voidNos.push(tn);
		}
	});
	return voidNos.join(",");
}

function checkTraveller(cBoxs) {
	var travellers = {};
	var voidNames = "";
	cBoxs.each(function() {
		var ctn = $(this).attr("ctn");
		var pName = $(this).attr("pName");
		var key = pName+"/"+$(this).attr("pType");
		var conjNo = travellers[key];
		if (!conjNo) {
			travellers[key] = ctn;
		} else if (conjNo != ctn && voidNames.indexOf(pName) == -1) {
			if (voidNames != "") voidNames += ",";
			voidNames += pName;
		}
	});
	return voidNames;
}

function checkTravellerSegment(cBoxs) {
	var groups = {};
	cBoxs.each(function() {
		var ctn = $(this).attr("ctn");
		var coInfo = $(this).attr("coInfo");
		var value = groups[ctn];
		if (!value) {
			groups[ctn] = coInfo;
		} else {
			groups[ctn] = value + coInfo;
		}
	});
	var tempInfo = "";
	for (var k in groups) {
		if (tempInfo == "") {
			tempInfo = groups[k];
		} else if (tempInfo != groups[k]) {
			return false;
		}
	}
	return true;
}

function applyVerify(cBoxs) {
	if (!cBoxs || cBoxs.size() < 1) {
		return "请选择要变更的客票！";
	}
	var voidNos = checkTicket(cBoxs);
	if (voidNos && voidNos != "") {
		return "客票 "+checkInfo+" 不允许变更振作！";
	}
	var voidNames = checkTraveller(cBoxs);
	if (voidNames && voidNames != "") {
		return "旅客 "+voidNames+" 多次航程，不允许同时变更！";
	}
	if (!checkTravellerSegment(cBoxs)) {
		return "选中的旅客航程不一致，不允许同时变更！";
	}
	return "";
}

function getApplyParam(cBoxs) {
	var tickets = {}, travellers = {};
	cBoxs.each(function() {
		var tn = $(this).attr("tn");
		var ctn = $(this).attr("ctn");
		var pName = $(this).attr("pName");
		var pType = $(this).attr("pType");
		var key = pName+"/"+pType+"/"+ctn;
        if (!travellers[key]) {
        	travellers[key] = new Array();
	    }
        travellers[key].push(tn);
        if (pType == "婴儿") {
        	tickets[tn] = $(this).attr("ptn");
        }
	});
	var params = {}, i = 0;
	for (var k in travellers) {
		var items = k.split("/");
		params['travellers['+i+'].name'] = items[0];
		params['travellers['+i+'].type'] = getTravellerType(items[1]);
		for (var j=0; j<travellers[k].length; j++) {
			params['travellers['+i+'].tickets['+j+'].ticketNo'] = travellers[k][j];
		}
		if (items[1] == "婴儿") {
			var no = travellers[k][0];
			var cbObj = $("input[name='tickets'][tn='"+tickets[no]+"']:checked");
			if (cbObj) params['travellers['+i+'].carryPeopleName'] = cbObj.attr("pName");
		}
		i = i + 1;
	}
	return params;
}

function getTravellerType(type) {
	if (type == "成人") {
		return "ADULT";
	} else if (type == "儿童") {
		return "CHILD";
	} else if (type == "婴儿") {
		return "INFANT";
	}
	return "";
}

function nullSafe(actual, safe) {
	if (!actual || actual == null || actual == "null") {
		return safe;
	}
	return actual;
}

function checkChangeType() {
	var isVolun = $("input[name='isVolun']:checked").val();
	if (isVolun == "false") {
		$(".segChangePrompt").empty();
		return false;
	}
	var tBoxs = $("input[name='isTransfer']:checked");
	if (!tBoxs || tBoxs.size() < 1) {
		$(".segChangePrompt").empty();
		return false;
	}
	var cBoxs = $("input[name$='changeType']:checked");
	if (!cBoxs || cBoxs.size() < 1) {
		$(".segChangePrompt").empty();
		return false;
	}
	var result = false;
	cBoxs.each(function() {
		var cabin = $(this).attr("cabin");
		if (!/^[YCF]$/.test(cabin)) result = true;
	});
	if (result) {
		$(".segChangePrompt").html("警告：原航段是Y、C、F舱才能自愿签转，请检查！");
	} else {
		$(".segChangePrompt").empty();
	}
}

function submitVerify(cBoxs) {
	if (!cBoxs || cBoxs.size() < 1) {
		return "请选择要变更的票联！";
	}
	var pnrNo = $(cBoxs[0]).attr("pnr");
	for (var i=1; i<cBoxs.length; i++) {
		if ($(cBoxs[i]).attr("pnr") != pnrNo) {
			return "选中的票联PNR编码不一致，不允许同时变更！";
		}
	}
	var travellers = {};
	var tCount = 0;
	cBoxs.each(function() {
		var seq = $(this).attr("seq");
		var key = $(this).attr("pName")+"/"+$(this).attr("pType");
		if (!travellers[key]) {
			travellers[key] = initSeqArray();
			tCount = tCount + 1;
		}
		travellers[key][seq-1] = "1";
	});
	var temp = "";
	for (var k in travellers) {
		var info =  travellers[k].join("");
		if (temp == "") {
			temp = info;
		} else if (temp != info) {
			return "选中的旅客票联序号不一致，不允许同时变更！";
		}
		travellers[k] = info;
	}
	setNoSelectedDisabled(travellers);
	return {"pnrNo":pnrNo,"travellers":travellers,"tCount":tCount};
}

function initSeqArray() {
	var seqs = new Array();
	for (var i=0; i<cpnCount; i++) {
		seqs[i] = "0";
	}
	return seqs;
}

function setNoSelectedDisabled(selTravellers) {
	var cBoxs = $("input[name$='changeType']");
	var noSelTravellers = {};
	cBoxs.each(function() {
		var key = $(this).attr("pName")+"/"+$(this).attr("pType");
		if (!selTravellers[key] && !noSelTravellers[key]) {
			noSelTravellers[key] = $(this).attr("name");
		}
	});
	for (var k in noSelTravellers) {
		var name =  noSelTravellers[k].split(".")[0];
		$("#changeApplyForm").find("input[name^='"+name+"']").attr("disabled","disabled");
	}
}

function confirmVerify(cBoxs) {
	var changeInfo = $("input[name='travellers'][selInfo]:first").attr("selInfo");
	var existNum = 0;
	for (var i=0; i<cBoxs.length; i++) {
		var $this = $(cBoxs[i]);
		var selInfo = $this.attr("selInfo");
		if (selInfo && selInfo != "") {
			existNum = existNum + 1;
			continue;
		}
		var pName = $this.attr("pName");
		var pType = $this.attr("pType");
		var cbs = $("#changeApplyForm").find("input[pName='"+pName+"'][pType='"+pType+"']:checkbox");
		if (cbs && cbs.length > 0) {
			var name = $(cbs[0]).attr("name");
			name = name.split(".")[0];
			$("#changeApplyForm").find("input[name^='"+name+"']").removeAttr("disabled");
			cbs.each(function(i, d) {
				if (changeInfo.charAt(i) == "1") {
					$(d).attr("checked", "checked");
				}
			});
			$this.attr("selInfo", changeInfo);
			existNum = existNum + 1;
		}
	}
	if (existNum < $("input[name='travellers']:checkbox").length) {
		return false;
	}
	return true;
}

function getConfirmParam(cBoxs) {
	var params = {}, i = 0;
	cBoxs.each(function() {
		params['travellers['+i+'].name'] = $(this).attr("pName");
		params['travellers['+i+'].type'] = $(this).attr("pType");
		params['travellers['+i+'].credType'] = nullSafe($(this).attr("credType"),"");
		params['travellers['+i+'].credNo'] = nullSafe($(this).attr("credNo"),"");
		params['travellers['+i+'].birthDate'] = nullSafe($(this).attr("birthDate"),"");
		params['travellers['+i+'].memberCardType'] = nullSafe($(this).attr("cardType"),"");
		params['travellers['+i+'].memberCardCode'] = nullSafe($(this).attr("cardCode"),"");
		params['travellers['+i+'].memberCardLevel'] = nullSafe($(this).attr("cardLevel"),"");
		params['travellers['+i+'].carryPeopleName'] = nullSafe($(this).attr("cpName"),"");
		var ticketNos = $(this).attr("ticketNos").split("/");
		for (var j=0; j<ticketNos.length; j++) {
			params['travellers['+i+'].tickets['+j+'].ticketNo'] = ticketNos[j];
		}
		params['travellers['+i+'].seq'] = $(this).attr("seq");
		params['travellers['+i+'].changeInfo'] = nullSafe($(this).attr("selInfo"),"");
		i = i + 1;
	});
	params['pnrNo'] = $("#changeApplyForm").find("input[name='pnrNo']").val();
	params['pnrTravellerNum'] = $("input[name='travellers']:checkbox").length;
	return params;
}

function modifyPNRTravellerCred(travellers) {
	if (!travellers || travellers.length < 1) {
		return false;
	}
	for (var i=0; i<travellers.length; i++) {
		var traveller = travellers[i];
		var pName = traveller.name;
		var pType = traveller.type;
		var cbs = $("#changeApplyForm").find("input[pName='"+pName+"'][pType='"+pType+"']:checkbox");
		if (cbs && cbs.length > 0) {
			var cbName = $(cbs[0]).attr("name");
			var key = cbName.split(".")[0];
			$("#changeApplyForm").find("input[name='"+key+".credType']").val(nullSafe(traveller.credType,""));
			$("#changeApplyForm").find("input[name='"+key+".credNo']").val(nullSafe(traveller.credNo,""));
			$("#changeApplyForm").find("input[name='"+key+".birthDate']").val(nullSafe(traveller.birthDate,""));
			$("#changeApplyForm").find("input[name='"+key+".memberCardType']").val(nullSafe(traveller.memberCardType,""));
			$("#changeApplyForm").find("input[name='"+key+".memberCardCode']").val(nullSafe(traveller.memberCardCode,""));
			$("#changeApplyForm").find("input[name='"+key+".memberCardLevel']").val(nullSafe(traveller.cardLevel,""));
		}
	}
}

function addPNRProtectSegments(segMap) {
	if (!segMap) {
		return false;
	}
	var cBoxs = $("input[name$='changeType']:checked");
	var html = "";
	cBoxs.each(function() {
		var name = $(this).attr("name").replace(".changeType", "");
		var key = $("#changeApplyForm").find("input[name='"+name+".depart']").val();
		key += $("#changeApplyForm").find("input[name='"+name+".arrival']").val();
		if (segMap[key]) html += genProtectSegmentParam(name, segMap[key]);
	});
	$(".protectSegInfo").html(html);
}

function genPNRTravellerParam(applyVO) {
	$("#changeApplyForm").find("input[name='pnrNo']").val(applyVO.pnrNo);
	var selInfo = $("input[name='travellers'][selInfo]:first").attr("selInfo");
	
	var html = "";
	var travellers = applyVO.travellers;
	for (var i=0; i<travellers.length; i++) {
		var pObj = travellers[i];
		if (pObj.changeInfo && pObj.changeInfo != "") {
			continue;
		}
		html += genTravellerParam(pObj, guestCount);
		var tempCount = 0;
		for (var j=0; j<pObj.tickets.length; j++) {
			var tktObj = pObj.tickets[j];
			html += genTicketParam(tktObj, guestCount, j);
			for (var k=0; k<tktObj.coupons.length; k++) {
				var couponObj = tktObj.coupons[k];
				var changeType = selInfo.charAt(tempCount);
				html += genCouponParam(couponObj, guestCount, j, k, changeType);
				tempCount = tempCount + 1;
			}
		}
		guestCount = guestCount + 1;
	}
	$("#changeApplyForm").append(html);
}

function genCommonParam(applyVO) {
	var html = "<input type='hidden' name='pnrNo' value='"+nullSafe(applyVO.pnrNo,"")+"'/>";
	html += "<input type='hidden' name='pnrCancelTime' value='"+nullSafe(applyVO.pnrCancelTime,"")+"'/>";
	return html;
}

function genTravellerParam(pObj, i) {
	var html = "<input type='hidden' name='travellers["+i+"].name' value='"+nullSafe(pObj.name,"")+"'/>";
	html += "<input type='hidden' name='travellers["+i+"].type' value='"+nullSafe(pObj.type,"")+"'/>";
	html += "<input type='hidden' name='travellers["+i+"].credType' value='"+nullSafe(pObj.credType,"")+"'/>";
	html += "<input type='hidden' name='travellers["+i+"].credNo' value='"+nullSafe(pObj.credNo,"")+"'/>";
	html += "<input type='hidden' name='travellers["+i+"].birthDate' value='"+nullSafe(pObj.birthDate,"")+"'/>";
	html += "<input type='hidden' name='travellers["+i+"].memberCardType' value='"+nullSafe(pObj.memberCardType,"")+"'/>";
	html += "<input type='hidden' name='travellers["+i+"].memberCardCode' value='"+nullSafe(pObj.memberCardCode,"")+"'/>";
	html += "<input type='hidden' name='travellers["+i+"].memberCardLevel' value='"+nullSafe(pObj.memberCardLevel,"")+"'/>";
	html += "<input type='hidden' name='travellers["+i+"].bigCoustomerCode' value='"+nullSafe(pObj.bigCoustomerCode,"")+"'/>";
	html += "<input type='hidden' name='travellers["+i+"].jlkCode' value='"+nullSafe(pObj.jlkCode,"")+"'/>";
	html += "<input type='hidden' name='travellers["+i+"].carryPeopleName' value='"+nullSafe(pObj.carryPeopleName,"")+"'/>";
	return html;
}

function genTicketParam(tktObj, i, j) {
	var html = "<input type='hidden' name='travellers["+i+"].tickets["+j+"].ticketNo' value='"+nullSafe(tktObj.ticketNo,"")+"'/>";
	html += "<input type='hidden' name='travellers["+i+"].tickets["+j+"].endorse' value='"+nullSafe(tktObj.endorse,"")+"'/>";
	html += "<input type='hidden' name='travellers["+i+"].tickets["+j+"].fop' value='"+nullSafe(tktObj.fop,"")+"'/>";
	html += "<input type='hidden' name='travellers["+i+"].tickets["+j+"].cnTaxCost' value='"+nullSafe(tktObj.cnTaxCost,"0")+"'/>";
	html += "<input type='hidden' name='travellers["+i+"].tickets["+j+"].yqTaxCost' value='"+nullSafe(tktObj.yqTaxCost,"0")+"'/>";
	html += "<input type='hidden' name='travellers["+i+"].tickets["+j+"].origTicketPrice' value='"+nullSafe(tktObj.origTicketPrice,"0")+"'/>";
	html += "<input type='hidden' name='travellers["+i+"].tickets["+j+"].origTotalTicketPrice' value='"+nullSafe(tktObj.origTotalTicketPrice,"0")+"'/>";
	return html;
}

function genCouponParam(cObj, i, j, k, changeType) {
	var html = "<input type='hidden' name='travellers["+i+"].tickets["+j+"].coupons["+k+"].pnrNo' value='"+nullSafe(cObj.pnrNo,"")+"'/>";
	html += "<input type='hidden' name='travellers["+i+"].tickets["+j+"].coupons["+k+"].seq' value='"+nullSafe(cObj.seq,"0")+"'/>";
	html += "<input type='hidden' name='travellers["+i+"].tickets["+j+"].coupons["+k+"].depart' value='"+nullSafe(cObj.depart,"")+"'/>";
	html += "<input type='hidden' name='travellers["+i+"].tickets["+j+"].coupons["+k+"].arrival' value='"+nullSafe(cObj.arrival,"")+"'/>";
	html += "<input type='hidden' name='travellers["+i+"].tickets["+j+"].coupons["+k+"].status' value='"+nullSafe(cObj.status,"")+"'/>";
	html += "<input type='hidden' name='travellers["+i+"].tickets["+j+"].coupons["+k+"].origCarrier' value='"+nullSafe(cObj.origCarrier,"")+"'/>";
	html += "<input type='hidden' name='travellers["+i+"].tickets["+j+"].coupons["+k+"].origFlightNo' value='"+nullSafe(cObj.origFlightNo,"")+"'/>";
	html += "<input type='hidden' name='travellers["+i+"].tickets["+j+"].coupons["+k+"].origFlightDate' value='"+nullSafe(cObj.origFlightDate,"")+"'/>";
	html += "<input type='hidden' name='travellers["+i+"].tickets["+j+"].coupons["+k+"].origDepartTime' value='"+nullSafe(cObj.origDepartTime,"")+"'/>";
	html += "<input type='hidden' name='travellers["+i+"].tickets["+j+"].coupons["+k+"].origArrivalTime' value='"+nullSafe(cObj.origArrivalTime,"")+"'/>";
	html += "<input type='hidden' name='travellers["+i+"].tickets["+j+"].coupons["+k+"].origCabin' value='"+nullSafe(cObj.origCabin,"")+"'/>";
	html += "<input type='hidden' name='travellers["+i+"].tickets["+j+"].coupons["+k+"].origPriceLevel' value='"+nullSafe(cObj.origPriceLevel,"")+"'/>";
	html += "<input type='hidden' name='travellers["+i+"].tickets["+j+"].coupons["+k+"].origPrice' value='"+nullSafe(cObj.origPrice,"0")+"'/>";
	if (changeType) html += "<input type='hidden' name='travellers["+i+"].tickets["+j+"].coupons["+k+"].changeType' value='"+changeType+"'/>";
	return html;
}

function genProtectSegmentParam(name, segObj) {
	var html = "<input type='hidden' name='"+name+".protectFlightNo' value='"+nullSafe(segObj.flightNo,"")+"'/>";
	html += "<input type='hidden' name='"+name+".protectFlightDate' value='"+nullSafe(segObj.departDate,"")+"'/>";
	html += "<input type='hidden' name='"+name+".protectDepartTime' value='"+nullSafe(segObj.departTime,"")+"'/>";
	html += "<input type='hidden' name='"+name+".protectArrivalTime' value='"+nullSafe(segObj.arrivalTime,"")+"'/>";
	return html;
}

function searchingPrompt(divCss, colspan) {
	var tbody = $("."+divCss).find(".details");
	tbody.empty();
	tbody.html("<tr><td colspan='"+colspan+"'>正在查询客票，请稍后...</td></tr>");
}

function searchErrorPrompt(divCss, colspan) {
	var tbody = $("."+divCss).find(".details");
	tbody.empty();
	tbody.html("<tr><td colspan='"+colspan+"' style='color:red;'>查询客票失败，请重试！</td></tr>");
}

function searchEmptyPrompt(divCss, colspan) {
	var tbody = $("."+divCss).find(".details");
	tbody.empty();
	tbody.html("<tr><td colspan='"+colspan+"' style='color:red;'>暂无客票数据！</td></tr>");
}