$(function(){
	var pnr_history_order = new Dialog('pnr_history_order',{
		modal: true,//使dialog层下面的不可点击
		width: 600,
		buttons: {
			"继续提交": function() {
				showLoadingMask();
				$("#pnrImpForm").submit();
			},
			"关闭窗口": function() {
				this.hide();
			}
		}
	});
	
	$(".pnrImport").click(function(){

		var pnrAttr = new Array();
		$("input[name=pnrNo]").each(function(){
			var code = $(this).val().trim();
			if(code != ""){
				$(this).val(code.toUpperCase());
				pnrAttr.push(code.toUpperCase());
			}
		});
		
		if(checkPnrImport(pnrAttr)){
			
			var pnrCodes = "";
			$.each(pnrAttr,function(i){
				pnrCodes += i==pnrAttr.length-1 ? this : this + ",";
			});
			
			ajaxRequest(basePath+"/free-pnrImp/"+pnrCodes+"/historyOrder",null,function(result){
				if(!result.errorMsg){
					if(result.pnrOrder && result.pnrOrder.length != 0){
						appendHistoryOrder(result.pnrOrder);
					}else{
						showLoadingMask();
						$("#pnrImpForm").submit();
					}
				}else{
					Dialog.alert(result.errorMsg);
				}
			},false);
		}
	});
	
	function pnrImp(pnrCodes){
		$("#pnrImpForm").submit();
	}

	function checkPnrImport(pnrAttr){
		
		if(pnrAttr.length == 0){
			Dialog.alert("PNR不能为空！");
			return false;
		}
		
		for(var i=0;i<pnrAttr.length;i++){
			if(!pnrAttr[i].match(/^[\w\d]{5,6}$/)){
				Dialog.alert("您输入的第 "+(i+1)+" 个PNR格式不对，请重新输入！");
				return false;
			}
			for(var j=i+1;j<pnrAttr.length;j++){
				if(pnrAttr[i] == pnrAttr[j]){
					Dialog.alert("您输入的第 "+(i+1)+" 个PNR和第 "+(j+1)+" 个PNR重复，请重新输入！");
					return false;
				}
			}
		}
		return true;
	}	

	function detail(){
		parent.tab.addTab({label:"订单详情",url:basePath+"/commonquery-order/detail/"+$(this).attr("orderId")+"/"});
	}
		
	function appendHistoryOrder(orderList){
		$("#historyOrderBody").empty();
		$.each(orderList,function(){
			$("#historyOrderBody").append(
					 "<tr>"
					+"<td><a href=\"#\" orderId=\""+this.orderId+"\" class=\"alink orderItem \">"+this.orderNo+"</a></td>"
					+"<td>"+this.orderStatusName+"</td>"
					+"<td>"+this.pnr+"</td>"
					+"</tr>"
			);
		});
		pnr_history_order.show();
		$(".orderItem").bind("click",detail);
	}
});




