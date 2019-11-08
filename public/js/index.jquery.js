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
		$(".main").hide();
	} 
	else if(type == 'W') {
		$(".navi > li").removeClass("navi-sel");
		$(".navi").eq(1).find("li").eq(2).addClass("navi-sel");
		$(".wrap-daily").hide();
		$(".wrap-weekly").show();
		$(".main").hide();
	}
	else { //main
		$(".wrap-daily").hide();
		$(".wrap-weekly").hide();
		$(".main").show();
	}
}


// 도시정보 가져오기
function cityFn(res) {
	var cities = res.cities;
	$("#cities").empty();
	$("#cities").append('<option value="" selected>Select Your City</option>');
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
	console.log(res);
	var $d = $(".wrap-daily > .conts"); //변수에 넣어주면 DOM 내 수정이 있어도 변수내용 한번만 바뀌니까 DOM 요소들을 변수에 넣어주는 습관을 들이자
	$d.empty();
	var dt = String(new Date()).split(" ");
	// var kt = new Date(new Date(res.dt).getTime()+(9*60*60*1000));
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
	var html = '';
	html +='<div class="weather-icon"><img src="../img/'+res.weather[0].icon+'.png" class="img"></div>';
	html +='<div class="city-name">'+res.name+'</div>';
	html +='<div class="city-weather">'+res.weather[0].main+'</div>';
	html +='<ul class="city-desc">';
	html +='<li class="desc-temp">'+Math.floor(res.main.temp)+'˚</li>';
	html +='<li class="desc-detail">';
	html +='<div class="desc-status">'+res.weather[0].description+'</div>';
	html +='<div class="desc-humidity">Humidity : '+res.main.humidity+'%</div>';
	html +='<div class="desc-wind">Wind : '+res.wind.speed+' Km/h</div>';
	html +='</li>';
	html +='</ul>';
	html +='<div class="city-date">';
	html +='<div class="date-week">'+dt[0]+'</div>';
	html +='<div class="date-dmonth">'+dt[1]+' '+dt[2]+'</div>';
	html +='</div>';
$d.append(html);
/* 	$d.append('<div class="text-center py-3 weather-icon"><img src="../img/'+res.weather[0].icon+'.png" class="img"</div>');
	$d.append('<div class="text-center fa-3x py-3 city-name">'+res.name+'</div>');
	$d.append('<div class="text-center fa-2x py-3 city-weather"><b>'+res.weather[0].main+'</br></div>');
	$d.append('<div class="text-center fa-2x py-3 city-temp"><b>'+Math.floor(res.main.temp)+'</b>℃</div>');
	$d.append('<div class="city-date"><div class="text-center fa-3x py-3 date-week">'+dt[0]+'</div>');
	$d.append('<div class="text-center fa-3x py-3 date-dmonth">'+dt[1]+" "+dt[2]+'</div></div>'); */
	wrapChg("D");
}


// 위클리정보 가져오기
function weeklyFn (res) {
	console.log(res);
	var kts;
	var html = '';
	var $w = $(".wrap-weekly > .conts")
	$w.empty();
	$w.append(`<div class="city-name">${res.city.name}</div>`);
	for(var v of res.list) {
		kts = new Date(v.dt * 1000);
		var week = dateEng(kts, 4)
		html += '<li class="w-item">';
		html += '<div>';
		html += '<img src="../img/'+v.weather[0].icon+'.png" class="w-100">';
		html += '</div>';
		html += '<ul class="w-info">';
		html += '<li class="w-temp">';
		html += '<span>'+Math.floor(v.main.temp)+'˚</span>';
		html += '</li>';
		html += '<li class="w-desc">';
		html += '<span class="w-week">'+week+'</span>';
		html += '<span class="w-status">'+v.weather[0].main+'</span>';
		html += '<div class="w-date">'+dspDate(kts, 2).substring()+'</div>';
		html += '</li>';
		html += '</ul>';
		html += '</li>';
		$w.append(html);
	} 
}