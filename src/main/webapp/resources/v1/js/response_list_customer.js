var custList = new Array();
var workOrderId;//取response页面工单号
function addCustomer(){
	parent.tab.addTab({label:"新增客户信息",url:ctx+"/response-customer/create/"+workOrderId+"/"});
}

$(function(){
	/*$(window.top.document).find("#messager").bind("click",function(event){
		alert("customer"+$(this).val());
	});*/
	workOrderId = $("#workOrderId",window.parent.document).val();
	/**
	 * 识别错误
	 */
	$("#user_type_1").click(function(){
		parent.tab.addTab({label:"识别错误",url:ctx+"/call/workOrder/"+workOrderId+"/customer/"+$('#customerId').val()+"/"});
	});
	
	/**
	 * 识别正确
	 */
	$("#user_type_2").click(function(){
		if($('#customerId').val() =='' && $('#cid').val()==''){
			Dialog.alert("请选择服务对象再确认！");
		}else if($('#customerId').val() !=''){
			var paramData = {'workOrderId':workOrderId,'customerId':$('#customerId').val(),'hasCreate':$('#hasCreate').val(),'phone':phoneNum};
			ajaxRequest(ctx+'/response-customer/correct/customer/',paramData,
			function(data){
				parent.document.getElementById("customerId").value = data.msg;
				parent.isCheckCustomer = true;
				$("#user_type_1").remove();
				$("#user_type_2").remove();
				$("#box_cust").remove();
				$("#modify").remove();
			},true,'POST');
		}else if($('#cid').val() != ''){
			var paramData = {'workOrderId':workOrderId,'cid':$('#cid').val()};
			ajaxRequest(ctx+'/response-customer/correct/member/',paramData,
			function(data){
				parent.document.getElementById("customerId").value = data.msg;
				parent.isCheckCustomer = true;
				$("#user_type_1").remove();
				$("#user_type_2").remove();
				$("#box_cust").remove();
				$("#modify").remove();
			},true,'POST');
		}
	});
	//修改客户信息
	$("#modify").click(function() {
		parent.tab.addTab({id:"修改客户信息",label:"修改客户信息",url:ctx+"/response-customer/"+$("#customerId").val()+"/edit/"});
	});
	
	var d2 = new Dialog("dialog2",{
		modal:true,
		width:350
	});
	
	$(".btn_detail").click(function(){
		d2.show();
	});
	$("#tbodyMemCard").find("tr:even").addClass("table_tr_even");
	//queryCustomer({"phoneNum":phoneNum});
	queryMembers(phoneNum);
});
var li_check = "";
function cliectLi(li){
	$(".l-selected").attr("class","");
	$(li).attr("class","l-selected");
	var tabid = $(li).attr("tabid");
	$("#table").find("li").each(  function(i){
			if (tabid==$(this).attr("tabid")){
				if(tabid == li_check){
					if($(this).is(":visible")){
						$(this).hide();
						$("#table").slideUp("slow");
					}else{
						$(this).show();
						$("#table").slideDown("slow");
					}
				}else{
					$(this).show();
					$('#table').slideDown("slow");
				}
			}else{
				$(this).hide();
			}
	});
	li_check = $(li).attr("tabid");
}
//新增或修改成功后回调方法
function reLoad(customerid){
	$("#customerId").val("");
	$("#hasCreate").val("false");
	queryCustomer({"customerId":customerid});
}

