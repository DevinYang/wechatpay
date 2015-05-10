// JavaScript Documentfunction setTab(name,cursel,n){


//----------------------Index----------------------------
$(document).ready(function(){
 jQuery.jq51menu = function(menuboxid,submenu){
  var menuboxli = $(menuboxid+" li");
  var menuboxa = $(menuboxid+" div a");
  menuboxli.eq(0).find(submenu).show();
  menuboxa.eq(0).addClass("over");
  menuboxli.find("a:first").attr("href","javascript:;");
  menuboxli.click( function () { 
   $(this).addClass("thismenu").find(submenu).show().end().siblings("li").removeClass("thismenu").find(submenu).hide();
  });
  menuboxa.click( function () { 
  menuboxli.find("a").removeAttr("class");
  $("#message").show(); //loading
  $("#mainFrame").attr("src",$(this).attr("data")); //iframe 加载页面
  $("#mainFrame").hide();
  $(this).addClass("over");
  $("#modelname").text($(this).text());
  });
 };
  $("#mainFrame").load(function(){ 
  $("#message").hide(); 
  $("#mainFrame").show();
  }); 
 //调用方法，可重用
 $.jq51menu("#menubox","div.submenu");
});



//-------------menu-----------------------------------------------------------------
$(document).ready(function(){
  
  $('li.one').mousemove(function(){
  $(this).find('ul').slideDown();//you can give it a speed
  });
  $('li.one').mouseleave(function(){
  $(this).find('ul').slideUp("fast");
  });
  
});




//----------------------Tab切换----------------------------
		function setTab(name,cursel,n){
		for(i=1;i<=n;i++){
		   var menu=document.getElementById(name+i);
		   var con=document.getElementById("con_"+name+"_"+i);
		   menu.className=i==cursel?"hover":"";
		   con.style.display=i==cursel?"block":"none";
		}
		}
		
//----------------------btn-close----------------------------

   		function hidead(){
		 document.getElementById("btnclose").style.display="none";
		}
   		function hidead1(){
		 document.getElementById("btnclose1").style.display="none";
		}
//-------------------------弹出层【向下----------------------------
/*----*/
$(document).ready(function(){

	$(".btn-slide").click(function(){
		$("#panel").slideToggle("slow");
		$(this).toggleClass("active"); return false;
	});

	$(".btn-slide1").click(function(){
		$("#panel1").slideToggle("slow");
		$(this).toggleClass("active1"); return false;
	});
	
});
//-------------------------弹出层【向上----------------------------

	$(function(){
		
		$(".l-tab-links").find("li").click(function(){
			$(".l-selected").attr("class","");
			$(this).attr("class","l-selected");
			var urlstr = "";
			var tabid = $(this).attr("tabid");
			$("#table").find("li").each(  function(i){
					if (tabid==$(this).attr("tabid"))
						$(this).show();
					else
						$(this).hide();
			});
			if($(this).attr("tabid") != li_check){		
				$("#table").slideDown("slow");			
				$("#menu").attr("src",urlstr);
				is_show = true;
			}else{
				if(is_show){
					$("#table").slideUp("slow");
					is_show = false;
				}else{
					$("#table").slideDown("slow");
					is_show = true;
				}						

			}

			li_check = $(this).attr("tabid");
		});;
	})
		var li_check = "";

//---------------------------------省市区级联动-----------------------------------------------------
        $(document).ready(function () {
            var provinceSelector = $("#provinceSelector");
            var citySelector = $("#citySelector");
            var areaSelector=$("#areaSelector");
            GetProvince();
            provinceSelector.change(function () {
                var provinceName = provinceSelector.val();
                if (provinceName != '') {
                    GetCity(provinceName);
                    areaSelector.empty();
                }
                else{
                    citySelector.empty();
                    areaSelector.empty();
                }
            });
            citySelector.change(function () {
                var provinceName = provinceSelector.val();
                var cityName = citySelector.val();
                if(cityName!=''){
                    GetArea(provinceName, cityName);
                }
                else{
                    areaSelector.empty();
                }
            });
        });

        // 获取省份(直辖市)信息
        function GetProvince() {
            var provSelector = $("#provinceSelector");
            provSelector.empty();
            provSelector.append("<option value=''>--请选择--</option>");
            var arrProvince ="";// provinceInfo;
            for (var provinceIndex in arrProvince) {
                provSelector.append("<option value='" + arrProvince[provinceIndex]["name"] + "'>" + arrProvince[provinceIndex]["name"] + "</option>")
            }
        }

        // 获取指定省份(直辖市)的城市(辖区或县)信息
        function GetCity(provinceName) {
            var citySelector = $("#citySelector");
            var arrCity;
            for (var provinceIndex in provinceInfo) {
                if (provinceInfo[provinceIndex]["name"] == provinceName) {
                    arrCity = provinceInfo[provinceIndex]["sub"];
                    break;
                }
            }
            citySelector.empty();
            citySelector.append("<option value=''>--请选择--</option>")
            for (var cityIndex in arrCity) {
                citySelector.append("<option value='" + arrCity[cityIndex]["name"] + "'>" + arrCity[cityIndex]["name"] + "</option>")
            }
        }

        // 获取指定城市(辖区或县)的地区信息
        function GetArea(provinceName, cityName) {
            var areaSelector = $("#areaSelector");
            var arrCity, arrArea;
            for (var provinceIndex in provinceInfo) {
                if (provinceInfo[provinceIndex]["name"] == provinceName) {
                    arrCity = provinceInfo[provinceIndex]["sub"];
                    for (var cityIndex in arrCity) {
                        if (arrCity[cityIndex]["name"] == cityName) {
                            arrArea = arrCity[cityIndex]["sub"];
                            break;
                        }
                    }
                }
            }
            areaSelector.empty();
            areaSelector.append("<option value=''>--请选择--</option>")
            for (var areaIndex in arrArea) {
                areaSelector.append("<option value='" + arrArea[areaIndex]["name"] + "'>" + arrArea[areaIndex]["name"] + "</option>")
            }
        }
