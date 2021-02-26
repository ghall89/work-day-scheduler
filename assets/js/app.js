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

	for (let i = 0; i < 8; i++) {
		
		let eventObj = {
			time: moment().hour(hour),
			event: ""
		};
		
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

containerEl.on("click", "textarea", function() {
	let index = $(this)
		.closest(".time-block")
		.index();
	console.log(index);
});

containerEl.on("click", "button", function() {
	let index = $(this)
		.closest(".time-block")
		.index();

	console.log(index);

	// put in local storage
	let data = JSON.stringify(eventsArr);
	localStorage.setItem("today", data);
});