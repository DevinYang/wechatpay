var ADULT = 0;
var CHILD = 1;
var INFANT = 2;

var passengerAll = new Map();//所有旅客

var adultPassengers = new Map();//携带人
var childPassengers = new Map();
var infantPassengers = new Map();

function addForm(){
	var type = $('input:radio[name="typeRadio"]:checked').val();
	var seq = "form_";
	var url =basePath+"/free-traveller/"+uicMember.cid+"/"+uicMember.name.replace("/","@")+"/"+uicMember.birthday+"/getReduceNo";
	var params = {};
	if(checkTraveller(type)){
		if(type == ADULT){
			seq += adultNext++;
			params.seq = seq;
			loadAdultForm(seq,false);
			reorder();
			appendTraveller(type,url,params);
		}
		if(type == CHILD){
			seq += childNext++;
			params.seq = seq;
			loadChildForm(seq,false);
			reorder();
			appendTraveller(type,url,params);
		}
		if(type == INFANT){
			seq += infantNext++;
			params.seq = seq;
			loadInfantForm(seq,false);
			reorder();
			appendTraveller(type,url,params);
		}
	}
}

//添加旅客信息
function addTraveller(){
	var benflag = uicMember.benflag;
	
	var self = this;
	var seq = $(this).attr("seq");
	var cid = $(this).attr("cid");
	var chname = $(this).attr("chname");
	var birthday = $(this).attr("birthday");
	var idcardNo = $(this).attr("idcard");
	var passpordNo = $(this).attr("passpord");
	var otherNo = $(this).attr("otherNo");
	var travellerType = $(this).attr("travellerType");
	
	var params = {
			seq:seq,
			cid:cid,
			chname:chname,
			birthday:birthday,
			idcardNo:idcardNo,
			passpordNo:passpordNo,
			otherNo:otherNo,
			travellerType:travellerType
		 };
	 if(self.checked == true){
		 	if(!idcardNo && !birthday){
		 		Dialog.alert("出生日期和身份证信息都为空，不允许添加！");
				return false;
		 	}
		 	if(idcardNo && birthday){
		 		var cardBirthday = idcardNo.substring(6,14);
		 		var newBirthday = birthday.replaceAll("-","");
		 		if(newBirthday != cardBirthday){
		 			Dialog.alert("出生日期和身份证信息不一致！");
					return false;
		 		}
		 	}
		 	
		 	//免票预定，有身份证则传递身份证号，否则传递出生年月日
		 	var url;
		 	if(idcardNo){
		 		 url =basePath+"/free-traveller/"+memberCid+"/"+chname.replace("/","@")+"/"+idcardNo+"/getReduceNo";
		 	}else if(!idcardNo&&birthday){
		 		 url =basePath+"/free-traveller/"+memberCid+"/"+chname.replace("/","@")+"/"+birthday+"/getReduceNo";
		 	}
		 	//旅客检测（是否可以添加）
		 	if(checkTraveller(travellerType)){
		 		if(travellerType == ADULT){//成人
		 			//添加表单
					if(benflag == "A"){//受益方式为A则可以具有新增旅客和编辑旅客信息的能力
						loadAdultForm(seq,false);
					}else{
						loadAdultForm(seq,true);
					}
					reorder();
					appendTraveller(ADULT,url,params);	//后台：申请免票预订单
					reloadParent();
				}
				if(travellerType == CHILD){//儿童
					
					if(benflag == "A"){
						loadChildForm(seq,false);
					}else{
						loadChildForm(seq,true);
					}
					reorder();
					appendTraveller(CHILD,url,params);
					reloadParent();
				}
				if(travellerType == INFANT){//婴儿
					if(benflag == "A"){
						loadInfantForm(seq,false);
					}else{
						loadInfantForm(seq,true);
					}
					reorder();
					appendTraveller(INFANT,url,params);
				}
		 	}else{
		 		$(self).attr("checked",false);
		 	}
	 }else{
		 cancelTraveller(travellerType,seq);
		 reorder();
		 if(travellerType == ADULT){
			 reloadParent();
		 }
	 }
}


