import axios from "axios";
import { generateSHA1, generateSignature } from "./signature";

export const UploadCloundinary = async (file: any) => {
  try {
    const cloundName = process.env.NEXT_PUBLIC_CLOUDINARY_NAME as string;
    const presetName = process.env.NEXT_PUBLIC_CLOUDINARY_PRESET_NAME as string;
    const folderName = process.env.NEXT_PUBLIC_CLOUDINARY_FOLDER_NAME as string;
    const url = `https://api.cloudinary.com/v1_1/${cloundName}/upload`;

    const formData = new FormData();

    formData.append("upload_preset", presetName);
    formData.append("folder", folderName);
    formData.append("file", file);

    const response = await axios.post(url, formData);
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

export const deleteImageCloundinary = async (public_id: any) => {
  try {
    const cloudName = process.env.NEXT_PUBLIC_CLOUDINARY_NAME as string;
    const apiKey = process.env.NEXT_PUBLIC_CLOUDINARY_API_KEY;
    const apiSecret = process.env.NEXT_PUBLIC_CLOUDINARY_API_SECRET;
    const timestamp = new Date().getTime();
    const signature = generateSHA1(generateSignature(public_id, apiSecret));
    const url = `https://api.cloudinary.com/v1_1/${cloudName}/image/destroy`;
    const response = await axios.post(url, {
      public_id: public_id,
      signature: signature,
      api_key: apiKey,
      timestamp: timestamp,
    });
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.log(error);
  }
};
