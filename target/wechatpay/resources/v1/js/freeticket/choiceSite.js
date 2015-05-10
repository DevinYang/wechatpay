var conditionDialog = null;
var messageTip = null;

var firstDataResult = null;
var secondDataResult = null;

var firstReduceAll = 0;
var firstDifference = 0;
var firstReduce = 0;
var secondReduce = 0;

var roleArray = new Array();

function checkSingleTrips(){
	if(checkOneTrip()){
		adultCount = Number($("#adultCount1").val());
		childCount = Number($("#childCount1").val());
		infantCount =  Number($("#babyCount1").val());
		var totalCount = adultCount + childCount;
		if(childCount == totalCount){
			Dialog.confirm("旅客类型只有儿童无成人陪伴，是否继续？",function(){singleTrip();},function(){return false});
		}else{
			singleTrip();
		}
	}
}
function checkRoundTrips(){
	if(checkTwoTrip()){
		adultCount = Number($("#adultCount2").val());
		childCount = Number($("#childCount2").val());
		infantCount =  Number($("#babyCount2").val());
		var totalCount = adultCount + childCount;
		if(childCount == totalCount){
			Dialog.confirm("旅客类型只有儿童无成人陪伴，是否继续？",function(){roundTrip();},function(){return false});
		}else{
			roundTrip();
		}
	}
}

function checkManayTrips(){
	var j = 0;
	var departCity =[];
	var arrivelCity =[];
	for(var i=1;i<3;i++){//多程最多两个航段
		
		//出发城市非空校验
		var cityBegin = $("#cityBegin_3_"+i).val();
		if(cityBegin ==""){
			Dialog.alert("出发城市不能为空!");
			return false;
		}
		
		var beginCode = hasThisCity(cityBegin);
		if(beginCode == ""){
			Dialog.alert("不存在"+cityBegin+"城市！");
			return false;
		}
		if(beginCode != ""){
			$("#c_cityBegin_3_"+i).attr("value",beginCode);
		}
		
		//到达城市非空校验
		var cityEnd = $("#cityEnd_3_"+i).val();
		if(cityEnd == ""){
			Dialog.alert("到达城市不能为空!");
			return false;
		}
		var endCode = hasThisCity(cityEnd);
		if(endCode == ""){
			
			Dialog.alert("不存在"+cityEnd+"城市！");
			return false;
		}
		if(endCode != ""){
			$("#c_cityEnd_3_"+i).attr("value",endCode);
		}
		
		//出发到达城市不能相同
		if(cityEnd == cityBegin){
			Dialog.alert("出发城市和到达城市不能相同!");
			return ;
		}
		
		//判断航班是否连续
		departCity.push(beginCode);
		arrivelCity.push(endCode);
		
		//出发时间校验
		var arrivelDate = $("#dateBegin_3_"+i).val();
		if(arrivelDate == null || arrivelDate== ""){
			Dialog.alert("出发时间不能为空!");
			return false;
		}
		if(!afterTime(new Date().format("yyyy-MM-dd"),arrivelDate)){
			Dialog.alert("出发时间必须等于或晚于当天!!");
			return false;
		}
		
		//航班时间校验
		if(((new Date(arrivelDate).getTime()-(new Date()).getTime())/(1000 * 60 * 60 * 24))>365){
			Dialog.alert("航班时间必须为一年内的时间!");
			return false;
		}
		fightDateTemp[j] = arrivelDate;
		j++;
	}
	
	//航段2出发时间>=航段1出发时间
	var dateLength = fightDateTemp.length;
	for(var k = 0;k<dateLength-1;k++){
		 if(!afterTime(fightDateTemp[k],fightDateTemp[k+1])){
			 Dialog.alert("第【"+(Number(k)+2)+"】段旅程出发日期不能晚于第【"+(Number(k)+1)+"】段旅程出发日期，请重选！!");
			 return ;
		 }
	}
	
	//旅客人数校验
	if(!checkTravellerCount(3)){
		return ;
	}
	
	//缺口程提示<多段航程支持缺口程的航班查询，但是不允许建立缺口程的PNR、订单
	var flightLength =  departCity.length;
	for(var m =1;m<flightLength;m++){
		if(m<flightLength && departCity[m] != arrivelCity[m-1]){
			Dialog.confirm("多段航程支持缺口程的航班查询，但是不允许建立缺口程的PNR、订单！",function(){manayTrip();},function(){return false});
			return ;
			}
		else{
			adultCount = Number($("#adultCount3").val());
			childCount = Number($("#childCount3").val());
			infantCount =  Number($("#babyCount3").val());
			var totalCount = adultCount + childCount;
			if(childCount == totalCount){
				Dialog.confirm("旅客类型只有儿童无成人陪伴，是否继续？",function(){manayTrip();},function(){return false});
			}else{
				manayTrip();
			}
		}
	}
}



//单程
function singleTrip(){
	oneTriptReset();
	single = 1;
	var url = basePath+"/free-Airline/singleWay";
	var params = formToObj(condition1);
	ajaxRequest(url,params,function(json){
		if(json == null || json == ""){
			
			Dialog.alert("配置不够，请稍后再试！",null,false);
			
		}else{
			
			firstDataResult = json.data;
			//单程head信息设置("第一程：广州-海口 起飞时间：2014-06-20 星期五 距今日 35 天")
			setSimpleFlightInfoBySingle();
			//单程航班信息设置
			setOneTripFlight(firstDataResult,"");
			
		}
	},null,"GET");
}


//来回程
function roundTrip(){
	single = 2;
	twoTripReset();
	var url = basePath+"/free-Airline/roundWay";
	var params = formToObj(condition2);
	ajaxRequest(url,params,function(json){
		if(json == null || json == ""){
			Dialog.alert("配置不够，请稍后再试！",null,false);
		}else{
			firstDataResult = json.oneDto;
			secondDataResult = json.twoDto;
			
			//来回程head信息设置
			setSimpleFlightInfoByRound();
			
			//设置来回程第一航程航班
			setRoundTripFlight(firstDataResult,"","one");
			//设置来回程第二航程航班
			setRoundTripFlight(secondDataResult,"","two");
		}
	},null,"GET");
}


//多航程
function manayTrip(){
	single = 3;
	twoTripReset();
	var url = basePath+"/free-Airline/manyWay";
	var params = formToObj(condition3);
	ajaxRequest(url,params,function(json){
		if(json == null || json == ""){
			Dialog.alert("配置不够，请稍后再试！",null,false);
			
		}else{
			firstDataResult = json.oneDto;
			secondDataResult = json.twoDto;
		
			//来多程head信息设置
			setSimpleFlightInfoByManay();
			
			//设置来回程第一航程航班
			setRoundTripFlight(firstDataResult,"","one");
			//设置来回程第二航程航班
			setRoundTripFlight(secondDataResult,"","two");
			
		}
	},null,"GET");
	
}


