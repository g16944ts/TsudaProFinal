/** 
const api_url = "https://api.videoindexer.ai/"; //Video Indexer API URL
const location = "trial";
const AzureSK = "d4cf76ac9e934f2bbb4c9c3de2ee434d";        // For Microsoft Azure Portal Subscription Key
const VideoIndexerSK = "055580a9bf564933b817e0df14028904"; //For Video Indexer Portal Subscription Key
const accountID = "59969001-ccc4-44a1-a7fb-43e88f021215";  // For Video Indexer API
*/

function getAlladinVideoAT(faceID){
	
	var params = {
		"allowEdit" : true,
	};
	
		$.ajax({
			url : "https://api.videoindexer.ai/Auth/trial/Accounts/59969001-ccc4-44a1-a7fb-43e88f021215/Videos/5c4e4b65fb/AccessToken?" + $.param(params),
            beforeSend: function(xhrObj){
                // Request headers 
                xhrObj.setRequestHeader("x-ms-client-request-id", "d4cf76ac9e934f2bbb4c9c3de2ee434d");
                xhrObj.setRequestHeader("Ocp-Apim-Subscription-Key","055580a9bf564933b817e0df14028904");
            },
            type: "GET",
            // Request body
            data: "{body}",
		})
		.done(function(data) {
			getVideoIndex(data, faceID);
        }).fail(function() {
            alert("error");
        });		
}

function getVideoIndex(videoAT, faceID){
	
	var params = {
		"accessToken" : videoAT,
	};
	
	$.ajax({
		url : "https://api.videoindexer.ai/trial/Accounts/59969001-ccc4-44a1-a7fb-43e88f021215/Videos/5c4e4b65fb/Index?" + $.param(params),
		beforeSend : function(xhrObj){
                // Request headers 
                xhrObj.setRequestHeader("x-ms-client-request-id", "d4cf76ac9e934f2bbb4c9c3de2ee434d");
                xhrObj.setRequestHeader("Ocp-Apim-Subscription-Key","055580a9bf564933b817e0df14028904");
            },
		type: "GET",
        // Request body
        data: "{body}",
		dataType: 'json',
		contentType: "application/json; charset=utf-8",
	})
	.done(function(data) {
		getFaceDuration(data, faceID);
        })
        .fail(function() {
            alert("error");
        });
}

function getFaceDuration(data, faceID){
		var trimData = data.videos[0].insights; //insights全体
		var faceData = trimData.faces; //insightsの中のfaces
		var len = Object.keys(trimData['faces']).length; 
	
		$('#p1').text("");
		
		for(var i=0; i<len; i++){
			
			if(faceData[i].id == faceID){
				
				var faceAppearance = faceData[i].instances; //insightsの中のfacesの中のinstances(顔が出てくる秒数がわかる)
			}
		}
		
		var l = faceAppearance.length;
		var startArray = [];
		var endArray = [];
		for(var j=0; j<l; j++){
			
			var startTime = faceAppearance[j].start;
			var endTime = faceAppearance[j].end;
			
			var start = startTime.split(':').reverse().reduce((prev,cur,idx) => prev + cur * Math.pow(60,idx),0).toFixed(4);
			var end = endTime.split(':').reverse().reduce((prev,cur,idx) => prev + cur * Math.pow(60,idx),0).toFixed(4);
			startArray.push(start);
			endArray.push(end);
		}
		
		//$('#p1').text(startArray[0]);
		timeEvent(startArray,endArray);
}

function timeEvent(startArray, endArray){
	var v = $('#video').get(0);
	v.currentTime = 0;
	var l = startArray.length;
	
	v.play();
	for(var i=0; i<l; i++){

	v.addEventListener('timeupdate', {starttime: startArray[i], endtime: endArray[i], handleEvent: timer});
	//v.addEventListener('timeupdate', {endtime: endArray[i], handleEvent: timer});
	}
	
}

function timer(e){
	var v = $('#video').get(0);

	if(Math.abs(this.starttime - v.currentTime.toFixed(4)).toFixed(3)<0.25){
		v.muted = true;
		$('#div5').css("visibility","visible");
		return;
	} else if(Math.abs(this.endtime - v.currentTime.toFixed(4)).toFixed(3)<0.25){
		v.muted = false;
		$('#div5').css('visibility','hidden');
		return;
	}
	
}