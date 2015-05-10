function disposeFlightInfo(cabinTR, cIndex, prodCode) {
	var departTime = cabinTR.find("input[name='departTime']").val();
	var arriveTime = cabinTR.find("input[name='arriveTime']").val();
	
	var info = cabinTR.find("input[name='depart']").val();
	info += "-" + cabinTR.find("input[name='arrival']").val();
	info += " " + formatTime(departTime) + "-" + formatTime(arriveTime);
	info += " " + cabinTR.find("input[name='flightNo']").val();
	info += " " + cabinTR.find("input[name='cabin']").val() + "舱";
	$("#chooseFlight"+cIndex).html(info);
	$(".flightInfo_list_"+cIndex).slideUp("slow");
	
	var divs = $("#submitForm").find("div[cType='1'][cIndex='"+cIndex+"']");
	divs.each(function(i, d) {
		$(d).find("input[name$='.newCarrier']").val(cabinTR.find("input[name='carrier']").val());
		$(d).find("input[name$='.newFlightNo']").val(cabinTR.find("input[name='flightNo']").val());
		$(d).find("input[name$='.newFlightDate']").val(cabinTR.find("input[name='flightDate']").val());
		$(d).find("input[name$='.newDepartTime']").val(cabinTR.find("input[name='departTime']").val());
		$(d).find("input[name$='.newArrivalTime']").val(cabinTR.find("input[name='arriveTime']").val());
		$(d).find("input[name$='.newCabin']").val(cabinTR.find("input[name='cabin']").val());
		$(d).find("input[name$='.stops']").val(cabinTR.find("input[name='stops']").val());
		$(d).find("input[name$='.planType']").val(cabinTR.find("input[name='planType']").val());
		$(d).find("input[name$='.mealType']").val(cabinTR.find("input[name='mealType']").val());
		$(d).find("input[name$='.departTerminal']").val(cabinTR.find("input[name='departTerminal']").val());
		$(d).find("input[name$='.arrivalTerminal']").val(cabinTR.find("input[name='arriveTerminal']").val());
		$(d).find("input[name$='.cabinStatus']").val(cabinTR.find("input[name='status']").val());
		if (prodCode) $(d).find("input[name$='.productCode']").val(prodCode);
	});
}

function disposeFareInfo(fareTR, cIndex, pType) {
	var divs = $("#submitForm").find("div[pType='"+pType+"'][cType='1'][cIndex='"+cIndex+"']");
	divs.each(function(i, d) {
		$(d).find("input[name$='.newPrice']").val(fareTR.find("input[name='price']").val());
		$(d).find("input[name$='.newPriceLevel']").val(fareTR.find("input[name='priceLevel']").val());
		$(d).find("input[name$='.newChangeCondition']").val(fareTR.find("input[name='changeCondition']").val());
		$(d).find("input[name$='.newRefundCondition']").val(fareTR.find("input[name='refundCondition']").val());
		$(d).find("input[name$='.newTransferCondition']").val(fareTR.find("input[name='transferCondition']").val());
		$(d).find("input[name$='.newCNCost']").val(fareTR.find("input[name='cnCost']").val());
		$(d).find("input[name$='.newYQCost']").val(fareTR.find("input[name='yqCost']").val());
		$(d).find("input[name$='.changeRate']").val(fareTR.find("select[name='changeRate']").val());
		$(d).find("input[name$='.changeCost']").val(fareTR.find("input[name='changeCost']").val());
		$(d).find("input[name$='.upgradeCost']").val(fareTR.find("input[name='upgradeCost']").val());
		$(d).find("input[name$='.changeType']").val(fareTR.find("input[name='changeType']").val());
	});
}