//查询客户信息
function queryCustomer(paramData){
	var url = ctx+"/response-customer/list/";
	ajaxRequest(url,paramData,
	function(data){
		custList = data;
		if(data.length==1){
			showBaseData(0);	
		}else if(data.length==0){
			$("#tbody").html("<TR><TD colspan='7'><font color='red'>没有找到满足条件的记录！</font></TD></TR>");
			$("#muti_result").show();
			$("#base_data").hide();
		}else{
			$("#tbody").empty();
			var html = new Array();
			for(var i=0; i<data.length; i++){
				var cust = data[i];
				html.push("<TR class='tr2'>"); 
				html.push("<td><input name='radio' type='radio' class='radio' title='选定该卡号' onClick='showBaseData("+i+")'></td>");
				html.push("<td>"+cust.cardCodes+"</td>");
				html.push("<td>"+cust.cardNames+"</td>");
				html.push("<td>"+cust.name+"</td>");
				html.push("<td>"+((cust.title==1)?"先生":"女士")+"</td>");
				html.push("<td>"+cust.phone+"</td>");
				html.push("<td class='le'>"+cust.credCodes+"</td>");
				html.push("</tr>");     
			}
			$("#tbody").html(html.join(""));
			$("#tbody").find("tr:even").addClass("table_tr_even");
			$("#muti_result").show();
			$("#base_data").hide();
			$("#returnCustList").html('<a style="float: right;" href="#" onclick=\'$("#base_data").hide();$("#muti_result").show();\'>返回列表</a>');
		}
	},true,'POST');
}

//显示基本资料
function showBaseData(i){
	$("#chinaName").html((isNullOrEmpty(custList[i].chFullName)?"":custList[i].chFullName+(custList[i].sex==1?"（先生）":"（女士）")));
	$("#englishName").html((isNullOrEmpty(custList[i].enFullName)?"":custList[i].enFullName+(custList[i].sex==1?"（MR）":"（MS）")));
	$("#toCall").html(custList[i].toCall);
	$("#credentialsType").html(custList[i].credNames);
	$("#credentialsCode").html(custList[i].credCodes);
	$("#workUnit").html(custList[i].workUnit);
	$("#position").html(custList[i].position);
	$("#birthDate").html(custList[i].birthDate);
	$("#phone").html(custList[i].phone);
	$("#fixedPhone").html(custList[i].fixedPhone);
	$("#address").html(custList[i].address);
	$("#customerType").html(custList[i].cardNames);
	$("#cardNumber").html(custList[i].cardCodes);
	$("#bigCustName").html(custList[i].bigCustName);
	$("#prefRemarks").html(custList[i].prefRemarks);
	$("#customerId").val(custList[i].id);
	$("#base_data").show();
	$("#muti_result").hide();
	$("#user_type_2").show();
	
	ajaxRequest(ctx+'/response-customer/other/',
	{mobile:custList[i].phone,fixedPhone:custList[i].fixedPhone,
	 cnName:custList[i].chFullName,enName:custList[i].enFullName,custPrefs:custList[i].custPref},
	function(data){
		 $("#unHandleComplaint").html(data.feedBackNum+"条");
		 $("#custPref").html(data.prefNames);
	},false);
}

//查询历史订单
function queryOrder(phoneNum,li){
	if(!parent.isCheckCustomer){Dialog.alert("请先确认服务对象");return;}
	cliectLi(li);
	if($.trim($('#orderTbody').html()) =='' || $('#orderTbody').html().indexOf("没有找到满足条件的记录") >=0){
		ajaxRequest(ctx+'/response-customer/'+phoneNum+'/orders/',null,
		function(data){
			var orders = new Array();
			for(var i=0; i<data.length;i++){
				var order = data[i];
				orders.push("<tr>");
				orders.push("<td><a href='javascript:void(0);' class='alink' onclick='onShowOrderDetail("+order.orderId+");'>"+order.orderNum +"</a></td>");
				orders.push("<td>"+order.orderTypeName +"</td>");
				orders.push("<td>"+order.orderStatus +"</td>");
				orders.push("<td>"+order.createDate +"</td>");
				orders.push("<td>"+order.creatorName +"</td>");
				orders.push("<td style='text-align: left;'>"+order.describe+"</td>");
				orders.push("</tr>");
			}
			if(orders.length == 0){
			 	$('#orderTbody').html("<tr><td colspan='6'><font color='red'>没有找到满足条件的记录！</font></td></tr>");
			}else{
				$('#orderTbody').html(orders.join(""));
			}
			$("#orderTbody").find("tr:even").addClass("table_tr_even");
		},true,'GET');
	}
}

