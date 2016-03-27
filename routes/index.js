var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.post('/deploy/', function (req, res) {
  var spawn = require('child_process').spawn,
      deploy = spawn('sh', [ '../deploy.sh' ]);

  deploy.stdout.on('data', function (data) {
    console.log(''+data);
  });

  deploy.on('close', function (code) {
    console.log('Child process exited with code ' + code);
  });
  res.json(200, {message: 'Github Hook received!'})
});

module.exports = router;