function disposeProtectSegInfo(pSeg, cIndex) {
	var divs = $("#submitForm").find("div[cType='1'][cIndex='"+cIndex+"']");
	divs.each(function(i, d) {
		$(d).find("input[name$='.newCarrier']").val($(d).find("input[name$='.origCarrier']").val());
		$(d).find("input[name$='.newCabin']").val($(d).find("input[name$='.origCabin']").val());
		$(d).find("input[name$='.newFlightNo']").val(nullSafe(pSeg.attr("flightNo"),""));
		$(d).find("input[name$='.newFlightDate']").val(nullSafe(pSeg.attr("flightDate"),""));
		$(d).find("input[name$='.newDepartTime']").val(nullSafe(pSeg.attr("departTime"),""));
		$(d).find("input[name$='.newArrivalTime']").val(nullSafe(pSeg.attr("arrivalTime"),""));
		$(d).find("input[name$='.cabinStatus']").val("A");
		$(d).find("input[name$='.newPrice']").val($(d).find("input[name$='.origPrice']").val());
		$(d).find("input[name$='.newPriceLevel']").val($(d).find("input[name$='.origPriceLevel']").val());
		$(d).find("input[name$='.newChangeCondition']").val($(d).find("input[name$='.origChangeCondition']").val());
		$(d).find("input[name$='.newRefundCondition']").val($(d).find("input[name$='.origRefundCondition']").val());
		$(d).find("input[name$='.newTransferCondition']").val($(d).find("input[name$='.origTransferCondition']").val());
		$(d).find("input[name$='.newCNCost']").val($(d).find("input[name$='.origCNCost']").val());
		$(d).find("input[name$='.newYQCost']").val($(d).find("input[name$='.origYQCost']").val());
	});
}

function disposeTicketPrice(pType, cost) {
	var inputs = $("#submitForm").find(".tktPrice"+pType);
	inputs.each(function(i, d) {
		var price = Number($(d).prev(".origTktPrice"+pType) .val());
		$(d).val(price + cost);
	});
}

function fareTR2OBJ(fareTR) {
	var fareObj = {};
	fareObj.fare = fareTR.find("input[name='price']").val();
	fareObj.fareLevel = fareTR.find("input[name='priceLevel']").val();
	fareObj.changeCondition = fareTR.find("input[name='changeCondition']").val();
	fareObj.refundCondition = fareTR.find("input[name='refundCondition']").val();
	fareObj.transferCondition = fareTR.find("input[name='transferCondition']").val();
	fareObj.cn = fareTR.find("input[name='cnCost']").val();
	fareObj.yq = fareTR.find("input[name='yqCost']").val();
	fareObj.changeRate = fareTR.find("select[name='changeRate']").val();
	fareObj.changeCost = fareTR.find("input[name='changeCost']").val();
	fareObj.upgradeCost = fareTR.find("input[name='upgradeCost']").val();
	fareObj.changeType = fareTR.find("input[name='changeType']").val();
	return fareObj;
}

function adultTR2ChildTR(adultTR, childTR) {
	childTR.find("input[name='price']").val(adultTR.find("input[name='price']").val());
	childTR.find("input[name='priceLevel']").val(adultTR.find("input[name='priceLevel']").val());
	childTR.find("input[name='changeCondition']").val(adultTR.find("input[name='changeCondition']").val());
	childTR.find("input[name='refundCondition']").val(adultTR.find("input[name='refundCondition']").val());
	childTR.find("input[name='transferCondition']").val(adultTR.find("input[name='transferCondition']").val());
	childTR.find("input[name='cnCost']").val(adultTR.find("input[name='cnCost']").val());
	childTR.find("input[name='yqCost']").val(adultTR.find("input[name='yqCost']").val());
	childTR.find("select[name='changeRate']").val(adultTR.find("select[name='changeRate']").val());
	childTR.find("input[name='changeCost']").val(adultTR.find("input[name='changeCost']").val());
	childTR.find("input[name='upgradeCost']").val(adultTR.find("input[name='upgradeCost']").val());
	childTR.find("input[name='changeType']").val(adultTR.find("input[name='changeType']").val());
}

