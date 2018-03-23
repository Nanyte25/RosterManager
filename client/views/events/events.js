
import swal from 'sweetalert2';
import 'sweetalert2/dist/sweetalert2.min.css';


Template.events.onRendered(() => {

	 // Initialize the calendar

	var date = new Date();
    var d = date.getDate();
    var m = date.getMonth();
	var y = date.getFullYear();
	var inputName, inputTime, inputDescription;

    $('#events-calendar').fullCalendar({
        header: {
            left: 'basicDay, basicWeek, month',
            center: 'title',
            right: 'today prev,next'
		},
		timezone: 'local',
        editable: true,
		weekends: false,
		droppable: true,
        displayEventTime: true,
        allDayDefault: true,
        events: [{
            id: 1,
            title: 'EMEA NOC COVER',
            start: new Date(y, m, 1),
            allDay: true,
            description: 'EMEA NOC Cover by Pcremin and mfreer',
        }, {
            id: 2,
            title: 'Concert',
            start: '2018-03-07T21:00:00',
            end :'2018-03-07T23:00:00',
            allDay: true,
            color: '#e74c3c'
        }, {
            id: 3,
            title: 'Lunch',
            start: new Date(y, m, 16, 14),
            end: new Date(y, m, 16, 16),
            allDay: false,
            color: '#3498db'
        }, {
            id: 4,
            title: 'Class',
            start: new Date(y, m, 20, 10),
            allDay: false,
            color: '#9b59b6'
        }, {
            id: 5,
            title: 'Party',
            start: new Date(y, m, 5, 18),
            allDay: true,
            color: '#e67e22'
        }],
        dayClick: function(date) {
			swal.setDefaults({
				confirmButtonText: 'Next &rarr;',
				showCancelButton: true,
				animation: false,
				progressSteps: ['1', '2', '3'],
			})
			swal.queue([{
				title: 'New Event',
				text: 'Event Name:',
				input: 'text',
				preConfirm: function(inputValue) {
					return new Promise(function(resolve, reject) {
						if (!inputValue) {
							reject('Enter a Name')
						} else {
							inputName = inputValue;
							resolve()
						}
					})
				}
			}, {
				title: 'New Event',
				text: 'Event Description:',
				input: 'text',
				preConfirm: function(inputValue) {
					return new Promise(function(resolve, reject) {
						if (!inputValue) {
							reject('Enter a Description')
						} else {
							inputDescription = inputValue;
							resolve()
						}
					})
				}
			}, {
				title: 'New Event',
				text: 'Event Time:',
				input: 'select',
				inputOptions: {
					'06:00:00': '06:00 AM',
					'07:00:00': '07:00 AM',
					'08:00:00': '08:00 AM',
					'09:00:00': '09:00 AM',
					'10:00:00': '10:00 AM',
					'11:00:00': '11:00 AM',
					'12:00:00': '12:00 PM',
					'13:00:00': '01:00 PM',
					'14:00:00': '02:00 PM',
					'15:00:00': '03:00 PM',
					'16:00:00': '04:00 PM',
					'17:00:00': '05:00 PM',
					'18:00:00': '06:00 PM',
					'19:00:00': '07:00 PM',
					'20:00:00': '08:00 PM',
					'21:00:00': '09:00 PM',
					'22:00:00': '10:00 PM'
				},
				inputPlaceholder: 'Select Time',
				preConfirm: function(inputValue) {
					return new Promise(function(resolve, reject) {
						if (!inputValue) {
							reject('Enter a Time')
						} else {
							inputTime = inputValue;
							resolve()
						}
					})
				}
			}]).then(function(inputValue) {
				$('#events-calendar').fullCalendar('renderEvent', {
					title: inputName,
					description: inputDescription,
					start: date.format() + 'T' + inputTime,
					allDay: false,
				}, 'stick');
				swal.resetDefaults()
				swal({
					title: 'Event Created',
					html: "Name: " + inputName + "<br>Description: " + inputDescription + "<br>Time: " + inputTime,
					confirmButtonText: 'Done',
					showCancelButton: false
				})
			}, function() {
				swal.resetDefaults()
			})
		},
        eventClick: function(event) {
			swal({
				title: event.title,
				html: "Description: " + event.description + "<br>Time: " + moment(event.start).format("hh:mm A"),
				showCancelButton: true,
				confirmButtonColor: '#3085d6',
				confirmButtonText: 'Edit'
			}).then(function() {
				swal.setDefaults({
					confirmButtonText: 'Next &rarr;',
					showCancelButton: true,
					animation: false,
					progressSteps: ['1', '2', '3'],
				})
				swal.queue([{
					title: 'New Event',
					text: 'Event Name:',
					input: 'text',
					preConfirm: function(inputValue) {
						return new Promise(function(resolve, reject) {
							if (!inputValue) {
								reject('Enter a Name')
							} else {
								inputName = inputValue;
								event.title = inputName;
								resolve()
							}
						})
					}
				}, {
					title: 'New Event',
					text: 'Event Description:',
					input: 'text',
					preConfirm: function(inputValue) {
						return new Promise(function(resolve, reject) {
							if (!inputValue) {
								reject('Enter a Description')
							} else {
								inputDescription = inputValue;
								event.description = inputDescription;
								resolve()
							}
						})
					}
				}, {
					title: 'New Event',
					text: 'Event Time:',
					input: 'select',
					inputOptions: {
						'06:00:00': '06:00 AM',
						'07:00:00': '07:00 AM',
						'08:00:00': '08:00 AM',
						'09:00:00': '09:00 AM',
						'10:00:00': '10:00 AM',
						'11:00:00': '11:00 AM',
						'12:00:00': '12:00 PM',
						'13:00:00': '01:00 PM',
						'14:00:00': '02:00 PM',
						'15:00:00': '03:00 PM',
						'16:00:00': '04:00 PM',
						'17:00:00': '05:00 PM',
						'18:00:00': '06:00 PM',
						'19:00:00': '07:00 PM',
						'20:00:00': '08:00 PM',
						'21:00:00': '09:00 PM',
						'22:00:00': '10:00 PM'
					},
					inputPlaceholder: 'Select Time',
					preConfirm: function(inputValue) {
						return new Promise(function(resolve, reject) {
							if (!inputValue) {
								reject('Enter a Time')
							} else {
								inputTime = inputValue;
								event.start = moment(event.start).format("YYYY-MM-DD") + 'T' + inputTime;
								resolve()
							}
						})
					}
				}]).then(function(inputValue) {
					$('#events-calendar').fullCalendar('updateEvent', event);
					swal.resetDefaults()
					swal({
						title: 'Event Created',
						html: "Name: " + inputName + "<br>Description: " + inputDescription + "<br>Time: " + inputTime,
						confirmButtonText: 'Done',
						showCancelButton: false
					})
				}, function() {
					swal.resetDefaults()
				})
			})
		},
        eventMouseover: function(calEvent) {
            $(this).css('background-color', 'black');
        }
    });
});
