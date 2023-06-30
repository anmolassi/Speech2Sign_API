//building schema
const mongoose=require('mongoose');
const saveGifSchema = new mongoose.Schema({
    fileName:{
        type:String,
        required:true
    },
    path:{
        type:String,
        required:true
    },
    node:{
        type:String,
        required:true
    },
    bytes:{
        type:String,
        required:true
    },
});
const saveGif = mongoose.model('saveGif',saveGifSchema);

module.exports=saveGif;