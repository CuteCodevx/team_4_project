var MongoClient=require('mongodb').MongoClient;
var ObjectId=require('mongodb').ObjectID;
var DBurl='mongodb://localhost:27017/Piwar';
var ejs=require('ejs');
var database='Piwar';

// Connect to the database
// form= which form need to be changed
// data= put into the form, should match json format
// condition= sometimes need to figure out which record should be changed

var handledata={
    // search
    search:function (form,condition,callback) {
        MongoClient.connect(DBurl,function (err,db) {
            if(err){
                console.log(err);
                console.log("can't connect to the database!");
                return;
            }
            var dbo=db.db(database);
            dbo.collection(form).find(condition).toArray(function(err,result){
                if(err) throw err;
                callback(null,result);
            });
            db.close();
        });
    },
    // insert
    insert:function(form,data){
        MongoClient.connect(DBurl,function (err,db) {
            if(err){
                console.log(err);
                console.log("can't connect to the database!");
                return;
            }
            var dbo=db.db(database);
            dbo.collection(form).insertOne(data,function (err,result) {
                if(err)
                    console.log("Inserting failed!")
                else
                    console.log("Success");
                db.close();
            })
        })
    },
    // update
    update:function (form,condition,data) {
        MongoClient.connect(DBurl,function (err,db) {
            if(err){
                console.log(err);
                console.log("can't connect to the database!");
                return;
            }
            var dbo=db.db(database);
            dbo.collection(form).updateOne(condition,{$set:data},function (err,result) {
                if(err)
                    console.log("Updating failed!")
                else
                    console.log("Success");
                db.close();
            })
        })
    },
    // delete
    delete:function (form,condition) {
        MongoClient.connect(DBurl,function (err,db,form,data) {
            if(err){
                console.log(err);
                console.log("can't connect to the database!");
                return;
            }
            var dbo=db.db(database);
            dbo.collection(form).deleteOne(condition,function (err,result) {
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