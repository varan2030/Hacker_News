$(document).ready(function() {
  getData();
});

$('#modal1').on('hidden.bs.modal', function (e) {
  $(this)
    .find("input,textarea,select")
       .val('')
       .end()
    .find("input[type=checkbox], input[type=radio]")
       .prop("checked", "")
       .end();
})

function scrape() {
  $.ajax({
    method: "GET",
    url: "/api/scrape/"
  }).then(function(data) {
    console.log(data);
  });
}

function getData() {
  $("#content").empty();
  $.ajax({
    method: "GET",
    url: "/api/articles/"
  }).then(function(data) {
    console.log(data);
    for (i = 0; i < data.length; i++) {
      var noteId = "";
      if (data[i].hasOwnProperty("note")){
        noteId = data[i].note._id;
      }
      $("#content").append(`
      <div class="col-4" >
        <div class="card card-deck" style="width: 22rem;" >
          <div class="card-body">
            <h5 class="card-title"><a href="${data[i].link}">${data[i].title}</a></h5>
              <p class="card-text">${data[i].description}</p>
              <div class="card-footer">
              <div class="row">
              <a href="#" onClick="makeNote('${data[i]._id}', '${noteId}')" role="button" data-toggle="modal" data-toggle="collapse" data-target="#myModal1">Note</a> 
             </div>
        </div>
        </div>
      </div>
    </div>
            `);
    }
  });
}

function deleteData() {
  $("#content").empty();
  $.ajax({
    method: "DELETE",
    url: "/api/articles/"
  }).then(function(data) {
    console.log(data);
  });
}

 function makeNote(id, noteId){
 
  var noteTitle = "";
  var body = "";

  $.get("/api/articles/" +id, function(data) {
  
    console.log(data);

    if ('note' in data){
     noteTitle = data.note.noteTitle;
     body = data.note.body;
     
    } 
    modulAppear(noteTitle, body, id);
  });
  
   
  }
  

function modulAppear(title, body, id){
  
  $("#modal1").append(`
  <div class="modal fade" id="myModal1" role="dialog">
  <div class="modal-dialog">
    <div class="modal-content">
      <div class="modal-header">
        <h4 class="modal-title">Note: ${title}</h4>
        <button type="button" class="close" data-dismiss="modal">&times;</button>
        </div>
        <form>
          <div class="form-group text-center">
            <label for="inputAddress">Title</label>
            <input type="text" class="form-control" id="noteTitle" placeholder="Title" value=${title}>
          </div>
         <div class="form-group text-center">
            <label for="comment">Description</label>
            <textarea class="form-control" rows="10" id="body" placeholder="Description">${body}</textarea>
          </div>
          <div class="form-row">
            <div class="form-group col-md-6">
          <button type="" onclick="submitNote('${id}')" class="modal-button btn btn-primary" class="close" data-dismiss="modal">Submit</button>
          </div>
        </div>
        </form>
      <div class="modal-footer">
      </div>
    </div>
    </div>
    </div>
  `);
}

function submitNote(id){

  var noteTitle = $("#noteTitle").val();
  var body = $("#body").val();

  var noteData = {
    noteTitle: noteTitle,
    body: body
  }

  $.post("/api/articles/" + id, noteData, function(results) {
    console.log(results);
    
  })
}
