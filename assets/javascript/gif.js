$(document).ready(function() {

gifArray = ["Pac-man", "Metroid", "Mario", "Tetris", "Galaga", "Zelda", "Sims", "Starcraft", "Pokemon"]

for (i=0; i < gifArray.length; i++){
    var caps = gifArray[i].toUpperCase()
    var button = $("<button id="+gifArray[i]+" >").html(caps)
    $("#buttonSection").append(button);
}

var counter = -1;

$(document).on("click","button", function loadGifs() {
    search = (this.id)
    gifs();
});
  
$("input").on("keydown",function logUserSearch(enter) {
    counter ++
    if(enter.keyCode === 13) {
        search = $("#searchBox").val()
        search = search.toUpperCase()
        $("#searchBox").val('')
        var button = $("<button id='"+search+"' >").on('click', function(){
        search = (this.id)  
        });
        button.html(search)
        $("#buttonSection").append(button);
    }
});

function gifs() {
    $.get('https://api.giphy.com/v1/gifs/search?q='+search+'&api_key=GTQIw05jFUMGro9NhKHEHj7aIoRufMbT&limit=8').then(function(response) {
            for (i=0; i < response.data.length; i ++) {
                counter++
                var div = $("<div id='div"+i+"' >");
                div.appendTo("#imageSection")
                div.addClass("imageContainer");
                var img = $("<img id='"+ counter +"', data-name='"+ i +"', data-type='"+ search +"', data-clicked='"+ false +"' >").on('click', function(){
                    var clicked = $(this).attr('data-clicked')
                    console.log(clicked)
                    if (clicked === "false") {
                        source = this.id;
                        var save = $(this).attr('data-name')
                        $("#"+ source).attr('src',response.data[save].images.downsized.url)
                        $(this).attr('data-clicked', true);
                    }
                    else {
                        $(this).attr('data-clicked', false);
                        source = this.id;
                        var save2 = $(this).attr('data-name')
                        $("#"+ source).attr('src',response.data[save2].images.downsized_still.url)   
                    }
                }) 
                img.attr('src', response.data[i].images.downsized_still.url);
                img.appendTo("#div"+i);
                var para = $("<span>");
                para.html("Rating: " + response.data[i].rating)
                para.appendTo("#div"+i)
            }
    });
}

});
  

