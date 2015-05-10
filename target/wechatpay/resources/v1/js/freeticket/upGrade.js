$(function(){

	var otk_history_order = new Dialog('otk_history_order',{
		modal: true,//使dialog层下面的不可点击
		width: 600,
		buttons: {
			"继续提交": function() {
				showLoadingMask();
				$("#upGradeform").attr("action",basePath+"/mileage-upGrade/"); 
				$("#upGradeform").submit();
				
			},
			"关闭窗口": function() {
				this.hide();
			}
		}
	});
	
	
	$.metadata.setType("attr", "validate");
	$('#upGradeform').validate({onsubmit: true,onkeyup: function(element) { $(element).valid(); }});
	
	
	//里程升舱pnr提取操作
	$(".upGtadeImport").click(function(){
		upGtadeImport();
	});
	
	function upGtadeImport(){
		if($("#upGradeform").valid()){
			var pnrCode = $("#pnrCode").val().trim().toUpperCase();
				
			var orderArea = $("input[name=orderArea]:checked").val();
			var freeType = $("input[name=freeType]:checked").val();
			$("#workOrderId").val(workOrderId);
					
			if(orderArea == "INLAND"){
				/*
				if(freeType == "MILEAGE"){
//					ajaxRequest(basePath+"/mileage-upGrade/"+pnrCode+"/historyOrder",null,function(result){
//						if(!result.errorMsg){
//							$("#upGradeform").attr("action",basePath+"/mileage-upGrade/");
//							if(result.otkOrder && result.otkOrder.length != 0){
//								appendHistoryOtkOrder(result.otkOrder);
//							}else{
//								//showLoadingMask();
//								//$("#upGradeform").submit();
//							}
//						}else{
//							Dialog.alert(result.errorMsg);
//						}
//					},false);
					$("#upGradeform").attr("action",basePath+"/mileage-upGrade/");
					$("#upGradeform").submit();
				}
				if(freeType == "UPGRADE"){
					$("#upGradeform").attr("action",basePath+"/upTicket-upGrade/"); 
					$("#upGradeform").submit();
				}
				*/
				showLoadingMask();
				$("#upGradeform").attr("action",basePath+"/mileage-upGrade/");
				$("#upGradeform").submit();
			}
				
			if(orderArea == "FOREIGN"){
//				if(freeType == "MILEAGE"){
//					$("#upGradeform").attr("action","${ctx}/mileage-upGrade-Eign/");
//				}
//				if(freeType == "upGrade"){
//					$("#upGradeform").attr("action","${ctx}/upGrade-Eign/"); 
//				}
				Dialog.alert("暂不支持！");
			}
		}
	};
	
	
	
	
	function appendHistoryOtkOrder(orderList){
		$("#historyOtkOrderBody").empty();
		$.each(orderList,function(){
			$("#historyOtkOrderBody").append(
					 "<tr>"
					+"<td><a href=\"#\" orderId=\""+this.orderId+"\" class=\"alink orderItem \">"+this.orderNo+"</a></td>"
					+"<td>"+this.orderStatusName+"</td>"
					+"<td>"+this.tktno+"</td>"
					+"</tr>"
			);
		});
		otk_history_order.show();
		$(".orderItem").bind("click",orderDetail);
	}

	function orderDetail(){
		parent.tab.addTab({label:"订单详情",url:basePath+"/commonquery-order/detail/"+$(this).attr("orderId")+"/"});
	}
});


