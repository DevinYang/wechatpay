var hasSearchBigCode = false;
var singlePrice1_pnr_1 = 0;
var singleCN1_pnr_1 = 0;
var singleYQ1_pnr_1 = 0;
var singlePrice2_pnr_1 = 0;
var singleYQ2_pnr_1 = 0;
var singlePrice3_pnr_1 = 0;
var insurance = 0;
var hasChild;
var hasInfant;

function claInsure(){
	updateTotalPrice();
	
	var travellerSize = $("input[name=insurance]:checked").length;
	var segmentSize = $("input[name=segmentInsurance]:checked").length;
	insurance = travellerSize * segmentSize * 20;
	var totalFare = insurance + Number($("#totalPrice").text()) + Number($("#totalCN").text())+ Number($("#totalYQ").text());
	$("#totalFare").html(totalFare + ".0");
	$("#totalInsuranceText").text(insurance + ".0");
	$("#totalInsurance").val(insurance + ".0");
	$("#totalInsurancePnr").val(insurance + ".0");
}

$(function(){
	$(".pnrCode").blur(function(){
		var value = $(this).val();
		$(this).attr("value",value.toUpperCase());
	});
	$("input[name=segmentInsurance]").change(function(){//航段保险
		var checked = $(this).attr("checked");
		var val = $(this).val();
		if(checked == true){
			$(".segmentInsurance_pnr_" + val).attr("disabled",false);
			$(".segmentInsuranceInput_" + val).attr("disabled",false);
			var travellerSize = $("input[name=insurance]:checked").length;
			if(travellerSize == 0){
				$("input[name=insurance]").each(function(){
					$(this).attr("checked", true);
					$(".insurance_pnr_" + $(this).val()).attr("disabled",false);
					$(".insuranceInput_" + $(this).val()).attr("disabled",false);
				});
			}
		}else{
			$(".segmentInsurance_pnr_" + val).attr("disabled",true);
			$(".segmentInsuranceInput_" + val).attr("disabled",true);
			var segmentSize = $("input[name=segmentInsurance]:checked").length;
			if(segmentSize == 0){
				$("input[name=insurance]").each(function(){
					$(this).attr("checked", false);
					$(".insurance_pnr_" + $(this).val()).attr("disabled",true);
					$(".insuranceInput_" + $(this).val()).attr("disabled",true);
				});
			}
		}
		claInsure();
	});

	$("input[name=insurance]").change(function(){//旅客保险
		var checked = $(this).attr("checked");
		var val = $(this).val();
		if(checked == true){
			$(".insurance_pnr_" + val).attr("disabled",false);
			$(".insuranceInput_" + val).attr("disabled",false);
			var segmentSize = $("input[name=segmentInsurance]:checked").length;
			if(segmentSize == 0){
				$("input[name=segmentInsurance]:first").attr("checked", true);
				$(".segmentInsurance_pnr_0").attr("disabled",false);
				$(".segmentInsuranceInput_0").attr("disabled",false);
			}
		}else{
			$(".insurance_pnr_" + val).attr("disabled",true);
			$(".insuranceInput_" + val).attr("disabled",true);
			var travellerSize = $("input[name=insurance]:checked").length;
			if(travellerSize == 0){
				$("input[name=segmentInsurance]").each(function(){
					$(this).attr("checked", false);
					$(".segmentInsurance_pnr_"+$(this).val()).attr("disabled",true);
					$(".segmentInsuranceInput_"+$(this).val()).attr("disabled",true);
				});
			}
		}
		claInsure();
	});

});
//审核大客户号
function checkBigcustomerCode(code){
	var reg = /^[a-zA-Z]{0,3}\d{7}$/;
	if(!reg.test(code)){
		
		return false;
	}
	return true ;
}
//验证护照
function checkPassCard(code){
	var reg = /^(P\d{7}|G\d{8}|S\d{7,8}|D\d+|1[4,5]\d{7})$/;
	if(!reg.test(code)){
		return false;
	}
	return true;
}
//验证输入的pnr代码是否有错
function checkPnrSubmit(){
	var pnrCodes = $(".pnrCode");
	var reg = /^[a-zA-Z0-9]{6}$/;
	var flag = true;
	var code1 = $(pnrCodes[0]).val();
	var code2 = $(pnrCodes[1]).val();
	var code3 = $(pnrCodes[2]).val();
	var codes = [];
	if(code1!=""){codes.push(code1);}
	if(code2!=""){codes.push(code2);}
	if(code3!=""){codes.push(code3);}
	if(codes.length==0){
		Dialog.alert("至少录入一个PNR号！");
		return false;
	}else if(codes.length==1){
		$(pnrCodes[0]).attr("value",codes[0]);
		$(pnrCodes[1]).attr("value","");
		$(pnrCodes[2]).attr("value","");
	}else if(codes.length==2){
		$(pnrCodes[0]).attr("value",codes[0]);
		$(pnrCodes[1]).attr("value",codes[1]);
		$(pnrCodes[2]).attr("value","");
	}
	var code1 = $(pnrCodes[0]).val();
	var code2 = $(pnrCodes[1]).val();
	var code3 = $(pnrCodes[2]).val();
	
	if(!reg.test(code1)){
		Dialog.alert("PNR号输入有误，只允许为数字、英文字母，请重新输入！");
		return false;
	}
	if(code2 != "" && !reg.test(code2)){
		Dialog.alert("PNR号输入有误，只允许为数字、英文字母，请重新输入！");
		return false;
	}
	if(code3 != "" && !reg.test(code3)){
		Dialog.alert("PNR号输入有误，只允许为数字、英文字母，请重新输入！");
		return false;
	}
	if(code1 == code2 || code1 == code3 || (code2!="" && code2 == code3)){
		Dialog.alert("输入框不能输入相同的PNR！");
		return false;
	}
	return flag;
}
//普通运价查询设值
function setNormalFare(data){

	if(data.status == 0){
		if(data.hasAdult){setAdultGeneralCustomerFareFail();}
		if(data.hasChild){setChildGeneralCustomerFareFail(data.hasAdult);}
		if(data.hasInfant){setInfantGeneralCustomerFareFail();}
	}
	if(data.status == 1){
		var useCondition = data.adultUseConditiones;
		var useConditionDetail = data.adultUseConditionesDetail;
		if(useCondition == null){useCondition = data.childUseConditiones;}
		if(useCondition == null){useCondition = data.childUseConditiones;}
		if(data.hasAdult){setAdultGeneralCustomerFare(data.adults,useConditionDetail,useCondition,data.flightType);}
		if(data.hasChild){setChildGeneralCustomerFare(data.childs,useCondition,data.hasAdult);}
		if(data.hasInfant){setInfantGeneralCustomerFare(data.infants);}
	}
	
}


