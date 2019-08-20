// 전역변수
var key = '249ed7a4f8138c8a571bccfb3bd6af1c';
var units = 'metric';
var dailyAPI = 'https://api.openweathermap.org/data/2.5/weather';
var weeklyAPI = 'https://api.openweathermap.org/data/2.5/forecast';
//https://api.openweathermap.org/data/2.5/weather?id=1835848&appid=249ed7a4f8138c8a571bccfb3bd6af1c&units=metric
var cityURL = 'json/city.json';
var dailyURL = dailyAPI + '?appid=' + key + '&units=' + units;
var weeklyURL = weeklyAPI + '?appid=' + key + '&units=' + units;


//프로그램 시작
init();
function init() {
 $.ajax({
	 type: "get",
	 url: cityURL,
	 dataType: "json",
	 success: cityFn
 });
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
		$.ajax({
			type: "get",
			url: dailyURL + "&id=" + $(this).val(),
			dataType: "json",
			success: dailyFn
		});
	});
}

// 데일리정보 가져오기
function dailyFn (res) {
	console.log(res);
}