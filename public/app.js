$.getJSON("/articles", function(data) {
    console.log(data);
    if (data.length === 0) {
        
        console.log("No articles!");

        let message = "No articles have been scraped!";

        $("#articles").text(message);
    };

    data.forEach(article => {
        // console.log(article);
        let favBtn = $("<button>")
                        .addClass("favorite")
                        .text("Favorite Article")
                        .attr("id", article._id);

        let delFavBtn = $("<button>")
                        .addClass("delete-favorite")
                        .text("Remove Favorite")
                        .attr("id", article._id);

        let noteBtn = $("<button>")
                        .addClass("note")
                        .text("Add Note");
            
        let viewBtn = $("<button>")
                        .addClass("view")
                        .text("View Article")
                        .attr("href", article.link);

        let div = $("<div>");
                
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
        };

        $("#articles").append(
            // $("<div>").text(article._id),
            $("<div>").text(article.title),
            $("<div>").text(article.link),
            $("<div>").html(favBtn)
            // .append(delFavBtn)
            // .append(noteBtn)
            .append(viewBtn)
        );
    });
});

$(document).on("click", ".favorite", function() {

    let thisId = $(this).attr("id");

    console.log(thisId);

    $.ajax({
        method: "POST",
        url: "/articles/" + thisId,
        data: {
            favorite: true
        }
    })
    .then(function(data) {
        console.log(data);
        if (data.favorite === true) {
            alert("Article already favorited!");
        }
        else {
            alert("Favorite Added!");
        }
        
    })

})

$(document).on("click", ".delete-favorite", function() {

    let thisId = $(this).attr("id");

    console.log(thisId);

    $.ajax({
        method: "PUT",
        url: "/articles/" + thisId,
        data: {
            favorite: false
        }
    })
    .then(function() {
        location.reload();
    })

})

$(document).on("click", "#scrape", function() {
    console.log("Scraping!");

    $.ajax({
        method: "GET",
        url: "/scrape"
    })
    .then(function() {
        location.reload();
    })

})