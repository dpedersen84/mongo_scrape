$.getJSON("/articles/favorites", function(data) {
    console.log(data);
    if (data.length === 0) {
        
        console.log("No favorite articles!");

        const message = $("<h2>")
                    .addClass("message")
                    .css({"text-align": "center"})
                    .html("No articles have been favorited!");

        $("#favorites").append(message);
    };

    data.forEach(article => {

        let well = $("<div class='well'>");

        let delFavBtn = $("<button>")
                        .addClass("delete-favorite btn btn-danger")
                        .text("Remove Favorite")
                        .attr("id", article._id);

        let noteBtn = $("<button>")
                        .addClass("note btn btn-warning")
                        .text("Notes")
                        .attr("id", article._id)
                        .attr("data-target", "#myModal")
                        .attr("data-toggle", "modal");
            
        let viewBtn = $("<button>")
                        .addClass("view btn btn-info")
                        .text("View Article")
                        .attr("href", article.link);

        $("#favorites").append(
            well.append(
            $("<div>").text(article.title),
            $("<div>").text(article.link),
            $("<div>").append(delFavBtn)
            .append(noteBtn)
            .append(viewBtn)
            )
        )

    });
});

$(document).on("click", ".delete-favorite", function() {

    const thisId = $(this).attr("id");

    console.log(thisId);

    $.ajax({
        method: "PUT",
        url: "/articles/favorites/" + thisId,
        data: {
            favorite: false
        }
    })
    .then(function() {
        location.reload();
    })

});

$(document).on("click", ".note", function() {

    const thisId = $(this).attr("id");

    console.log(thisId);

    $.ajax({
        method: "GET",
        url: "/articles/favorites/" + thisId
    })
    .then(function(data) {
        console.log(data);

        $(".modal-footer").append("<button data-id='" + data._id + "' id='saveNote' data-dismiss='modal' class='btn btn-default'>Save Note</button>");

        if (data.note) {

            $("#currentNotes").empty();
            $(".modal-footer").empty();

            console.log(data.note);
            const well = $("<div class='well'>");

            const delNoteBtn = $("<button>")
                            .addClass("delete-note btn btn-sm btn-danger")
                            .text("Remove Note")
                            .attr("id", data.note._id);

            const div = $("<div>");

            const pTag = $("<p>");

            $("#currentNotes").append(
                well.append(
                div.append(pTag.append(data.note.body)),
                div.append(delNoteBtn)
                )
            )

            $(".modal-footer").append("<button id='closeNotes' data-dismiss='modal' class='btn btn-default'>Close</button>");
            $(".modal-body").empty();
        }
    })
});

$(document).on("click", ".view", function() {

    const link = $(this).attr("href");

    window.location.href = link;
});

$(document).on("click", "#saveNote", function() {

    const thisId = $(this).attr("data-id");

    console.log(thisId);

    const noteBody = $("#noteBody").val();

    console.log(noteBody);

    $.ajax({
        method: "POST",
        url: "/articles/favorites/" + thisId,
        data: {
            body: noteBody
        }
    })
    .then(function(data) {
        console.log(data);
    });

    $("#noteBody").val("");
    $(".modal-footer").empty();

});

$(document).on("click", "#closeNotes", function() {
    $("#noteBody").val("");
    $(".modal-footer").empty();
})

$(document).on("click", ".delete-note", function() {

    const noteId = $(this).attr("id");

    console.log(noteId);

    $.ajax({
        method: "DELETE",
        url: "/articles/favorites/" + noteId,
    })
    .then(function() {
        location.reload();
    })
})