//设置单程航班
function setOneTripFlight(data,carrier){
	if(data && data.direct && data.direct.length!=0){
		var direct = data.direct;
		var directAttr = new Array();
		//直达
		for(var i = 0;i<direct.length;i++){
			if( carrier == ""){
				setSingleDirectFlight(direct[i],i);//承运公司没有勾选的时候，默认显示海航下所有的
			}else{
				if(carrier!=null){////过滤勾选航空公司航班
					for(var j=0;j<direct[i].segments.length;j++){
						status = 0;
						for(var n=0;n<carrier.length;n++){
							if(carrier[n]==direct[i].segments[j].carrier){
								status = 1;
								directAttr.push(direct[i]);
								break;
							}
						}
						if(status==1){
							break;
						}
					}
				}
			}
		}
		
		for(var m =0;m<directAttr.length;m++){
			setSingleDirectFlight(directAttr[m],m);
		}
		
	}else{
		var tableHtml = "<tbody class=\"first_flight_hu first_flight_hu_p1\" ><tr>"+
						"<td colspan=\"11\"><font color='red'>没有找到满足条件的记录！</font></td>"+
						"</tr></tbody>";
		$("#oneTripDirectTbody1").append(tableHtml);
	}
}





//设置来回程航班
function setRoundTripFlight(data,carrier,oneOrTwo){
	if(data && data.direct && data.direct.length!=0){//data.direct直达
		var direct = data.direct;
		var status = 0;
		var directAttr = new Array();
		
		for(var i = 0;i<data.direct.length;i++){
			if( carrier == ""){
				if("one"==oneOrTwo){//设置去程
					setSingleDirectFlight(data.direct[i],i);//来回程去程和单程设置一样
				}else{
					setSecondDirectFlight(data.direct[i],i);//回程
				}
			}else{
				if(carrier!=null){////过滤勾选航空公司航班
					for(var j=0;j<direct[i].segments.length;j++){
						status = 0;
						for(var n=0;n<carrier.length;n++){
							if(carrier[n]==direct[i].segments[j].carrier){
								status = 1;
								directAttr.push(direct[i]);
								break;
							}
						}
						if(status==1){
							break;
						}
					}
				}
			}
		}
		for(var m =0;m<directAttr.length;m++){
			if("one"==oneOrTwo){//设置去程
				setSingleDirectFlight(directAttr[m],m);//来程
			}else{
				setSecondDirectFlight(directAttr[m],m);//回程
			}
		}
	}else{
		var tableHtml = "<tbody class=\"first_flight_hu first_flight_hu_p1\" ><tr>"+
						"<td colspan=\"11\"><font color='red'>没有找到满足条件的记录！</font></td>"+
						"</tr></tbody>";
		if("one"==oneOrTwo){//设置去程
			$("#oneTripDirectTbody1").append(tableHtml);
		}else{
			$("#oneTripDirectTbody2").append(tableHtml);
		}
		
	}
}




function parseDate(date){
	var arraydate = date.split("-");
	return arraydate[0]+"-"+Number(arraydate[1])+"-"+arraydate[2];
}


//第一程数据加载single-1 单程 2 来回程 3 多程
function setSingleDirectFlight(dataDirecti,i){
	//离开时间 格式 yyyy-MM-dd
	var leaveDate = $("#leaveDate"+single).val();
	
	if(single == 3){
		leaveDate = $("#dateBegin_3_1").val();
	}
	
	//将ddMMMyy格式的时间串转成yyyy-MM-dd形式
	var on = setFormatDate(dataDirecti.date);
	
	if(on != leaveDate){
		$("#recommendInfo1").show();	//很抱歉,没有查询的该日期航班,系统为您推荐最近日期航班！
		reload(1,on);
	}
	var passengerCount = adultCount + childCount + infantCount;
	var segment = dataDirecti.segments[0];
	var carrier = segment.number.substring(0,2);
	var tax = segment.tax == null ? "":segment.tax;
	var yq = segment.yq == null ? "":segment.yq;
	var avcabinPrice = segment.cabins[0].avcabinPriceVO == null ? "":parseInt(tax)+parseInt(yq)+parseInt(segment.cabins[0].avcabinPriceVO.price);
	var tableHtml = "<tbody class='first_flight_hu first_flight_hu_p1 "+carrier+"' ><tr>"+
			"<td>"+(i+1)+"</td>"+
			"<td>"+segment.departTime+"&nbsp;&nbsp;"+segment.arriveTime+"</td>"+
			"<td><div class='flight_No_1' id='show_first_flight_cabin1'  onclick='moreCabin_1(this)'  i='"+i+"' >"+segment.number+"<img src='"+basePath+"/resources/v1/images/icon_09.png'></div></td>"+
			"<td>"+segment.cabins[0].name+"("+getStatus(segment.cabins[0].status)+")/"+segment.cabins[0].realName+"("+segment.cabins[0].realStatus+")/"+cabintypeStatus(segment.cabins[0].name)+"</td>"+
			"<td>"+segment.cabins[0].reduceMileage+"</td>"+
			"<td><label>"+tax+"/"+yq+"/"+avcabinPrice+"</label></td>"+
			"<td><a class='translate' href='#' title='"+segment.departAirport+"("+segment.departTerminal+")'>"+segment.departAirport+"("+segment.departTerminal+")</a>-<a href='#' class='translate' title='"+segment.arriveAirport+"("+segment.arriveTerminal+")'>"+segment.arriveAirport+"("+segment.arriveTerminal+")</a></td>"+
			"<td>"+segment.planType+"</td>"+
			"<td><a class='translate' href='#' title='"+segment.stopInfo+"'>"+segment.stops+"</a></td>"+
			"<td><span class='pnrMeal'>"+segment.mealType+"</span></td>"+
			"<td><a class='Btn Btn-blue ensure cabinSelect_1' onclick='cabinFilter(this,1)' id='cabinSelect_1_"+i+"' " +
					"deduct='"+segment.cabins[0].reduceMileage+"' " +
					"stopway='"+segment.stopway+"' "+
					"flightNo='"+segment.number+"' " +
					"depardCode='"+segment.departAirport+"' " +
					"arriveCode='"+segment.arriveAirport+"' " +
					"cabinName='"+segment.cabins[0].name+"' " +
					"flightDate='"+dataDirecti.date+"' "+
					"currCarrier='"+dataDirecti.carrier+"' "+
					"departTerminal='"+segment.departTerminal+"' "+
					"arriveTerminal='"+segment.arriveTerminal+"' "+
					"departTime='"+segment.departTime+"' "+
					"arriveTime='"+segment.arriveTime+"' "+
					"stops='"+segment.stops+"' "+
					"stopInfo='"+segment.stopInfo+"' "+
					"mealType='"+segment.mealType+"' "+
					"planType='"+segment.planType+"' "+
					"tax='"+segment.tax+"' "+
					"yq='"+segment.yq+"' "+
					"isChart='"+segment.chartAilne+"' "+
					"isGuarantee='"+segment.guaranteeAline+"' "+
					"seats='"+segment.cabins[0].status+"' "+
					"realseats='"+segment.cabins[0].realStatus+"' >"+
				"<span>确 定</span></a></td></tr></tbody>";
		
	//多个舱位
	if(segment.cabins.length>1){
		tableHtml+="<tbody class='first_more_flight first_flight_hu_p1' id='first_flight_hu_p_1_"+i+"' style='display: none;'>";
		for(var j=1;j<segment.cabins.length;j++){
			var temp = dataDirecti.segments[0].cabins[j];
			var cabinPrice = temp.avcabinPriceVO == null ? "":parseInt(tax)+parseInt(yq)+parseInt(temp.avcabinPriceVO.price);
			tableHtml+="<tr><td></td><td></td><td></td>"+
						"<td>"+temp.name+"("+getStatus(temp.status)+")/"+temp.realName+"("+temp.realStatus+")/"+cabintypeStatus(temp.name)+"</td>"+
						"<td>"+temp.reduceMileage+"</td>"+
						"<td><label>"+tax+"/"+yq+"/"+cabinPrice+"</label></td>"+
						"<td><a class='translate' href='#' title='"+segment.departAirport+"("+segment.departTerminal+")'>"+segment.departAirport+"("+segment.departTerminal+")</a>-<a href='#' class='translate' title='"+segment.arriveAirport+"("+segment.arriveTerminal+")'>"+segment.arriveAirport+"("+segment.arriveTerminal+")</a></td>"+
						"<td>"+segment.planType+"</td>"+
						"<td><a class='translate' href='#' title='"+segment.stopInfo+"'>"+segment.stops+"</a></td>"+
						"<td><span class='pnrMeal'>"+segment.mealType+"</span></td>"+
						"<td><a class='Btn Btn-blue ensure cabinSelect_1'  onclick='cabinFilter(this,1)' id='cabinSelect_1_"+i+"' " +
								"deduct='"+temp.reduceMileage+"' " +
								"stopway='"+segment.stopway+"' "+
								"flightNo='"+segment.number+"' " +
								"depardCode='"+segment.departAirport+"' " +
								"arriveCode='"+segment.arriveAirport+"' " +
								"cabinName='"+temp.name+"' " +
								"flightDate='"+dataDirecti.date+"' "+
								"currCarrier='"+dataDirecti.carrier+"' "+
								"departTerminal='"+segment.departTerminal+"' "+
								"arriveTerminal='"+segment.arriveTerminal+"' "+
								"departTime='"+segment.departTime+"' "+
								"arriveTime='"+segment.arriveTime+"' "+
								"stops='"+segment.stops+"' "+
								"stopInfo='"+segment.stopInfo+"' "+
								"mealType='"+segment.mealType+"' "+
								"planType='"+segment.planType+"' "+
								"tax='"+segment.tax+"' "+
								"yq='"+segment.yq+"' "+
								"isChart='"+segment.chartAilne+"' "+
								"isGuarantee='"+segment.guaranteeAline+"' "+
								"seats='"+temp.status+"' "+
								"realseats='"+temp.realStatus+"' >"+
								
							"<span>确 定</span></a></td>";
		}
	}
	$("#oneTripDirectTbody1").append(tableHtml);
//	$(".first_flight_hu_p1 tr").css("background-color","#E2F3FB");
	$(".first_flight_hu_p1 tr").mouseover(function(){
				$(this).css("background-color","yellow");						
		}).mouseout(function(){
				$(this).css("background-color","");
		});
	translateCodeInHtml();
}


