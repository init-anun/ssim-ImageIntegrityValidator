import React from 'react';
import { useState } from 'react';


type Props = {
  inputType: string;
  onFileSelect: (file: File | null) => void;
}
export default function InputBox({ inputType , onFileSelect}: Props ) {

  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    
    const file = event.target.files?.[0] || null;
    
    if (file) {
      // save selected file to state
      setSelectedFile(file);
      onFileSelect(file); // pass the file up to parent component

      // create a temporary local URL for the preview image
      setImagePreview(URL.createObjectURL(file));
    }
  } 

  return (
    <div 
      className='inputBox'
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        marginBottom: '20px',
        marginTop: '20px',
        border: '1px dotted #ccc',
        paddingRight: '20px',
        paddingLeft: '20px',
        borderRadius: '30px'
      }}
    >
      <h2>{inputType} document</h2>      
      <input 
        type="file" 
        className='inputFile'
        accept="image/*"
        onChange={handleImageChange} 
        style={{
          marginTop: '10px',
          padding: '10px',
          borderRadius: '8px',
          border: '1px solid #ccc',
          cursor: 'pointer',
          backgroundColor: '#f0f0f0',
          color: '#333',
          fontWeight: 'bold',
        }}/>

        {imagePreview && (
          <div className='image-preview'
            style={{
              marginTop: '20px',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center'
            }}
          >
          <h3>Image Preview:</h3>
            <img 
              src={imagePreview} 
              alt="Preview"
              style={{
                borderRadius: '8px',
              }} />
          </div>
        )}
    </div>

    
  )
}