function onShowOrderDetail(orderId){
	parent.tab.addTab({id:orderId,label:"订单详情",url:ctx+"/commonquery-order/detail/"+orderId+"/"});
}
function onShowComplain(complainId){
	parent.tab.addTab({id:complainId,label:"投诉详情",url:ctx+"/feedback/"+complainId+"/viewFeedback"});
}
//查询投诉信息
function queryComplain(phoneNum,li){
	if(!parent.isCheckCustomer){Dialog.alert("请先确认服务对象");return;}
	cliectLi(li);
	if($.trim($('#complainTbody').html())=='' || $('#complainTbody').html().indexOf("没有找到满足条件的记录") >=0 ){
		ajaxRequest(ctx+'/response-customer/'+phoneNum+'/complain/',{workOrderId:workOrderId},
		function(json){
			var html = new Array();
			for(var i=0;i<json.length;i++){
				var feedBack = json[i];
				html.push('<tr><td>'+feedBack.travelName+'</td><td>'+feedBack.contactPhone+'</td>');
				html.push('<td>'+feedBack.feedbackBusinessType.businessTypeName+'</td><td>'+feedBack.statusView+'</td>');
				html.push('<td>'+feedBack.requirement+'</td>');
				html.push('<td><a href="javascript:void(0);" class="detail" onclick="onShowComplain('+feedBack.id+')">详情</a></td></tr>');
			}
			if(html.length == 0){
				$('#complainTbody').html("<tr><td colspan='6'><font color='red'>没有找到满足条件的记录！</font></td></tr>");
			}else{
				$('#complainTbody').html(html.join(""));
			}
			$("#complainTbody").find("tr:even").addClass("table_tr_even");
		},true,'GET');
	}
}

//查询历史短信
function queryShortMessage(phoneNum,cid,li){
	if(!parent.isCheckCustomer){Dialog.alert("请先确认服务对象");return;}
	cliectLi(li);
	if($.trim($('#shortMessageTbody').html()) == '' || $('#shortMessageTbody').html().indexOf("没有找到满足条件的记录") >=0){
		ajaxRequest(ctx+'/response-customer/'+phoneNum+'/message/',{'cid':cid},
		function(json){
			var html = new Array();
			if(json.cct && json.cct.result){
				for(var i=0;i<json.cct.result.length;i++){
					var message = json.cct.result[i];
					html.push('<tr><td>'+message.phone+'</td><td>'+message.sendDate+'</td>'+
								'<td>呼叫中心</td><td>'+message.typeName+'</td><td style="text-align: left;">'+message.content+'</td></tr>');
				}
			}
			if(json.uic && json.uic.result){
				for(var i=0;i<json.uic.result.length;i++){
					var message = json.uic.result[i];
					html.push('<tr><td>'+message.phone+'</td><td>'+message.sendDate+'</td>'+
								'<td>常旅客系统</td><td>会员服务</td><td style="text-align: left;">'+message.content+'</td></tr>');
				}
			}
			if(html.length == 0){
				$('#shortMessageTbody').html("<tr><td colspan='5'><font color='red'>没有找到满足条件的记录！</font></td></tr>");
			}else{
				$('#shortMessageTbody').html(html.join(""));
			}
			$("#shortMessageTbody").find("tr:even").addClass("table_tr_even");
		},true,'GET');
	}
}

