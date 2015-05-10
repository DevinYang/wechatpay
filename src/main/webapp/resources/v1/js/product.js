var conditions = 
{
	/*CARRIER:{
		key:'CARRIER',
		text:'适用航班',
		operators:{EQUAL:{key:'EQUAL',text:'相等'},NOT_EQUAL:{key:'NOT_EQUAL',text:'不相等'},
					  IN:{key:'IN',text:'包括在'},  NOT_IN:{key:'NOT_IN',text:'不包括在'}},
		elements:[{type:'text',name:'value',text:'',key:'',dataType:'STRING',isRequired:true}]
	}, delete 2013-10-18*/
	CABINSEAT:{
		key:'CABINSEAT',
		text:'适用舱位',
		operators:{EQUAL:{key:'EQUAL',text:'相等'},NOT_EQUAL:{key:'NOT_EQUAL',text:'不相等'},
				      IN:{key:'IN',text:'包括在'},  NOT_IN:{key:'NOT_IN',text:'不包括在'},
		      START_WITH:{key:'START_WITH',text:'以...开始'},END_WITH:{key:'END_WITH',text:'以...结束'}},
		elements:[{type:'text',name:'value',text:'',key:'',dataType:'STRING',isRequired:true}]
	},
	LINE_TYPE:{
		key:'LINE_TYPE',
		text:'航线类型',
		operators:{EQUAL:{key:'EQUAL',text:'相等'}},//,NOT_EQUAL:{key:'NOT_EQUAL',text:'不相等'}
		elements:[{type:'radio',name:"value",dataType:'BOOLEAN',isRequired:true,items:[
		                                                                               {key:true,text:'干线'},
		                                                                               {key:false,text:'支线'}]}]
	},
	SERVICE_TYPE:{
		key:'SERVICE_TYPE',
		text:'营运类型',
		operators:{EQUAL:{key:'EQUAL',text:'相等'}},//,NOT_EQUAL:{key:'NOT_EQUAL',text:'不相等'}
		elements:[{type:'radio',name:"value",dataType:'BOOLEAN',isRequired:true,items:[{key:true,text:'自营'},
		                                                             		           {key:false,text:'非自营'}]}]
	},
	CODE_SHAR:{
		key:'CODE_SHAR',
		text:'代码共享',
		operators:{EQUAL:{key:'EQUAL',text:'相等'}},//,NOT_EQUAL:{key:'NOT_EQUAL',text:'不相等'}
		elements:[{type:'radio',name:"value",dataType:'BOOLEAN',isRequired:true,items:[{key:true,text:'共享'},
		                                                             		           {key:false,text:'非共享'}]}]
	},
	CHARTER:{
		key:'CHARTER',
		text:'适应包机',
		operators:{EQUAL:{key:'EQUAL',text:'相等'}},//,NOT_EQUAL:{key:'NOT_EQUAL',text:'不相等'}
		elements:[{type:'radio',name:"value",dataType:'BOOLEAN',isRequired:true,items:[{key:true,text:'适应'},
		                                                             		           {key:false,text:'不适应'}]},
		          {type:'text',name:'value1',text:'例外:',key:'',dataType:'STRING',isRequired:false}]
		
	},
	TRAVELLER_NAME:{
		key:'TRAVELLER_NAME',
		text:'旅客姓名',
		operators:{EQUAL:{key:'EQUAL',text:'相等'},NOT_EQUAL:{key:'NOT_EQUAL',text:'不相等'},
					  IN:{key:'IN',text:'包括在'},NOT_IN:{key:'NOT_IN',text:'不包括在'}},
		elements:[{type:'text',name:'value',text:'',key:'',dataType:'STRING',isRequired:true}]
	},
	TRAVEL_TYPE:{
		key:'TRAVEL_TYPE',
		text:'旅行类型',
		operators:{IN:{key:'IN',text:'包括在'},NOT_IN:{key:'NOT_IN',text:'不包括在'}},
		elements:[{type:'checkbox',name:'value',dataType:'STRING',isRequired:true,items:[{key:'ONE_WAY',text:'单程'},
		                                                                              {key:'TWO_WAY',text:'来回程'},
		                                                                              {key:'MULTI',text:'多目的地'},
		                                                                              {key:'TRANSIT',text:'中转联程'}]}]
	},
	PLAN_TYPE:{
		key:'PLAN_TYPE',
		text:'机型',
		operators:{EQUAL:{key:'EQUAL',text:'相等'},NOT_EQUAL:{key:'NOT_EQUAL',text:'不相等'},
			  		  IN:{key:'IN',text:'包括在'},NOT_IN:{key:'NOT_IN',text:'不包括在'}},
		elements:[{type:'text',name:'value',key:'',text:'',dataType:'STRING',isRequired:true}]
	},
	FLIGHT_NO:{
		key:'FLIGHT_NO',
		text:'航班号',
		operators:{EQUAL:{key:'EQUAL',text:'相等'},NOT_EQUAL:{key:'NOT_EQUAL',text:'不相等'},
			  		  IN:{key:'IN',text:'包括在'},NOT_IN:{key:'NOT_IN',text:'不包括在'},
			  		  LIKE:{key:'LIKE',text:'相似'}},
		elements:[{type:'text',name:'value',key:'',text:'',dataType:'STRING',isRequired:true}]
	},
	TICKET_DATE:{
		key:'TICKET_DATE',
		text:'出票日期',
		operators:{EQUAL:{key:'EQUAL',text:'相等'},NOT_EQUAL:{key:'NOT_EQUAL',text:'不相等'},
				 GREATER:{key:'GREATER',text:'大于'},  GREATER_OR_EQUAL:{key:'GREATER_OR_EQUAL',text:'大于或等于'},
				    LESS:{key:'LESS',text:'小于'},LESS_OR_EQUAL:{key:'LESS_OR_EQUAL',text:'小于或等于'}},
		elements:[{type:'text',name:'value',key:'',text:'',dataType:'DATE',isRequired:true}]
	},
	TRAVELLER_TYPE:{
		key:'TRAVELLER_TYPE',
		text:'旅客类型',
		operators:{IN:{key:'IN',text:'包括在'},  NOT_IN:{key:'NOT_IN',text:'不包括在'}},
		elements:[{type:'checkbox',name:'value',dataType:'INT',isRequired:true,items:[{key:'1',text:'成人'},
		                                                                              {key:'2',text:'儿童'},
		                                                            		          {key:'3',text:'婴儿'}]}]
	},
	DEPART_AIR_PORT:{
		key:'DEPART_AIR_PORT',
		text:'出发机场',
		operators:{EQUAL:{key:'EQUAL',text:'相等'},NOT_EQUAL:{key:'NOT_EQUAL',text:'不相等'},
					  IN:{key:'IN',text:'包括在'},  NOT_IN:{key:'NOT_IN',text:'不包括在'}},
		elements:[{type:'text',name:'value',key:'',text:'',dataType:'STRING',isRequired:true}]
	},
	FOWARD_DATES:{
		key:'FOWARD_DATES',
		text:'提前天数',
		operators:{EQUAL:{key:'EQUAL',text:'相等'},NOT_EQUAL:{key:'NOT_EQUAL',text:'不相等'},
			 	 GREATER:{key:'GREATER',text:'大于'},  GREATER_OR_EQUAL:{key:'GREATER_OR_EQUAL',text:'大于或等于'},
			        LESS:{key:'LESS',text:'小于'},LESS_OR_EQUAL:{key:'LESS_OR_EQUAL',text:'小于或等于'}},
		elements:[{type:'text',name:'value',key:'',text:'',dataType:'INT',isRequired:true}]
	},/**以下为提示条件*/
	ADAPT_TICKET:{
		key:'ADAPT_TICKET',
		text:'适应票证',
		operators:{EQUAL:{key:'EQUAL',text:'相等'},NOT_EQUAL:{key:'NOT_EQUAL',text:'不相等'},
			  		  IN:{key:'IN',text:'包括在'},  NOT_IN:{key:'NOT_IN',text:'不包括在'}},
		elements:[{type:'text',name:'value',key:'',text:'',dataType:'STRING',isRequired:true}]
	},
	MEMBER_LEVEL:{
		key:'MEMBER_LEVEL',
		text:'会员级别',
		operators:{EQUAL:{key:'EQUAL',text:'相等'},NOT_EQUAL:{key:'NOT_EQUAL',text:'不相等'},
			  		  IN:{key:'IN',text:'包括在'},  NOT_IN:{key:'NOT_IN',text:'不包括在'}},
		elements:[{type:'text',name:'value',key:'',text:'',dataType:'STRING',isRequired:true}]
	},
	JOIN_DATE:{
		key:'JOIN_DATE',
		text:'入会时间',
		operators:{EQUAL:{key:'EQUAL',text:'相等'},NOT_EQUAL:{key:'NOT_EQUAL',text:'不相等'},
		 	 GREATER:{key:'GREATER',text:'大于'},  GREATER_OR_EQUAL:{key:'GREATER_OR_EQUAL',text:'大于或等于'},
		        LESS:{key:'LESS',text:'小于'},LESS_OR_EQUAL:{key:'LESS_OR_EQUAL',text:'小于或等于'}},
		elements:[{type:'text',name:'value',key:'',text:'',dataType:'DATE',isRequired:true}]
	},
	TRAVELLER_ID_NO:{
		key:'TRAVELLER_ID_NO',
		text:'旅客身份证号',
		operators:{EQUAL:{key:'EQUAL',text:'相等'},NOT_EQUAL:{key:'NOT_EQUAL',text:'不相等'},
	  		  IN:{key:'IN',text:'包括在'},  NOT_IN:{key:'NOT_IN',text:'不包括在'},
	  		LIKE:{key:'LIKE',text:'相似'}},
		elements:[{type:'text',name:'value',key:'',text:'',dataType:'STRING',isRequired:true}]
	},
	PAY_TYPE:{
		key:'PAY_TYPE',
		text:'支付类型',
		operators:{EQUAL:{key:'EQUAL',text:'相等'},NOT_EQUAL:{key:'NOT_EQUAL',text:'不相等'},
	  		  IN:{key:'IN',text:'包括在'},  NOT_IN:{key:'NOT_IN',text:'不包括在'}},
		elements:[{type:'text',name:'value',key:'',text:'',dataType:'STRING',isRequired:true}]
	},
	FLY_DATE:{
		key:'FLY_DATE',
		text:'航班日期',
		operators:{EQUAL:{key:'EQUAL',text:'相等'},NOT_EQUAL:{key:'NOT_EQUAL',text:'不相等'},
			 GREATER:{key:'GREATER',text:'大于'},  GREATER_OR_EQUAL:{key:'GREATER_OR_EQUAL',text:'大于或等于'},
			    LESS:{key:'LESS',text:'小于'},LESS_OR_EQUAL:{key:'LESS_OR_EQUAL',text:'小于或等于'}},
	     elements:[{type:'text',name:'value',key:'',text:'',dataType:'DATE',isRequired:true}]
	}
};
//条件集合的索引
var listIndex = 0;
function generateConditionHtml(tbodyId){
	var html = "<tr><th style='width:20%'><select name='conditions["+listIndex+"].key' id='"+listIndex+"' onchange='conditionChange(\""+tbodyId+"\",this,"+listIndex+");' class='{required:true}'>";
	html += "<option value='' title=''>--请选择--</option>";
	for(var property in conditions){
		var condition = conditions[property];
		html += "<option value='"+condition.key+"' title='"+property+"'>"+condition.text+"</option>";
	}
	html +="</select></th><td style='width:20%'></td><td style='width:60%'></td></tr>";
	$('#'+tbodyId).append( html );
	listIndex = listIndex+1;
}
function conditionChange(tbodyId,select,listIndex){
	var option=$(select).find('option:selected');
	var property = option.attr('title');
	if(property!=''){
	var selected = $('#'+tbodyId).find('option[title="'+property+'"]:selected');
	if(selected.length > 1){
		Dialog.alert("已选择了该条件,不能重复!", null, true);
		return false;
	}else{
		var condition = conditions[property];
		var op_html = generateOperatorHtml(condition,listIndex);
		var element_html = generateElementHtml(condition,listIndex);
		var td = $(select).parent().parent().find('td');
		$(td[0]).html("");
		$(td[0]).append( op_html);
		$(td[1]).html("");
		$(td[1]).append( element_html);
	}
	}
}
function generateOperatorHtml(condition,listIndex){
	var op_html = "<select name='conditions["+listIndex+"].operator' id='operator"+listIndex+"' class='{required:true}'>";
	for(var operatorProperty in condition.operators ){
		var operator = condition.operators[operatorProperty];
		op_html += "<option value='"+operator.key+"'>"+operator.text+"</option>";
	}
	op_html += "</select>";
	return op_html;
}

