let containerEl = $(".container");

let eventsArr = [];

function currentDate() {
	date = moment()
		.format("dddd, MMMM Do");
	$("#currentDay")
		.text(date);
}

function drawHours() {

	let hour = 9;
	let savedEvents = localStorage.getItem("today");
	let eventObj = {};
	savedEvents = JSON.parse(savedEvents);

	for (let i = 0; i < 8; i++) {

		if (savedEvents == null) {
			
			eventObj = {
				time: moment()
					.hour(hour),
				event: ""
			};
			
		} else {

				eventObj = {
					time: moment()
						.hour(hour),
					event: savedEvents[i].event
				};
			}
	
		eventsArr.push(eventObj);
		hour++;

		let timeBlockEl = $("<div>")
			.addClass("time-block");
		let rowEl = $("<div>")
			.addClass("row");
		let hourEl = $("<div>")
			.addClass("hour col-1")
			.text(moment(eventsArr[i]
					.time)
				.format("hA"));
		let eventEl = $("<div>")
			.addClass("event col-10");
		let textAreaEl = $("<textarea>")
			.addClass("eventTxtArea")
			.text(eventsArr[i].event);
		let saveBtnEl = $("<button>")
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
		.format("HH");

	for (let i = 0; i < eventsArr.length; i++) {
		let time = moment(eventsArr[i].time)
			.format("HH");

		$event = $(".time-block")
			.eq(i)
			.children(".row")
			.children(".event");

		if (now == time) {
			$event.addClass("present");
		} else if (time > now) {
			$event.addClass("future");
		} else {
			$event.addClass("past");
		}
	}

}

currentDate();
drawHours();

// Event listeners

containerEl.on("change", "textarea", function() {
	$(this).addClass("unsaved");
})

containerEl.on("click", "button", function() {
	let $eventText = $(this)
		.closest(".time-block")
		.children(".row")
		.children(".event")
		.children(".eventTxtArea")
		.removeClass("unsaved")
		.val();

	let index = $(this)
		.closest(".time-block")
		.index();

	eventsArr[index].event = $eventText;

	// put in local storage
	let data = JSON.stringify(eventsArr);
	localStorage.setItem("today", data);
});