//查询历史客票
function queryTicket(phoneNum,li){
	if(!parent.isCheckCustomer){Dialog.alert("请先确认服务对象");return;}
	cliectLi(li);
	if($.trim($('#ticketTbody').html()) == ''|| $('#ticketTbody').html().indexOf("没有找到满足条件的记录") >=0){
		ajaxRequest(ctx+'/response-customer/'+phoneNum+'/ticket/',{workOrderId:workOrderId},
		function(json){
			var html = new Array();
			for(var i=0;i<json.length;i++){
				var ticket = json[i];
				html.push('<tr><td>'+ticket.ticketNo+'</td>');
				html.push('<td>'+ticket.status+'</td>');
				html.push('<td>'+ticket.travellerName+'</td>');
				html.push('<td>'+ticket.segmentInfo+'</td>');
				html.push('<td>'+ticket.depDateTime+'</td>');
				html.push("<td>"+ticket.arrDateTime+"</td>");
				html.push("<td>"+((ticket.hasMeal==true)?"是":"否")+"</td>");
				html.push("<td>"+((ticket.hasStop==true)?"是":"否")+"</td>");
				html.push("</tr>");
			}
			if(html.length == 0){
				html.push("<tr><td colspan='8'><font color='red'>没有找到满足条件的记录！</font></td></tr>");
			}
			$('#ticketTbody').html(html.join(""));
			$("#ticketTbody").find("tr:even").addClass("table_tr_even");
		},true,'GET');
	}
}

//查询UIC沟通记录
function queryCommunicate(cid,li){
	if(cid ==''){Dialog.alert("请先确认会员信息");return;}
	cliectLi(li);
	if($.trim($('#communicateTbody').html())== ''|| $('#communicateTbody').html().indexOf("没有找到满足条件的记录") >=0){
		ajaxRequest(ctx+'/response-customer/'+cid+'/communicate/',{},
		function(json){
			var html = new Array();
			if(json.detail){
				for(var i=0;i<json.detail.length;i++){
					var data = json.detail[i];
					html.push('<tr><td>'+ data.date +'</td>');
					html.push('<td>'+ data.type +'</td>');
					html.push('<td>'+ data.content +'</td>');
					html.push('<td>'+ data.src +'</td></tr>');
				}
			}
			if(html.length == 0){
				html.push("<tr><td colspan='4'><font color='red'>没有找到满足条件的记录！</font></td></tr>");
			}
			$('#communicateTbody').html(html.join(""));
			$("#communicateTbody").find("tr:even").addClass("table_tr_even");
		},true,'GET');
	}
}

//查询待审核里程明细
function queryCheckDitail(cid,li){
	if(cid == ''){Dialog.alert("请先确认会员信息");return;}
	cliectLi(li);
	if($.trim($('#checkDitailTbody').html()) == ''|| $('#checkDitailTbody').html().indexOf("没有找到满足条件的记录") >=0){
		ajaxRequest(ctx+'/response-customer/'+cid+'/checkDitail/',{},
		function(json){
			var html = new Array();
			if(json.points){
				for(var i=0;i<json.points.length;i++){
					var data = json.points[i];
					if(data.status = 'P'){
						html.push('<tr><td>'+ data.seq +'</td>');
				        html.push('<td>'+ data.date +'</td>');
				        html.push('<td>'+ data.confirmdate +'</td>');
				        html.push('<td>'+ data.up +'</td>');
				        html.push('<td>'+ data.cp +'</td>');
				        html.push('<td>'+ data.type +'</td>');
				        html.push('<td>'+ data.remark +'</td>');
				        html.push('<td>'+ data.status +'</td></tr>');
					}
				}
			}
			if(html.length==0){
				html.push("<tr><td colspan='8'><font color='red'>没有找到满足条件的记录！</font></td></tr>");
			}
			$('#checkDitailTbody').html(html.join(""));
			$("#checkDitailTbody").find("tr:even").addClass("table_tr_even");
		},true,'GET');
	}
}

