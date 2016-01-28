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

    console.log("Try goto " + req.params.shortUrl);
    collection.find({ shortUrl: req.params.shortUrl }, function(err, docs) {
        var doc = docs[0];
        if (typeof doc !== 'undefined' && doc.shortUrl == req.params.shortUrl) {
            console.log("Redirect to " + doc.url);
            res.redirect("http://" + doc.url);
        }
    });
});

/* POST shorten route */
router.post('/shortenUrl', function(req, res, next) {
    var db = req.db;
    var collection = db.get('urls');
    
    console.log("(!)");
    // TODO: Add validation for url input
    
    collection.find(req.body, function(err, docs) {
        var doc = docs[0];
        if (typeof doc !== 'undefined' && doc.url == req.body.url) {
            console.log("(!!)");
            res.send({ "shortUrl": "tyl.er/" + doc.shortUrl });
        }
        else {
            var doc = collection.insert(req.body, function(err, insertResult) {
                if (err === 'null') {
                    console.log("ERROR msg:" + err + " - " + JSON.stringify(insertResult));
                    res.send({ msg: err });
                }
                else {
                    console.log("(!!!)");
                    var id = insertResult._id.toString();
                    var shortUrl = id.substring(id.length - 5, id.length);
                    
                    console.log(JSON.stringify(insertResult));
                    
                    var update = { 
                        url: req.body.url,
                        shortUrl: shortUrl
                    };
                    
                    console.log(JSON.stringify(update));
                    
                    collection.update(insertResult, update, function(err) {
                       if (err === 'null') {
                            console.log("ERROR msg:" + err + " - " + JSON.stringify(insertResult));
                            res.send({ msg: err });
                        }
                        else {
                            console.log(JSON.stringify(update));
                            res.send({ "shortUrl": "tyl.er/" + shortUrl });
                        }
                    });
                }
            });
        }
    });
    
     
});
module.exports = router;