//普通客户查询运价等待状态
function normalCustomerFareSearchTime(hasAdult,hasChild,hasInfant){
	if(hasAdult){
		$("#adultGeneralCustomer").empty();
		$("#adultGeneralCustomer").append(
				"<tr>"
				+"<td>成人</td>"
				+"<td></td>"
				+"<td></td>"
				+"<td></td>"
				+"<td></td>"
				+"<td></td>"
				+"<td></td>"
				+"<td>正在查询运价....</td>"
				+"</tr>"
				);
	}
	
	if(hasChild){
		
		$("#childGeneralCustomer").empty();
		$("#childGeneralCustomer").append(
				"<tr>"
				+"<td>儿童</td>"
				+"<td></td>"
				+"<td></td>"
				+"<td></td>"
				+"<td></td>"
				+"<td></td>"
				+"<td></td>"
				+"<td>正在查询运价....</td>"
				+"</tr>"
				);
	}
	if(hasInfant){
		
		$("#infantGeneralCustomer").empty();
		$("#infantGeneralCustomer").append(
				"<tr>"
				+"<td>婴儿</td>"
				+"<td></td>"
				+"<td></td>"
				+"<td></td>"
				+"<td></td>"
				+"<td></td>"
				+"<td></td>"
				+"<td>正在查询运价....</td>"
				+"</tr>"
				);
	}
}

