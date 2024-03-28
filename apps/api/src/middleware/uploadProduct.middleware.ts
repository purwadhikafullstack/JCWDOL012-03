import multer from 'multer';
import path from 'path';
import { Request, Response, NextFunction } from 'express';

// Konfigurasi penyimpanan file
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'public/');
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname); // Nama file yang disimpan sama dengan nama aslinya
  },
});

// Membuat middleware untuk mengunggah gambar tunggal
const upload = multer({
  storage: storage,
  limits: {
    fileSize: 1024 * 1024, // 1MB
  },
  fileFilter: function (req, file, cb) {
    const filetypes = /jpeg|jpg|png|gif/;
    const extname = filetypes.test(
      path.extname(file.originalname).toLowerCase(),
    );
    const mimetype = filetypes.test(file.mimetype);
    if (mimetype && extname) {
      return cb(null, true);
    }
    cb(new Error('Only images are allowed'));
  },
}).single('image'); // Nama field pada form input file

// Middleware untuk menangani pengunggahan gambar
const handleImageUpload = (req: Request, res: Response, next: NextFunction) => {
  upload(req, res, function (err: any) {
    if (err instanceof multer.MulterError) {
      // A error occurred during upload
      console.error('Multer error:', err);
      return res.status(400).json({
        code: 400,
        message: 'Bad request',
      });
    } else if (err) {
      // An unknown error occurred
      console.error('Unknown error:', err);
      return res.status(500).json({
        code: 500,
        message: 'Internal server error',
      });
    }
    // Everything went fine
    next(); // Melanjutkan ke middleware atau handler berikutnya
  });
};

export default handleImageUpload;
