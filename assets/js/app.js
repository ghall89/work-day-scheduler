var containerEl = $(".container");

var eventsArr = [{
		time: "9AM",
		event: ""
	},
	{
		time: "10AM",
		event: ""
	},
	{
		time: "11AM",
		event: ""
	},
	{
		time: "12PM",
		event: ""
	},
	{
		time: "1PM",
		event: ""
	},
	{
		time: "2PM",
		event: ""
	},
	{
		time: "3PM",
		event: ""
	},
	{
		time: "4PM",
		event: ""
	},
	{
		time: "5PM",
		event: ""
	}
];

function drawHours() {

	for (let i = 0; i < eventsArr.length; i++) {
		var timeBlockEl = $("<div>")
			.addClass("time-block");
		var rowEl = $("<div>")
			.addClass("row");
		var hourEl = $("<div>")
			.addClass("hour col-1")
			.text(eventsArr[i].time);
		var eventEl = $("<div>")
			.addClass("past col-10");
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

}


function checkTime() {
	now = moment()
		.format("LT");
	console.log(now);
}

drawHours();