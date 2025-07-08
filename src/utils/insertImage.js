// src/utils/insertImage.js
import { Transforms } from 'slate';
import axios from 'axios';
import { toast } from 'react-toastify';

const CLOUD_NAME = import.meta.env.VITE_CLOUDINARY_CLOUD_NAME; 
const UPLOAD_PRESET = import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET;

export const insertImageDialog = async (editor) => {
  const fileInput = document.createElement('input');
  fileInput.type = 'file';
  fileInput.accept = 'image/*';
  fileInput.click();

  fileInput.onchange = async () => {
    const file = fileInput.files[0];
    if (!file) return;
    if (file.size > 5 * 1024 * 1024) {
      toast.error('Image size too big (5MB)');
      return;
    }

    try {
      const formData = new FormData();
      formData.append('file', file);
      formData.append('upload_preset', UPLOAD_PRESET);

      const res = await axios.post(`https://api.cloudinary.com/v1_1/${CLOUD_NAME}/image/upload`, formData);
      const url = res.data.secure_url;

      const imageNode = { type: 'image', url, children: [{ text: '' }] };
      const paragraphNode = { type: 'paragraph', children: [{ text: '' }] };

      Transforms.insertNodes(editor, [imageNode, paragraphNode]);
    } catch (err) {
      console.error(err);
      toast.error('Failed to upload image');
    }
  };
};