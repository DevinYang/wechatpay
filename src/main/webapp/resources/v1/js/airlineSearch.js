
var fightDateTemp = new Array();
var beginTime = beginTime();
function beginTime(){
	
	return new Date().format("yyyy-MM-dd");
}
var arrivelTime=arriveTime();
function arriveTime(){

      var arriveTime = new Date();
      arriveTime.setDate(arriveTime.getDate()+1);
      return arriveTime.format("yyyy-MM-dd");
}
//---------------------------------------------------单程
function oneTripSubmit(){
	
		if(checkOneTrip()){
			
			$("#form1").submit();
		}
	}
//单程验证
function checkOneTrip(){

		var cityBegin = $("#city_1").val();
		var cityEnd = $("#city_2").val();
		var leaveDate = $("#dateBegin_1").val();
		//验证出发城市
		if(cityBegin == null || cityBegin == ""){

				//Dialog.alert("出发城市不能为空!");
				Dialog.alert("出发城市不能为空!",function(){objFocus(document.getElementById("city_1"));});
				return false;
		}
		var beginCode = hasThisCity(cityBegin);
		if(beginCode == ""){
			
			//Dialog.alert("不存在该出发城市！");
			Dialog.alert("不存在该出发城市！",function(){objFocus(document.getElementById("city_1"));});
			return false;
		}
		if(beginCode != ""){
			
			$("#cityCode_1").attr("value",beginCode);
		}
		//验证到达城市
		if(cityEnd == null || cityEnd == ""){

			//Dialog.alert("到达城市不能为空!");
			Dialog.alert("到达城市不能为空!",function(){objFocus(document.getElementById("city_2"));});
			return false;
		}
		//出发到达城市不能相同
		if(cityEnd == cityBegin){
			Dialog.alert("出发城市和到达城市不能相同!");
			return false;
		}
		//设置城市三子码
		var cityEndCode = hasThisCity(cityEnd);
		if(cityEndCode  == ""){
			
			//Dialog.alert("不存在该到达城市！");
			Dialog.alert("不存在该到达城市！",function(){objFocus(document.getElementById("city_2"));});
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
		
		if(((new Date(leaveDate.replaceAll("-","/")).getTime()-(new Date()).getTime())/(1000 * 60 * 60 * 24))>365){
			Dialog.alert("航班时间必须为一年内的时间!");
			return false;
		}
		if(!checkTravellerCount(1)){
			
			return false;
		}
		return true;
}






//---------------------------------------------------来回程
function roundTripSubmit(){
	if(!checkRoundTrip()){
		
		return ;
	}
	$("#form2").submit();
	}	
//来回程验证
function checkRoundTrip(){

	var cityBegin = $("#city_3").val();
	var cityEnd = $("#city_4").val();
	
	var leaveDate = $("#leavelDate_2").val();
	var arrivelDate = $("#backDate_2").val();
	//验证出发城市
	if(cityBegin == null || cityBegin == ""){

			//Dialog.alert("出发城市不能为空!");
			Dialog.alert("出发城市不能为空!",function(){objFocus(document.getElementById("city_3"));});
			return false;
		}
	var beginCode = hasThisCity(cityBegin);
	if(beginCode == ""){
		
		//Dialog.alert("不存在该出发城市！");
		Dialog.alert("不存在该出发城市！",function(){objFocus(document.getElementById("city_3"));});
		return false;
	}
	if(beginCode != ""){
		
		$("#cityCode_3").attr("value",beginCode);
	}
	
	//验证到达城市
	if(cityEnd == null || cityEnd == ""){

		//Dialog.alert("到达城市不能为空!");
		Dialog.alert("到达城市不能为空!",function(){objFocus(document.getElementById("city_4"));});
		return false;
	}
	//出发到达城市不能相同
	if(cityEnd == cityBegin){
		Dialog.alert("出发城市和到达城市不能相同!");
		return false;
	}
	var endCode = hasThisCity(cityEnd);
	if(endCode == ""){
		
		//Dialog.alert("不存在该到达城市！");
		Dialog.alert("不存在该到达城市！",function(){objFocus(document.getElementById("city_4"));});
		return false;
	}
	if(endCode != ""){
		
		$("#cityCode_4").attr("value",endCode);
	}
	
	if(leaveDate == null || leaveDate== ""){

		Dialog.alert("出发时间不能为空!");
		return false;
	}
	if(!afterTime(new Date().format("yyyy-MM-dd"),leaveDate)){
		
		Dialog.alert("出发时间必须等于或晚于当天!");
		return false;
	}
	
	if(((new Date(leaveDate.replaceAll("-","/")).getTime()-(new Date()).getTime())/(1000 * 60 * 60 * 24))>365){
		Dialog.alert("航班时间必须为一年内的时间!");
		return false;
	}
	
	
	if(arrivelDate == null || arrivelDate== ""){

		Dialog.alert("查询的返回时间不能为空!");
		return false;
	}
	if(!afterTime(new Date().format("yyyy-MM-dd"),arrivelDate)){
		
		Dialog.alert("返回时间必须等于或晚于当天!");
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
	if(!checkTravellerCount(2)){
		
		return false;
	}
	return true;
}	




//---------------------------------------------------多航程

function manyTripSubmit(){
	var j = 0;
	var departCity =[];
	var arrivelCity =[];
	for(var i=1;i<9;i++){
		if($("#trip"+i).is(":hidden")){
			continue;
		}
		
		
		var cityBegin = $("#cityBegin_3_"+i).val();	
		if(cityBegin ==''){
			Dialog.alert("出发城市不能为空!",function(){objFocus(document.getElementById("cityBegin_3_"+i));});
			return ;
		}
		
		var beginCode = hasThisCity(cityBegin);
		if(beginCode == ""){
			
			Dialog.alert("不存在该城市！",function(){objFocus(document.getElementById("cityBegin_3_"+i));});
			
			return ;
		}
		if(beginCode != ""){
			
			$("#cityBeginCode_3_"+i).attr("value",beginCode);
		}
		var cityEnd = $("#cityEnd_3_"+i).val();
		if(cityEnd == ''){
		//	Dialog.alert("到达城市不能为空!");
			Dialog.alert("到达城市不能为空!",function(){objFocus(document.getElementById("cityBegin_3_"+i));});
			return ;
		}
		
		var endCode = hasThisCity(cityEnd);
		if(endCode == ""){
			
		//	Dialog.alert("不存在"+cityEnd+"城市！");
			Dialog.alert("不存在该城市！",function(){objFocus(document.getElementById("cityEnd_3_"+i));});
			return ;
		}
		if(endCode != ""){
			
			$("#cityEndCode_3_"+i).attr("value",endCode);
		}
		//出发到达城市不能相同
		if(cityEnd == cityBegin){
			Dialog.alert("出发城市和到达城市不能相同!");
			return ;
		}
		//判断航班是否连续
		departCity.push(beginCode);
		arrivelCity.push(endCode);
		
		var arrivelDate = $("#dateBegin_3_"+i).val();
		
		if(arrivelDate == null || arrivelDate== ""){

			Dialog.alert("到达时间不能为空!");
			return ;
		}
		if(!afterTime(new Date().format("yyyy-MM-dd"),arrivelDate)){
			
			Dialog.alert("出发时间必须等于或晚于当天!!");
			return ;
		}
		
		if(((new Date(arrivelDate.replaceAll("-","/")).getTime()-(new Date()).getTime())/(1000 * 60 * 60 * 24))>365){
			Dialog.alert("航班时间必须为一年内的时间!");
			return ;
		}
		fightDateTemp[j] = arrivelDate;
		j++;
	}
	var flightLength =  departCity.length;

	var dateLength = fightDateTemp.length;
	for(var k = 0;k<dateLength-1;k++){
		
		 if(!afterTime(fightDateTemp[k],fightDateTemp[k+1])){
			 
			 Dialog.alert("第【"+(Number(k)+2)+"】段旅程出发日期不能晚于第【"+(Number(k)+1)+"】段旅程出发日期，请重选！!");
			 return ;
		 }
	}
	if(!checkTravellerCount(3)){
		return ;
	}
	for(var m =1;m<flightLength;m++){
		
		if(m<flightLength && departCity[m] != arrivelCity[m-1]){
			
			Dialog.confirm("多段航程支持缺口程的航班查询，但是不允许建立缺口程的PNR、订单！",manyTripForSubmit,manyTripCancelSubmit);
			return ;
			}
		else{
			$("#form3").submit();
		}
	}
}
function manyTripForSubmit(){
	$("#form3").submit();
}
function manyTripCancelSubmit(){}
//多航程验证
/*
function checkManyTrip(){
	var j = 0;
	var departCity =[];
	var arrivelCity =[];
	for(var i=1;i<9;i++){
		if($("#trip"+i).is(":hidden")){
			continue;
		}
		
		
		var cityBegin = $("#cityBegin_3_"+i).val();
		if(cityBegin ==''){
			Dialog.alert("出发城市不能为空!");
			return false;
		}
		
		var beginCode = hasThisCity(cityBegin);
		if(beginCode == ""){
			
			Dialog.alert("不存在"+cityBegin+"城市！");
			return false;
		}
		if(beginCode != ""){
			
			$("#cityBeginCode_3_"+i).attr("value",beginCode);
		}
		var cityEnd = $("#cityEnd_3_"+i).val();
		if(cityEnd == ''){
			Dialog.alert("到达城市不能为空!");
			return false;
		}
		
		var endCode = hasThisCity(cityEnd);
		if(endCode == ""){
			
			Dialog.alert("不存在"+cityEnd+"城市！");
			return false;
		}
		if(endCode != ""){
			
			$("#cityEndCode_3_"+i).attr("value",endCode);
		}
		//出发到达城市不能相同
		if(cityEnd == cityBegin){
			Dialog.alert("出发城市和到达城市不能相同!");
			return false;
		}
		//判断航班是否连续
		departCity.push(beginCode);
		arrivelCity.push(endCode);
		
		var arrivelDate = $("#dateBegin_3_"+i).val();
		
		if(arrivelDate == null || arrivelDate== ""){

			Dialog.alert("到达时间不能为空!");
			return false;
		}
		if(!afterTime(new Date().format("yyyy-MM-dd"),arrivelDate)){
			
			Dialog.alert("航班时间必须不小于当前日期!");
			return false;
		}
		
		if(((new Date(arrivelDate.replaceAll("-","/")).getTime()-(new Date()).getTime())/(1000 * 60 * 60 * 24))>365){
			Dialog.alert("航班时间必须为一年内的时间!");
			return false;
		}
		fightDateTemp[j] = arrivelDate;
		j++;
	}
	var flightLength =  departCity.length;

	var dateLength = fightDateTemp.length;
	for(var k = 0;k<dateLength-1;k++){
		
		 if(!afterTime(fightDateTemp[k],fightDateTemp[k+1])){
			 
			 Dialog.alert("第【"+(Number(k)+2)+"】段旅程出发日期不能晚于第【"+(Number(k)+1)+"】段旅程出发日期，请重选！");
			 return false;
		 }
	}
	if(!checkTravellerCount(3)){
		return false;
	}
	for(var m =1;m<flightLength;m++){
		
		if(m<flightLength && departCity[m] != arrivelCity[m-1]){
			
			if(Dialog.confirm("多段航程支持缺口程的航班查询，但是不允许建立缺口程的PNR、订单！2")){
				return true;
			}else{
				return false;
			}
			
		}
	}
	return true;
}*/
//删除航段
function hideadFlight(index){
	
	$("#dateBegin_3_"+index).attr("value",beginTime);
	$("#cityBegin_3_"+index).attr("value","");
	$("#cityBeginCode_3_"+index).attr("value","");
	$("#cityEnd_3_"+index).attr("value","");
	$("#cityEndCode_3_"+index).attr("value","");
	$("#trip"+index).hide();
}
function tripAdd(){//添加航段
	for(var i = 3 ;i <= 8 ;i++){
		if($("#trip"+i).is(":hidden")){
			$("#trip"+i).show();
			return;
		}
	}
}

//验证旅客数
function checkTravellerCount(i){
	var adultCount = $("#adultCount"+i).val();
	var childCount = $("#childCount"+i).val();
	var babyCount = $("#babyCount"+i).val();
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
//表单重置
function formReset(i){
	var id="form"+i;
	document.getElementById(id).reset();
	if(i == 1){
		$("#dateBegin_1").attr("value",beginTime);
	}
	if(i == 2){
		$("#leavelDate_2").attr("value",beginTime);
		$("#backDate_2").attr("value",arrivelTime);
	}
	if(i == 3){
	for(var i=1;i<9;i++){
		$("#dateBegin_3_"+i).attr("value",beginTime);
		}
	}
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

//判断是否存在该城市
function hasThisCity(city){
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
function objFocus(obj){
	obj.focus();
}