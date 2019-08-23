// 전역변수
var cityId;
var key = '249ed7a4f8138c8a571bccfb3bd6af1c';
var units = 'metric';
var dailyAPI = 'https://api.openweathermap.org/data/2.5/weather';
var weeklyAPI = 'https://api.openweathermap.org/data/2.5/forecast';
//https://api.openweathermap.org/data/2.5/weather?id=1835848&appid=249ed7a4f8138c8a571bccfb3bd6af1c&units=metric
//https://api.openweathermap.org/data/2.5/forecast?id=1835848&appid=249ed7a4f8138c8a571bccfb3bd6af1c&units=metric
var cityURL = '../json/city.json';
var dailyURL = dailyAPI + '?appid=' + key + '&units=' + units;
var weeklyURL = weeklyAPI + '?appid=' + key + '&units=' + units;


//프로그램 시작
init();
function init() {
	wrapChg("M");
 $.ajax({
	 type: "get",
	 url: cityURL,
	 dataType: "json",
	 success: cityFn
 });
} 

$(".navi > li").click(function(){
	if($(this).index() == 0) init();
	else if($(this).index() == 1) wrapChg("D");
	else wrapChg("W")
});

// 화면 Show/Hide
function wrapChg(type) {
	if(type == 'D') {
		$(".navi > li").removeClass("navi-sel");
		$(".navi").eq(0).find("li").eq(1).addClass("navi-sel");
		$(".wrap-daily").show(); //show/hide를 해도 됨
		$(".wrap-weekly").hide();
		$(".wrap-main").hide();
	} 
	else if(type == 'W') {
		$(".navi > li").removeClass("navi-sel");
		$(".navi").eq(1).find("li").eq(2).addClass("navi-sel");
		$(".wrap-daily").hide();
		$(".wrap-weekly").show();
		$(".wrap-main").hide();
	}
	else { //main
		$(".wrap-daily").hide();
		$(".wrap-weekly").hide();
		$(".wrap-main").show();
	}
}


// 도시정보 가져오기
function cityFn(res) {
	var cities = res.cities;
	$("#cities").empty();
	$("#cities").append('<option value="" selected>도시를 선택해주세요.</option>');
	for(var i in cities) {
		$("#cities").append('<option value="'+cities[i].id+'">'+cities[i].name+'</option>');
	}
	$("#cities").change(function(){
		cityId = $(this).val();
		$.ajax({
			type: "get",
			url: dailyURL + "&id=" + cityId,
			dataType: "json",
			success: dailyFn
		});
		$.ajax({
			type: "get",
			url: weeklyURL + "&id=" + cityId,
			dataType: "json",
			success: weeklyFn
		});
	});
}

// 데일리정보 가져오기
function dailyFn (res) {
	// console.log(res);
	var $d = $(".wrap-daily > .conts"); //변수에 넣어주면 DOM 내 수정이 있어도 변수내용 한번만 바뀌니까 DOM 요소들을 변수에 넣어주는 습관을 들이자
	$d.empty();

/* 	$d.append(res.base+'<br>');
	$d.append(res.clouds.all+'<br>');
	$d.append(res.cod+'<br>');
	$d.append(res.coord.lon+'<br>');
	$d.append(res.coord.lat+'<br>');
	$d.append(res.main.temp+'<br>');
	$d.append(res.main.pressure+'<br>');
	$d.append(res.main.humidity+'<br>');
	$d.append(res.weather[0].description+'<br>');
	$d.append(res.weather[0].icon+'<br>');
	$d.append(res.weather[0].main+'<b>'); */

	$d.append('<div class="text-center fa-3x py-3">오늘의 날씨</div>')
	$d.append('<div class="text-center py-3"><img src="../img/'+res.weather[0].icon+'.png" class="w-100 daily-img"</div>')
	$d.append('<div class="text-center fa-2x py-3">현재온도: <b>'+res.main.temp+'</b>℃</div>');
	$d.append('<div class="text-center fa-2x py-3">현재날씨: <b>'+res.weather[0].main+'</br></div>');
	wrapChg("D");
}


// 위클리정보 가져오기
function weeklyFn (res) {
	console.log(res);
	var kts;
	var html = '';
	var $w = $(".wrap-weekly > .conts")
	$w.empty();
	for(var v of res.list) {
		kts = new Date(new Date(v.dt_txt).getTime()+(9*60*60*1000));
		html = `
		<li class="w-item">
		<div>
		<img src="../img/${v.weather[0].icon}.png" class="w-100">
		</div>
		<ul>
		<li class="w-temp">
		<span>${v.main.temp}</span>℃
		</li>
		<li class="w-desc">
		<span>${v.weather[0].main}</span>
		<span>${v.weather[0].description}</span>
		</li>
		<li class="w-date">${dspDate(kts, 2).substring()}</li>
		</ul>
		</li>
		`;
		$w.append(html);
	} 
}