<%@ page language="java" import="java.util.*" pageEncoding="utf-8"%>
<%@ include file="/WEB-INF/commons/taglibs.jsp"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">

<html xmlns="http://www.w3.org/1999/xhtml">
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
<link href="${ctx}/resources/v1/css/client.css" rel="stylesheet" type="text/css" />
<script src="${ctx}/resources/v1/jquery/jquery-1.5.2.min.js" type="text/javascript"></script>  
<script src="${ctx}/resources/v1/js/client.js" type="text/javascript"></script>
<script src="${ctx}/resources/v1/js/calendar.js" type="text/javascript"></script>
<script src="${ctx}/resources/v1/js/city.js" type="text/javascript"></script>
<%@ include file="/WEB-INF/commons/common-header-validate.jsp" %>
<script type="text/javascript">
var grid;
$(function(){
	
	grid = new Grid("content",{
        url : "${ctx}/sys-airport/list",
        method : "POST",
        page: true,//是否启用分页
        checkbox : false,//是否包含复选框
        autoLoad: true, //是否自动加载数据
        parms : { //参数
        	airportCode:""
        },
        columns: [
        { display: '机场三字码 ', name: 'airportCode' },
        { display: '机场中文名 ', name: 'airportNameCn' },
        { display: '机场英文名 ', name: 'airportNameEn' },
        { display: '城市三字码 ', name: 'cityCode' },
        { display: '城市中文名 ', name: 'cityNameCn' },
        { display: '城市英文名 ', name: 'cityNameEn' },
        { display: '区域 ', name: 'area' },
        { display: '备注 ', name: 'remarks' }
        ],
        operations: {
        	'编辑':function(){
        		form_edit.reset();
        		$.ajax({ 
    				dataType:"json",
    				type: "POST", 
    				url: "${ctx }/sys-airport/"+this.dataid+"/edit",
    				data:{},
    				beforeSend:function(){
    					showLoadingMask();
    				},
    				success: function(data){ 
    					$("#dialog_edit input,#dialog_edit select,#dialog_edit textarea").each(function(d,i){
    						$(this).val(data[this.name] == null ? "" : (data[this.name] + ""));
    					});
    					dialog_edit.show();
    				},
    				error:function(a,b,c){
    					alert(a.statusText + " status:" + a.status);
    				},
					complete:hideLoadingMask
    			});
        	},
        	'删除':function(d){
        		del(this.dataid);
        	}
        }
    });
	
	var dialog_add = new Dialog('dialog_add',{
		width:400,
		modal:true,
		buttons:{
			'确定':function(){
				if($(form_add).valid()){
					var _this = this;
					
					var params = formToObj(form_add);
					$.ajax({ 
						dataType:"json",
						type: "POST", 
						url: "${ctx }/sys-airport/create",
						data:params,
						beforeSend:function(){
							showLoadingMask();
						},
						success: function(msg){ 
							if(msg.isSuccess == true){
								_this.hide();
								Dialog.alert("添加成功!",function(){
									form_add.reset();
									grid.loadData();
								});
							}else{
								Dialog.alert("添加失败:" + msg.msg,null,false);
							}
						},
						error:function(a,b,c){
							alert(a.statusText + " status:" + a.status);
						},
						complete:hideLoadingMask
					});
					
				}
			},
			'取消':function(){
				this.hide();
			}
		}
	});
	
	
	var dialog_edit = new Dialog('dialog_edit',{
		width:400,
		modal:true,
		buttons:{
			'确定':function(){
				if($(form_edit).valid()){
					var _this = this;
					
					var params = formToObj(form_edit);
					$.ajax({ 
						dataType:"json",
						type: "POST", 
						url: "${ctx }/sys-airport/"+params.id+"/update",
						data:params,
						beforeSend:function(){
							showLoadingMask();
						},
						success: function(msg){ 
							if(msg.isSuccess == true){
								_this.hide();
								Dialog.alert("编辑成功!",function(){
									grid.loadData();
								});
							}else{
								Dialog.alert("编辑失败:" + msg.msg,null,false);
							}
						},
						error:function(a,b,c){
							alert(a.statusText + " status:" + a.status);
						},
						complete:hideLoadingMask
					});
					
				}
			},
			'取消':function(){
				this.hide();
			}
		}
	});
	
	$('.save').click(function(){
		dialog.show();
	});
	
	$('.add').click(function(){
		form_add.reset();
		$(form_add).validate().resetForm();
		dialog_add.show();
	});
	
	$(".search").click(function(){
		var params = formToObj(form_search);
		grid.loadData(params,true);
		$(".list").show();
	});
	
	
});

function del(id){
	Dialog.confirm("是否确认删除该条记录？",function(){
		$.ajax({ 
			dataType:"json",
			type: "POST", 
			url: "${ctx }/sys-airport/"+id+"/delete",
			beforeSend:function(){
				showLoadingMask();
			},
			success: function(msg){ 
				if(msg.isSuccess == true){
					Dialog.alert("删除成功!",function(){
						grid.loadData();
					});
				}else{
					Dialog.alert("删除失败：" + msg.msg, null, false);
				}
			},
			error:function(a,b,c){
				alert(a.statusText + " status:" + a.status);
			},
			complete:hideLoadingMask
		});	
	});
}
		
