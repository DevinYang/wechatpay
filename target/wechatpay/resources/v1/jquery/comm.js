// JavaScript Document
var zTree1;
		var setting;
		setting = {
			checkable: true,
			checkStyle: "radio",
			checkRadioType: "level"
		};
$(function (){
		$("input[type=text]").css("border","1px solid #C5C5C7");
		$("input[type=text]").css("height","20px");
		$("input[type=text].datepicker").css("border","1px solid #C5C5C7");
		$("input[type=text].datepicker").css("height","20px");
		$("input[type=text].datepicker").css("background","white url(../../images/date_bg.jpg) right center no-repeat");
		
		$(".btn_type_1,.btn_type_2").mouseover(function(){
				$(this).css("border","1px #C3A336 solid");
				$(this).css("background","url(../../images/btn_bg2.jpg) left center repeat-x");	
			}).mouseout(function(){
				$(this).css("border","1px #BBC4C9 solid");
				$(this).css("background","url(../../images/btn_bg.jpg) left center repeat-x");	
			});
		
		$(".btn_type_2").mouseover(function(){
				$(this).css("border","1px #C3A336 solid");
				$(this).css("background","url(../images/btn_bg2.jpg) left center repeat-x");	
			}).mouseout(function(){
				$(this).css("border","1px #BBC4C9 solid");
				$(this).css("background","url(../images/btn_bg.jpg) left center repeat-x");	
			});
		
		$(".vos_table_h tbody tr").mouseover(function(){
				$(this).css("background-color","#F2F9C6");

			}).mouseout(function(){
				$(this).css("background-color","#ffffff");										
			});
		
		$( "#dialog" ).dialog({
			autoOpen: false,
			show: "blind",
			hide: "explode"
		});
		
		$( "#dialog2" ).dialog({
			autoOpen: false,
			show: "blind",
			hide: "explode"
		});
		
		$( "#dialog3" ).dialog({
			autoOpen: false,
			show: "blind",
			hide: "explode"
		});
		
		$( "#dialog4" ).dialog({
			autoOpen: false,
			show: "blind",
			hide: "explode"
		});
		
		$( "#dialog_m" ).dialog({
			autoOpen: false,
			show: "blind",
			hide: "explode"
		});
		$( "#dialog_1" ).dialog({
			autoOpen: false,
			show: "blind",
			hide: "explode"
		});
		$( "#dialog_2" ).dialog({
			autoOpen: false,
			show: "blind",
			hide: "explode"
		});
		$( "#dialog_3" ).dialog({
			autoOpen: false,
			show: "blind",
			hide: "explode"
		});
		
		
		var pnr_more_stua = 0;
			 $("#pnr_more").click(function(){
				if(pnr_more_stua == 0){
						$(this).html("-");	
						$("#pnr_more_con").css("display","");	
						pnr_more_stua = 1;
					}else{
						$(this).html("+");	
						$("#pnr_more_con").css("display","none");	
						pnr_more_stua = 0;
					}				  
			})//展开
			 
			 
			 
			
			
			//树的通用函数定义
			
			$("#all_cop").focus(function(){
			$("#test_tree").slideDown("slow");				 
				})
				$("#test_tree :input:radio").click(function(){
						$("#test_tree").focus();					
					})
				$("#all_cop,#test_tree").blur(function(){
					//$("#test_tree").css("display","none")		
				});
				
				$(".tree_form_submit").click(function(){
					var tmp = zTree1.getCheckedNodes(true);
					$("#test_tree").slideUp("slow");
					//alert(tmp[0].)
					$("#all_cop").attr("value",tmp[0].name)
				})
				$(".tree_form_close").click(function(){
					$("#test_tree").slideUp("slow");								 
				})
		
		
	})


//树的调用函数
function getRadioType() {
		var level = $("#level").attr("checked")? "level":"";
		var all = $("#all").attr("checked")? "all":"";
		
		return level + all;
	}
	
	function refreshTree() {
		setting.checkRadioType = getRadioType();
		zTree1 = $("#treeDemo").zTree(setting, zNodes);
		$("#checkRadioTypeCode").html(setting.checkRadioType);
	}

	var zNodes =[
	
	{ name:"CSA01全公司", ename:"Computer", open:true,
		nodes: [
			{ name:"CAN01广州总部", ename:"Hardware",
				nodes: [{ name:"CAN02广州呼叫中心", ename:"CAN02广州呼叫中心"}]},
			{ name:"CGO01河南分公司", ename:"Software",
				nodes: [{ name:"CGO02河南呼叫中心", ename:"CGO02河南呼叫中心"}]},
			{ name:"CGQ01吉林分公司", ename:"CGQ01吉林分公司",
				nodes: [{ name:"CGQ02吉林呼叫中心", ename:"CGQ02吉林呼叫中心"}]},
			{ name:"HRB01黑龙江分公司", ename:"HRB01黑龙江分公司",
				nodes: [{ name:"HRB02哈尔滨呼叫中心", ename:"HRB02哈尔滨呼叫中心"}]},
			{ name:"SHA01上海基地", ename:"SHA01上海基地",
				nodes: [{ name:"SHA02上海呼叫中心", ename:"SHA02上海呼叫中心"}]},
			{ name:"URC01新疆分公司", ename:"URC01新疆分公司",
				nodes: [{ name:"URC02乌鲁木齐呼叫中心", ename:"URC02乌鲁木齐呼叫中心"}]},
			{ name:"WUH01湖北分公司", ename:"WUH01湖北分公司",
				nodes: [{ name:"WUH02武汉呼叫中心", ename:"WUH02武汉呼叫中心"}]}
		]}					
];

//Tab通用函数
function setTab(name,cursel,n,t){
	for(var i=1;i<=n;i++){	
		var menu=document.getElementById(name+i);
		if(!menu){
			if (t==0)cursel++;
			continue;
		}
		var con=document.getElementById("con_"+name+"_"+i);
		menu.className=(i==cursel?"hover":"");
		con.style.display=(i==cursel?"block":"none");
	}
}

//获取URL通用函数 用法：var request=new Object; var val=GetRequest(); alert(val('参数1')
function getRequest() {  
    var url = location.search; //获取url中"?"符后的字串  
   	var theRequest = new Object();  
 	if (url.indexOf("?") != -1) {  
 	var str = url.substr(1);  
	strs = str.split("&");  
	for(var i = 0; i < strs.length; i ++) {  
	theRequest[strs[i].split("=")[0]]=unescape(strs[i].split("=")[1]);  
	}  
	}  
	return theRequest;  
}  


	 