//第二程数据加载
function setSecondDirectFlight(dataDirecti,i){
//	var passengerCount = parseInt($("#adultCount"+single).val())+
//						parseInt($("#childCount"+single).val())+
//						parseInt($("#babyCount"+single).val());
	var passengerCount = adultCount + childCount + infantCount;
	var leaveDate = "";
	if(single == 2){
		leaveDate = $("#backDate"+single).val();
	}
	if(single == 3){
		leaveDate = $("#dateBegin_3_2").val();
	}
	var on = setFormatDate(dataDirecti.date)
	if(on != leaveDate){
		$("#recommendInfo2").show();
		reload(2,on);
	}
	
	var segment = dataDirecti.segments[0];
	var carrier = segment.number.substring(0,2);
	var tax = segment.tax == null ? "":segment.tax;
	var yq = segment.yq == null ? "":segment.yq;
	var avcabinPrice = segment.cabins[0].avcabinPriceVO == null ? "":parseInt(tax)+parseInt(yq)+parseInt(segment.cabins[0].avcabinPriceVO.price);
	var tableHtml = "<tbody class='first_flight_hu first_flight_hu_p1 "+carrier+"' ><tr>"+
			"<td>"+(i+1)+"</td>"+
			"<td>"+segment.departTime+"&nbsp;&nbsp;"+segment.arriveTime+"</td>"+
			"<td><div class='flight_No_2' id='show_first_flight_cabin1' onclick='moreCabin_2(this)'  i='"+i+"' >"+segment.number+"<img src='"+basePath+"/resources/v1/images/icon_09.png'></div></td>"+
			"<td>"+segment.cabins[0].name+"("+getStatus(segment.cabins[0].status)+")/"+segment.cabins[0].realName+"("+segment.cabins[0].realStatus+")/"+cabintypeStatus(segment.cabins[0].name)+"</td>"+
			"<td>"+segment.cabins[0].reduceMileage+"</td>"+
			"<td><label>"+tax+"/"+yq+"/"+avcabinPrice+"</label></td>"+
			"<td><a class='translate' href='#' title='"+segment.departAirport+"("+segment.departTerminal+")'>"+segment.departAirport+"("+segment.departTerminal+")</a>-<a href='#' class='translate' title='"+segment.arriveAirport+"("+segment.arriveTerminal+")'>"+segment.arriveAirport+"("+segment.arriveTerminal+")</a></td>"+
			"<td>"+segment.planType+"</td>"+
			"<td><a class='translate' href='#' title='"+segment.stopInfo+"'>"+segment.stops+"</a></td>"+
			"<td><span class='pnrMeal'>"+segment.mealType+"</span></td>"+
			"<td><a class='Btn Btn-blue ensure cabinSelect_2' onclick='cabinFilter(this,2)' id='cabinSelect_2_"+i+"' " +
					"deduct='"+segment.cabins[0].reduceMileage+"' " +
					"stopway='"+segment.stopway+"' "+
					"flightNo='"+segment.number+"' " +
					"depardCode='"+segment.departAirport+"' " +
					"arriveCode='"+segment.arriveAirport+"' " +
					"cabinName='"+segment.cabins[0].name+"' " +
					"flightDate='"+dataDirecti.date+"' "+
					"currCarrier='"+dataDirecti.carrier+"' "+
					"departTerminal='"+segment.departTerminal+"' "+
					"arriveTerminal='"+segment.arriveTerminal+"' "+
					"departTime='"+segment.departTime+"' "+
					"arriveTime='"+segment.arriveTime+"' "+
					"stops='"+segment.stops+"' "+
					"stopInfo='"+segment.stopInfo+"' "+
					"mealType='"+segment.mealType+"' "+
					"planType='"+segment.planType+"' "+
					"tax='"+segment.tax+"' "+
					"yq='"+segment.yq+"' "+
					"isChart='"+segment.chartAilne+"' "+
					"isGuarantee='"+segment.guaranteeAline+"' "+
					"seats='"+segment.cabins[0].status+"' "+
					"realseats='"+segment.cabins[0].realStatus+"' >"+
			"<span>确 定</span></a></td></tr></tbody>";
	
	
		
	//多个舱位
	if(segment.cabins.length>1){
		tableHtml+="<tbody class='first_more_flight first_flight_hu_p1' id='first_flight_hu_p_2_"+i+"' style='display: none;'>";
		for(var j=1;j<segment.cabins.length;j++){
			var temp = dataDirecti.segments[0].cabins[j];
			var cabinPrice = temp.avcabinPriceVO == null ? "":parseInt(tax)+parseInt(yq)+parseInt(temp.avcabinPriceVO.price);
			tableHtml+="<tr><td></td><td></td><td></td>"+
						"<td>"+temp.name+"("+getStatus(temp.status)+")/"+temp.realName+"("+temp.realStatus+")/"+cabintypeStatus(temp.name)+"</td>"+
						"<td>"+temp.reduceMileage+"</td>"+
						"<td><label>"+tax+"/"+yq+"/"+cabinPrice+"</label></td>"+
						"<td><a class='translate' href='#' title='"+segment.departAirport+"("+segment.departTerminal+")'>"+segment.departAirport+"("+segment.departTerminal+")</a>-<a class='translate' href='#' title='"+segment.arriveAirport+"("+segment.arriveTerminal+")'>"+segment.arriveAirport+"("+segment.arriveTerminal+")</a></td>"+
						"<td>"+segment.planType+"</td>"+
						"<td><a class='translate' href='#' title='"+segment.stopInfo+"'>"+segment.stops+"</a></td>"+
						"<td><span class='pnrMeal'>"+segment.mealType+"</span></td>"+
						"<td><a class='Btn Btn-blue ensure cabinSelect_2' onclick='cabinFilter(this,2)'  id='cabinSelect_2_"+i+"' " +
								"deduct='"+temp.reduceMileage+"' " +
								"stopway='"+segment.stopway+"' "+
								"flightNo='"+segment.number+"' " +
								"depardCode='"+segment.departAirport+"' " +
								"arriveCode='"+segment.arriveAirport+"' " +
								"cabinName='"+temp.name+"' " +
								"flightDate='"+dataDirecti.date+"' "+
								"currCarrier='"+dataDirecti.carrier+"' "+
								"departTerminal='"+segment.departTerminal+"' "+
								"arriveTerminal='"+segment.arriveTerminal+"' "+
								"departTime='"+segment.departTime+"' "+
								"arriveTime='"+segment.arriveTime+"' "+
								"stops='"+segment.stops+"' "+
								"stopInfo='"+segment.stopInfo+"' "+
								"mealType='"+segment.mealType+"' "+
								"planType='"+segment.planType+"' "+
								"tax='"+segment.tax+"' "+
								"yq='"+segment.yq+"' "+
								"isChart='"+segment.chartAilne+"' "+
								"isGuarantee='"+segment.guaranteeAline+"' "+
								"seats='"+temp.status+"' "+
								"realseats='"+temp.realStatus+"' >"+
								
						"<span>确 定</span></a></td></tr>";
		}
		tableHtml+="</tbody>";
	}
	$("#oneTripDirectTbody2").append(tableHtml);
	$(".first_flight_hu_p1 tr").mouseover(function(){
				$(this).css("background-color","yellow");						
		}).mouseout(function(){
				$(this).css("background-color","");
		});
	translateCodeInHtml();
}


