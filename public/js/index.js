
/* 
// jQuery ajax 통신
function cityInit() {
	$.$.ajax({
		type: "get",
		url: "json/city.json", //index.html file 기준
		dataType: "json",
		success: function (res) {
			console.log(res);
		}
	});
} */

// 전역변수
var ajax = new XMLHttpRequest();
var dailyAjax = new XMLHttpRequest();
var weeklyAjax = new XMLHttpRequest();

var key = '249ed7a4f8138c8a571bccfb3bd6af1c';
var dailyAPI = 'https://api.openweathermap.org/data/2.5/weather';
var weeklyAPI = 'https://api.openweathermap.org/data/2.5/forecast';

// main - 도시정보 가져오기
cityInit ();
function cityInit() {
		ajax.onreadystatechange = function() {
			if (this.readyState == 4 && this.status == 200) {
				var cities = JSON.parse(this.responseText).cities;
				// id로 DOM 접근하기 - jQuery
				var $citySelect = $("#cities"); //<select>
				// id로 DOM 접근하기 - ES5 (거의안씀) -> 근데 ES5가 뭔가요? 
				var citySelect5 = document.getElementById("cities"); //#필요없음
				// id로 DOM 접근하기 - ES6
				var citySelect = document.querySelector("#cities");
				//console.log($citySelect[0], $(citySelect5), citySelect);

				// ES5: select#cities 에 도시를 option으로 추가하기
/* 				for(var i in cities) {
					var html = '<option value="'+cities[i].id+'">'+cities[i].name+'</option>';
					document.getElementById("cities").innerHTML += html ; */

				// ES6 : select#cities 에 도시를 option으로 추가하기
					//document.querySelector("#cities")
					var elem;
					var cityName;

					elem = document.createElement('option');
					cityName = document.createTextNode("날씨를 검색할 도시 이름을 선택해주세요.");
					elem.appendChild(cityName); 
					elem.setAttribute("value", "");
					elem.setAttribute("selected", "selected");
					citySelect.appendChild(elem);
					
					for(var i in cities) {
						elem = document.createElement('option'); //tag생성. 단 DOM 적용 전 단계
						cityName = document.createTextNode(cities[i].name); //tag 안에 삽입될 text생성
						elem.setAttribute("value", cities[i].id); // 생성된 tag에 속성부여
						elem.appendChild(cityName); //생성된 tag에 생성된 text 추가
						citySelect.appendChild(elem);	//생성된 tag를 원하는 DOM의 Element에 붙인다.
					}

			/* 		//jQuery select change event
					$("#cities").change(function(){
						console.log(	$(this).val()	);
					}); */
					
					// ES5, ES6 change event
					//citySelect.addEventListener(이벤트, 콜백함수)
					citySelect.addEventListener("change", function (){
					 var cityId = this. value;
					 var dailyURL = dailyAPI + "?appid=" + key + "&id=" + cityId; 
					 dailyAjax.onreadystatechange = function() {
						 if(this.readyState == 4 && this.status == 200) {
						 var daily =	JSON.parse(this.responseText);
						 console.log(daily);						 
						}
					 };
					 dailyAjax.open("GET", dailyURL, true);
					 dailyAjax. send();

					});

					/* 
					jQuery: select#cities 에 도시를 option으로 추가하기
					<option value="181122">서울</option>
					for(var i in cities) {
					$citySelect.append('<option value="'+cities[i].id+'">'+cities[i].name+'</option>');
					html = '<option value="'+cities[i].id+'">'+cities[i].name+'</option>';
					$(citySelect).append(html);} */
		
			}

		};
		ajax.open("GET", "../json/city.json", true);
		ajax.send(); 
	}

	