function getRoundFlgIndex(index){
	
	if(roundTripflightArr.length==0){
		return false;
	}
	for(var i = 0;i<roundTripflightArr.length;i++){
		
		if(index.indexOf(roundTripflightArr[i])>=0){
			return true;
		}
	}
	return false;
}
//删除某个index
function deleteRoundFlgIndex(index) {

	for (var j = 0; j < roundTripflightArr.length; j++) {

		if (index == roundTripflightArr[j]) {
			if (j == 0) {

				roundTripflightArr.shift();
			} else {

				manyTripflightArr.splice(j - 1, 1);
			}
		}
	}
}


//直达
function addOneofRoundTripFlight(index,carrier,flightDate,departAirport,arrivalAirport,flightNo,departTerminal,arriveTerminal,departTime,arriveTime,
		stops,mealType,planType,tax,yq,cabin,productName,productCode,ckin,price,discount,phyPrice,stopInfo){
	$("input[name=roundTriplowerPriceFlight]").attr("checked",false);
	lowerFlightFlag = false;
	var id = "goSingleDirect";
	var showInfoClass = "round_go_flightInfo";
	if(index == 1){
		id="backRoundTripDirect";
		showInfoClass = "round_back_flightInfo";
	}
	var vCabin = "";
	
	if(isNotVcabin){
		vCabin = cabin;
		var discountshow = discount>=10?"全价":(discount+"折");
		$("#"+showInfoClass).html(departAirport+"-"+arrivalAirport+" "+formatTime(departTime)+"-"+formatTime(arriveTime)+" "+flightNo+" "+cabin+"舱 "+ price+"元("+discountshow+")");
	}

	if(!isNotVcabin){
		vCabin = "V";
	}
	
	$("#"+id).empty();
	$("#"+id).append("<tr>"
			+"<td><input name=\"flightSFCVOes["+index+"].carrier\" value=\""+carrier+"\"></td>"
			+"<td><input name=\"flightSFCVOes["+index+"].date\" value=\""+setFormatDate(flightDate)+"\"></td>"
			+"<td><input name=\"flightSFCVOes["+index+"].flightSegmentSFCVO[0].departAirport\" value=\""+departAirport+"\"></td>"
			+"<td><input name=\"flightSFCVOes["+index+"].flightSegmentSFCVO[0].arriveAirport\" value=\""+arrivalAirport+"\"></td>"
			+"<td><input name=\"flightSFCVOes["+index+"].flightSegmentSFCVO[0].flightNo\" value=\""+flightNo+"\"></td>"
			+"<td><input name=\"flightSFCVOes["+index+"].flightSegmentSFCVO[0].departTerminal\" value=\""+departTerminal+"\"></td>"
			+"<td><input name=\"flightSFCVOes["+index+"].flightSegmentSFCVO[0].arriveTerminal\" value=\""+arriveTerminal+"\"></td>"
			+"<td><input name=\"flightSFCVOes["+index+"].flightSegmentSFCVO[0].departTime\" value=\""+departTime+"\"></td>"
			+"<td><input name=\"flightSFCVOes["+index+"].flightSegmentSFCVO[0].arriveTime\" value=\""+arriveTime+"\"></td>"
			+"<td><input name=\"flightSFCVOes["+index+"].flightSegmentSFCVO[0].stops\" value=\""+stops+"\"></td>"
			+"<td><input name=\"flightSFCVOes["+index+"].flightSegmentSFCVO[0].mealType\" value=\""+mealType+"\"></td>"
			+"<td><input name=\"flightSFCVOes["+index+"].flightSegmentSFCVO[0].planType\" value=\""+planType+"\"></td>"
			+"<td><input name=\"flightSFCVOes["+index+"].flightSegmentSFCVO[0].tax\" value=\""+tax+"\"></td>"
			+"<td><input name=\"flightSFCVOes["+index+"].flightSegmentSFCVO[0].yq\" value=\""+yq+"\"></td>"
			+"<td><input name=\"flightSFCVOes["+index+"].flightSegmentSFCVO[0].cabin\" value=\""+vCabin+"\"></td>"
			+"<td><input name=\"flightSFCVOes["+index+"].flightSegmentSFCVO[0].vcabin\" value=\""+cabin+"\"></td>"
			+"<td><input name=\"flightSFCVOes["+index+"].flightSegmentSFCVO[0].productName\" value=\""+productName+"\"></td>"
			+"<td><input name=\"flightSFCVOes["+index+"].flightSegmentSFCVO[0].productCode\" value=\""+productCode+"\"></td>"
			+"<td><input name=\"flightSFCVOes["+index+"].flightSegmentSFCVO[0].ckin\" value=\""+ckin+"\"></td>"
			+"<td><input name=\"flightSFCVOes["+index+"].flightSegmentSFCVO[0].price\" value=\""+price+"\"></td>"
			+"<td><input name=\"flightSFCVOes["+index+"].flightSegmentSFCVO[0].discount\" value=\""+discount+"\"></td>"
			+"<td><input name=\"flightSFCVOes["+index+"].flightSegmentSFCVO[0].phyPrice\" value=\""+phyPrice+"\"></td>"
			+"<td><input name=\"flightSFCVOes["+index+"].flightSegmentSFCVO[0].stopInfo\" value=\""+stopInfo+"\"></td>"
			+"</tr>"
			);
}

