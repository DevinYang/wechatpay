package org.apache.jsp.WEB_002dINF.views.wechatpay;

import javax.servlet.*;
import javax.servlet.http.*;
import javax.servlet.jsp.*;
import java.util.*;
import java.util.*;

public final class index_jsp extends org.apache.jasper.runtime.HttpJspBase
    implements org.apache.jasper.runtime.JspSourceDependent {

  private static final JspFactory _jspxFactory = JspFactory.getDefaultFactory();

  private static java.util.List<String> _jspx_dependants;

  static {
    _jspx_dependants = new java.util.ArrayList<String>(3);
    _jspx_dependants.add("/WEB-INF/commons/taglibs.jsp");
    _jspx_dependants.add("/WEB-INF/commons/common-header.jsp");
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
      response.setContentType("text/html;charset=utf-8");
      pageContext = _jspxFactory.getPageContext(this, request, response,
      			null, true, 8192, true);
      _jspx_page_context = pageContext;
      application = pageContext.getServletContext();
      config = pageContext.getServletConfig();
      session = pageContext.getSession();
      out = pageContext.getOut();
      _jspx_out = out;
      _jspx_resourceInjector = (org.glassfish.jsp.api.ResourceInjector) application.getAttribute("com.sun.appserv.jsp.resource.injector");

      out.write("\r\n");
      out.write("<!DOCTYPE html PUBLIC \"-//W3C//DTD XHTML 1.0 Transitional//EN\" \"http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd\">\r\n");
      out.write("<html xmlns=\"http://www.w3.org/1999/xhtml\">\r\n");
      out.write("<head>\r\n");
      out.write("<title>微信支付</title>\r\n");
      out.write("<meta http-equiv=\"Content-Type\" content=\"text/html; charset=UTF-8\" />\r\n");
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
      out.write('\r');
      out.write('\n');
      out.write("<!--<link href=\"");
      out.write((java.lang.String) org.apache.jasper.runtime.PageContextImpl.evaluateExpression("${ctx }", java.lang.String.class, (PageContext)_jspx_page_context, null));
      out.write("/resources/v1/ligerUI/skins/m2.css\" type=\"text/css\" rel=\"stylesheet\" />-->\r\n");
      out.write("<!--<link href=\"");
      out.write((java.lang.String) org.apache.jasper.runtime.PageContextImpl.evaluateExpression("${ctx }", java.lang.String.class, (PageContext)_jspx_page_context, null));
      out.write("/resources/v1/ligerUI/skins/public.css\" type=\"text/css\" rel=\"stylesheet\" />-->\r\n");
      out.write("<!--<link href=\"");
      out.write((java.lang.String) org.apache.jasper.runtime.PageContextImpl.evaluateExpression("${ctx }", java.lang.String.class, (PageContext)_jspx_page_context, null));
      out.write("/resources/v1/ligerUI/skins/public2.css\" type=\"text/css\" rel=\"stylesheet\" />-->\r\n");
      out.write("\r\n");
      out.write("<!--<link href=\"");
      out.write((java.lang.String) org.apache.jasper.runtime.PageContextImpl.evaluateExpression("${ctx}", java.lang.String.class, (PageContext)_jspx_page_context, null));
      out.write("/resources/v1/css/global.css\" type=\"text/css\" rel=\"stylesheet\" />-->\r\n");
      out.write("<!--<link href=\"");
      out.write((java.lang.String) org.apache.jasper.runtime.PageContextImpl.evaluateExpression("${ctx}", java.lang.String.class, (PageContext)_jspx_page_context, null));
      out.write("/resources/v1/css/public.css\" rel=\"stylesheet\" type=\"text/css\" />-->\r\n");
      out.write("<!--<link href=\"");
      out.write((java.lang.String) org.apache.jasper.runtime.PageContextImpl.evaluateExpression("${ctx}", java.lang.String.class, (PageContext)_jspx_page_context, null));
      out.write("/resources/v1/css/m2.css\" rel=\"stylesheet\" type=\"text/css\" />-->\r\n");
      out.write("<script src=\"");
      out.write((java.lang.String) org.apache.jasper.runtime.PageContextImpl.evaluateExpression("${ctx}", java.lang.String.class, (PageContext)_jspx_page_context, null));
      out.write("/resources/v1/jquery/jquery-1.5.2.min.js\" type=\"text/javascript\"></script>\r\n");
      out.write("<script src=\"");
      out.write((java.lang.String) org.apache.jasper.runtime.PageContextImpl.evaluateExpression("${ctx}", java.lang.String.class, (PageContext)_jspx_page_context, null));
      out.write("/resources/v1/jquery/jquery-ui-1.8.14.custom.js\" type=\"text/javascript\"></script>\r\n");
      out.write("<script src=\"");
      out.write((java.lang.String) org.apache.jasper.runtime.PageContextImpl.evaluateExpression("${ctx}", java.lang.String.class, (PageContext)_jspx_page_context, null));
      out.write("/resources/v1/jquery/jquery-ui-i18n.min.js\" type=\"text/javascript\"></script>\r\n");
      out.write("<link href=\"");
      out.write((java.lang.String) org.apache.jasper.runtime.PageContextImpl.evaluateExpression("${ctx}", java.lang.String.class, (PageContext)_jspx_page_context, null));
      out.write("/resources/v1/css/jquery-ui-1.8.13.custom.css\" type=\"text/css\" rel=\"stylesheet\" />\r\n");
      out.write("\r\n");
      out.write("\r\n");
      out.write("<link href=\"");
      out.write((java.lang.String) org.apache.jasper.runtime.PageContextImpl.evaluateExpression("${ctx}", java.lang.String.class, (PageContext)_jspx_page_context, null));
      out.write("/resources/v1/css/client.css\" rel=\"stylesheet\" type=\"text/css\" />  \r\n");
      out.write("<script src=\"");
      out.write((java.lang.String) org.apache.jasper.runtime.PageContextImpl.evaluateExpression("${ctx}", java.lang.String.class, (PageContext)_jspx_page_context, null));
      out.write("/resources/v1/js/client.js\" type=\"text/javascript\"></script>\r\n");
      out.write("<script src=\"");
      out.write((java.lang.String) org.apache.jasper.runtime.PageContextImpl.evaluateExpression("${ctx}", java.lang.String.class, (PageContext)_jspx_page_context, null));
      out.write("/resources/v1/js/calendar.js\" type=\"text/javascript\"></script>\r\n");
      out.write("<script src=\"");
      out.write((java.lang.String) org.apache.jasper.runtime.PageContextImpl.evaluateExpression("${ctx}", java.lang.String.class, (PageContext)_jspx_page_context, null));
      out.write("/resources/v1/js/ScrollPic.js\" type=text/javascript></script>\r\n");
      out.write("<script src=\"");
      out.write((java.lang.String) org.apache.jasper.runtime.PageContextImpl.evaluateExpression("${ctx}", java.lang.String.class, (PageContext)_jspx_page_context, null));
      out.write("/resources/v1/js/dateFormat.js\" type=text/javascript></script>\r\n");
      out.write("\r\n");
      out.write('\r');
      out.write('\n');
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
      out.write("<script type=\"text/javascript\">\r\n");
      out.write("$(function(){\r\n");
      out.write("\t//微信支付\r\n");
      out.write("\t$(\"#pay\").click(function(){\r\n");
      out.write("\t\tvar redirect_uri = encodeURIComponent(\"http://www.taiyitao.com:8020/wechatpay/pay.htm\");\r\n");
      out.write("\t\tvar href = \"https://open.weixin.qq.com/connect/oauth2/authorize?appid=wx421e21355868635e&redirect_uri=\"+redirect_uri+\"&response_type=code&scope=snsapi_base&state=123#wechat_redirect\";\r\n");
      out.write("\t\t$('#pay').attr('href',href);\r\n");
      out.write("\t});\r\n");
      out.write("\t\r\n");
      out.write("\t\r\n");
      out.write("\t//订单查询\r\n");
      out.write("\t$('#query').click(function(){\r\n");
      out.write("\t\tvar href = \"http://www.taiyitao.com:8020/wechatpay/query.htm\";\r\n");
      out.write("\t\t$('#query').attr('href',href);\r\n");
      out.write("\t\talert($('#query').attr('href'));\r\n");
      out.write("\t});\r\n");
      out.write("\t\r\n");
      out.write("\t//订单查询\r\n");
      out.write("\t$('#qcscan').click(function(){\r\n");
      out.write("\t\tvar redirect_uri = encodeURIComponent(\"http://www.taiyitao.com:8020/wechatpay/qcscan.htm\");\r\n");
      out.write("\t\tvar href = \"https://open.weixin.qq.com/connect/oauth2/authorize?appid=wx421e21355868635e&redirect_uri=\"+redirect_uri+\"&response_type=code&scope=snsapi_base&state=123#wechat_redirect\";\r\n");
      out.write("\t\t$('#qcscan').attr('href',href);\r\n");
      out.write("\t});\r\n");
      out.write("})\r\n");
      out.write("\r\n");
      out.write("</script>\r\n");
      out.write("</head>\r\n");
      out.write("<body ontouchstart=\"\">\r\n");
      out.write("<div class=\"wxapi_container\">\r\n");
      out.write("    <div class=\"lbox_close wxapi_form\">\r\n");
      out.write("      <h3 id=\"menu-pay\">微信支付接口</h3>\r\n");
      out.write("      <div align=\"center\">\r\n");
      out.write("      \t<a href=\"#\" id=\"pay\"><span class=\"desc\">1、（测试）JSAPI微信支付连接</span></a>\r\n");
      out.write("      \t<br /><br /><br /><br /><br /><br />\r\n");
      out.write("      \t<a href=\"#\" id=\"query\"><span class=\"desc\">2、（测试）订单查询连接</span></a>\r\n");
      out.write("      \t<br /><br /><br /><br /><br /><br />\r\n");
      out.write("      \t<a href=\"#\" id=\"qcscan\"><span class=\"desc\">3、（测试）扫码业务方式二支付</span></a>\r\n");
      out.write("      </div>\r\n");
      out.write("    </div>\r\n");
      out.write("  </div>\r\n");
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
