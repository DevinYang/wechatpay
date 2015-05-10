
function showSharingFlight(id){

		var target=$("#"+id).parent().find("."+id);
        handle = setTimeout(function(){target.css({"display":"block"});},500);
	
	}
function hiddenSharingFlight(){

	var target=$("#"+id).parent().find("."+id);
    handle = setTimeout(function(){target.css({"display":"none"});},500);			
}
function setCode(id){
	var cityName = $("#"+id).val();
	for(key in cityArr){
		if(cityArr[key]==cityName){
			if(id=='cityBegin')
			$("#city1").val(cityCodeArr[key]);
			if(id=='cityEnd')
			$("#city2").val(cityCodeArr[key]);	
		}
	}
}
//承运人全选
function singleFlightCheckAllCarrier(obj) {
	if (obj.checked) {
		$("input[name=singewayCarrier]").attr("checked", "checked");
		searchSingleFlightByTimesAndCarrier();
		return;
	}
	$("input[name=singewayCarrier]").attr("checked", false);
	searchSingleFlightByTimesAndCarrier();
}
//时间全选
function singleFlightCheckAllTime(obj) {
	if (obj.checked) {
		$("input[name=flightTimes]").attr("checked", "checked");
		searchSingleFlightByTimesAndCarrier();
		return;
	}
	$("input[name=flightTimes]").attr("checked", false);
	searchSingleFlightByTimesAndCarrier();
}
/**
 * 按承运人和时间查询
 * @return
 */