function roundTripSetFlight(directId,notDirectId,data,times,index,carrier){
	$("#"+directId).empty();
	$("#"+notDirectId).empty();
	$("#round_go_flightInfo").html("");
	$("#round_back_flightInfo").html("");
	//直达
	if(data.direct.length==0){
		$("#"+directId).append("<tr>"
		+"<td colspan=\"10\" style=\"color: red;font-size:15\">查询航班不存在！"
		+"</td>"
		+"</tr>");
	}
	if(data.direct.length>0){
		var flightDate = setFormatDate(data.direct[0].date);
		if(index == 0){
			var leaveDate = $("#leaveDate").val();
			if(flightDate != leaveDate){
				$("#roundTrip1Day").text(getDay(flightDate));
				$("#roundTrip1LeaveDate").text(flightDate);
				$("#roundTrip1CountDay").text(timeCount(flightDate));
				$("#roundTripFlightDateInfo0").html("<font color=red>很抱歉,没有查询的该日期航班,系统为你推荐最近日期航班！</font>");
			}
			
		}
		if(index == 1){
			var backDate = $("#backDate").val();
			
			if(flightDate != backDate){
				$("#roundTrip2Day").text(getDay(flightDate));
				$("#roundTrip2LeaveDate").text(flightDate);
				$("#roundTrip2CountDay").text(timeCount(flightDate));
				$("#roundTripFlightDateInfo1").html("<font color=red>很抱歉,没有查询的该日期航班,系统为你推荐最近日期航班！</font>");
			}
		}
		
		var directindex = 0;
		for(var i = 0;i<data.direct.length;i++){
			if(times.length == 0 && carrier.length == 0){
				setCommonDiretFlight(data.direct[i],i,directId,"roundTripDirect","chooseRoundTripDirect",index);
				continue ;
			}
			//0-6点
			if(times.indexOf("e")>=0 && data.direct[i].segments[0].departTime > 0 && data.direct[i].segments[0].departTime < 600 && carrier.indexOf(data.direct[i].segments[0].carrier)>=0){
				setCommonDiretFlight(data.direct[i],directindex,directId,"roundTripDirect","chooseRoundTripDirect",index);
				directindex++;
				continue ;
			}
			//6-12点
			if(times.indexOf("a")>=0 && data.direct[i].segments[0].departTime >= 600 && data.direct[i].segments[0].departTime < 1200 && carrier.indexOf(data.direct[i].segments[0].carrier)>=0){
				setCommonDiretFlight(data.direct[i],directindex,directId,"roundTripDirect","chooseRoundTripDirect",index);
				directindex++;
				continue ;
			}
			//12-13点
			if(times.indexOf("b")>=0 && data.direct[i].segments[0].departTime >= 1200 && data.direct[i].segments[0].departTime < 1300 && carrier.indexOf(data.direct[i].segments[0].carrier)>=0){
				setCommonDiretFlight(data.direct[i],directindex,directId,"roundTripDirect","chooseRoundTripDirect",index);
				directindex++;
				continue ;
				}
			//13-18点
			if(times.indexOf("c")>=0 && data.direct[i].segments[0].departTime >= 1300 && data.direct[i].segments[0].departTime < 1800 && carrier.indexOf(data.direct[i].segments[0].carrier)>=0){
				setCommonDiretFlight(data.direct[i],directindex,directId,"roundTripDirect","chooseRoundTripDirect",index);
				directindex++;
				continue ;
				}
			//18-24点
			if(times.indexOf("d")>=0 && data.direct[i].segments[0].departTime >= 1800 && data.direct[i].segments[0].departTime < 2400 && carrier.indexOf(data.direct[i].segments[0].carrier)>=0){
				setCommonDiretFlight(data.direct[i],directindex,directId,"roundTripDirect","chooseRoundTripDirect",index);
				directindex++;
				continue ;
				}
		}
		$(".pnrMeal").each(function(i,d){
			var $d = $(d);
			var html = $d.html();
			if(html){
				if(meals[html.trim()]){
					$d.html(meals[html.trim()]);
				}
			}
		});
	}
	if(data.notDirect.length==0){
		$("#"+notDirectId).append("<tr>"
		+"<td colspan=\"10\" style=\"color: red;font-size:15\">查询中转航班不存在！"
		+"</td>"
		+"</tr>");
	}
	if(data.notDirect.length>0){
		
		var notdirectindex = 0;
		//中转
		for(var i = 0;i<data.notDirect.length;i++){
			if(times.length == 0 && carrier.length == 0){
				setCommonTripNotDiretFlight(data.notDirect[i],index,i,notDirectId);
				continue ;
			}
			//6-12点
			if(times.indexOf("a")>=0 && data.notDirect[i].segments[0].departTime >= 600 && data.notDirect[i].segments[0].departTime < 1200 && carrier.indexOf(data.notDirect[i].segments[0].carrier)>=0){
				setCommonTripNotDiretFlight(data.notDirect[i],index,notdirectindex,notDirectId);
				notdirectindex++;
				continue ;
			}
			//12-13点
			if(times.indexOf("b")>=0 && data.notDirect[i].segments[0].departTime >= 1200 && data.notDirect[i].segments[0].departTime < 1300 && carrier.indexOf(data.notDirect[i].segments[0].carrier)>=0){
				setCommonTripNotDiretFlight(data.notDirect[i],index,notdirectindex,notDirectId);
				notdirectindex++;
				continue ;
				}
			//13-18点
			if(times.indexOf("c")>=0 && data.notDirect[i].segments[0].departTime >= 1300 && data.notDirect[i].segments[0].departTime < 1800 && carrier.indexOf(data.notDirect[i].segments[0].carrier)>=0){
				setCommonTripNotDiretFlight(data.notDirect[i],index,notdirectindex,notDirectId);
				notdirectindex++;
				continue ;
				}
			//18-24点
			if(times.indexOf("d")>=0 && data.notDirect[i].segments[0].departTime >= 1800 && data.notDirect[i].segments[0].departTime < 2400 && carrier.indexOf(data.notDirect[i].segments[0].carrier)>=0){
				setCommonTripNotDiretFlight(data.notDirect[i],index,notdirectindex,notDirectId);
				notdirectindex++;
				continue ;
				}
		}
	}
	$(".hiddenTr").hide();
	hiddecss();//鼠标划过改变样式
	resetTrColor($("#"+directId));
}
//时间全选
function roundFlightCheckAllTime(index,obj){
	if(obj.checked){
		$("input[name=roundTripflightTimes"+index+"]").attr("checked","checked");
		roundTripFlightByTimesAndCarrier(index);
		return ;
	}
	$("input[name=roundTripflightTimes"+index+"]").attr("checked",false);
	roundTripFlightByTimesAndCarrier(index);
}
//承运人全选
function roundFlightCheckAllCarrier(index,obj){
	if(obj.checked){
		$("input[name=roundTripCarrier"+index+"]").attr("checked","checked");
		roundTripFlightByTimesAndCarrier(index);
		return ;
	}
	$("input[name=roundTripCarrier"+index+"]").attr("checked",false);
	roundTripFlightByTimesAndCarrier(index);
}
function roundTripFlightByTimesAndCarrier(index){
	//backtripreset();
	if(backDataObject!=""){
		var times = "";
		var flightTimes = document.getElementsByName("roundTripflightTimes"+index);
		for(var i = 0;i<flightTimes.length;i++){
			if(flightTimes[i].checked){
				times = times+flightTimes[i].value;
				}
			}
		if(document.getElementsByName("roundFlightCheckAllByTime"+index)[0].checked){
			times = times + "e";
		}
		if(index == 1){
			$("#backTwotripDirectTbody").empty();
			roundTripSetFlight("backTwotripDirectTbody","backTwotripnotDirectTbody",backDataObject,times,index,findCarrierByElementName("roundTripCarrier"+index));
			return ;
		}
		roundTripSetFlight("goTwotripDirectTbody","goTwotripnotDirectTbody",goDataObject,times,index,findCarrierByElementName("roundTripCarrier"+index));
	}
}
//V舱组合
function setVcabinFlight(vcabindata,index){
	var inputName = "roundTripVcabin"+index;
	$("#"+inputName).empty();
	if (vcabindata.length == 0) {
		$("#" + inputName).append(
				"<tr>" + "<td class=\"tr_vcabin" + index
						+ "\" colspan='9' align='center' style='color:red'>第"
						+ (1 + index) + "程没有开放V舱的航班！</td>");
		$(".tr_vcanin1").css("background-color", "#fff");
		return;
	}
	for(var i = 0 ;i<vcabindata.length;i++){
		$("#"+inputName).append(
				"<tr class='tr_vcabin"+index+"' >"
				+"<td><input type=\"radio\" name="+inputName+" onclick=\"chooseRoundTripDirect('"+vcabindata[i].status
				+"','"+vcabindata[i].carrier
				+"','"+vcabindata[i].departCity
				+"','"+vcabindata[i].arrivalCity
				+"','"+vcabindata[i].flightNo
				+"','"+vcabindata[i].cabin
				+"','"+setFormatDateTddMMMyy(vcabindata[i].flightDate)
				+"','"+vcabindata[i].departTerminal
				+"','"+vcabindata[i].arriveTerminal
				+"','"+vcabindata[i].departTime
				+"','"+vcabindata[i].arrivalTime
				+"','"+vcabindata[i].stops
				+"','"+vcabindata[i].mealType
				+"','"+vcabindata[i].planType
				+"','"+vcabindata[i].tax
				+"','"+vcabindata[i].yq
				+"','"+vcabindata[i].productName
				+"','"+vcabindata[i].productCode
				+"','"+vcabindata[i].ckin
				+"','"+vcabindata[i].ticketPrice
				+"','"+vcabindata[i].discount
				+"','"+vcabindata[i].phyPrice
				+"','"+vcabindata[i].stopInfo
				+"','"+index+"',false)\"></input></td>"
				+"<td>"+vcabindata[i].flightNo+"</td>"
				+"<td>"+vcabindata[i].departTime+"&nbsp;&nbsp;"+vcabindata[i].arrivalTime+"</td>"
				+"<td>"+vcabindata[i].flightDate+"</td>"
				+"<td>"+vcabindata[i].cabin+"("+getStatus(vcabindata[i].status)+")</td>"
				+"<td>"+vcabindata[i].tax+"/"+vcabindata[i].yq+"/"+vcabindata[i].ticketPrice+"</td>"
				+"<td><a   title=\""+AirportCache.getCnName(vcabindata[i].departCity)+"--"+vcabindata[i].departTerminal+"航站楼\">"+AirportCache.getCityCnName(vcabindata[i].departCity)+"</a> -  <a title=\""+AirportCache.getCnName(vcabindata[i].arrivalCity)+"--"+vcabindata[i].arriveTerminal+"航站楼\">"+AirportCache.getCityCnName(vcabindata[i].arrivalCity)+"</a></td>"
				+"<td>"+vcabindata[i].flightType+"</td>"
				+"<td><a title='"+vcabindata[i].stopInfo+"'>"+vcabindata[i].stops+"</a></td></tr>"
		);
	}
	roundtripvcabincss();
}
//低价推荐
function roundTriplowerPriceFlightSearch(seatCount){
	var roundisCkin = $("input[lowerpriceroundflight=lowerpriceroundflight0]").val();
	if(roundisCkin.indexOf("true")>-1){
		Dialog.alert("包含不同的CKIN产品航班,不能选择！");
		$("input[name=roundTriplowerPriceFlight]").attr("checked",false);
		return ;
	}
	var flightDate = $("input[lowerpriceroundflight=lowerpriceroundFlightDate0]").val().split(" ");
	if(!getDeadLine(flightDate[1],flightDate[0])){
		Dialog.alert("已起飞或离起飞时间1小时内的航班不允许预定");
		$("input[name=roundTriplowerPriceFlight]").attr("checked",false);
		return ;
	}
	var childCount = $("#childCount").val();
	var adultCount = $("#adultCount").val();
	if(Number(seatCount) < (Number(childCount)+Number(adultCount))){
		Dialog.alert("该低价推荐航班座位数小于预选成人加儿童数，不能被预定，请选择其他航班！");
		$("input[name=roundTriplowerPriceFlight]").attr("checked",false);
		return ;
	}
	pageCarrier="";//承运人
	isCkin = false;//包含CKIN产品
	isNotVcabin = true;//非v舱
	$("#round_go_flightInfo").html("");
	$("#round_back_flightInfo").html("");
	$("input[name=roundTripVcabin0]").attr("checked",false);
	$("input[name=roundTripVcabin1]").attr("checked",false);
	$("input[name^=roundTripDirect]").attr("checked",false);//来回程radio去掉
	roundTripflightArr = [];
	lowerFlightFlag = true;
	realtimeFareSearch();
}
//来回程低价推荐
function setRoundTripLowerVo(data){
	$("#lowerPriceFlightRecomand").empty();
	$("#lowerPriceFlightRecomandData").empty();
	if(data == null || data.length == 0){
		$("#lowerPriceFlightRecomand").append("<tr ><td colspan='8'><font color='red'>没有最低推荐价航班！</font></td></tr>");
		return ;
	}
	for(var i = 0;i<data.length;i++){
		var vcabin = "";
		if(data[i].productName){
			vcabin = data[i].productName+"/"+data[i].cabin;
			}
		if(!data[i].productName){
			vcabin = data[i].cabin;
			}
		var radio;
		var discount = (data[i].discount == 10?"全价":data[i].discount+"折");
		
		if(i==0){
			var totalPrice = "含税价："+((Number(data[0].tax)+Number(data[0].yq))*2 + Number(data[0].ticketPrice) +Number(data[1].ticketPrice));
			radio = "<td rowspan='2'><input type='radio' name=\"roundTriplowerPriceFlight\" onclick=\"roundTriplowerPriceFlightSearch('"+data[i].status+"')\" />"
			+"<a title='"+totalPrice+"'>￥"
			+(Number(data[0].ticketPrice)+Number(data[1].ticketPrice))+"</a></td>";
			$("#lowerPriceFlightRecomand").append(
					"<tr class='lowerclass'><td>"+AirportCache.getCityCnName(data[i].departCity)+"-"+AirportCache.getCityCnName(data[i].arrivalCity)+"</td>"
					+"<td>"+data[i].flightNo+"</td>"
					+"<td>"+data[i].flightDate+"</td>"
					+"<td>"+formatTime(data[i].departTime)+" "+formatTime(data[i].arrivalTime)+"</td>"
					+"<td>"+discount+"</td>"
					+"<td>"+data[i].planType+"</td>"
					+"<td>"+vcabin+"舱("+getStatus(data[i].status)+")</td>"
					+radio
					+"</tr>"
					);
		}
		if(i==1){
			$("#lowerPriceFlightRecomand").append(
					"<tr class='lowerclass'><td>"+AirportCache.getCityCnName(data[i].departCity)+"-"+AirportCache.getCityCnName(data[i].arrivalCity)+"</td>"
					+"<td>"+data[i].flightNo+"</td>"
					+"<td>"+data[i].flightDate+"</td>"
					+"<td>"+formatTime(data[i].departTime)+" "+formatTime(data[i].arrivalTime)+"</td>"
					+"<td>"+discount+"</td>"
					+"<td>"+data[i].planType+"</td>"
					+"<td>"+vcabin+"舱("+getStatus(data[i].status)+")</td>"
					+"</tr>"
			);
		}
		$("#lowerPriceFlightRecomandData").append(
				"<tr>"
				+"<td><input  lowerpriceroundflight='lowerpriceroundflight"+i+"' value=\""+data[i].cannotChoose+"\"></td>"
				+"<td><input  lowerpriceroundflight='lowerpriceroundFlightDate"+i+"' value=\""+data[i].flightDate+" "+data[i].departTime+"\"></td>"
				+"<td><input name=\"flightSFCVOes["+i+"].carrier\" value=\""+data[i].carrier+"\"></td>"
				+"<td><input name=\"flightSFCVOes["+i+"].date\" value=\""+data[i].flightDate+"\"></td>"	
				+"<td><input name=\"flightSFCVOes["+i+"].flightSegmentSFCVO[0].departAirport\" value=\""+data[i].departCity+"\"></td>"
				+"<td><input name=\"flightSFCVOes["+i+"].flightSegmentSFCVO[0].arriveAirport\" value=\""+data[i].arrivalCity+"\"></td>"
				+"<td><input name=\"flightSFCVOes["+i+"].flightSegmentSFCVO[0].flightNo\" value=\""+data[i].flightNo+"\"></td>"
				+"<td><input name=\"flightSFCVOes["+i+"].flightSegmentSFCVO[0].departTerminal\" value=\""+data[i].departTerminal+"\"></td>"
				+"<td><input name=\"flightSFCVOes["+i+"].flightSegmentSFCVO[0].arriveTerminal\" value=\""+data[i].arriveTerminal+"\"></td>"
				+"<td><input name=\"flightSFCVOes["+i+"].flightSegmentSFCVO[0].departTime\" value=\""+data[i].departTime+"\"></td>"
				+"<td><input name=\"flightSFCVOes["+i+"].flightSegmentSFCVO[0].arriveTime\" value=\""+data[i].arrivalTime+"\"></td>"
				+"<td><input name=\"flightSFCVOes["+i+"].flightSegmentSFCVO[0].stops\" value=\""+data[i].stops+"\"></td>"
				+"<td><input name=\"flightSFCVOes["+i+"].flightSegmentSFCVO[0].mealType\" value=\""+data[i].mealType+"\"></td>"
				+"<td><input name=\"flightSFCVOes["+i+"].flightSegmentSFCVO[0].planType\" value=\""+data[i].planType+"\"></td>"
				+"<td><input name=\"flightSFCVOes["+i+"].flightSegmentSFCVO[0].tax\" value=\""+data[i].tax+"\"></td>"
				+"<td><input name=\"flightSFCVOes["+i+"].flightSegmentSFCVO[0].yq\" value=\""+data[i].yq+"\"></td>"
				+"<td><input name=\"flightSFCVOes["+i+"].flightSegmentSFCVO[0].cabin\" value=\""+data[i].cabin+"\" /></td>"
				+"<td><input name=\"flightSFCVOes["+i+"].flightSegmentSFCVO[0].vcabin\" value=\""+data[i].cabin+"\" /></td>"
				+"<td><input name=\"flightSFCVOes["+i+"].flightSegmentSFCVO[0].productName\" value=\""+data[i].productName+"\"></td>"
				+"<td><input name=\"flightSFCVOes["+i+"].flightSegmentSFCVO[0].productCode\" value=\""+data[i].productCode+"\"></td>"
				+"<td><input name=\"flightSFCVOes["+i+"].flightSegmentSFCVO[0].ckin\" value=\""+data[i].ckin+"\"></td>"
				+"<td><input name=\"flightSFCVOes["+i+"].flightSegmentSFCVO[0].price\" value=\""+data[i].ticketPrice+"\"></td>"
				+"<td><input name=\"flightSFCVOes["+i+"].flightSegmentSFCVO[0].discount\" value=\""+data[i].discount+"\"></td>"
				+"<td><input name=\"flightSFCVOes["+i+"].flightSegmentSFCVO[0].phyPrice\" value=\""+data[i].phyPrice+"\"></td>"
				+"<td><input name=\"flightSFCVOes["+i+"].flightSegmentSFCVO[0].stopInfo\" value=\""+data[i].stopInfo+"\"></td>"
				+"</tr>"
		);
	}
}

