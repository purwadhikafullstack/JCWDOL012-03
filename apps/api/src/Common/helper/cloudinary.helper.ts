import { v2 as cloudinary } from 'cloudinary';

cloudinary.config({
  cloud_name: 'dpzaqmc70',
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const forCloudinary = (file, folder) => {
  return new Promise((resolve) => {
    cloudinary.uploader.upload(
      file,
      (result) => {
        resolve({
          url: result.url,
          id: result.public_id,
        });
      },
      {
        resource_type: 'auto',
        folder: folder,
      },
    );
  });
};

export default forCloudinary;
