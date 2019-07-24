$( document ).ready(function() {

$("#infobutton").click(function(){
  $('#myModal').show();
  var market = localStorage.getItem("market");
  var token = localStorage.getItem("token");
  $('#market').val(market);
  $('#token').val(token);

});

$(".close").click(function(){
  $('#myModal').hide();
});
  });

  function setData(){
    var market = $('#market').val().toUpperCase();
    var token =  $('#token').val();
    localStorage.setItem("market", market);
    localStorage.setItem("token", token);
    $('#myModal').hide();
    getCover();
  }
  
  function getCover(){
    $('#guide').hide();
    var request = new XMLHttpRequest()
    var market = localStorage.getItem("market");
    var token = localStorage.getItem("token");
    request.open('GET', 'https://api.spotify.com/v1/me/player/currently-playing?market='+market);
    request.setRequestHeader('Authorization', "Bearer "+token);
    request.onload = function() {
      // Begin accessing JSON data here
    if(this.response){
      var data = JSON.parse(this.response)
    

      console.log(data);
    if (request.status >= 200 && request.status < 400) {
      $('#info').html("");
     var item = data.item;
     var tracktype = data.currently_playing_type;
     //alert(length);

  switch(true){

    case (item==null && tracktype=="ad"):
        
        $('#albumcover').attr("src","spotifyad.png");
        $(".artists").text("");
        $(".track").text("");
        $(".album").text("");
        break;

    case (item==null && tracktype=="episode"):
        
        $('#albumcover').attr("src","podcast.png");
        $(".artists").text("");
        $(".track").text("");
        $(".album").text("");
        break;

    default:
      var length = data.item.artists.length;
      var a = "";
      if(length==1){
        a="Artist: ";
      }else{
        a="Artists: ";
      }
      var artistname = [];
      //$(".artists").html("");
      data.item.artists.forEach(artist => {
          artistname.push(artist.name);
      })
       $(".artists").text(a+artistname.join(", "));
      //alert(artistname);

       var track = data.item.name;
       $('.track').text("Track: "+track);
       var albumname = data.item.album.name;
       $(".album").text("Album: "+albumname);

       var src = data.item.album.images[1].url;
       $('#albumcover').attr("src",src);


    }
      
      //alert(src);
      //alert(artist);
      
      $('#albumcover').each(function() {
      $(this).load(function() {
    
       var img = document.getElementById('albumcover');
        var colorThief = new ColorThief();
        var rgb = colorThief.getColor(img);
        //alert(rgb);
        //$('body').css("background-color","rgb("+rgb+")");
        $('body').css("background","linear-gradient(rgb("+rgb+"),black)");
         
    });

      });

    }
    else {
    //console.log('')
    $('#info').html("<h3>Access token expired!!</h3>");
  }
  
  }else {
    console.log('not playing')
    $('#info').html("<h3>Playback is stopped on player!!</h3>");
  } 
}
request.send()
  
  }



$( document ).ready(function() {

  if(localStorage.getItem("market")==null && localStorage.getItem("token")==null){

    $('#guide').css("display","flex");
  }else{
    $('#guide').hide();
    getCover();
    window.setInterval(function(){
      getCover();
    }, 15000);
  }


});
     
  

