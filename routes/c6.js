var express = require('express');
var router = express.Router();
var handledata = require('../service/HandleData');
/* GET users listing. */
router.get('/', function (req, res){
    handledata.search('teams',{},function(err,r){
        res.render('C6',{"jresult":req.session.judge[0],"tresult":r});
    })
})
router.post('/',function (req,res) {
    handledata.search('teams',{},function(err,r){
        res.render('C6',{"jresult":req.session.judge[0],"tresult":r});
    })
    if(req.body.team!=''&&req.body.points!=''){
        var pts=(Number(req.body.points)>5)?45*Number(req.body.points)+40:45*Number(req.body.points);
        handledata.search('teams',{"name":req.body.team},function (err,result) {
            if(result[0].C6score==''){
                handledata.update('teams',{"name":req.body.team},{
                    "C6score":pts
                })
            }
        })
    }

})
module.exports = router;