function findFDFare(cabinTR, cIndex) {
	var params = getFareQueryParam(cabinTR, cIndex);
	ajaxRequest(basePath+"/sales-change/fdPrice/query", params, function(data) {
		genFareResult(cabinTR, cIndex, data);
	}, true, "POST");
}

function findPATFare(cabinTR, cIndex, prodCode) {
	var params = getFareQueryParam(cabinTR, cIndex, prodCode);
	ajaxRequest(basePath+"/sales-change/patPrice/query", params, function(data) {
		genFareResult(cabinTR, cIndex, data);
	}, true, "POST");
}

function getFareQueryParam(cabinTR, cIndex, prodCode) {
	var params = {};
	params['hasAdult'] = false;
	params['hasChild'] = false;
	params['hasInfant'] = false;
	
	var flightDate = cabinTR.find("input[name='flightDate']").val();
	params['flightDate'] = setFormatDate(flightDate);
	params['departTime'] = cabinTR.find("input[name='departTime']").val();
	params['carrier'] = cabinTR.find("input[name='carrier']").val();
	params['depart'] = cabinTR.find("input[name='depart']").val();
	params['arrival'] = cabinTR.find("input[name='arrival']").val();
	params['flightNo'] = cabinTR.find("input[name='flightNo']").val();
	params['cabin'] = cabinTR.find("input[name='cabin']").val();
	params['phyPrice'] = cabinTR.find("input[name='phyPrice']").val();
	params['productCode'] = nullSafe(prodCode, "");
	
	var adultDiv = $("#submitForm").find("div[pType='ADULT'][cType='1'][cIndex='"+cIndex+"']:first");
	if (adultDiv.length == 1) {
		params['origAdultPrice'] = adultDiv.find("input[name$='.origPrice']").val();
		params['origAdultCondition'] = adultDiv.find("input[name$='.origChangeCondition']").val();
		params['bigCoustomerCode'] = nullSafe(adultDiv.attr("bigGuest"), "");
		params['jlkCode'] = nullSafe(adultDiv.attr("jlkCode"), "");
		params['hasAdult'] = true;
	}
	var childDiv = $("#submitForm").find("div[pType='CHILD'][cType='1'][cIndex='"+cIndex+"']:first");
	if (childDiv.length == 1) {
		params['origChildPrice'] = childDiv.find("input[name$='.origPrice']").val();
		params['origChildCondition'] = childDiv.find("input[name$='.origChangeCondition']").val();
		params['hasChild'] = true;
	}
	var infantDiv = $("#submitForm").find("div[pType='INFANT'][cType='1'][cIndex='"+cIndex+"']:first");
	if (infantDiv.length == 1) {
		params['origInfantPrice'] = infantDiv.find("input[name$='.origPrice']").val();
		params['origInfantCondition'] = infantDiv.find("input[name$='.origChangeCondition']").val();
		params['hasInfant'] = true;
	}
	var searchDiv = $("#searchDiv"+cIndex);
	params['origCabin'] = searchDiv.find("input[name='cabin']").val();
	params['origFlightDate'] = searchDiv.find("input[name='origFlightDate']").val();
	params['origDepartTime'] = searchDiv.find("input[name='origDepartTime']").val();
	params['pnrCancelTime'] = $("#submitForm").find("input[name='pnrCancelTime']").val();
	return params;
}

function genFareResult(cabinTR, cIndex, data) {
	if (data.status == 0) {
		if (data.hasAdult) {
			$("#adultFares").find("tr").remove(".fareTR"+cIndex);
			$("#adultFares").append(genSearchFailTR(cabinTR, cIndex, "成人"));
		}
		if (data.hasChild) {
			$("#childFares").find("tr").remove(".fareTR"+cIndex);
			$("#childFares").append(genSearchFailTR(cabinTR, cIndex, "儿童"));
		}
		if (data.hasInfant) {
			$("#infantFares").find("tr").remove(".fareTR"+cIndex);
			$("#infantFares").append(genSearchFailTR(cabinTR, cIndex, "婴儿"));
		}
		return false;
	}
	if (data.hasAdult) genAdultFareResult(cabinTR, cIndex, data.adults);
	if (data.hasChild) genChildFareResult(cabinTR, cIndex, data.childs);
	if (data.hasInfant) genInfantFareResult(cabinTR, cIndex, data.infants);
}