function appendTraveller(type,url,params){
	if(!isCall){
		var freeOrder = $("#form").serialize();
		//免票预定单
		$.post(url,freeOrder,function(result){
			if(result.error){
				Dialog.alert(result.error);
				return false;
			}else{
				reduceMileage = Number(result.reduceMileage);	//扣减旅程
				reduceNo = result.reduceNo;						//扣减号（扣减预订单）
					
				var realreduce = dealRealreduce(reduceMileage);
				var ticketPrice = 0;
				if(reduceMileage != realreduce){
					ticketPrice = dealTicketpricve(Number(availableMileage)-reduceMileage);
				}
				availableMileage = Number(availableMileage)-reduceMileage>0 ? Number(availableMileage)-reduceMileage:0;
				
				params.reduceMileage=reduceMileage;
				params.realreduce=realreduce;
				params.ticketPrice=ticketPrice;
				params.reduceNo=reduceNo;
				if(type == ADULT){
					adultPassengers.put("adult_"+params.seq,params);
					appendAdult(params);		//旅客信息自动填入
					appendReduce(ADULT,params); //扣减信息自动填入
				}
				if(type == CHILD){
					childPassengers.put("child_"+params.seq,params);
					appendChild(params);
					appendReduce(CHILD,params);
				}
				
				isCall = true;
			}
		});
	}else{
		var realreduce = dealRealreduce(reduceMileage);
		var ticketPrice = 0;
		if(reduceMileage != realreduce){
			ticketPrice = dealTicketpricve(Number(availableMileage)-reduceMileage);
		}
		availableMileage = Number(availableMileage)-reduceMileage>0 ? Number(availableMileage)-reduceMileage:0;
		
		params.reduceMileage=reduceMileage;
		params.realreduce=realreduce;
		params.ticketPrice=ticketPrice;
		params.reduceNo=reduceNo;
	}
	
	if(type == ADULT){
		adultPassengers.put("adult_"+params.seq,params);
		appendAdult(params);
		appendReduce(ADULT,params);
	}
	if(type == CHILD){
		childPassengers.put("child_"+params.seq,params);
		appendChild(params);
		appendReduce(CHILD,params);
	}
	if(type == INFANT){
		infantPassengers.put("infant_"+params.seq,params);
		appendInfant(params);
		appendReduce(INFANT,params);
	}
}


function cancelTraveller(type,seq){
	if(type == ADULT){
		 var oparams = adultPassengers.get("adult_"+seq);
		 adultPassengers.remove("adult_"+seq);
		 $("#adultTypeDiv_"+seq).parent().remove();
		 availableMileage = availableMileage+oparams.realreduce;
	}
	if(type == CHILD){
		 var oparams = childPassengers.get("child_"+seq);
		 childPassengers.remove("child_"+seq);
		 $("#childTypeDiv_"+seq).parent().remove();
		 availableMileage = availableMileage+oparams.realreduce;
	}
	if(type == INFANT){
		
		 var oparams = infantPassengers.get("infant_"+seq);
		 infantPassengers.remove("infant_"+seq);
		 $("#infantTypeDiv_"+seq).parent().remove();
		 availableMileage = availableMileage+oparams.realreduce;
	}
}

function cancel(self){
	var type = $(self).attr("travellerType");
	var seq = $(self).attr("seq");
	var idName = "";
	if(type == ADULT){
		idName = "adult";
	}
	if(type == CHILD){
		idName = "child";
	}
	if(type == INFANT){
		idName = "infant";
	}
	if($("#"+idName+"_"+seq).length > 0){
		$("#"+idName+"_"+seq).attr("checked",false);
		$("#"+idName+"_"+seq).parent().parent().removeClass("clickclass");
	}
	cancelTraveller(type,seq)
	reorder();
	if(type == ADULT){
		reloadParent();
	}
}

function reorder(){
	
	$(".travellerClass").each(function(i){
		var div = this;
		var travellerSeq = i+1;
		$(div).find(".sequence").text(travellerSeq);
		$(div).find("[name^=salesTravellerDto]").each(function(){
			var oname = $(this).attr("name");
			var oseq = oname.substring(18,19);
			var newName = oname.replace(oseq,i);
			$(this).attr("name",newName);
		});
	});
}

