import { v2 as cloudinary } from "cloudinary";
import { Request, Response } from "express";
import fs from "fs";
import File, { TYPEFILE } from "../database/model/File";
import FileRepo from "../database/repository/FileRepo";
import dotenv from "dotenv";

dotenv.config();

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export const UploadController = {
  upload: async (req: Request, res: Response) => {
    try {
      const { file } = req as any;

      const type = req.query.type || (TYPEFILE.ORDER as string);

      const { path } = file;

      const result = await new Promise<any>((resolve, reject) => {
        cloudinary.uploader.upload(
          path,
          { format: "webp", access_mode: "public" },
          // { upload_preset: "kyu77xbt", resource_type: "auto" },
          (error, result) => {
            if (error) reject(error);
            else resolve(result);
          }
        );
      });
      fs.unlinkSync(path);
      await FileRepo.create({
        public_id: result.public_id,
        url: result.secure_url,
        type,
      } as File);
      res.json({ public_id: result.public_id, url: result.secure_url });
    } catch (error) {
      console.error(error);
      res.status(400).json({ error: "Failed to upload image" });
    }
  },
};
