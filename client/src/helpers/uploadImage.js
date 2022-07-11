import axios from 'axios';

const uploadImage = async (imageObj) => {
  const CLOUD_NAME = process.env.REACT_APP_CLOUD_NAME;
  const UPLOAD_PRESET = process.env.REACT_APP_UPLOAD_PRESET;
  const url = `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/image/upload`;
  const formData = new FormData();
  formData.append('upload_preset', UPLOAD_PRESET);
  formData.append('file', imageObj);
  const resp = await axios.post(url, formData);

  return resp.data.url;
};

export default uploadImage;