function reloadParent(){
	var parentNames = new Map();
	$(".travellerClass").each(function(){
		var type = $(this).attr("travellerType");
		var seq = $(this).attr("seq");
		var name = "";
		if(type == ADULT){
			name = $("#adultName_"+seq).val().trim();
			if(name.trim() != ""){
				parentNames.put("adult_"+seq,name);
			}
		}
	});
	
	$(".travellerClass").each(function(i){
		var type = $(this).attr("travellerType");
		var seq = $(this).attr("seq");
		
		if(type == INFANT){
			var oparent = $("#parent_"+seq).val();
			$("#parent_"+seq).empty();
			$("#parent_"+seq).append("<option value=\"-1\" parentId=\"-1\" >请选择</option>");
			var flag = false;
			var keyArr = parentNames.arr;
			for(var j=0;j<keyArr.length;j++){
				 var chname = parentNames.get(keyArr[j].key);
				 if(oparent == chname){flag = true;}
				 $("#parent_"+seq).append("<option value=\""+chname+"\"  parentId=\""+keyArr[j].key+"\" >"+chname+"</option>");
			}
			if(flag){
				$("#parent_"+seq).val(oparent);
			}
		}
	});
}

function replaceParents(self){
	var parentSeq = "adult_"+$(self).attr("seq");
	var name = $(self).val();
	var flag = true;
	$(".travellerClass").each(function(){
		var type = $(this).attr("travellerType");
		var seq = $(this).attr("seq");
		if(type == INFANT){
			$("#parent_"+seq).find("option").each(function(){
				if(parentSeq == $(this).attr("parentId")){
					if(name.trim() == ""){
						flag = false;
						$(this).remove();
					}else{
						flag = false;
						$(this).text(name);
						$(this).attr("value",name);
					}
				}
			});
		}
	});
	if(flag && name.trim() != ""){
		$(".travellerClass").each(function(){
			var type = $(this).attr("travellerType");
			var seq = $(this).attr("seq");
			if(type == INFANT){
				$("#parent_"+seq).append("<option value=\""+name+"\" parentId=\""+parentSeq+"\" >"+name+"</option>");
			}
		});
	}
}

//旅客检测
function checkTraveller(type){
	if(type == ADULT){
		if(adultCount == 0){
			Dialog.alert("可选成人人数为0，不允许添加！");
			return false;
		}else if(adultPassengers.size() == adultCount){
			
			Dialog.alert("可选成人人数已满，请先删除其他成人旅客再次添加！");
			return false;
		}else{
			return true;
		}
	}
	if(type == CHILD){
		if(childCount == 0){
			Dialog.alert("可选儿童人数为0，不允许添加！");
			return false;
		}else if(childPassengers.size() == childCount){
			Dialog.alert("可选儿童人数已满，请先删除其他儿童旅客再次添加！");
			return false;
		}else{
			return true;
		}
	}
	if(type == INFANT){
		if(infantsCount == 0){
			Dialog.alert("可选婴儿人数为0，不允许添加！");
			return false;
		}else if(adultPassengers.size() <= infantPassengers.size()){
			Dialog.alert("携带人不能少于可选婴儿人数！请先选择成人旅客！");
			return false;
		}else if(infantPassengers.size() == infantsCount){
			Dialog.alert("可选婴儿人数已满，请先删除其他婴儿旅客再次添加！");
			return false;
		}else{
			return true;
		}
	}
}





function appendAdult(params){
	var cardTypeOption = "";
	var cardTypeValue = "";
	if(params.idcardNo){
		cardTypeOption += "<option value=\"1\" selected=selected >身份证</option>"
		cardTypeValue = params.idcardNo;
		$("#adultIdcardNo_"+params.seq).val(params.idcardNo);
	}
	if(params.passpordNo){
		var isSelected = "";
		if(cardTypeValue == ""){
			cardTypeValue = params.passportNo;
			isSelected = "selected=selected";
		}
		cardTypeOption += "<option value=\"2\" "+isSelected+" >护照</option>";
		$("#adultPasspordNo_"+params.seq).val(params.passpordNo);
	}
	if(params.otherNo){
		var isSelected = "";
		if(cardTypeValue == ""){
			cardTypeValue = params.otherNo;
			isSelected = "selected=selected";
		}
		cardTypeOption += "<option value=\"3\" "+isSelected+" >其他</option>";
		$("#adultOtherNo_"+params.seq).val(params.otherNo);
		
	}
	
//	$("#adultName_"+params.seq).val(params.chname);
	$("#adultName_"+params.seq).attr("value",params.chname)
	if(cardTypeValue != ""){
		$("#adultCardType_"+params.seq).empty();
		$("#adultCardType_"+params.seq).append(cardTypeOption);
		$("#adultCard_"+params.seq).val(cardTypeValue);
	}
	
	$("#adultBirthday_"+params.seq).val(params.birthday);
	
	if(params.cid && params.cid != ""){
		$("#cardType_"+params.seq).val(1);
		$("#adultCid_"+params.seq).val(params.cid);
	}
	
	$("#adultReduce_"+params.seq).val(params.reduceMileage);
	$("#adultRealReduce_"+params.seq).val(params.realreduce);
	$("#adultDifferences_"+params.seq).val(params.ticketPrice);
	$("#adultReduceNo_"+params.seq).val(params.reduceNo);

}

