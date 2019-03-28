var MongoClient=require('mongodb').MongoClient;
var ObjectId=require('mongodb').ObjectID;
var DBurl='mongodb://localhost:27017/mongodb';
var ejs=require('ejs');


// Connect to the database
// form= which form need to be changed
// data= put into the form, should match json format
// condition= sometimes need to figure out which record should be changed

var handledata={
    // search
    search:function (req,res) {
        MongoClient.connect(DBurl,function (err,db,form,condition) {
            if(err){
                console.log(err);
                console.log("can't connect to the database!");
                return;
            }
            var list=[];
            var result=db.collection(form).find(condition);
            result.each(function (err,doc) {
                if(err)
                    console.log(err);
                else{
                    if(doc!=null)
                        list.push(doc);
                    else{
                        ejs.renderFile('routes/index.ejs',{list:list},function (err,data) {
                            res.send(data);
                        })
                    }
                }
            })
        })
    },
    // insert
    insert:function(req,res){
        MongoClient.connect(DBurl,function (err,db,form,data) {
            if(err){
                console.log(err);
                console.log("can't connect to the database!");
                return;
            }
            db.collection(form).insertOne(data,function (err,result) {
                if(err)
                    console.log("Inserting failed!")
                else
                    console.log("Success");
                db.close();
            })
        })
    },
    // update
    update:function (req,res) {
        MongoClient.connect(DBurl,function (err,db,form,condition,data) {
            if(err){
                console.log(err);
                console.log("can't connect to the database!");
                return;
            }
            db.collection(form).updateOne(condition,{$set:data},function (err,result) {
                if(err)
                    console.log("Updating failed!")
                else
                    console.log("Success");
                db.close();
            })
        })
    },
    // delete
    delete:function (req,res) {
        MongoClient.connect(DBurl,function (err,db,form,data) {
            if(err){
                console.log(err);
                console.log("can't connect to the database!");
                return;
            }
            db.collection(form).deleteOne(data,function (err,result) {
                if(err)
                    console.log("Deleting failed!")
                else
                    console.log("Success");
                db.close();
            })
        })
    }
}
// export this module
module.exports=handledata;