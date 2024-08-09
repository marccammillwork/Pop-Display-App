import React, { useState } from 'react';
import { storage } from './firebase'; // Assuming Firebase is set up
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";

const FileUpload = ({ onUpload }) => {
  const [file, setFile] = useState(null);

  const handleChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleUpload = async () => {
    if (!file) return;
    const fileRef = ref(storage, `uploads/${file.name}`);
    await uploadBytes(fileRef, file);
    const url = await getDownloadURL(fileRef);
    onUpload(url);
  };

  return (
    <div>
      <input type="file" onChange={handleChange} />
      <button onClick={handleUpload}>Upload</button>
    </div>
  );
};

export default FileUpload;
