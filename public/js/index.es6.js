// 전역변수
var key = '249ed7a4f8138c8a571bccfb3bd6af1c';
var units = 'metric';
var dailyAPI = 'https://api.openweathermap.org/data/2.5/weather';
var weeklyAPI = 'https://api.openweathermap.org/data/2.5/forecast';
//https://api.openweathermap.org/data/2.5/weather?id=1835848&appid=249ed7a4f8138c8a571bccfb3bd6af1c&units=metric
var cityURL = '../json/city.json';
var dailyURL = dailyAPI + '?appid=' + key + '&units=' + units;
var weeklyURL = weeklyAPI + '?appid=' + key + '&units=' + units;

// 프로그램 시작
init();
function init(){
	var ajax = new XMLHttpRequest(); //통신용 개체생성
	ajax.onreadystatechange = cityFn;
	ajax.open('GET', cityURL, true);
	ajax.send();
}

// 도시정보 가져오기
function cityFn() {
	if(this.readyState == 4 && this.status == 200) {
		var _city = document.querySelector("#cities");
		var res = JSON.parse(this.responseText).cities;
		var _elem = document.createElement('option');
		var title = document.createTextNode('도시를 선택해주세요.');
		_elem.appendChild(title);
		_elem.setAttribute("value", "");
		_elem.setAttribute("selected", "selected");
		_city.innerHTML= "";
		_city.appendChild(_elem);
		//<option value="" selected>도시를 선택해주세요.</option>
		for(var i in res) {
			_elem = document.createElement('option');
			title = document.createTextNode(res[i].name);
			_elem.setAttribute("value", res[i].id);
			_elem.appendChild(title);
			_city.appendChild(_elem);
		}
		_city.addEventListener("change", function(){
			var ajax = new XMLHttpRequest();
			ajax.onreadystatechange = dailyFn;
			ajax.open('GET', dailyURL +"&id="+ this.value, true);
			ajax.send();
		});

	}
}

// 데일리정보 가져오기
function dailyFn() {
	if(this.readyState == 4 && this.status == 200) {
		console.log(JSON.parse(this.responseText));
	}
}