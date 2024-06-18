const multer = require("multer");
const fs = require("fs");
const path = require("path");

const storageSingle = multer.diskStorage({
    destination: (req, file, callback) => {
      // kalau req.body tidak terbaca, pastikan field dengan tipe file, berada dipaling bawah
      const foldername = `src/uploads`;
  
      if (!fs.existsSync(foldername)) {
        fs.mkdirSync(foldername, { recursive: true });
      }
  
      callback(null, foldername);
    },
    filename: (req, file, callback) => {
      console.log(file);
      // ambil file extensionnya
      const fileExtension = path.extname(file.originalname).toLowerCase();
  
      // callback(null, "tes.jpg"); //ubah menjadi nama pilihan kita
      // callback(null, file.originalname); // pakai nama asli filenya
      callback(null, `${req.user.username}${fileExtension}`); //profpic.xlsx
    },
  });
  
  const uploadSingle = multer({
    storage: storageSingle,
    limits: {
      fileSize: 10000000, // dalam byte, jadi 1000 byte = 1kb, 1000000 byte = 1mb
    },
    fileFilter: (req, file, callback) => {
      const filetypes = /jpeg|jpg|png/;
      const fileExtension = path.extname(file.originalname).toLowerCase();
  
      const checkExtName = filetypes.test(fileExtension);
  
      if (checkExtName) {
        callback(null, true);
      } else {
        callback(new Error("tipe data salah"), false);
      }
    },
  });

  module.exports = {
    uploadSingle,
  }