/**
 * Created by AaronCastle on 2020/10/23
 **/
 const express = require('express');
 const router = express.Router();
 const multer = require('multer');
 const path = require('path');
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, path.resolve(__dirname,`../client/upload/${file.fieldname}`))
    },
    filename: function (req, file, cb) {
        cb(null,file.originalname)
    }
})

const upload = multer({ storage})
 router.post('/',upload.fields([
     {name:'file',maxCount: 30},
     {name:'image',maxCount: 30},
     {name: 'video',maxCount: 20},
 ]),(req, res, next) => {
     // console.log(req.path,req.baseUrl);
     // console.log(req.body);
     const urls = {};
     Object.keys(req.files).forEach((key)=> {
         urls[key] = [];
         req.files[key].forEach(value => {
             urls[key].push(`./upload/${value['fieldname']}/${value['filename']}`)
         })
     })
     res.send({
         code: 0,
         message: '',
         data: urls
     })
 })
module.exports = router;
