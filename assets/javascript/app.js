
$(document).ready(function () {

var APIKey = "lz9rVgMTz2Jx2dYIq60Sc0ynPzx3uuKX";
var topics = ["baseball", "basketball", "golf", "swimming", "soccer", "dogs", "cats"];

for (var i=0; i < topics.length; i++) {
 //Create buttons for each itme in topics

 var newBtn = $("<button>").text(topics[i])
    .addClass("btn btn-primary")
    .attr("data-name", topics[i]);

 $("#btn-view").append(newBtn);

};

function getGifs(currentTopic){
 console.log({
     currentTopic: currentTopic
 })
 var queryURL = "https://api.giphy.com/v1/gifs/search?api_key=" + APIKey + "&q=" + currentTopic + "&limit=10&offset=0&rating=G&lang=en";
$("#gif-view").empty();
    $.ajax({
        url: queryURL,
        method: "GET"}).then(function(response){
            console.log({ response: response });       
      
    //    renderGifs(response);
    for (var k=0; k < 10; k++){
        var nextGif = $("<img>").attr("src", response.data[k].images.original.url);
        $("#gif-view").append(nextGif);
    };
     // function  renderGifs() {
    });

};

$(".btn").on("click", function(event){
    event.preventDefault();

    var clickedTopic = $(this).attr("data-name");

    console.log({
        clickedTopic: clickedTopic
    });
    getGifs(clickedTopic);
});

})