function genAdultFareResult(cabinTR, cIndex, fares) {
	$("#adultFares").find("tr").remove(".fareTR"+cIndex);
	if (!fares || fares.length < 1) {
	    $("#adultFares").append(genSearchEmptyTR(cabinTR, cIndex, "成人"));
		return false;
	}
	for (var i=0; i<fares.length; i++) {
		var fareObj = fares[i];
		$("#adultFares").append(genFareTR(cabinTR, cIndex, "成人", fareObj, i));
	}
}

function genChildFareResult(cabinTR, cIndex, fares) {
	$("#childFares").find("tr").remove(".fareTR"+cIndex);
	var trSize = 0;
	if (!fares || fares.length < 1) {
	    $("#childFares").append(genSearchEmptyTR(cabinTR, cIndex, "儿童"));
	} else {
		for (var i=0; i<fares.length; i++) {
			var fareObj = fares[i];
			$("#childFares").append(genFareTR(cabinTR, cIndex, "儿童", fareObj, i));
			trSize += 1;
		}
	}
	/*var radios = $("#adultFares").find("input[name='fareRadio_"+cIndex+"_ADULT']:checked");
	if (radios.length == 1) {
		var fareTR = $(radios[0]).parent().parent();
		var fareObj = fareTR2OBJ(fareTR);
		$("#childFares").append(genFareTR(cabinTR, cIndex, "儿童与成人同价", fareObj, trSize));
	}*/
}

function genInfantFareResult(cabinTR, cIndex, fares) {
	$("#infantFares").find("tr").remove(".fareTR"+cIndex);
	if (!fares || fares.length < 1) {
	    $("#infantFares").append(genSearchEmptyTR(cabinTR, cIndex, "婴儿"));
		return false;
	}
	for (var i=0; i<fares.length; i++) {
		var fareObj = fares[i];
		$("#infantFares").append(genFareTR(cabinTR, cIndex, "婴儿", fareObj, i));
	}
}

function genFareTR(cabinTR, cIndex, pType, fareObj, i) {
	var typeCode = getTravellerType(pType);
	var attrs = "[pType='"+typeCode+"'][cType='1'][cIndex='"+cIndex+"']";
	var div = $("#submitForm").find("div"+attrs+":first");
	var oCabin = div.find("input[name$='.origCabin']").val();
	var oPrice = div.find("input[name$='.origPrice']").val();
	
	var depart = cabinTR.find("input[name='depart']").val();
	var arrival = cabinTR.find("input[name='arrival']").val();
	var cabin = cabinTR.find("input[name='cabin']").val();
	
	var tr = "<tr class='fareTR"+cIndex+"' pType='"+pType+"'>";
	tr += "<td>"+pType+"</td>";
	tr += "<td>"+cIndex+"</td>";
	tr += "<td>"+depart+"-"+arrival+"</td>";
	tr += "<td>"+oCabin+"-&gt;"+cabin+"</td>";
	tr += "<td>"+oPrice+"</td>";
	tr += "<td>"+fareObj.fare+"</td>";
	tr += "<td>"+fareObj.fareLevel+"</td>";
	tr += "<td>"+genChangeRateSelect(fareObj.changeRate, oPrice, fareObj.isVolun)+"</td>";
	tr += "<td>"+genChangeCostInput("changeCost", fareObj.changeCost, fareObj.isVolun)+"</td>";
	tr += "<td>"+genChangeCostInput("upgradeCost", fareObj.upgradeCost, fareObj.isVolun)+"</td>";
	tr += "<td><input type='radio' class='fareRadio_"+typeCode+"' name='fareRadio_"+cIndex+"_"+typeCode+"'";
	tr += " cIndex='"+cIndex+"' pType='"+typeCode+"'"+((i == 0)?" checked":"")+"/>";
	tr += genFareHidden(fareObj)+"</td></tr>";
	return tr;
}

