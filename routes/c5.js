var express = require('express');
var router = express.Router();
var handledata = require('../service/HandleData');
/* GET users listing. */
router.get('/', function (req, res){
    handledata.search('teams',{},function(err,r){
        res.render('C5',{"jresult":req.session.judge[0],"tresult":r,"attempt":1,"methodOption":0});
    })
})
router.post('/',function (req,res) {
    handledata.search('teams',{},function(err,r){
        var attempt=Number(req.body.attempt)+1;
        if(attempt>3)
            attempt-=3;
        if(attempt!=1)
            res.render('C5',{"jresult":req.session.judge[0],"tresult":[{"name":req.body.team}],"attempt":attempt,"methodd":req.body.methodd});
        else
            res.render('C5',{"jresult":req.session.judge[0],"tresult":r,"attempt":attempt,"methodd":req.body.methodd});
    })
    if(req.body.min!=''&&req.body.sec!=''){
        var attemptt=Number(req.body.attempt);
        var name=req.body.team;
        var time=Number(req.body.min)*60+Number(req.body.sec);
        var reward=0;
        reward+=(req.body.methodd='1')?75:0
        reward+=(req.body.point1Option=='true')?20:0;
        reward+=(req.body.point2Option=='true')?20:0;
        reward+=(req.body.point3Option=='true')?20:0;
        reward+=(req.body.point4Option=='true')?20:0;
        reward+=(req.body.point5Option=='true')?20:0;
        reward+=(reward==175)?30:0;
        // update new data
        handledata.search('teams',{"name":req.body.team},function (err,result) {
            if(attemptt===1&&result[0].C5_1_reward==''){
                handledata.update('teams',{"name":name},{
                    "C5_1_reward":reward,
                    "C5_1_time":time
                })
            }
            if(attemptt===2&&result[0].C5_2_reward==''){
                handledata.update('teams',{"name":name},{
                    "C5_2_reward":reward,
                    "C5_2_time":time
                })
            }
            if(attemptt===3&&result[0].C5_3_reward==''){
                handledata.update('teams',{"name":name},{
                    "C5_3_reward":reward,
                    "C5_3_time":time
                })
            }
        })
    }
})
module.exports = router;