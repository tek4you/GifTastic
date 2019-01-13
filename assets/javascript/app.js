
$(document).ready(function () {

var APIKey = "lz9rVgMTz2Jx2dYIq60Sc0ynPzx3uuKX";
var topics = ["baseball", "basketball", "golf", "swimming", "soccer", "dogs", "cats"];
   
//Loop to create a button for each item in topics array
function renderButtons(topics){
$("#btn-view").empty();
for (var i=0; i < topics.length; i++) {

//Create buttons for each item in topics
 var newBtn = $("<button>").text(topics[i])
    .addClass("btn btn-primary")
    .attr("data-name", topics[i]);

 $("#btn-view").append(newBtn);

};
// return;
}

function addNewBtn() {

// Calling renderButtons which handles the processing of our movie array
    renderButtons(topics);

  
}

//This function performs the API call and retrieves the Gif files
function getGifs(currentTopic){
 console.log({ currentTopic: currentTopic });
 var queryURL = "https://api.giphy.com/v1/gifs/search?api_key=" + APIKey + "&q=" + currentTopic + "&limit=10&offset=0&rating=G&lang=en";
     $.ajax({
        url: queryURL,
        method: "GET"}).then(function(response){
            renderGifs(response);
            renderButtons(topics);
        }); 
     }   
        
//This function puts the retrieved Gifs onto the page 
function renderGifs(response) {
    $("#gif-view").empty();

    for (var k=0; k < 10; k++) {

        var image = '<img src= " ' + response.data[k].images.original_still.url +
        '" data-still=" ' + response.data[k].images.original_still.url +
        ' " data-animate=" ' + response.data[k].images.original.url + '" data-state="still" class="gif" >';
        
        $("#gif-view").append(image);
    };
    
//This section listens for a click on a Gif to animate or stop
    $('.gif').on("click", function() {
        event.preventDefault();
        // var clickedGif = $(this).attr("class");
        var state = $(this).attr("data-state");
                    //  console.log({ 
                    //      testTExt: "Your in changeState funct",
                    //      this: this,
                    //      clickedGif: clickedGif,
                    //     state: state });

        if (state === "still") {
            $(this).attr("src", $(this).attr("data-animate"));
            $(this).attr("data-state", "animate");
          } else {
            $(this).attr("src", $(this).attr("data-still"));
            $(this).attr("data-state", "still");
          }
        });
        // renderButtons();
    }
renderButtons(topics);

 $(document).on("click", ".btn", function(event){
    event.preventDefault();

    var clickedTopic = $(this).attr("data-name");

    getGifs(clickedTopic);
 });

$("#add-sport").on("click", function(event) {
        event.preventDefault();
    
        // This line of code will grab the input from the textbox
        var sport = $("#sport-input").val().trim();
     
        // The input from the textbox is then added to our array
        topics.push(sport);
        renderButtons(topics);
    });
// 
    
    // getGifs(clickedTopic);
});