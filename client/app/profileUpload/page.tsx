'use client'

import { useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";

const UploadImage = () => {
  const [image, setImage] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [uploadedImage, setUploadedImage] = useState<string | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setImage(file);
      setPreview(URL.createObjectURL(file)); // Show preview before upload
    }
  };

  const handleUpload = async () => {
    if (!image) return alert("Please select an image");

    const formData = new FormData();
    formData.append("image", image);

    try {
      const { data } = await axios.post("http://localhost:8000/api/v1/upload-profile", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      setUploadedImage(data.imageUrl); // Set the URL of the uploaded image
    } catch (error) {
      toast.error('Upload Error')
    }
  };

  return (
    <div>
      <input type="file" accept="image/*" onChange={handleFileChange} />
      {preview && <img src={preview} alt="Preview" width={200} />}
      <button onClick={handleUpload}>Upload</button>
      {uploadedImage && uploadedImage !== "" && (
        <img src={uploadedImage} alt="Uploaded" width={200} />
      )}
    </div>
  );
};

export default UploadImage;