function generateElementHtml(condition,listIndex){
	var element_html = "";
	for(var j=0;j<condition.elements.length;j++){
		var element = condition.elements[j];
		if(element.type =='text'){
			if(element.dataType == 'STRING'){
				element_html += element.text+"<input type='"+element.type+"' id='name"+listIndex+"' name='conditions["+listIndex+"]."+element.name+"' onBlur='this.value=ignoreSpaces(this.value);' value='"+element.key+"' style='width:auto;' class='{maxlength:255,required:"+element.isRequired+"}'/>";
			}else if(element.dataType == 'DATE'){
				element_html += element.text+"<input type='"+element.type+"' id='name"+listIndex+"' name='conditions["+listIndex+"]."+element.name+"' value='"+element.key+"' style='width:auto;'  readonly='readonly' class='datepicker'/>";
			}else if(element.dataType =='INT'){
				element_html += element.text+"<input type='"+element.type+"' id='name"+listIndex+"' name='conditions["+listIndex+"]."+element.name+"' onBlur='this.value=ignoreSpaces(this.value);' value='"+element.key+"' style='width:auto;' class='{required:"+element.isRequired+",digits:true}'/>";
			}
		}else if(element.type =='checkbox' || element.type=='radio'){
			for(var i=0;i<element.items.length;i++){
				var item = element.items[i];
				element_html += "<label><input type='"+element.type+"' id='name"+listIndex+"' name='conditions["+listIndex+"]."+element.name+"' value='"+item.key+"' style='width:auto;float:center;' class='{required:"+element.isRequired+"}'>"+item.text+"</input></label>&nbsp;";
			}
		}
		element_html += "<input type='hidden' name='conditions["+listIndex+"]."+element.name+"Type' value='"+element.dataType+"' />";
	}
	element_html += "<div onclick='deleteConditionHtml(this);' class='delete-label'></div>";
	return element_html;
}