function chooseRoundTripDirect(seatCount, carrier, departAirport,
		arrivalAirport, flightNo, cabin, flightDate, departTerminal,
		arriveTerminal, departTime, arriveTime, stops, mealType, planType, tax,
		yq, productName, productCode, ckin, price, discount, phyPrice,
		stopInfo, index, flag2) {

	if (!getDeadLine(departTime, flightDate)) {
		Dialog.alert("已起飞或离起飞时间1小时内的航班不允许预定");
		if (flag2) {
			$("input[name^=roundTripDirect" + index + "]").attr("checked",
					false);
			return;
		}
		$("input[name=roundTripVcabin" + index + "]").attr("checked", false);
		return;
	}
	if (!isNaN(seatCount) && Number(seatCount) < (Number($("#childCount").val()) + Number($("#adultCount").val()))) {
		Dialog.alert("该航班座位数小于预选成人加儿童数，不能被预定，请选择其他航班！");
		if (flag2) {
			$("input[name^=roundTripDirect" + index + "]").attr("checked",
					false);
			return;
		}
		$("input[name=roundTripVcabin" + index + "]").attr("checked", false);
		return;
	}
	var ckinFlag = (ckin.toUpperCase().indexOf("CKIN") >= 0);
	var flightlength = roundTripflightArr.length;
	var hasIndex = getRoundFlgIndex(index);
	// 初始化
	if (flag2 != isNotVcabin) {
		isNotVcabin = flag2;
		initRoundFlightSearchParams();
		// 当前选择的是非V舱
		if (isNotVcabin) {
			$("input[name^=roundTripVcabin]").attr("checked", false);
		}
		// 当前选择的是V舱
		if (!isNotVcabin) {
			$("#round_go_flightInfo").html("");
			$("#round_back_flightInfo").html("");
			$("input[name^=roundTripDirect]").attr("checked", false);
		}
	}
	// 第一次进入
	if (pageCarrier == "") {
		addOneofRoundTripFlight(index, carrier, flightDate, departAirport,
				arrivalAirport, flightNo, departTerminal, arriveTerminal,
				departTime, arriveTime, stops, mealType, planType, tax, yq,
				cabin, productName, productCode, ckin, price, discount,
				phyPrice, stopInfo);
		pageCarrier = carrier;
		isCkin == ckinFlag;
		if (flag2) {
			if (index == 0) {
				$(".flightInfo_list_2").hide();
				goProductCode = productCode;
				goCkin = ckinFlag;
			}
			if (index == 1) {
				$(".flightInfo_list_3").hide();
				backCkin = ckinFlag;
				backProductCode = productCode;
			}
		}
		// 将下标添加到数组中
		roundTripflightArr.push(index);
		if(index ==0){
			goFlightArravilTime = flightDate+"-"+arriveTime;
			return ;
		}
		backFlightDepartTime = flightDate +"-"+departTerminal;
		return;
	}
	if (pageCarrier != "") {
		// 已选择了一段航班，且选择的是同一个航班
		if (flightlength == 1 && getRoundFlgIndex(index)) {

			addOneofRoundTripFlight(index, carrier, flightDate, departAirport,
					arrivalAirport, flightNo, departTerminal, arriveTerminal,
					departTime, arriveTime, stops, mealType, planType, tax, yq,
					cabin, productName, productCode, ckin, price, discount,
					phyPrice, stopInfo);
			pageCarrier = carrier;
			isCkin == ckinFlag;
			if (flag2) {
				if (index == 0) {
					$(".flightInfo_list_2").hide();
					goProductCode = productCode;
					goCkin = ckinFlag;
				}
				if (index == 1) {
					$(".flightInfo_list_3").hide();
					backCkin = ckinFlag;
					backProductCode = productCode;
				}
			}
			// 将下标添加到数组中
			if(index ==0){
				goFlightArravilTime = flightDate+"-"+arriveTime;
				return ;
			}
			backFlightDepartTime = flightDate +"-"+departTerminal;
			return;
		}
		// 已有一航班，但选择不同的航班
		if (flightlength == 1 && !hasIndex) {
			if (pageCarrier != carrier) {
				Dialog.alert("请选择同一承运人航班！");
				if(flag2){
					$("input[name=roundTripDirect" + index + "]").attr(
							"checked", false);
					return ;
				}
				$("input[name=roundTripVcabin" + index + "]").attr(
						"checked", false);
				return;
			}
			if (flag2) {
				
				if ((isCkin && ckinFlag)
						&& (productCode != (index == 1 ? goProductCode
								: backProductCode))) {
					$("input[name=roundTripDirect" + index + "]").attr(
							"checked", false);
					Dialog.alert("已包航CKIN航段，不能再选择CKIN航段！");
					return;
				}
				if (index == 0) {
					if(!compareGobackTime((flightDate+"-"+arriveTime),backFlightDepartTime)){
						Dialog.alert("回程出发时间必须晚于来程到达时间！");
						$("input[name=roundTripDirect" + index + "]").attr(
								"checked", false);
						return ;
					}
					goFlightArravilTime = flightDate+"-"+arriveTime;
					$(".flightInfo_list_2").hide();
					goProductCode = productCode;
					goCkin = ckinFlag;
				}
				if (index == 1) {
					if(!compareGobackTime(goFlightArravilTime,(flightDate+"-"+departTime))){
						Dialog.alert("回程出发时间必须晚于来程到达时间！");
						$("input[name=roundTripDirect" + index + "]").attr(
								"checked", false);
						return ;
					}
					backFlightDepartTime = flightDate+"-"+departTime;
					$(".flightInfo_list_3").hide();
					backCkin = ckinFlag;
					backProductCode = productCode;
				}
				if (ckinFlag) {
					isCkin = ckinFlag;
				}
			}
			addOneofRoundTripFlight(index, carrier, flightDate, departAirport,
					arrivalAirport, flightNo, departTerminal, arriveTerminal,
					departTime, arriveTime, stops, mealType, planType, tax, yq,
					cabin, productName, productCode, ckin, price, discount,
					phyPrice, stopInfo);
			roundTripflightArr.push(index);
		}
		if (flightlength == 2) {// 以选择两个航班
			
			if (pageCarrier != carrier) {
				Dialog.alert("请选择同一承运人航班！");
				if(flag2){
					$("input[name=roundTripDirect" + index + "]").attr(
							"checked", false);
					if (index == 0) {
						goCkin = false;
						$("#goSingleDirect").empty();
						$("#round_go_flightInfo").html("");
					}
					if (index == 1) {
						backCkin = false;
						$("backRoundTripDirect").empty();
						$("#round_back_flightInfo").html("");
						backCkin = false;
					}
					return ;
				}
				$("input[name=roundTripVcabin" + index + "]").attr(
						"checked", false);
				deleteRoundFlgIndex(index);
				if (index == 0) {
					$("#goSingleDirect").empty();
				}
				if (index == 1) {
					$("backRoundTripDirect").empty();
				}
				return;
			}
			if (flag2) {
				if (pageCarrier != carrier) {
					$("input[name=roundTripDirect" + index + "]").attr(
							"checked", false);
					if (index == 0) {
						goCkin = false;
						$("#goSingleDirect").empty();
						$("#round_go_flightInfo").html("");
					}
					if (index == 1) {
						backCkin = false;
						$("backRoundTripDirect").empty();
						$("#round_back_flightInfo").html("");
						backCkin = false;
					}
					deleteRoundFlgIndex(index);
					Dialog.alert("请选择同一承运人航班！");
					return;
				}
				if (ckinFlag
						&& (index == 1?backCkin:goCkin)
						&& (productCode != (index == 1 ? goProductCode
								: backProductCode))) {
					Dialog.alert("已包航不同产品的CKIN航段，不能再选择CKIN航段！");
					$("input[name=roundTripDirect" + index + "]").attr(
							"checked", false);
					if (index == 0) {
						goCkin = false;
						$("#goSingleDirect").empty();
						$("#round_go_flightInfo").html("");
						isCkin = goCkin;
					}
					if (index == 1) {
						backCkin = false;
						$("backRoundTripDirect").empty();
						$("#round_back_flightInfo").html("");
						backCkin = false;
						isCkin = goCkin;
					}
					deleteRoundFlgIndex(index);
					return;
				}
			}
			if(index ==0){
				if(!compareGobackTime((flightDate+"-"+arriveTime),backFlightDepartTime)){
					Dialog.alert("回程出发时间必须晚于来程到达时间！");
					$("input[name=roundTripDirect" + index + "]").attr(
							"checked", false);
					return ;
				}
				goFlightArravilTime = flightDate+"-"+arriveTime;
			}
			if(index ==1){
				if(!compareGobackTime(goFlightArravilTime,(flightDate+"-"+departTime))){
					Dialog.alert("回程出发时间必须晚于来程到达时间！");
					$("input[name=roundTripDirect" + index + "]").attr(
							"checked", false);
					return ;
				}
				backFlightDepartTime = flightDate+"-"+departTime;
			}
			addOneofRoundTripFlight(index, carrier, flightDate, departAirport,
					arrivalAirport, flightNo, departTerminal, arriveTerminal,
					departTime, arriveTime, stops, mealType, planType, tax, yq,
					cabin, productName, productCode, ckin, price, discount,
					phyPrice, stopInfo);
			if (flag2) {
				if (index == 0) {

					$(".flightInfo_list_2").hide();
					goCkin = ckinFlag;
				}
				if (index == 1) {
					$(".flightInfo_list_3").hide();
					backCkin = ckinFlag;
				}
			}
			if (ckinFlag) {
				isCkin = ckinFlag;
			}
		}
	}
	if (roundTripflightArr.length >= 2) {
		realtimeFareSearch();
	}
}
function compareGobackTime(goTime,backTime){
	if(goTime.indexOf("+")<0){
		if((goTime.split("-")[0] == backTime.split("-")[0])&&(goTime.split("-")[1] > backTime.split("-")[1])) {
			return false;
		}
	}
	if(goTime.indexOf("+")>=0){
		if(goTime.split("-")[0] == backTime.split("-")[0]){
			return false;
		}
		if(goTime.split("-")[1].replace("+1","")>=backTime.split("-")[1]){
			return false;
		}
	}
	return true;
}