//成人普通运价成功
function setAdultGeneralCustomerFare(adultFare,useConditionDetail,useCondition,flightLength){
	$("#adultGeneralCustomer").empty();
	$("#adultKingCardCustomer").empty();

	if(adultFare == ""){
		$("#adultGeneralCustomer").append(
				"<tr>"
				+"<td colspan='8' align=center><font color=red>该航班航班不能被预定，请选择其他航班！</font></td>"
				+"</tr>"
				);
		$("#childGeneralCustomer").empty();
		$("#infantGeneralCustomer").empty();
		$("#infantGeneralCustomer").empty();
		$("#adultKingCardCustomer").append(
				"<tr>"
				+"<td colspan='8' align=center><font color=red>该航班航班不能被预定，请选择其他航班！</font></td>"
				+"</tr>"
				);
		return ;
		}
	
	if(adultFare != ""){
		for(var i =0;i< adultFare.length;i++){
			var discount = (adultFare[i].discount>=10)?"全价":Number(adultFare[i].discount)+"折";
			$("#adultGeneralCustomer").append(
					"<tr class='alink-st'>"
					+"<td>成人</td>"
					+"<td ><span id='adultdiscount1"+adultFare[i].sfcSeq+"'>"+discount+"</span></td>"
					+"<td><span id='adultprice1"+adultFare[i].sfcSeq+"'>"+adultFare[i].fare+"/"+(adultFare[i].fare+adultFare[i].cn+adultFare[i].yq)+"</span></td>"
					+"<td><span id='adultpriceLevel1"+adultFare[i].sfcSeq+"'>"+adultFare[i].fareLevel+"</span></td>"
					+"<td>"+adultFare[i].cn+"</td>"
					+"<td><span id='adultyq1"+adultFare[i].sfcSeq+"'>"+adultFare[i].yq+"</span></td>"
					+"<td><span id='adultuseCondition1"+adultFare[i].sfcSeq+"'><a title=\""+useCondition[i]+"\" >运价规则</a></span></td>"
					+"<td><input type=\"radio\" name=\"adultsRadio\" onclick=chooseFare(\""+adultFare[i].sfcSeq+"\",\"adultSFC\",\"1\",\""+adultFare[i].fare+"\",\""+adultFare[i].cn+"\",\""+adultFare[i].yq+"\",\""+useConditionDetail+"\",this) /></td>"
					+"</tr>"
					);
			var price =  Number((Math.ceil(adultFare[i].fare/20)*10));
			if((price/10)%2==1&&flightLength>1){
				price += 10;
			}
			$("#adultKingCardCustomer").append(
					"<tr class='alink-st'>"
					+"<td>成人</td>"
					+"<td>"+(Math.floor(adultFare[i].discount*5)/10)+"折</td>"
					+"<td>"+price+"/"+(price+adultFare[i].cn+adultFare[i].yq)+"</td>"
					+"<td>"+adultFare[i].fareLevel+"</td>"
					+"<td>"+adultFare[i].cn+"</td>"
					+"<td>"+adultFare[i].yq+"</td>"
					+"<td><a title=\""+useCondition[i]+"\">运价规则</a></td>"
					+"<td><input type=\"radio\" name=\"adultsRadio\" onclick=chooseFare(\""+adultFare[i].sfcSeq+"\",\"adultSFC\",\"3\",\""+price+"\",\""+adultFare[i].cn+"\",\""+adultFare[i].yq+"\",\""+useConditionDetail+"\",this) /></td>"
					+"</tr>"
					);
			}
		}
	}
