var mealTypes ={
	AVML:'印度（亚洲）素食',
	BBML:'婴儿餐',
	BLML:'清淡餐食',
	CHML:'儿童餐',
	DBML:'糖尿病餐',
	FPML:'水果餐',
	GFML:'禁谷蛋白餐',
	HNML:'印度餐',
	KSML:'犹太餐',
	LCML:'低卡餐',
	LFML:'低脂餐',
	LSML:'低盐餐',
	MOML:'穆斯林餐',
	NLML:'低乳糖餐',
	RVML:'生素食餐',
	SFML:'海鲜餐',
	VGML:'绝对素食餐',
	VJML:'乳蛋素食餐',
	VOML:'东方素食餐',
};


function getOptions(mealType){
	var options = "";
	for(var p in mealTypes){
		options +="<option value='"+p+"'";
		if(mealType && p == mealType)options +=" selected='selected' ";
		options +=">"+mealTypes[p]+"</option>";
	}
	return options;
}

function isApplyBookMeal(key){
	for(var i=0;i<bookMeals.length;i++){
		if(bookMeals[i] == key){
			return true;
		}
	}
	return false;
}

function genTravellers(segment,travellers){
	var html ="<tbody>";
	for(var i=0;i<travellers.length;i++){
		var traveller = travellers[i];
		var mealKey = segment.depCode+segment.arrCode+segment.flightNo+traveller.seq;
		var status ="未出票";
		if(!isNullOrEmpty(statuss)){
			status = statuss[segment.depCode+segment.arrCode+traveller.name];
			if(undefined == status){
				status = "";
			}
		}
		var meal = null;
		if(traveller.type != 'INFANT'){
			meal = meals[mealKey];
		}
		html +="<tr><td>";
		if(meal && meal.status==true){
			html +="<input id='"+segment.index+''+traveller.seq+"' type='checkbox' name='checkbox' value='"+traveller.type+"' disabled='disabled'/>";
		}else{
			html +="<input id='"+segment.index+''+traveller.seq+"' type='checkbox' name='checkbox' value='"+traveller.type+"'/>";
		}
		var depName = AirportCache.getCnName(segment.depCode);
		if("" == depName) depName = segment.depCode;
		var arriveName = AirportCache.getCnName(segment.arrCode);
		if("" == arriveName) arriveName = segment.arrCode;
		html +="<input type='hidden' name='pnrNo' value='"+segment.pnrNo+"'/>";
		html +="<input type='hidden' name='segmentIndex' value='"+segment.index+"'/>";
		html +="<input type='hidden' name='travellerIndex' value='"+traveller.seq+"'/>";
		html +="<input type='hidden' name='travellerName' value='"+traveller.name+"'/>";
		html +="<input type='hidden' name='carrierCode' value='"+segment.carrierCode+"'/>";
		html +="<input type='hidden' name='flightNo' value='"+segment.flightNo+"'/>";
		html +="<input type='hidden' name='flightDate' value='"+segment.depDate+"'/>";
		html +="<input type='hidden' name='segment' value='"+depName+"-"+arriveName+"'/>";
		html +="<input type='hidden' name='depCode' value='"+segment.depCode+"'/>";
		html +="<input type='hidden' name='arrCode' value='"+segment.arrCode+"'/>";
		html +="<input type='hidden' name='seatCode' value='"+segment.seatCode+"'/>";
		html +="<input type='hidden' name='cabinSeatLevel' value='"+CabinCache.getLevel(segment.carrierCode,segment.seatCode).code+"'/>";
		html +="<input type='hidden' name='isInter' value='"+segment.isInter+"'/>";
		html +="<input type='hidden' name='hasMeal' value='"+segment.mealType+"'/>";
		html +="<input type='hidden' name='mealStatus' value='"+((meal)?meal.status:'')+"'/>";
		html +="<input type='hidden' name='depMins' value='"+segment.depMins+"'/>";
		html +="<input type='hidden' name='couponStatus' value='"+status+"'/>";
		html +="</td>";
	    html +="<td>"+traveller.name+"</td>";
	    html +="<td>"+traveller.typeName+"</td>";
	    html +="<td>"+(isNullOrEmpty(traveller.credNo)?"":traveller.credNo)+"</td>";
	    html +="<td>"+status+"</td>";
	    html +="<td style='text-align:left; padding-left:10px;'><select name='mealType' class='example2'>";
	    html += getOptions(meal?meal.mealType:'');
	    html +="</select>&nbsp;份数：<input name='mealNum' type='text' size='3' value='1' readonly='readonly'/>";                        	                          	
	    html +="</td>";
	    if(meal){
	    	html +="<td><span class='quest_result'>";
	    	html +="<font color='red'>";
	    	if(meal.status){
	    		html +="已为旅客申请"+mealTypes[meal.mealType]+"1份";
	    	}else{
	    		html +="已为旅客申请"+mealTypes[meal.mealType]+"1份,未生效";
	    	}
	    	html +="</font></span></td>";
	    }else{
	    	if(isApplyBookMeal(mealKey)){
	    		html +="<td><span class='quest_result'>";
		    	html +="<font color='red'>";
		    	html +="该旅客已申请手工餐食";
		    	html +="</font></span></td>";
	    	}else{
	    		html +="<td><span style='display:none' class='quest_result'></span></td>";
	    	}
	    }
	    html +="</tr>";
	}
    
    html +="</tbody>";
	return html;
}