function appendChild(params){
	
	var cardTypeOption = "";
	var cardTypeValue = "";
	if(params.idcardNo){
		cardTypeOption += "<option value=\"1\" selected=selected >身份证</option>"
		cardTypeValue = params.idcardNo;
		$("#childIdcardNo_"+params.seq).val(params.idcardNo);
	}
	if(params.passpordNo){
		var isSelected = "";
		if(cardTypeValue == ""){
			cardTypeValue = params.passportNo;
			isSelected = "selected=selected";
		}
		cardTypeOption += "<option value=\"2\" "+isSelected+" >护照</option>";
		$("#childPasspordNo_"+params.seq).val(params.passpordNo);
	}
	if(params.otherNo){
		var isSelected = "";
		if(cardTypeValue == ""){
			cardTypeValue = params.otherNo;
			isSelected = "selected=selected";
		}
		cardTypeOption += "<option value=\"3\" "+isSelected+" >其他</option>";
		$("#childOtherNo_"+params.seq).val(params.otherNo);
	}
	
	if(cid != ""){
		$("#childCid_"+params.seq).val(cid);
	}
	
	$("#childName_"+params.seq).val(params.chname);
	if(cardTypeValue != ""){
		$("#childCardType_"+params.seq).empty();
		$("#childCardType_"+params.seq).append(cardTypeOption);
		$("#childCard_"+params.seq).val(cardTypeValue);
	}
	$("#childBirthday_"+params.seq).val(params.birthday);
	
	$("#childReduce_"+params.seq).val(params.reduceMileage);
	$("#childRealReduce_"+params.seq).val(params.realreduce);
	$("#childDifferences_"+params.seq).val(params.ticketPrice);
	$("#childReduceNo_"+params.seq).val(params.reduceNo);
	
}
function appendInfant(params){
	$("#infantName_"+params.seq).val(params.chname);
	$("#infantBirthday_"+params.seq).val(params.birthday);
//	var keyArr = adultPassengers.arr;
//	for(var i=0;i<keyArr.length;i++){
//		var passenger = adultPassengers.get(keyArr[i].key);
//		if(passenger.chname){
//			$("#parent_"+params.seq).append("<option value=\""+passenger.chname+"\" parentId=\""+keyArr[i].key+"\" >"+passenger.chname+"</option>")
//		}
//	}
	$(".parentClass").each(function(){
		var pSeq = $(this).attr("seq");
		var chname = $("#adultName_"+pSeq).val();
		if(chname){
			$("#parent_"+params.seq).append("<option value=\""+chname+"\" parentId=\"adult_"+pSeq+"\" >"+chname+"</option>")
		}
		
	});
	
	if(cid != ""){
		$("#infantCid_"+params.seq).val(cid);
	}
	
	$("#infantReduce_"+params.seq).val(params.reduceMileage);
	$("#infantRealReduce_"+params.seq).val(params.realreduce);
	$("#infantDifferences_"+params.seq).val(params.ticketPrice);
	$("#infantReduceNo_"+params.seq).val(params.reduceNo);
}


function changeCredCode(self){
	var type = $(self).attr("ttype");
	var seq = $(self).attr("seq");
	if(type == ADULT){
		var val = $(self).val();
		var ncode = "";
		if(val == 1){//身份证
			ncode = $("#adultIdcardNo_"+seq).val();
		}
		if(val == 2){//护照
			ncode = $("#adultPasspordNo_"+seq).val();
		}
		if(val == 3){//其他
			ncode = $("#adultOtherNo_"+seq).val();
		}
		if(ncode != ""){
			$("#adultCard_"+seq).val(ncode);
		}
	}
	if(type == CHILD){
		var val = $(self).val();
		var ncode = "";
		if(val == 1){
			ncode = $("#childIdcardNo_"+seq).val();
		}
		if(val == 2){
			ncode = $("#childPasspordNo_"+seq).val();
		}
		if(val == 3){
			ncode = $("#childOtherNo_"+seq).val();
		}
		if(ncode != ""){
			$("#childCard_"+seq).val(ncode);
		}
	}
}

