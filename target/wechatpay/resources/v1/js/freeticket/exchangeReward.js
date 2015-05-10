var rewardDialog;

$(function(){
	  rewardDialog = new Dialog("rewardDialog",{
		modal: true,//使dialog层下面的不可点击
		width:880,
		height:550,
		closeAction:function(){
			parent.tab.removeTab(parent.tab.getCurrentTabId());
		},
		buttons:{
			' 确 定 ':function(){
				parent.tab.removeTab(parent.tab.getCurrentTabId());
			}
		}
	});
	
	$.metadata.setType("attr", "validate");
	$("#reward_form").validate({onsubmit: true,onkeyup: function(element) { $(element).valid(); }});
	
	//预算积分
	$(".budget").click(function(){
		if($("#reward_form").valid()){
			var reward = formToObj(reward_form);
			ajaxRequest(basePath+"/exchange-reward/budget",reward,function(result){
				if(!result.error){
					$("#reduceMileage").text(result.reward.reduceMileage);
					$(".reduceMileage").attr("value",result.reward.reduceMileage);
					budget = true;
					$("#budgetInfo").show();
					openBtn();
				}else{
					Dialog.alert(result.error);
				}
			},false);
		}
	});
	
	
	
	$(".extract").click(function(){
		
		var newCid = $(".memberCardCode").val().trim();
		if(newCid == ""){
			Dialog.alert("会员卡号不能为空！");
			return false;
		}else{
			ajaxRequest(basePath+"/free-member/"+newCid+"/verification",null,function(result){
				if(result.error){
					Dialog.alert(result.error);
				}else{
					$("#cardError").empty();
					if(!result.isSuccess){
						$("#cardError").text(result.msg);
					}else{
						loadNewMember(result.uicMember);
					}
				}
			},false);
		}
	});
	
	$(".consumeQuery").click(function(){
		$("#content").empty();
		var keyWord = $(".keyWord").val().trim();
		var keyType = $(".keyType").val().trim();
		if(keyWord == ""){
			Dialog.alert("关键字不能为空！");
			return false;
		}else{

			ajaxRequest(basePath+"/exchange-reward/"+keyWord+"/"+keyType+"/consumeQuery",null,function(result){
				if(result.error){
					Dialog.alert(result.error);
				}else{
					appendConsumeBody(result.data);
				}
			});
			
//			var grid = new Grid("content",{
//		        url : basePath+"/exchange-reward/"+keyWord+"/"+keyType+"/list",
//		        method : "GET",
//		        page: true,//是否启用分页
//		        autoLoad: false, //是否自动加载数据
//		        columns: [
//			        { display: '序号', name: 'seq' },
//			        { display: '消费品代号', name: 'code'},
//			        { display: '消费品中文名', name: 'cnName' },
//			        { display: '消费品英文名', name: 'enName' },
//			        { display: '供应商代号', name: 'supplier' },
//			        { display: '兑换积分', name: 'points' },
//			        { display: '有效日期', name: 'date' },
//			        { display: '库存', name: 'stock' },
//			        { display: '备注', name: 'remark' }
//		        ],
//		        operations: {
//		        	'选择':function(data){
//		        		$(".consumerCode").val(data.code);
//		        		$(".supplierNo").val(data.supplier);
//		        		$(".supplierNo").focus();
//		        	}
//		        }
//			 });
//			grid.loadData(null,true);
//			$(".result").show("slow");
		}
		
	});
	
	$(".consumerCode").blur(function(){
		$("#codeError").empty();
		var code = $(this).val().trim();
		if(code != ""){
			ajaxRequest(basePath+"/exchange-reward/"+code+"/verification",null,function(result){
				if(!result.error){
					if(result.isSuccess){
						loadConsume(result.reward);
					}else{
						$("#codeError").html(result.errorMsg);
						$(".supplierNo").val("");
					}
				}else{
					Dialog.alert(result.error);
				}
			},false);
		}
	});
	
/*	function reduceMileage(){
		if($("#reward_form").valid()){
			var reward = formToObj(reward_form);
			ajaxRequest(basePath+"/exchange-reward/reduce",reward,function(result){
				if(!result.error){
					$("#rewardInfo").attr("src",basePath+"/business-rewardQuery/"+result.reward.id+"/rewardDetail");
					rewardDialog.show();
				}else{
					Dialog.alert(result.error);
				}
			});
		}
	}*/
	
	
});

function reduceMileage(){
	if($("#reward_form").valid()){
		var reward = formToObj(reward_form);
		ajaxRequest(basePath+"/exchange-reward/reduce",reward,function(result){
			if(!result.error){
				Dialog.alert("兑换成功！",function(){
					parent.tab.removeTab(parent.tab.getCurrentTabId());
				});
			}else{
				Dialog.alert(result.error);
			}
		});
	}
}


function appendConsumeBody(data){
	$("#consumeBody").empty();
	if(data && data.length > 0){
		$.each(data,function(){
			$("#consumeBody").append(
				 "<tr>"
				+"<td>"+(Number(this.seq)+1)+"</td>"
				+"<td>"+this.code+"</td>"
				+"<td>"+this.cnName+"</td>"
				+"<td>"+this.enName+"</td>"
				+"<td>"+this.supplierNo+"</td>"
				+"<td>"+this.mileage+"</td>"
				+"<td>"+this.date+"</td>"
				+"<td>"+this.stock+"</td>"
				+"<td>"+this.remark+"</td>"
				+"<td><input type=\"radio\" name=\"consumeRadio\" code=\""+this.code+"\" supplier=\""+this.supplierNo+"\"  /></td>"
				+"</tr>"
			);
		});
		$("input[name='consumeRadio']").bind("change",consumerSelect);
		$(".consumeTable").show("slow");
	}
}

function consumerSelect(){
	var code = $(this).attr("code");
	var supplier = $(this).attr("supplier");
	
	$(".consumerCode").val(code);
	$(".supplierNo").val(supplier);
	$(".supplierNo").focus();
}
function loadNewMember(member){
	$("#forFax").val(member.fax);
	$("#proposerName").val(member.name);
	if(member.idcardNo){
		$("#credType").val(1);
		$("#credCode").val(member.idcardNo);
	}else if(member.passportNo){
		$("#credType").val(2);
		$("#credCode").val(member.passportNo);
	}else if(member.otherNo){
		$("#credType").val(3);
		$("#credCode").val(member.otherNo);
	}else{
		$("#credType").val(1);
		$("#credCode").val("");
	}
	$("#proposerTel").val(member.homephone);
	$("#recipientName").val(member.name);
	$("#recipientContact").val(member.mobile);
	$("#sendPostalCode").val(member.homezipcode);
	$("#sendAddress").val(member.homeaddr);
}
function loadConsume(consume){
	$(".supplierNo").val(consume.supplier);
	//$(".supplierPoint").val(consume.supplier);
}
			