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
                        .text("Add Note")
                        .attr("id", article._id)
                        .attr("data-target", "#myModal")
                        .attr("data-toggle", "modal");
            
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

});

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

});

$(document).on("click", "#scrape", function() {
    console.log("Scraping!");

    $.ajax({
        method: "GET",
        url: "/scrape"
    })
    .then(function() {
        location.reload();
    })

});

$(document).on("click", ".note", function() {

    let thisId = $(this).attr("id");

    console.log(thisId);

    $.ajax({
        method: "GET",
        url: "/articles/" + thisId
    })
    .then(function(data) {
        console.log(data);
        $(".modal-footer").append("<button data-id='" + data._id + "' id='saveNote' data-dismiss='modal' class='btn btn-default'>Save Note</button>");
    })
});

$(document).on("click", ".view", function() {

    let link = $(this).attr("href");

    window.location.href = link;
});

$(document).on("click", "#saveNote", function() {

    var thisId = $(this).attr("data-id");

    console.log(thisId);
    let noteTitle = $("#noteTitle").val();
    let noteBody = $("#noteBody").val();

    console.log(noteTitle, noteBody);

    $.ajax({
        method: "POST",
        url: "/articles/" + thisId,
        data: {
            title: noteTitle,
            body: noteBody
        }
    })
    .then(function(data) {
        console.log("====== Note Data =====");
        console.log(data);
        $(".modal-footer").empty();
    });

    $("#noteTitle").val("");
    $("#noteBody").val("");
});