function loadAdultForm(adultIndex,readOnlay){
	var isReadOnlay = "";
	if(readOnlay){
		isReadOnlay = "readonly=\"readonly\"";
	}
	$("#travelleries").append(
				 "<div class=\"travellerClass\" seq=\""+adultIndex+"\" travellerType=\""+ADULT+"\" >"
				+"<div id=\"adultTypeDiv_"+adultIndex+"\" class=\"tit3-green adultClass\"  >"
				+"<span><label class=\"sequence\" >seq</label>、旅客类型：</span>"
				+"<input type=\"hidden\" name=\"salesTravellerDto[0].reduceMileage\" id=\"adultReduce_"+adultIndex+"\" value=\"0\" />"
				+"<input type=\"hidden\" name=\"salesTravellerDto[0].realreduce\" id=\"adultRealReduce_"+adultIndex+"\" value=\"0\" />"
				+"<input type=\"hidden\" name=\"salesTravellerDto[0].ticketPrice\" id=\"adultDifferences_"+adultIndex+"\" value=\"0\"  />"
				+"<input type=\"hidden\" name=\"salesTravellerDto[0].reduceNo\" id=\"adultReduceNo_"+adultIndex+"\" value=\"\" />"
				+"<input type=\"hidden\" id=\"adultIdcardNo_"+adultIndex+"\"  />"
				+"<input type=\"hidden\" id=\"adultPasspordNo_"+adultIndex+"\"  />"
				+"<input type=\"hidden\" id=\"adultOtherNo_"+adultIndex+"\"  />"
				+"<div class=\"label1-st\">"
				+"<label style=\"width:51px\"  class=\"hover\" ><input type=\"radio\" name=\"salesTravellerDto[0].travellerType\"  id=\"radio\" value=\"0\" checked=\"checked\" />&nbsp;成人</label>"
				+"<label style=\"width:300px\" ><div id=\"adultReduceTip_"+adultIndex+"\" style=\"text-align:left; font-weight:bold; color:#F00;display:none\" ></div></label>"
				+"</div>"
				+"<div class=\"fr\">"
				+"<a travellerType=\"0\" onclick=\"cancel(this)\" seq=\""+adultIndex+"\" class=\"Btn-cl \"><strong>删除旅客</strong></a>"
				+"</div>"
				+"</div>"
				+"<div class=\"tab7-st parentClass\"  seq=\""+adultIndex+"\" >"
				+"<table border=\"0\" cellspacing=\"0\" cellpadding=\"0\">"
				+"<tr>"
				+"<td width=\"110\" class=\"tab-bg-gr ri\">旅客姓名：</td>"
				+"<td class=\"le\">"
				+"<input name=\"salesTravellerDto[0].cnFullName\" onBlur=\"replaceParents(this)\" seq=\""+adultIndex+"\"   id=\"adultName_"+adultIndex+"\" "+isReadOnlay+" validate=\"{required:true,linkname:true}\"  />&nbsp;<span class=\"FRed\">*</span>"
				+"</td>"
				+"<td width=\"110\" class=\"tab-bg-gr ri\">证件类型：</td>"
				+"<td class=\"le\">" 
				+"<select name=\"salesTravellerDto[0].credType\" id=\"adultCardType_"+adultIndex+"\" ttype=\""+ADULT+"\" seq=\""+adultIndex+"\" onchange=\"changeCredCode(this)\" validate=\"{required:true}\" >"
				+"<option value=\"-1\">请选择</option>"
				+"<option value=\"1\">身份证</option>"
				+"<option value=\"2\">护照</option>"
				+"<option value=\"3\">其他</option>"
				+"</select>&nbsp;&nbsp;<span class=\"FRed\">*</span>"
				+"</td>"
				+"<td width=\"110\" class=\"tab-bg-gr ri\">证件号：</td>"
				+"<td class=\"le\"><input name=\"salesTravellerDto[0].credCode\" id=\"adultCard_"+adultIndex+"\" "+isReadOnlay+" validate=\"{required:true}\" />&nbsp;<span class=\"FRed\">*</span>&nbsp;&nbsp;&nbsp;</td>"
				+"</tr>"
				+"<tr>"
				+"<td class=\"tab-bg-gr ri\">出生日期：</td>"
				+"<td class=\"le\"><input class=\"datepicker\" name=\"salesTravellerDto[0].birthDate\" id=\"adultBirthday_"+adultIndex+"\" "+isReadOnlay+" validate=\"{required:true}\" />&nbsp;<span class=\"FRed\">*</span></td>"
				+"<td class=\"tab-bg-gr ri\">会员类别：</td>"
				+"<td class=\"le\">"
				+"<select name=\"salesTravellerDto[0].memberCardType\" id=\"cardType_"+adultIndex+"\" >"
				+"<option value=\"-1\" >请选择</option>"
				+"<option value=\"1\" >金鹏卡</option>"
				+"</select>"
				+"</td>"
				+"</tr>"
				+"<tr>"
				+"<td class=\"tab-bg-gr ri\">会员卡号：</td>"
				+"<td colspan=\"3\" class=\"le\"><input name=\"salesTravellerDto[0].memberCardCode\" id=\"adultCid_"+adultIndex+"\" "+isReadOnlay+" validate=\"{goldenCard:true}\" />&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</td>"
				+"</tr>"
				+"</table>"
				+"</div>"
				+"</div>"
			);
	if(readOnlay){
		$('[id^=adultBirthday_]').attr("class","");
	}
}