//成人普通运价失败
function setAdultGeneralCustomerFareFail(){
	
	$("#adultGeneralCustomer").empty();
	$("#adultKingCardCustomer").empty();
	$("#adultGeneralCustomer").append(
			"<tr>"
			+"<td>成人</td>"
			+"<td colspan='6' align='center'><font color='red'>成人运价查询失败，请重试！</font></td>"
			+"<td><a href=\"javascript:searchSingleTypeCustomerFare(true,false,false)\" class='Btn Btn-blue'><span>查询</span></a></td>"
			+"</tr>"
			);
	$("#adultKingCardCustomer").append(
			"<tr>"
			+"<td>金鹿卡</td>"
			+"<td colspan='6' align='center'><font color='red'>金鹿卡运价查询失败，请重试！</font></td>"
			+"<td><a href=\"javascript:searchSingleTypeCustomerFare(true,false,false)\" class='Btn Btn-blue'><span>查询</span></a></td>"
			+"</tr>"
			);
}
//儿童普通运价失败
function setChildGeneralCustomerFareFail(hasAdult){
	
	$("#childGeneralCustomer").empty();
	$("#childGeneralCustomer").append(
			"<tr>"
			+"<td>儿童</td>"
			+"<td colspan='6' align='center'><font color='red'>儿童运价查询失败，请重试！</font></td>"
			+"<td><a href=\"javascript:searchSingleTypeCustomerFare(false,true,false)\" class='Btn Btn-blue'><span>查询</span></a></td>"
			+"</tr>"
			);
	if(!hasAdult){return ;}
	$("#childGeneralCustomer").append(
			"<tr class='alink-st'>"
			+"<td>儿童与成人同价</td>"
			+"<td id='childdiscount1'></td>"
			+"<td id='childprice1'></td>"
			+"<td id='childpriceLevel1' ></td>"
			+"<td></td>"
			+"<td  id='childyq1'></td>"
			+"<td id='childuseCondition1'></td>"
			+"<td><input type=\"radio\" name=\"childsRadio\" onclick=chooseFare(\"10\",\"childSFC\",\"1\",\"0\",\"0\",\"0\",\"\",this) /></td>"
			+"</tr>"
			);
}
//儿童普通运价成功
function setChildGeneralCustomerFare(childsFare,useCondition,hasAdult){
	$("#childGeneralCustomer").empty();
	if(childsFare != ""){
		for(var i =0;i< childsFare.length;i++){
			var discount = (childsFare[i].discount>=10)?"全价":Number(childsFare[i].discount)+"折";
			$("#childGeneralCustomer").append(
			"<tr class='alink-st'>"
			+"<td>儿童</td>"
			+"<td>"+discount+"</td>"
			+"<td>"+childsFare[i].fare+"/"+(childsFare[i].fare+childsFare[i].yq)+"</td>"
			+"<td>"+childsFare[i].fareLevel+"</td>"
			+"<td></td>"
			+"<td>"+childsFare[i].yq+"</td>"
			+"<td><a title=\""+useCondition[i]+"\">运价规则</a></td>"
			+"<td><input type=\"radio\" name=\"childsRadio\" onclick=chooseFare(\""+childsFare[i].sfcSeq+"\",\"childSFC\",\"1\",\""+childsFare[i].fare+"\",\"0\",\""+childsFare[i].yq+"\",\"\",this) /></td>"
			+"</tr>"
			);
		}
	}else{
		$("#childGeneralCustomer").append(
				"<tr>"
				+"<td colspan='8' align=center><font color=red>该航班航班不能被预定，请选择其他航班！</font></td>"
				+"</tr>"
				);
	}
	if(!hasAdult){return ;}
	$("#childGeneralCustomer").append(
			"<tr class='alink-st'>"
			+"<td>儿童与成人同价</td>"
			+"<td id='childdiscount1'></td>"
			+"<td id='childprice1'></td>"
			+"<td id='childpriceLevel1' ></td>"
			+"<td></td>"
			+"<td  id='childyq1'></td>"
			+"<td id='childuseCondition1'></td>"
			+"<td><input type=\"radio\" name=\"childsRadio\"  onclick=chooseFare(\"10\",\"childSFC\",\"1\",\"0\",\"0\",\"0\",\"\",this) /></td>"
			+"</tr>"
			);
}
//婴儿普通运价查询成功
function setInfantGeneralCustomerFare(infantsFare){
	$("#infantGeneralCustomer").empty();
	if(infantsFare != ""){
		
		for(var i =0;i<infantsFare.length;i++){
			
			$("#infantGeneralCustomer").append(
			"<tr class='alink-st'>"
			+"<td>婴儿</td>"
			+"<td>"+Number(infantsFare[i].discount)+"折</td>"
			+"<td>"+infantsFare[i].fare+"/"+infantsFare[i].fare+"</td>"
			+"<td>"+infantsFare[i].fareLevel+"</td>"
			+"<td></td>"
			+"<td></td>"
			+"<td><a title=\"免费退改签\">运价规则</a></td>"
			+"<td><input type=\"radio\" name=\"infantsRadio\" onclick=chooseFare(\""+infantsFare[i].sfcSeq+"\",\"infantSFC\",\"1\",\""+infantsFare[i].fare+"\",\"0\",\"0\",\"\",this) /></td>"
			+"</tr>"
			);
			$("#infantKingCardCustomer").append(
					"<tr class='alink-st'>"
					+"<td>婴儿</td>"
					+"<td>"+Number(infantsFare[i].discount)+"折</td>"
					+"<td>"+infantsFare[i].fare+"/"+infantsFare[i].fare+"</td>"
					+"<td>"+infantsFare[i].fareLevel+"</td>"
					+"<td></td>"
					+"<td></td>"
					+"<td><a title=\"免费退改签\">运价规则</a></td>"
					+"<td><input type=\"radio\" name=\"infantsRadio\" onclick=chooseFare(\""+infantsFare[i].sfcSeq+"\",\"infantSFC\",\"3\",\""+infantsFare[i].fare+"\",\"0\",\"0\",\"\",this) /></td>"
					+"</tr>"
					);
		}
	}else{
		
		$("#infantGeneralCustomer").append(
				"<tr>"
				+"<td colspan='8' align=center><font color=red>该航班航班不能被预定，请选择其他航班！</font></td>"
				+"</tr>"
				);
		$("#infantKingCardCustomer").append(
				"<tr>"
				+"<td colspan='9' align=center><font color=red>该航班航班不能被预定，请选择其他航班！</font></td>"
				+"</tr>"
				);
	}
}
//婴儿普通查询失败
function setInfantGeneralCustomerFareFail(){
	$("#infantGeneralCustomer").empty();
	$("#infantGeneralCustomer").append(
		"<tr>"
		+"<td>婴儿</td>"
		+"<td colspan='6' align='center'><font color='red'>婴儿运价查询失败，请重试！</font></td>"
		+"<td><a href=\"javascript:searchSingleTypeCustomerFare(false,false,true)\" class='Btn Btn-blue'><span>查询</span></a></td>"
		+"</tr>"
	);
}
function chooseFare(sfc,id,type,fare,cn,yq,useConditionDetail,obj){
	
	
	
	
	var pageFareType = $("#fareType_pnr_1").val();
	if(pageFareType != type){
		
		$("#fareType_pnr_1").attr('value',type);

		$("#adultSFC").attr("value",0);
		$("#childSFC").attr("value",0);
		$("#infantSFC").attr("value",0);
		$("input[name='adultsRadio']").attr("checked",false);
		$("input[name='childsRadio']").attr("checked",false);
		$("input[name='infantsRadio']").attr("checked",false);
		$(obj).attr('checked',true);
		//用于统计的价格
		singlePrice1_pnr_1 = 0;
		singleCN1_pnr_1 = 0;
		singleYQ1_pnr_1 = 0;
		singlePrice2_pnr_1 = 0;
		singleYQ2_pnr_1 = 0;
		singlePrice3_pnr_1 = 0;
		
	}


	$("#"+id).attr("value",sfc);
	if(id.indexOf("adultSFC")>-1){
		$("#useCondition").attr("value",useConditionDetail);
		singlePrice1_pnr_1 = fare;
		singleCN1_pnr_1 = cn;
		singleYQ1_pnr_1 = yq;
		if($("#childSFC").val()==10){
			
			/****************************************/
			var adultLastPart = type+""+$("#adultSFC").attr("value");
			$("#childdiscount"+type).text("");
			if(type==2){$("#childcode"+type).text("");$("#childcode"+type).html($("#adultcode"+adultLastPart).html());}
			$("#childprice"+type).text("");
			$("#childpriceLevel"+type).text("");
			$("#childyq"+type).text("");
			$("#childuseCondition"+type).text("");
			$("#childdiscount"+type).text($("#adultdiscount"+adultLastPart).text());
			$("#childprice"+type).text($("#adultprice"+adultLastPart).text());
			singlePrice2_pnr_1 = $("#adultprice"+adultLastPart).text();
			$("#childpriceLevel"+type).text($("#adultpriceLevel"+adultLastPart).text());
			var adultyq = (Math.floor(Number($("#adultyq"+adultLastPart).text())/20)*10);
			$("#childyq"+type).text(adultyq);
			singleYQ2_pnr_1 = adultyq;
			$("#childuseCondition"+type).html($("#adultuseCondition"+adultLastPart).html());
			/****************************************/
		}
	}
	if(id.indexOf("childSFC")>-1){
		//儿童与成人同价
		if(sfc==10){
			//未选择成人运价
			if($("#adultSFC").val()==0){
				Dialog.alert("请先选择成人运价！");
				$(obj).attr('checked',false);
				return ;
			}
			var adultLastPart = type+""+$("#adultSFC").attr("value");
			$("#childdiscount"+type).text("");
			if(type==2){$("#childcode"+type).text("");$("#childcode"+type).html($("#adultcode"+adultLastPart).html());}
			$("#childprice"+type).text("");
			$("#childpriceLevel"+type).text("");
			$("#childyq"+type).text("");
			$("#childuseCondition"+type).text("");
			$("#childdiscount"+type).text($("#adultdiscount"+adultLastPart).text());
			var str =$("#adultprice"+adultLastPart).text();
			var adultExceptShuiPrice = Number(str.split("/")[0]);
			$("#childpriceLevel"+type).text($("#adultpriceLevel"+adultLastPart).text());
			var childyq = (Math.floor(Number($("#adultyq"+adultLastPart).text())/20)*10);
			$("#childprice"+type).text(adultExceptShuiPrice+"/"+(adultExceptShuiPrice+childyq));
			$("#childyq"+type).text(childyq);
			var adultyq = (Math.floor(Number($("#adultyq"+adultLastPart).text())/20)*10);
			yq = adultyq;
			fare = adultExceptShuiPrice;
			$("#childuseCondition"+type).html($("#adultuseCondition"+adultLastPart).html());
		}
		
		singlePrice2_pnr_1 = fare;
		singleYQ2_pnr_1 = yq;
		if(sfc!=10){
			cleanSamePrice(type);
		}
	}
	if(id.indexOf("infantSFC")>-1){
		singlePrice3_pnr_1 = fare;
	}
	var adultCount = 0;
	var childCount = 0;
	var infantCount = 0;
	
	adultCount = $("#adultCount_pnr_1").val();
	childCount = $("#childCount_pnr_1").val();
	infantCount = $("#infantsCount_pnr_1").val();
	var totalPrice = singlePrice1_pnr_1*adultCount + singlePrice2_pnr_1*childCount+singlePrice3_pnr_1*infantCount;
	var totalCn = singleCN1_pnr_1*adultCount;
	var totalYQ = singleYQ1_pnr_1*adultCount + singleYQ2_pnr_1*childCount;
	var totalFare = insurance +totalPrice + totalCn+totalYQ;
	$("#totalPrice").html(totalPrice);
	$("#totalCN").html(totalCn);
	$("#totalYQ").html(totalYQ);
	$("#totalFare").html(totalFare);
}
//清除儿童成人同价的价格
function cleanSamePrice(type){
	$("#childdiscount"+type).html("");
	$("#childprice"+type).html("");
	$("#childpriceLevel"+type).html("");
	$("#childyq"+type).html("");
	$("#childuseCondition"+type).html("");
}
//审核联系人
function checkLinkMsg(){
	var linkName = $("#contactName").val();
	if(linkName.length == 0){
		
		Dialog.alert("联系人姓名不能为空！");
		return false;
	}
	if(linkName.length>40){
		
		Dialog.alert("联系人姓名长度不能大于40！");
		return false;
	}
	reg = /^1[3-9]\d{9}$/;
	reg2 = /^\d{3,4}-?\d{7,8}$/;
	if(!reg.test($("#contactPhone").val())){
		
		Dialog.alert("联系人手机不合法！");
		return false;
	}
	if($("#contactBackPhone").val()!=""){
		if(!reg.test($("#contactBackPhone").val())&&!reg2.test($("#contactBackPhone").val())){
				
			Dialog.alert("联系人备用电话不合法！");
			return false;

		}
		
	}
	var reserveTicketTime = $("#reserveTicketTime").val();
	var reserveTicketDate = $("#reserveTicketDate").val();
	var reserveTicketDateReg = /^\s?\d{4}-(0||1)\d{1}-\d{1,2}\s?$/;
	var reserveTicketTimeReg = /^\s?\d{1,2}:\d{1,2}\s?$/;
	if(!reserveTicketDateReg.test(reserveTicketDate) || !reserveTicketTimeReg.test(reserveTicketTime)){
		Dialog.alert("留票时限有误！");
		return false;
	}
	//验证留票时限大于当前时间小余第一航班起飞时间
	var dateStr = reserveTicketDate.split("-");
	var time1 = reserveTicketTime.split(":");
	var limitTime = new Date(dateStr[0],dateStr[1]-1,dateStr[2],time1[0],time1[1]);
	var nowtime = new Date();
	var flightTime = $("#flightTime_"+1).val().split(" ");
	var flightDate = flightTime[0].split("-");
	var time2 = flightTime[1];
	var flight = new Date(flightDate[0],flightDate[1]-1,flightDate[2],time2.substring(0,2),time2.substring(2,4));
	if(limitTime.getTime()>flight.getTime()){
		Dialog.alert("留票时限不能大于最早航班起飞时间！");
		return false;
	}
	if(limitTime.getTime()<nowtime.getTime()){
		Dialog.alert("留票时限不能小于当前时间！");
		return false;
	}
	return true;
}
function setCustomerFare(){

	$("#normalFareclass").removeClass("bg-green");
	$("#normalFareclass").addClass("bg-green1");
	
	$("#bigCustomerFareclass").removeClass("bg-green1");
	$("#bigCustomerFareclass").addClass("bg-green");
	
	$("#kingCardFareclass").removeClass("bg-green1");
	$("#kingCardFareclass").addClass("bg-green");
	

	setTab('voss_too',1,3);
}
function setBigCodeCustomerFare(){
	
	$("#normalFareclass").removeClass("bg-green1");
	$("#normalFareclass").addClass("bg-green");
	
	$("#bigCustomerFareclass").removeClass("bg-green");
	$("#bigCustomerFareclass").addClass("bg-green1");
	
	$("#kingCardFareclass").removeClass("bg-green1");
	$("#kingCardFareclass").addClass("bg-green");
	
	$("input[name='adults']").attr("checked",false);
	$("input[name='childs']").attr("checked",false);
	$("input[name='infants']").attr("checked",false);
	setTab('voss_too',2,3);
}
//大客户运价
function setBigRealTimeFare(data){

	var useConditionDetail = data.adultUseConditionesDetail;
	var useCondition = data.adultUseConditiones;
	var hasAdult = data.hasAdult;
	var hasChild = data.hasChild;
	var hasInfant = data.hasInfant;
	if(data.status==0){
		
		if(hasAdult){setAdultBigCustomerFareFail();}
		if(hasChild){setChildBigCustomerFareFail(hasAdult);}
		if(hasInfant){setInfantBigCustomerFareFail();}
	}
	if(data.status==1){
		
		if(hasAdult){setAdultBigCustomerFare(data.adults,useConditionDetail,useCondition);}
		if(hasChild){setChildBigCustomerFare(data.childs,useCondition,hasAdult);}
		if(hasInfant){setInfantBigCustomerFare(data.infants);}
		hasSearchBigCode = true ;
	}
	
}