//查询会员卡信息
function queryMembers(phoneNum){
	ajaxRequest(ctx+'/response-customer/'+ phoneNum +'/members/',{},
	function(data){
		if(data && data.overviews){
			if(data.overviews.length==1){
				$("#uic_list").hide();
				showMember(data.overviews[0].cid);
				$("#btnReturnMembers").hide();
			}else if(data.overviews.length==0){
				$("#tbodyMemCard").html("<TR><TD colspan='7'><font color='red'>没有找到满足条件的记录！</font></TD></TR>");
				$("#uic_list").show();
				$("#uic_info").hide();
			}else{
				var html = null;
				for(var i=0; i<data.overviews.length; i++){
					var overview = data.overviews[i];
					html = html + "<TR class='tr2'>" + 
					       "<td height='24'><input name='radio1' type='radio' class='radio' title='选定该卡号' onclick='showMember(\""+overview.cid+"\")'/></td>" +
                           "<td>"+ overview.cid +"</td>" +
                           "<td>"+overview.cnName+"</td>" +
                           "<td style='color:red'>"+overview.level+"</td>" +
                           "<td>"+overview.avaliableMileages+"</td>" +
                           "<td>"+overview.accoutStatus+"</td>" +
                           "<td>"+overview.benefitWay+"</td>" +
                           "</tr>";     
				}
				$("#tbodyMemCard").html(html);
				$("#tbodyMemCard").find("tr:even").addClass("table_tr_even");
				$("#uic_list").show();
				$("#uic_info").hide();
			}
		}	
	},true,'GET');
}

function showMember(cid){
	if(''==cid){return;}
	$("#cid").val(cid);
	parent.document.getElementById("cid").value = cid;
	$('#communicateTbody').html("");
	$('#checkDitailTbody').html("");
	ajaxRequest(ctx+'/response-customer/'+ cid +'/member/',{workOrderId:workOrderId},function(data){
		var member = data.member.member;
		var favoreeStr = '';
		var favoreeHtml = '';
		$("#uic_cardNumber").html(member.cid);
		$("#memberType").html(member.gradeName);
		$("#endDate").html(member.enddate);
		if(member.isinitpass =='1'){
			$("#pwdState").html("未激活");
		}else{
			$("#pwdState").html("已激活");
		}
		//$("#accountType").html(member.accountType);
		$("#accountState").html(member.activeflag);
		$("#benefit").html(member.benflag);
		$("#otherCard").html(member.otherCardName);
		$("#availableMileage").html(member.points);
		$("#checkMileage").html(member.ppoints);
		//$("#mileageEndDate").html(member.expiredate);
		$("#availableNum").html(data.rewardNum);
		$("#warnInfo").html(data.warn);
		if(data.benef.benefs){
			for(var j=0;j< data.benef.benefs.length;j++){
				var benef = data.benef.benefs[j];
				favoreeStr = favoreeStr + benef.cnName + "\\";	
				favoreeHtml +='<tr><td>'+ benef.cnName+'</td><td>'+benef.status+'</td><td>'+benef.createTime+'</td></tr>';
			}
			favoreeStr = favoreeStr.substr(0, favoreeStr.length-1);
		}
		
		$("#favoree").html(favoreeStr);
		$("#tbodyFavoree").html(favoreeHtml);
		$('#uic_list').hide();
		$("#uic_info").slideToggle("slow");
		$(this).toggleClass("active");
		
		/**
		 * 没有识别到客户
		if(baseData.length==0){
			$("#chinaName").html(member.firstname);
			$("#englishName").html(member.lastname);
			$("#toCall").html(member.title);
			$("#credentialsType").html("身份证");
			$("#credentialsCode").html(member.idcardNo);
			$("#workUnit").html(member.workname);
			$("#position").html(member.workpost);
			$("#birthDate").html(member.birthday);
			$("#phone").html(member.mobile);
			$("#fixedPhone").html(member.homephone);
			$("#address").html(member.addr);
			$("#base_data").show();	
			$("#modify").hide();
		}*/
	},true,'GET');
}

/**
 * 查客户信息
 */
function queryClick(){
	var data = {"type":$("#cus_type").val(),"number":$("#cus_number").val(),"name":$("#cus_name").val()};
	queryCustomer(data);
	$("#hasCreate").val("true");
}