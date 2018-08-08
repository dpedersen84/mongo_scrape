$.getJSON("/articles", function(data) {
    console.log(data);
    if (data.length === 0) {
        
        console.log("No articles!");

        const message = $("<h2>")

                    .addClass("message")
                    .css({"text-align": "center"})
                    .html("No articles have been scraped!");

        $("#articles").append(message);
    };

    data.forEach(article => {

        const well = $("<div class='well'>");
        
        const favBtn = $("<button>")
                        .addClass("favorite btn btn-primary")
                        .text("Favorite Article")
                        .attr("id", article._id);
            
        const viewBtn = $("<button>")
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
        $(document).on("click", "#scrapeModalClose", function() {
            location.reload();
        })
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

        if (data.note) {

            let delNoteBtn = $("<button>")
                            .addClass("delete-note btn btn-sm btn-danger")
                            .text("X")
                            .attr("id", data.note._id);
            const div = $("<div>");

            $("#currentNotes").append(
                div.append(data.note.body)
                .append(delNoteBtn)
            )
        }
    })
});

$(document).on("click", ".view", function() {

    let link = $(this).attr("href");

    window.location.href = link;
});

$(document).on("click", "#saveNote", function() {

    var thisId = $(this).attr("data-id");

    console.log(thisId);

    let noteBody = $("#noteBody").val();

    console.log(noteBody);

    $.ajax({
        method: "POST",
        url: "/articles/" + thisId,
        data: {
            body: noteBody
        }
    })
    .then(function(data) {
        console.log("====== Note Data =====");
        console.log(data);
        $(".modal-footer").empty();
    });

    $("#noteBody").val("");
});
