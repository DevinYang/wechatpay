<%@ page language="java" import="java.util.*" pageEncoding="utf-8"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
<title>订单查询结果</title>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
<%@include file="/WEB-INF/commons/taglibs.jsp" %>
<%@include file="/WEB-INF/commons/common-header.jsp" %>
<%@include file="/WEB-INF/commons/common-header-validate.jsp" %>
<script type="text/javascript">


</script>
</head>
<body ontouchstart="">
<div class="wxapi_container">
    <div class="lbox_close wxapi_form">
      <h3 id="menu-pay">订单查询</h3>
      <div align="left">
		<p>设备号:${device_info}</p>
		<p>用户标识:${openid}</p>
		<p>是否关注公众账号:${is_subscribe}</p>
		<p>交易类型:${trade_type}</p>
		<p>交易状态:${trade_state}</p>
		<p>付款银行:${bank_type}</p>
		<p>总金额:${total_fee}</p>
		<p>货币种类:${fee_type}</p>
		<p>微信支付订单号:${transaction_id}</p>
		<p>商户订单号:${out_trade_no}</p>
		<p>商家数据包:${attach}</p>
		<p>支付完成时间:${time_end}</p>
      </div>
    </div>
  </div>
</body>
</html>