function searchSingleFlightByTimesAndCarrier(){
	//resetSingleNotDirectParam();
	if(dataObject!=""){
		var times = findTimeByElementName("flightTimes");
		if(document.getElementsByName("singleFlightCheckAllByTime")[0].checked){
			times = times + "e";
		}
		setOneTripFlight(dataObject,times,findCarrierByElementName("singewayCarrier"));
	}
}
//设置单程航班
function setOneTripFlight(data,times,carrier){
	$(".flightInfo_list_1").slideDown("slow");
	$("#oneTripDirectTbody").empty();
	$("#oneTripNotDirectTbody").empty();
	//单程直达
	$("#singleWay").empty();	
	//直达
	var directindex = 0;
	$("#oneTripDirectTbody").empty();
	if(data.direct.length==0){
		$("#oneTripDirectTbody").append("<tr>"
		+"<td colspan=\"10\" style=\"color: red;font-size:15\">查询航班不存在！"
		+"</td>"
		+"</tr>");
	}
	if(data.direct.length>0){
		
		var leaveDate = $("#leaveDate").val();
		var flightdate = setFormatDate(data.direct[0].date);
		if(leaveDate != flightdate){
			$("#singleTripDay").text(getDay(flightdate));
			$("#singleTripLeaveDate").text(flightdate);
			$("#singleTripCountDay").text(timeCount(flightdate));
			$("#oneTripFlightDateInfo").html("<font color=red>很抱歉,没有查询的该日期航班,系统为你推荐最近日期航班！</font>");
		}
		for(var i = 0;i<data.direct.length;i++){
	
			if(times.length == 0 && carrier.length == 0){
				setCommonDiretFlight(data.direct[i],i,"oneTripDirectTbody","price_radio","chooseOneTripDirect",-1);
			}
			if(times.length != 0){
				//6-12点
				if(times.indexOf("e")>=0 && data.direct[i].segments[0].departTime > 0 && data.direct[i].segments[0].departTime < 600 && carrier.indexOf(data.direct[i].segments[0].carrier) >= 0){
					setCommonDiretFlight(data.direct[i],directindex,"oneTripDirectTbody","price_radio","chooseOneTripDirect",-1);
					directindex++;
				}
				//6-12点
				if(times.indexOf("a")>=0 && data.direct[i].segments[0].departTime >= 600 && data.direct[i].segments[0].departTime < 1200 && carrier.indexOf(data.direct[i].segments[0].carrier) >= 0){
					setCommonDiretFlight(data.direct[i],directindex,"oneTripDirectTbody","price_radio","chooseOneTripDirect",-1);
					directindex++;
				}
				//12-13点
				if(times.indexOf("b")>=0 && data.direct[i].segments[0].departTime >= 1200 && data.direct[i].segments[0].departTime < 1300 && carrier.indexOf(data.direct[i].segments[0].carrier) >= 0){
					setCommonDiretFlight(data.direct[i],directindex,"oneTripDirectTbody","price_radio","chooseOneTripDirect",-1);
					directindex++;
					}
				//13-18点
				if(times.indexOf("c")>=0 && data.direct[i].segments[0].departTime >= 1300 && data.direct[i].segments[0].departTime < 1800 && carrier.indexOf(data.direct[i].segments[0].carrier) >= 0){
					setCommonDiretFlight(data.direct[i],directindex,"oneTripDirectTbody","price_radio","chooseOneTripDirect",-1);
					directindex++;
					}
				//18-24点
				if(times.indexOf("d")>=0 && data.direct[i].segments[0].departTime >= 1800 && data.direct[i].segments[0].departTime < 2400 && carrier.indexOf(data.direct[i].segments[0].carrier) >= 0){
					setCommonDiretFlight(data.direct[i],directindex,"oneTripDirectTbody","price_radio","chooseOneTripDirect",-1);
					directindex++;
					}
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
	var notDirectIndexi = 0;
	if(data.notDirect.length==0){
		$("#oneTripNotDirectTbody").append("<tr>"
		+"<td  colspan=\"10\" style=\"color: red;font-size:15\">查询中转航班不存在！"
		+"</td>"
		+"</tr>");
	}
	//中转
	
	if(data.notDirect.length>0){
		
		for(var i = 0;i<data.notDirect.length;i++){
					
						if(times.length == 0 && carrier.length == 0){
							setCommonTripNotDiretFlight(data.notDirect[i],-1,i,"oneTripNotDirectTbody");
						}else{
							//6-12点
							if(times.indexOf("a")>=0 && data.notDirect[i].segments[0].departTime >= 600 && data.notDirect[i].segments[0].departTime < 1200 && carrier.indexOf(data.notDirect[i].segments[0].carrier) >= 0){
								
								setCommonTripNotDiretFlight(data.notDirect[i],-1,notDirectIndexi,"oneTripNotDirectTbody");
								notDirectIndexi++;
							}
							//12-13点
							if(times.indexOf("b")>=0 && data.notDirect[i].segments[0].departTime >= 1200 && data.notDirect[i].segments[0].departTime < 1300 && carrier.indexOf(data.notDirect[i].segments[0].carrier) >= 0){
								setCommonTripNotDiretFlight(data.notDirect[i],-1,notDirectIndexi,"oneTripNotDirectTbody");
								notDirectIndexi++;
								}
							//13-18点
							if(times.indexOf("c")>=0 && data.notDirect[i].segments[0].departTime >= 1300 && data.notDirect[i].segments[0].departTime < 1800 && carrier.indexOf(data.notDirect[i].segments[0].carrier) >= 0){
								setCommonTripNotDiretFlight(data.notDirect[i],-1,notDirectIndexi,"oneTripNotDirectTbody");
								notDirectIndexi++;
								}
							//18-24点
							if(times.indexOf("d")>=0 && data.notDirect[i].segments[0].departTime >= 1800 && data.notDirect[i].segments[0].departTime < 2400 && carrier.indexOf(data.notDirect[i].segments[0].carrier) >= 0){
								setCommonTripNotDiretFlight(data.notDirect[i],-1,notDirectIndexi,"oneTripNotDirectTbody");
								notDirectIndexi++;
								}
					}
				}
		}
	hiddecss();//鼠标划过改变样式
	$(".hiddenTr").hide();
	$(".pjxx").css("display","none");
	resetTrColor($("#oneTripDirectTbody"));
}
function getStatus(status){
	if(status == "A"){
		return ">9";
	}
	return status;
}
//单程低价推荐
function setOneTripLowerVo(data){
	$("#lowerPriceFlightRecomand").empty();
	$("#lowerPriceFlightRecomandData").empty();
	if(data=="" || data == null){
		$("#lowerPriceFlightRecomand").append("<tr ><td colspan='8'><font color='red'>没有最低推荐价航班！</font></td></tr>");
		return ;
	}
	var vcabin = "";
	if(data.productName){
		vcabin = data.productName+"/"+data.cabin;
		}
	if(!data.productName){
		vcabin = data.cabin;
		}
	var discount = (data.discount == 10?"全价":data.discount+"折");
	$("#lowerPriceFlightRecomand").append(
			"<tr class='lowerclass'><td>"+AirportCache.getCityCnName(data.departCity)+"-"+AirportCache.getCityCnName(data.arrivalCity)+"</td>"
			+"<td>"+data.flightNo+"</td>"
			+"<td>"+data.flightDate+"</td>"
			+"<td>"+formatTime(data.departTime)+" "+formatTime(data.arrivalTime)+"</td>"
			+"<td>"+discount+"</td>"
			+"<td>"+data.planType+"</td>"
			+"<td>"+vcabin+"舱</td>"
			+"<td><input type='radio' name=\"lowerCommandRadio\" onclick = \"oneTriplowerPriceFlightSearch('"+data.status+"')\" /><a title='含税价："+(Number(data.tax)+Number(data.yq)+Number(data.ticketPrice))+"'>￥"+data.ticketPrice+"</a></td>"
			+"</tr>"
			);
	
	$("#lowerPriceFlightRecomandData").append(
			
			"<tr>"
			+"<td><input type='hidden' lowerpricetime = 'onetriplowerpricetime' value=\""+data.flightDate+" "+data.departTime+"\"></td>"
			+"<td><input name=\"flightSFCVOes[0].carrier\" value=\""+data.carrier+"\"></td>"
			+"<td><input name=\"flightSFCVOes[0].date\" value=\""+data.flightDate+"\"></td>"	
			+"<td><input name=\"flightSFCVOes[0].flightSegmentSFCVO[0].departAirport\" value=\""+data.departCity+"\"></td>"
			+"<td><input name=\"flightSFCVOes[0].flightSegmentSFCVO[0].arriveAirport\" value=\""+data.arrivalCity+"\"></td>"
			+"<td><input name=\"flightSFCVOes[0].flightSegmentSFCVO[0].flightNo\" value=\""+data.flightNo+"\"></td>"
			+"<td><input name=\"flightSFCVOes[0].flightSegmentSFCVO[0].departTerminal\" value=\""+data.departTerminal+"\"></td>"
			+"<td><input name=\"flightSFCVOes[0].flightSegmentSFCVO[0].arriveTerminal\" value=\""+data.arriveTerminal+"\"></td>"
			+"<td><input name=\"flightSFCVOes[0].flightSegmentSFCVO[0].departTime\" value=\""+data.departTime+"\"></td>"
			+"<td><input name=\"flightSFCVOes[0].flightSegmentSFCVO[0].arriveTime\" value=\""+data.arrivalTime+"\"></td>"
			+"<td><input name=\"flightSFCVOes[0].flightSegmentSFCVO[0].stops\" value=\""+data.stops+"\"></td>"
			+"<td><input name=\"flightSFCVOes[0].flightSegmentSFCVO[0].mealType\" value=\""+data.mealType+"\"></td>"
			+"<td><input name=\"flightSFCVOes[0].flightSegmentSFCVO[0].planType\" value=\""+data.planType+"\"></td>"
			+"<td><input name=\"flightSFCVOes[0].flightSegmentSFCVO[0].tax\" value=\""+data.tax+"\"></td>"
			+"<td><input name=\"flightSFCVOes[0].flightSegmentSFCVO[0].yq\" value=\""+data.yq+"\"></td>"
			+"<td><input name=\"flightSFCVOes[0].flightSegmentSFCVO[0].cabin\" value=\""+data.cabin+"\" /></td>"
			+"<td><input name=\"flightSFCVOes[0].flightSegmentSFCVO[0].vcabin\" value=\""+data.cabin+"\" /></td>"
			+"<td><input name=\"flightSFCVOes[0].flightSegmentSFCVO[0].productName\" value=\""+data.productName+"\"></td>"
			+"<td><input name=\"flightSFCVOes[0].flightSegmentSFCVO[0].productCode\" value=\""+data.productCode+"\"></td>"
			+"<td><input name=\"flightSFCVOes[0].flightSegmentSFCVO[0].ckin\" value=\""+data.ckin+"\"></td>"
			+"<td><input name=\"flightSFCVOes[0].flightSegmentSFCVO[0].price\" value=\""+data.ticketPrice+"\"></td>"
			+"<td><input name=\"flightSFCVOes[0].flightSegmentSFCVO[0].discount\" value=\""+data.discount+"\"></td>"
			+"<td><input name=\"flightSFCVOes[0].flightSegmentSFCVO[0].phyPrice\" value=\""+data.phyPrice+"\"></td>"
			+"<td><input name=\"flightSFCVOes[0].flightSegmentSFCVO[0].stopInfo\" value=\""+data.stopInfo+"\"></td>"
			+"</tr>"
	);
	
}

//单程中转
function setSingleNotDirectFlight(dataNotDirecti,notDirectIndexi){
	
	var flightSegmentLenhgth = dataNotDirecti.segments.length;
	for(var j = 0 ;j<flightSegmentLenhgth;j++){
		
		//包机和共享航班显示
		var flight ;
		if(!dataNotDirecti.segments[j].sharing){
			flight = "<div onclick=showOrhidden(\"notdirectCabin"+notDirectIndexi+"-"+j+"\") ";
		}else{
			flight = "<div onclick=showOrhidden(\"notdirectCabin"+notDirectIndexi+"-"+j+"\")  title=\"实际承运人："+dataNotDirecti.segments[j].shareCarrier+"\"   ";
		}
		if(dataNotDirecti.segments[j].chartAilne) {
			flight += "class=\"showTd2\">";
		}else{
			flight += "class=\"showTd1\">";
		}
		
		var price ="";
		var length =0;
		if(dataNotDirecti.segments[j].cabins[0].flightCabinProductInfoes!=null&&dataNotDirecti.segments[j].cabins[0].flightCabinProductInfoes!=""){
			
			length =dataNotDirecti.segments[j].cabins[0].flightCabinProductInfoes.length;
		}
		if(length>0){
			
			for(var l = 0;l<dataNotDirecti.segments[j].cabins[0].flightCabinProductInfoes.length;l++){
				
				var hasMatch = dataNotDirecti.segments[j].cabins[0].flightCabinProductInfoes[l].hasMatch;
				var hasSeat = dataNotDirecti.segments[j].cabins[0].flightCabinProductInfoes[l].hasSeat;
				if(!hasMatch|| !hasSeat){
					price += dataNotDirecti.segments[j].cabins[0].flightCabinProductInfoes[l].productName
					+"(￥"
					+dataNotDirecti.segments[j].cabins[0].flightCabinProductInfoes[l].ticketPrice 
					+")";
				}
				
				if(hasMatch && hasSeat){
					
					price += "<input type=\"radio\" disabled flight=\"flight"+notDirectIndexi+""+j
						+"\" onclick=choseOneTripSegment('flight"+notDirectIndexi
						+"','"+flightSegmentLenhgth
						+"','notDirectflight"+notDirectIndexi
						+""+j+"','"+dataNotDirecti.segments[j].number
						+"','"+dataNotDirecti.segments[j].departAirport
						+"','"+dataNotDirecti.segments[j].arriveAirport
						+"','"+dataNotDirecti.segments[j].cabins[0].name
						+"','"+dataNotDirecti.date+"','"+j
						+"','"+dataNotDirecti.carrier
						+"','"+dataNotDirecti.segments[j].departTerminal
						+"','"+dataNotDirecti.segments[j].arriveTerminal
						+"','"+dataNotDirecti.segments[j].departTime
						+"','"+dataNotDirecti.segments[j].arriveTime
						+"','"+dataNotDirecti.segments[j].stops
						+"','"+dataNotDirecti.segments[j].mealType
						+"','"+dataNotDirecti.segments[j].planType
						+"','"+dataNotDirecti.segments[j].tax
						+"','"+dataNotDirecti.segments[j].yq
						+"','"+$("#city_1").val()
						+"','"+$("#city_2").val()	
						+"','"+dataNotDirecti.segments[j].cabins[0].flightCabinProductInfoes[l].productName
						+"','"+dataNotDirecti.segments[j].cabins[0].flightCabinProductInfoes[l].productCode
						+"','"+dataNotDirecti.segments[j].cabins[0].flightCabinProductInfoes[l].ckin
						+"','"+dataNotDirecti.segments[j].cabins[0].flightCabinProductInfoes[l].ticketPrice 
						+"','"+dataNotDirecti.segments[j].cabins[0].discount 
						+"','"+dataNotDirecti.segments[j].cabins[0].phyPrice 
						+"') name=\"singlenotDirectflight"+notDirectIndexi+""+j+"\">"
						+dataNotDirecti.segments[j].cabins[0].flightCabinProductInfoes[l].productName
						+"(￥"
						+dataNotDirecti.segments[j].cabins[0].flightCabinProductInfoes[l].ticketPrice 
						+")";
						
					}
				}
		}
		
		 var discount = (dataNotDirecti.segments[j].cabins[0].discount == 10?"全价":dataNotDirecti.segments[j].cabins[0].discount+"折");
			$("#oneTripNotDirectTbody").append("<tr >"+"<td>"+(1+notDirectIndexi)+"-"+(1+j)+"</td><td>"+dataNotDirecti.segments[j].departAirport+"("+dataNotDirecti.segments[j].departTerminal+")-"+dataNotDirecti.segments[j].arriveAirport+"("+dataNotDirecti.segments[j].arriveTerminal+")"
					+"</td><td>"+dataNotDirecti.segments[j].departTime+" "+dataNotDirecti.segments[j].arriveTime
					+"</td><td>"
					+flight
					+"<b>"
					+dataNotDirecti.segments[j].number+"</b></div></td>"
					+"<td>"+dataNotDirecti.segments[j].planType+"</td>"
					+"<td>"+dataNotDirecti.segments[j].stops+"</td>"
					+"<td>"+dataNotDirecti.segments[j].mealType+"</td>"
					+"<td>"+(dataNotDirecti.segments[j].tax==null?"":dataNotDirecti.segments[j].tax)+"/"+(dataNotDirecti.segments[j].yq==null?"":dataNotDirecti.segments[j].yq)+"</td>"
					+"<td>"+dataNotDirecti.segments[j].cabins[0].name
					+"("
					+getStatus(dataNotDirecti.segments[j].cabins[0].status)
					+")/"
					+discount
					+"</td><td>"
					+price
					+"</td>"
					+"</tr>");
				//循环舱位
				
					for(var k =1;k<dataNotDirecti.segments[j].cabins.length;k++){
						var price ="";
						if(dataNotDirecti.segments[j].cabins[0].flightCabinProductInfoes!=null&&dataNotDirecti.segments[j].cabins[0].flightCabinProductInfoes.length>0){
							for(var n =1;n<dataNotDirecti.segments[j].cabins[k].flightCabinProductInfoes.length;n++){
								var hasMatch = dataNotDirecti.segments[j].cabins[k].flightCabinProductInfoes[n].hasMatch;
								var hasSeat = dataNotDirecti.segments[j].cabins[k].flightCabinProductInfoes[n].hasSeat;
								if(!hasMatch|| !hasSeat){
									price += dataNotDirecti.segments[j].cabins[k].flightCabinProductInfoes[n].productName
									+"(￥"
									+dataNotDirecti.segments[j].cabins[k].flightCabinProductInfoes[n].ticketPrice 
									+")";
								}
								if(hasMatch && hasSeat){
									price += "<input type=\"radio\" flight=\"flight"+notDirectIndexi+"\"  onclick=choseOneTripSegment(\"flight"+notDirectIndexi+"\",\""+flightSegmentLenhgth+"\",\"notDirectflight"+notDirectIndexi+""+j+"\",\""+dataNotDirecti.segments[j].number+"\",\""+dataNotDirecti.segments[j].departAirport+"\",\""+dataNotDirecti.segments[j].arriveAirport+"\",\""+dataNotDirecti.segments[j].cabins[k].name+"\",\""+dataNotDirecti.date+"\",\""+j
										+"\",'"+dataNotDirecti.carrier
										+"','"+dataNotDirecti.segments[j].departTerminal
										+"','"+dataNotDirecti.segments[j].arriveTerminal
										+"','"+dataNotDirecti.segments[j].departTime
										+"','"+dataNotDirecti.segments[j].arriveTime
										+"','"+dataNotDirecti.segments[j].stops
										+"','"+dataNotDirecti.segments[j].mealType
										+"','"+dataNotDirecti.segments[j].planType
										+"','"+dataNotDirecti.segments[j].tax
										+"','"+dataNotDirecti.segments[j].yq
										+"','"+$("#city_1").val()
										+"','"+$("#city_2").val()
										+"','"+dataNotDirecti.segments[j].cabins[k].flightCabinProductInfoes[n].refundCondCondition
										+"','"+dataNotDirecti.segments[j].cabins[k].flightCabinProductInfoes[n].changeCondContion
										+"','"+dataNotDirecti.segments[j].cabins[k].flightCabinProductInfoes[n].transferCondContion
										+"','"+dataNotDirecti.segments[j].cabins[k].flightCabinProductInfoes[n].productName
										+"','"+dataNotDirecti.segments[j].cabins[k].flightCabinProductInfoes[n].productCode
										+"','"+dataNotDirecti.segments[j].cabins[k].flightCabinProductInfoes[n].ckin
										+"','"+dataNotDirecti.segments[j].cabins[k].flightCabinProductInfoes[n].ticketPrice
										+"','"+dataNotDirecti.segments[j].cabins[k].discount
										+"','"+dataNotDirecti.segments[j].cabins[k].phyPrice
										+"') name=\"singlenotDirectflight"+notDirectIndexi+""+j+"\">"
										+dataNotDirecti.segments[j].cabins[k].flightCabinProductInfoes[n].productName
										+"(￥"
										+dataNotDirecti.segments[j].cabins[k].flightCabinProductInfoes[n].ticketPrice 
										+")";
								}
							}
						}
						var discount = (dataNotDirecti.segments[j].cabins[k].discount == 10?"全价":dataNotDirecti.segments[j].cabins[k].discount+"折");
						$("#oneTripNotDirectTbody").append("<tr name=\"notdirectCabin"+notDirectIndexi+"-"+j+"\" class=\"hiddenTr\" ><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td>"
								+dataNotDirecti.segments[j].cabins[k].name
								+"("
								+getStatus(dataNotDirecti.segments[j].cabins[k].status)
								+")/"
								+discount
								+"</td><td>" +
								price
								+"</td></td></tr>"
								);
						}
		
	}
	resetTrColor($("#oneTripNotDirectTbody"));
}
function addOneTripDirect(flightNo,departAirport,arrivalAirport,flightDate,cabin,carrier,departTerminal,
		arriveTerminal,departTime,arriveTime,stops,mealType,planType,tax,yq,
		productName,productCode,ckin,price,discount,phyPrice,stopInfo){
	lowerFlightFlag = false;
	$("input[name=lowerCommandRadio]").attr("checked",false);
	$("#chooseFlight").html("");
	$("#goSingleDirect").empty();
	resetSingleNotDirectParam();
	var discounts = (discount == 10?"全价":discount+"折");
	var showInfo = departAirport+"-"+arrivalAirport+" "+formatTime(departTime)+"-"+formatTime(arriveTime)+" "+flightNo+" "+cabin+"舱 "+ price+"元("+discounts+")";
	$("#chooseFlight").html(showInfo);
	$("#goSingleDirect").append("<tr>"
			
			+"<td><input name=\"flightSFCVOes[0].carrier\" value=\""+carrier+"\"></td>"
			+"<td><input name=\"flightSFCVOes[0].date\" value=\""+setFormatDate(flightDate)+"\"></td>"
			+"<td><input name=\"flightSFCVOes[0].flightSegmentSFCVO[0].departAirport\" value=\""+departAirport+"\"></td>"
			+"<td><input name=\"flightSFCVOes[0].flightSegmentSFCVO[0].arriveAirport\" value=\""+arrivalAirport+"\"></td>"
			+"<td><input name=\"flightSFCVOes[0].flightSegmentSFCVO[0].flightNo\" value=\""+flightNo+"\"></td>"
			+"<td><input name=\"flightSFCVOes[0].flightSegmentSFCVO[0].departTerminal\" value=\""+departTerminal+"\"></td>"
			+"<td><input name=\"flightSFCVOes[0].flightSegmentSFCVO[0].arriveTerminal\" value=\""+arriveTerminal+"\"></td>"
			+"<td><input name=\"flightSFCVOes[0].flightSegmentSFCVO[0].departTime\" value=\""+departTime+"\"></td>"
			+"<td><input name=\"flightSFCVOes[0].flightSegmentSFCVO[0].arriveTime\" value=\""+arriveTime+"\"></td>"
			+"<td><input name=\"flightSFCVOes[0].flightSegmentSFCVO[0].stops\" value=\""+stops+"\"></td>"
			+"<td><input name=\"flightSFCVOes[0].flightSegmentSFCVO[0].mealType\" value=\""+mealType+"\"></td>"
			+"<td><input name=\"flightSFCVOes[0].flightSegmentSFCVO[0].planType\" value=\""+planType+"\"></td>"
			+"<td><input name=\"flightSFCVOes[0].flightSegmentSFCVO[0].tax\" value=\""+tax+"\"></td>"
			+"<td><input name=\"flightSFCVOes[0].flightSegmentSFCVO[0].yq\" value=\""+yq+"\"></td>"
			+"<td><input name=\"flightSFCVOes[0].flightSegmentSFCVO[0].cabin\" value=\""+cabin+"\"></td>"
			+"<td><input name=\"flightSFCVOes[0].flightSegmentSFCVO[0].vcabin\" value=\""+cabin+"\"></td>"
			+"<td><input name=\"flightSFCVOes[0].flightSegmentSFCVO[0].productName\" value=\""+productName+"\"></td>"
			+"<td><input name=\"flightSFCVOes[0].flightSegmentSFCVO[0].productCode\" value=\""+productCode+"\"></td>"
			+"<td><input name=\"flightSFCVOes[0].flightSegmentSFCVO[0].ckin\" value='"+ckin+"' /></td>"
			+"<td><input name=\"flightSFCVOes[0].flightSegmentSFCVO[0].price\" value=\""+price+"\"></td>"
			+"<td><input name=\"flightSFCVOes[0].flightSegmentSFCVO[0].discount\" value=\""+discount+"\"></td>"
			+"<td><input name=\"flightSFCVOes[0].flightSegmentSFCVO[0].phyPrice\" value=\""+phyPrice+"\"></td>"
			+"<td><input name=\"flightSFCVOes[0].flightSegmentSFCVO[0].stopInfo\" value=\""+stopInfo+"\"></td>"
			+"</tr>"
			);
}

//单程中转回位
//TODO
function resetSingleNotDirectParam(){
	$("#goSingleNotDirect").empty();
	flightSegmentArr = new Array();
	$("input[name^=singlenotDirectflight]").attr("checked",false);
	flightName =[];
	flightArr =[];
	flightcount=0;
	$("#adultSFC").attr("value","0");
	$("#childSFC").attr("value","0");
	$("#infantSFC").attr("value","0");
}
//单程直达回位
function resetSingleDirectParam(){
	$("#goSingleDirect").empty();
}
//单程
function  choseOneTripSegment(flight,count,name,flightNo,departAirport,arrivalAirport,cabin,
		flightDate,i,carrier,departTerminal,arriveTerminal,departTime,arriveTime,stops,mealType,planType,tax,yq,departCity,
		arriveCity,refundCondCondition,changeCondContion,transferCondContion,productName,productCode,ckin,price,discount,phyPrice){
	resetSingleDirectParam();//直达回复
	$(".pjxx").css("display","none");
	$("#generalCustomer").empty();
	//第一次点击
	if(flightName ==""){
		flightcount++;//航段数
		flightArr.push(name);//保存航段
		flightSegmentArr.push(i);
		flightName = flight;
		addOneTripNotDirect("goSingleNotDirect",i,flightNo,departAirport,arrivalAirport,flightDate,cabin,carrier,departTerminal,arriveTerminal,
				departTime,arriveTime,stops,mealType,planType,tax,yq,true,departCity,arriveCity,
				refundCondCondition,changeCondContion,transferCondContion,productName,productCode,ckin,price,discount,phyPrice);
	}else {
		if(flightName == flight){
			var isFlag = false;
			for(var k = 0;k < flightSegmentArr.length;k++){
				if(i == flightSegmentArr[k]){
					isFlag = true;
				}
			}
			if(isFlag){
				$("#singleFlightSegmentSFCVO"+i).attr("value",cabin);
			}else{
				flightSegmentArr.push(i);
				addOneTripNotDirect("goSingleNotDirect",i,flightNo,departAirport,arrivalAirport,flightDate,cabin,carrier,departTerminal,arriveTerminal,departTime,arriveTime,stops,mealType,planType,tax,yq,false,
						departCity,arriveCity,refundCondCondition,changeCondContion,transferCondContion,productName,productCode,ckin,price,discount,phyPrice);
			}
			var flag = false;
			for(var i = 0;i<flightArr.length;i++){
				if(name == flightArr[i]){
					flag = true;
				}
			}
			if(!flag){
				flightArr.push(name);
				flightcount++;
			}
			if(count==flightcount){
				realtimeFareSearch();
			}
		}
		//选择不同航班
		else{
			Dialog.alert("请选择同一航班！");
			resetSingleNotDirectParam();
			}
	}
}
//单程直达
function chooseOneTripDirect(seatCount,carrier,departAirport,arrivalAirport,flightNo,cabin,flightDate,departTerminal,arriveTerminal,
		departTime,arriveTime,stops,mealType,planType,tax,yq,productName,productCode,ckin,price,discount,phyPrice,stopInfo,index,flag2)
{
	if(!getDeadLine(departTime,setFormatDate(flightDate))){
		Dialog.alert("已起飞或离起飞时间1小时内的航班不允许预定");
		$("input[name=price_radio]").attr("checked",false);
		return ;
	}
	var childCount = $("#childCount").val();
	var adultCount = $("#adultCount").val();
	//seatCount 
	//A:>9 最多选9个旅客
	//数字
	//字母(Q、S)无座 无单选按钮
	if(!isNaN(seatCount) && Number(seatCount) < (Number(childCount)+Number(adultCount))){
		Dialog.alert("该航班座位数小于预选成人加儿童数，不能被预定，请选择其他航班！");
		$("input[name=price_radio]").attr("checked",false);
		return ;
	}
	addOneTripDirect(flightNo,departAirport,arrivalAirport,flightDate,cabin,carrier,departTerminal,arriveTerminal,
			departTime,arriveTime,stops,mealType,planType,tax,yq,productName,productCode,ckin,price,discount,phyPrice,stopInfo);
	realtimeFareSearch();
}

//低价推荐
function oneTriplowerPriceFlightSearch(seatCount){
	var timeArr = $("input[lowerpricetime=onetriplowerpricetime]").val().split(" ");
	if(!getDeadLine(timeArr[1],timeArr[0])){
		Dialog.alert("已起飞或离起飞时间1小时内的航班不允许预定");
		$("input[name=lowerCommandRadio]").attr("checked",false);
		return ;
	}
	var childCount = $("#childCount").val();
	var adultCount = $("#adultCount").val();
	if(seatCount.indexOf("A")>-1){

	} else if(Number(seatCount) < (Number(childCount)+Number(adultCount))){
		Dialog.alert("该低价推荐航班座位数小于预选成人加儿童数，不能被预定，请选择其他航班！");
		$("input[name=lowerCommandRadio]").attr("checked",false);
		return ;
	}
	$("input[name=price_radio]").attr("checked",false);//单程radio去掉
	$("input[name^=roundTripDirect]").attr("checked",false);//来回程radio去掉
	
	lowerFlightFlag = true;
	realtimeFareSearch();
}
