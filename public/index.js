$.getJSON("/articles", function(data) {
    console.log(data);
    if (data.length === 0) {
        
        console.log("No articles!");

        let message = $("<h2>")
                    .addClass("message")
                    .css({"text-align": "center"})
                    .html("No articles have been scraped!");

        $("#articles").append(message);
    };

    data.forEach(article => {

        let well = $("<div class='well'>");
        
        let favBtn = $("<button>")
                        .addClass("favorite btn btn-primary")
                        .text("Favorite Article")
                        .attr("id", article._id);
            
        let viewBtn = $("<button>")
                        .addClass("view btn btn-info")
                        .text("View Article")
                        .attr("href", article.link);

        $("#articles").append(
            well.append(
            $("<div>").text(article.title),
            $("<div>").text(article.link),
            $("<div>").html(favBtn)
            .append(viewBtn)
            )
        );
    });
});

$(document).on("click", ".favorite", function() {

    let thisId = $(this).attr("id");

    console.log(thisId);

    $.ajax({
        method: "PUT",
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

});

$(document).on("click", "#scrape", function() {
    console.log("Scraping!");

    $.ajax({
        method: "GET",
        url: "/scrape"
    })
    .then(function() {
        $(document).on("click", "#scrapeModalClose", function() {
            location.reload();
        })
    })
});

$(document).on("click", ".view", function() {

    let link = $(this).attr("href");

    window.location.href = link;
});
