import axios from "axios";

async function UploadCloundinary(file: any) {
  try {
    const cloundName = "dbjkk9wg0";
    const presetName = "facebook-clone";
    const folderName = "facebook-posts";
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