//普通客户查询运价等待状态
function normalCustomerFareSearchTime(hasAdult,hasChild,hasInfant,specialTicket){
	if(specialTicket!=1){
	if(hasAdult){
		$("#adultGeneralCustomer").empty();
		$("#adultGeneralCustomer").append(
				"<tr>"
				+"<td>成人</td>"
				+"<td></td>"
				+"<td></td>"
				+"<td></td>"
				+"<td></td>"
				+"<td></td>"
				+"<td></td>"
				+"<td>正在查询运价....</td>"
				+"</tr>"
				);
	}
	
	if(hasChild){
		
		$("#childGeneralCustomer").empty();
		$("#childGeneralCustomer").append(
				"<tr>"
				+"<td>儿童</td>"
				+"<td></td>"
				+"<td></td>"
				+"<td></td>"
				+"<td></td>"
				+"<td></td>"
				+"<td></td>"
				+"<td>正在查询运价....</td>"
				+"</tr>"
				);
	}
	}
	if(hasInfant){
		
		$("#infantGeneralCustomer").empty();
		$("#infantGeneralCustomer").append(
				"<tr>"
				+"<td>婴儿</td>"
				+"<td></td>"
				+"<td></td>"
				+"<td></td>"
				+"<td></td>"
				+"<td></td>"
				+"<td></td>"
				+"<td>正在查询运价....</td>"
				+"</tr>"
				);
	}
}
//大客户查询状态
function bigCustomerFareSearchTime(hasAdult,hasChild,hasInfant){
	if(hasAdult){
		$("#adultBigCustomer").empty();
		$("#adultBigCustomer").append(
				"<tr>"
				+"<td>成人</td>"
				+"<td></td>"
				+"<td></td>"
				+"<td></td>"
				+"<td></td>"
				+"<td></td>"
				+"<td></td>"
				+"<td>正在查询运价....</td>"
				+"</tr>"
				);
		}
	if(hasChild){
		$("#childBigCustomer").empty();
		$("#childBigCustomer").append(
				"<tr>"
				+"<td>儿童</td>"
				+"<td></td>"
				+"<td></td>"
				+"<td></td>"
				+"<td></td>"
				+"<td></td>"
				+"<td></td>"
				+"<td>正在查询运价....</td>"
				+"</tr>"
				);
		}
	if(hasInfant){
		$("#infantBigCustomer").empty();
		$("#infantBigCustomer").append(
				"<tr>"
				+"<td>婴儿</td>"
				+"<td></td>"
				+"<td></td>"
				+"<td></td>"
				+"<td></td>"
				+"<td></td>"
				+"<td></td>"
				+"<td>正在查询运价....</td>"
				+"</tr>"
				);
		}
	setBigCodeCustomerFare();
}
//大客户成人运价成功
function setAdultBigCustomerFare(adultFare,useConditionDetail,useCondition){
	$("#adultBigCustomer").empty();
	if(adultFare != ""){
		var code = adultFare[0].bigCustomerCode;
		for(var i =0;i< adultFare.length;i++){
			var discount = (adultFare[i].discount>=10)?"全价":Number(adultFare[i].discount)+"折";
			$("#adultBigCustomer").append(
			"<tr class='alink-st'>"
			+"<td>成人</td>"
			+"<td><span id='adultcode2"+adultFare[i].sfcSeq+"'>"+code+"</span></td>"
			+"<td><span id='adultdiscount2"+adultFare[i].sfcSeq+"'>"+discount+"</span></td>"
			+"<td><span id='adultprice2"+adultFare[i].sfcSeq+"'>"+adultFare[i].fare+"/"+(adultFare[i].fare+adultFare[i].cn+adultFare[i].yq)+"</span></td>"
			+"<td><span id='adultpriceLevel2"+adultFare[i].sfcSeq+"'>"+adultFare[i].fareLevel+"</span></td>"
			+"<td>"+adultFare[i].cn+"</span></td>"
			+"<td><span id='adultyq2"+adultFare[i].sfcSeq+"'>"+adultFare[i].yq+"</td>"
			+"<td><span id='adultuseCondition2"+adultFare[i].sfcSeq+"'><a title=\""+useCondition[i]+"\">运价规则</a></span></td>"
			+"<td><input type=\"radio\" name=\"adultsRadio\" onclick=chooseFare(\""+adultFare[i].sfcSeq+"\",\"adultSFC\",\"2\",\""+adultFare[i].fare+"\",\""+adultFare[i].cn+"\",\""+adultFare[i].yq+"\",\""+useConditionDetail+"\",this) /></td>"
			+"</tr>"
			);
		}
	}
	if(adultFare == ""){
		$("#adultBigCustomer").append(
				"<tr>"
				+"<td colspan='9' align=center><font color=red>该航班航班不能被预定，请选择其他航班！</font></td>"
				+"</tr>"
				);
	}
}
//大客户成人运价失败
function setAdultBigCustomerFareFail(){
	$("#adultBigCustomer").empty();
	$("#adultBigCustomer").append(
			"<tr>"
			+"<td>成人</td>"
			+"<td colspan='7' align='center'><font color='red'>成人大客户运价查询失败，请重试！</font></td>"
			+"<td><a href=\"javascript:searchSingleBigCodeFare(true,false,false)\" class='Btn Btn-blue'><span>查询</span></a></td>"
			+"</tr>"
			);
}
//大客户儿童运价成功
function setChildBigCustomerFare(childFare,useCondition,hasAdult){
	$("#childBigCustomer").empty();
	if(childFare != ""){
		
		for(var i =0;i< childFare.length;i++){
			var code = childFare[0].bigCustomerCode==null?"":childFare[0].bigCustomerCode;
			var discount = (childFare[i].discount>=10)?"全价":Number(childFare[i].discount)+"折";
			$("#childBigCustomer").append(
			"<tr class='alink-st'>"
			+"<td>儿童</td>"
			+"<td>"+code+"</td>"
			+"<td>"+discount+"</td>"
			+"<td>"+childFare[i].fare+"/"+(childFare[i].fare+childFare[i].yq)+"</td>"
			+"<td>"+childFare[i].fareLevel+"</td>"
			+"<td></td>"
			+"<td>"+childFare[i].yq+"</td>"
			+"<td><a title=\""+useCondition[i]+"\">运价规则</a></td>"
			+"<td><input type=\"radio\" name=\"childsRadio\" onclick=\"chooseFare('"+childFare[i].sfcSeq+"','childSFC','2' ,'"+childFare[i].fare+"','0','"+childFare[i].yq+"','',this)\" ></input></td>"
			+"</tr>"
			);
		}
	}
	if(childFare == ""){
		$("#childBigCustomer").append(
				"<tr>"
				+"<td colspan='9' align=center><font color=red>该航班航班不能被预定，请选择其他航班！</font></td>"
				+"</tr>"
				);
	}
	//若没有成人
	if(!hasAdult){
		return ;
	}
	$("#childBigCustomer").append(
			"<tr class='alink-st'>"
			+"<td>儿童与成人同价</td>"
			+"<td id='childcode2' ></td>"
			+"<td id='childdiscount2'></td>"
			+"<td id='childprice2'></td>"
			+"<td id='childpriceLevel2' ></td>"
			+"<td></td>"
			+"<td  id='childyq2'></td>"
			+"<td id='childuseCondition2'></td>"
			+"<td><input type=\"radio\" name=\"childsRadio\" onclick=chooseFare('10','childSFC','2','',this,'') /></td>"
			+"</tr>"
			);
}
//大客户儿童运价失败
function setChildBigCustomerFareFail(hasAdult){
	$("#childBigCustomer").empty();
	$("#childBigCustomer").append(
			"<tr>"
			+"<td>儿童</td>"
			+"<td colspan='7' align='center'><font color='red'>儿童大客户运价查询失败，请重试！</font></td>"
			+"<td><a href=\"javascript:searchSingleBigCodeFare(false,true,false)\" class='Btn Btn-blue'><span>查询</span></a></td>"
			+"</tr>"
			);
	if(!hasAdult){return ;}
	$("#childBigCustomer").append(
			"<tr class='alink-st'>"
			+"<td>儿童与成人同价</td>"
			+"<td id='childcode2' ></td>"
			+"<td id='childdiscount2'></td>"
			+"<td id='childprice2'></td>"
			+"<td id='childpriceLevel2' ></td>"
			+"<td></td>"
			+"<td  id='childyq2'></td>"
			+"<td id='childuseCondition2'></td>"
			+"<td><input type=\"radio\" name=\"childsRadio\" onclick=chooseFare('10','childSFC','2','',this,'') /></td>"
			+"</tr>"
			);
}
//大客户婴儿运价
function setInfantBigCustomerFare(infantFare){
	$("#infantBigCustomer").empty();
	if(infantFare != ""){
		
		for(var i =0;i< infantFare.length;i++){
			
			$("#infantBigCustomer").append(
			"<tr>"
			+"<td>婴儿</td>"
			+"<td></td>"
			+"<td>"+Number(infantFare[i].discount)+"折</td>"
			+"<td>"+infantFare[i].fare+"/"+infantFare[i].fare+"</td>"
			+"<td>"+infantFare[i].fareLevel+"</td>"
			+"<td></td>"
			+"<td></td>"
			+"<td><a title=\"免费退改签\">运价规则</a></td>"
			+"<td><input type=\"radio\" name=\"infantsRadio\" onclick=chooseFare(\""+infantFare[i].sfcSeq+"\",\"infantSFC\",\"2\",\""+infantFare[i].fare+"\",\"0\",\"0\",\"\",this) /></td>"
			+"</tr>"
			);
			
			
		}
	}
	if(infantFare == ""){
		$("#infantBigCustomer").append(
				"<tr>"
				+"<td colspan='9' align=center><font color=red>该航班航班不能被预定，请选择其他航班！</font></td>"
				+"</tr>"
				);
	}
}
//大客户婴儿运价失败
function setInfantBigCustomerFareFail(){
	
	$("#infantBigCustomer").empty();
	$("#infantBigCustomer").append(
			"<tr>"
			+"<td>婴儿</td>"
			+"<td colspan='7' align='center'><font color='red'>婴儿大客户运价查询失败，请重试！</font></td>"
			+"<td><a href=\"javascript:searchSingleBigCodeFare(false,false,true)\" class='Btn Btn-blue'><span>查询</span></a></td>"
			+"</tr>"
			);
}


//金鹿卡运价
function getKingCardType(){
	$("#normalFareclass").removeClass("bg-green1");
	$("#normalFareclass").addClass("bg-green");
	
	$("#bigCustomerFareclass").removeClass("bg-green1");
	$("#bigCustomerFareclass").addClass("bg-green");
	
	$("#kingCardFareclass").removeClass("bg-green");
	$("#kingCardFareclass").addClass("bg-green1");
	
	setTab('voss_too',3,3);
}
function createUUID() {
	var d = new Date();
	var YMDHMS = d .getDay()+""+ d.getHours() +""+ d.getMinutes() +""+ d.getSeconds()+""+d.getMilliseconds();
    return YMDHMS+"price";
};