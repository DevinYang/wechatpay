var bigcodeDialog;
var dialog3;
function getDeadLine(time,date){
	var firstFlightDate = date.split("-");
	var firstYear = firstFlightDate[0];
	var firstMonth = Number(firstFlightDate[1])-1;
	var firstDay = firstFlightDate[2];
	var firstHour = time.substring(0, 2);
	var firstMin = time.substring(2, 4);
	var flightDate = new Date(firstYear,firstMonth,firstDay,firstHour,firstMin,00);
	var flightNow = new Date();
	var count = (flightDate.getTime() - flightNow.getTime())/60/60/1000;
	if(count <1){
		return false;
	}
	return true;
}
//设置默认的承运人
function setDefaultCarrier(carrier){
	var carriers = $("input[name=carrier]");
	for(var i = 0;i<carriers.length;i++){
		if(carrier.indexOf($(carriers[i]).val())>-1){
			$(carriers[i]).attr("checked","checked");
			continue ;
		}
		$(carriers[i]).attr("checked",false);
	}
}
function hiddecss(){
	$(".hiddenTr").mouseover(function(){
		$(this).css("background-color","#F9FFB8");
	}).mouseout(function(){
		$(this).css("background-color","#fff");						
	});
}
//来回程V舱
function roundtripvcabincss(){
	$(".tr_vcabin0").mouseover(function(){
		$(this).css("background-color","#F9FFB8");
	}).mouseout(function(){
		$(this).css("background-color","#fff");						
	});
	$(".tr_vcabin1").mouseover(function(){
		$(this).css("background-color","#F9FFB8");
	}).mouseout(function(){
		$(this).css("background-color","#F7F7F7");						
	});
}
function showVcabin(){
	$("#vTable").toggle();
	$("#lTable").hide();
	$("#inq2").removeClass("hover");
	$("#inq1").addClass("hover");
}
//低价推荐
function triplowerpriceclass(){
	$("#lowerPriceFlightRecomand").mouseover(function(){
		$(this).css("background-color","#F9FF88");
	}).mouseout(function(){
		$(this).css("background-color","#fff");						
	});
}
function showLowerFlight(){
	$("#lTable").toggle();
	$("#vTable").hide();
	$("#inq1").removeClass("hover");
	$("#inq2").addClass("hover");
}
$(function(){
	//注册ONCLICK事件
	for(var i = 1; i<= 11;i++){

		$(".flightInfo"+i).click(function(){
			var index = $(this).attr("flightInfoMark");
			$(".flightInfo_list_"+index).slideToggle("slow");
		});
	}
	$(".vos_table3 tr:even").addClass("odd"); //even odd 为jquery的方法，even为偶数，odd为奇数。特别注意：索引从0开始，所以第一行是偶数！
	$(".vos_table3 .flight_hu2 tr").addClass("odd");
	$(".vos_table3 tr:odd").addClass("even");
	$(".flight_hu_p tr").css("background-color","#E2F3FB");
	$(".flight_hu_p_zhongzhuan tr").css("background-color","#E2F3FB");
	$(".flight_hu2 tr").css("background-color","white");

});
//单程低价推荐查询运价
function singleTripLowerSearchFare(){
	lowerFlightFlag = true;
	realtimeFareSearch();
}
//普通运价查询设值
function setNormalFare(data){
	if(data.status == 0){
		if(data.errorMsg =="Flight segments must be continuty"){
			setmanyTripAdultGeneralCustomerFareFail();
			return ;
		}
		if(data.hasAdult){setAdultGeneralCustomerFareFail();}
		if(data.hasChild){setChildGeneralCustomerFareFail();}
		if(data.hasInfant){setInfantGeneralCustomerFareFail();}
		return ;
	}
	if(data.adults && data.adults.length > 0)
		$("#kingCardDiscount").val(data.adults[0].discount);//add 2014-04-21
	if(data.hasAdult){setAdultGeneralCustomerFare(data.adults,data.adultUseConditiones,data.flightType);}
	if(data.hasChild){setChildGeneralCustomerFare(data.childs,data.childUseConditiones);}
	if(data.hasInfant){setInfantGeneralCustomerFare(data.infants);}
	
}

//成人普通运价成功
function setAdultGeneralCustomerFare(adultFare,useCondition,flightType){
	$("#adultGeneralCustomer").empty();
	$("#adultKingCardCustomer").empty();
	if(adultFare == ""){
		var errorMsg = "没有符合条件的运价, 请使用手工处理！";
		if(!isNotVcabin){
			errorMsg = "V舱组合没有成人运价, 请使用手工处理！";
		}
		$("#adultGeneralCustomer").append(
				"<tr><td>成人</td><td colspan='7' align=center><font color=red>"+errorMsg+"</font></td></tr>");
		$("#childGeneralCustomer").empty();
		$("#infantGeneralCustomer").empty();
		$("#infantGeneralCustomer").empty();
		$("#adultKingCardCustomer").append(
				"<tr><td>成人</td><td colspan='7' align=center><font color=red>没有符合条件的运价, 请使用手工处理！</font></td></tr>");
		return ;
		}
	
	if(adultFare != ""){
		for(var i =0;i< adultFare.length;i++){
			var discount = (adultFare[i].discount == 10?"全价":adultFare[i].discount+"折");
			$("#adultGeneralCustomer").append(
					"<tr class='alink-st'>"
					+"<td>成人</td>"
					+"<td ><span id='adultdiscount1"+adultFare[i].sfcSeq+"'>"+discount+"</span></td>"
					+"<td><span id='adultprice1"+adultFare[i].sfcSeq+"'>"+adultFare[i].fare+"/"+(Number(adultFare[i].fare)+Number(adultFare[i].cn)+Number(adultFare[i].yq))+"</span></td>"
					+"<td><span id='adultpriceLevel1"+adultFare[i].sfcSeq+"'>"+adultFare[i].fareLevel+"</span></td>"
					+"<td>"+adultFare[i].cn+"</td>"
					+"<td><span id='adultyq1"+adultFare[i].sfcSeq+"'>"+adultFare[i].yq+"</span></td>"
					+"<td><span id='adultuseCondition1"+adultFare[i].sfcSeq+"'><a title=\""+useCondition[i]+"\" >运价规则</a></span></td>"
					+"<td><input type=\"radio\" name=\"adultsRadio\" onclick=chooseFare('"+adultFare[i].sfcSeq+"','adultSFC','1',this,'') /></td>"
					+"</tr>"
					);
			var price =  Number((Math.ceil(adultFare[i].fare/20)*10));
			if((price/10)%2==1 && Number(flightType)>1){
				price += 10;
			}
			$("#adultKingCardCustomer").append(
					"<tr  class='alink-st'>"
					+"<td>成人</td>"
					+"<td>"+(Math.floor(adultFare[i].discount*5)/10)+"折</td>"
					+"<td>"+(price+"/"+(price+Number(adultFare[i].cn)+Number(adultFare[i].yq)))+"</td>"
					+"<td>"+adultFare[i].fareLevel+"</td>"
					+"<td>"+adultFare[i].cn+"</td>"
					+"<td>"+adultFare[i].yq+"</td>"
					+"<td><a title=\""+useCondition[i]+"\">运价规则</a></td>"
					+"<td><input type=\"radio\" name=\"adultsRadio\" onclick=chooseFare('"+adultFare[i].sfcSeq+"','adultSFC','3',this,'') /></td>"
					+"</tr>"
					);
			}
		}
	}
