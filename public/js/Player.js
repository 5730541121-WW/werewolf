/**************************************************
** GAME PLAYER CLASS
**************************************************/
var Player = function(_name, _roomId, _status) {
	var name = _name,
	roomId = _roomId,
  status = _status,
	id;
	var getRoomId = function(){
		return roomId;
	}
  var getName = function(){
    return name;
  }
  var getStatus = function(){
    return status;
  }
	return {
		getRoomId: getRoomId,
    getName: getName,
    getStatus: getStatus,
		id: id
	}
};
