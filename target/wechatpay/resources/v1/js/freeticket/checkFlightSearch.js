var messageTip = null;

var fightDateTemp = new Array();

//单程验证
function checkOneTrip(){

		var cityBegin = $("#cityBegin1").val();
		var cityEnd = $("#cityEnd1").val();
		var leaveDate = $("#leaveDate1").val();
		//验证出发城市
		if(cityBegin == null || cityBegin == ""){

				Dialog.alert("出发城市不能为空!");
				return false;
		}
		var beginCode = hasThisCity(cityBegin);
		if(beginCode == ""){
			
			Dialog.alert("不存在该出发城市！");
			return false;
		}
		if(beginCode != ""){
			
			$("#c_cityBegin1").attr("value",beginCode);
		}
		//验证到达城市
		if(cityEnd == null || cityEnd == ""){

			Dialog.alert("到达城市不能为空!");
			return false;
		}
		//设置城市三子码
		var cityEndCode = hasThisCity(cityEnd);
		if(cityEndCode  == ""){
			
			Dialog.alert("不存在该到达城市！");
			return false;
		}
		if(cityEndCode != ""){
			
			$("#c_cityEnd1").attr("value",cityEndCode);
		}
		if(leaveDate == null || leaveDate== ""){

			Dialog.alert("查询的出发时间不能为空!");
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
		if(!checkTravellerCount(1)){
			
			return false;
		}
		return true;
}

//来回程验证
function checkTwoTrip(){

	var cityBegin = $("#cityBegin2").val();
	var cityEnd = $("#cityEnd2").val();
	
	var leaveDate = $("#leaveDate2").val();
	var arrivelDate = $("#backDate2").val();
	//验证出发城市
	if(cityBegin == null || cityBegin == ""){

			Dialog.alert("出发城市不能为空!");
			return false;
		}
	var beginCode = hasThisCity(cityBegin);
	if(beginCode == ""){
		
		Dialog.alert("不存在该出发城市！");
		return false;
	}
	if(beginCode != ""){
		
		$("#c_cityBegin2").attr("value",beginCode);
	}
	
	//验证到达城市
	if(cityEnd == null || cityEnd == ""){

		Dialog.alert("到达城市不能为空!");
		return false;
	}
	var endCode = hasThisCity(cityEnd);
	if(endCode == ""){
		Dialog.alert("不存在该到达城市！");
		return false;
	}
	if(endCode != ""){
		
		$("#c_cityEnd2").attr("value",endCode);
	}
	//出发到达城市不能相同
	if(cityEnd == cityBegin){
		Dialog.alert("出发城市和到达城市不能相同!");
		return false;
	}
	
	if(leaveDate == null || leaveDate== ""){

		Dialog.alert("查询的出发时间不能为空!");
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
	
	
	if(arrivelDate == null || arrivelDate== ""){

		Dialog.alert("查询的返回时间不能为空!");
		return false;
	}
	if(!afterTime(new Date().format("yyyy-MM-dd"),arrivelDate)){
		
		Dialog.alert("返回时间必须等于或晚于当天!");
		return false;
	}
	
	if(((new Date(arrivelDate).getTime()-(new Date()).getTime())/(1000 * 60 * 60 * 24))>365){
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
//表单重置
function formReset(i){
	var id="condition"+i;
	//document.getElementById(id).reset();
	
	$("#cityBegin1").attr("value","");
	$("#cityEnd1").attr("value","");
	$("#cityBegin2").attr("value","");
	$("#cityEnd2").attr("value","");
	
	$("#cityBegin_3_1").attr("value","");
	$("#cityEnd_3_1").attr("value","");
	$("#cityBegin_3_2").attr("value","");
	$("#cityEnd_3_2").attr("value","");
	
	$("#leaveDate1").attr("value",beginTime);
	$("#leaveDate2").attr("value",beginTime);
	$("#backDate2").attr("value",arrivelTime);
	$("#dateBegin_3_1").attr("value",beginTime);
	$("#dateBegin_3_2").attr("value",beginTime);
	
	$("#adultCount"+single).attr("value",1); 
	$("#childCount"+single).attr("value",0); 
	$("#babyCount"+single).attr("value",0); 
}

//多航程验证
function checkManayTrip(){
	var j = 0;
	var departCity =[];
	var arrivelCity =[];
	for(var i=1;i<3;i++){
		
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
		
		var arrivelDate = $("#dateBegin_3_"+i).val();
		
		if(arrivelDate == null || arrivelDate== ""){

			Dialog.alert("到达时间不能为空!");
			return false;
		}
		if(!afterTime(new Date().format("yyyy-MM-dd"),arrivelDate)){
			
			Dialog.alert("出发时间必须等于或晚于当天!!");
			return false;
		}
		
		if(((new Date(arrivelDate).getTime()-(new Date()).getTime())/(1000 * 60 * 60 * 24))>365){
			Dialog.alert("航班时间必须为一年内的时间!");
			return false;
		}
		fightDateTemp[j] = arrivelDate;
		j++;
	}
	var dateLength = fightDateTemp.length;
	for(var k = 0;k<dateLength-1;k++){
		
		 if(!afterTime(fightDateTemp[k],fightDateTemp[k+1])){
			 
			 Dialog.alert("第【"+(Number(k)+2)+"】段旅程出发日期不能晚于第【"+(Number(k)+1)+"】段旅程出发日期，请重选！!");
			 return ;
		 }
	}
	var flightLength =  departCity.length;
	if(!checkTravellerCount(3)){
		return ;
	}
	for(var m =1;m<flightLength;m++){
		
		if(m<flightLength && departCity[m] != arrivelCity[m-1]){
			
			Dialog.confirm("多段航程支持缺口程的航班查询，但是不允许建立缺口程的PNR、订单！",manyTripForSubmit,manyTripCancelSubmit);
			return ;
			}
		else{
			$("#condition3").submit();
		}
	}
}

function manyTripForSubmit(){
	$("#condition3").submit();
}
function manyTripCancelSubmit(){}


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

//验证旅客数
function checkTravellerCount(i){
	var adultNum = $("#adultCount"+i).val();
	var childNum = $("#childCount"+i).val();
	var babyNum = $("#babyCount"+i).val();
	var totalCount = parseInt(adultNum) + parseInt(childNum);
	if(adultNum < babyNum){
		
		Dialog.alert("婴儿数不能大于成人数！");
		return false;
		
	}else if(totalCount == 0){
		
		Dialog.alert("旅客人数不能为0");
		return false;
		
	}else{
		
		if(totalCount>9){
			
			Dialog.alert("成人加儿童数不能大于9");
			return false;
		}
		return true;
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
		
		return "N";
	}
	for(var i = 0;i< cities.length;i++){
		if(city == cities[i].name){
			
			return cities[i].code;
		}
	}
	return "N";
}

//将ddMMMyy格式的时间串转成yyyy-MM-dd形式
function setFormatDate(upCaseDate){
	var date = upCaseDate.toUpperCase();
	var m = ['JAN','FEB','MAR','APR','MAY','JUN','JUL','AUG','SEP','OCT','NOV','DEC'];
	for(key in m){
		if(date.substr(2,3)==m[key]){
			var month = (Number(key)+1)+'';
			if(month.length==1)month = "0"+month;
			var newDate = "20"+date.substr(5,7)+"-"+ month +"-"+date.substr(0,2);
			return newDate;
		}
	}
}