function loadChildForm(childIndex,readOnlay){
	var isReadOnlay = "";
	if(readOnlay){
		isReadOnlay = "readonly=\"readonly\"";
	}
	$("#travelleries").append(
			 "<div class=\"travellerClass\" seq=\""+childIndex+"\" travellerType=\""+CHILD+"\" >"
			+"<div id=\"childTypeDiv_"+childIndex+"\" class=\"tit3-green childClass\">"
			+"<span><label class=\"sequence\" >seq</label>、旅客类型：</span>"
			+"<input type=\"hidden\" name=\"salesTravellerDto[0].reduceMileage\" id=\"childReduce_"+childIndex+"\" value=\"0\" />"
			+"<input type=\"hidden\" name=\"salesTravellerDto[0].realreduce\" id=\"childRealReduce_"+childIndex+"\" value=\"0\" />"
			+"<input type=\"hidden\" name=\"salesTravellerDto[0].ticketPrice\" id=\"childDifferences_"+childIndex+"\" value=\"0\" />"
			+"<input type=\"hidden\" name=\"salesTravellerDto[0].reduceNo\" id=\"childReduceNo_"+childIndex+"\"  />"
			+"<input type=\"hidden\" id=\"childIdcardNo_"+childIndex+"\"  />"
			+"<input type=\"hidden\" id=\"childPasspordNo_"+childIndex+"\"  />"
			+"<input type=\"hidden\" id=\"childOtherNo_"+childIndex+"\"  />"
			+"<input type=\"hidden\" name=\"salesTravellerDto[0].memberCardCode\" id=\"childCid_"+childIndex+"\"/>"
			+"<div class=\"label1-st\">"
			+"<label style=\"width:51px\" class=\"hover\"  ><input type=\"radio\" name=\"salesTravellerDto[0].travellerType\" id=\"radio\" value=\"1\" checked=\"checked\" />&nbsp;儿童</label>"
			+"<label style=\"width:300px\" ><div id=\"childReduceTip_"+childIndex+"\" style=\"text-align:left; font-weight:bold; color:#F00;display:none\" ></div></label>"
			+"</div>"
			+"<div class=\"fr\">"
			+"<a travellerType=\"1\" seq=\""+childIndex+"\" onclick=\"cancel(this)\" class=\"Btn-cl\"><strong>删除旅客</strong></a>"
			+"</div>"
			+"</div>"
			+"<div class=\"tab7-st\" id=\"con_pop_2\">"
			+"<table border=\"0\" cellspacing=\"0\" cellpadding=\"0\">"
			+"<tr>"
			+"<td width=\"110\" class=\"tab-bg-gr ri\">旅客姓名：</td>"
			+"<td class=\"le\">"
			+"<input name=\"salesTravellerDto[0].cnFullName\" id=\"childName_"+childIndex+"\" "+isReadOnlay+" validate=\"{required:true,linkname:true}\" />&nbsp;<span class=\"FRed\">*</span>"
			+"</td>"
			+"<td width=\"110\" class=\"tab-bg-gr ri\">证件类型：</td>"
			+"<td class=\"le\">" 
			+"<select name=\"salesTravellerDto[0].credType\" id=\"childCardType_"+childIndex+"\" ttype=\""+CHILD+"\" seq=\""+childIndex+"\" onchange=\"changeCredCode(this)\" >"
			+"<option value=\"-1\">请选择</option>"
			+"<option value=\"1\">身份证</option>"
			+"<option value=\"2\">护照</option>"
			+"<option value=\"3\">其他</option>"
			+"</select>&nbsp;&nbsp;"
			+"</td>"
			+"<td width=\"110\" class=\"tab-bg-gr ri\">证件号：</td>"
			+"<td class=\"le\"><input name=\"salesTravellerDto[0].credCode\" id=\"childCard_"+childIndex+"\" "+isReadOnlay+"  />&nbsp;&nbsp;&nbsp;&nbsp;</td>"
			+"</tr>"
			+"<tr>"
			+"<td class=\"tab-bg-gr ri\">出生日期：</td>"
			+"<td colspan=\"5\" class=\"le\"><input class=\"datepicker\" name=\"salesTravellerDto[0].birthDate\" id=\"childBirthday_"+childIndex+"\" "+isReadOnlay+" validate=\"{required:true}\" />&nbsp;<span class=\"FRed\">*</span></td>"
			+"</tr>"
			+"</table>"
			+"</div>"
			+"</div>"
		);
	
	if(readOnlay){
		$('[id^=childBirthday_]').attr("class","");
	}
	
}


