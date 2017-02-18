var person = {
  user: $('#user').val(),
  roomId: $('#roomId').val()
}
var x;
function joinGame(){
  $.post("/", { user: $('#user').val(), roomId: $('#roomId').val() }, function(data){
      window.location = data.path;
  },"json");
}

function createNewRoom(){
  $.post("/createNewRoom", { user: $('#user').val() }, function(data){
      console.log("going to lobbby");
      window.location = data.path;
  },"json");
}