function getNature(isChart,isGuarantee,stop){
	if(isChart == true || isChart=='true'){
		return "CHARTER";	//包机
	}
	if(isGuarantee  == true || isGuarantee=='true'){
		return "GUARANTEE";	//保底补贴
	}
	if(stop > 0){
		return "STOPS"; //甩飞
	}
	if(stop == 0){
		return "DIRECT"; //直飞
	}
}


//舱位选择
function cabinFilter(self,segmentNo){				//AVSegmentVO
	
	var cardType = $("#cardType").val();			//会员卡类型（）
	var cardLevel = $("#cardLevel").val();			//会员卡等级(金卡、银卡..)
	var carrier = $(self).attr("currCarrier");		//当前承运人（HU..）
	var stops = $(self).attr("stops");				//经停
	var cabin= $(self).attr("cabinName");			//舱位
	var model = $(self).attr("planType");			//机型（A340,A330,A330VIP,B767,OTHER）
	var flightNo = $(self).attr("flightNo");		//航班号
	var on = $(self).attr("flightDate");			//航班日期
	var departTime = $(self).attr("departTime");	//离港时间
	var remainingSeats = $(self).attr("realseats");	//开放座位数
	var cabinStatus = $(self).attr("seats");		//舱位状态
	var isChart = $(self).attr("isChart");			//是否是包机
	var isGuarantee = $(self).attr("isGuarantee");	//是否是补贴航班
	var depardCode = $(self).attr("depardCode");	//离港三字码
	var arriveCode = $(self).attr("arriveCode");	//到港三字码
	var goldweekFlag = isGoldweek(on);				//是否是黄金周
	var reserveSeats = adultCount + childCount;		//页面选择人数
	
	
	if(remainingSeats!="A" && remainingSeats.match(/^\+?[1-9][0-9]*$/) && reserveSeats > remainingSeats){
		Dialog.alert("旅客人数不能超过舱位剩余座位数！请选择其他航班或减少旅客人数！");
		return false;
	}
	$("#seatSelectionForm").empty();
	$("#seatSelectionForm").append(
			 "<input type=\"hidden\" name=\"carrier\" value=\""+carrier+"\" />"
			+"<input type=\"hidden\" name=\"on\" value=\""+on+"\" />"
			+"<input type=\"hidden\" name=\"departTime\" value=\""+departTime+"\" />"
			+"<input type=\"hidden\" name=\"flightNo\" value=\""+flightNo+"\" />"	
			+"<input type=\"hidden\" name=\"depardCode\" value=\""+depardCode+"\" />"	
			+"<input type=\"hidden\" name=\"arriveCode\" value=\""+arriveCode+"\" />"	
			+"<input type=\"hidden\" name=\"Chart\" value=\""+isChart+"\" />"	
			+"<input type=\"hidden\" name=\"Guarantee\" value=\""+isGuarantee+"\" />"	
			+"<input type=\"hidden\" name=\"cabin\" value=\""+cabin+"\" />"	
			+"<input type=\"hidden\" name=\"cardType\" value=\""+cardType+"\" />"	
			+"<input type=\"hidden\" name=\"cardLevel\" value=\""+cardLevel+"\" />"	
			+"<input type=\"hidden\" name=\"reserveSeats\" value=\""+reserveSeats+"\" />"	
			+"<input type=\"hidden\" name=\"remainingSeats\" value=\""+remainingSeats+"\" />"	
			+"<input type=\"hidden\" name=\"controlSeating.carrier\" value=\""+carrier+"\" />"	
			+"<input type=\"hidden\" name=\"controlSeating.nature\" value=\""+getNature(isChart,isGuarantee,stops)+"\" />"	
			+"<input type=\"hidden\" name=\"controlSeating.cabinCode\" value=\""+cabin+"\" />"	
			/*+"<input type=\"hidden\" name=\"controlSeating.planType\" value=\""+getPlanType(model)+"\" />"*/
			+"<input type=\"hidden\" name=\"controlSeating.model\" value=\""+model+"\" />"	
			+"<input type=\"hidden\" name=\"controlSeating.cabinStatus\" value=\""+cabinStatus+"\" />"
			+"<input type=\"hidden\" name=\"controlSeating.isGoldweek\" value=\""+goldweekFlag+"\" />"
			
	);

	var seatSelection = formToObj(seatSelectionForm);
	ajaxRequest(basePath+"controlseating-control/findRole",seatSelection,function(result){
		if(result.errorMsg){
			Dialog.alert(result.errorMsg);
		}else{
			var role = result.role;
			if(cabinStatus=="A" || cabinStatus.match(/^\+?[1-9][0-9]*$/)){
			//if(remainingSeats=="A" || remainingSeats.match(/^\+?[1-9][0-9]*$/)){
				if(segmentNo == 1){	//航段1
					singleCabinSelected = false;
					cabinSelect_1(self);
					roleArray[0] = role;	//控坐信息保存数组中（页面中改变人时用到）
				}
				if(segmentNo == 2){	//航段2
					roundCabinSelected = false;
					cabinSelect_2(self);
					roleArray[1] = role;
				}
			}else{
				Dialog.alert("您选择的航班开放了【"+(Number(role.controlSeating.amount))+"】张兑换名额，目前金鹏卡已预定了【"+(role.jpCount)+"】张，金鹿卡已预定了【"+(role.jlCount)+"】张，确定请继续！",function(){
					if(segmentNo == 1){
						singleCabinSelected = false;
						cabinSelect_1(self);
						roleArray[0] = role;
					}
					if(segmentNo == 2){
						roundCabinSelected = false;
						cabinSelect_2(self);
						roleArray[1] = role;
					}
				});
			}
			
		}
	});
}

