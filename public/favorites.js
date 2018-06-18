$.getJSON("/articles", function(data) {
    console.log(data);

    data.forEach(article => {
        // console.log(article);
        let favBtn = $("<button>")
                        .addClass("favorite")
                        .text("Favorite Article");

        let delFavBtn = $("<button>")
                        .addClass("delete")
                        .text("Remove Favorite");

        let noteBtn = $("<button>")
                        .addClass("note")
                        .text("Add Note");
            
        let viewBtn = $("<button>")
                        .addClass("view")
                        .text("View Article")
                        .attr("href", article.link);

        let div = $("<div>")
                
        if (article.favorite === true) {
            $("#favorites").append(
                // $("<div>").text(article._id),
                $("<div>").text(article.title),
                $("<div>").text(article.link),
                $("<div>").html(favBtn)
                .append(delFavBtn)
                .append(noteBtn)
                .append(viewBtn)
                
            )
        }
    })    
})