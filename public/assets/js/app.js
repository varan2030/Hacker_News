function scrape(){
    
    $.ajax({
        method: "GET",
        url: "/api/scrape/",
      })
        .then(function(data) {
          console.log(data);
        });
}

function getData(){
    $.ajax({
        method: "GET",
        url: "/api/articles/",
      })
        .then(function(data) {
          console.log(data);
        });
};

function deleteData(){
  $.ajax({
    method: "DELETE",
    url: "/api/articles/",
  })
    .then(function(data) {
     console.log(data);
    });
}