function genChangeRateSelect(rate, gistPrice, isVolun) {
	var select = "<select class='changeRate' style='width:50px;' name='changeRate' price='"+gistPrice+"'";
	if (isVolun === false) {
		select += " disabled='disabled'";
	}
	select += "><option value='0'"+ ((rate == 0)?" selected":"") +">0%</option>";
	select += "<option value='5'"+ ((rate == 5)?" selected":"") +">5%</option>";
	select += "<option value='10'"+ ((rate == 10)?" selected":"") +">10%</option>";
	select += "<option value='15'"+ ((rate == 15)?" selected":"") +">15%</option>";
	select += "<option value='20'"+ ((rate == 20)?" selected":"") +">20%</option>";
	select += "<option value='30'"+ ((rate == 30)?" selected":"") +">30%</option>";
	select += "<option value='40'"+ ((rate == 40)?" selected":"") +">40%</option>";
	select += "<option value='50'"+ ((rate == 50)?" selected":"") +">50%</option>";
	select += "<option value='100'"+ ((rate == 100)?" selected":"") +">100%</option>";
	select += "</select>";
	return select;
}

function genChangeCostInput(name, value, isVolun) {
	var input = "<input type='text' style='width:50px;' name='"+name+"' value='"+value+"'";
	if (isVolun === false) {
		input += " readonly='readonly'";
	} else {
		input += " onkeyup=\"if(isNaN(value) || value.trim()==''){$(this).val('0');}\"/>";
	}
	return input;
}

function genFareHidden(fareObj) {
	var input = "<input type='hidden' name='price' value='"+fareObj.fare+"'/>";
	input += "<input type='hidden' name='priceLevel' value='"+fareObj.fareLevel+"'/>";
	input += "<input type='hidden' name='changeCondition' value='"+fareObj.changeCondition+"'/>";
	input += "<input type='hidden' name='refundCondition' value='"+fareObj.refundCondition+"'/>";
	input += "<input type='hidden' name='transferCondition' value='"+fareObj.transferCondition+"'/>";
	input += "<input type='hidden' name='cnCost' value='"+fareObj.cn+"'/>";
	input += "<input type='hidden' name='yqCost' value='"+fareObj.yq+"'/>";
	input += "<input type='hidden' name='changeType' value='"+fareObj.changeType+"'/>";
	return input;
}

function getTravellerType(type) {
	if (type == "成人") {
		return "ADULT";
	} else if (type == "儿童") {
		return "CHILD";
	} else if (type == "儿童与成人同价") {
		return "CHILD";
	} else if (type == "婴儿") {
		return "INFANT";
	}
	return "";
}

function customFareResult(cabin, cIndex, pType) {
	var typeCode = getTravellerType(pType);
	var attrs = "[pType='"+typeCode+"'][cType='1'][cIndex='"+cIndex+"']";
	var div = $("#submitForm").find("div"+attrs+":first");
	
	var fareObj = {};
	fareObj.isVolun = false;
	fareObj.changeRate = 0;
	fareObj.changeCost = 0;
	fareObj.upgradeCost = 0;
	fareObj.fare = div.find("input[name$='.origPrice']").val();
	fareObj.fareLevel = div.find("input[name$='.origPriceLevel']").val();
	fareObj.changeCondition = div.find("input[name$='.origChangeCondition']").val();
	fareObj.refundCondition = div.find("input[name$='.origRefundCondition']").val();
	fareObj.transferCondition = div.find("input[name$='.origTransferCondition']").val();
	fareObj.cn = div.find("input[name$='.origCNCost']").val();
	fareObj.yq = div.find("input[name$='.origYQCost']").val();
	fareObj.changeType = 1;
	var oCabin = div.find("input[name$='.origCabin']").val();
	if (oCabin != cabin) fareObj.changeType = 2;
	return fareObj;
}