//缺口航班普通运价失败
function setmanyTripAdultGeneralCustomerFareFail(){
	$("#adultGeneralCustomer").empty();
	$("#childGeneralCustomer").empty();
	$("#infantGeneralCustomer").empty();
	$("#adultKingCardCustomer").empty();
	$("#adultGeneralCustomer").append(
			"<tr>"
			+"<td colspan='8' align='center'><font color='red'>缺口航班不能查询运价信息！</font></td>"
			+"</tr>"
			);
	$("#adultKingCardCustomer").append(
			"<tr>"
			+"<td colspan='8' align='center'><font color='red'>缺口航班不能查询运价信息！</font></td>"
			+"</tr>"
			);
}
//缺口航班大客户运价失败
function setmanyTripAdultGeneralbigCustomerFareFail(){
	$("#adultBigCustomer").empty();
	$("#childBigCustomer").empty();
	$("#infantBigCustomer").empty();
	$("#adultBigCustomer").append(
			"<tr>"
			+"<td colspan='9' align='center'><font color='red'>缺口航班不能查询运价信息！</font></td>"
			+"</tr>"
			);
}
//成人普通运价失败
function setAdultGeneralCustomerFareFail(){
	$("#adultGeneralCustomer").empty();
	$("#childGeneralCustomer").empty();
	$("#infantGeneralCustomer").empty();
	$("#adultGeneralCustomer").append(
			"<tr>"
			+"<td>成人</td>"
			+"<td colspan='6' align='center'><font color='red'>成人运价查询失败，请重试！</font></td>"
			+"<td><a href=\"javascript:searchSingleTypeCustomerFare(true,false,false)\" class='Btn Btn-blue'><span>查询</span></a></td>"
			+"</tr>"
			);
	$("#adultKingCardCustomer").append(
			"<tr>"
			+"<td>成人</td>"
			+"<td colspan='6' align='center'><font color='red'>金鹿卡运价查询失败，请重试！</font></td>"
			+"<td><a href=\"javascript:searchSingleTypeCustomerFare(true,false,false)\" class='Btn Btn-blue'><span>查询</span></a></td>"
			+"</tr>"
			);
}
//儿童普通运价失败
function setChildGeneralCustomerFareFail(){
	$("#childGeneralCustomer").empty();
	$("#childGeneralCustomer").append(
			"<tr>"
			+"<td>儿童</td>"
			+"<td colspan='6' align='center'><font color='red'>儿童运价查询失败，请重试！</font></td>"
			+"<td><a href=\"javascript:searchSingleTypeCustomerFare(false,true,false)\" class='Btn Btn-blue'><span>查询</span></a></td>"
			+"</tr>"
			);
	$("#childGeneralCustomer").append(
			"<tr class='alink-st'>"
			+"<td>儿童与成人同价</td>"
			+"<td id='childdiscount1'></td>"
			+"<td id='childprice1'></td>"
			+"<td id='childpriceLevel1' ></td>"
			+"<td></td>"
			+"<td  id='childyq1'></td>"
			+"<td id='childuseCondition1'></td>"
			+"<td><input type=\"radio\" name=\"childsRadio\" onclick=chooseFare('10','childSFC','1',this,'') /></td>"
			+"</tr>"
			);
}

//儿童普通运价成功
function setChildGeneralCustomerFare(childsFare,useCondition){
	$("#childGeneralCustomer").empty();
	if(childsFare != ""){
		for(var i =0;i< childsFare.length;i++){
			var discount = (Number(childsFare[i].discount) == 10?"全价":childsFare[i].discount+"折");
			$("#childGeneralCustomer").append(
			"<tr  class='alink-st'>"
			+"<td>儿童</td>"
			+"<td>"+discount+"</td>"
			+"<td>"+childsFare[i].fare+"/"+(Number(childsFare[i].fare)+Number(childsFare[i].yq))+"</td>"
			+"<td>"+childsFare[i].fareLevel+"</td>"
			+"<td></td>"
			+"<td>"+childsFare[i].yq+"</td>"
			+"<td><a title=\""+useCondition[i]+"\">运价规则</a></td>"
			+"<td><input type=\"radio\" name=\"childsRadio\" onclick=chooseFare('"+childsFare[i].sfcSeq+"','childSFC','1',this,'"+childsFare[i].fareLevel+"') /></td>"
			+"</tr>"
			);
		}
	}else{
		var errorMsg = "没有符合条件的运价, 请使用手工处理！";
		if(!isNotVcabin){
			errorMsg = "V舱组合没有儿童运价, 请使用手工处理！";
		}
		$("#childGeneralCustomer").append(
				"<tr>"
				+"<td>儿童</td>"
				+"<td colspan='7' align=center><font color=red>"+errorMsg+"</font></td>"
				+"</tr>"
				);
	}
	$("#childGeneralCustomer").append(
			"<tr class='alink-st'>"
			+"<td>儿童与成人同价</td>"
			+"<td id='childdiscount1'></td>"
			+"<td id='childprice1'></td>"
			+"<td id='childpriceLevel1' ></td>"
			+"<td></td>"
			+"<td  id='childyq1'></td>"
			+"<td id='childuseCondition1'></td>"
			+"<td><input type=\"radio\" name=\"childsRadio\" onclick=chooseFare('10','childSFC','1',this,'') /></td>"
			+"</tr>"
			);
}
//婴儿普通运价查询成功
function setInfantGeneralCustomerFare(infantsFare){
	$("#infantGeneralCustomer").empty();
	$("#infantKingCardCustomer").empty();
	if(infantsFare != ""){
		for(var i =0;i<infantsFare.length;i++){
			$("#infantGeneralCustomer").append(
			"<tr   class='alink-st'>"
			+"<td>婴儿</td>"
			+"<td>"+infantsFare[i].discount+"折</td>"
			+"<td>"+infantsFare[i].fare+"/"+infantsFare[i].fare+"</td>"
			+"<td>"+infantsFare[i].fareLevel+"</td>"
			+"<td></td>"
			+"<td></td>"
			+"<td><a title=\"免费退改签\">运价规则</a></td>"
			+"<td><input type=\"radio\" name=\"infantsRadio\" onclick=chooseFare('"+infantsFare[i].sfcSeq+"','infantSFC','1',this,'') /></td>"
			+"</tr>"
			);
			$("#infantKingCardCustomer").append(
					"<tr  class='alink-st'>"
					+"<td>婴儿</td>"
					+"<td>"+infantsFare[i].discount+"折</td>"
					+"<td>"+infantsFare[i].fare+"/"+infantsFare[i].fare+"</td>"
					+"<td>"+infantsFare[i].fareLevel+"</td>"
					+"<td></td>"
					+"<td></td>"
					+"<td><a title=\"免费退改签\">运价规则</a></td>"
					+"<td><input type=\"radio\" name=\"infantsRadio\" onclick=chooseFare('"+infantsFare[i].sfcSeq+"','infantSFC','3',this,'') /></td>"
					+"</tr>"
			);
		}
	}else{
		var errorMsg = "没有符合条件的运价, 请使用手工处理！";
		if(!isNotVabin){
			errorMsg = "V舱组合没有婴儿运价, 请使用手工处理！";
		}
		$("#infantGeneralCustomer").append(
				"<tr>"
				+"<td>婴儿</td>"
				+"<td colspan='7' align=center><font color=red>"+errorMsg+"</font></td>"
				+"</tr>"
				);
		$("#infantKingCardCustomer").append(
				"<tr>"
				+"<td>婴儿</td>"
				+"<td colspan='7' align=center><font color=red>"+errorMsg+"</font></td>"
				+"</tr>"
				);
	}
}
//婴儿普通查询失败
function setInfantGeneralCustomerFareFail(){
	$("#infantKingCardCustomer").empty();
	$("#infantGeneralCustomer").empty();
	$("#infantGeneralCustomer").append(
		"<tr>"
		+"<td>婴儿</td>"
		+"<td colspan='6' align='center'><font color='red'>婴儿运价查询失败，请重试！</font></td>"
		+"<td><a href=\"javascript:searchSingleTypeCustomerFare(false,false,true)\" class='Btn Btn-blue'><span>查询</span></a></td>"
		+"</tr>"
	);
	$("#infantKingCardCustomer").append(
			"<tr>"
			+"<td>婴儿</td>"
			+"<td colspan='6' align='center'><font color='red'>婴儿运价查询失败，请重试！</font></td>"
			+"<td><a href=\"javascript:searchSingleTypeCustomerFare(false,false,true)\" class='Btn Btn-blue'><span>查询</span></a></td>"
			+"</tr>"
			);
}



