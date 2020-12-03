
/** 
const api_url = "https://api.videoindexer.ai/"; //Video Indexer API URL
const location = "trial";
const AzureSK = "d4cf76ac9e934f2bbb4c9c3de2ee434d";        // For Microsoft Azure Portal Subscription Key
const VideoIndexerSK = "055580a9bf564933b817e0df14028904"; //For Video Indexer Portal Subscription Key
const accountID = "59969001-ccc4-44a1-a7fb-43e88f021215";  // For Video Indexer API
*/

function getVideoAT(faceID){
	
	var params = {
		"allowEdit" : true,
	};
	
		$.ajax({
			url : "https://api.videoindexer.ai/Auth/trial/Accounts/59969001-ccc4-44a1-a7fb-43e88f021215/Videos/4b6c0048a4/AccessToken?" + $.param(params),
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
		url : "https://api.videoindexer.ai/trial/Accounts/59969001-ccc4-44a1-a7fb-43e88f021215/Videos/4b6c0048a4/Index?" + $.param(params),
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
		var trimData = data.videos[0].insights;
		var faceData = trimData.faces;
		var len = Object.keys(trimData['faces']).length; 
		$('#p1').text(JSON.stringify(len));
		var video = $('#video').get(0);
 		
		for(var i=0; i<len; i++){
			
			if(faceData[i].id == faceID){
				
				var faceAppearance = faceData[i].instances;
				$('#p1').text(JSON.stringify(faceAppearance));
				//var l = Object.keys(faceData['appearances'].length);
				//for(var j=0; j++; j<l){
					//$('#p1').text(JSON.stringify(faceData[i].appearances[j]));
				//}
			}
		} 
		//$('#p1').text(JSON.stringify(faceData));
}