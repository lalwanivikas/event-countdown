// Input elements
var input = document.getElementsByClassName("input")[0];
var eventName = document.getElementById("eventName");
var eventDate = document.getElementById("eventDate");
var startCountdown = document.getElementById("startCountdown"); //button to start timer

//Output elements
var output = document.getElementsByClassName("output")[0];
var displayName = document.getElementById("displayName"); //div for displaying event name
var displayTime = document.getElementById("displayTime"); //div for displaying timer
var dhms = document.getElementById("dhms"); //div for displaying dhms captopn


//Modifying date picker element of jQuery UI 
$(function() {
	$( "#eventDate" ).datetimepicker({
		minDate: "+1d",
		onClose: function(){
			if (Date.parse(eventDate.value) < Date.now()) {
				alert("oops! please enter a future date.")
			}
		}
	});
});

//function to convert millisecond into dd:hh:mm:ss
function dhm(t){			
	
	var cd = 24 * 60 * 60 * 1000,
		ch = 60 * 60 * 1000,
		cm = 60 * 1000,
		d = Math.floor(t / cd),
		h = Math.floor( (t - d * cd) / ch),
		m = Math.floor( (t - d * cd - h * ch) / 60000),
		s = Math.round( (t - d * cd - h * ch - m * cm) / 1000),
		pad = function(n){ return n < 10 ? '0' + n : n; };
	
	if( s == 60 ){
		m++;
		s = 0;
	}

	if( m === 60 ){
		h++;
		m = 0;
	}
	
	if( h === 24 ){
		d++;
		h = 0;
	}
	
	if(d === 0 && h === 0 && m === 0 && s === 0 ){
		output.parentNode.removeChild(output);
		alert("It's Party Time!");
		window.location.reload();
	} else {
		return [d, pad(h), pad(m), pad(s)].join(':');
	}
}

startCountdown.addEventListener("click", function(){

	input.parentNode.removeChild(input);

	output.style.display = "block";
	
	setInterval(function() {
		var timeRemaining = Date.parse(eventDate.value) - Date.now(); //time diff in milliseconds
		displayName.innerHTML = eventName.value;
		displayTime.innerHTML = dhm(timeRemaining);
		dhms.innerHTML = "( " + ["days", "hours", "minutes", "seconds"].join(' : ') + " )";
	}, 1000);

});









