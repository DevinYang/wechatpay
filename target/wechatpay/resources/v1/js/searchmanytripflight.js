

//初始化选择航班的全局变量
function initManyFlightParams(){
	manyTripflightArr = [];
	pageCarrier="";
	isCkin = false;
}
//设置多航段包括V舱和低价推荐
function manyTripFlight(datavo){
	
	var data = datavo.dtos;
	var flightCount = data.length;
	var lowerFlightList = datavo.lowerList;
	
	var index = 0;
	for(j in data){
		
		if(j == 0){ manyTripDate0 = data[j]; index = 0; setDefaultCarrier(data[j].carrier);}
		if(j == 1){ manyTripDate1 = data[j]; index = 1;}
		if(j == 2){ manyTripDate2 = data[j]; index = 0;}
		if(j == 3){ manyTripDate3 = data[j]; index = 1;}
		if(j == 4){ manyTripDate4 = data[j]; index = 0;}
		if(j == 5){ manyTripDate5 = data[j]; index = 1;}
		if(j == 6){ manyTripDate6 = data[j]; index = 0;}
		if(j == 7){ manyTripDate7 = data[j]; index = 1;}
		var keycount = j;
		setManyTripFlight(keycount,data[j],"abcde",findCarrierByElementName("manyTripCarrier"+keycount),flightCount);
		manyTripFlightCount = flightCount;
		setManyVcabinFlight("manyTripVcabin"+j,j,data[j].vcanbin,index,flightCount);
	}
	setManyTripLowerVo(lowerFlightList);
}
//来回程低价推荐
function setManyTripLowerVo(data){
	$("#lowerPriceFlightRecomand").empty();
	$("#lowerPriceFlightRecomandData").empty();
	if(data == null || data.length==0){
		$("#lowerPriceFlightRecomand").append("<tr ><td colspan='8'><font color='red'>没有最低推荐价航班！</font></td></tr>");
		return ;
	}
	var totalPrice = 0;
	var totalYQCNandPrice = 0;
	for(var i = 0;i<Number(data.length);i++){
		totalPrice += Number(data[i].ticketPrice);
		totalYQCNandPrice += Number(data[i].tax) +Number(data[i].yq) + Number(data[i].ticketPrice);
	}
	for(var i = 0;i<Number(data.length);i++){
		var vcabin = "";
		if(data[i].productName){
			vcabin = data[i].productName+"/"+data[i].cabin;
			}
		if(!data[i].productName){
			vcabin = data[i].cabin;
			}
		var radio="";
		var discount = (data[i].discount == 10?"全价":data[i].discount+"折");
		
		if(i==0){
			radio = "<td rowspan='"+Number(data.length)+"'><input type='radio' name=\"manyTriplowerPriceFlight\" onclick=\"manyTriplowerPriceFlightSearch('"+data[i].status+"')\" /> <a title='含税价："+totalYQCNandPrice+"'>￥"+totalPrice+"</a></td>";
			$("#lowerPriceFlightRecomand").append(
					"<tr class='lowerclass'><td>"+AirportCache.getCityCnName(data[i].departCity)+"-"+AirportCache.getCityCnName(data[i].arrivalCity)+"</td>"
					+"<td>"+data[i].flightNo+"</td>"
					+"<td>"+data[i].flightDate+"</td>"
					+"<td>"+formatTime(data[i].departTime)+" "+formatTime(data[i].arrivalTime)+"</td>"
					+"<td>"+discount+"</td>"
					+"<td>"+data[i].planType+"</td>"
					+"<td>"+vcabin+"舱</td>"
					+radio
					+"</tr>"
					);
		} 
		if(i!=0) {
			$("#lowerPriceFlightRecomand").append(
					"<tr class='lowerclass'><td>"+AirportCache.getCityCnName(data[i].departCity)+"-"+AirportCache.getCityCnName(data[i].arrivalCity)+"</td>"
					+"<td>"+data[i].flightNo+"</td>"
					+"<td>"+data[i].flightDate+"</td>"
					+"<td>"+formatTime(data[i].departTime)+" "+formatTime(data[i].arrivalTime)+"</td>"
					+"<td>"+discount+"</td>"
					+"<td>"+data[i].planType+"</td>"
					+"<td>"+vcabin+"舱</td>"
					+"</tr>"
			);
		}
		$("#lowerPriceFlightRecomandData").append(
				"<tr>"
				+"<td><input lowerpricetime = \"manytriplowerpricetime"+i+"\" value=\""+data[i].flightDate+" "+data[i].departTime+"\"></td>"
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
	triplowerpriceclass();
}
function manyTriplowerPriceFlightSearch(seatCount){
	
	var timeArr = $("input[lowerpricetime=manytriplowerpricetime0]").val().split(" ");
	if(!getDeadLine(timeArr[1],timeArr[0])){
		Dialog.alert("已起飞或离起飞时间1小时内的航班不允许预定");
		$("input[name=manyTriplowerPriceFlight]").attr("checked",false);
		return ;
	}
	var childCount = $("#childCount").val();
	var adultCount = $("#adultCount").val();
	if(!isNaN(seatCount) && Number(seatCount) < (Number(childCount)+Number(adultCount))){
		Dialog.alert("该低价推荐航班座位数小于预选成人加儿童数，不能被预定，请选择其他航班！");
		$("input[name=manyTriplowerPriceFlight]").attr("checked",false);
		return ;
	}
	$("input[name^=manyTripVcabin]").attr("checked",false);//多程V舱radio去掉
	$("input[name^=manyTripDirect]").attr("checked",false);//多程radio去掉
	manyTripflightArr = [];
	lowerFlightFlag = true;
	realtimeFareSearch();
}
//设置V舱 flightCount:航班程数 ，index 0 1 0 1 key 韩端下标
function setManyVcabinFlight(vcabinid,key,vcabindata,index,flightCount){
	$("#"+vcabinid).empty();
	if(vcabindata.length==0){
		$("#"+vcabinid).append("<tr style='background-color: #fff;'>"
							  +"<td class=\"tr_vcabin0\" colspan='9' align='center' style='color:red'>第"+(Number(key)+1)+"程没有开放V舱的航班！</td>");
	}
	for(var i = 0 ;i<vcabindata.length;i++){
		$("#"+vcabinid).append(
				"<tr class='tr_vcabin"+index+"' >"
				+"<td><input type=\"radio\" name="+vcabinid+" onclick=\"chooseManyTripDirect('"+vcabindata[i].status+"','"
				+vcabinid
				+"','"+key
				+"','"+vcabindata[i].departCity
				+"','"+vcabindata[i].arrivalCity
				+"','"+vcabindata[i].flightNo
				+"','"+vcabindata[i].cabin
				+"','"+vcabindata[i].flightDate
				+"','"+vcabindata[i].carrier
				+"','"+vcabindata[i].departTerminal
				+"','"+vcabindata[i].arriveTerminal
				+"','"+vcabindata[i].departTime
				+"','"+vcabindata[i].arrivalTime
				+"','"+vcabindata[i].stops
				+"','"+vcabindata[i].mealType
				+"','"+vcabindata[i].planType
				+"','"+vcabindata[i].tax
				+"','"+vcabindata[i].yq
				+"','"+vcabindata[i].refundCondCondition
				+"','"+vcabindata[i].refundCondConditionDetail
				+"','"+vcabindata[i].changeCondContion
				+"','"+vcabindata[i].changeCondContionDetail
				+"','"+vcabindata[i].transferCondContion
				+"','"+vcabindata[i].productName
				+"','"+vcabindata[i].productCode
				+"','"+vcabindata[i].ckin
				+"','"+vcabindata[i].ticketPrice
				+"','"+vcabindata[i].discount
				+"','"+vcabindata[i].phyPrice
				+"',false,"+flightCount+",'"+vcabindata[i].stopInfo+"')\"></input></td>"
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
//设置单个航程航班  key : 0-7
function setManyTripFlight(key,data,times,carrier,flightCount){
	var directId = "directTbody_3_"+key;
	var index = Number(key);
	$("#"+directId).empty();
	//直达
	if(data == null||data.direct==null||data.direct.length==0){
		$("#"+directId).append("<tr>"
				+"<td colspan=\"10\" style=\"color: red;font-size:15\">查询航班不存在！"
				+"</td>"
				+"</tr>");
		return ;
	}
	if(data.direct.length>0){
		var leaveDate = $("#voleaveDate"+index).val();
		var flightdate = setFormatDate(data.direct[0].date);
		if(leaveDate != flightdate){
			$("#manyTripleavelday"+index).text(getDay(flightdate));
			$("#manyTripleavelDate"+index).text(flightdate);
			$("#manyTripleavelcountday"+index).text(timeCount(flightdate));
			$("#manyTripFlightDateInfo"+index).html("<font color=red>很抱歉,没有查询的该日期航班,系统为你推荐最近日期航班！</font>");
		}
		var directindex = 0;
		for(var i = 0;i<data.direct.length;i++){

			//0-6点
			if(times.indexOf("e")>=0 && data.direct[i].segments[0].departTime >= 0 && data.direct[i].segments[0].departTime < 600 && carrier.indexOf(data.direct[i].segments[0].carrier)>=0){
				setDirectOneOfManyTrip(data.direct[i],index,directindex,directId,flightCount);
				directindex++;
			}
			//6-12点
			if(times.indexOf("a")>=0 && data.direct[i].segments[0].departTime >= 600 && data.direct[i].segments[0].departTime < 1200 && carrier.indexOf(data.direct[i].segments[0].carrier)>=0){
				setDirectOneOfManyTrip(data.direct[i],index,directindex,directId,flightCount);
				directindex++;
			}
			//12-13点
			if(times.indexOf("b")>=0 && data.direct[i].segments[0].departTime >= 1200 && data.direct[i].segments[0].departTime < 1300 && carrier.indexOf(data.direct[i].segments[0].carrier)>=0){
				setDirectOneOfManyTrip(data.direct[i],index,directindex,directId,flightCount);
				directindex++;
				}
			//13-18点
			if(times.indexOf("c")>=0 && data.direct[i].segments[0].departTime >= 1300 && data.direct[i].segments[0].departTime < 1800 && carrier.indexOf(data.direct[i].segments[0].carrier)>=0){
				setDirectOneOfManyTrip(data.direct[i],index,directindex,directId,flightCount);
				directindex++;
				}
			//18-24点
			if(times.indexOf("d")>=0 && data.direct[i].segments[0].departTime >= 1800 && data.direct[i].segments[0].departTime < 2400 && carrier.indexOf(data.direct[i].segments[0].carrier)>=0){
				setDirectOneOfManyTrip(data.direct[i],index,directindex,directId,flightCount);
				directindex++;
				}
			
		}
		hiddecss();//鼠标划过改变样式
		$(".hiddenTr").hide();
		$(".pnrMeal").each(function(i,d){
			var $d = $(d);
			var html = $d.html();
			if(html){
				if(meals[html.trim()]){
					$d.html(meals[html.trim()]);
				}
			}
		});
		resetTrColor($("#"+directId));
	}
}

//index 为0-7；i为第 （index+1）段的滴（i+0）段航班
function setDirectOneOfManyTrip(flightData,index,i,directId,flightCount){
	

	var flight ="" ;
	if(!flightData.segments[0].sharing && !flightData.segments[0].chartAilne){
		
		flight = "<div onclick=showOrhidden('manytripDirectCabin"+index+""+i+"') class=\"showTd1\"  ><b>"+flightData.segments[0].number+"</b></div>";
	}
	
	if(!flightData.segments[0].sharing && flightData.segments[0].chartAilne){
		
		flight = "<div onclick=showOrhidden('manytripDirectCabin"+index+""+i+"') class=\"showTd2\" ><b>"+flightData.segments[0].number+"</b></div>";
	}
	
	
	if(flightData.segments[0].sharing  && !flightData.segments[0].chartAilne){
		
		flight = "<div onclick=showOrhidden('manytripDirectCabin"+index+""+i+"')  title=\"实际承运人："+flightData.segments[0].shareCarrier+"\" class=\"showTd2\"  ><b>*"+flightData.segments[0].number+"</b></div>";
	}
	if(flightData.segments[0].sharing  && flightData.segments[0].chartAilne){
		
		flight = "<div onclick=showOrhidden('manytripDirectCabin"+index+""+i+"')  title=\"实际承运人："+flightData.segments[0].shareCarrier+"\" class=\"showTd2\"  ><b>*"+flightData.segments[0].number+"</b></div>";
	}
	var price="";
	for(var j = 0 ;j<flightData.segments[0].cabins[0].flightCabinProductInfoes.length;j++){
		var hasMatch = flightData.segments[0].cabins[0].flightCabinProductInfoes[j].hasMatch;
		var hasSeat = flightData.segments[0].cabins[0].flightCabinProductInfoes[j].hasSeat;
		if(!hasMatch || !hasSeat){
			price +=flightData.segments[0].cabins[0].flightCabinProductInfoes[j].productName
			+"(￥"
			+flightData.segments[0].cabins[0].flightCabinProductInfoes[j].ticketPrice 
			+")";
		}
		if(hasMatch && hasSeat){
			
			price += "<input type=\"radio\" onclick=\"chooseManyTripDirect('"+flightData.segments[0].cabins[0].status+"','manyTripDirect"+index+""+i
					+"','"+index
		
					+"','"+flightData.segments[0].departAirport
					+"','"+flightData.segments[0].arriveAirport
					+"','"+flightData.segments[0].number
					+"','"+flightData.segments[0].cabins[0].name
					+"','"+setFormatDate(flightData.date)
					+"','"+flightData.segments[0].carrier
					+"','"+flightData.segments[0].departTerminal
					+"','"+flightData.segments[0].arriveTerminal
					+"','"+flightData.segments[0].departTime
					+"','"+flightData.segments[0].arriveTime
					+"','"+flightData.segments[0].stops
					+"','"+flightData.segments[0].mealType
					+"','"+flightData.segments[0].planType
					+"','"+flightData.segments[0].tax
					+"','"+flightData.segments[0].yq
					+"','"+flightData.segments[0].cabins[0].flightCabinProductInfoes[j].refundCondCondition
					+"','"+flightData.segments[0].cabins[0].flightCabinProductInfoes[j].refundCondConditionDetail
					+"','"+flightData.segments[0].cabins[0].flightCabinProductInfoes[j].changeCondContion
					+"','"+flightData.segments[0].cabins[0].flightCabinProductInfoes[j].changeCondContionDetail
					+"','"+flightData.segments[0].cabins[0].flightCabinProductInfoes[j].transferCondContion
					+"','"+flightData.segments[0].cabins[0].flightCabinProductInfoes[j].productName
					+"','"+flightData.segments[0].cabins[0].flightCabinProductInfoes[j].productCode
					+"','"+flightData.segments[0].cabins[0].flightCabinProductInfoes[j].ckin
					+"','"+flightData.segments[0].cabins[0].flightCabinProductInfoes[j].ticketPrice
					+"','"+flightData.segments[0].cabins[0].discount
					+"','"+flightData.segments[0].cabins[0].phyPrice
					
					+"',true,'"+flightCount+"','"+flightData.segments[0].stopInfo+"')\" name=\"manyTripDirect"+index+"\">"
					+flightData.segments[0].cabins[0].flightCabinProductInfoes[j].productName
					+"(￥"
					+flightData.segments[0].cabins[0].flightCabinProductInfoes[j].ticketPrice 
					+")";
			}
	}
	var taxYq = (flightData.segments[0].tax==null?"":flightData.segments[0].tax)+"/"+(flightData.segments[0].yq==null?"":flightData.segments[0].yq);
	//var discount = flightData.segments[0].cabins[0].discount == 10?"全价":flightData.segments[0].cabins[0].discount+"折";
	var discountd = flightData.segments[0].cabins[0].discount;
	var discount="";
	if(discountd==10){discount ="/全价";}
	if(discountd==""){discount ="";}
	if(discountd != 0 && discountd != 10){discount ="/"+discountd+"折";}
	$("#"+directId).append("<tr>"
			+"<td>"+(i+1)
			+"</td><td><a title=\""+AirportCache.getCnName(flightData.segments[0].departAirport)+"\">"+flightData.segments[0].departAirport+"("+flightData.segments[0].departTerminal+")</a>-<a title=\""+AirportCache.getCnName(flightData.segments[0].arriveAirport)+"\">"+flightData.segments[0].arriveAirport+"("+flightData.segments[0].arriveTerminal+")</a>"
			+"</td><td>"+flightData.segments[0].departTime+" "+flightData.segments[0].arriveTime
			+"</td><td>"
			+flight
			+"</td>"
			+"<td>"+flightData.segments[0].planType+"</td>"
			+"<td><a title='"+flightData.segments[0].stopInfo+"'>"+flightData.segments[0].stops+"</a></td>"
			+"<td><a class=\"pnrMeal\">"+flightData.segments[0].mealType+"</a></td>"
			+"<td>"+taxYq+"</td>"
			+"<td><a title='"+(flightData.segments[0].cabins[0].useCondition==null?"":flightData.segments[0].cabins[0].useCondition)+"'>"+flightData.segments[0].cabins[0].name+"("+getStatus(flightData.segments[0].cabins[0].status)+")"
			+discount+"</a></td>"
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
						
						price +=flightData.segments[0].cabins[j].flightCabinProductInfoes[m].productName
						+"(￥"
						+flightData.segments[0].cabins[j].flightCabinProductInfoes[m].ticketPrice 
						+")";
					}
					if(hasMatch && hasSeat)
						price +="<input type='radio' onclick=\"chooseManyTripDirect('"+flightData.segments[0].cabins[j].status+"','manyTripDirect"+index+""+i
						+"','"+index
						
						+"','"+flightData.segments[0].departAirport
						+"','"+flightData.segments[0].arriveAirport
						+"','"+flightData.segments[0].number
						+"','"+flightData.segments[0].cabins[j].name
						+"','"+setFormatDate(flightData.date)
						+"','"+flightData.segments[0].carrier
						+"','"+flightData.segments[0].departTerminal
						+"','"+flightData.segments[0].arriveTerminal
						+"','"+flightData.segments[0].departTime
						+"','"+flightData.segments[0].arriveTime
						+"','"+flightData.segments[0].stops
						+"','"+flightData.segments[0].mealType
						+"','"+flightData.segments[0].planType
						+"','"+flightData.segments[0].tax
						+"','"+flightData.segments[0].yq
						+"','"+flightData.segments[0].cabins[j].flightCabinProductInfoes[m].refundCondCondition
						+"','"+flightData.segments[0].cabins[j].flightCabinProductInfoes[m].refundCondConditionDetail
						+"','"+flightData.segments[0].cabins[j].flightCabinProductInfoes[m].changeCondContion
						+"','"+flightData.segments[0].cabins[j].flightCabinProductInfoes[m].changeCondContionDetail
						+"','"+flightData.segments[0].cabins[j].flightCabinProductInfoes[m].transferCondContion
						+"','"+flightData.segments[0].cabins[j].flightCabinProductInfoes[m].productName
						+"','"+flightData.segments[0].cabins[j].flightCabinProductInfoes[m].productCode
						+"','"+flightData.segments[0].cabins[j].flightCabinProductInfoes[m].ckin
						+"','"+flightData.segments[0].cabins[j].flightCabinProductInfoes[m].ticketPrice
						+"','"+flightData.segments[0].cabins[j].discount
						+"','"+flightData.segments[0].cabins[j].phyPrice
						
						+"',true,'"+flightCount
						+"','"+flightData.segments[0].stopInfo
						+"')\" name='manyTripDirect"+index+"' >"
						+flightData.segments[0].cabins[j].flightCabinProductInfoes[m].productName
						+"(￥"
						+flightData.segments[0].cabins[j].flightCabinProductInfoes[m].ticketPrice 
						+")";
		}
		//var discount = flightData.segments[0].cabins[j].discount == 10?"全价":flightData.segments[0].cabins[j].discount+"折";
		var discountd = flightData.segments[0].cabins[j].discount;
		var discount="";
		if(discountd==10){discount ="/全价";}
		if(discountd==""){discount ="";}
		if(discountd != 0 && discountd != 10){discount ="/"+discountd+"折";}
			$("#"+directId).append("<tr  name='manytripDirectCabin"+index+""+i+"'  class=\"hiddenTr\"  >"
					+"<td>&nbsp;</td>"
					+"<td>&nbsp;</td>"
					+"<td>&nbsp;</td>"
					+"<td>&nbsp;</td>"
					+"<td>&nbsp;</td>"
					+"<td>&nbsp;</td>"
					+"<td>&nbsp;</td>"
					+"<td>&nbsp;</td>"
					+"<td><a title='"+(flightData.segments[0].cabins[0].useCondition==null?"":flightData.segments[0].cabins[j].useCondition)+"'>"+flightData.segments[0].cabins[j].name+"("+getStatus(flightData.segments[0].cabins[j].status)+")"
					+discount+"</a></td>"
					+"<td>" 
					+price
					+"</td></tr>"
					);
		}
}
//承运人全选
function manyFlightCheckAllCarrier(index,obj){
	if(obj.checked){
		$("input[name=manyTripCarrier"+index+"]").attr("checked","checked");
		manyTripFlightByTimesAndCarrier(index);
	}else{
		$("input[name=manyTripCarrier"+index+"]").attr("checked",false);
		manyTripFlightByTimesAndCarrier(index);
		
	}
}
//时间全选
function manyFlightCheckAllTime(index,obj){
	if(obj.checked){
		$("input[name=manyTripgoflightTimes"+index+"]").attr("checked","checked");
		manyTripFlightByTimesAndCarrier(index);
	}else{
		$("input[name=manyTripgoflightTimes"+index+"]").attr("checked",false);
		manyTripFlightByTimesAndCarrier(index);
	}
}
//过滤航班操作
function manyTripFlightByTimesAndCarrier(index){
	var dataObject ="";
	if(index ==0 ){dataObject =  manyTripDate0;}
	if(index ==1 ){dataObject =  manyTripDate1;}
	if(index ==2 ){dataObject =  manyTripDate2;}
	if(index ==3 ){dataObject =  manyTripDate3;}
	if(index ==4 ){dataObject =  manyTripDate4;}
	if(index ==5 ){dataObject =  manyTripDate5;}
	if(index ==6 ){dataObject =  manyTripDate6;}
	if(index ==7 ){dataObject =  manyTripDate7;}
	
	if(dataObject!=""){
		
		var carrier ="";
		var flightCarrier = document.getElementsByName("manyTripCarrier"+index);
		for(var j = 0 ;j < flightCarrier.length; j++){
			if(flightCarrier[j].checked){
				
				carrier = carrier + flightCarrier[j].value;
			}
		}
		
		var times = "";
		var flightTimes = document.getElementsByName("manyTripgoflightTimes"+index);
		for(var i = 0;i<flightTimes.length;i++){
			if(flightTimes[i].checked){
				times = times+flightTimes[i].value;
				}
			}
		if(document.getElementsByName("manyFlightCheckAllByTime"+index)[0].checked){
			times = times + "e";
		}
		setManyTripFlight(index,dataObject,times,carrier,manyTripFlightCount);
	}
}

//判断是否包航某个航段
function getFlgByIndex(index){
	if(manyTripflightArr.length==0){
		return false;
	}
	for(var i = 0;i<manyTripflightArr.length;i++){
		
		if(index.indexOf(manyTripflightArr[i])>=0){
			return true;
		}
	}
	return false;
}
//选择舱位 index 为 0-7，
function chooseManyTripDirect(seatCount,id,index,departAirport,arrivalAirport,flightNo,cabin,flightDate,carrier,departTerminal,arriveTerminal,
		departTime,arriveTime,stops,mealType,planType,tax,yq,refundCondCondition,refundCondConditionDetail,
		changeCondContion,changeCondContionDetail,transferCondContion,productName,productCode,ckin,price,discount,phyPrice,flag2,flightCount,stopInfo){
		if(!getDeadLine(departTime,flightDate)){
			Dialog.alert("已起飞或离起飞时间1小时内的航班不允许预定");
			if(flag2){
				$("input[name=manyTripDirect"+index+"]").attr("checked",false);
			}else{
				$("input[name=manyTripVcabin"+index+"]").attr("checked",false);
			}
			return ;
		}
		if(seatCount.indexOf("A")>-1){
		}
		else if(Number(seatCount) < (Number($("#childCount").val())+Number($("#adultCount").val()))){
			Dialog.alert("该航班座位数小于预选成人加儿童数，不能被预定，请选择其他航班！");
			if(flag2){
				$("input[name=manyTripDirect"+index+"]").attr("checked",false);
			}else{
				$("input[name=manyTripVcabin"+index+"]").attr("checked",false);
			}
			return ;
		}
		var ckinFlag = (ckin.toUpperCase().indexOf("CKIN")>=0);
		var flightlength = manyTripflightArr.length;
		var hasIndex = getFlgByIndex(index);
		//初始化
		if(flag2 != isNotVcabin){
			isNotVcabin = flag2;
			initManyFlightParams();
			//当前选择的是非V舱
			if(isNotVcabin){
				$("input[name^=manyTripVcabin]").attr("checked",false);
			}
			//当前选择的是V舱
			if(!isNotVcabin){
				$("input[name^=manyTripDirect]").attr("checked",false);						
			}
		}
		//第一次进入
		if(pageCarrier==""){
			addOnetManyTrip("manyTripDirect"+index,carrier,departAirport,arrivalAirport,flightNo,cabin,flightDate,
					departTerminal,arriveTerminal,departTime,arriveTime,stops,mealType,planType,tax,yq,
				refundCondCondition,refundCondConditionDetail,changeCondContion,changeCondContionDetail,transferCondContion,productName,productCode,ckin,price,discount,phyPrice,index,stopInfo);
			//设置承运人
			pageCarrier = carrier;
			//将下标添加到数组中
			manyTripflightArr.push(index);
			isCkin == ckinFlag;
			return ;
		}
		if(pageCarrier!=""){
			//已有一段航班，且选择的是同一个航班
			if(manyTripflightArr.length ==1 && hasIndex){
				addOnetManyTrip("manyTripDirect"+index,carrier,departAirport,arrivalAirport,flightNo,cabin,flightDate,
						departTerminal,arriveTerminal,departTime,arriveTime,stops,mealType,planType,tax,yq,
					refundCondCondition,refundCondConditionDetail,changeCondContion,changeCondContionDetail,transferCondContion,productName,productCode,ckin,price,discount,phyPrice,index,stopInfo);
				pageCarrier = carrier;
				isCkin = ckinFlag;
			}
			
			//已有一航班，但选择不同的航班
			else if(flightlength==1 && !hasIndex){

				if(pageCarrier != carrier){
					
					$("input[name=manyTripDirect"+index+"]").attr("checked","");
					$("input[name=manyTripVcabin"+index+"]").attr("checked","");
					Dialog.alert("请选择同一承运人航班！");
					return ;
				}
				if(isCkin && thisChin){
					
					$("input[name=manyTripDirect"+index+"]").attr("checked","");
					Dialog.alert("已包航CKIN航段，不能再选择CKIN航段！");
					return ;
				}
				
				addOnetManyTrip("manyTripDirect"+index,carrier,departAirport,arrivalAirport,flightNo,cabin,flightDate,
						departTerminal,arriveTerminal,departTime,arriveTime,stops,mealType,planType,tax,yq,
					refundCondCondition,refundCondConditionDetail,changeCondContion,changeCondContionDetail,transferCondContion,productName,productCode,ckin,price,discount,phyPrice,index,stopInfo);
				if(ckinFlag){
					isCkin = ckinFlag;
				}

				manyTripflightArr.push(index);
			}
			//已有不止一个航班，但选择同一航班
			else if(flightlength > 1 && hasIndex){

				if(pageCarrier != carrier){
					deleteObjectInArr(index);
					$("input[name=manyTripDirect"+index+"]").attr("checked","");
					Dialog.alert("请选择同一承运人航班！");
					return ;
				}
				if(isCkin && ckinFlag){
					deleteObjectInArr(index);
					$("input[name=manyTripDirect"+index+"]").attr("checked","");
					Dialog.alert("已包航CKIN航段，不能再选择CKIN航段！");
					return ;
				}
				addOnetManyTrip("manyTripDirect"+index,carrier,departAirport,arrivalAirport,flightNo,cabin,flightDate,
						departTerminal,arriveTerminal,departTime,arriveTime,stops,mealType,planType,tax,yq,
					refundCondCondition,refundCondConditionDetail,changeCondContion,changeCondContionDetail,transferCondContion,productName,productCode,ckin,price,discount,phyPrice,index,stopInfo);
				if(ckinFlag){
					isCkin = ckinFlag;
				}
			}
			
			//已有不止一个航班，但选择一个未选择过的航班
			else if(flightlength > 1 && !hasIndex){

				if(pageCarrier != carrier){
					
					$("input[name=manyTripDirect"+index+"]").attr("checked","");
					Dialog.alert("请选择同一承运人航班！");
					return ;
				}
				if(isCkin && ckinFlag){
					
					$("input[name=manyTripDirect"+index+"]").attr("checked","");
					Dialog.alert("已包航CKIN航段，不能再选择CKIN航段！");
					return ;
				}
				addOnetManyTrip("manyTripDirect"+index,carrier,departAirport,arrivalAirport,flightNo,cabin,flightDate,
						departTerminal,arriveTerminal,departTime,arriveTime,stops,mealType,planType,tax,yq,
					refundCondCondition,refundCondConditionDetail,changeCondContion,changeCondContionDetail,transferCondContion,productName,productCode,ckin,price,discount,phyPrice,index,stopInfo);
				if(ckinFlag){
					isCkin = ckinFlag;
				}
				manyTripflightArr.push(index);
			}
		}
	if(manyTripflightArr.length >= flightCount){
		
			realtimeFareSearch();
	}	
}

function addOnetManyTrip(id,carrier,departAirport,arrivalAirport,flightNo,cabin,flightDate,
		departTerminal,arriveTerminal,departTime,arriveTime,stops,mealType,planType,tax,yq,
		refundCondCondition,refundCondConditionDetail,changeCondContion,changeCondContionDetail,transferCondContion,productName,productCode,ckin,price,discount,phyPrice,index,stopInfo){
		var vCabin = "";
		lowerFlightFlag = false;
		var num = Number(index)+1;
		$("input[name=manyTriplowerPriceFlight]").attr("checked",false);
		if(isNotVcabin){
			vCabin = cabin;
		
			var discountshow = "";
			if(discount>=10){
				discountshow = "全价";
			}else{
				discountshow = discount+"折";
			}
			var showInfo = departAirport+"-"+arrivalAirport+" "+formatTime(departTime)+"-"+formatTime(arriveTime)+" "+flightNo+" "+cabin+"舱 "+ price+"元("+discountshow+")";
			$("#many_flightInfo_"+num).html(showInfo);
			$(".flightInfo_list_many_"+index).slideToggle("slow");
		}

		if(!isNotVcabin){
			$("#many_flightInfo_"+num).html("");
			vCabin = "V";
		}
	
		$("#"+id).empty();
		$("#"+id).append("<tr>"
				+"<td><input name=\"flightSFCVOes["+index+"].carrier\" value=\""+carrier+"\"></td>"
				+"<td><input name=\"flightSFCVOes["+index+"].date\" value=\""+flightDate+"\"></td>"
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
				+"<td><input name=\"flightSFCVOes["+index+"].flightSegmentSFCVO[0].stopInfo\" value=\""+stopInfo+"\" ></td>"

				+"</tr>"
				);
}



//删除某个index
function deleteObjectInArr(index){
	
	for(var j = 0 ;j<manyTripflightArr.length;j++){
		
		if(index == manyTripflightArr[j]){
			if(j==0){
				
				manyTripflightArr.shift();
			} else {
				
				manyTripflightArr.splice(j-1, 1);
			}
		}
	}
}