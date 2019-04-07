var express = require('express');
var router = express.Router();
var handledata = require('../service/HandleData');
/* GET users listing. */
router.get('/', function (req, res){
    handledata.search('teams',{},function(err,r){
        res.render('C3',{"jresult":req.session.judge[0],"tresult":r,"attempt":1});
    })
})
router.post('/',function (req,res) {
    handledata.search('teams',{},function (err,r) {
        var attempt=Number(req.body.attempt)+1;
        if(attempt>3)
            attempt-=3;
        if(attempt!=1)
            res.render('C3',{"jresult":req.session.judge[0],"tresult":[{"name":req.body.team}],"attempt":attempt});
        else
            res.render('C3',{"jresult":req.session.judge[0],"tresult":r,"attempt":attempt});
    })
    if(req.body.min!=''&&req.body.sec!=''){
        var time=Number(req.body.min)*60+Number(req.body.sec);
        var attemptt=Number(req.body.attempt);
        var name=req.body.team;
        var reward=0;
        reward=(req.body.additonal1Option=='true')?reward+100:reward;
        reward=(req.body.additonal2Option=='true')?reward+45:reward;
        time+=(Number(req.body.penalties1Option)>3)?30:10*Number(req.body.penalties1Option);
        time+=(Number(req.body.penalties2Option)>3)?60:((Number(req.body.penalties2Option)>1)?15:0);
        time+=(req.body.penalties3Option=='true')?30:0;
        // update data
        handledata.search('teams',{"name":req.body.team},function (err,result) {
            if(attemptt===1&&result[0].C3_1_reward==''){
                handledata.update('teams',{"name":name},{
                    "C3_1_reward":reward,
                    "C3_1_time":time
                })
            }
            if(attemptt===2&&result[0].C3_2_reward==''){
                handledata.update('teams',{"name":name},{
                    "C3_2_reward":reward,
                    "C3_2_time":time
                })
            }
            if(attemptt===3&&result[0].C3_3_reward==''){
                handledata.update('teams',{"name":name},{
                    "C3_3_reward":reward,
                    "C3_3_time":time
                })
            }
        })
    }
})
module.exports = router;