function deleteConditionHtml(deleteLabel){
	$(deleteLabel).parent().parent().remove();
}

function fillEditRuleForm(data){
	$('#ruleId').val(data.id);
	$('#tbody_condition_edit').html("");
	$('#form_rule_edit').find("#name").val(data.name);
	$('#priority_edit').val(data.priority);
	$('#form_rule_edit').find("#isAnd").val(data.isAnd);
	
	generateConditionHtmlByData(data);
}

/**修改规则时,生成条件html**/
function generateConditionHtmlByData(data){
	listIndex=0;
	for(var i=0;i<data.conditions.length;i++){
		var selectCondition = data.conditions[i];
		var html = "<tr><th style='width:20%'><select name='conditions["+listIndex+"].key' id='"+listIndex+"' onchange='conditionChange(\"tbody_condition_edit\",this,"+listIndex+");' class='{required:true}'>";
		html += "<option value='' title=''>--请选择--</option>";
		var op_html = "<select name='conditions["+listIndex+"].operator' class='{required:true}'>";
		var element_html = "";
		
		for(var property in conditions){
			var condition = conditions[property];
			if(selectCondition.key == condition.key){
				html += "<option value='"+condition.key+"' title='"+condition.key+"' selected='selected'>"+condition.text+"</option>";
				
				for(var operatorProperty in condition.operators){
					var operator = condition.operators[operatorProperty];
					if(selectCondition.operator == operator.key){
						op_html += "<option value='"+operator.key+"' selected='selected'>"+operator.text+"</option>";
					}else{
						op_html += "<option value='"+operator.key+"'>"+operator.text+"</option>";
					}
				}
				
				for(var k=0;k<condition.elements.length;k++){
					var element = condition.elements[k];
					var value = selectCondition[element.name];
					if(isNullOrEmpty(value)){
						value = "";
					}
					if(element.type =='text'){
						if(element.dataType == 'STRING'){
							element_html += element.text+"<input type='"+element.type+"' name='conditions["+listIndex+"]."+element.name+"' onBlur='this.value=ignoreSpaces(this.value);' value='"+value+"' style='width:auto;' class='{maxlength:255,required:"+element.isRequired+"}'/>";
						}else if(element.dataType == 'DATE'){
							element_html += element.text+"<input type='"+element.type+"' name='conditions["+listIndex+"]."+element.name+"' value='"+value+"' style='width:auto;'  readonly='readonly' class='datepicker'/>";
						}else if(element.dataType =='INT'){
							element_html += element.text+"<input type='"+element.type+"' name='conditions["+listIndex+"]."+element.name+"' onBlur='this.value=ignoreSpaces(this.value);' value='"+value+"' style='width:auto;' class='{required:"+element.isRequired+",digits:true}'/>";
						}
					}else if(element.type =='checkbox'){
						for(var m=0;m<element.items.length;m++){
							var item = element.items[m];
							if(selectCondition.value.indexOf(item.key)>=0){
								element_html += "<label><input type='"+element.type+"' name='conditions["+listIndex+"]."+element.name+"' value='"+item.key+"' checked='checked' style='width:auto;float:center;' class='{required:"+element.isRequired+"}'>"+item.text+"</input></label>&nbsp;";
							}else{
								element_html += "<label><input type='"+element.type+"' name='conditions["+listIndex+"]."+element.name+"' value='"+item.key+"' style='width:auto;float:center;' class='{required:"+element.isRequired+"}'>"+item.text+"</input></label>&nbsp;";
							}
						}
					}else if(element.type=='radio'){
						for(var l=0;l<element.items.length;l++){
							var item = element.items[l];
							if(selectCondition.value == item.key.toString()){
								element_html += "<label><input type='"+element.type+"' name='conditions["+listIndex+"]."+element.name+"' value='"+item.key+"' checked='checked' style='width:auto;float:center;' class='{required:"+element.isRequired+"}'>"+item.text+"</input></label>&nbsp;";
							}else{
								element_html += "<label><input type='"+element.type+"' name='conditions["+listIndex+"]."+element.name+"' value='"+item.key+"' style='width:auto;float:center;' class='{required:"+element.isRequired+"}'>"+item.text+"</input></label>&nbsp;";
							}
						}
					}
					element_html += "<input type='hidden' name='conditions["+listIndex+"]."+element.name+"Type' value='"+element.dataType+"' />";
				}
				element_html += "<div onclick='deleteConditionHtml(this);' class='delete-label'></div>";
			}else{
				html += "<option value='"+condition.key+"' title='"+condition.key+"'>"+condition.text+"</option>";
			}
		}
		op_html += "</select>";
		html +="</select></th>";
		html +="<td style='width:20%'>"+op_html+"</td>";
		html +="<td style='width:60%'>"+element_html+"</td></tr>";
		$('#tbody_condition_edit').append( html );
		listIndex = listIndex+1;
	}
}

