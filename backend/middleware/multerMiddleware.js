import multer from "multer";
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const filename = fileURLToPath(import.meta.url);
const foldername = dirname(filename);

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, `${foldername}/../public/images/uploads`);
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  }
});

export const upload = multer({
  storage,
  limits: { fileSize: 5 * 1024 * 1024 }
});
