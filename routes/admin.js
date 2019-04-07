var express = require('express');
var router = express.Router();
var handledata = require('../service/HandleData');
var challengemodel=require('./challengemodel');
/* GET users listing. */
router.get('/', function (req, res) {
    // display the schedule
    challengemodel.findOne({'index':[1,2,3,4,5,6,7]},function (err,result){
        if(result){
            res.render('administor',{"result":result,"err":0});
        }

    })

})

router.post('/', function (req, res, next) {
    challengemodel.update({'index':[1,2,3,4,5,6,7]},{
        'start': req.body.start,
        'end': req.body.end
    }, function (err) {
        if (err) throw err;
        challengemodel.findOne({'index':[1,2,3,4,5,6,7]},function (err,result) {
            if(result)
                res.render("administor",{"result":result,"err":0});
        })
    })
})
module.exports = router;