function fareSearchingPrompt(cabinTR, cIndex) {
	var adultCount = $("#searchForm").find("input[name='adultCount']").val();
	var childCount = $("#searchForm").find("input[name='childCount']").val();
	var infantCount = $("#searchForm").find("input[name='infantCount']").val();
	if (Number(adultCount) > 0) {
		$("#adultFares").find("tr").remove(".fareTR"+cIndex);
		$("#adultFares").append(genSearchingTR(cabinTR, cIndex, "成人"));
	}
	if (Number(childCount) > 0) {
		$("#childFares").find("tr").remove(".fareTR"+cIndex);
		$("#childFares").append(genSearchingTR(cabinTR, cIndex, "儿童"));
	}
	if (Number(infantCount) > 0) {
		$("#infantFares").find("tr").remove(".fareTR"+cIndex);
		$("#infantFares").append(genSearchingTR(cabinTR, cIndex, "婴儿"));
	}
}

function fareInfoReset(cIndex) {
	var adultCount = $("#searchForm").find("input[name='adultCount']").val();
	var childCount = $("#searchForm").find("input[name='childCount']").val();
	var infantCount = $("#searchForm").find("input[name='infantCount']").val();
	if (Number(adultCount) > 0) {
		$("#adultFares").find("tr").remove(".fareTR"+cIndex);
	}
	if (Number(childCount) > 0) {
		$("#childFares").find("tr").remove(".fareTR"+cIndex);
	}
	if (Number(infantCount) > 0) {
		$("#infantFares").find("tr").remove(".fareTR"+cIndex);
	}
	var trs = $(".fareInfo").find("tr:visible");
	if (trs.length < 2) $(".fareInfo").hide();
}

function genSearchingTR(cabinTR, cIndex, pType) {
	var depart = cabinTR.find("input[name='depart']").val();
	var arrival = cabinTR.find("input[name='arrival']").val();
	
	var tr = "<tr class='fareTR"+cIndex+"'>";
	tr += "<td>"+pType+"</td>";
	tr += "<td>"+cIndex+"</td>";
	tr += "<td>"+depart+"-"+arrival+"</td>";
	tr += "<td colspan='8'>正在查询运价....</td></tr>";
	return tr;
}

function genSearchEmptyTR(cabinTR, cIndex, pType) {
	var depart = cabinTR.find("input[name='depart']").val();
	var arrival = cabinTR.find("input[name='arrival']").val();
	
	var tr = "<tr class='fareTR"+cIndex+"'>";
	tr += "<td>"+pType+"</td>";
	tr += "<td>"+cIndex+"</td>";
	tr += "<td>"+depart+"-"+arrival+"</td>";
	tr += "<td colspan='8'><font color=red>没有符合条件的运价, 请使用手工处理！</font></td></tr>";
	return tr;
}

function genSearchFailTR(cabinTR, cIndex, pType) {
	var depart = cabinTR.find("input[name='depart']").val();
	var arrival = cabinTR.find("input[name='arrival']").val();
	
	var tr = "<tr class='fareTR"+cIndex+"'>";
	tr += "<td>"+pType+"</td>";
	tr += "<td>"+cIndex+"</td>";
	tr += "<td>"+depart+"-"+arrival+"</td>";
	tr += "<td colspan='7'><font color=red>"+pType+"运价查询失败，请重试！</font></td>";
	tr += "<td><a class='Btn Btn-blue reFindFareBtn' cIndex='"+cIndex+"'><span>查询</span></a></td></tr>";
	return tr;
}

function parsePrice(price) {
	if (price != 0 && (price+"").indexOf(".") == -1) {
		return price + ".0";
	}
	return price;
}

function nullSafe(actual, safe) {
	if (!actual || actual == null || actual == "null") {
		return safe;
	}
	return actual;
}