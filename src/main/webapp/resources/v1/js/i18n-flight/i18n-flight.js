function oneway_submit() {
	var $this = $("#oneway_form");
	
	var check_airport_results = check_airports("#oneway_form");
	for(var i=0; i<check_airport_results.length;i++) {
		var result = check_airport_results[i];
		if(result.status === -1){
			Dialog.toast(result.reason);
			result.seg.prev().focus();
			return;
		}
	}
	
	var result = check_dates("#oneway_form")[0];
	if(result.status === -1) {
		Dialog.toast(result.reason);
		result.seg.focus();
		return;
	}
	
	$this.append($("<input>").attr("type", "hidden").attr("name", "type").val("ONEWAY"));
	$this.submit();
}

function oneway_reset() {
	reset_form("#oneway_form");
}	

function roundway_submit() {
	var $this = $("#roundway_form");
	
	var check_airport_results = check_airports("#roundway_form");
	for(var i=0; i<check_airport_results.length;i++) {
		var result = check_airport_results[i];
		if(result.status === -1){
			Dialog.toast(result.reason);
			result.seg.prev().focus();
			return;
		}
	}
	
	var check_date_results = check_dates("#roundway_form");
	for(var i=0; i<check_date_results.length; i++) {
		var result = check_date_results[i];
		if(result.status === -1){
			Dialog.toast(result.reason);
			result.seg.focus();
			return;
		}
	}

	var $first_from = $this.find(":input[name='segments[0].from']");
	var $first_to = $this.find(":input[name='segments[0].to']");
	$this.append($("<input>").attr("type", "hidden").attr("name", "type").val("ROUNDWAY"));
	$this.append($("<input>").attr("type", "hidden").attr("name", "segments[1].from").val($first_to.val()));
	$this.append($("<input>").attr("type", "hidden").attr("name", "segments[1].to").val($first_from.val()));
	$this.submit();
}

function roundway_reset() {
	reset_form("#roundway_form");
}

function multiway_submit() {
	var $this = $("#multiway_form");
	
	var check_airport_results = check_airports("#multiway_form > div:visible");
	for(var i=0; i<check_airport_results.length;i++) {
		var result = check_airport_results[i];
		if(result.status === -1){
			Dialog.toast(result.reason);
			result.seg.prev().focus();
			return;
		}
	}
	
	var check_date_results = check_dates("#multiway_form > div:visible");
	for(var i=0; i<check_date_results.length; i++) {
		var result = check_date_results[i];
		if(result.status === -1){
			Dialog.toast(result.reason);
			result.seg.focus();
			return;
		}
	}
	
	$this.find("div:hidden").remove();
	$this.append($("<input>").attr("type", "hidden").attr("name", "type").val("MULTIWAY"));
	$this.submit();
}

function multiway_reset() {
	reset_form("#multiway_form");
}

function reset_form(form) {
	var $this = $(form);
	$this.find(":input.airport").each(function() {
		$(this).val("");
	});
	
	$this.find(":input[name^=segments][name]").each(function(){
		$(this).val("");
	});
	
	$this.find(":input[name^=segments][name$=on]").each(function(){
		$(this).val(now_as_yyyyMMdd());
	});
	
	$this.find(":checkbox[name=directOnly]").each(function(){
		$(this).attr("checked", false);
	});
	
	$this.find(":input.airport").first().focus();
}

var airports_cache = {};
var chinese_numbers = {
	"1" : "一",
	"2" : "二",
	"3" : "三",
	"4" : "四",
	"5" : "五",
	"6" : "六",
	"7" : "七",
	"8" : "八"
};
var chinese_weeks = {
	"0" : "星期日",
	"1" : "星期一",
	"2" : "星期二",
	"3" : "星期三",
	"4" : "星期四",
	"5" : "星期五",
	"6" : "星期六"
};

function now() {
	var current = new Date();
	current.setHours(0);
	current.setMinutes(0);
	current.setSeconds(0);
	current.setMilliseconds(0);
	return current;
}

function now_as_yyyyMMdd() {
	return day_after_now_as_yyyyMMdd(0);
}

function day_after_now_as_yyyyMMdd(after) {
	var current = now();
	var year = current.getFullYear();
	var month = current.getMonth() + 1;
	var date = current.getDate() + after;
	return year + "-" + (month < 10 ? ("0" + month) : month) + "-" + (date < 10 ? ("0" + date) : date);
}

