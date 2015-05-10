package com.wechatpay.util;

import java.io.IOException;
import java.util.Map;
import java.util.TreeMap;

import org.jdom.JDOMException;
public class WXJSPay {

	public static Map jsApiPay(String openid, String total_fee,
		String out_trade_num) throws JDOMException, IOException {	
		String noceStr=Sha1Util.getNonceStr();//随机字符串
		String timeStamp=Sha1Util.getTimeStamp();//时间戳
		// 接口package部分-内容----------------------------------------------------------
		TreeMap<String, String> contentMap = new TreeMap<String, String>();
		contentMap.put("appid", ConfigUtils.APPID); // 公众账号 ID
		contentMap.put("mch_id", ConfigUtils.MCHI_ID); // 商户号
		contentMap.put("nonce_str", noceStr); // 随机字符串		
		contentMap.put("body", ConfigUtils.BODY); // 商品描述
		contentMap.put("out_trade_no",out_trade_num); // 商户订单号
		contentMap.put("total_fee",total_fee); // 订单总金额
		contentMap.put("spbill_create_ip",ConfigUtils.SPBILL_CREATE_IP); // 订单生成的机器IP
		contentMap.put("notify_url",ConfigUtils.NOTIFY_URL); // 通知地址
		contentMap.put("trade_type",ConfigUtils.TRADE_TYPE_JS); // 交易类型
		contentMap.put("openid",openid); // 用户标识
		String wxpackage = WeiXinSignAndPackage.createPackage(contentMap);
		contentMap.put("sign", wxpackage);
		
		String result=WeiXinSignAndPackage.getPrepayId(contentMap);//调用统一接口返回的值
		Map<String,String> map=XMLUtil.doXMLParse(result);//调用统一接口返回的值转换为XML格式
		TreeMap<String, String> wxPayParamMap = new TreeMap<String, String>();
		wxPayParamMap.put("appId", ConfigUtils.APPID);
		wxPayParamMap.put("timeStamp",timeStamp );		
		wxPayParamMap.put("nonceStr",noceStr);
		wxPayParamMap.put("package", "prepay_id="+map.get("prepay_id"));
		wxPayParamMap.put("signType", ConfigUtils.SIGNTYPE);
		String paySign=WeiXinSignAndPackage.createPaySign(wxPayParamMap);//支付得到的签名
		wxPayParamMap.put("paySign", paySign);	
		wxPayParamMap.put("payMoney", total_fee);//到前段显示使用，支付不需要此参数
		
		return wxPayParamMap;
	}
	
	/**
	 * 二维码扫描
	 * @param openid
	 * @param total_fee
	 * @param out_trade_num
	 * @return
	 * @throws JDOMException
	 * @throws IOException
	 */
	public static void qcscan(String openid, String total_fee,
			String out_trade_num) throws JDOMException, IOException {	
			String noceStr=Sha1Util.getNonceStr();//随机字符串
			String timeStamp=Sha1Util.getTimeStamp();//时间戳
			// 接口package部分-内容----------------------------------------------------------
			TreeMap<String, String> contentMap = new TreeMap<String, String>();
			contentMap.put("appid", ConfigUtils.APPID); // 公众账号 ID
			contentMap.put("mch_id", ConfigUtils.MCHI_ID); // 商户号
			contentMap.put("nonce_str", noceStr); // 随机字符串		
			contentMap.put("body", ConfigUtils.BODY); // 商品描述
			contentMap.put("out_trade_no",out_trade_num); // 商户订单号
			contentMap.put("total_fee",total_fee); // 订单总金额
			contentMap.put("spbill_create_ip",ConfigUtils.SPBILL_CREATE_IP); // 订单生成的机器IP
			contentMap.put("notify_url",ConfigUtils.NOTIFY_URL); // 通知地址
			contentMap.put("trade_type","NATIVE"); // 交易类型
			contentMap.put("product_id", "1");
			contentMap.put("openid",openid); // 用户标识
			String sign = WeiXinSignAndPackage.createPackage(contentMap);
			contentMap.put("sign", sign);
			
			String result=WeiXinSignAndPackage.getPrepayId(contentMap);//调用统一接口返回的值
			Map<String,String> map=XMLUtil.doXMLParse(result);//调用统一接口返回的值转换为XML格式
			String code_url = "";
			String return_code  = map.get("return_code");
			String result_code  = map.get("result_code");
			if("SUCCESS".equals(return_code) && "SUCCESS".equals(result_code)){
				code_url = map.get("code_url");
			}
			try {
				QRCodeUtil.encode(code_url, "c:/barcode");
			} catch (Exception e) {
			}
		}
	
	
	

}
