var express = require('express');
var router = express.Router();
var data = require('../generated_data.json');
var _ = require('lodash');
/* GET home page. */

router.get('/robots', function(req, res, next) {
  res.json(data);
  // res.render('index', { title: 'Express' });
  
});

// 1. Any robot that hasSentience and is on fire should be extinguished as quickly as
// possible. This is done by a POST request to
// “http://localhost:3000/robots/[:id]/extinguish.json”, where [:id] is replaced with the id of the
// robot.

router.post('/robots/:id/extinguish', function(req, res, next) {
  let id = req.params.id
  try{
    for(let i = 0; i < data.length; i++){
      if(id === data[i].id && data[i].configuration.hasSentience ===  true && data[i].statuses.includes("on fire")){
        data.splice(i, 1)
        break;
      }
    }
  } catch(e) {
    res.json({ result: "bad" });
  }
  res.json({ result: "ok" });
});


// 2. Any robot meeting any of the following conditions should be recycled:
//     a. Has fewer than 3 or greater than 8 rotors
//     b. Has any number of rotors and blue in colour
//     c. Has both wheels and tracks
//     d. Has wheels and is rusty
//     e. Is sentient an
router.post('/robots/recycle', function(req, res, next) {
  let id = req.params.id;
  let recylables = req.body.data;
  try {
    data = data.filter(item => recylables.includes(item.id));
  } catch (e) {
    res.json({ result: "bad" });
  }
  res.json({ result: "ok" });
});


module.exports = router;
