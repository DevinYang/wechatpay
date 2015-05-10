/*var $cabin = $.CabinSelectRule;
var cabin = new $myCabin(this,{
		carrier:"HU",//承运人
		cardType:1,//金鹏卡 (1) 金鹿卡(0) MemberCardDto.accountType
		cardLevel:'GOLDEN',//卡等级：金卡(GOLDEN)、银卡(SILVER)、普通卡(STANDARD)
		isCharter:false,//true：包机 false：非包机
		isGuarantee:false,//true：保底补贴 false：非保底补贴
		stop:0,//经停
		cabin:'S',//仓位：P、J、S、W
		planType:'B787',
		isGoldweek:false,//true:黄金周 false：非黄金周
		cabinStatus:'Q',//座位状态：Q、S、A(>9)、自然销售
		seats:'A',	//空余座位数:数字、或A
		reserve:3,//旅客预定座位数
		on:'' //航班起飞时间
	});
var result = cabin.getResult();*/

/**
 * #CabinSelectRule验证规则,最多可预定座位数
 * #格式说明：
 * #"5@JP":金鹏卡5个座位
 * #"5@JL":金鹿卡5个座位
 * #"5@JPJL":金鹏卡+金鹿卡共计5个座位
 * 例子
 */

( function($) {
	
	var CabinSelectRule = $.CabinSelectRule = function(el, options) {
		this.el = el;
		this.options = $.extend({},this.options, options);
		this.init();
	};
	
	$.fn.CabinSelectRule = function(options) {
		options = options || {};
		return this.each( function() {
			new CabinSelectRule(this, options);
		});
	};
//	金鹏卡、卡等级、包机、保底补贴、直飞、仓位、机型、黄金周、座位状态(Q、S、自然销售)
	// 扩展原型
	$.extend(CabinSelectRule.prototype, {
		result:{
			ruleStr:null,	//兑换标准
			exchanged:false,//能否兑换
			overK:false,	//能否超K
			ruleInfo:""
			
		},
		options :{
			carrier:null,//承运人
			cardType :null,//金鹏卡or金鹿卡 MemberCardDto.accountType
			cardLevel:null,//卡等级：金卡、银卡、普通卡
			isCharter:null,//true：包机 false：非包机
			isGuarantee:null,//true：保底补贴 false：非保底补贴
			stops:null,//经停
			cabin:null,//仓位：P、J、S、W
			planType:null,//机型
			isGoldweek:null,//true:黄金周 false：非黄金周
			cabinStatus:null,//座位状态：Q、S、A(>9)、自然销售
			seats:null,//剩余座位数
			reserve:null,//预定座位数
			on:null,//航班起飞日期
			departTime:null//起飞时间
		},
		
		init:function(){
			var mycabin=this;
			var opt=mycabin.options;
			mycabin.entryExchanged(opt);
			if(this.result.exchanged){
				mycabin.entryOverK(opt);
				mycabin.entryRule(opt);
			}
		},
		getResult:function(){
			return this.result;
		},
		entryRule:function(opt){
			if(opt.carrier == "HU"){
				if(opt.isCharter == false || opt.isCharter == "false") {//自营
					this.stopRule(opt);
				}
				if(opt.isCharter == true) {//包机
					this.charterRule(opt);
				} 
				if(opt.isGuarantee == true) {//保底补贴
					this.guaranteeRule(opt);
				}
			}
		},
		
		entryExchanged:function(opt){
			if(opt.carrier == "HU"){
				if(opt.isCharter == false || opt.isCharter == "false") {//自营
					this.exchangedFun(opt);
				}
				if(opt.isCharter == true || opt.isCharter == "true") {//包机
					this.result.exchanged = true;
				} 
				if(opt.isGuarantee == true || opt.isCharter == "true") {//保底补贴
					this.result.exchanged = true;
				}
			}else{
				this.result.exchanged = false;
			}
		},
		
		entryOverK:function(opt){
			if(opt.carrier == "HU"){
				if(opt.isCharter == false || opt.isCharter == "false") {//自营
					this.overKFun(opt);
				}
				if(opt.isCharter == true || opt.isCharter == "true") {//包机
					this.result.overK = false;
				} 
				if(opt.isGuarantee == true || opt.isCharter == "true") {//保底补贴
					this.result.overK = false;
				}
			}else{
				this.result.overK = false;
			}
		},
		
		overKFun : function(opt){//能否超K
			if(opt.cabin == "P" || opt.cabin == "J"){
				this.superKRule1(opt);
			}
			if(opt.cabin == "S"){
				this.superKRule2(opt);
			}
		},
		
		exchangedFun:function(opt){//能否兑换
			//自然销售、S支持兑换
//			if(opt.cabinStatus== "A" || opt.cabinStatus.match(/^\+?[1-9][0-9]*$/)|| opt.cabinStatus == "S"){
//				this.result.exchanged = true;	
//			}
//			
//			//Q状态下，黄金周只允许金、银卡会员兑换
//			if(opt.cabinStatus == "Q"){
//				this.result.exchanged = true;
//				if(opt.isGoldweek){
//					if(opt.cardLevel != "GOLDEN" && opt.cardLevel != "SILVER"){
//						this.result.exchanged = false;
//					}
//				}
//			}
			this.result.exchanged = true;
			if(opt.cabinStatus == "Q"){
				
				if(opt.isGoldweek){
					if(opt.cardLevel != "GOLDEN" && opt.cardLevel != "SILVER"){
						this.result.exchanged = false;
					}
				}
			} 
		},
		
		superKRule1:function(opt){
			if(this.beforetwoHours(opt.on,opt.departTime)){//起飞前两小时
				if(opt.seats == "A" || opt.seats.match(/^\+?[1-9][0-9]*$/)){	//还有空座位
//					alert("seats:"+opt.seats);
					this.result.overK = true;
				}
				if(opt.seats!="A" && opt.seats-opt.reserve>=0){
					this.result.overK = true;
				}
			}
		},
		superKRule2:function(opt){
			if(this.onthatday(opt.on)){//起飞当日
				if(opt.seats == "A"){
					this.result.overK = true;
				}
			}
		},
		onthatday:function(on){
			var formartOn = setFormatDate(on).split("-");
			var flightOn = new Date(formartOn[0],formartOn[1]-1,formartOn[2]); 
			
			var now = new Date();
			var year = now.getFullYear();
			var month = now.getMonth();
			var date = now.getDate();
			
			var today = new Date(year,month,date);
			return flightOn.getTime()==today.getTime() ? true : false;
		},
		
		beforetwoHours:function(on,departTime){
			
			var formartOn = setFormatDate(on).split("-");
			var formartHour = departTime.substring(0,2);
			var formartMin = departTime.substring(2,4);
			
			var nowdate=new Date();  
			
			var year = nowdate.getFullYear();
			var month = nowdate.getMonth();
			var date = nowdate.getDate();
			var hour = nowdate.getHours();
			var min = nowdate.getMinutes();
			
			var nowdate2 = new Date(year,month,date,hour,min,0);
			var flightTime = new Date(formartOn[0],formartOn[1]-1,formartOn[2],formartHour,formartMin,0);
			
			var date3=flightTime.getTime()-nowdate2.getTime();  //时间差的毫秒数
			if(date3<2*3600*1000){//两小时内
				return true;
			}
			return false;
		},
		
		cabinStatusRule_1:function(opt){
			if(opt.cabinStatus == "S"){
				this.result.ruleStr = this.getRule_1_JP_5();
			}
			if(opt.cabinStatus == "Q"){
				this.result.ruleStr =this.getRule_2_JP_2();
			}
		},
		cabinStatusRule_2:function(opt){
			if(opt.cabinStatus == "S"){
				this.result.ruleStr = this.getRule_3_JP_15();
			}
			if(opt.cabinStatus == "Q"){
				this.result.ruleStr = this.getRule_1_JP_5();
			}
		},
		cabinStatusRule_3:function(opt){
			if(opt.cabinStatus == "S"){
				this.result.ruleStr = this.getRule_1_JP_5();
			}
			if(opt.cabinStatus == "Q"){
				this.result.ruleStr = this.getRule_2_JP_2();
			}
		},
		cabinStatusRule_4:function(opt){
			if(opt.cabinStatus == "S"){
				this.result.ruleStr = this.getRule_4_JP_8();
			}
			if(opt.cabinStatus == "Q"){
				this.result.ruleStr = this.getRule_1_JP_5();
			}
		},
		cabinStatusRule_5_P:function(opt){
			if(opt.cabinStatus == "S"){
				this.result.ruleStr = this.getRule_1_JP_5();
			}
			if(opt.cabinStatus == "Q"){
				this.result.ruleStr = this.getRule_2_JP_2();
			}
		},
		cabinStatusRule_5_J:function(opt){
			if(opt.cabinStatus == "S"){
				this.result.ruleStr = this.getRule_1_JP_5();
			}
			if(opt.cabinStatus == "Q"){
				this.result.ruleStr = this.getRule_2_JP_2();
			}
		},
		cabinStatusRule_6_P:function(opt){
			if(opt.cabinStatus == "S"){
				this.result.ruleStr = this.getRule_4_JP_8();
			}
			if(opt.cabinStatus == "Q"){
				this.result.ruleStr = this.getRule_1_JP_5();
			}
		},
		cabinStatusRule_6_J:function(opt){
			if(opt.cabinStatus == "S"){
				this.result.ruleStr = this.getRule_3_JP_15();
			}
			if(opt.cabinStatus == "Q"){
				this.result.ruleStr = this.getRule_1_JP_5();
			}
		},
		cabinStatusRule_7:function(opt){
			if(opt.cabinStatus == "S"){
				this.result.ruleStr = this.getRule_1_JP_5();
			}
			if(opt.cabinStatus == "Q"){
				this.result.ruleStr = this.getRule_2_JP_2();
			}
		},
		cabinStatusRule_8:function(opt){
			if(opt.cabinStatus == "S"){
				this.result.ruleStr = this.getRule_4_JP_8();
			}
			if(opt.cabinStatus == "Q"){
				this.result.ruleStr = this.getRule_1_JP_5();
			}
		},
		cabinStatusRule_9:function(opt){
			if(opt.cabinStatus == "S"){
				this.result.ruleStr = this.getRule_2_JP_2();
			}
			if(opt.cabinStatus == "Q"){
				this.result.ruleStr = this.getRule_5_JP_0();
			}
		},
		cabinStatusRule_10:function(opt){
			if(opt.cabinStatus == "S"){
				this.result.ruleStr = this.getRule_6_JP_3();
			}
			if(opt.cabinStatus == "Q"){
				this.result.ruleStr = this.getRule_2_JP_2();
			}
		},
		cabinStatusRule_11:function(opt){
//			alert(opt.cabinStatus);
//			alert(opt.cabinStatus.match(/^\+?[1-9][0-9]*$/));
//			if(opt.cabinStatus == "A" || opt.cabinStatus.match(/^\+?[1-9][0-9]*$/)){
//				this.result.ruleInfo = "自营@直飞&黄金周&S(A)|S(自然销售)&其他机型";
//				this.result.ruleStr = this.getRule_7_JPJL_6();
//			}
			if(opt.cabinStatus == "S"){
				this.result.ruleInfo = "自营&直飞&黄金周&S(S)&其他机型";
				this.result.ruleStr = this.getRule_5_JP_0();
			}
			if(opt.cabinStatus == "Q"){
				this.result.ruleInfo = "自营&直飞&黄金周&S(Q)&其他机型";
				this.result.ruleStr = this.getRule_2_JP_2();
			}
		},
		cabinStatusRule_12:function(opt){
//			if(opt.cabinStatus == "A" || opt.cabinStatus.match(/^\+?[1-9][0-9]*$/)){
//				this.result.ruleInfo = "自营&直飞&非黄金周&S(A)|S(自然销售)&其他机型";
//				this.result.ruleStr = this.getRule_9_JPJL_10();
//			}
			if(opt.cabinStatus == "Q"){
				this.result.ruleInfo = "自营&直飞&非黄金周&S(Q)&其他机型";
				this.result.ruleStr = this.getRule_6_JP_3();
			}
			if(opt.cabinStatus == "S"){
				this.result.ruleInfo = "自营&直飞&非黄金周&S(S)&其他机型";
				this.result.ruleStr = this.getRule_5_JP_0();
			}
		},
		cabinStatusRule_13:function(opt){
//			if(opt.cabinStatus == "A" || opt.cabinStatus.match(/^\+?[1-9][0-9]*$/)){
//				this.result.ruleInfo = "自营&直飞&黄金周&S(A)|S(自然销售)&其他机型";
//				this.result.ruleStr = this.getRule_7_JPJL_6();
//			}
			if(opt.cabinStatus == "Q"){
				this.result.ruleInfo = "自营&直飞&黄金周&S(Q)&其他机型";
				this.result.ruleStr = this.getRule_11_JP_1();
			}
			if(opt.cabinStatus == "S"){
				this.result.ruleInfo = "自营&直飞&黄金周&S(S)&其他机型";
				this.result.ruleStr = this.getRule_5_JP_0();
			}
		},

		cabinStatusRule_14:function(opt){//2\1
			if(opt.cabinStatus == "S"){
				this.result.ruleStr = this.getRule_2_JP_2();
			}
			if(opt.cabinStatus == "Q"){
				this.result.ruleStr = this.getRule_11_JP_1();
			}
		},
		cabinStatusRule_15:function(opt){//7\2
			if(opt.cabinStatus == "S"){
				this.result.ruleStr = this.getRule_13_JP_7();
			}
			if(opt.cabinStatus == "Q"){
				this.result.ruleStr = this.getRule_2_JP_2();
			}
		},
		cabinStatusRule_16:function(opt){//4\2
			if(opt.cabinStatus == "S"){
				this.result.ruleStr = this.getRule_12_JP_4();
			}
			if(opt.cabinStatus == "Q"){
				this.result.ruleStr = this.getRule_2_JP_2();
			}
		},
		cabinStatusRule_17:function(opt){//1\0
			if(opt.cabinStatus == "S"){
				this.result.ruleStr = this.getRule_11_JP_1();
			}
			if(opt.cabinStatus == "Q"){
				this.result.ruleStr = this.getRule_5_JP_0();
				//this.result.ruleStr = this.getRule_11_JP_1();
			}
		},
		cabinStatusRule_18:function(opt){//1\1
			if(opt.cabinStatus == "S"){
				this.result.ruleStr = this.getRule_11_JP_1();
			}
			if(opt.cabinStatus == "Q"){
				this.result.ruleStr = this.getRule_11_JP_1();
			}
		},
		cabinStatusRule_19:function(opt){//3\1
			if(opt.cabinStatus == "S"){
				this.result.ruleStr =  this.getRule_14_JPJL_3();
			}
			if(opt.cabinStatus == "Q"){
				this.result.ruleStr =  this.getRule_15_JPJL_1();
			}
		},
		cabinStatusRule_20:function(opt){//5\2
			if(opt.cabinStatus == "S"){
				this.result.ruleStr =  this.getRule_16_JPJL_5();
			}
			if(opt.cabinStatus == "Q"){
				this.result.ruleStr = this.getRule_2_JP_2();
			}
		},
		goldweekRule_1:function(opt){
			if(opt.isGoldweek){
				this.cabinStatusRule_1(opt);
			}else{
				this.cabinStatusRule_2(opt);
			}
		},
		goldweekRule_2:function(opt){
			if(opt.isGoldweek){
				this.cabinStatusRule_3(opt);
			}else{
				this.cabinStatusRule_4(opt);
			}
		},
		goldweekRule_3_P:function(opt){
			if(opt.isGoldweek){
				this.cabinStatusRule_5_P(opt);
			}else{
				this.cabinStatusRule_6_P(opt);
			}
		},
		goldweekRule_3_J:function(opt){
			if(opt.isGoldweek){
				this.cabinStatusRule_5_J(opt);
			}else{
				this.cabinStatusRule_6_J(opt);
			}
		},
		goldweekRule_4:function(opt){
			if(opt.isGoldweek){
				this.cabinStatusRule_7(opt);
			}else{
				this.cabinStatusRule_8(opt);
			}
		},
		goldweekRule_5:function(opt){
			if(opt.isGoldweek){
				this.cabinStatusRule_9(opt);
			}else{
				this.cabinStatusRule_10(opt);
			}
		},
		goldweekRule_6:function(opt){
			if(opt.isGoldweek){
				this.cabinStatusRule_11(opt);
			}else{
				this.cabinStatusRule_12(opt);
			}
		},
		goldweekRule_7:function(opt){
			if(opt.isGoldweek){
				this.cabinStatusRule_13(opt);
			}else{
				this.cabinStatusRule_12(opt);
			}
		},
		goldweekRule_8:function(opt){
			if(opt.isGoldweek){
				this.cabinStatusRule_14(opt);//2\1
			}else{
				this.cabinStatusRule_15(opt);//7\2
			}
		},
		goldweekRule_9:function(opt){
			if(opt.isGoldweek){
				this.cabinStatusRule_14(opt);//2\1
			}else{
				this.cabinStatusRule_16(opt);//4\2
			}
		},
		goldweekRule_10:function(opt){
			if(opt.isGoldweek){
				this.cabinStatusRule_17(opt);//1\0
			}else{
				this.cabinStatusRule_18(opt);//1\1
			}
		},
		goldweekRule_11:function(opt){
			if(opt.isGoldweek){
				this.cabinStatusRule_14(opt);//2\1
			}else{
				this.cabinStatusRule_15(opt);//7\2
			}
		},
		goldweekRule_12:function(opt){
			if(opt.isGoldweek){
				this.cabinStatusRule_19(opt);//3\1
			}else{
				this.cabinStatusRule_20(opt);//5\2
			}
		},
		
		planRule_1:function(opt){
			if(this.isA340(opt.planType)){
				this.goldweekRule_1(opt);
			}
			if(this.isA330(opt.planType)){
				this.goldweekRule_2(opt);
			}
			if(this.isA330VIP(opt.planType)){
				this.goldweekRule_3_P(opt);
			}
			if(this.isB767orB787(opt.planType)){
				this.goldweekRule_4(opt);
			}
			if(this.isOther(opt.planType)){
				this.goldweekRule_5(opt);
			}
		},
		planRule_2:function(opt){
			if(this.isA340(opt.planType)){
				this.goldweekRule_1(opt);
			}
			if(this.isA330(opt.planType)){
				this.goldweekRule_2(opt);
			}
			if(this.isA330VIP(opt.planType)){
				this.goldweekRule_3_J(opt);
			}
			if(this.isB767orB787(opt.planType)){
				this.goldweekRule_4(opt);
			}
			if(this.isOther(opt.planType)){
				this.goldweekRule_5(opt);
			}
		},
		planRule_3:function(opt){
			if(this.isA340(opt.planType)){
				this.goldweekRule_6(opt);
			}
			if(this.isA330(opt.planType)){
				this.goldweekRule_6(opt);
			}
			if(this.isA330VIP(opt.planType)){
				this.goldweekRule_6(opt);
			}
			if(this.isB767orB787(opt.planType)){
				this.goldweekRule_6(opt);
			}
			if(this.isOther(opt.planType)){
				this.goldweekRule_7(opt);
			}
		},
		planRule_4:function(opt){
			if(this.isA340(opt.planType)){
				this.goldweekRule_8(opt);
			}
			if(this.isA330(opt.planType)){
				this.goldweekRule_9(opt);
			}
			if(this.isA330VIP(opt.planType)){
				this.goldweekRule_9(opt);
			}
			if(this.isB767orB787(opt.planType)){
				this.goldweekRule_9(opt);
			}
			if(this.isOther(opt.planType)){
				this.goldweekRule_10(opt);
			}
		},
		planRule_5:function(opt){
			if(this.isA340(opt.planType)){
				this.goldweekRule_8(opt);
			}
			if(this.isA330(opt.planType)){
				this.goldweekRule_9(opt);
			}
			if(this.isA330VIP(opt.planType)){
				this.goldweekRule_11(opt);
			}
			if(this.isB767orB787(opt.planType)){
				this.goldweekRule_9(opt);
			}
			if(this.isOther(opt.planType)){
				this.goldweekRule_10(opt);
			}
		},
		planRule_6:function(opt){
			this.goldweekRule_12(opt);
//			if(isA340(opt.planType)){
//				goldweekRule_12(opt);
//			}
//			if(isA330(opt.planType)){
//				goldweekRule_12(opt);
//			}
//			if(isA330VIP(opt.planType)){
//				goldweekRule_12(opt);
//			}
//			if(isB767orB787(opt.planType)){
//				goldweekRule_12(opt);
//			}
//			if(isOther(opt.planType)){
//				goldweekRule_12(opt);
//			}
		},
		cabinRule_1:function(opt){
			if(this.isPcabin(opt.cabin)) {
				this.planRule_1(opt);
			}
			if(this.isJcabin(opt.cabin)){
				this.planRule_2(opt);
			}
			if(this.isScabin(opt.cabin)){
				this.planRule_3(opt);
			}
		},
		cabinRule_2:function(opt){
			if(this.isPcabin(opt.cabin)) {
				this.planRule_4(opt);
			}
			if(this.isJcabin(opt.cabin)){
				this.planRule_5(opt);
			}
			if(this.isScabin(opt.cabin)){
				this.planRule_6(opt);
			}
		},
		stopRule:function(opt){
			if(!this.isStop(opt.stops)){//直飞
				this.cabinRule_1(opt);
			}else{
				this.cabinRule_2(opt);
			}
		},
		charterRule:function(opt){
			if(opt.cabin == "S" && isJingpeng(opt.cardType)){
				this.result.ruleStr = this.getRule_6_JP_3();
			}
		},
		guaranteeRule:function(){
			return "3@JP@JL&P@J@S";
		},
		isStop:function(stops){
			return stops == 0 || stops == "0" ? false:true;
		},
		isPcabin:function(cabinname){
			return cabinname == "P" ? true:false;
		},
		isJcabin:function(cabinname){
			return cabinname == "J" ? true:false;
		},
		isScabin:function(cabinname){
			return cabinname == "S" ? true:false;
		},
		isJingpeng:function(cardtype){
			return cardtype == "1" ? true:false;
		},
		isJinglu:function(cardtype){
			return cardtype == "0" ? true:false;
		},
		isA340:function(plantype){
			return plantype == "340" ? true:false;
		},
		isA330:function(plantype){
			return (plantype == "330" || plantype == "333" || plantype == "33I" ||
					plantype == "334" || plantype == "335" || plantype == "319" || plantype == "320" )? true:false;
		},
		isA330VIP:function(plantype){
			return plantype == "33V" ? true:false;
		},
		isB767orB787:function(plantype){
			return plantype == "767" || plantype == "787" ? true:false;
		},
		isOther:function(plantype){
			if(!(this.isA330(plantype) || this.isA330VIP(plantype) || 
					this.isA340(plantype) || this.isB767orB787(plantype))){
				return true;
			}
			return false;
		},
		getRule_1_JP_5:function(){
			return "5@JP";
		},
		getRule_2_JP_2:function(){
			return "2@JP";
		},
		getRule_3_JP_15:function(){
			return "15@JP";
		},
		getRule_4_JP_8:function(){
			return "8@JP";
		},
		getRule_5_JP_0:function(){
			return "0@JP";
		},
		getRule_6_JP_3:function(){
			return "3@JP";
		},
		getRule_7_JPJL_6:function(){
			return "6@JPJL";
		},
		getRule_8_JL_1:function(){
			return "1@JL";
		},
		getRule_9_JPJL_10:function(){
			return "10@JPJL";
		},
		getRule_10_JL_3:function(){
			return "3@JL";
		},
		getRule_11_JP_1:function(){
			return "1@JP";
		},
		getRule_12_JP_4:function(){
			return "4@JP";
		},
		getRule_13_JP_7:function(){
			return "7@JP";
		},
		getRule_14_JPJL_3:function(){
			return "3@JPJL";
		},
		getRule_15_JPJL_1:function(){
			return "1@JPJL";
		},
		getRule_16_JPJL_5:function(){
			return "5@JPJL";
		},
		call : function(func, event) {   //重写回调事件
			var result = null;
			if ($.isFunction(func))
				result = func.apply(this, [ event || window.event ]
						.concat(Array.prototype.slice.call(arguments, 2)));
			return result;
		}
		
	});
})(jQuery);

//将ddMMMyy格式的时间串转成yyyy-MM-dd形式
function setFormatDate(upCaseDate){
	var date = upCaseDate.toUpperCase();
	var m = ['JAN','FEB','MAR','APR','MAY','JUN','JUL','AUG','SEP','OCT','NOV','DEC'];
	for(key in m){
		if(date.substr(2,3)==m[key]){
			var newDate = "20"+date.substr(5,7)+"-"+(Number(key)+1)+"-"+date.substr(0,2);
			return newDate;
		}
	}
}