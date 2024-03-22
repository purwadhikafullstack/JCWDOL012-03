import { Request } from 'express';
import multer, { Multer } from 'multer';
import mime from 'mime-types';

// Konfigurasi storage untuk menyimpan file
const storage = multer.memoryStorage();

// Fungsi validasi ekstensi file
const fileFilter = (req: Request, file: Express.Multer.File, cb: multer.FileFilterCallback) => {
    const allowedExtensions = ['.jpg', '.jpeg', '.png', '.gif'];
    const fileExtension = '.' + mime.extension(file.mimetype);

    if (allowedExtensions.includes(fileExtension)) {
        cb(null, true);
    } else {
        cb(new Error('Invalid file extension. Only .jpg, .jpeg, .png, and .gif are allowed.'));
    }
};

// Konfigurasi upload multer
const upload: Multer = multer({
    storage: storage,
    limits: {
        fileSize: 1024 * 1024,
    },
    fileFilter: fileFilter,
});

export default upload;