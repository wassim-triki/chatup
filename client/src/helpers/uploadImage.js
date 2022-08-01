import axios from 'axios';
import resizeFiles from './resizeFiles';

const uploadImage = async (imageObj) => {
  const CLOUD_NAME = process.env.REACT_APP_CLOUD_NAME;
  const UPLOAD_PRESET = process.env.REACT_APP_UPLOAD_PRESET;

  const resizedImage = await resizeFiles([imageObj], 4, 150, 150);

  const url = `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/image/upload`;
  const formData = new FormData();
  formData.append('upload_preset', UPLOAD_PRESET);
  formData.append('file', resizedImage);
  const resp = await axios.post(url, formData);
  return resp.data.url;
};

export default uploadImage;
