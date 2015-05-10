//页面全局变量
var pageCarrier="";//承运人
var isCkin = false;//包含CKIN产品
var isNotVcabin = true;//非v舱
//是否选择了低价推荐
var lowerFlightFlag = false;
//是否已查询过运价的标识
var searchFareFlight = false; 


//单程
var dataObject="";
var flightName = "";
var flightcount = 0;
var flightArr = [];
var flightSegmentArr = [];
var cityArr = [];
var cityCodeArr = [];
var flag = true;

//来回程
var goDataObject = "";
var goCkin = false;//来程CKIN标识
var goProductCode = "";
var backDataObject = "";
var backCkin = false;//回程CKIN标识
var backProductCode = "";
var roundTripflightArr = [];
var goFlightArravilTime ="";
var backFlightDepartTime = "";

//多程
var manyTripDate0;
var manyTripDate1;
var manyTripDate2;
var manyTripDate3;
var manyTripDate4;
var manyTripDate5;
var manyTripDate6;
var manyTripDate7;
var manyTripflightArr = [];//航段
var manyTripFlightCount;
//大客户号
var customerBigCode ="";
//是否已录入大客户好
var bigCustomerFlag = false;


function pageParamsReset(){

	//单程
	dataObject="";
	flightName = "";
	flightcount = 0;
	flightArr = [];
	flightSegmentArr = [];
	cityArr = [];
	cityCodeArr = [];
	flag = true;

	//来回程

	goDataObject = "";
	goTrip = false;//用于判断来程是否有选择了全部航班
	goTripFlightName = "";//来程第i航班
	goTripCount = 0;//来程的已选航段数
	goTripArr = [];//航段
	goTripflightSegmentArr = [];//航段
	goroundtripCarrier="";//来程承运人
	goCkin = false;//来程CKIN标识

	backDataObject = "";
	backroundtripCarrier="";//回程承运人
	backTrip = false;//用于判断回程是否有选择了全部航班
	backTripFlightName = "";//回程第i航班
	backTripCount = 0;//来程的已选航段数
	backTripArr = [];//航段
	backTripflightSegmentArr = [];//航段
	backCkin = false;//回程CKIN标识
	
	
	//多程
	for(var i =0;i<8;i++){
		$("#directTbody_3_"+i).empty();
	}
	manyTripDate0="";
	manyTripDate1="";
	manyTripDate2="";
	manyTripDate3="";
	manyTripDate4="";
	manyTripDate5="";
	manyTripDate6="";
	manyTripDate7="";
	manyTripflightArr = [];//航段
	manyTripFlightCount=0;
	
	//是否选择了低价推荐
	lowerFlightFlag = false;
	//是否已查询过运价的标识
	searchFareFlight = false; 
	//大客户号
	customerBigCode ="";
	//是否已录入大客户好
	bigCustomerFlag = false;
}

