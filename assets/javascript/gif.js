$(document).ready(function() {


var counter = -1;


$("button").on("click", function loadGifs() {
    search = (this.id)
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
                    var next = $(this).attr('data-type')
                    $.get('http://api.giphy.com/v1/gifs/search?q='+next+'&api_key=GTQIw05jFUMGro9NhKHEHj7aIoRufMbT&limit=8').then(function(response) {
                        $("#"+ source).attr('src',response.data[save].images.downsized.url)
                    });
                    $(this).attr('data-clicked', true);
                }
                else {
                    $(this).attr('data-clicked', false);
                    source = this.id;
                    var save2 = $(this).attr('data-name')
                    var next2 = $(this).attr('data-type')
                    $.get('http://api.giphy.com/v1/gifs/search?q='+next2+'&api_key=GTQIw05jFUMGro9NhKHEHj7aIoRufMbT&limit=8').then(function(response) {
                        $("#"+ source).attr('src',response.data[save2].images.downsized_still.url)
                    });
                }
            }) 
            img.attr('src', response.data[i].images.downsized_still.url);
            img.appendTo("#div"+i);
            var para = $("<span>");
            para.html("Rating: " + response.data[i].rating)
            para.appendTo("#div"+i)
        }
    });
});
  

$("input").on("keydown",function logUserSearch(enter) {
    counter ++
    if(enter.keyCode === 13) {
        search = $("#searchBox").val()
        search = search.toUpperCase()
        $("#searchBox").val('')
        var button = $("<button id='"+search+"' >").on('click', function(){
            search = (this.id)
            $.get('http://api.giphy.com/v1/gifs/search?q='+search+'&api_key=GTQIw05jFUMGro9NhKHEHj7aIoRufMbT&limit=8').then(function(response) {
                for (i=0; i < response.data.length; i ++) {
                    counter++
                    var div = $("<div id='div"+i+"' >");
                    div.appendTo("#imageSection")
                    div.addClass("imageContainer");
                    var img = $("<img id='"+ counter +"', data-name='"+ i +"', data-type='"+ search +"', data-clicked='"+ false +"' >").on('click', function(){
                        var clicked = $(this).attr('data-clicked')
                        if (clicked === "false") {
                            source = this.id;
                            var save3 = $(this).attr('data-name')
                            var next3 = $(this).attr('data-type')
                            $.get('http://api.giphy.com/v1/gifs/search?q='+next3+'&api_key=GTQIw05jFUMGro9NhKHEHj7aIoRufMbT&limit=8').then(function(response) {
                                $("#"+ source).attr('src',response.data[save3].images.downsized.url)
                            });
                            $(this).attr('data-clicked', true);
                        }
                        else {
                            source = this.id;
                            var save4 = $(this).attr('data-name')
                            var next4 = $(this).attr('data-type')
                            $.get('http://api.giphy.com/v1/gifs/search?q='+next4+'&api_key=GTQIw05jFUMGro9NhKHEHj7aIoRufMbT&limit=8').then(function(response) {
                                $("#"+ source).attr('src',response.data[save4].images.downsized_still.url)
                            });
                            $(this).attr('data-clicked', false);
                        }
                    })
                    img.attr('src', response.data[i].images.downsized_still.url)
                    img.appendTo("#div"+i);
                    var para = $("<span>");
                    para.html(response.data[i].rating)
                    para.appendTo("#div"+i)
                }
            });
        });
        button.html(search)
        $("#buttonSection").append(button);
    }
});

});
  