/**
 * 婴儿信息表单
 * @param infantIndex 当前婴儿索引
 * @param readOnlay
 */
function loadInfantForm(infantIndex,readOnlay){
	var isReadOnlay = "";
	if(readOnlay){
		isReadOnlay = "readonly=\"readonly\"";
	}
	$("#travelleries").append(
			 "<div class=\"travellerClass\" seq=\""+infantIndex+"\" travellerType=\""+INFANT+"\" >"
			+"<div id=\"infantTypeDiv_"+infantIndex+"\" class=\"tit3-green infantsClass\">"
			+"<span><label class=\"sequence\" >seq</label>、旅客类型：</span>"
			+"<input type=\"hidden\" name=\"salesTravellerDto[0].reduceMileage\" id=\"infantReduce_"+infantIndex+"\" value=\"0\"  />"
			+"<input type=\"hidden\" name=\"salesTravellerDto[0].realreduce\" id=\"infantRealReduce_"+infantIndex+"\" value=\"0\"  />"
			+"<input type=\"hidden\" name=\"salesTravellerDto[0].ticketPrice\" id=\"infantDifferences_"+infantIndex+"\" value=\"0\"  />"
			+"<input type=\"hidden\" name=\"salesTravellerDto[0].reduceNo\" id=\"infantReduceNo_"+infantIndex+"\"  />"
			+"<input type=\"hidden\" name=\"salesTravellerDto[0].memberCardCode\" id=\"infantCid_"+infantIndex+"\" />"
			+"<div class=\"label1-st\">"
			+"<label style=\"width:51px\" class=\"hover\" ><input type=\"radio\" name=\"salesTravellerDto[0].travellerType\" id=\"radio\" value=\"2\" checked=\"checked\" />&nbsp;婴儿</label>"
			+"<label style=\"width:300px\" ><div id=\"infantReduceTip_"+infantIndex+"\" style=\"text-align:left; font-weight:bold; color:#F00;display:none\" ></div></label>"
			+"</div>"
			+"<div class=\"fr\">"
			+"<a travellerType=\"2\" seq=\""+infantIndex+"\" onclick=\"cancel(this)\" class=\"Btn-cl\"><strong>删除旅客</strong></a>"
			+"</div>"
			+"</div>"
			+"<div id=\"infantDiv_"+infantIndex+"\" class=\"tab7-st infantDiv\" seq=\""+infantIndex+"\" id=\"con_pop_3\">"
			+"<table border=\"0\" cellspacing=\"0\" cellpadding=\"0\">"
			+"<tr>"
			+"<td width=\"110\" class=\"tab-bg-gr ri\">旅客姓名：</td>"
			+"<td class=\"le\">"
			+"<input name=\"salesTravellerDto[0].cnFullName\" id=\"infantName_"+infantIndex+"\" "+isReadOnlay+" validate=\"{required:true,linkname:true}\" />&nbsp;<span class=\"FRed\">*</span>"
			+"</td>"
			+"<td class=\"tab-bg-gr ri\">出生日期：</td>"
			+"<td class=\"le\"><input class=\"datepicker\" name=\"salesTravellerDto[0].birthDate\" id=\"infantBirthday_"+infantIndex+"\" "+isReadOnlay+" validate=\"{required:true}\" />&nbsp;<span class=\"FRed\">*</span></td>"
			+"<td width=\"110\" class=\"tab-bg-gr ri\">携带人姓名：</td>"
			+"<td class=\"le\">"
			+"<select name=\"salesTravellerDto[0].parentName\" id=\"parent_"+infantIndex+"\" validate=\"{required:true}\" >"
			+"<option value=\"-1\" parentId=\"-1\" >请选择</option>"
			+"</select>&nbsp;&nbsp;<span class=\"FRed\">*</span>"
			+"</td>"
			+"</tr>"
			+"</table>"
			+"</div>"
			+"</div>"
		);
	
	if(readOnlay){
		$('[id^=infantBirthday_]').attr("class","");
	}
}