/*function getPlanType(model){
	
	if(model == "340"){
		
		return "A340";
		
	} else if ( model == "330" || model == "333" || 
				model == "33I" || model == "334" ||
			    model == "335" || model == "319" || 
			    model == "320"){
		
		return "A330";
		
	} else if(model == "33V"){
		
		return "A330VIP";
		
	} else if(model == "767" || model == "787"){
		
		return "B767";
		
	} else {
		
		return "OTHER";
	}
}*/


function disableBtn(){
	$(".nextBut").removeClass("Btn-blue");
	$(".nextBut").attr("href","#");
}
function addNextBtn(){
	
	if(!$(".nextBut").hasClass("Btn-blue")){
		$(".nextBut").addClass("Btn-blue");
		$(".nextBut").attr("href","javascript:flightSubmit()");
	}
}


//变更旅程人数时再次校验
function verification(i){
	var role = roleArray[i];
	var adultCountTmp = $("#adultCount"+single).val();
	var childCountTmp = $("#childCount"+single).val();
	var babyCountTmp = $("#babyCount"+single).val();
	var totalCount = parseInt(adultCountTmp) + parseInt(childCountTmp);
	if(role){
		if(role.remainingSeats.match(/^\+?[1-9][0-9]*$/) && totalCount > role.remainingSeats){
			Dialog.alert("旅客人数超过第一程剩余座位数！");
			return false;
		}
		var cabinStatus = role.controlSeating.cabinStatus;//自然状态NN
		if(cabinStatus && cabinStatus.match(/^\+?[1-9][0-9]*$/)){
			if(totalCount > Number(cabinStatus)){
				if(!role.overKFlag){
					Dialog.alert("旅客人数超过第一程舱位状态剩余数，且第一程舱位不满足超K条件");
					return false;
				}
			}
		}
		
		
		var isNature = role.nature;
		var residue = role.residue;
		if(isNature && cabinStatus!='A'){
			residue = cabinStatus;
		}
		if(residue < totalCount && !role.overKFlag){
			Dialog.alert("您选择的第一程航班开放了【"+(Number(role.controlSeating.amount))+"】张兑换名额，目前金鹏卡已预定了【"+role.jpCount+"】张，剩余名额不足您本次选择的旅客人数，且当前舱位不满足超K条件，不允许兑换！");
			return false;
		}
	}
	return true;
}


//修改查询人数时触发事件
function recount(type){
		if(type == 0){//单程
			var tmp = Number($("#adultCount"+single).val());
			var addition = tmp - adultCount;
			adultCount = tmp;
			appendReduce(addition);
			if(checkTravellerCount(single) && verification(0) && verification(1)){
				addNextBtn();
			}else{
				disableBtn();
			}
		}
		if(type == 1){//来回程
			var tmp = Number($("#childCount"+single).val());
			var addition = tmp - childCount;
			childCount = tmp;
			appendReduce(addition);
			if(checkTravellerCount(single) && verification(0) && verification(1)){
				addNextBtn();
			}else{
				disableBtn();
			}
		}
		if(type == 2){//多程
			var tmp = Number($("#babyCount"+single).val());
			var addition = tmp - infantCount;
			infantCount = tmp;
			appendReduce(addition);
			if(checkTravellerCount(single)){
				addNextBtn();
			}else{
				disableBtn();
			}
		}
}


//人数变更后扣减里程重新计算
function appendReduce(addition){
	
	var additionReduce = addition * (Number(firstReduce)+Number(secondReduce));
	var reduceAll = Number($("#reduceMileage").text())+additionReduce;
	$("#reduceMileage").text(reduceAll);
	$("#realReduce").text(reduceAll);
	$("#difference").text(0);
	if(memberPoints-reduceAll < 0){
		
		var difference = dealDifference(reduceAll-memberPoints);
		$("#realReduce").text(memberPoints);
		$("#difference").text(difference);
		
	}
}

