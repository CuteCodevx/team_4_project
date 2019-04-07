var mongoose=require('mongoose');
var Schema=mongoose.Schema;
mongoose.connect("mongodb://localhost/mongoose");
var newSchema = new Schema({
    index:[Number],
    name:[String],
    date: [String],
    start: [String],
    end:[String]
});
module.exports=mongoose.model("challenges",newSchema);