/**
 * 添加旅客信息时，用于在其上方显示预扣减旅程和所需补差金额
 * @param type 旅客类型 成人、儿童、婴儿
 * @param params 参数列表
 */
function appendReduce(type,params){
	if(type == ADULT){
		$("#adultReduceTip_"+params.seq).text("预计扣减里程："+params.realreduce+" ，需补差为："+params.ticketPrice+" 元。");
		$("#adultReduceTip_"+params.seq).show();
	}
	if(type == CHILD){
		$("#childReduceTip_"+params.seq).text("预计扣减里程："+params.realreduce+" ，需补差为："+params.ticketPrice+" 元。");
		$("#childReduceTip_"+params.seq).show();
	}
	if(type == INFANT){
		$("#infantReduceTip_"+params.seq).text("预计扣减里程："+params.realreduce+" ，需补差为："+params.ticketPrice+" 元。");
		$("#infantReduceTip_"+params.seq).show();
	}
}


/**
 * 实际扣减旅程：会员可用旅程可能不够扣减
 * 	1、如果可用旅程不够扣减,返回可扣减旅程
 *  2、如果足够扣减，返回需要扣减的旅程数
 * @param reduceMileage
 * @returns
 */
function dealRealreduce(reduceMileage){
	
	if(Number(availableMileage)-reduceMileage>0){
		return reduceMileage;
	}else{
		return availableMileage;
	}
	
}

/**
 * 旅程不足是补差
 * @param difference 所差旅程数
 * @returns {Number} 所需补差金额
 */
function dealTicketpricve(difference){
	if(difference < 0){
		difference = parseFloat(difference)*-1;
	}
	if(difference < 100){
		difference = 100;
	}
	if(difference%100!=0){
		difference = difference-(difference%100)+100;
	}
	return (difference/100)*10;
}


function Map() {
	 var struct = function(key, value) {
	  this.key = key;
	  this.value = value;
	 }
	 
	 var put = function(key, value){
	  for (var i = 0; i < this.arr.length; i++) {
	   if ( this.arr[i].key === key ) {
	    this.arr[i].value = value;
	    return;
	   }
	  }
	   this.arr[this.arr.length] = new struct(key, value);
	 }
	 
	 var get = function(key) {
	  for (var i = 0; i < this.arr.length; i++) {
	   if ( this.arr[i].key === key ) {
	     return this.arr[i].value;
	   }
	  }
	  return null;
	 }
	 
	 var remove = function(key) {
	  var v;
	  for (var i = 0; i < this.arr.length; i++) {
	   v = this.arr.pop();
	   if ( v.key === key ) {
	    continue;
	   }
	   this.arr.unshift(v);
	  }
	 }
	 
	 var size = function() {
	  return this.arr.length;
	 }
	 
	 var isEmpty = function() {
	  return this.arr.length <= 0;
	 }
	 
	 this.arr = new Array();
	 this.keys = new Array();
	 this.get = get;
	 this.put = put;
	 this.remove = remove;
	 this.size = size;
	 this.isEmpty = isEmpty;
	 
}
String.prototype.replaceAll = function(s1,s2) { 
    return this.replace(new RegExp(s1,"gm"),s2); 
}