//舱位选择
function cabinSelect_1(_self){
		var depardCode = $(_self).attr("depardCode");	//离港地三字码
		var arriveCode = $(_self).attr("arriveCode");	//到达地三字码
		var flightNo = $(_self).attr("flightNo");		//航班号
		var cabinName = $(_self).attr("cabinName");		//舱位
		var deduct = $(_self).attr("deduct");			//扣除积分
		var stopway = $(_self).attr("stopway");			//航程航距
			
		var via = flightNo.substring(0,2);//多程情况下承运人限制
		var carrier = new Array();
		var passengerCount = adultCount + childCount + infantCount;
		
		//多航段时如果第一航段选择HU的则第二航段也必须是HU的，一下逻辑对第二航段数据按承运人再次过滤
		if(!$("#singleOrNot1").attr("checked")){//非单程
			$("#oneTripDirectTbody2 tbody").remove();//过滤承运人
			$("#mileageInfo_2").empty();
			$("#add_flight_list_con2").hide();
			$(".first_trip_flights2").show();
			$("#spread").empty();
			$("#deductionsMileage").empty();
			
			carrier.push(via);
			
			carrier.length==0?setRoundTripFlight(secondDataResult,null,"two"):setRoundTripFlight(secondDataResult,carrier,"two");
		}
		if(stopway<800&&(memberPoints-deduct*passengerCount<1)){
			$("#messageTip").html("所选航程航距不足800，且当前卡号可用里程不足，不能进行兑换，请减少旅客或者修改兑换航线！");
			messageTip.show();
			return false;
		}

		//第一航程扣除里程数/单个（head中右边红色显示：CAN-HAK  HU7002   S舱 8000公里）
		$("#depardCode1").text(depardCode);
		$("#arriveCode1").text(arriveCode);
		$("#flightNo1").text(flightNo);
		$("#cabinName1").text(cabinName);
		$("#deductMileage1").text(deduct);
		$("#add_flight_list_con1").show();
			
		var html = "<tr>"+
					"<td>"+1+"</td>"+
					"<td>"+cabinName+"</td>"+
					"<td>"+deduct+"</td>"+
					"<td><a href='javascript:showCondition()' title='查看使用条件' class='alink'>查看</a></td>"+
					"</tr>";
		$("#mileageInfo_1").html(html);
		//隐藏航段一舱位列表并显示里程信息
		$(".first_trip_flights1").hide("slow");
		$(".mut_flight").slideDown("slow");
		
		
		
		//计算扣除里程（总扣除：右下角显示）
		firstReduce = deduct;//保存第二航段扣除积分数
		firstReduceAll = passengerCount * deduct;
		$("#reduceMileage").text(firstReduceAll);
		$("#realReduce").text(firstReduceAll);
		$("#difference").text(firstDifference);
		if(memberPoints-firstReduceAll < 0){
			firstDifference = dealDifference(firstReduceAll-memberPoints);
			$("#realReduce").text(memberPoints);
			$("#difference").text(firstDifference);
		}
		$(".deductions").show();
		
		
		goSingleDirectSet(_self);
		
		singleCabinSelected = true;
		roundCabinSelected = false;
}

//舱位选择
function cabinSelect_2(_self){
	if(!singleCabinSelected){
		Dialog.alert("请先选择第一程舱位！");
		return false;
	}
	var depardCode = $(_self).attr("depardCode");
	var arriveCode = $(_self).attr("arriveCode");
	var flightNo = $(_self).attr("flightNo");
	var cabinName = $(_self).attr("cabinName");
	var deduct = $(_self).attr("deduct");
	var stopway = $(_self).attr("stopway");
	
	var adultNum = Number($("#adultCount"+single).val());
	var childNum = Number($("#childCount"+single).val());
	var infantNum = Number($("#babyCount"+single).val());
	var passengerCount = adultNum+childNum+infantNum;
	if(stopway<800&&(memberPoints-deduct*passengerCount<1)){
		$("#messageTip").html("第二航距不足800，且当前卡号可用里程不足，不能进行兑换，请减少旅客或者修改兑换航线！");
		messageTip.show();
		return false;
	}

	//第二航程扣除里程数/单个（head中右边红色显示：CAN-HAK  HU7002   S舱 8000公里）
	$("#depardCode2").text(depardCode);
	$("#arriveCode2").text(arriveCode);
	$("#flightNo2").text(flightNo);
	$("#cabinName2").text(cabinName);
	$("#deductMileage2").text(deduct);
	$("#add_flight_list_con2").show();//显示所选舱位单个扣除里程数
	
	var html = "<tr>"+
				"<td>"+2+"</td>"+
				"<td>"+cabinName+"</td>"+
				"<td>"+deduct+"</td>"+
				"<td><a href='javascript:showCondition()' title='查看使用条件' class='alink'>查看</a></td>"+
				"</tr>";

	$("#mileageInfo_2").html(html);
	
	//隐藏航段二舱位列表并显示里程信息
	$(".first_trip_flights2").hide("slow");
	$(".mut_flight").slideDown("slow");
	
	//计算扣除里程
	secondReduce = deduct;//保存第二航段扣除积分数
	var secondReduceAll = passengerCount*deduct;
	var reduceAll = firstReduceAll + secondReduceAll;
	$("#reduceMileage").text(reduceAll);
	$("#realReduce").text(reduceAll);
	$("#difference").text(firstDifference);
	if(memberPoints-reduceAll < 0){
		
		var difference = dealDifference(reduceAll-memberPoints);
		$("#realReduce").text(memberPoints);
		$("#difference").text(firstDifference + difference);
		
	}
	$(".deductions").show();
	
	//第二程航班信息
	backRoundTripDirectSet(_self);
	
	//放开下一步操作
	roundCabinSelected = true;
	
}

function showCondition(){
	conditionDialog.show();
}

function isGoldweek(on){
	var newDAttr = setFormatDate(on).split("-");
	
	//调用
	var yy = newDAttr[0];//2013
	var mm = newDAttr[1];//2
	var dd = newDAttr[2];//15

	var newD = new Date(yy,mm,dd);
	if (yy < 100) yy = "19" + yy;
	
	var lunar = formartLunarDay(GetLunarDay(yy, mm, dd));//农历月份-农历日
	var lunarDate = new Date();
	if(lunar.split("-")[0]==1){
		lunarDate.setFullYear(lunarDate.getFullYear()+1,lunar.split("-")[0],lunar.split("-")[1]);
	}else{
		lunarDate.setMonth(lunar.split("-")[0],lunar.split("-")[1]);
	}
	
	var goldweekStart_1 = "07-10";
	var goldweekEnd_1 = "09-10";
	
	var goldweekStart_2 = "09-28";
	var goldweekEnd_2 = "10-09";
	//农历
	var goldweekStart_3 = "12-16";//腊月十六
	var goldweekEnd_3 = "01-16";//元月十六
	
	var goldweekStart_d1 = new Date(newD.getFullYear(),goldweekStart_1.split("-")[0], goldweekStart_1.split("-")[1],0,0,0);
	var goldweekEnd_d1=new Date(newD.getFullYear(),goldweekEnd_1.split("-")[0], goldweekEnd_1.split("-")[1],0,0,0);
	
//	alert("暑期判断:"+(newD>goldweekStart_d1 && newD<goldweekEnd_d1));
	if(newD>=goldweekStart_d1 && newD<=goldweekEnd_d1){
		return true;
	}
	var goldweekStart_d2 = new Date(newD.getFullYear(),goldweekStart_2.split("-")[0], goldweekStart_2.split("-")[1],0,0,0);
	var goldweekEnd_d2=new Date(newD.getFullYear(),goldweekEnd_2.split("-")[0], goldweekEnd_2.split("-")[1],0,0,0);
	
//	alert("十一判断:"+(newD>goldweekStart_d2 && newD<goldweekEnd_d2));
	if(newD>=goldweekStart_d2 && newD<=goldweekEnd_d2){
		return true;
	}
	var goldweekStart_d3 = new Date();
	goldweekStart_d3.setMonth(goldweekStart_3.split("-")[0], goldweekStart_3.split("-")[1]);
	var goldweekEnd_d3=new Date();
//	goldweekEnd_d3.setMonth(goldweekEnd_3.split("-")[0], goldweekEnd_3.split("-")[1]);
	goldweekEnd_d3.setFullYear(goldweekEnd_d3.getFullYear()+1, goldweekEnd_3.split("-")[0], goldweekEnd_3.split("-")[1]);
	
//	alert("春节判断:"+(lunarDate>goldweekStart_d3 && lunarDate<goldweekEnd_d3));
	if(lunarDate>=goldweekStart_d3 && lunarDate<=goldweekEnd_d3){
		return true;
	}
	return false;
}

