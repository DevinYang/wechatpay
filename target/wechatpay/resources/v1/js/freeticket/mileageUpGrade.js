var ERROR = 1;

$(function(){
//	$.metadata.setType("attr", "validate");
//	$("#upgradePnr_Form").validate({onkeyup:true});
//	NKKP0R
	
	$(".budget").click(function(){
		$("#budgetInfo").show();
		openSubmitOrder();
	});
	
	
	var workOrderId = "";
	if(parent){
		if(parent.window && parent.window.$){
			var workOrderEl = parent.window.$("#workOrderId");
			if(workOrderEl.length > 0){
				workOrderId = workOrderEl.val();
			}
		}else if(parent.document && parent.document.getElementById){
			var workOrderEl = parent.document.getElementById("workOrderId");
			if(workOrderEl){
				workOrderId = workOrderEl.value;
			}
		}
	}
	
	function submitOder(){
		var orderInfo = formToObj(form_main);
		var domainType = $("input[name=domainType]:checked").val();
		var upGradeType = $("input[name=upGradeType]:checked").val();
		
		if(workOrderId){
			ajaxRequest(basePath+"/sales-order/"+workOrderId+"/create",orderInfo,function(msg){
				if(msg.isSuccess == true){
					var orderId = msg.orderId;
					var upGradeResult = formToObj(budget_form);
					ajaxRequest(basePath+"/mileage-upGrade/updatePnr",upGradeResult,function(msg){
						
						Dialog.alert("订单创建成功！"+msg.msg,function(){
							showLoadingMask();
							location.href = basePath+"/abate-mileage/?freeOrderId="+orderId;
						},false);
					
						
					},null);
				}else{
					Dialog.alert(msg.msg,null,false);
				}
			});
		}else{
			Dialog.alert("无法创建订单，未能获取来电识别后的工单ID信息！");
		}
	}
	
//	$(".submitOrder").click(function(){
//		var orderInfo = formToObj(form_main);
//		if(workOrderId){
//			ajaxRequest(basePath+"/sales-order/"+workOrderId+"/create",orderInfo,function(msg){
//				if(msg.isSuccess == true){
//					var orderId = msg.orderId;
//					var upGradeResult = formToObj(budget_form);
//					ajaxRequest(basePath+"/mileage-upGrade/updatePnr",upGradeResult,function(msg){
//						if(msg.isSuccess){
//							Dialog.alert("订单创建成功！",function(){
//								showLoadingMask();
//								var url = basePath+"/abate-mileage/?freeOrderId="+orderId;
//								location.href = url;
//							},false);
//						}else{
//							Dialog.alert("订单创建成功！PNR更新失败！出错代码："+msg.msg);
//						}
//					},null);
//				}else{
//					Dialog.alert(msg.msg,null,false);
//				}
//			});
//		}else{
//			Dialog.alert("无法创建订单，未能获取来电识别后的工单ID信息！");
//		}
//	});
	
	function openSubmitOrder(){
		$(".submitOrder").addClass("Btn-blue");
		$(".submitOrder").bind("click",submitOder);
	}
	function closeSubmitOrder(){
		$(".submitOrder").removeClass("Btn-blue");
		$(".submitOrder").removeAttr("onclick");
	}
	function appendOrderInfo(upGradeOrder){
		putContactInfo(upGradeOrder);
		putOrderInfo(upGradeOrder);
		putOrderTravellerAndFlight(upGradeOrder);
	}
	
	function putOrderTravellerAndFlight(upGradeOrder){
		var salesTravellers = upGradeOrder.salesTravellerDto;
		var flights = upGradeOrder.flightAndSFCVO.validFlightSFCVOes;
		var flightAndTravellerReduces = upGradeOrder.flightAndTravellerReduceVOes;
		var itemIndex = 0;
		$.each(salesTravellers,function(i){
			var salesTrveller = this;
			$("#salesOthers").append(
					
					 "<input type=\"hidden\" name=\"salesTravellers["+i+"].id\" value=\""+i+"\" />"
					+"<input type=\"hidden\" name=\"salesTravellers["+i+"].birthDate\" value=\""+this.birthDate+"\"/>"
					+"<input type=\"hidden\" name=\"salesTravellers["+i+"].credCode\" value=\""+this.credCode+"\"/>"
					+"<input type=\"hidden\" name=\"salesTravellers["+i+"].credType\" value=\""+getOrderCredType(this.credType)+"\"/>"
					+"<input type=\"hidden\" name=\"salesTravellers["+i+"].memberCardCode\" value=\""+this.memberCardCode+"\"/>"
					+"<input type=\"hidden\" name=\"salesTravellers["+i+"].memberCardType\" value=\""+this.memberCardType+"\"/>"
					+"<input type=\"hidden\" name=\"salesTravellers["+i+"].phone\" value=\""+this.phone+"\"/>"
					+"<input type=\"hidden\" name=\"salesTravellers["+i+"].enFullName\" value=\""+this.enFullName+"\"/>"
					+"<input type=\"hidden\" name=\"salesTravellers["+i+"].cnFullName\" value=\""+this.cnFullName+"\"/>"
					+"<input type=\"hidden\" name=\"salesTravellers["+i+"].travellerType\" value=\""+getOrderTravellerType(this.travellerType)+"\"/>"
					+"<input type=\"hidden\" name=\"salesTravellers["+i+"].parentName\" value=\""+this.parentName+"\"/>"
					+"<input type=\"hidden\" name=\"salesTravellers["+i+"].pnr\" value=\""+this.pnr+"\"/>"
					+"<input type=\"hidden\" name=\"salesTravellers["+i+"].reduceMileage\" value=\""+this.reduceMileage+"\"/>"
					+"<input type=\"hidden\" name=\"salesTravellers["+i+"].realReduceMileage\" value=\""+this.realreduce+"\"/>"
					+"<input type=\"hidden\" name=\"salesTravellers["+i+"].ticketPrice\" value=\""+this.ticketPrice+"\"/>"
					+"<input type=\"hidden\" name=\"salesTravellers["+i+"].reduceNo\" value=\""+this.reduceNo+"\"/>"
			);
			
			$.each(flights,function(j){
				var flight = this;
				var segment = flight.flightSegmentSFCVO[0];
				if(i==0){
					$("#salesOthers").append(
							 "<input type=\"hidden\" name=\"salesOrderSegments["+j+"].id\" value=\""+j+"\" />"
							+"<input type=\"hidden\" name=\"salesOrderSegments["+j+"].flightDate\" value=\""+flight.date+"\" />"
							+"<input type=\"hidden\" name=\"salesOrderSegments["+j+"].carrier\" value=\""+flight.carrier+"\" />"
							+"<input type=\"hidden\" name=\"salesOrderSegments["+j+"].realCarrier\" value=\""+flight.realCarrier+"\" />"
							+"<input type=\"hidden\" name=\"salesOrderSegments["+j+"].flightNum\" value=\""+segment.flightNo+"\" />"
							+"<input type=\"hidden\" name=\"salesOrderSegments["+j+"].meal\" value=\""+segment.mealType+"\" />"
							+"<input type=\"hidden\" name=\"salesOrderSegments["+j+"].departCityCode\" value=\""+segment.departCity+"\" />"
							+"<input type=\"hidden\" name=\"salesOrderSegments["+j+"].arriveCityCode\" value=\""+segment.arriveCity+"\" />"
							+"<input type=\"hidden\" name=\"salesOrderSegments["+j+"].cabinName\" value=\""+segment.cabin+"\" />"
							+"<input type=\"hidden\" name=\"salesOrderSegments["+j+"].departTerm\" value=\""+segment.departTerminal+"\" />"
							+"<input type=\"hidden\" name=\"salesOrderSegments["+j+"].arriveTerm\" value=\""+segment.arriveTerminal+"\" />"
							+"<input type=\"hidden\" name=\"salesOrderSegments["+j+"].changeStop\" value=\""+segment.stops+"\" />"
							+"<input type=\"hidden\" name=\"salesOrderSegments["+j+"].departTime\" value=\""+segment.departTime+"\" />"
							+"<input type=\"hidden\" name=\"salesOrderSegments["+j+"].arriveTime\" value=\""+segment.arriveTime+"\" />"
							+"<input type=\"hidden\" name=\"salesOrderSegments["+j+"].planType\" value=\""+segment.planType+"\" />"
							+"<input type=\"hidden\" name=\"salesOrderSegments["+j+"].departAirportCode\" value=\""+segment.departAirport+"\" />"
							+"<input type=\"hidden\" name=\"salesOrderSegments["+j+"].arriveAirportCode\" value=\""+segment.arriveAirport+"\" />"
							+"<input type=\"hidden\" name=\"salesOrderSegments["+j+"].departAirportCnName\" value=\""+segment.departCityName+"\" />"
							+"<input type=\"hidden\" name=\"salesOrderSegments["+j+"].arriveAirporCnName\" value=\""+segment.arriveCityName+"\" />"
							+"<input type=\"hidden\" name=\"salesOrderSegments["+j+"].segNo\" value=\""+segment.segNo+"\" />"
							+"<input type=\"hidden\" name=\"salesOrderSegments["+j+"].serialNo\" value=\""+flights.length+"\" />"
					);
				}
				appendOrderItems(flightAndTravellerReduces,salesTrveller,flight,flights,segment,i,j,itemIndex);
				itemIndex ++;
			});
			
		});
		
	}
	
	
	function appendOrderItems(flightAndTravellerReduces,salesTrveller,flight,flights,segment,i,j,itemIndex){
		$("#salesOthers").append(
				
				 "<input type=\"hidden\" name=\"salesOrderItems["+itemIndex+"].refundCondition\" value=\""+segment.refundCondCondition+"\" />"
				+"<input type=\"hidden\" name=\"salesOrderItems["+itemIndex+"].changeCondition\" value=\""+segment.changeCondContion+"\" />"
				+"<input type=\"hidden\" name=\"salesOrderItems["+itemIndex+"].transferCondContion\" value=\""+segment.transferCondContion+"\" />"
				+"<input type=\"hidden\" name=\"salesOrderItems["+itemIndex+"].orderType\" value=\"UPGRADE\" />"
				+"<input type=\"hidden\" name=\"salesOrderItems["+itemIndex+"].status\" value=\"SUBMITED\" />"
				+"<input type=\"hidden\" name=\"salesOrderItems["+itemIndex+"].ticketStatus\" value=\"2\" />"
				+"<input type=\"hidden\" name=\"salesOrderItems["+itemIndex+"].ticketType\" value=\"1\" />"
				+"<input type=\"hidden\" name=\"salesOrderItems["+itemIndex+"].ticketUnitIndex\" value=\""+flights.length+"\" />"
				+"<input type=\"hidden\" name=\"salesOrderItems["+itemIndex+"].freeType\" value=\"UPGRADE\" />"
				+"<input type=\"hidden\" name=\"salesOrderItems["+itemIndex+"].salesTraveller.id\" value=\""+i+"\" />"
				+"<input type=\"hidden\" name=\"salesOrderItems["+itemIndex+"].salesOrderSegment.id\" value=\""+j+"\" />"
				+"<input type=\"hidden\" name=\"salesOrderItems["+itemIndex+"].currency\" value=\"CNY\" />"
				+"<input type=\"hidden\" name=\"salesOrderItems["+itemIndex+"].settleCurrency\" value=\"CNY\" />"
				+"<input type=\"hidden\" name=\"salesOrderItems["+itemIndex+"].tax1Code\" value=\"CN\" />"
				+"<input type=\"hidden\" name=\"salesOrderItems["+itemIndex+"].tax2Code\" value=\"YQ\" />"
				
		);
		$.each(flightAndTravellerReduces,function(k){
			var fare = this;
			var traveller = this.freeTravellerDto;
			var flightSFCVO = this.flightSFCVO;
			var fareSeg = flightSFCVO.flightSegmentSFCVO[0];
			if(salesTrveller.cnFullName==traveller.cnFullName 
					&& fareSeg.flightNo==segment.flightNo
					&& flightSFCVO.date == flight.date){
				
				$("#salesOthers").append(
						
						 "<input type=\"hidden\" name=\"salesOrderItems["+itemIndex+"].reduceMileage\" value=\""+fare.reduceMileage+"\" />"
						+"<input type=\"hidden\" name=\"salesOrderItems["+itemIndex+"].reallyReduce\" value=\""+fare.reduceMileageReal+"\" />"
						+"<input type=\"hidden\" name=\"salesOrderItems["+itemIndex+"].upgradeCost\" value=\""+fare.ticketPrice+"\" />"
						+"<input type=\"hidden\" name=\"salesOrderItems["+itemIndex+"].ticketPrice\" value=\""+fare.price+"\" />"
						+"<input type=\"hidden\" name=\"salesOrderItems["+itemIndex+"].tax1Cost\" value=\""+fare.priceCN+"\" />"
						+"<input type=\"hidden\" name=\"salesOrderItems["+itemIndex+"].settleTax1Cost\" value=\""+fare.priceCN+"\" />"
						+"<input type=\"hidden\" name=\"salesOrderItems["+itemIndex+"].tax2Cost\" value=\""+fare.priceYQ+"\" />"
						+"<input type=\"hidden\" name=\"salesOrderItems["+itemIndex+"].settleTax2Cost\" value=\""+fare.priceYQ+"\" />"
				);
			}
		});
	}
	function putOrderInfo(upGradeOrder){
		$("#adultNum").attr("value",upGradeOrder.flightAndSFCVO.adultCount);
		$("#childNum").attr("value",upGradeOrder.flightAndSFCVO.childCount);
		$("#infantNum").attr("value",upGradeOrder.flightAndSFCVO.infantsCount);
		$("#travellType").attr("value",upGradeOrder.flightAndSFCVO.flightMark);
		$("#tax1").attr("value",upGradeOrder.totalCN);
		$("#tax2").attr("value",upGradeOrder.totalYQ);
		$("#reduceMileage").attr("value",upGradeOrder.totalReduceMileage);
		$("#realReduceMileage").attr("value",upGradeOrder.totalReduceMileageReal);
		$("#totalTicketPrice").attr("value",upGradeOrder.totalPrice);
		$("#totalPay").attr("value",upGradeOrder.totalTicketPrice);
	}
	
	function putContactInfo(upGradeOrder){
		$("#contactName").attr("value",upGradeOrder.linkManName);
		$("#contactPhone").attr("value",upGradeOrder.phone);
		$("#contactBackPhone").attr("value",upGradeOrder.backPhone);
		$("#ticketLimitTime").attr("value",upGradeOrder.reserveTicketDate+" "+upGradeOrder.reserveTicketTime);
	}
	

	function getOrderTravellerType(travellerType){
		if(travellerType == 0){
			return "ADULT";
		}
		if(travellerType == 1){
			return "CHILD";
		}
		if(travellerType == 2){
			return "INFANT";
		}
	}
	function getOrderCredType(credType){
		if(credType == 1){
			return "NI";
		}
		if(credType == 2){
			return "PP";
		}
		if(credType == 3){
			return "OTHER";
		}
	}
	
	function appendBudgetInfo(result){
		$("#deductionsMileage").text(result.reduce);
		$("#ticketPrice").text(result.ticketPrice);
		$("#budgetInfo").show();
	}
	
});


