<%@ page language="java" contentType="text/html;" pageEncoding="UTF-8"%>
<%@ include file="/WEB-INF/commons/taglibs.jsp" %>
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
<title>500-服务端错误！</title>
<link href="${ctx}/resources/v1/css/client.css" rel="stylesheet" type="text/css" />
<style type="text/css">
.box{
	width:600px;
	margin:0 auto;
	/* margin-top:60px; */
	text-align:center;
}
.box_msg_stack {
border: 1px solid #ccc;
max-height: 250px;
overflow: auto;
padding: 5px;
margin: 0px 10px;
line-height: 15px;
}

</style>
<script type="text/javascript">
	function discontrol(itemid) {
		if (document.getElementById(itemid).style.display == 'none') {
			document.getElementById(itemid).style.display = "";
		} else {
			document.getElementById(itemid).style.display = "none";
		}
	}
</script>
</head>

<body>
<div class="box">
<img src="${ctx }/resources/v1/images/500.png"/>
</div>
<div class="box"><b style="color: red;">${msg }</b> <a class="alink" href="javascript:void(0);" onclick="discontrol('msgStack');">点击查看详细</a></div>
<br/>
<div class="box_msg_stack" style="display: none;" id="msgStack">
${msgStack }
</div>
</body>
</html>
