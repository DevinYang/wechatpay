package com.wechatpay.action;

import java.io.IOException;
import java.util.Map;
import java.util.TreeMap;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import net.sf.json.JSONObject;

import org.jdom.JDOMException;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.servlet.ModelAndView;

import com.wechatpay.util.ConfigUtils;
import com.wechatpay.util.HttpTool;
import com.wechatpay.util.Sha1Util;
import com.wechatpay.util.WXJSPay;
import com.wechatpay.util.WeiXinSignAndPackage;
import com.wechatpay.util.XMLUtil;
@Controller
@RequestMapping("/wechatpay")
public class WechatpayAction {
	
	@RequestMapping("/index.htm")
	public ModelAndView index(HttpServletRequest request,HttpServletResponse response) throws IOException{
		ModelAndView mv = new ModelAndView("/wechatpay/index");
		return mv;
	}
	
	/**
	 * 微信支付接口
	 * @param request
	 * @param response
	 * @return
	 * @throws IOException
	 */
	@RequestMapping("/pay.htm")
	public ModelAndView pay(HttpServletRequest request,HttpServletResponse response) throws IOException{
		String code = request.getParameter("code");
		String returnJSON=HttpTool.getToken(ConfigUtils.APPID, ConfigUtils.APPSECRET, "authorization_code", code);
		JSONObject obj = JSONObject.fromObject(returnJSON);
		String openid=obj.get("openid").toString();
		String out_trade_num=System.currentTimeMillis()+"";
		Map<String, String> wxPayParamMap = null;
		try {
			wxPayParamMap = WXJSPay.jsApiPay(openid, "1",out_trade_num);
		} catch (JDOMException e) {
			e.printStackTrace();
		}
		ModelAndView mv = new ModelAndView("/wechatpay/pay");
		mv.addObject("appId", wxPayParamMap.get("appId"));
		mv.addObject("timeStamp", wxPayParamMap.get("timeStamp"));
		mv.addObject("nonceStr", wxPayParamMap.get("nonceStr"));
		mv.addObject("package", wxPayParamMap.get("package"));
		mv.addObject("signType", wxPayParamMap.get("signType"));
		mv.addObject("paySign", wxPayParamMap.get("paySign"));
		mv.addObject("payMoney", wxPayParamMap.get("payMoney"));
		return mv;
	}
	
	/**
	 * 订单查询
	 * @param request
	 * @param response
	 * @return
	 * @throws IOException
	 */
	@RequestMapping("/query.htm")
	public ModelAndView query(HttpServletRequest request,HttpServletResponse response) throws IOException{
		
		TreeMap<String,String> treeMap = new TreeMap<String, String>();
		treeMap.put("appid", ConfigUtils.APPID);
		treeMap.put("mch_id", ConfigUtils.MCHI_ID);
		treeMap.put("transaction_id", ConfigUtils.TRANSACTION_ID);
		treeMap.put("out_trade_no", ConfigUtils.OUT_TRADE_NO);
		treeMap.put("nonce_str",Sha1Util.getNonceStr());
		String sign = WeiXinSignAndPackage.createQuerySign(treeMap);
		treeMap.put("sign", sign);
		String orderQuery = HttpTool.sendPost(ConfigUtils.QUERY_URL, treeMap, ConfigUtils.INPUT_CHARSET);
		System.out.println("订单查询="+orderQuery);
		Map<String,String> map = null;
		try {
			map=XMLUtil.doXMLParse(orderQuery);//调用统一接口返回的值转换为XML格式
		} catch (Exception e) {
		}
		ModelAndView mv = new ModelAndView("/wechatpay/query");
		if("SUCCESS".equals(map.get("return_code")) & "SUCCESS".equals(map.get("result_code"))){
			mv.addObject("device_info", map.get("device_info"));
			mv.addObject("openid", map.get("openid"));
			mv.addObject("is_subscribe", map.get("is_subscribe"));
			mv.addObject("trade_type", map.get("trade_type"));
			mv.addObject("trade_state", map.get("trade_state"));
			mv.addObject("bank_type", map.get("bank_type"));
			mv.addObject("total_fee", map.get("total_fee"));
			mv.addObject("fee_type", map.get("fee_type"));
			mv.addObject("cash_fee", map.get("cash_fee"));
			mv.addObject("cash_fee_type", map.get("cash_fee_type"));
			mv.addObject("coupon_fee", map.get("coupon_fee"));
			mv.addObject("coupon_count", map.get("coupon_count"));
			mv.addObject("transaction_id", map.get("transaction_id"));
			mv.addObject("out_trade_no", map.get("out_trade_no"));
			mv.addObject("attach", map.get("attach"));
			mv.addObject("time_end", map.get("time_end"));
		}
		return mv;
	}
	
	/**
	 * 二维码扫描
	 * @param request
	 * @param response
	 * @return
	 * @throws IOException
	 */
	@RequestMapping("/qcscan.htm")
	public void qcscan(HttpServletRequest request,HttpServletResponse response) throws IOException{
		String code = request.getParameter("code");
		String returnJSON=HttpTool.getToken(ConfigUtils.APPID, ConfigUtils.APPSECRET, "authorization_code", code);
		JSONObject obj = JSONObject.fromObject(returnJSON);
		String openid=obj.get("openid").toString();
		String out_trade_num=System.currentTimeMillis()+"";
		Map<String, String> wxPayParamMap = null;
		try {
			 WXJSPay.qcscan(openid, "1",out_trade_num);
		} catch (JDOMException e) {
			e.printStackTrace();
		}
	}
	
	
	/**
	 * 微信异步回调
	 * @param request
	 * @param response
	 * @return
	 * @throws IOException
	 * @throws JDOMException 
	 */
	@RequestMapping("/notify.htm")
	public void notify(HttpServletRequest request,HttpServletResponse response) throws IOException, JDOMException{
		ModelAndView mv = new ModelAndView("/wechatpay/finish");
		//返回参数解析获取返回状态码
		request.setCharacterEncoding("UTF-8");
		Map<String, String> requestMap =XMLUtil.doXMLParse(request);
		String return_code = requestMap.get("return_code");
		
		if("SUCCESS".equals(return_code)){
			//解析获取返回参数
			String attach = requestMap.get("attach");
			System.out.println("微信支付返回数据包："+attach);
			String openid = requestMap.get("openid");
			String trade_type = requestMap.get("trade_type");
			String bank_type = requestMap.get("bank_type");
			String total_fee = requestMap.get("total_fee");
			String coupon_fee = requestMap.get("coupon_fee");
			String transaction_id = requestMap.get("transaction_id");
			String out_trade_no = requestMap.get("out_trade_no"); //商户订单号
		}
		System.out.println("微信异步回调完成");
	}
}