/**查询产品的规则生成详情页面的规则html*/
function generateDetailRuleHtml(url){
	$.ajax({
	    	type : "GET",
	    	//url : '${ctx}/product/'+$('#id').val()+'/rule/list/',
	    	url : url,
	    	data : {},
	    	dataType:'json',
	    	success : function(rspData) {
	    		if(rspData){
	    			var html ="";
	    			for(var i=0;i<rspData.length;i++){
	    				var rule = rspData[i];
	    				for(var j=0;j<rule.conditions.length;j++){
	    					var condition = rule.conditions[j];
	    					var value1 = "";
	    					if(condition.value1){
	    						value1 = "/" + condition.value1;
	    					}
	    					html+="<tr>";
	    					if(conditions[condition.key].text=='旅客类型'||conditions[condition.key].text=='营运类型'||conditions[condition.key].text=='旅行类型'||conditions[condition.key].text=='适应包机'||conditions[condition.key].text=='代码共享'||conditions[condition.key].text=='航线类型')
    						{
    						html+="<th width='15%'>"+conditions[condition.key].text+"</th><td width='35%'>"+conditions[condition.key].operators[condition.operator].text
    						var keys=condition.value.split(",");
    						var item=conditions[condition.key].elements[0].items;
    						for(var k=0;k<keys.length;k++){
    							for(var h=0;h<item.length;h++){
    								if((item[h].key+"")==keys[k])  html+=item[h].text;
    							}
    							if(k<keys.length-1) html+=","
    						}
    						html+=value1 +"</td>";
    						}
    					else
    						html+="<th width='15%'>"+conditions[condition.key].text+"</th><td width='35%'>"+conditions[condition.key].operators[condition.operator].text + condition.value + value1 +"</td>";
    					if( j < (rule.conditions.length-1)){//还有下一个条件
	    						j++;
	    						condition = rule.conditions[j];
	    						if(condition.value1){
    	    						value1 = "/" + condition.value1;
    	    					}
	    					if(conditions[condition.key].text=='旅客类型'||conditions[condition.key].text=='营运类型'||conditions[condition.key].text=='旅行类型'||conditions[condition.key].text=='适应包机'||conditions[condition.key].text=='代码共享'||conditions[condition.key].text=='航线类型')
	    						{
	    						html+="<th width='120'>"+conditions[condition.key].text+"</th><td width='35%'>"+conditions[condition.key].operators[condition.operator].text
	    						var keys=condition.value.split(",");
	    						var item=conditions[condition.key].elements[0].items;
	    						for(var k=0;k<keys.length;k++){
	    							for(var h=0;h<item.length;h++){
	    								if((item[h].key+"")==keys[k])  html+=item[h].text;
	    							}
	    							if(k<keys.length-1) html+=","
	    						}
	    						html+=value1 +"</td>";
	    						}
	    					else
	    						html+="<th width='15%'>"+conditions[condition.key].text+"</th><td width='35%'>"+conditions[condition.key].operators[condition.operator].text + condition.value + value1 +"</td>";
	    					}
    					else
    						html+="<th width='15%'>&nbsp</th><td width='35%'>&nbsp</td>";
	    					html+="</tr>";
	    				}
	    			}
	    			$('#detail_rule').html(html);
	    		}
	    	},
	    	error:function(){
	    		Dialog.alert("加载失败！",function(){});
	    	}
	});
}

