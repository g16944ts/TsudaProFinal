
/** 
const api_url = "https://api.videoindexer.ai/"; //Video Indexer API URL
const location = "trial";
const AzureSK = "d4cf76ac9e934f2bbb4c9c3de2ee434d";        // For Microsoft Azure Portal Subscription Key
const VideoIndexerSK = "055580a9bf564933b817e0df14028904"; //For Video Indexer Portal Subscription Key
const accountID = "59969001-ccc4-44a1-a7fb-43e88f021215";  // For Video Indexer API
*/

	$('#apiButton').click(function(){
		
        getVideoAT();
    });


function getVideoAT(){
	
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
			//$('#p1').text(data);
			getVideoIndex(data);
        }).fail(function() {
            alert("error");
        });		
}

function getVideoIndex(videoAT){
	
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
	})
	.done(function(data) {
            //$('#p1').text(data[0].faces);
			alert(data);
        })
        .fail(function() {
            alert("error");
        });
}