/**
 * 
 */

var api_url = "https://api.videoindexer.ai/"; //Video Indexer API URL
var location = "trial";
var AzureSK = "d4cf76ac9e934f2bbb4c9c3de2ee434d";        // For Microsoft Azure Portal Subscription Key
var VideoIndexerSK = "055580a9bf564933b817e0df14028904"; //For Video Indexer Portal Subscription Key
var accountID = "59969001-ccc4-44a1-a7fb-43e88f021215";  // For Video Indexer API
/*
// Get video access token
function getVideoAccessToken(){
 
  var videoID = "4b6c0048a4";
  
  var params = {
            // Request parameters
            "allowEdit": "True",
        };

  .ajax()
}
*/


$('#apiButton').click(function() {
        var params = {
            // Request parameters
            "allowEdit": True,
        };
      
        $.ajax({
            url: api_url + "Auth/" + location + "/Accounts/" + accountID + "/Videos/4b6c0048a4/AccessToken?" + $.param(params),
            beforeSend: function(xhrObj){
                // Request headers
                xhrObj.setRequestHeader("x-ms-client-request-id",VideoIndexerSK);
                xhrObj.setRequestHeader("Ocp-Apim-Subscription-Key",AzureSK);
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