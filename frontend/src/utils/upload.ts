import axios from "axios";

async function UploadCloundinary(file: any) {
  try {
    const cloundName = process.env.NEXT_PUBLIC_CLOUDINARY_NAME as string;
    const presetName = process.env.NEXT_PUBLIC_CLOUDINARY_PRESET_NAME as string;
    const folderName = process.env.NEXT_PUBLIC_CLOUDINARY_FOLDER_NAME as string;
    const baseUrl = `https://api.cloudinary.com/v1_1/${cloundName}/upload`;

    const formData = new FormData();

    formData.append("upload_preset", presetName);
    formData.append("folder", folderName);
    formData.append("file", file);

    const response = await axios.post(baseUrl, formData);
    return response.data.url;
  } catch (error) {
    console.log(error);
  }
}

export default UploadCloundinary;