//大客户运价设置
function setBigRealTimeFare(data){

	if(data.status==0){
		if(data.errorMsg =="Flight segments must be continuty"){
			setmanyTripAdultGeneralbigCustomerFareFail();
		}else{
			if(data.hasAdult){setAdultBigCustomerFareFail();}
			if(data.hasChild){setChildBigCustomerFareFail();}
			if(data.hasInfant){setInfantBigCustomerFareFail();}
		}
	}
	if(data.status==1){
		if(data.hasAdult){setAdultBigCustomerFare(data.adults,data.adultUseConditiones);}
		if(data.hasChild){setChildBigCustomerFare(data.childs,data.childUseConditiones);}
		if(data.hasInfant){setInfantBigCustomerFare(data.infants);}
		bigCustomerFlag = true ;
	}
	
}
//大客户成人运价成功
function setAdultBigCustomerFare(adultFare,useCondition){
	$("#adultBigCustomer").empty();
	if(adultFare != ""){
		var code = adultFare[0].bigCustomerCode;
		for(var i =0;i< adultFare.length;i++){
			var discount = (Number(adultFare[i].discount)==10?"全价":Number(adultFare[i].discount)+"折");
			$("#adultBigCustomer").append(
			"<tr  class='alink-st'>"
			+"<td>成人</td>"
			+"<td><span id='adultcode2"+adultFare[i].sfcSeq+"'>"+code+"</span></td>"
			+"<td><span id='adultdiscount2"+adultFare[i].sfcSeq+"'>"+discount+"</span></td>"
			+"<td><span id='adultprice2"+adultFare[i].sfcSeq+"'>"+adultFare[i].fare+"/"+(Number(adultFare[i].fare)+Number(adultFare[i].cn)+Number(adultFare[i].yq))+"</span></td>"
			+"<td><span id='adultpriceLevel2"+adultFare[i].sfcSeq+"'>"+adultFare[i].fareLevel+"</span></td>"
			+"<td>"+adultFare[i].cn+"</span></td>"
			+"<td><span id='adultyq2"+adultFare[i].sfcSeq+"'>"+adultFare[i].yq+"</td>"
			+"<td><span id='adultuseCondition2"+adultFare[i].sfcSeq+"'><a title=\""+useCondition[i]+"\">运价规则</a></span></td>"
			+"<td><input type=\"radio\" name=\"adultsRadio\" onclick=chooseFare('"+adultFare[i].sfcSeq+"','adultSFC','2',this,'') /></td>"
			+"</tr>"
			);
		}
	}
	if(adultFare == ""){
		$("#adultBigCustomer").append(
				"<tr>"
				+"<td>儿童</td>"
				+"<td colspan='8' align=center><font color=red>没有符合条件的运价, 请使用手工处理！</font></td>"
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
function setChildBigCustomerFare(childFare,useCondition){
	$("#childBigCustomer").empty();
	if(childFare != ""){
		var code = childFare[0].bigCustomerCode;
		for(var i =0;i< childFare.length;i++){
			
			$("#childBigCustomer").append(
			"<tr  class='alink-st'>"
			+"<td>儿童</td>"
			+"<td>"+code+"</td>"
			+"<td>"+childFare[i].discount+"折</td>"
			+"<td>"+childFare[i].fare+"/"+(Number(childFare[i].fare)+Number(+childFare[i].yq))+"</td>"
			+"<td>"+childFare[i].fareLevel+"</td>"
			+"<td></td>"
			+"<td>"+childFare[i].yq+"</td>"
			+"<td><a title=\""+useCondition[i]+"\">运价规则</a></td>"
			+"<td><input type=\"radio\" name=\"childsRadio\" onclick=\"chooseFare('"+childFare[i].sfcSeq+"','childSFC','2',this,'"+childFare[i].fareLevel+"')\" ></input></td>"
			+"</tr>"
			);
		}
	}
	if(childFare == ""){
		$("#childBigCustomer").append(
				"<tr>"
				+"<td>儿童</td>"
				+"<td colspan='8' align=center><font color=red>没有符合条件的运价, 请使用手工处理！</font></td>"
				+"</tr>"
				);
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
			+"<td><input type=\"radio\" name=\"childsRadio\" onclick=chooseFare('10','childSFC','2',this,'') /></td>"
			+"</tr>"
			);
}
//大客户儿童运价失败
function setChildBigCustomerFareFail(){
	$("#childBigCustomer").empty();
	$("#childBigCustomer").append(
			"<tr>"
			+"<td>儿童</td>"
			+"<td colspan='7' align='center'><font color='red'>儿童大客户运价查询失败，请重试！</font></td>"
			+"<td><a href=\"javascript:searchSingleBigCodeFare(false,true,false)\" class='Btn Btn-blue'><span>查询</span></a></td>"
			+"</tr>"
			);
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
			+"<td><input type=\"radio\" name=\"childsRadio\" onclick=chooseFare('10','childSFC','2',this,'') /></td>"
			+"</tr>"
			);
}
//大客户婴儿运价
function setInfantBigCustomerFare(infantFare){
	$("#infantBigCustomer").empty();
	if(infantFare != ""){
		var code = infantFare[0].bigCustomerCode;
		for(var i =0;i< infantFare.length;i++){
			
			$("#infantBigCustomer").append(
			"<tr  class='alink-st'>"
			+"<td>婴儿</td>"
			+"<td>"+code+"</td>"
			+"<td>"+infantFare[i].discount+"折</td>"
			+"<td>"+infantFare[i].fare+"/"+infantFare[i].fare+"</td>"
			+"<td>"+infantFare[i].fareLevel+"</td>"
			+"<td></td>"
			+"<td></td>"
			+"<td><a title=\"免费退改签\">运价规则</a></td>"
			+"<td><input type=\"radio\" name=\"infantsRadio\" onclick=chooseFare('"+infantFare[i].sfcSeq+"','infantSFC','2',this,'') /></td>"
			+"</tr>"
			);
		}
	}
	if(infantFare == ""){
		$("#infantBigCustomer").append(
				"<tr>"
				+"<td>婴儿</td>"
				+"<td colspan='8' align=center><font color=red>没有符合条件的运价, 请使用手工处理！</font></td>"
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

//普通客户
function setCustomerFare(){
	$("#fareType").attr("value",1);
	$("#normalFareclass").removeClass("bg-green");
	$("#normalFareclass").addClass("bg-green1");
	$("#bigCustomerFareclass").removeClass("bg-green1");
	$("#bigCustomerFareclass").addClass("bg-green");
	$("#kingCardFareclass").removeClass("bg-green1");
	$("#kingCardFareclass").addClass("bg-green");
	changFareTypeInit();
	setTab('voss_too',1,3);
}
//切换不同的运价类型，初始化数据
function changFareTypeInit(){
	$("#childPriceLevel").attr("value","");
	$("#adultSFC").attr("value",0);
	$("#childSFC").attr("value",0);
	$("#infantSFC").attr("value",0);
	$("input[name='adultsRadio']").attr("checked",false);
	$("input[name='childsRadio']").attr("checked",false);
	$("input[name='infantsRadio']").attr("checked",false);
}
//大客户
function setBigCodeCustomerFare(){
	$("#normalFareclass").removeClass("bg-green1");
	$("#normalFareclass").addClass("bg-green");
	$("#bigCustomerFareclass").removeClass("bg-green");
	$("#bigCustomerFareclass").addClass("bg-green1");
	$("#kingCardFareclass").removeClass("bg-green1");
	$("#kingCardFareclass").addClass("bg-green");
	$("#fareType").attr("value",2);
	changFareTypeInit();
	setTab('voss_too',2,3);
}
//金鹿卡运价
function getKingCardType(){
	$("#fareType").attr("value",3);
	$("#normalFareclass").removeClass("bg-green1");
	$("#normalFareclass").addClass("bg-green");
	$("#bigCustomerFareclass").removeClass("bg-green1");
	$("#bigCustomerFareclass").addClass("bg-green");
	$("#kingCardFareclass").removeClass("bg-green");
	$("#kingCardFareclass").addClass("bg-green1");
	changFareTypeInit();
	setTab('voss_too',3,3);
	var checkResult = checkKingCardCabin();
	if(checkResult.flag === false){
		Dialog.alert("<font style='color:red;font-size: 14px;'>"+checkResult.msg+"</font>");
		return false;
	}
	if(kingKard==""){
		Dialog.alert("未识别出该客户金鹿卡，请与旅客确认是否有金鹿卡号！");
		return false;
	}
	if($("#kingCardDiscount").val()<=4){//add 2014-04-21
		Dialog.alert("该客户折扣小于四折，不能使用金鹿卡");
		$("#kingCardDiscount").val('0');
		return false;
	}
}

var kingCardCabins = {'HU':{'F':true,'F1':true,'C':true,'C1':true,'Y':true,'B':true,'H':true,'K':true,'L':true,'M':true,'M1':true,'Q':true,'Q1':true,'X':true,'U':true,'E':true},
					  'CN':{'F':true,'F1':true,'C':true,'C1':true,'Y':true,'B':true,'H':true,'K':true,'L':true,'M':true,'M1':true,'Q':true,'Q1':true,'X':true,'U':true,'E':true},
					  'GS':{'F':true,'C':true,'Y':true,'B':true,'H':true,'K':true,'L':true,'M':true,'M1':true,'Q':true,'Q1':true,'X':true,'U':true,'E':true},
					  '8L':{'F':true,'C':true,'Y':true,'B':true,'H':true,'K':true,'L':true,'M':true,'M1':true,'Q':true,'Q1':true,'X':true,'U':true,'E':true},
					  'JD':{'Y':true,'B':true,'H':true,'K':true,'M':true,'L':true,'Q':true,'J':true,'X':true,'U':true,'E':true},
					  'PN':{'Y':true,'B':true,'H':true,'K':true,'L':true,'M':true,'R':true,'Q':true,'D':true,'X':true}};
function checkKingCardCabin(){
	var flightForm = lowerFlightFlag?lowerFlightData:flightInfo;
	for(var i=0;i<100;i++){
		var carrier = $(flightForm).find("input[name='flightSFCVOes["+i+"].carrier']");
		var cabin = $(flightForm).find("input[name='flightSFCVOes["+i+"].flightSegmentSFCVO[0].cabin']");
		if(carrier && cabin && carrier.length ==1 && cabin.length == 1){
			var carrierCabins = kingCardCabins[$(carrier).val()];
			if(!carrierCabins || !carrierCabins[$(cabin).val()] || carrierCabins[$(cabin).val()] !== true ){
				return {"flag":false,"msg":"第"+(i+1)+"航段承运人"+$(carrier).val()+$(cabin).val()+"舱！"+"金鹿卡不允许销售"};
			}
		}else{
			return {"flag":true,"msg":""};
		}
	}
	return {"flag":true,"msg":""};
}

function chooseFare(sfc,id,type,obj,priceLevel){
	if($("#fareType").val() != type){
		$("#fareType").attr('value',type);
		$("#adultSFC").attr("value",0);
		$("#childSFC").attr("value",0);
		$("#infantSFC").attr("value",0);
		$("input[name='adultsRadio']").attr("checked",false);
		$("input[name='childsRadio']").attr("checked",false);
		$("input[name='infantsRadio']").attr("checked",false);
		$(obj).attr('checked',true);
	}
	//选择儿童,与成人同价
	if(id.indexOf("childSFC")>-1){
		if(priceLevel != null){
			$("#childPriceLevel").attr("value",priceLevel);
		}
		if(sfc==10){
			if($("#adultSFC").attr("value")==0){
				$("input[name='childsRadio']").attr("checked",false);
				$("#childSFC").attr("value",0);
				Dialog.alert("请先选择成人运价！");
				return;
			}
			adultAndChildsameFare(type);
		}
	}
	$("#"+id).attr("value",sfc);
	//选择了成人
	if(id.indexOf("adultSFC")>-1){
		//已选择与成人一致
		if($("#childSFC").val()==10){
			adultAndChildsameFare(type);
		}
	}
}
//根据类型设置儿童与成人运价一致
function adultAndChildsameFare(type){
	var adultLastPart = type+""+$("#adultSFC").attr("value");
	$("#childdiscount"+type).text("");
	if(type==2){$("#childcode"+type).text("");$("#childcode"+type).html($("#adultcode"+adultLastPart).html());}
	$("#childprice"+type).text("");
	$("#childpriceLevel"+type).text("");
	$("#childyq"+type).text("");
	$("#childuseCondition"+type).text("");
	$("#childdiscount"+type).text($("#adultdiscount"+adultLastPart).text());
	var str = $("#adultprice"+adultLastPart).text();
	var adultExceptShuiPrice = Number(str.split("/")[0]);
	$("#childpriceLevel"+type).text($("#adultpriceLevel"+adultLastPart).text());
	var childyq = (Math.floor(Number($("#adultyq"+adultLastPart).text())/20)*10);
	if($("#flightMark").val() == 2 && (childyq/10)%2>0){
		childyq = childyq-10;
	}
	$("#childyq"+type).text(childyq);
	$("#childprice"+type).text(adultExceptShuiPrice+"/"+(adultExceptShuiPrice+childyq));
	$("#childuseCondition"+type).html($("#adultuseCondition"+adultLastPart).html());
}
//审核大客户号
function checkBigcustomerCode(code){
	var reg = /^[a-zA-Z]{0,3}\d{7}$/;
	if(!reg.test(code)){
		return false;
	}
	return true ;
}
function searchFlights(){
	var singleOrNot = $('input[name="singleOrNot"]:checked').val();
	if(singleOrNot!=1 && singleOrNot !=2){
		var carrier = "";
		var carriers = $("input[name=carrier]");
		for(var i = 0;i<carriers.length;i++){
			if(carriers[i].checked){
				carrier +=$(carriers[i]).val()+",";
			}
		}
		var params = formToObj(manyTripForm);
		params["carrier"]=carrier.trim();
		searchSomeFlight(params);
		return ;
	}
	if (!flightFromCheck()) {
		return;
	}

	pageCarrier = "";// 承运人
	isCkin = false;// 包含CKIN产品
	isNotVcabin = true;// 非v舱
	$("#goSingleDirect").empty();
	$("#goSingleNotDirect").empty();
	$("#backRoundTripDirect").empty();
	$("#backRoundTripNotDirect").empty();
	for (var i = 0; i < 8; i++) {
		$("#manyTripDirect" + i).empty();
	}
	searchFlight();
}

function formatTime(time){
	return time.substr(0,2) +":"+time.substr(2,time.length);
}
function fareInfoReset(){
	$(".pjxx").css("display","none");
	searchFareFlight = false;
	bigCustomerFlag = false;
	$("#adultSFC").attr("value","0");
	$("#childSFC").attr("value","0");
	$("#infantSFC").attr("value","0");
}
//表单验证
function flightFromCheck(){
		var singleOrNot = $('input[name="singleOrNot"]:checked').val();
		if(singleOrNot!=1 && singleOrNot !=2){
			Dialog.alert("请选择航班类型！");
			return false;
		}
		var cityBegin = $("#city_1").val();
		var cityEnd = $("#city_2").val();
		var leaveDate = $("#leaveDate").val();
		var arrivelDate = $("#backDate").val();
		//验证出发城市
		if(cityBegin == null || cityBegin == ""){

				Dialog.alert("出发城市不能为空!");
				return false;
		}
		var beginCode = getCodeByName(cityBegin);
		if(beginCode == ""){
			
			Dialog.alert("不存在该出发城市！");
			return false;
		}
		if(beginCode != ""){
			$("#cityCode_1").attr("value",beginCode);
		}
		//验证到达城市
		if(cityEnd == null || cityEnd == ""){

			Dialog.alert("到达城市不能为空!");
			return false;
		}
		//设置城市三子码
		var cityEndCode = getCodeByName(cityEnd);
		if(cityEndCode  == ""){
			
			Dialog.alert("不存在该到达城市！");
			return false;
		}
		if(cityEnd == cityBegin ){
			Dialog.alert("出发城市和到达城市不能相同!");
			return false;
		}
		if(cityEndCode != ""){
			
			$("#cityCode_2").attr("value",cityEndCode);
		}
		if(leaveDate == null || leaveDate== ""){

			Dialog.alert("出发时间不能为空!");
			return false;
		}
		if(!afterTime(new Date().format("yyyy-MM-dd"),leaveDate)){
			
			Dialog.alert("出发时间必须等于或晚于当天!");
			return false;
		}
		
		if(((new Date(leaveDate).getTime()-(new Date()).getTime())/(1000 * 60 * 60 * 24))>365){
			Dialog.alert("航班时间必须为一年内的时间!");
			return false;
		}
	   if(singleOrNot == 2){
			
			if(arrivelDate == null || arrivelDate== ""){

				Dialog.alert("返回时间不能为空!");
				return false;
			}
			
			if(((new Date(arrivelDate.replaceAll("-","/")).getTime()-(new Date()).getTime())/(1000 * 60 * 60 * 24))>365){
				Dialog.alert("航班时间必须为一年内的时间!");
				return false;
			}
			if(!afterTime(leaveDate,arrivelDate)){
				
				Dialog.alert("返回时间不能小于出发时间!");
				return false;
			}
		}
		
		if(!flightSearchCheckTravellerCount()){
			
			return false;
		}
		return true;
}
//单程初始化查询列表数据
function searchFormReset(single,isTurn,adultCount,childCount,babyCount,carrier){
	if(adultCount != ""){	$("#adultCount").attr("value",adultCount); }
	if(childCount != ""){   $("#childCount").attr("value",childCount); }
	if(babyCount != ""){ $("#babyCount").attr("value",babyCount); }
	//用于调试查询运价的时候选择人数判断
	if(childCount != ""){   $("#childCount").attr("onvalue",childCount); }
	if(babyCount != ""){ $("#babyCount").attr("onvalue",babyCount); }
	setDefaultCarrier(carrier);
	//设置form值
	if(single<3){
		$("#tripFlight"+single).attr("checked","checked");
			if(isTurn == "on"){
		 		$("#isTurn").attr("checked","checked");
		 		$(".notDirectFlight").css("display","block");
		 	}
	}
}
$(function(){
	$("#tripFlight1").bind("click",function(){
		$("#backDateLabel").css("display","none");
	});
	$("#tripFlight2").bind("click",function(){
		$("#backDateLabel").css("display","block");
	});
});
//单程初始化
function oneTripInit(){
	$("#oneTripFlightDateInfo").html("");
	var cityBegin = $("#city_1").val();
	$("#singleTripCityBegin").text(cityBegin);
	var cityEnd = $("#city_2").val();
	$("#singleTripCityEnd").text(cityEnd);
	var leaveDate = $("#leaveDate").val();
	$("#singleTripDay").text(getDay(leaveDate));
	$("#singleTripLeaveDate").text(leaveDate);
	$("#singleTripCountDay").text(timeCount(leaveDate));
	$("#chooseFlight").empty();
	$("#lowerPriceFlightRecomand").empty();
	$("#oneTripDirectTbody").empty();
	$("#lowerPriceFlightRecomandData").empty();
	$("#singleTrip").css("display","block");
	$(".flightInfo_list_1").show();
 	$("#roundtrip2").css("display","none");
 	$("#roundtrip1").css("display","none");
 	$("#manyWayTrip").css("display","none");
 	$("#backDateLabel").css("display","none");
 	formReset();
 	vcabinReset();
}

//点击查询按钮，来回程回复默认值
function initRoundFlightParams(){
	
	goDataObject = "";
	goCkin = false;//来程CKIN标识
	goProductCode = "";
	backDataObject = "";
	backCkin = false;//回程CKIN标识
	backProductCode = "";
	roundTripflightArr = [];
	pageCarrier="";
	isCkin = false;
	goFlightArravilTime ="";
	backFlightDepartTime = "";
	lowerFlightFlag = false;
	//是否已查询过运价的标识
	searchFareFlight = false;
}
function initRoundFlightSearchParams(){
	
	goCkin = false;//来程CKIN标识
	goProductCode = "";
	backCkin = false;//回程CKIN标识
	backProductCode = "";
	roundTripflightArr = [];
	pageCarrier="";
	isCkin = false;
	goFlightArravilTime ="";
	backFlightDepartTime = "";
	lowerFlightFlag = false;
	//是否已查询过运价的标识
	searchFareFlight = false;
}
//来回程初始化
function roundTripInit(){
		
		$("#roundTripFlightDateInfo1").html("");
		$("#roundTripFlightDateInfo0").html("");
		$("#roundtrip1").css("display","block");
	 	$("#roundtrip2").css("display","block");
		$(".inq-con").slideDown("slow");//V舱组合和低价推荐
		$(".pjxx").slideUp("slow");
		$("#singleTrip").css("display","none");
	 	$("#manyWayTrip").css("display","none");
	 	$(".flightInfo_list_2").show();
	 	$(".flightInfo_list_3").show();
	 	formReset();
	 	vcabinReset();
		//航班信息设置
		var cityBegin = $("#city_1").val();
		var cityEnd = $("#city_2").val();
		var leaveDate = $("#leaveDate").val();
		var backDate = $("#backDate").val();
		$("#roundTrip1Day").text(getDay(leaveDate));
		$("#roundTrip2Day").text(getDay(backDate));
		$("#roundTrip1CityBegin").text(cityBegin);
		$("#roundTrip2CityBegin").text(cityEnd);
		$("#roundTrip1CityEnd").text(cityEnd);
		$("#roundTrip2CityEnd").text(cityBegin);
		$("#roundTrip1LeaveDate").text(leaveDate);
		$("#roundTrip2LeaveDate").text(backDate);
		$("#roundTrip1CountDay").text(timeCount(leaveDate));
		$("#roundTrip2CountDay").text(timeCount(backDate));
		$("#lowerPriceFlightRecomand").empty();
		$("#lowerPriceFlightRecomandData").empty();
		$("#goTwotripDirectTbody").empty();
		$("#goTwotripnotDirectTbody").empty();
		$("#backTwotripDirectTbody").empty();
		$("#backTwotripnotDirectTbody").empty();
	 	
}
//多目的地
function manyTripInit(){
//	setTabf('inq', 1, 2);
	$("#singleTrip").css("display","none");
 	$("#roundtrip1").css("display","none");
 	$("#roundtrip2").css("display","none");
 	$("#manyWayTrip").css("display","block");
}
function showOrhidden(name){
	
	$("tr[name="+name+"]").toggle();
	}
//清空V舱组合
function vcabinReset(){
	
	$("#roundTripVcabin0").empty();
	$("#roundTripVcabin1").empty();
	for(var i = 0;i<8;i++){
		$("#manyTripVcabin"+i).empty();	
	}
}
//提交表单初始化
function formReset(){
	$("#goSingleDirect").empty();
	$("#goSingleNotDirect").empty();
	$("#backRoundTripDirect").empty();
	$("#backRoundTripNotDirect").empty();
	for(var i = 0;i<8;i++){
		$("#manyTripDirect"+i).empty();	
	}
	$("#adultSFC").attr("value","0");
	$("#childSFC").attr("value","0");
	$("#infantSFC").attr("value","0");
}
//获取星期
function getDay(flightDate){
	var date = new Date(flightDate.replaceAll("-","/")).getDay();
	if(date == 1){
		return "星期一";
	}
	if(date == 2){
		return "星期二";
	}
	if(date == 3){
		return "星期三";
	}
	if(date == 4){
		return "星期四";
	}
	
	if(date == 5){
		return "星期五";
	}
	if(date == 6){
		return "星期六";
	}
	if(date == 0){
		return "星期日";
	}
}


//验证旅客数
function flightSearchCheckTravellerCount(){
	var adultCount = $("#adultCount").val();
	var childCount = $("#childCount").val();
	var babyCount = $("#babyCount").val();
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
//比较两个时间yyyy-MM-dd
function afterTime(compareDate1 , compareDate2){

	var date1 =new Date(compareDate1.replaceAll("-","/"));
	var date2 =new Date(compareDate2.replaceAll("-","/"));
	if((date1.getTime()) > (new Date(date2)).getTime()){

		return false;
	}
	return true;
}
//通过 机场三子码获取机场名字
function getNameByCode(code){

	if(cities.length==0){
		
		return "";
	}
	for(var i = 0;i< cities.length;i++){
		if(code == cities[i].code){
			
			return cities[i].name;
		}
	}
	return "";
}
//通过城市名查找三字码
function getCodeByName(city){
	if(cities.length==0){
		
		return "";
	}
	for(var i = 0;i< cities.length;i++){
		if(city == cities[i].name){
			
			return cities[i].code;
		}
	}
	return "";
}
function flightSubmit(){
	var childCount =$("#childCount").val();
	var infantCount =$("#babyCount").val();
	var adultSFC = $("#adultSFC").val();
	var childSFC = $("#childSFC").val();
	var infantsSFC = $("#infantSFC").val();
	var fareType = $("#fareType").val();//1为普通，2为大客户，3为金鹿卡
	if(adultSFC == null || adultSFC == "" || adultSFC==0){
		Dialog.alert("请选择成人运价！");
		return ;
		}
	if(childCount>0){
		if(fareType>2){
			Dialog.alert("旅客中包含儿童，不能选择金鹿卡！");
			return ;
		}
		if(childSFC  == null || childSFC == "" || childSFC==0){
			$("#childBigCustomer").show();
			$("#childGeneralCustomer").show();
			Dialog.alert("请选择儿童运价！");
			return ;
		}
	}
	if(infantCount>0){
		if(infantsSFC  == null || infantsSFC == "" || infantsSFC == 0){
			$("#infantBigCustomer").show();
			$("#infantGeneralCustomer").show();
			Dialog.alert("请选择婴儿运价！");
			return ;
			}
	}
	var flightMark = $("#flightMark").val();
	//为单程或者来回程的，需要验证旅客数
	if(flightMark == 1 || flightMark == 2){
	//设置人数
		var adultCount = $("#adultCount").val();
		var childCount = $("#childCount").val();
		var infantsCount = $("#babyCount").val();
		$("#SFCadultCount").attr("value",adultCount);
		$("#SFCchildCount").attr("value",childCount);
		$("#SFCinfantsCount").attr("value",infantsCount);
		if(!checkTravellerCount(adultCount,childCount,infantsCount)){
			return ;
		}
	}
	if(lowerFlightFlag){
		$("#submitflightinfo1").empty();
		$("#submitflightinfo2").empty();
		$("#submitflightinfo2").append($("#lowerPriceFlightRecomandData").clone());
	}
	if(!lowerFlightFlag){
		$("#submitflightinfo2").empty();
		$("#submitflightinfo1").empty();
		$("#submitflightinfo1").append($("#normalChoseFlightInfo").clone());
	}
	getSfcPriceAndSubmit();
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
				+"<td></td>"
				+"<td>正在查询运价....</td>"
				+"</tr>"
				);
		}
	setBigCodeCustomerFare();
}
function countChange(type, object) {

	var onvalue = $(object).attr("onvalue");
	if (searchFareFlight) {
		var value = object.value;
		// 非0 ->0 隐藏
		if (value == 0) {
			// 儿童
			if (type == 2) {
				$("#childGeneralCustomer").hide();
				$("#childBigCustomer").hide();
				$("#childUseAdultBigCustomer").empty();
			}
			// 婴儿
			if (type == 3) {

				$("#infantGeneralCustomer").hide();
				$("#infantBigCustomer").hide();
				$("#infantKingCardCustomer").hide();
			}
			$(object).attr("onvalue", 0);
		}
		if (value != 0) {
			var customerBigCode = bigCustomerCode;
			if (customerBigCode == "") {
				customerBigCode = $("#customerCode").val();
			}
			// 0->非0
			if (onvalue == 0) {

				// 儿童
				if (type == 2) {
					// 已查询大客户运价
					if (bigCustomerFlag) {
						if (customerBigCode != null && customerBigCode != "") {
							searchSingleBigCodeFare(false, true, false);
							$("#childBigCustomer").show();
						}
					}
					searchSingleTypeCustomerFare(false, true, false);

					$("#childGeneralCustomer").show();
				}
				// 婴儿
				if (type == 3) {
					// 已查询大客户运价
					if (bigCustomerFlag) {
						if (customerBigCode != null && customerBigCode != "") {

							searchSingleBigCodeFare(false, false, true);
						}
						$("#infantBigCustomer").show();
					}
					searchSingleTypeCustomerFare(false, false, true);
					$("#infantGeneralCustomer").show();
				}

			}
			if (onvalue != 0) {
				if (type == 2) {
					$("#childBigCustomer").show();
					$("#childGeneralCustomer").show();

				}
				// 婴儿
				if (type == 3) {

					$("#infantBigCustomer").show();
					$("#infantGeneralCustomer").show();
				}
			}
		}
		$(object).attr("onvalue", value);
	}
}
//验证旅客数
function checkTravellerCount(adultCount,childCount,infantsCount){
	if(adultCount < infantsCount){
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
//计算时间差
function timeCount(fightTime){
	var nowdate=new Date();  //开始时间
	var year = nowdate.getFullYear();
	var month = nowdate.getMonth();
	var day = nowdate.getDate();
	var nowdate2 = new Date(year,month,day);
	var fightTimeStr = fightTime.replaceAll("-", "/");
	var futuredate=new Date(fightTimeStr);    //结束时间
	var date3=futuredate.getTime()-nowdate2.getTime();  //时间差的毫秒数
	//计算出相差天数
	var days=Math.floor(date3/(24*3600*1000));
	return days;
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
//将yyyy-MM-dd格式的时间串转成ddMMMyy形式
function setFormatDateTddMMMyy(upCaseDate){
	var m = ['JAN','FEB','MAR','APR','MAY','JUN','JUL','AUG','SEP','OCT','NOV','DEC'];
	var arr = upCaseDate.split("-");
	var day= Number(arr[2]);
	if(Number(arr[2])<10){
		day = "0"+""+day;
	}
	return day+m[(Number(arr[1])-1)]+arr[0].substr(2,4);
}

/***设置奇偶行颜色 传递要修改的TBODY的jquery对象**/
function resetTrColor(obj){
	obj.find("tr:visible").each(function(i,d){
		if(i % 2 == 0){
			$(d).addClass("jqdemo");
		}
	});
}
/*********************************************************/
//取消重查
function cancelresearch(){
}
function findCarrierByElementName(elementName) {
	var carrier = "";
	var flightCarrier = document.getElementsByName(elementName);
	for (var j = 0; j < flightCarrier.length; j++) {
		if (flightCarrier[j].checked) {

			carrier = carrier + flightCarrier[j].value;
		}
	}
	return carrier;
}
function findTimeByElementName(elementName) {
	var times = "";
	var flightTimes = document.getElementsByName(elementName);
	for (var i = 0; i < flightTimes.length; i++) {

		if (flightTimes[i].checked) {

			times = times + flightTimes[i].value;
		}
	}
	return times;
}
function showOneOrRonudTrip(data, singleOrNot) {
	var status = data.status;
	if (status == 0) {
		Dialog.alert(data.errorMsg);
		return;
	}
	if (singleOrNot == 1) {
		$("#flightMark").attr("value", 1);
		dataObject = data.dtos[0];
		// 获取承运人和时间
		var times = findTimeByElementName("flightTimes");
		if (document.getElementsByName("singleFlightCheckAllByTime")[0].checked) {
			times = times + "e";
		}
		// 设置航班信息
		setOneTripFlight(data.dtos[0], times,
				findCarrierByElementName("singewayCarrier"));
		// 低价推荐
		setOneTripLowerVo(data.dtos[0].lowerFlightvo);
	}
	if (singleOrNot == 2) {
		$("#flightMark").attr("value", 2);
		goDataObject = data.dtos[0];
		backDataObject = data.dtos[1];
		// V舱
		setVcabinFlight( goDataObject.vcanbin, 0);
		setVcabinFlight( backDataObject.vcanbin, 1);
		// 低价推荐
		setRoundTripLowerVo(data.lowerList);
		roundTripSetFlight("goTwotripDirectTbody", "goTwotripnotDirectTbody",
				goDataObject, findTimeByElementName("roundTripflightTimes0"),
				0, findCarrierByElementName("roundTripCarrier0"));
		roundTripSetFlight("backTwotripDirectTbody",
				"backTwotripnotDirectTbody", backDataObject,
				findTimeByElementName("roundTripflightTimes1"), 1,
				findCarrierByElementName("roundTripCarrier1"));
		$(".hiddenTr").slideUp("slow");
	}
	triplowerpriceclass();
	var isTurn = document.getElementById("isTurn").checked;
	if (isTurn) {
		$("#oneTripNotDirect").css("display", "block");
		$("#roundTripNotDirect1").css("display", "block");
		$("#roundTripNotDirect2").css("display", "block");
		return;
	}
	$("#oneTripNotDirect").css("display", "none");
	$("#roundTripNotDirect1").css("display", "none");
	$("#roundTripNotDirect2").css("display", "none");
}
$(function() {
	for (var i = 1; i < 3; i++) {
		var input = $("#city_" + i);
		var c = input.autocomplete({
			minLength : 0,
			source : cities,
			focus : function(event, ui) {
				var $this = $(this);
				$this.val(ui.item.name);
				return false;
			},
			select : function(event, ui) {
				var $this = $(this);
				$this.val(ui.item.name);
				return false;
			}
		});
		c.data("ui-autocomplete")._renderItem = function(ul, item) {
			return $("<li>").append("<a>" + item.desc + "</a>").appendTo(ul);
		};
	}
});
function returnParams(priceflag) {
	var params = formToObj(flightForm);
	var flightinfo = "";
	if (lowerFlightFlag) {
		flightinfo = formToObj(lowerFlightData);
	}
	if (!lowerFlightFlag) {
		flightinfo = formToObj(flightInfo);
	}
	for ( var key in flightinfo) {
		params[key] = flightinfo[key];
	}
	return params;
}

/**********************************************************************************************************************************/
function setCommonDiretFlight(flightData,i,id,radioName,radioFunctionName,index){
	if(Number(index)<0){index ="";}
	var flight ="" ;
	if(!flightData.segments[0].sharing && !flightData.segments[0].chartAilne){
		flight = "<div onclick=showOrhidden('cabin"+index+""+i+"') class=\"showTd1\"  ><b>"+flightData.segments[0].number+"</b></div>";
	}
	if(!flightData.segments[0].sharing && flightData.segments[0].chartAilne){
		flight = "<div onclick=showOrhidden('cabin"+index+""+i+"') class=\"showTd2\" ><b>"+flightData.segments[0].number+"</b></div>";
	}
	if(flightData.segments[0].sharing  && !flightData.segments[0].chartAilne){
		flight = "<div onclick=showOrhidden('cabin"+index+""+i+"')  title=\"实际承运人："+flightData.segments[0].shareCarrier+"\" class=\"showTd2\"  ><b>*"+flightData.segments[0].number+"</b></div>";
	}
	if(flightData.segments[0].sharing  && flightData.segments[0].chartAilne){
		flight = "<div onclick=showOrhidden('cabin"+index+""+i+"')  title=\"实际承运人："+flightData.segments[0].shareCarrier+"\" class=\"showTd2\"  ><b>*"+flightData.segments[0].number+"</b></div>";
	}
	var price="";
	for(var j = 0 ;j<flightData.segments[0].cabins[0].flightCabinProductInfoes.length;j++){
		var hasMatch = flightData.segments[0].cabins[0].flightCabinProductInfoes[j].hasMatch;
		var hasSeat = flightData.segments[0].cabins[0].flightCabinProductInfoes[j].hasSeat;
		if(!hasMatch||!hasSeat){
			price +=flightData.segments[0].cabins[0].flightCabinProductInfoes[j].productName
			+"(￥"+flightData.segments[0].cabins[0].flightCabinProductInfoes[j].ticketPrice+")";
		}
		if(hasSeat&&hasMatch){
			price += "<input type=\"radio\" onclick=\""+radioFunctionName+"('"
					+flightData.segments[0].cabins[0].status
					+"','"+flightData.segments[0].carrier
					+"','"+flightData.segments[0].departAirport
					+"','"+flightData.segments[0].arriveAirport
					+"','"+flightData.segments[0].number
					+"','"+flightData.segments[0].cabins[0].name
					+"','"+flightData.date
					+"','"+flightData.segments[0].departTerminal
					+"','"+flightData.segments[0].arriveTerminal
					+"','"+flightData.segments[0].departTime
					+"','"+flightData.segments[0].arriveTime
					+"','"+flightData.segments[0].stops
					+"','"+flightData.segments[0].mealType
					+"','"+flightData.segments[0].planType
					+"','"+flightData.segments[0].tax
					+"','"+flightData.segments[0].yq
					+"','"+flightData.segments[0].cabins[0].flightCabinProductInfoes[j].productName
					+"','"+flightData.segments[0].cabins[0].flightCabinProductInfoes[j].productCode
					+"','"+flightData.segments[0].cabins[0].flightCabinProductInfoes[j].ckin
					+"','"+flightData.segments[0].cabins[0].flightCabinProductInfoes[j].ticketPrice
					+"','"+flightData.segments[0].cabins[0].discount
					+"','"+flightData.segments[0].cabins[0].phyPrice
					+"','"+flightData.segments[0].stopInfo
					+"','"+index
					+"',true)\" name=\""+radioName+index+"\">"
					+flightData.segments[0].cabins[0].flightCabinProductInfoes[j].productName
					+"(￥"
					+flightData.segments[0].cabins[0].flightCabinProductInfoes[j].ticketPrice 
					+")";
				}
			}
	var discountd = flightData.segments[0].cabins[0].discount;
	var discount="";
	if(discountd==10){discount ="/全价";}
	if(discountd==""){discount ="";}
	if(discountd != 0 && discountd != 10){discount ="/"+discountd+"折";}
	var taxYq = (flightData.segments[0].tax==null?"":flightData.segments[0].tax)+"/"+(flightData.segments[0].yq==null?"":flightData.segments[0].yq);
	$("#"+id).append("<tr class='flight_tr'>"
			+"<td>"+(i+1)
			+"</td><td><a title=\""+AirportCache.getCnName(flightData.segments[0].departAirport)+"\">"+flightData.segments[0].departAirport+"("+flightData.segments[0].departTerminal+")</a>-<a title=\""+AirportCache.getCnName(flightData.segments[0].arriveAirport)+"\">"+flightData.segments[0].arriveAirport+"("+flightData.segments[0].arriveTerminal+")</a>"
			+"</td><td>"+flightData.segments[0].departTime+" "+flightData.segments[0].arriveTime
			+"</td><td>"
			+flight
			+"</td>"
			+"<td>"+flightData.segments[0].planType+"</td>"
			+"<td><a title='"+flightData.segments[0].stopInfo+"'>"+flightData.segments[0].stops+"</a></td>"
			+"<td class='pnrMeal'>"+flightData.segments[0].mealType+"</td>"
			+"<td>"+taxYq+"</td>"
			+"<td><a title='"+(flightData.segments[0].cabins[0].useCondition==null?"":flightData.segments[0].cabins[0].useCondition)+"'>"+flightData.segments[0].cabins[0].name+"("+getStatus(flightData.segments[0].cabins[0].status)
			+")"+discount+"</a></td>"
			+"<td>"
			+price
			+"</td></tr>"
			);
	//循环舱位
	for(var j = 1; j<flightData.segments[0].cabins.length;j++){
		var price ="" ;	
		for(var m = 0;m < flightData.segments[0].cabins[j].flightCabinProductInfoes.length;m++){
			var hasMatch = flightData.segments[0].cabins[j].flightCabinProductInfoes[m].hasMatch;
			var hasSeat = flightData.segments[0].cabins[j].flightCabinProductInfoes[m].hasSeat;
			if(!hasMatch || !hasSeat){
				price += flightData.segments[0].cabins[j].flightCabinProductInfoes[m].productName
				+"(￥"
				+flightData.segments[0].cabins[j].flightCabinProductInfoes[m].ticketPrice 
				+")";
			}
			if(hasSeat&&hasMatch){
				price +="<input type=\"radio\" onclick=\""+radioFunctionName+"('"
					+flightData.segments[0].cabins[j].status
					+"','"+flightData.segments[0].carrier
					+"','"+flightData.segments[0].departAirport
					+"','"+flightData.segments[0].arriveAirport
					+"','"+flightData.segments[0].number
					+"','"+flightData.segments[0].cabins[j].name
					+"','"+flightData.date
					+"','"+flightData.segments[0].departTerminal
					+"','"+flightData.segments[0].arriveTerminal
					+"','"+flightData.segments[0].departTime
					+"','"+flightData.segments[0].arriveTime
					+"','"+flightData.segments[0].stops
					+"','"+flightData.segments[0].mealType
					+"','"+flightData.segments[0].planType
					+"','"+flightData.segments[0].tax
					+"','"+flightData.segments[0].yq
					+"','"+flightData.segments[0].cabins[j].flightCabinProductInfoes[m].productName
					+"','"+flightData.segments[0].cabins[j].flightCabinProductInfoes[m].productCode
					+"','"+flightData.segments[0].cabins[j].flightCabinProductInfoes[m].ckin
					+"','"+flightData.segments[0].cabins[j].flightCabinProductInfoes[m].ticketPrice 
					+"','"+flightData.segments[0].cabins[j].discount
					+"','"+flightData.segments[0].cabins[j].phyPrice
					+"','"+flightData.segments[0].stopInfo
					+"','"+index
					+"',true)\" name=\""+radioName+index+"\">"
					+flightData.segments[0].cabins[j].flightCabinProductInfoes[m].productName
					+"(￥"
					+flightData.segments[0].cabins[j].flightCabinProductInfoes[m].ticketPrice 
					+")";
			}
		}
		var discountd = flightData.segments[0].cabins[j].discount;
		var discount="";
		if(discountd==10){discount ="/全价";}
		if(discountd==""){discount ="";}
		if(discountd != 0 && discountd != 10){discount ="/"+discountd+"折";}
			$("#"+id).append("<tr  name=\"cabin"+index+""+i+"\" class=\"hiddenTr\" ><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td>"
					+"<td><a title='"+(flightData.segments[0].cabins[0].useCondition==null?"":flightData.segments[0].cabins[j].useCondition)+"'>"
					+flightData.segments[0].cabins[j].name+"("+getStatus(flightData.segments[0].cabins[j].status)+")"
					+discount+"</a></td>"
					+"<td>" 
					+price
					+"</td></tr>"
					);
		}
	resetTrColor($("#"+id));
}
 
function setCommonTripNotDiretFlight(flightData,index,i,notDirectId){
	if(Number(index)<0){index = "";}
	var flightSegmentLenhgth = flightData.segments.length;
	for(var j = 0 ;j<flightSegmentLenhgth;j++){
			var flight ="" ;
			if(!flightData.segments[j].sharing && !flightData.segments[j].chartAilne){
				flight = "<div onclick=showOrhidden('notDirectCabin"+index+""+i+""+j+"') class=\"showTd1\"  ><b>"+flightData.segments[j].number+"</b></div>";
			}
			if(!flightData.segments[j].sharing && flightData.segments[j].chartAilne){
				flight = "<div onclick=showOrhidden('notDirectCabin"+index+""+i+""+j+"') class=\"showTd2\" ><b>"+flightData.segments[j].number+"</b></div>";
			}
			if(flightData.segments[j].sharing  && !flightData.segments[j].chartAilne){
				flight = "<div onclick=showOrhidden('notDirectCabin"+index+""+i+""+j+"')  title=\"实际承运人："+flightData.segments[j].shareCarrier+"\" class=\"showTd2\"  ><b>*"+flightData.segments[j].number+"</b></div>";
			}
			if(flightData.segments[j].sharing  && flightData.segments[j].chartAilne){
				flight = "<div onclick=showOrhidden('notDirectCabin"+index+""+i+""+j+"')  title=\"实际承运人："+flightData.segments[j].shareCarrier+"\" class=\"showTd2\"  ><b>*"+flightData.segments[j].number+"</b></div>";
			}
			var price="";
			for(var m = 0;m< flightData.segments[j].cabins[0].flightCabinProductInfoes.length;m++){
				var hasMatch = flightData.segments[j].cabins[0].flightCabinProductInfoes[m].hasMatch;
				var hasSeat = flightData.segments[j].cabins[0].flightCabinProductInfoes[m].hasSeat;
				if(!hasSeat || !hasMatch){
					price += flightData.segments[j].cabins[0].flightCabinProductInfoes[m].productName
					+"(￥"
					+flightData.segments[j].cabins[0].flightCabinProductInfoes[m].ticketPrice 
					+")";
				}
				if(hasSeat && hasMatch){
					price +="<input type=\"radio\"  disabled />"
					+flightData.segments[j].cabins[0].flightCabinProductInfoes[m].productName
					+"(￥"
					+flightData.segments[j].cabins[0].flightCabinProductInfoes[m].ticketPrice 
					+")";
				}
			}
			var discount = (flightData.segments[j].cabins[0].discount == 10.0?"全价":flightData.segments[j].cabins[0].discount+"折");
			var taxYq = (flightData.segments[j].tax==null?"":flightData.segments[j].tax)+"/"+(flightData.segments[j].yq==null?"":flightData.segments[j].yq);
		$("#"+notDirectId).append("<tr>"+"<td>"+(1+i)+"-"+(1+j)+"</td><td>"
				
				
			+"<a title=\""+AirportCache.getCnName(flightData.segments[j].departAirport)+"\">"+flightData.segments[j].departAirport+"("+flightData.segments[j].departTerminal+")</a>-<a title=\""+AirportCache.getCnName(flightData.segments[j].arriveAirport)+"\">"+flightData.segments[j].arriveAirport+"("+flightData.segments[j].arriveTerminal+")</a>"
			+"</td><td>"+flightData.segments[j].departTime+" "+flightData.segments[j].arriveTime
			+"</td><td>"
			+flight
			+"</td>"
			+"<td>"+flightData.segments[j].planType+"</td>"
			+"<td><a title='"+flightData.segments[j].stopInfo+"'>"+flightData.segments[j].stops+"</a></td>"
			+"<td>"+flightData.segments[j].mealType+"</td>"
			+"<td>"+taxYq+"</td>"
			+"<td><a title='"+(flightData.segments[j].cabins[0].useCondition==null?"":flightData.segments[j].cabins[0].useCondition)+"'>"
			+flightData.segments[j].cabins[0].name+"("+getStatus(flightData.segments[j].cabins[0].status)+")/"
			+discount+"</a></td>"
			+"<td>"
			+price
			+"</td>"
			+"</tr>");
		//循环舱位
		for(var k =1;k<flightData.segments[j].cabins.length;k++){
			var price = "";
			for(var m = 0;m< flightData.segments[j].cabins[k].flightCabinProductInfoes.length;m++){
				
				var hasMatch = flightData.segments[j].cabins[k].flightCabinProductInfoes[m].hasMatch;
				var hasSeat = flightData.segments[j].cabins[k].flightCabinProductInfoes[m].hasSeat;
				if(!hasSeat || !hasMatch){
					price += flightData.segments[j].cabins[k].flightCabinProductInfoes[m].productName
					+"(￥"
					+flightData.segments[j].cabins[k].flightCabinProductInfoes[m].ticketPrice 
					+")";
				}
				if(hasSeat && hasMatch){
				
					price += "<input type=\"radio\" disabled />"
					+flightData.segments[j].cabins[k].flightCabinProductInfoes[m].productName
					+"(￥"
					+flightData.segments[j].cabins[k].flightCabinProductInfoes[m].ticketPrice 
					+")";
				}
			}
			var discount = (flightData.segments[j].cabins[k].discount == 10?"全价":flightData.segments[j].cabins[k].discount+"折");
			$("#"+notDirectId).append("<tr name=\"notDirectCabin"+index+""+i+""+j+"\" class=\"hiddenTr\" ><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td>"
					+"<td><a title='"+(flightData.segments[j].cabins[k].useCondition==null?"":flightData.segments[j].cabins[k].useCondition)+"'>"
					+flightData.segments[j].cabins[k].name+"("+getStatus(flightData.segments[j].cabins[k].status)+")/"
					+discount+"</a></td><td>"+					
					price
					+"</td></tr>"
					);
			}
		}
}