function check_airports(form) {
	var froms = [];
	var tos = [];
	var check_airport_results = [];
	$(form).find("input[name^=segments][name$=from]").each(function(index) {
		var $this = $(this);
		froms[index] = $this;
		
		var airport_name = $this.prev().val();
		if($this.val() === '' || airport_name === '') {
			var result = {'seg' : $this, 'status' : -1, 'reason' : '不存在该出发城市！'};
			check_airport_results[index] = result;
		}
		
		if(!check_airport_results[index] && airports_cache[$this.val()] !== $this.prev().val()) {
			var result = {'seg' : $this, 'status' : -1, 'reason' : '不存在该出发城市！'};
			check_airport_results[index] = result;
		}
	});
	
	$(form).find("input[name^=segments][name$=to]").each(function(index) {
		var $this = $(this);
		
		tos[index] = $this;
		if(!check_airport_results[index] && ($this.val() === '' || $this.prev().val() === '')) {
			var result = {'seg' : $this, 'status' : -1, 'reason' : '不存在该出发城市！'};
			check_airport_results[index] = result;
		}
		
		if(!check_airport_results[index] && airports_cache[$this.val()] !== $this.prev().val()) {
			var result = {'seg' : $this, 'status' : -1, 'reason' : '不存在该出发城市！'};
			check_airport_results[index] = result;
		}
		
		if(!check_airport_results[index]) {
			check_airport_results[index] = {'seg' : $this, 'status' : 1};
		}
	});
	
	for(var i=0; i< tos.length;i++) {
		if((check_airport_results[i].status === 1) && (tos[i].val() === froms[i].val())) {
			var result = {'seg' : tos[i], 'status' : -1, 'reason' : '出发城市和到达城市不能相同！'};
			check_airport_results[i] = result;
			break;
		}
	}
	
	for(var i=0; i< tos.length -1;i++) {
		if((check_airport_results[i+1].status === 1) && (tos[i].val() !== froms[i+1].val())) {
			var result = {'seg' : froms[i+1], 'status' : -1, 'reason' : '不支持缺口航班的查询！'};
			check_airport_results[i+1] = result;
			break;
		}
	}
	
	return check_airport_results;
}

function check_dates(form) {
	
	var temp_dates = [];
	var check_date_results = [];
	
	var current = now();
	$(form).find("input[name^=segments][name$=on]").each(function(index) {
		
		var $this = $(this);
		temp_dates[index] = $this.val();
		
		if($this.val() === '') {
			var result = {'seg' : $this, 'status' : -1, 'reason' : '航班日期不能为空！'};
			check_date_results[index] = result;
		}
		
		if(!check_date_results[index] && index >= 1) {
			var prev = temp_dates[index - 1];
			if(str_to_date($this.val()) < str_to_date(prev)) {
				var reason = '回程日期不能小于出发日期！';
				var multiwayIdx = $this.attr("multiwayIdx");
				if(multiwayIdx){
					reason = '第' + chinese_numbers[multiwayIdx] + '航段出发日期不能小于上一航段！';
				}
				var result = {'seg' : $this, 'status' : -1, 'reason' : reason};
				check_date_results[index] = result;
			}
		}
		
		if(!check_date_results[index] && str_to_date($this.val()) < current) {
			var result = {'seg' : $this, 'status' : -1, 'reason' : '查询的出发日期必须等于或晚于当天！'};
			check_date_results[index] = result;
		}
		
		if(!check_date_results[index]) {
			check_date_results[index] = {'seg' : $this, 'status' : 1};
		}
	});
	
	return check_date_results;
}

function str_to_date(str) {
	return new Date(str.replace("-", "/"));
}

function render_template(html, airports) {
	html = html.replace(/\$\{seq-(\d)\s*\}/igm, function($, $1) {
		return chinese_numbers[$1];
	}).replace(/\$\{(\w{3})\s*\}/igm, function($, $1) {
		if (airports_cache[$1]) {
			return airports_cache[$1];
		}

		var length = airports.length;
		for (var i = 0; i < length; i++) {
			if (airports[i].code === $1) {
				airports_cache[$1] = airports[i].name;
				return airports[i].name;
			}
		}
	}).replace(/\$\{(\d{4}-\d{2}-\d{2})-week\s*\}/igm, function($, $1) {
		var on = str_to_date($1);
		return chinese_weeks[on.getDay().toString()];
	}).replace(/\$\{(\d{4}-\d{2}-\d{2})-countdays\s*}/igm, function($, $1) {
		var on = str_to_date($1);
		var current = now();
		return Math.round((on.getTime() - current.getTime()) / 86400000);
	}).replace(/\$\{\s*-week\s*\}/igm, function($, $1) {
		return "";
	}).replace(/\$\{\s*-countdays\s*}/igm, function($, $1) {
		return "0";
	});

	return html;
}
