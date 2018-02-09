var express = require('express');
var router = express.Router();
var data = require('../generated_data.json');
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
  let data = req.body;
  let id = req.params.id
  res.json({ data, id});
  // res.render('index', { title: 'Express' });
  
});


module.exports = router;
