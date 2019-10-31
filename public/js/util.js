// '2019년 8월 11일 11시 11분 11초' 형식으로 보내주는 함수

function dspDate(d, type) {
	var monthArr = ["1월", "2월", "3월", "4월", "5월", "6월", "7월", "8월", "9월", "10월", "11월", "12월"];
	//for (var i=1; i = monthArr; i++) { i+"월"}
	var year = d.getFullYear() + "년 "; // 2019
	var month = monthArr[d.getMonth()] + " "; // 7 (0~11)배열
	var day = d.getDate() + "일 "; // 1 ~ 31
	var hour = d.getHours() + "시 "; // 0 ~ 23
	var min = d.getMinutes() + "분 " // 0 ~ 59
	var sec = d.getSeconds() + "초 " // 0 ~ 59
	var returnStr;
	/* 
	type 0 : 2019년 8월 11일 11시 11분 11초 
	type 1 : 2019년 8월 11일 11시 11분
	type 2 : 2019년 8월 11일 11시
	type 3 : 2019년 8월 11일
	type 4 : 8월 11일
	*/
	switch(type) {
		case 1:
			returnStr = year + month + day + hour + min;
			break;
		case 2:
				returnStr = year + month + day + hour;
			break;
		case 3:
				returnStr = year + month + day;
			break;
		case 4:
				returnStr = month + day;
			break;
		default: 
			year + month + day + hour + min + sec;
			break;

	}
	return returnStr;
} 



function dateEng(d, type) {
	var monthArr = ["January", "February", "March", "April", "May", "June,", "July", "August", "September", "October", "November", "December"];
	var year = d.getFullYear() + " "; // 2019
	var month = monthArr[d.getMonth()] + " "; // 7 (0~11)배열
	var day = d.getDate() + " "; // 1 ~ 31
	var hour = d.getHours() + ":"; // 0 ~ 23
	var min = d.getMinutes() + ":" // 0 ~ 59
	var sec = d.getSeconds() + " " // 0 ~ 59
	var weekArr = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"]
	var week = weekArr[d.getDay()]; // 0~6
	var returnStr;
	/* 
	type 1 : 2019 October 31 11:11
	type 2 : 2019 October 31
	type 3 : 2019 October
	type 4 : Monday
	*/
	switch(type) {
		case 1:
			returnStr = year + month + day + hour + min;
			break;
		case 2:
				returnStr = year + month + day;
			break;
		case 3:
				returnStr = year + month;
			break;
		case 4:
				returnStr = week;
			break;
		default: 
				returnStr = month;
			break;

	}
	return returnStr;
} 