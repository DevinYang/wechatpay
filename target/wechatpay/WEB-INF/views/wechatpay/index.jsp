<%@ page language="java" import="java.util.*" pageEncoding="utf-8"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
<title>微信支付</title>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
<%@include file="/WEB-INF/commons/taglibs.jsp" %>
<%@include file="/WEB-INF/commons/common-header.jsp" %>
<%@include file="/WEB-INF/commons/common-header-validate.jsp" %>
<script type="text/javascript">
$(function(){
	//微信支付
	$("#pay").click(function(){
		var redirect_uri = encodeURIComponent("http://www.taiyitao.com:8020/wechatpay/pay.htm");
		var href = "https://open.weixin.qq.com/connect/oauth2/authorize?appid=wx421e21355868635e&redirect_uri="+redirect_uri+"&response_type=code&scope=snsapi_base&state=123#wechat_redirect";
		$('#pay').attr('href',href);
	});
	
	
	//订单查询
	$('#query').click(function(){
		var href = "http://www.taiyitao.com:8020/wechatpay/query.htm";
		$('#query').attr('href',href);
		alert($('#query').attr('href'));
	});
	
	//订单查询
	$('#qcscan').click(function(){
		var redirect_uri = encodeURIComponent("http://www.taiyitao.com:8020/wechatpay/qcscan.htm");
		var href = "https://open.weixin.qq.com/connect/oauth2/authorize?appid=wx421e21355868635e&redirect_uri="+redirect_uri+"&response_type=code&scope=snsapi_base&state=123#wechat_redirect";
		$('#qcscan').attr('href',href);
	});
})

</script>
</head>
<body ontouchstart="">
<div class="wxapi_container">
    <div class="lbox_close wxapi_form">
      <h3 id="menu-pay">微信支付接口</h3>
      <div align="center">
      	<a href="#" id="pay"><span class="desc">1、（测试）JSAPI微信支付连接</span></a>
      	<br /><br /><br /><br /><br /><br />
      	<a href="#" id="query"><span class="desc">2、（测试）订单查询连接</span></a>
      	<br /><br /><br /><br /><br /><br />
      	<a href="#" id="qcscan"><span class="desc">3、（测试）扫码业务方式二支付</span></a>
      </div>
    </div>
  </div>
</body>
</html>