function goSingleDirectSet(_self){

	var carrier = $(_self).attr("currCarrier");
	var flightDate = $(_self).attr("flightDate");
	var departAirport = $(_self).attr("depardCode");
	var arrivalAirport = $(_self).attr("arriveCode");
	var flightNo = $(_self).attr("flightNo");
	var departTerminal = $(_self).attr("departTerminal");
	var arriveTerminal = $(_self).attr("arriveTerminal");
	var departTime = $(_self).attr("departTime");
	var arriveTime = $(_self).attr("arriveTime");
	var stops = $(_self).attr("stops");
	var stopInfo = $(_self).attr("stopInfo");
	var mealType = $(_self).attr("mealType");
	var planType = $(_self).attr("planType");
	var tax = $(_self).attr("tax");
	var yq = $(_self).attr("yq");
	var cabin = $(_self).attr("cabinName");
	
	$("#goSingleDirect").empty();
	$("#goSingleDirect").append("<tr>"
			+"<td><input name=\"flightSFCVOes[0].carrier\" value=\""+(carrier)+"\"></td>"
			+"<td><input name=\"flightSFCVOes[0].date\" value=\""+(setFormatDate(flightDate))+"\"></td>"
			+"<td><input name=\"flightSFCVOes[0].flightSegmentSFCVO[0].departAirport\" value=\""+(departAirport)+"\"></td>"
			+"<td><input name=\"flightSFCVOes[0].flightSegmentSFCVO[0].arriveAirport\" value=\""+(arrivalAirport)+"\"></td>"
			+"<td><input name=\"flightSFCVOes[0].flightSegmentSFCVO[0].flightNo\" value=\""+(flightNo)+"\"></td>"
			+"<td><input name=\"flightSFCVOes[0].flightSegmentSFCVO[0].departTerminal\" value=\""+(departTerminal)+"\"></td>"
			+"<td><input name=\"flightSFCVOes[0].flightSegmentSFCVO[0].arriveTerminal\" value=\""+(arriveTerminal)+"\"></td>"
			+"<td><input name=\"flightSFCVOes[0].flightSegmentSFCVO[0].departTime\" value=\""+(departTime)+"\"></td>"
			+"<td><input name=\"flightSFCVOes[0].flightSegmentSFCVO[0].arriveTime\" value=\""+(arriveTime)+"\"></td>"
			+"<td><input name=\"flightSFCVOes[0].flightSegmentSFCVO[0].stops\" value=\""+(stops)+"\"></td>"
			+"<td><input name=\"flightSFCVOes[0].flightSegmentSFCVO[0].stopInfo\" value=\""+(stopInfo)+"\"></td>"
			+"<td><input name=\"flightSFCVOes[0].flightSegmentSFCVO[0].mealType\" value=\""+(mealType)+"\"></td>"
			+"<td><input name=\"flightSFCVOes[0].flightSegmentSFCVO[0].planType\" value=\""+(planType)+"\"></td>"
			+"<td><input name=\"flightSFCVOes[0].flightSegmentSFCVO[0].tax\" value=\""+(tax)+"\"></td>"
			+"<td><input name=\"flightSFCVOes[0].flightSegmentSFCVO[0].yq\" value=\""+(yq)+"\"></td>"
			+"<td><input name=\"flightSFCVOes[0].flightSegmentSFCVO[0].cabin\" value=\""+(cabin)+"\"></td>"
			+"<td><input name=\"flightSFCVOes[0].flightSegmentSFCVO[0].departAirportCnName\" value=\""+(single==3?$("#cityBegin_3_1").val():$("#cityBegin"+single).val())+"\"></td>"
			+"<td><input name=\"flightSFCVOes[0].flightSegmentSFCVO[0].arriveAirporCnName\" value=\""+(single==3?$("#cityEnd_3_1").val():$("#cityEnd"+single).val())+"\"></td>"
			+"<td><input name=\"flightSFCVOes[0].flightSegmentSFCVO[0].departCity\" value=\""+(single==3?$("#c_cityBegin_3_1").val():$("#c_cityBegin"+single).val())+"\"></td>"
			+"<td><input name=\"flightSFCVOes[0].flightSegmentSFCVO[0].arriveCity\" value=\""+(single==3?$("#c_cityEnd_3_1").val():$("#c_cityEnd"+single).val())+"\"></td>"
			+"<td><input name=\"flightSFCVOes[0].flightSegmentSFCVO[0].departCityName\" value=\""+(single==3?$("#cityBegin_3_1").val():$("#cityBegin"+single).val())+"\"></td>"
			+"<td><input name=\"flightSFCVOes[0].flightSegmentSFCVO[0].arriveCityName\" value=\""+(single==3?$("#cityEnd_3_1").val():$("#cityEnd"+single).val())+"\"></td>"
			+"</tr>"
			);
	
}

