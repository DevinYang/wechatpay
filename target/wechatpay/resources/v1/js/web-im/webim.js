(function(namespace){
	var $webim = (function() {
	
		var now = function() {
			return new Date().getTime();
		};
		
		var signReq = function(rawstr, secret) {
			var signature = CryptoJS.HmacSHA1(rawstr, secret);
    		return CryptoJS.enc.Base64.stringify(signature);
		};
		
		var isBadSignatureReq = function(data) {
			return data.status === -1 && (data.message.indexOf("signature fail") !== -1 || data.message.indexOf("Bad signature") !== -1);
		}
		
		var isNotFoundUserReq = function(username, data) {
			return data.status === -1 && data.message.indexOf("User[" + username + "] is not found") !== -1;
		}
		
		var doGatewayAccessReq = function(accessReq, success) {
			$.ajax({
			    url : "/web-im/gateway/access",
			    type : "POST",
			    data : JSON2.stringify(accessReq),
			    dataType : "json",
			    contentType : "application/json",
			    beforeSend : function(xhr){
			    	xhr.setRequestHeader("Accept","application/json");
			    },
			    success : success,
			    error : function(xhr, status) {
		    		success({"status" : -1, "message" : status, result : {}});
		    	}
    		});
		};
		
		var doQueryMBoxReq = function(me, success) {
			var username = me.user.username;
		    var timestamp = now();
		    var signature = signReq("/user/" + username + "/mbox&GET&" + timestamp, me.user.token.accessToken);
			$.ajax({
			    	url : "/web-im/user/"+ username +"/mbox",
			    	type : "GET",
			    	timeout : 60000,
			    	data : {"suspend" : 30000},
			    	dataType : "json",
			    	contentType : "application/json",
			    	beforeSend : function(xhr){
			    		xhr.setRequestHeader("Access-Token",username + ";" + timestamp + ";" + signature);
			    		xhr.setRequestHeader("Accept","application/json");
			    	},
			    	success : function(data) {
			    		success(data);
			    		if(!isBadSignatureReq(data) && !isNotFoundUserReq(username, data)) {
							doQueryMBoxReq(me,success);	
			    		}
			    	},
			    	error : function(xhr, status) {
			    		success({"status" : -1, "message" : status, result : {}});
			    		doQueryMBoxReq(me, success);	
			    	}
    			});
		};
			
		var doRosterReq = function(me, success) {
			var username = me.user.username;
	    	var timestamp = now();
	    	var signature = signReq("/roster/online&GET&" + timestamp, me.user.token.accessToken);
	    	
	    	$.ajax({
	    		url : "/web-im/roster/online",
	    		timeout : 15000,
	    		type : "GET",
	    		dataType : "json",
	    		contentType : "application/json",
	    		beforeSend : function(xhr){
	    			xhr.setRequestHeader("Access-Token",username + ";" + timestamp + ";" + signature);
	    			xhr.setRequestHeader("Accept","application/json");
	    		},
	    		success : success,
	    		error : function(xhr, status) {
	    			success({"status" : -1, "message" : status, result : {}});
	    		}
	    	});
		};
		
		var _rosterId;
		var _me;
		return {
		
			init : function(me, access_callback, mbox_callback, roster_callback) {
				doGatewayAccessReq(me, function(data) {
					
					access_callback(data);
					
					if(data.status === -1){
						return;
					}
					
					_me = data.result;
					var timer = function() {
						doRosterReq(_me, roster_callback);
					};
					
					doRosterReq(_me, roster_callback);
					doQueryMBoxReq(_me, mbox_callback);
					_rosterId = setInterval(timer, 15000);
				});
			},
			
			destroy : function() {
				clearInterval(_rosterId);
			},
			
			sendMsg : function(to, content, success) {
				var username = _me.user.username;
		    	var timestamp = now();
		    	var signature = signReq("/user/" + username + "/send-msg" +"&POST&" + timestamp, _me.user.token.accessToken);
		    	
		    	$.ajax({
		    		url : "/web-im/user/" + username + "/send-msg",
		    		type : "POST",
		    		data : JSON2.stringify({"receiver" : to, "content" : content}),
		    		dataType : "json",
		    		contentType : "application/json",
		    		beforeSend : function(xhr){
		    			xhr.setRequestHeader("Access-Token",username + ";" + timestamp + ";" + signature);
		    			xhr.setRequestHeader("Accept","application/json");
		    		},
		    		success : success,
		    		error : function(xhr, status) {
		    			success({"status" : -1, "message" : status, result : {}});
		    		}
		    	});
			},
			
			sendDelayMsg : function(to, content,delay, success) {
				var username = _me.user.username;
		    	var timestamp = now();
		    	var signature = signReq("/user/" + username + "/" + delay + "/send-delay-msg" +"&POST&" + timestamp, _me.user.token.accessToken);
		    	
		    	$.ajax({
		    		url : "/web-im/user/" + username + "/" + delay + "/send-delay-msg",
		    		type : "POST",
		    		data : JSON2.stringify({"receiver" : to, "content" : content}),
		    		dataType : "json",
		    		contentType : "application/json",
		    		beforeSend : function(xhr){
		    			xhr.setRequestHeader("Access-Token",username + ";" + timestamp + ";" + signature);
		    			xhr.setRequestHeader("Accept","application/json");
		    		},
		    		success : success,
		    		error : function(xhr, status) {
		    			success({"status" : -1, "message" : status, result : {}});
		    		}
		    	});
			},
			
			sendGroupMsg : function(groupId, content, success) {
				var username = _me.user.username;
		    	var timestamp = now();
		    	var signature = signReq("/user/" + username + "/send-group-msg" +"&POST&" + timestamp, _me.user.token.accessToken);
		    	
		    	$.ajax({
		    		url : "/web-im/user/" + username + "/send-group-msg",
		    		type : "POST",
		    		data : JSON2.stringify({"groupId" : groupId, "content" : content}),
		    		dataType : "json",
		    		contentType : "application/json",
		    		beforeSend : function(xhr){
		    			xhr.setRequestHeader("Access-Token",username + ";" + timestamp + ";" + signature);
		    			xhr.setRequestHeader("Accept","application/json");
		    		},
		    		success : success,
		    		error : function(xhr, status) {
		    			success({"status" : -1, "message" : status, result : {}});
		    		}
		    	});
			},
			
			createGroup : function(groupName, members, success) {
				var username = _me.user.username;
		    	var timestamp = now();
		    	var signature = signReq("/group/create" +"&POST&" + timestamp, _me.user.token.accessToken);
		    	
		    	$.ajax({
		    		url : "/web-im/group/create",
		    		type : "POST",
		    		data : JSON2.stringify({"username" : username, "groupName" : groupName, "memberNames" : members}),
		    		dataType : "json",
		    		contentType : "application/json",
		    		beforeSend : function(xhr){
		    			xhr.setRequestHeader("Access-Token",username + ";" + timestamp + ";" + signature);
		    			xhr.setRequestHeader("Accept","application/json");
		    		},
		    		success : success,
		    		error : function(xhr, status) {
		    			success({"status" : -1, "message" : status, result : {}});
		    		}
		    	});
			},
			
			leaveGroup : function(groupId, success) {
				var username = _me.user.username;
		    	var timestamp = now();
		    	var signature = signReq("/group/" + groupId + "/leave" +"&POST&" + timestamp, _me.user.token.accessToken);
		    	
		    	$.ajax({
		    		url : "/web-im/group/" + groupId + "/leave",
		    		type : "POST",
		    		data : JSON2.stringify({"username" : username}),
		    		dataType : "json",
		    		contentType : "application/json",
		    		beforeSend : function(xhr){
		    			xhr.setRequestHeader("Access-Token",username + ";" + timestamp + ";" + signature);
		    			xhr.setRequestHeader("Accept", "application/json");
		    		},
		    		success : success,
		    		error : function(xhr, status) {
		    			success({"status" : -1, "message" : status, result : {}});
		    		}
		    	});
			},
			
			disbandGroup : function(groupId, success) {
				var username = _me.user.username;
		    	var timestamp = now();
		    	var signature = signReq("/group/" + groupId + "/disband" +"&POST&" + timestamp, _me.user.token.accessToken);
		    	
		    	$.ajax({
		    		url : "/web-im/group/" + groupId + "/disband",
		    		type : "POST",
		    		data : JSON2.stringify({"username" : username}),
		    		dataType : "json",
		    		contentType : "application/json",
		    		beforeSend : function(xhr){
		    			xhr.setRequestHeader("Access-Token",username + ";" + timestamp + ";" + signature);
		    			xhr.setRequestHeader("Accept","application/json");
		    		},
		    		success : success,
		    		error : function(xhr, status) {
		    			success({"status" : -1, "message" : status, result : {}});
		    		}
		    	});
			}
		};
	})();
	
	namespace.$webim = $webim;
})(window);