//-------------------------------------------------------------------------------------------------------------------

//tr变色
jQuery(document).ready(function(e) {
        jQuery('.Box_Tab').each(function(index, element) {
            jQuery('.tjTable tbody:even').addClass('gray');
			jQuery('.tjTable tbody:odd').addClass('');
			
			
            jQuery('.tjTablet tbody:even').addClass('gray');


            jQuery('.tjTate tbody:even').addClass('gray1');


            jQuery('.trSt tr:odd').addClass('gray');
            jQuery('.trSt1 tr:odd').addClass('gray');
            jQuery('.trSt2 tr:odd').addClass('gray');
        });

//tr鼠标效果
		
		$('.tableHover tr').hover(function(){
				$(this).addClass('bg-blue1');
			},function(){
				$(this).removeClass('bg-blue1');
		});

$("div.zlg_list").find("dl").click(function(){  //查找dl
        var has=$(this).addClass("clickclass");//查找是否含用clickclass样式
        if(has){
            $(this).removeClass("clickclass");
                }
				
        var chek=$(this).find(":input").attr("checked");
        if(chek){
            $(this).addClass("clickclass");
            }
        });

		$("div.zlg_list").find("dl").each(  function(i){
		  	 var chek=$(this).find(":input").attr("checked");
			if(chek){
				$(this).addClass("clickclass");
			}
		});


//------------------------------------弹出层-----------------------------------------

/*
弹出
*/
	$('.btnOff, .xtExit, .simpleE, .tcExit').click(function(){
		noneBox('.overlay_v');
	});
	
	$('.View').click(function(){
		showBox('#ViewBox');
	});
	

//弹出层
function showBox(domid){
	$('#overlay').height(pageHeight());
	$('#overlay').width(pageWidth());
	$('#overlay').animate({
		opacity:0.6
	},100);
	adjust(domid);
	$(domid).show();
	$('#overlay').fadeIn(100);
}

function noneBox(domid){
	$(domid).hide();
	$('#overlay').fadeOut(100)
}



/* 当前页面高度 */
function pageHeight() {
	return document.body.scrollHeight;
}

/* 当前页面宽度 */
function pageWidth() {
	return document.body.scrollWidth;
}

/* 定位到页面中心 */
function adjust(id) {
	var newId=id;
	
	var ad_w = $(newId).width();
	var ad_h = $(newId).height();
	var ad_t = scrollY() + (windowHeight()/2) - (ad_h/2);
	if(ad_t < 0) ad_t = 0; 
	var ad_l = scrollX() + (windowWidth()/2) - (ad_w/2);
	if(ad_l < 0) ad_l = 0;
	$(newId).css({left: ad_l, top: ad_t});
}

//浏览器视口的高度
function windowHeight() {
	var de = document.documentElement;
	return self.innerHeight || (de && de.clientHeight) || document.body.clientHeight;
}

//浏览器视口的宽度
function windowWidth() {
	var de = document.documentElement;
	return self.innerWidth || (de && de.clientWidth) || document.body.clientWidth
}

/* 浏览器垂直滚动位置 */
function scrollY() {
	var de = document.documentElement;
	return self.pageYOffset || (de && de.scrollTop) || document.body.scrollTop;
}

 /* 浏览器水平滚动位置 */
function scrollX() {
	 var de = document.documentElement;
	return self.pageXOffset || (de && de.scrollLeft) || document.body.scrollLeft;
}
//----------------------------------------------------------------------------------


//--------------------Tab隐藏----------------------

$(function(){
	$('.jqdemo').hide();
	$(".bl").toggle(function(){//为显示/隐藏元素的前一个元素(取出标题元素)设置点击切换事件
		$(this).parent().next().show();//第一次点击时,隐藏div元素,并找到标题元素中的span,切换按钮
		$(this).find('span').removeClass('bl');
		$(this).find('span').addClass('no');
	},function(){
		$(this).parent().next().hide();//第二次点击时,显示div元素,并找到标题元素中的span,切换按钮
		$(this).find('span').removeClass('no');
		$(this).find('span').addClass('bl');
	});
								   
});

    });

