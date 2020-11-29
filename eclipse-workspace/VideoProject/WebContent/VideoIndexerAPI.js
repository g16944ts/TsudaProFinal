
/** var api_url = "https://api.videoindexer.ai/"; //Video Indexer API URL
var location = "trial";
var AzureSK = "d4cf76ac9e934f2bbb4c9c3de2ee434d";        // For Microsoft Azure Portal Subscription Key
var VideoIndexerSK = "055580a9bf564933b817e0df14028904"; //For Video Indexer Portal Subscription Key
var accountID = "59969001-ccc4-44a1-a7fb-43e88f021215";  // For Video Indexer API
*/

	$('#apiButton').click(function(){
        var params = {
            // Request parameters
            "allowEdit": true,
        };
      
        $.ajax({
            url: "https://api.videoindexer.ai/Auth/trial/Accounts/59969001-ccc4-44a1-a7fb-43e88f021215/Videos/4b6c0048a4/AccessToken?" + $.param(params),
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
            alert("success");
        })
        .fail(function() {
            alert("error");
        });
    });