function backRoundTripDirectSet(_self){
	
	var carrier = $(_self).attr("currCarrier");
	var flightDate = $(_self).attr("flightDate");
	var departAirport = $(_self).attr("depardCode");
	var arrivalAirport = $(_self).attr("arriveCode");
	var flightNo = $(_self).attr("flightNo");
	var departTerminal = $(_self).attr("departTerminal");
	var arriveTerminal = $(_self).attr("arriveTerminal");
	var departTime = $(_self).attr("departTime");
	var arriveTime = $(_self).attr("arriveTime");
	var stops = $(_self).attr("stops");
	var stopInfo = $(_self).attr("stopInfo");
	var mealType = $(_self).attr("mealType");
	var planType = $(_self).attr("planType");
	var tax = $(_self).attr("tax");
	var yq = $(_self).attr("yq");
	var cabin = $(_self).attr("cabinName");
	
	$("#backRoundTripDirect").empty();
	$("#backRoundTripDirect").append("<tr>"
			+"<td><input name=\"flightSFCVOes[1].carrier\" value=\""+carrier+"\"></td>"
			+"<td><input name=\"flightSFCVOes[1].date\" value=\""+setFormatDate(flightDate)+"\"></td>"
			+"<td><input name=\"flightSFCVOes[1].flightSegmentSFCVO[0].departAirport\" value=\""+departAirport+"\"></td>"
			+"<td><input name=\"flightSFCVOes[1].flightSegmentSFCVO[0].arriveAirport\" value=\""+arrivalAirport+"\"></td>"
			+"<td><input name=\"flightSFCVOes[1].flightSegmentSFCVO[0].flightNo\" value=\""+flightNo+"\"></td>"
			+"<td><input name=\"flightSFCVOes[1].flightSegmentSFCVO[0].departTerminal\" value=\""+departTerminal+"\"></td>"
			+"<td><input name=\"flightSFCVOes[1].flightSegmentSFCVO[0].arriveTerminal\" value=\""+arriveTerminal+"\"></td>"
			+"<td><input name=\"flightSFCVOes[1].flightSegmentSFCVO[0].departTime\" value=\""+departTime+"\"></td>"
			+"<td><input name=\"flightSFCVOes[1].flightSegmentSFCVO[0].arriveTime\" value=\""+arriveTime+"\"></td>"
			+"<td><input name=\"flightSFCVOes[1].flightSegmentSFCVO[0].stops\" value=\""+stops+"\"></td>"
			+"<td><input name=\"flightSFCVOes[1].flightSegmentSFCVO[0].stopInfo\" value=\""+(stopInfo)+"\"></td>"
			+"<td><input name=\"flightSFCVOes[1].flightSegmentSFCVO[0].mealType\" value=\""+mealType+"\"></td>"
			+"<td><input name=\"flightSFCVOes[1].flightSegmentSFCVO[0].planType\" value=\""+planType+"\"></td>"
			+"<td><input name=\"flightSFCVOes[1].flightSegmentSFCVO[0].tax\" value=\""+tax+"\"></td>"
			+"<td><input name=\"flightSFCVOes[1].flightSegmentSFCVO[0].yq\" value=\""+yq+"\"></td>"
			+"<td><input name=\"flightSFCVOes[1].flightSegmentSFCVO[0].cabin\" value=\""+cabin+"\"></td>"
			+"<td><input name=\"flightSFCVOes[1].flightSegmentSFCVO[0].departAirportCnName\" value=\""+(single==3?$("#cityBegin_3_2").val():$("#cityEnd"+single).val())+"\"></td>"
			+"<td><input name=\"flightSFCVOes[1].flightSegmentSFCVO[0].arriveAirporCnName\" value=\""+(single==3?$("#cityEnd_3_2").val():$("#cityBegin"+single).val())+"\"></td>"
			+"<td><input name=\"flightSFCVOes[1].flightSegmentSFCVO[0].departCity\" value=\""+(single==3?$("#c_cityBegin_3_2").val():$("#c_cityEnd"+single).val())+"\"></td>"
			+"<td><input name=\"flightSFCVOes[1].flightSegmentSFCVO[0].arriveCity\" value=\""+(single==3?$("#c_cityEnd_3_2").val():$("#c_cityBegin"+single).val())+"\"></td>"
			+"<td><input name=\"flightSFCVOes[1].flightSegmentSFCVO[0].departCityName\" value=\""+(single==3?$("#cityBegin_3_2").val():$("#cityEnd"+single).val())+"\"></td>"
			+"<td><input name=\"flightSFCVOes[1].flightSegmentSFCVO[0].arriveCityName\" value=\""+(single==3?$("#cityEnd_3_2").val():$("#cityBegin"+single).val())+"\"></td>"
			+"</tr>"
		);
}


function moreCabin_2(self){
	var i = $(self).attr("i");
	if($("#first_flight_hu_p_2_"+i).length>0){
		if($("#first_flight_hu_p_2_"+i).css('display') == "none" ){
//			$(self).css("background","url("+basePath+"/resources/v1/images/m1_icon6.gif) right top no-repeat");
			$("#first_flight_hu_p_2_"+i).show();
		}else{
			$(self).css("background","");
			$("#first_flight_hu_p_2_"+i).hide();
		}
	}else{
		Dialog.alert("您选择的航班只有一个舱位！");
		return false;
	}
	
}

function carrierFilter(carrier,singleOrNot){//carrier --承运公司
	if(singleOrNot==1){
		oneTriptReset();
		carrier.length==0?setOneTripFlight(firstDataResult,null):setOneTripFlight(firstDataResult,carrier);
	}else{
		twoTripReset();
		carrier.length==0?setRoundTripFlight(firstDataResult,null,"one"):setRoundTripFlight(firstDataResult,carrier,"one");
		carrier.length==0?setRoundTripFlight(secondDataResult,null,"two"):setRoundTripFlight(secondDataResult,carrier,"two");
	}
}
function moreCabin_1(self){
	var i = $(self).attr("i");
	if($("#first_flight_hu_p_1_"+i).length>0){
		if($("#first_flight_hu_p_1_"+i).css('display') == "none" ){
//			$(self).css("background","url("+basePath+"/resources/v1/images/m1_icon6.gif) right top no-repeat");
			$("#first_flight_hu_p_1_"+i).show();
		}else{
			//$(self).css("background","");
			$("#first_flight_hu_p_1_"+i).hide();
		}
	}else{
		Dialog.alert("您选择的航班只有一个舱位！");
		return false;
	}
	
}

function dealDifference(difference){
	
	if(difference<100){
		difference = 100;
	}
	if(difference%100!=0){
		difference = difference-(difference%100)+100;
	}
	return (difference/100)*10;
}

function getStatus(status){
	if(status == "A"){
		return ">9";
	}
	return status;
}

function cabintypeStatus(name){
	if("P" == name){
		return "头等";
	}else if("J" == name){
		return "公务";
	}else{
		return "经济";
	}
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


function checkSubmit(){
	$("#flightMark").attr("value",parseInt(single));
	$("#mileageAdultCount").attr("value",parseInt($("#adultCount"+single).val()));
	$("#mileageChildCount").attr("value",parseInt($("#childCount"+single).val()));
	$("#mileageInfantsCount").attr("value",parseInt($("#babyCount"+single).val()));
	return true;
}

function canContinueTo(){
	if(single == 1){
		if(!singleCabinSelected){
			Dialog.alert("请选择舱位！");
			return false;
		}
	}else{
		if(!singleCabinSelected){
			Dialog.alert("请选择第一程舱位！");
			return false;
		}
		if(!roundCabinSelected){
			Dialog.alert("请选择第二程舱位！");
			return false;
		}
	}
	return true;
}

function flightSubmit(){
	if(canContinueTo()){
		$("#flightForm").submit();
	}
}

