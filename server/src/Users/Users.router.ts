import express from 'express';
import { getUsersByOrganization, handleGet } from './Users.controller';
import * as multer from 'multer';

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'upload');
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  },
});

const upload = multer.default({ storage: storage }).single('file');

const router = express.Router();
router.get('/', handleGet);
router.get('/organization', getUsersByOrganization);
router.get('/image', upload);

export default router;
