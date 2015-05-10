var indexdata = 
[
	{ text: '黑屏扩展',isexpand:false, children: [ 
		{url:"sale/webEterm/webTerm.html",text:"黑屏终端"},
		{url:"sale/webEterm/logSearch.html",text:"黑屏日志"}
	]
    },
    { text: '一般查询',isexpand:false, children: [ 
		{url:"${ctx }/commonquery-order/",text:"订单查询"},
		{url:"sale/checkticket/checkinput.html",text:"客票验证"},
		{url:"search/customer_search.html",text:"客户查询"},
		{ url:"search/payment_search.html",text:"支付查询"},
		//{ url:"search/fax_search.html",text:"传真查询"},
		{ url:"identify/worksearch.html",text:"工单查询"},
		//{url:"search/travel_search.html",text:"行程单查询"},
		{ url:"search/vip_search.html",text:"会员查询"}
	]
    },
    { text: '业务处理', isexpand: false, children: [
		{ text: '报销凭证', isexpand: false, children: [
			{ url: "businessSheet/book_create.html", text: "报销凭证申请" },
			{ url: "businessSheet/book_import_match.html", text: "报销凭证导入配比" },
			{ url: "businessSheet/book_search.html", text: "报销凭证查询" }
		]
		},
		{ text: '兑奖凭证', isexpand: false, children: [
			{ url: "businessSheet/reward_create.html", text: "创建兑奖凭证" },
			{ url: "businessSheet/reward_search.html", text: "兑奖凭证查询" },
			{ url: "businessSheet/reward_no_generate.html", text: "凭证号分配" }
		]
		},
		{ text: '酒店业务', isexpand: false,children:[
		    { url: "businessSheet/hotel_book.html", text: "散客酒店业务台账" },
		    { url: "businessSheet/business_hotel.html", text: "商旅酒店业务台账" },
		    { url: "search/hotel_ledger_search.html", text: "酒店台账查询" }
		]},	
		{ text: '反馈单', isexpand: false, children: [
			{ url: "sale/feedback/feedback_add.html", text:"创建反馈单"},
			{ url: "sale/feedback/feedback_list.html", text: "反馈单查询" },
			{ url: "${ctx }/call/feedback/feddbackType/reflect_type_manage",text:"反馈类型设置"},
			{ url: "${ctx }/call/feddback/externalunit/external",text:"外部单位设置"}
		]
		},
		{ text: '台账', isexpand: false, children: [
			{ url: "businessSheet/transfer_book.html", text: "接送机需求单" },
			{ url: "businessSheet/vip_accounting.html", text: "国内VIP台账" },
			{ url: "businessSheet/bigclient_book.html", text: "国内大客户台账" },
			{ url: "businessSheet/duty_log.html", text: "值班日志" },
			{ url: "businessSheet/ebusiness_seat_book.html", text: "电子商务席记录单台账" },
			{ url: "businessSheet/international_business_confirm.html", text: "国际业务改期确认单台账" },
			{ url: "businessSheet/interviews_mgr.html", text: "质监面谈管理" },
			{ url: "search/ledger_search.html", text: "台账查询" }
			//{ url: "businessSheet/interviews_mgr.html", text: "质监面谈管理" },
			//{ url: "businessSheet/meal_book.html", text: "特殊餐食申请台账" },
		]
		},
		{url:"search/outline_service.html",text:"离线业务"},
		{url:"identify/case_create.html",text:"创建CASE"}
	]
    },
	{ text: '产品管理', isexpand: false, children: [
		{ url: "product/multiseat_manage.html",text:"多等级舱位"},
		{ url: "product/charter_manage.html",text:"包机表"},
		{url:"product/product-Product-index.html",text:"新增产品"},
		{url:"product/product-Product-list.html",text:"查询产品"}
		
	]
    },
	{ text: '系统管理', isexpand: false, children: [
		{ url: "security/userManage.html", text: "用户管理" },
		{ url: "security/roleManage.html", text: "角色管理" },
		{ url: "security/permManage.html", text: "权限管理" },
		{ url: "security/userGroupManage.html", text: "部门组管理" },
		{ url: "memberManager/userprefer_manage.html", text: "旅客偏好管理" },
		{ url: "sale/carrier_manage.html", text: "承运人管理" },
		{ url: "sale/payment_manage.html", text: "支付管理" },
		{ url: "product/airport_manage.html",text:"机场信息维护"},
		{ url: "identify/case_type_manage.html",text:"Case类型管理"}
		//{ url: "welcome.html", text: "权限分配" },
		
	]
    },
    { text: '附加服务', isexpand: false, children: [
		{ url: "sale/specialService/meal_service.html", text: "特殊餐食" },
		//{ url: "search/dynamicInfo_search.html", text: "航班动态" },
		{ url: "search/message_search.html", text: "短信管理" },
		{ url: "sale/message_manage.html", text: "短信模板设置" },
		{ url: "search/q_handle.html", text: "Q处理" }
		//{ url: "sale/specialService/seatbook_service.html", text: "预选座位" }
		//{ url: "search/dynamicInfo_search.html", text: "航班动态提醒" }
		//{ url: "welcome.html", text: "货币转换器" }
		//{ url: "search/outtime_notify.html", text: "超时清" },
		//{ url: "search/itinerary_quick_print.html", text: "行程单快速打印" },
		//{ url: "search/itinerary_batch_print.html", text: "行程单批量打印" },
	]
    },
    { text: '统计报表', isexpand: false, children: [
		{ text: '销售监控报表', isexpand: false, children: [
			{ url: "report/sales/salesEntryMineReport.html", text: "我的出票统计表" },
			{ url: "report/sales/salesEntryPersonalReport.html", text: "个人出票汇总表" },
			{ url: "report/sales/salesEntryTotalReport.html", text: "航空公司销量统计" },
			//{ url: "report/sales/salesPostponeReport.html", text: "改期升舱销售统计" },
			{ url: "report/sales/salesDetailReport.html", text: "国内销售明细表" },
			{ url: "report/sales/InternationalTicketReport.html", text: "国际客票明细表" },
			//{ url: "report/sales/freeExchangeTicketReport.html", text: "免票兑换明细表" },
			{ url: "report/sales/receiptsReport.html", text: "收款单报表下载" },
			{ url: "report/sales/refundReport.html", text: "退款单查询报表" },
			{ url: "report/sales/offlinePaymentReport.html", text: "线下支付统计" },
			{ url: "report/sales/paymentModeReport.html", text: "支付方式统计" },
			{ url: "report/sales/orderCountReport.html", text: "订单明细报表" },
			{ url: "report/sales/orderStatusReport.html", text: "订单状态监控" },
			{ url: "report/sales/cleanQueReport.html", text: "清Q量统计表" },
			{ url: "report/sales/feedbackCountReport.html", text: "反馈单统计表" },
			{ url: "report/sales/efficiencyBMReport.html", text: "退改签效率统计" }
		]
		},
		{ text: '常客报表', isexpand: false, children: [
			{ url: "report/ffp/personalSalesReport.html", text: "我的销售统计" },
			{ url: "report/ffp/ticketSalesReport.html", text: "客票销售明细" },
			{ url: "report/ffp/prizeSalesReport.html", text: "奖励品销售统计" },
			{ url: "report/ffp/workloadSalesReport.html", text: "工作量统计表" }
		]
		},
		{ text: '质监报表', isexpand: false, children: [
			{ url: "report/quality/tapePerformanceAssessReport.html", text: "录音绩效考核表" },
			{ url: "report/quality/performanceAssessReport.html", text: "绩效考核成绩表" },
			{ url: "report/quality/staffScoresAssessReport.html", text: "员工成绩评估表" },
			{ url: "report/quality/scoresMaintainReport.html", text: "质监成绩维护表" },
			{ url: "report/quality/interviews.html", text: "质监面谈统计表" },
			{ url: "report/quality/workloadCountReport.html", text: "工作量统计表" }
		]
		},
		{ text: '话务报表', isexpand: false, children: [
			{ url: "report/regulars/communicationTypeReport.html", text: "CASE统计报表" },
			{ url: "report/regulars/callInCaseReport.html", text: "来电号码业务类型" },
			{ url: "report/regulars/callInCityReport.html", text: "客户来电城市统计" }
		]
		},	
		{ text: '财务报表', isexpand: false, children: [
			{ url: "report/financial/InternationalPaymentReport.html", text: "电话支付收入表" },
			{ url: "report/financial/paymentRefundReport.html", text: "电话支付退货表" },
			//{ url: "report/financial/PaymentModeCountReport.html", text: "支付方式汇总表" },
			{ url: "report/financial/monthlyPaymentReport.html", text: "月结支付明细表" },
			{ url: "report/sales/transferIncomeReport.html", text: "转账支付收入表" },
			{ url: "report/sales/transferReturnReport.html", text: "转账支付退货表" }
		]
		},
		{ text: '后台管理报表', isexpand: false, children: [
			{ url: "report/manage/loginInfoReport.html", text: "用户登录统计表" }
		]
		}
	]
    },
    { text: '业务系统', isexpand: false, children: [
		{ url: "http://www.hnair.com", text: "海南航空" },
		{ url: "http://www.tianjin-air.com", text: "天津航空" },
		{ url: "http://www.chinawestair.com", text: "西部航空" },
		{ url: "http://report.luckyair.net", text: "翔鹏航空" },
		{ url: "http://www.capitalairlines.com.cn", text: "首都航空" },
		{ url: "http://10.2.41.12/kb/kb_login.asp", text: "知识库" },
		{ url: "welcome.html", text: "考试系统" },
		{ url: "welcome.html", text: "服务信息网" },
		{ url: "welcome.html", text: "大客户信息网" },
		{ url: "welcome.html", text: "大新华商旅网" } 
	]
    }
];

