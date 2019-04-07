var express = require('express');
var router = express.Router();
var handledata = require('../service/HandleData');
/* GET users listing. */
router.get('/', function (req, res){
    handledata.search('teams',{},function(err,r){
        res.render('C2',{"jresult":req.session.judge[0],"tresult":r,"attempt":1});
    })
})
router.post('/',function (req,res) {
    console.log(req.body);
    handledata.search('teams',{},function (err,r) {
        var attempt=Number(req.body.attempt)+1;
        if(attempt>3)
            attempt-=3;
        if(attempt!=1)
            res.render('C2',{"jresult":req.session.judge[0],"tresult":[{"name":req.body.team}],"attempt":attempt});
        else
            res.render('C2',{"jresult":req.session.judge[0],"tresult":r,"attempt":attempt});
    })
    if(req.body.min!=''&&req.body.sec!=''){
        var time=Number(req.body.min)*60+Number(req.body.sec);
        var attemptt=Number(req.body.attempt);
        var name=req.body.team;
        var reward=(Number(req.body.additional)===7)?Number(req.body.additional)*15+50:Number(req.body.additional)*15;
        reward=(req.body.additonal2Option=='true')?reward+20:reward;
        var penalty=Number(req.body.penalties1Option);
        if(penalty<3)
            time+=15*penalty;
        else
            time=0;
        // update new data
        handledata.search('teams',{"name":req.body.team},function (err,result) {
            if(attemptt===1&&result[0].C2_1_reward==''){
                handledata.update('teams',{"name":name},{
                    "C2_1_reward":reward,
                    "C2_1_time":time
                })
            }
            if(attemptt===2&&result[0].C2_2_reward==''){
                handledata.update('teams',{"name":name},{
                    "C2_2_reward":reward,
                    "C2_2_time":time
                })
            }
            if(attemptt===3&&result[0].C2_3_reward==''){
                handledata.update('teams',{"name":name},{
                    "C2_3_reward":reward,
                    "C2_3_time":time
                })
            }
        })
    }
})
module.exports = router;