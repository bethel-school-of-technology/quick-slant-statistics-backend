var express = require('express');
var router = express.Router();
//var http = require('http').createServer(app);


// GET home page. //
 router.get('/', function(req, res, next) {
  res.send('successful');
 });

/*http.listen(3000, function(){
    console.log('listening on *:3000');
  });*/

module.exports = router;