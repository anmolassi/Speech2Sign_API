var multer=require('multer');
const express=require('express');
const router = express.Router();
const homeController=require('../controllers/home_contoller');
var storage= multer.diskStorage({
    filename: function(req,file,cb){
        cb(null, file.originalname)
    }
});
var upload=multer({ storage:storage});
router.get('/',homeController.home);
router.post('/uploads',upload.array('myFiles',8000),homeController.upload);  
module.exports=router;