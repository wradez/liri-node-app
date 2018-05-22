//.env import
require("dotenv").config();

var keys = require("./keys.js");

//spotify
var Spotify = require('node-spotify-api');
var spotify = new Spotify(keys.spotify);

//twitter
var Twitter = require("twitter");
var client = new Twitter(keys.twitter);

var fs = require("fs");
var request = require('request');
var command = process.argv[2];
var secondInput;

for(var i = 3; i < process.argv.length; i++){
    if(i > 3){
        secondInput += " " + process.argv[i];
    }else{
        secondInput = process.argv[i];
    }
}

switch(command){
    case "my-tweets":

        console.log(command);

        var params = {screen_name: 'Walker51177074'};

        client.get('statuses/user_timeline', params, function(error, tweets, response) {

            if(error){
                console.log(error);
            }

            var numTweets = 20;
            if (tweets.length < 20) {
                numTweets = tweets.length;
            }

            for(var i = 0; i < numTweets; i++){
                var tweetText = tweets[i].text;
                var tweetDate = tweets[i].created_at;

                console.log("Tweet #" + (i+1) + " - " + tweetText + "Tweeted on - " + tweetDate);

            }
        });
        break;
    case "spotify-this-song":
        playThatThing(secondInput);
        break;
    case "movie-this":
        whatsThatMovie();
        break;
    case "do-what-it-says":
        doThatThing();
        break;
}
function playThatThing(songArg){

    spotify.search({ type: "track", query: songArg }, function(err, data) {
        if (err) {
          return console.log('Error occurred: ' + err);
        }
       var songInfo = data.tracks.items[0];
       
       var artist = songInfo.album.artists[0].name;
       var songName = songInfo.name;
       var previewURL = songInfo.preview_url;
       var albumName = songInfo.album.name;


       console.log("\nGreat choice! Here's your song info:\n\nSong Name: " + songName + "\nArtist: " + artist + "\nAlbum Name: " + albumName + "\nHave a listen: " + previewURL + "\n"); 
       
      });
      
}


function whatsThatMovie(){

    var queryUrl = "http://www.omdbapi.com/?t=" + secondInput + "&y=&plot=short&apikey=53454a1";

    request(queryUrl, function(error, response, body) {

        // If the request is successful
        if (!error && response.statusCode === 200) {
            var movieInfo = JSON.parse(body);

            var title = movieInfo.Title;
            var year = movieInfo.Year;
            var ratingsIMDB = movieInfo.Ratings[0].Value;
            var ratingsRotten = movieInfo.Ratings[1].Value;
            var productionCountry = movieInfo.Country;
            var language = movieInfo.Language;
            var plot = movieInfo.Plot;
            var actors = movieInfo.Actors;

          console.log("Your Selected Movie Poster:\n");
          console.log("\n--------------------------------------------------------------------------------------------------------------------------");
          console.log("| Movie Title: " + title);
          console.log("| Year of Production: " + year);
          console.log("| IMDB Rating: " + ratingsIMDB);
          console.log("| Rotten Tomatos Rating: " + ratingsRotten);
          console.log("| Year of Production: " + year);
          console.log("| Produced in: " + productionCountry);
          console.log("| Language : " + language);
          console.log("| Plot: " + plot);
          console.log("| Actors: " + actors);
          console.log("-------------------------------------------------------------------------------------------------------------------------\n");

        }else if(error){
            console.log(error);
        }

      });
      
}

function doThatThing(){

    fs.readFile("random.txt", "utf8", function(error, data) {

        if (error) {
            return console.log(error);
          }

        var dataArray = data.split(",");

        playThatThing(dataArray[1]);
    });
};