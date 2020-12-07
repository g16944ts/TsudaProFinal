

var v = document.getElementById("video"); // media

// Play and Pause the video
function videoPlay(){
		  if ( v.paused )
		  {
		    v.play();
		  }
		  else
		  {
		    v.pause();
		  }
	}

// Video volume up	
function upVolume(){
	v.volume = v.volume + 0.25;
}

// Video volume down
function downVolume(){
	v.volume = v.volume - 0.25;
}

// Change the video speed
function videoSpeed(num){
	var n = parseInt(num);
		if( n == 2 ){
			v.playbackRate = 0.7;
		} else if( n == 1 ){
			v.playbackRate = 1.0;
		} else {
			v.playbackRate = 1.5;
		}
}

// Show English tracks from the beginning
function videoTracks(){
	var track = v.textTracks[0];
	
	track.mode = "showing";
}

// Click image button
function goClick(num) {
	var n = parseInt(num);
	var faceID;
	
	switch (n){
		case 0: // Ann Hathaway
			faceID = 2528;
			break;
		case 1: // Emily
			faceID = 2445;
			break;
		case 2: // Giselle
			faceID = 2120;
			break;
		case 3: // Tuicci
			faceID = 1666;
			break;
		case 4: // Unknown1
			faceID = 1307;
			break;	
	}
	getVideoAT(faceID);
}

function goClickAlladin(num) {
	var n = parseInt(num);
	var faceID;
	
	switch (n){
		case 0: // NaomiScott
			faceID = 1093;
			break;
		case 1: // Emily
			faceID = 2224;
			break;	
	}
	getAlladinVideoAT(faceID);
}

function firstPlay(){
	v.play();
}