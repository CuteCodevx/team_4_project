var express = require('express');
var router = express.Router();
var handledata = require('../service/HandleData');
/* GET users listing. */
router.get('/', function (req, res){
    handledata.search('teams',{},function(err,r){
        res.render('C1',{"jresult":req.session.judge[0],"tresult":r,"attempt":1,"methodOption":0});
    })
})
router.post('/',function (req,res) {
    handledata.search('teams',{},function (err,r) {
        var attempt=Number(req.body.attempt)+1;
        if(attempt>3)
            attempt-=3;
        if(attempt!=1)
            res.render('C1',{"jresult":req.session.judge[0],"tresult":[{"name":req.body.team}],"attempt":attempt,"methodOption":req.body.methodOption});
        else
            res.render('C1',{"jresult":req.session.judge[0],"tresult":r,"attempt":attempt,"methodOption":req.body.methodOption});
    })
    if(req.body.min!=''&&req.body.sec!=''){
        var name=req.body.team;
        var method=req.body.methodOption;
        var time=Number(req.body.min)*60+Number(req.body.sec);
        var reward=Number(req.body.additional);
        var penalty=Number(req.body.penalty);
        var attemptt=Number(req.body.attempt);
        if(method==='Method1')
            reward=(reward===4)?reward*35+30:reward*35;
        else
            reward=(reward===4)?reward*30+25:reward*30;
        if(penalty>1)
            time=(penalty===2||penalty===3)?(time+(penalty-1)*15):0;
        handledata.search('teams',{"name":req.body.team},function (err,result) {
            if(attemptt===1&&result[0].C1_1_reward==''){
                handledata.update('teams',{"name":name},{
                    "C1_1_reward":reward,
                    "C1_1_time":time
                })
            }
            if(attemptt===2&&result[0].C1_2_reward==''){
                handledata.update('teams',{"name":name},{
                    "C1_2_reward":reward,
                    "C1_2_time":time
                })
            }
            if(attemptt===3&&result[0].C1_3_reward==''){
                handledata.update('teams',{"name":name},{
                    "C1_3_reward":reward,
                    "C1_3_time":time
                })
            }
        })
    }
})
module.exports = router;