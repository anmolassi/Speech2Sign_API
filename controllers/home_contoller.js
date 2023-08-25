const saveGif = require("../models/save_gif");
var admin = require("firebase-admin");
const { Storage } = require("@google-cloud/storage");
var serviceAccount = require("../downloadKey.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

const storage = new Storage({
  keyFilename: "downloadKey.json",
});

module.exports.home = function (req, res) {
  return res.render("home");
};
module.exports.upload = async function (req, res, next) {
  try {
    var fileinfo = req.files;
    console.log(fileinfo);
    let url;
    const bucket = storage.bucket(process.env.BUCKET);
    for (let i = 0; i < req.files.length; i++) {
      const imageResponse = await bucket
        .upload(fileinfo[i].path, {
          destination: `gifs/${fileinfo[i].originalname}`,
          resumable: true,
        })
        .then((err, file) => {
          //   url = file;
        });

      const file = bucket.file(`gifs/${fileinfo[i].originalname}`);
      await file
        .getSignedUrl({
          action: "read",
          expires: "03-09-2491",
        })
        .then((signedUrls) => {
          // signedUrls[0] contains the file's public URL
          url = signedUrls[0];
        });
      console.log(url);
      // var fileWithoutExtension=fileinfo[i].originalname.substring(0,fileinfo[i].originalname.length-4);
      // console.log(fileWithoutExtension);
      // var newFiles=fileWithoutExtension.match(/\b(\w+)\b/g);
      // for(let j=0;j<newFiles.length;j++){
      //   newFiles[j]=newFiles[j]+".gif";
      console.log(fileinfo[i].originalname);
        await saveGif.create({
          fileName: fileinfo[i].originalname.toLowerCase(),
          path: `${url}`,
          node:process.env.NOD,
          originalFileName: fileinfo[i].originalname.toLowerCase(),
        });
      //}
      
    }
    res.send(fileinfo);
  } catch (err) {}
};