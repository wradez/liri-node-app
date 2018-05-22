//.env import
require("dotenv").config();

var keys = require("./keys.js");

//spotify
var Spotify = require('node-spotify-api');
var spotify = new Spotify(keys.spotify);

//twitter
var Twitter = require("twitter");
var client = new Twitter(keys.twitter);

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

    case "spotify-this-song":
        playThatThing();
    case "movie-this":
        whatsThatMovie();
    case "do-what-it-says":
        doThatThing();
}
function playThatThing(){

    spotify.search({ type: "track", query: secondInput }, function(err, data) {
        if (err) {
          return console.log('Error occurred: ' + err);
        }
       var songInfo = data.tracks.items[0];
       
       var artist = songInfo.album.artists[0].name;
       var songName = secondInput;
       var previewURL = songInfo.preview_url;
       var albumName = songInfo.album.name;

       console.log("\nGreat choice! Here's your song info:\n\nSong Name: " + songName + "\nArtist: " + artist + "\nAlbum Name: " + albumName + "\nHave a listen: " + previewURL + "\n"); 
       
      });
      
}

function whatsThatMovie(){
    
}

function doThatThing(){

}