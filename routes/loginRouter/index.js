var router = require('express').Router();
var collections = require('../../model');
router.get('/', (req, res) => {
  res.render('login');
})

// press join game button
router.post('/', (req,res) => {
  var user = req.body.user;
  var roomId = req.body.roomId;
  console.log(user);
  console.log(roomId);
  req.werewolf_session.user = user;
  req.werewolf_session.roomId = roomId;
  req.werewolf_session.status = 'player';
  res.json({ status: 'success', path: '/lobby' });
  // console.log(_path);
})

// press create room button
router.post('/createNewRoom', (req, res) => {
  var user = req.body.user;
  var roomId = (Math.floor(Math.random()*10000)).toString();

  var roomnum = new collections.Room();
  roomnum.roomId = roomId;
  roomnum.save((error,newroom) => {
    if(error){
      res.status(500).send();
    }
    console.log('RoomID = '+roomId);
    req.werewolf_session.user = user;
    req.werewolf_session.roomId = roomId;
    req.werewolf_session.status = 'narrator';
    //console.log(req.werewolf_session.user);
    res.json({ status: 'success', path: '/lobby' });
  })

})

module.exports = router;
