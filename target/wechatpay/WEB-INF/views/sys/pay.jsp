<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>
<%
	String path = request.getContextPath();
	String basePath = request.getScheme() + "://"
			+ request.getServerName() + ":" + request.getServerPort()
			+ path + "/";
%>

<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN">
<html>
	<head>
		<base href="<%=basePath%>">
		<title>测试</title>
		<link rel="stylesheet" type="text/css" href="../css/global.css">
		<script language="javascript" src="../js/jquery.js"></script>
		<script language="javascript" src="../js/lazyloadv3.js"></script>
		<script src="../js/md5.js"></script>
		<script src="../js/sha1.js"></script>
		<meta http-equiv="content-type" content="text/html;charset=utf-8" />
		<meta id="viewport" name="viewport"
			content="width=device-width; initial-scale=1.0; maximum-scale=1; user-scalable=no;" />
		<!--
	<link rel="stylesheet" type="text/css" href="styles.css">
	-->
		<link rel="stylesheet" type="text/css"
			href="<%=basePath%>/css/global.css">
		<style type="text/css">
body {
	padding: 0;
	margin: 0
}

.order_detail {
	margin-bottom: 30px;
}

p {
	font-family: "微软雅黑";
	margin: 0
}

i {
	font-style: normal
}

.order_title {
	padding: 15px 0 20px;
	text-align: center
}

.order_box {
	background: #fff;
	border-top: 1px solid #ececec;
	border-bottom: 1px solid #ececec;
	padding: 15px 20px
}

.order_box>p {
	overflow: hidden;
	line-height: 30px
}

.order_box_title {
	color: #858585;
	float: left
}

.order_box_text {
	float: right
}

.order_button {
	margin-top: 20px;
	padding: 0 10px
}

.order_button button {
	color: #fff;
	background: #27a831;
	width: 100%;
	padding: 10px 0;
	border-radius: 10px;
	font-size: 16px;
	font-weight: bold;
	border: 1px solid #6d706e
}
</style>
	<script type="text/javascript">
	jQuery(document).ready(function(){ 
		var str = window.navigator.userAgent;
		var version = str.substring(8, 11);
		if (version != "5.0") {
			alert("微信浏览器系统版本过低，请将微信升级至5.0以上");
		} else {
			WeixinJSBridge.invoke('getBrandWCPayRequest', {
						"appId" : "${appId}", 
						"timeStamp" : "${timeStamp}", 
						"nonceStr" : "${nonceStr}", 
						"package" : "${wxPackage}",
						"signType" : "${signType}", 
						"paySign" : "${paySign}"
					}, function(res) {
							if (res.err_msg == "get_brand_wcpay_request:ok") {
								alert("支付成功");
							} else if (res.err_msg == "get_brand_wcpay_request:cancel") {
								alert("取消支付");
							} else if (res.err_msg == "get_brand_wcpay_request:fail") {
								alert("支付失败");
							}
						});

		}
	});
	
	/* function jspay123() {
		//var openid = "${openid}";
		//alert(openid);
		var str = window.navigator.userAgent;
		var version = str.substring(8, 11);
		if (version != "5.0") {
			alert("微信浏览器系统版本过低，请将微信升级至5.0以上");
		} else {
			WeixinJSBridge
					.invoke('getBrandWCPayRequest', {
						"appId" : "${appId}", //公众号名称，由商户传入
						"timeStamp" : "${timeStamp}", //时间戳
						"nonceStr" : "${nonceStr}", //随机串
						"package" : "${wxPackage}",//统一支付接口返回的prepay_id 参数值，提交格式如：prepay_id=***
						"signType" : "${signType}", //微信签名方式:sha1
						"paySign" : "${paySign}" //微信签名
					}, function(res) {
						    // get_brand_wcpay_request:cancel 用户取消
							// get_brand_wcpay_request:fail 发送失败
							// get_brand_wcpay_request:ok //发送成功
							// WeixinJSBridge.log(res.err_msg);alert(res);
							//alert(res.err_code + res.err_desc);
							//alert(res.err_msg);
							if (res.err_msg == "get_brand_wcpay_request:ok") {
								window.location.href = "/wensha/jsp/orderSuccess.jsp";
							} else if (res.err_msg == "get_brand_wcpay_request:cancel") {
								alert("取消支付");
							} else if (res.err_msg == "get_brand_wcpay_request:fail") {
								alert("支付失败");
							}
						});

		}

	} */
</script>
	</head>
	<body style="background: #f5f5f5">
		<div class="order_detail">
			<div class="order_title">
				<p style="font-weight: bold; margin-bottom: 5px">
					温莎包房预订
				</p>
				<p style="font-size: 24px; margin-top: 0px">
					￥${payMoney}元
				</p>
			</div>

			<div class="order_box">
				<p>
					<i class="order_box_title">收款方</i><i class="order_box_text">温莎KTV量贩</i>
				</p>
				<p>
					<i class="order_box_title">商 品</i><i class="order_box_text">温莎包房预订</i>
				</p>
			</div>
		</div>
		<a class="red-btn mar_0_10 mar_b_20" onclick="jspay123();">立即支付</a>
		<br>
	</body>
</html>