</script>

<style>
.btns{
	padding: 5px;
	font-size: 12px;
}
</style>
</head>
<body>
<div id="dialog_add" style="display: none;" title="新增机场">
<div class="tab3-st pa-ast-05">
<form name="form_add">
	<table>
	<tbody>
		<tr>
		<th width="90px">机场三字码</th>
		<td><input name="airportCode" type="text" class="required threeWordCode" maxlength="3" onkeyup="this.value=this.value.toUpperCase()"/>
		<font color="red">*</font>
		</td>
		</tr>
		<tr>
		<th>机场中文名</th>
		<td><input name="airportNameCn" type="text" class="required effectiveWord" maxlength="32"/>
		<font color="red">*</font>
		</td>
		</tr>
		<tr>
		<th>机场英文名</th>
		<td><input name="airportNameEn" type="text" class="required alnum" maxlength="32"/>
		<font color="red">*</font>
		</td>
		</tr>
		<tr>
		<th>城市三字码</th>
		<td><input name="cityCode" type="text" class="required threeWordCode" maxlength="3" onkeyup="this.value=this.value.toUpperCase()"/>
		<font color="red">*</font>
		</td>
		</tr>
		<tr>
		<th>城市中文名</th>
		<td><input name="cityNameCn" type="text" class="required effectiveWord" maxlength="32"/>
		<font color="red">*</font>
		</td>
		</tr>
		<tr>
		<th>城市英文名</th>
		<td><input name="cityNameEn" type="text" class="required alnum" maxlength="32"/>
		<font color="red">*</font>
		</td>
		</tr>
		<tr>
		<th>区域</th>
		<td>
			<select name="area" style="width: 140px;">
				<option value="CN">CN</option>
				<option value="IN">IN</option>
			</select>
		</td>
		</tr>
		<tr>
		<th>备注</th>
		<td>
			<textarea name="remarks" rows="3" style="width: 95%" class="effectiveWord" maxlength="512"></textarea>
		</td>
		</tr>
	</tbody>
	</table>
	</form>
</div>
</div>

<div id="dialog_edit" style="display: none;" title="编辑机场">
<div class="tab3-st pa-ast-05">
	<form name="form_edit">
	<input type="hidden" name="id"/>
	<table>
	<tbody>
		<tr>
		<th width="90px">机场三字码</th>
		<td><input name="airportCode" type="text" class="required threeWordCode" readonly="true" maxlength="3" onkeyup="this.value=this.value.toUpperCase()"/>
		<font color="red">*</font>
		</td>
		</tr>
		<tr>
		<th>机场中文名</th>
		<td><input name="airportNameCn" type="text" class="required effectiveWord" maxlength="32"/>
		<font color="red">*</font>
		</td>
		</tr>
		<tr>
		<th>机场英文名</th>
		<td><input name="airportNameEn" type="text" class="required alnum" maxlength="32"/>
		<font color="red">*</font>
		</td>
		</tr>
		<tr>
		<th>城市三字码</th>
		<td><input name="cityCode" type="text" class="required threeWordCode" maxlength="3" onkeyup="this.value=this.value.toUpperCase()"/>
		<font color="red">*</font>
		</td>
		</tr>
		<tr>
		<th>城市中文名</th>
		<td><input name="cityNameCn" type="text" class="required effectiveWord" maxlength="32"/>
		<font color="red">*</font>
		</td>
		</tr>
		<tr>
		<th>城市英文名</th>
		<td><input name="cityNameEn" type="text" class="required alnum" maxlength="32"/>
		<font color="red">*</font>
		</td>
		</tr>
		<tr>
		<th>区域</th>
		<td>
			<select name="area" style="width: 140px;">
				<option value="CN">CN</option>
				<option value="IN">IN</option>
			</select>
		</td>
		</tr>
		<tr>
		<th>备注</th>
		<td>
			<textarea name="remarks" rows="3" style="width: 95%" class="effectiveWord" maxlength="512"></textarea>
		</td>
		</tr>
	</tbody>
	</table>
	</form>
</div>
</div>

<div class="box_a pa-bst-10">
	<div class="Menubox"><div class="title_right">机场管理</div></div>
	<div class="tab3-st pa-ast-05">
	<form name="form_search">
	<table>
<tbody>
	<tr>
		<th style="width:80px;">机场三字码：</th>
		<td>
			<input name="airportCode" type="text" style="width: 120px;" onkeyup="this.value=this.value.toUpperCase()"/>
		</td>
		<th style="width:80px;">机场中文名：</th>
		<td>
			<input name="airportNameCn" type="text" style="width: 120px;"/>
		</td>
		<th style="width:80px;">机场英文名：</th>
		<td>
			<input name="airportNameEn" type="text" style="width: 120px;"/>
		</td>
	</tr>
	<tr>
		<td colspan="6">
		&nbsp;<a class="Btn Btn-blue search" ><span> 查　询 </span></a>
		&nbsp;<a class="Btn Btn-blue add"><span>新　增 </span></a>
		</td>
	</tr>
	</tbody>
	</table>
	</form>
	</div>
	<br/>
	
	<div id="content" class="list" >
	
	</div>
</div>
</body>
</html>
