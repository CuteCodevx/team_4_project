var express = require('express');
var router = express.Router();
var handledata = require('../service/HandleData');
/* GET users listing. */
router.get('/', function (req, res){
    handledata.search('teams',{},function(err,r){
        res.render('C8',{"jresult":req.session.judge[0],"tresult":r});
    })
})
router.post('/',function (req,res) {
    handledata.search('teams',{},function(err,r){
        res.render('C8',{"jresult":req.session.judge[0],"tresult":r});
    })
    if(req.body.team!=''){
        var score=Number(req.body.bloggingPoints)+Number(req.body.technicalMerit)+Number(req.body.artisticMerit);
        handledata.search('teams',{"name":req.body.team},function (err,result) {
            if(result[0].C8score==''){
                handledata.update('teams',{"name":req.body.team},{
                    "C8score":score
                })
            }
        })

    }
})
module.exports = router;