function checkRuleName(ruleName,ruleId){
	if(undefined !=rules && !isNullOrEmpty(rules)){
		for(var i=0;i<rules.length;i++){
			var rule = rules[i];
			if(rule.name == ruleName){
				if(ruleId !=''){
					if(rule.id != ruleId){
						Dialog.alert("规则名已存在!");
						return false;
					}
				}else{
					Dialog.alert("规则名已存在!");
					return false;
				}
			}
		}
	}
	return true;
}


//过滤空格、全角
function ignoreSpaces(string) {
	var result=""; 
	　　for (var i = 0; i < string.length; i++){ 
	　　　if (string.charCodeAt(i)==12288){ 
	　　　　result+= String.fromCharCode(string.charCodeAt(i)-12256); 
	　　　　continue; 
	　　　} 
	　　　if (string.charCodeAt(i)>65280 && string.charCodeAt(i)<65375) result+= String.fromCharCode(string.charCodeAt(i)-65248); 
	　　　else result+= String.fromCharCode(string.charCodeAt(i)); 
	　　} 
	var temp = "";
	string = '' + result;
	splitstring = result.split(" ");
	for(i = 0; i < splitstring.length; i++)
		{
		temp += splitstring[i];
		}
	return temp;
	}


//过滤空格、全角和小写
function ignore(string) {
	　　var result=""; 
	　　for (var i = 0; i < string.length; i++){ 
	　　　if (string.charCodeAt(i)==12288){ 
	　　　　result+= String.fromCharCode(string.charCodeAt(i)-12256); 
	　　　　continue; 
	　　　} 
	　　　if (string.charCodeAt(i)>65280 && string.charCodeAt(i)<65375) result+= String.fromCharCode(string.charCodeAt(i)-65248); 
	　　　else result+= String.fromCharCode(string.charCodeAt(i)); 
	　　} 
	var temp = "";
	string = '' + result;
	splitstring = result.split(" ");
	for(i = 0; i < splitstring.length; i++)
		{
		temp += splitstring[i];
		}
	return temp.toUpperCase();
	}


//过滤全角和小写
function ignoreUpper(string) {
	　　var result=""; 
	　　for (var i = 0; i < string.length; i++){ 
	　　　if (string.charCodeAt(i)==12288){ 
	　　　　result+= String.fromCharCode(string.charCodeAt(i)-12256); 
	　　　　continue; 
	　　　} 
	　　　if (string.charCodeAt(i)>65280 && string.charCodeAt(i)<65375) result+= String.fromCharCode(string.charCodeAt(i)-65248); 
	　　　else result+= String.fromCharCode(string.charCodeAt(i)); 
	　　} 
	return result.toUpperCase();
	}
