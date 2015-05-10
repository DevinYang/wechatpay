$(function(){
	$(".searchBut").click(function(){
		if(checkForm()){
			queryMileage();
		}
	});
});



function queryMileage(){
	var searchVO = formToObj(searchform); 

	ajaxRequest(basePath+"/range-finder/list/",searchVO,
			function(result){
				if(result.error){
					
					Dialog.alert(result.error);
					
				}else{
					
					if(result.freeData && result.freeData.length!=0){
						appendFreeStandard(result.freeData);
					}else{
						cleanData("freeBody");
						$("#freeBody").append("<tr><td colspan=\"6\"><font color='red'>没有找到满足条件的记录！</font></td></tr>");
						$("#freeResult").show("slow");
					}
					if(result.upGradeData && result.upGradeData.length!=0){
						appendUpGradeStandard(result.upGradeData);
					}else{
						cleanData("upGradeBody");
						$("#upGradeBody").append("<tr><td colspan=\"6\"><font color='red'>没有找到满足条件的记录！</font></td></tr>");
						$("#upGradeResult").show("slow");
					}
					
				}
				
			}
	);
}
function cleanData(id){
	$("#"+id).empty();
}
function appendFreeStandard(freeData){
	var departName = $("#departName").val();
	var arrivalName = $("#arrivalName").val();
	cleanData("freeBody");
	$("#freeBody").append(
			"<tr>"
			+"<td rowspan='"+freeData.length+"'>"+departName+"</td>"
			+"<td rowspan='"+freeData.length+"'>"+arrivalName+"</td>"
			+"<td rowspan='"+freeData.length+"'>"+freeData[0].carrier+"</td>"
			+"<td>"+freeData[0].cabinLevelName+"</td>"
			+"<td>"+freeData[0].tripTypeName+"</td>"
			+"<td>"+freeData[0].points+"</td>"
			+"</tr>"
	);
	
	for(var i=1;i<freeData.length;i++){
		$("#freeBody").append(
				"<tr>"
				+"<td>"+freeData[i].cabinLevelName+"</td>"
				+"<td>"+freeData[i].tripTypeName+"</td>"
				+"<td>"+freeData[i].points+"</td>"
				+"</tr>"
		);
	}
	
	$("#freeResult").show("slow");
}

function appendUpGradeStandard(upGradeData){
	var departName = $("#departName").val();
	var arrivalName = $("#arrivalName").val();
	$("#upGradeBody").empty();
	$("#upGradeBody").append(
			"<tr>"
			+"<td rowspan='"+upGradeData.length+"'>"+departName+"</td>"
			+"<td rowspan='"+upGradeData.length+"'>"+arrivalName+"</td>"
			+"<td rowspan='"+upGradeData.length+"'>"+upGradeData[0].carrier+"</td>"
			+"<td>"+upGradeData[0].oldCabinLevelName+"("+upGradeData[0].oldCabinCode+")</td>"
			+"<td>"+upGradeData[0].cabinLevelName+"("+upGradeData[0].cabinCode+")</td>"
			+"<td>"+upGradeData[0].points+"</td>"
			+"</tr>"
	);
	
	for(var i=1;i<upGradeData.length;i++){
		$("#upGradeBody").append(
				"<tr>"
				+"<td>"+upGradeData[i].oldCabinLevelName+"("+upGradeData[i].oldCabinCode+")</td>"
				+"<td>"+upGradeData[i].cabinLevelName+"("+upGradeData[i].cabinCode+")</td>"
				+"<td>"+upGradeData[i].points+"</td>"
				+"</tr>"
		);
	}
	
	$("#upGradeResult").show("slow");
}
//验证
function checkForm(){

	var cityBegin = $("#departName").val().trim();
	var cityEnd = $("#arrivalName").val().trim();
	
	//验证出发城市
	if(cityBegin == null || cityBegin == ""){
			Dialog.alert("始发城市不能为空！",function(){$("#departName").focus();},function(){$("#departName").focus();});
			return false;
	}
	var beginCode = hasThisCity(cityBegin);
	if(beginCode == "N"){
		
		Dialog.alert("不存在该始发城市！",function(){$("#departName").focus();},function(){$("#departName").focus();});
		return false;
	}
	if(beginCode != "N"){
		$("#departCode").attr("value",beginCode);
	}
	//验证到达城市
	if(cityEnd == null || cityEnd == ""){

		Dialog.alert("目的城市不能为空！",function(){$("#arrivalName").focus();},function(){$("#arrivalName").focus();});
		return false;
	}
	//设置城市三子码
	var cityEndCode = hasThisCity(cityEnd);
	if(cityEndCode  == "N"){
		
		Dialog.alert("不存在该目的城市！",function(){$("#arrivalName").focus();},function(){$("#arrivalName").focus();});
		return false;
	}
	if(cityEndCode != "N"){
		
		$("#arrivalCode").attr("value",cityEndCode);
	}
	
	if(cityBegin == cityEnd){
		Dialog.alert("始发城市和目的城市不能一样！",function(){$("#departName").focus();},function(){$("#departName").focus();});
		return false;
	}
	return true;
}

//判断是否存在该城市
function hasThisCity(city){
//	alert(cities.length);
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