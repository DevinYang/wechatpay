package org.apache.jsp.WEB_002dINF.views.wechatpay;

import javax.servlet.*;
import javax.servlet.http.*;
import javax.servlet.jsp.*;
import java.util.*;
import java.util.*;

public final class pay_jsp extends org.apache.jasper.runtime.HttpJspBase
    implements org.apache.jasper.runtime.JspSourceDependent {

  private static final JspFactory _jspxFactory = JspFactory.getDefaultFactory();

  private static java.util.List<String> _jspx_dependants;

  static {
    _jspx_dependants = new java.util.ArrayList<String>(2);
    _jspx_dependants.add("/WEB-INF/commons/taglibs.jsp");
    _jspx_dependants.add("/WEB-INF/commons/common-header-validate.jsp");
  }

  private org.apache.jasper.runtime.TagHandlerPool _jspx_tagPool_c_set_var_value_nobody;

  private org.glassfish.jsp.api.ResourceInjector _jspx_resourceInjector;

  public java.util.List<String> getDependants() {
    return _jspx_dependants;
  }

  public void _jspInit() {
    _jspx_tagPool_c_set_var_value_nobody = org.apache.jasper.runtime.TagHandlerPool.getTagHandlerPool(getServletConfig());
  }

  public void _jspDestroy() {
    _jspx_tagPool_c_set_var_value_nobody.release();
  }

  public void _jspService(HttpServletRequest request, HttpServletResponse response)
        throws java.io.IOException, ServletException {

    PageContext pageContext = null;
    HttpSession session = null;
    ServletContext application = null;
    ServletConfig config = null;
    JspWriter out = null;
    Object page = this;
    JspWriter _jspx_out = null;
    PageContext _jspx_page_context = null;

    try {
      response.setContentType("text/html;charset=UTF-8");
      pageContext = _jspxFactory.getPageContext(this, request, response,
      			null, true, 8192, true);
      _jspx_page_context = pageContext;
      application = pageContext.getServletContext();
      config = pageContext.getServletConfig();
      session = pageContext.getSession();
      out = pageContext.getOut();
      _jspx_out = out;
      _jspx_resourceInjector = (org.glassfish.jsp.api.ResourceInjector) application.getAttribute("com.sun.appserv.jsp.resource.injector");

      out.write('\r');
      out.write('\n');

	String path = request.getContextPath();
	String basePath = request.getScheme() + "://"
			+ request.getServerName() + ":" + request.getServerPort()
			+ path + "/";

      out.write('\r');
      out.write('\n');
      out.write("\r\n");
      out.write("\r\n");
      out.write("\r\n");
      out.write("\r\n");
      out.write("\r\n");
      out.write("\r\n");
      if (_jspx_meth_c_set_0(_jspx_page_context))
        return;
      out.write('\r');
      out.write('\n');
      out.write("\r\n");
      out.write("<!DOCTYPE html PUBLIC \"-//W3C//DTD XHTML 1.0 Transitional//EN\" \"http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd\">\r\n");
      out.write("<html xmlns=\"http://www.w3.org/1999/xhtml\">\r\n");
      out.write("<head>\r\n");
      out.write("<title>微信支付测试</title>\r\n");
      out.write("<meta http-equiv=\"Content-Type\" content=\"text/html; charset=UTF-8\" />\r\n");
      out.write("<link href=\"");
      out.write((java.lang.String) org.apache.jasper.runtime.PageContextImpl.evaluateExpression("${ctx}", java.lang.String.class, (PageContext)_jspx_page_context, null));
      out.write("/resources/v1/css/global.css\" rel=\"stylesheet\"\r\n");
      out.write("\ttype=\"text/css\" />\r\n");
      out.write("<script src=\"");
      out.write((java.lang.String) org.apache.jasper.runtime.PageContextImpl.evaluateExpression("${ctx}", java.lang.String.class, (PageContext)_jspx_page_context, null));
      out.write("/resources/v1/jquery/jquery-1.5.2.min.js\"\r\n");
      out.write("\ttype=\"text/javascript\" />\r\n");
      out.write("\r\n");
      out.write("<meta http-equiv=\"Content-Type\" content=\"text/html; charset=utf-8\" />\r\n");
      out.write("<script src=\"");
      out.write((java.lang.String) org.apache.jasper.runtime.PageContextImpl.evaluateExpression("${ctx}", java.lang.String.class, (PageContext)_jspx_page_context, null));
      out.write("/resources/v1/jquery-validation/jquery.metadata.js\"type=\"text/javascript\"></script>\r\n");
      out.write("<script src=\"");
      out.write((java.lang.String) org.apache.jasper.runtime.PageContextImpl.evaluateExpression("${ctx}", java.lang.String.class, (PageContext)_jspx_page_context, null));
      out.write("/resources/v1/jquery-validation/jquery.validate.min.js\" type=\"text/javascript\"></script>\r\n");
      out.write("<script src=\"");
      out.write((java.lang.String) org.apache.jasper.runtime.PageContextImpl.evaluateExpression("${ctx}", java.lang.String.class, (PageContext)_jspx_page_context, null));
      out.write("/resources/v1/jquery-validation/messages_cn.js\" type=\"text/javascript\"></script>\r\n");
      out.write("<script src=\"");
      out.write((java.lang.String) org.apache.jasper.runtime.PageContextImpl.evaluateExpression("${ctx}", java.lang.String.class, (PageContext)_jspx_page_context, null));
      out.write("/resources/v1/js/common-validation.js\" type=\"text/javascript\"></script>\r\n");
      out.write("\r\n");
      out.write("<style>\r\n");
      out.write("body {\r\n");
      out.write("\tpadding: 0;\r\n");
      out.write("\tmargin: 0\r\n");
      out.write("}\r\n");
      out.write("\r\n");
      out.write(".order_detail {\r\n");
      out.write("\tmargin-bottom: 30px;\r\n");
      out.write("}\r\n");
      out.write("\r\n");
      out.write("p {\r\n");
      out.write("\tfont-family: \"微软雅黑\";\r\n");
      out.write("\tmargin: 0\r\n");
      out.write("}\r\n");
      out.write("\r\n");
      out.write("i {\r\n");
      out.write("\tfont-style: normal\r\n");
      out.write("}\r\n");
      out.write("\r\n");
      out.write(".order_title {\r\n");
      out.write("\tpadding: 15px 0 20px;\r\n");
      out.write("\ttext-align: center\r\n");
      out.write("}\r\n");
      out.write("\r\n");
      out.write(".order_box {\r\n");
      out.write("\tbackground: #fff;\r\n");
      out.write("\tborder-top: 1px solid #ececec;\r\n");
      out.write("\tborder-bottom: 1px solid #ececec;\r\n");
      out.write("\tpadding: 15px 20px\r\n");
      out.write("}\r\n");
      out.write("\r\n");
      out.write(".order_box>p {\r\n");
      out.write("\toverflow: hidden;\r\n");
      out.write("\tline-height: 30px\r\n");
      out.write("}\r\n");
      out.write("\r\n");
      out.write(".order_box_title {\r\n");
      out.write("\tcolor: #858585;\r\n");
      out.write("\tfloat: left\r\n");
      out.write("}\r\n");
      out.write("\r\n");
      out.write(".order_box_text {\r\n");
      out.write("\tfloat: right\r\n");
      out.write("}\r\n");
      out.write("\r\n");
      out.write(".order_button {\r\n");
      out.write("\tmargin-top: 20px;\r\n");
      out.write("\tpadding: 0 10px\r\n");
      out.write("}\r\n");
      out.write("\r\n");
      out.write(".order_button button {\r\n");
      out.write("\tcolor: #fff;\r\n");
      out.write("\tbackground: #27a831;\r\n");
      out.write("\twidth: 100%;\r\n");
      out.write("\tpadding: 10px 0;\r\n");
      out.write("\tborder-radius: 10px;\r\n");
      out.write("\tfont-size: 16px;\r\n");
      out.write("\tfont-weight: bold;\r\n");
      out.write("\tborder: 1px solid #6d706e\r\n");
      out.write("}\r\n");
      out.write("</style>\r\n");
      out.write("<script type=\"text/javascript\">\r\n");
      out.write("\tfunction jspay123() {\r\n");
      out.write("\t\tvar str = window.navigator.userAgent;\r\n");
      out.write("\t\tvar version = str.substring(8, 11);\r\n");
      out.write("\t\tif (version != \"5.0\") {\r\n");
      out.write("\t\t\talert(\"微信浏览器系统版本过低，请将微信升级至5.0以上\");\r\n");
      out.write("\t\t} else {\r\n");
      out.write("\t\t\tWeixinJSBridge.invoke('getBrandWCPayRequest', {\r\n");
      out.write("\t\t\t\t\"appId\" : \"");
      out.write((java.lang.String) org.apache.jasper.runtime.PageContextImpl.evaluateExpression("${appId}", java.lang.String.class, (PageContext)_jspx_page_context, null));
      out.write("\", //公众号名称，由商户传入\r\n");
      out.write("\t\t\t\t\"timeStamp\" : \"");
      out.write((java.lang.String) org.apache.jasper.runtime.PageContextImpl.evaluateExpression("${timeStamp}", java.lang.String.class, (PageContext)_jspx_page_context, null));
      out.write("\", //时间戳\r\n");
      out.write("\t\t\t\t\"nonceStr\" : \"");
      out.write((java.lang.String) org.apache.jasper.runtime.PageContextImpl.evaluateExpression("${nonceStr}", java.lang.String.class, (PageContext)_jspx_page_context, null));
      out.write("\", //随机串\r\n");
      out.write("\t\t\t\t\"package\" : \"");
      out.write((java.lang.String) org.apache.jasper.runtime.PageContextImpl.evaluateExpression("${package}", java.lang.String.class, (PageContext)_jspx_page_context, null));
      out.write("\",//统一支付接口返回的prepay_id 参数值，提交格式如：prepay_id=***\r\n");
      out.write("\t\t\t\t\"signType\" : \"");
      out.write((java.lang.String) org.apache.jasper.runtime.PageContextImpl.evaluateExpression("${signType}", java.lang.String.class, (PageContext)_jspx_page_context, null));
      out.write("\", //微信签名方式:sha1\r\n");
      out.write("\t\t\t\t\"paySign\" : \"");
      out.write((java.lang.String) org.apache.jasper.runtime.PageContextImpl.evaluateExpression("${paySign}", java.lang.String.class, (PageContext)_jspx_page_context, null));
      out.write("\" //微信签名\r\n");
      out.write("\t\t\t}, function(res) {\r\n");
      out.write("\t\t\t\tif (res.err_msg == \"get_brand_wcpay_request:ok\") {\r\n");
      out.write("\t\t\t\t\twindow.location.href = \"/wensha/jsp/orderSuccess.jsp\";\r\n");
      out.write("\t\t\t\t} else if (res.err_msg == \"get_brand_wcpay_request:cancel\") {\r\n");
      out.write("\t\t\t\t\talert(\"取消支付\");\r\n");
      out.write("\t\t\t\t} else if (res.err_msg == \"get_brand_wcpay_request:fail\") {\r\n");
      out.write("\t\t\t\t\talert(\"支付失败\");\r\n");
      out.write("\t\t\t\t}\r\n");
      out.write("\t\t\t});\r\n");
      out.write("\r\n");
      out.write("\t\t}\r\n");
      out.write("\r\n");
      out.write("\t}\r\n");
      out.write("</script>\r\n");
      out.write("</head>\r\n");
      out.write("<body style=\"background: #f5f5f5\">\r\n");
      out.write("\t<div class=\"order_detail\">\r\n");
      out.write("\t\t<div class=\"order_title\">\r\n");
      out.write("\t\t\t<p style=\"font-weight: bold; margin-bottom: 5px\">温莎包房预订</p>\r\n");
      out.write("\t\t\t<p style=\"font-size: 24px; margin-top: 0px\">￥");
      out.write((java.lang.String) org.apache.jasper.runtime.PageContextImpl.evaluateExpression("${payMoney}", java.lang.String.class, (PageContext)_jspx_page_context, null));
      out.write("元</p>\r\n");
      out.write("\t\t</div>\r\n");
      out.write("\r\n");
      out.write("\t\t<div class=\"order_box\">\r\n");
      out.write("\t\t\t<p>\r\n");
      out.write("\t\t\t\t<i class=\"order_box_title\">收款方</i><i class=\"order_box_text\">温莎KTV量贩</i>\r\n");
      out.write("\t\t\t</p>\r\n");
      out.write("\t\t\t<p>\r\n");
      out.write("\t\t\t\t<i class=\"order_box_title\">商 品</i><i class=\"order_box_text\">温莎包房预订</i>\r\n");
      out.write("\t\t\t</p>\r\n");
      out.write("\t\t</div>\r\n");
      out.write("\t</div>\r\n");
      out.write("\t<div align=\"center\"><a href=\"#\" class=\"red-btn mar_0_10 mar_b_20\" onclick=\"jspay123();\">立即支付</a></div>\r\n");
      out.write("\t\r\n");
      out.write("\t<br>\r\n");
      out.write("</body>\r\n");
      out.write("</html>\r\n");
    } catch (Throwable t) {
      if (!(t instanceof SkipPageException)){
        out = _jspx_out;
        if (out != null && out.getBufferSize() != 0)
          out.clearBuffer();
        if (_jspx_page_context != null) _jspx_page_context.handlePageException(t);
        else throw new ServletException(t);
      }
    } finally {
      _jspxFactory.releasePageContext(_jspx_page_context);
    }
  }

  private boolean _jspx_meth_c_set_0(PageContext _jspx_page_context)
          throws Throwable {
    PageContext pageContext = _jspx_page_context;
    JspWriter out = _jspx_page_context.getOut();
    //  c:set
    org.apache.taglibs.standard.tag.rt.core.SetTag _jspx_th_c_set_0 = (org.apache.taglibs.standard.tag.rt.core.SetTag) _jspx_tagPool_c_set_var_value_nobody.get(org.apache.taglibs.standard.tag.rt.core.SetTag.class);
    _jspx_th_c_set_0.setPageContext(_jspx_page_context);
    _jspx_th_c_set_0.setParent(null);
    _jspx_th_c_set_0.setVar("ctx");
    _jspx_th_c_set_0.setValue((java.lang.Object) org.apache.jasper.runtime.PageContextImpl.evaluateExpression("${pageContext.request.contextPath}", java.lang.Object.class, (PageContext)_jspx_page_context, null));
    int _jspx_eval_c_set_0 = _jspx_th_c_set_0.doStartTag();
    if (_jspx_th_c_set_0.doEndTag() == javax.servlet.jsp.tagext.Tag.SKIP_PAGE) {
      _jspx_tagPool_c_set_var_value_nobody.reuse(_jspx_th_c_set_0);
      return true;
    }
    _jspx_tagPool_c_set_var_value_nobody.reuse(_jspx_th_c_set_0);
    return false;
  }
}
