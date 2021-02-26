var containerEl = $(".container");

var eventsArr = [{
		time: moment()
			.hour(9),
		event: ""
	},
	{
		time: moment()
			.hour(10),
		event: ""
	},
	{
		time: moment()
			.hour(11),
		event: ""
	},
	{
		time: moment()
			.hour(12),
		event: ""
	},
	{
		time: moment()
			.hour(13),
		event: ""
	},
	{
		time: moment()
			.hour(14),
		event: ""
	},
	{
		time: moment()
			.hour(15),
		event: ""
	},
	{
		time: moment()
			.hour(16),
		event: ""
	},
	{
		time: moment()
			.hour(17),
		event: ""
	}
];

function currentDate() {
	date = moment()
		.format("dddd, MMMM Do");
	$("#currentDay")
		.text(date);
}

function drawHours() {

	for (let i = 0; i < eventsArr.length; i++) {
		var timeBlockEl = $("<div>")
			.addClass("time-block");
		var rowEl = $("<div>")
			.addClass("row");
		var hourEl = $("<div>")
			.addClass("hour col-1")
			.text(moment(eventsArr[i]
				.time)
				.format("hA"));
		var eventEl = $("<div>")
			.addClass("event col-10");
		var textAreaEl = $("<textarea>")
			.text(eventsArr[i].event);
		var saveBtnEl = $("<button>")
			.addClass("saveBtn col-1")
			.html("<i class='fas fa-inbox'></i>");

		containerEl.append(timeBlockEl);
		timeBlockEl.append(rowEl);
		rowEl.append([hourEl, eventEl, saveBtnEl]);
		eventEl.append(textAreaEl);
	}
	
	checkTime();
}

function checkTime() {
	let now = moment()
		.format("hA");
	console.log(now);

	for (let i = 0; i < eventsArr.length; i++) {
		let time = moment(eventsArr[i]
			.time)
			.format("hA");
			
		$event = $(".time-block")
			.eq(i)
			.children(".row")
			.children(".event");
			
		console.log($event);
			
		console.log(time);
		
		if (now == time) {
			console.log(`${time} is now!`);
			$event.addClass("present");
		} else if (time > now) {
			console.log(`${time} is in the future!`);
			$event.addClass("future");
		} else {
			console.log(`${time} is in the past!`);
			$event.addClass("past");
		}
	}


}

currentDate();
drawHours();

// Event listeners

containerEl.on("click", "textarea", function() {
	var index = $(this)
		.closest(".time-block")
		.index();
	console.log(index);
});

containerEl.on("click", "button", function() {
	var index = $(this)
		.closest(".time-block")
		.index();

	console.log(index);

	// put in local storage
	var data = JSON.stringify(eventsArr);
	localStorage.setItem("today", data);
});