function genSegment(segment,travellers,i){
	var thread = "<thead><tr><th colspan='7' style='text-align:left; padding-left:10px;'>";
	thread +="<b>航段"+(i+1)+"：  "+AirportCache.getCityCnName(segment.depCode)+segment.depCode+"-"+AirportCache.getCityCnName(segment.arrCode)+segment.arrCode+"  "+segment.flightNo+"   "+segment.depDate+"   "+CabinCache.getLevelName(segment.carrierCode,segment.seatCode)+"</b></th></tr>";
	thread +="<tr><th width='50px;'>操作</th><th width='100px;'>姓名</th><th width='80px;'>类型</th><th width='150px;'>证件号码</th><th width='150px;'>状态</th><th>餐食</th><th width='200px;'>申请结果</th></tr></thead>";

	var traveller = genTravellers(segment,travellers);
	var html = "<div style='padding:10px;' class='tab1-st pa-ast-05'><table>";
	html +=thread;
	html +=traveller;
	html +="</div>";
	return html;
}

function genPnrResult(segments,travellers){
	var html ="";
	for(var i=0;i<segments.length;i++){
		var segment = segments[i];
		html += genSegment(segment,travellers,i);
	}
	return html;
}
/**
 * 查询客票，生成结果html
 * @param data
 * @returns {String}
 */
function genTicketResult(data){
	var html = new Array();
	for(var j=0;j<data.length;j++){
		var face = data[j];
		for(var i=0;i<face.coupons.length;i++){
			var coupon = face.coupons[i];
			html.push("<tr>");
			html.push("<td>"+(i+1)+"</td>");
			html.push("<td>"+coupon.pnrcode+"</td>");
			html.push("<td>"+face.tktno+"</td>");
			html.push("<td>"+coupon.status+"</td>");
			html.push("<td>"+face.passenger+"</td>");
			html.push("<td>航程："+AirportCache.getCityCnName(coupon.depart)+"-"+AirportCache.getCityCnName(coupon.arrival)+"；航班日期："+coupon.flightDateFormatString+"；航班号："+coupon.flightNo+"；舱位："+coupon.cabin+"；</td>");
			html.push("<td>");
			if(coupon.pnrcode && ('' != coupon.pnrcode)){
				html.push("<a class='Btn Btn-blue' href='javascript:void(0)' onclick='selectTicket(\""+coupon.pnrcode+"\")'><span> 选 择</span></a>");
			}
			html.push("</td></tr>");
		}
	}
	if(html.length == 0){
		html.push("<tr><td colspan='7'><font color='red'>没有找到满足条件的记录！</font></td></tr>");
	}
	return html.join("");
}

function selectTicket(pnrNo){
	$("#pnr").val( pnrNo );
	$(".import").click();
}