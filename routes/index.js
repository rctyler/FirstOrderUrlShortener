var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { });
});

/* GET home page. */
router.get('/index.html', function(req, res, next) {
  res.render('index', { });
});

/* GET about page. */
router.get('/about.html', function(req, res, next) {
   res.render('about', { }) 
});

/* GET contact page. */
router.get('/contact.html', function(req, res, next) {
   res.render('contact', { }) 
});

/* GET webpage from short url */
router.get('/:shortUrl', function(req, res, next) {
    var db = req.db;
    var collection = db.get('urls');

    collection.find({ shortUrl: req.params.shortUrl }, function(err, docs) {
        var doc = docs[0];
        if (typeof doc !== 'undefined' && doc.shortUrl == req.params.shortUrl) {
            res.redirect("http://" + doc.url);
        }
    });
});

/* POST shorten route */
router.post('/shortenUrl', function(req, res, next) {
    var db = req.db;
    var collection = db.get('urls');

    collection.find(req.body, function(err, docs) {
        var doc = docs[0];
        if (typeof doc !== 'undefined' && doc.url == req.body.url) {
            res.send({ "shortUrl": "firstord.er/" + doc.shortUrl });
        }
        else {
            var doc = collection.insert(req.body, function(err, insertResult) {
                if (err === 'null') {
                    res.send({ msg: err });
                }
                else {
                    var id = insertResult._id.toString();
                    var shortUrl = id.substring(id.length - 5, id.length);

                    var update = { 
                        url: req.body.url,
                        shortUrl: shortUrl
                    };
                    
                    collection.update(insertResult, update, function(err) {
                       if (err === 'null') {
                            res.send({ msg: err });
                        }
                        else {
                            res.send({ "shortUrl": "firstord.er/" + shortUrl });
                        }
                    });
                }
            });
        }
    });
    
     
});
module.exports = router;
