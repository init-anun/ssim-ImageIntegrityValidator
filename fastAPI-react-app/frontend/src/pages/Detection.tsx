import React, { useState, useEffect } from 'react';
import InputBox from '../components/InputBox'; 
import Title from '../components/Title';
import { DetectTampering } from '../services/DetectionService';
import type { DetectionResponse } from '../types/detection';

// fastapi static mount URL endpoint'
const IMAGE_BASE_URL = 'http://localhost:8000/static/';
export default function Detection() {

  // 1. Create states to hold the actual files uploaded by the user
  const [originalFile, setOriginalFile] = useState<File | null>(null);
  const [tamperedFile, setTamperedFile] = useState<File | null>(null);
  
  // Track loading state and API results
  const [isChecking, setIsChecking] = useState(false);
  const [result, setResult] = useState<DetectionResponse | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const [checked, setChecked] = useState(false);

  const handleClick = async () => {
    console.log('clicked');

    //  Safety check: ensure both inputs actually have files selected
    if (!originalFile || !tamperedFile) {
      setErrorMessage('Both original and tampered images must be uploaded before checking.');
      return;
    }


    setIsChecking(true);
    setErrorMessage(null);


    try {
      // 2. Pass the real files sitting in your state directly to the service
      const response = await DetectTampering({
        original_image: originalFile,
        tampered_image: tamperedFile
      });

      console.log('Detection response:', response);
      setResult(response);
      setChecked(true);

    } catch (error: unknown) {
      console.error('Error uploading image:', error);
      const status = (error as any)?.response?.status;
      if (status === 422) {
        setErrorMessage('Backend rejected file layout. Verify key names match.');
      } else if (status === 400) {
        setErrorMessage('Bad request - likely an issue with the uploaded file format.');
      } else {
        setErrorMessage('Server connection error. Is your backend running?');
      }
    } finally {
      setIsChecking(false);
    }
  };

  useEffect(() => {
    if (checked) {
      console.log('Final result:', result);
      console.log('Checked:', checked);
      
      // logic to handle the result, e.g., display it in the UI or trigger other actions

      // Reset the checked state after handling the result
      setChecked(false);



    }
  }, [checked]);


  return (
    <div className="App">
      <Title text="Image Integrity Validator App" />
      <hr className='horizontal-line' />
      
      <div className='container' >
        
        {/* Error Feedback Display */}
        {errorMessage && (
          <div style={{ color: 'red', marginBottom: '10px', fontWeight: 'bold' }}>
            {errorMessage}
          </div>
        )}

        <div className='body' style={{ display: 'flex', gap: '20px' }}>
          {/* 3. Pass state setters down into your InputBoxes */}
          <InputBox inputType="original" onFileSelect={setOriginalFile} />
          <InputBox inputType="tampered" onFileSelect={setTamperedFile} />
        </div>

        <button 
          className='checkBtn'
          disabled={isChecking} // Disable button while working
          style={{
            height: '40px',
            width: '120px',
            backgroundColor: isChecking ? '#cccccc' : '#4CAF50',
            color: 'white',
            border: 'none',
            borderRadius: '5px',
            cursor: isChecking ? 'not-allowed' : 'pointer',
            marginTop: '20px',
            marginBottom: '10px'
          }}
          onClick={handleClick}
        >
          {isChecking ? 'Checking...' : 'Check'}
        </button>

        { result && (
          <div style={{ marginBottom: '20px', fontWeight: 'bold' }}>
            <div className=''
              style={{
                display: 'flex',
                marginTop: '20px',
                marginBottom: '10px',
                flexDirection: 'column',
                alignItems: 'center',
                gap: '10px'
            }}> 
              <h2>Similarity Score</h2>
              {/* 4. Display the live similarity score from the backend response schema */}
              <span>{result ? `${result.similarity_score}%` : '--- %'}</span>
              {/* <h3>{result?.message || 'Awaiting Check'}</h3> */}
            </div>
            {/* <h3>Generated Files:</h3> */}
            {/* Results View Container */}
      {result && result.success && (
        <div style={{ marginTop: '30px', width: '100%' }}>
          <h2>Analysis Visualizations</h2>
          
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px', marginTop: '20px' }}>
            
            {/* 1. Original Processed Output */}
            <div style={{ textAlign: 'center', border: '1px solid #ddd', padding: '10px' }}>
              <h4>Original Scan Detected</h4>
              <img
                    src={`data:image/jpeg;base64,${result.generated_files.original_detected}`}
                    alt="Original"
                    width={300}
                />
            </div>

            {/* 2. Tampered Processed Output */}
            <div style={{ textAlign: 'center', border: '1px solid #ddd', padding: '10px' }}>
              <h4>Tampered Scan Detected</h4>
              <img src={`data:image/jpeg;base64,${result.generated_files.tampered_detected}`}
                    alt="Tampered"
                    width={300}
                />
            </div>

            {/* 3. Heatmap Difference Layer */}
            <div style={{ textAlign: 'center', border: '1px solid #ddd', padding: '10px' }}>
              <h4>Structural Difference Map</h4>
              <img 
                src={`data:image/jpeg;base64,${result.generated_files.difference}`}
                alt="Structural analysis difference layer"
                style={{ width: '100%', maxHeight: '300px', objectFit: 'contain' }}
              />
            </div>

            {/* 4. Binary Threshold Layer */}
            <div style={{ textAlign: 'center', border: '1px solid #ddd', padding: '10px' }}>
              <h4>Isolating Threshold Area</h4>
              <img 
                src={`data:image/jpeg;base64,${result.generated_files.threshold}`} 
                alt="Isolating highlights threshold view"
                style={{ width: '100%', maxHeight: '300px', objectFit: 'contain' }}
              />
            </div>

          </div>
        </div>
      )}
          </div>
        )} 
        
      </div>
    </div>
  );
}





















//   return (
//     <div className="App">
//       <Title text="Document Tampering Detection App" />
//       <hr className='horizontal-line' />
      
//       <div className='container' style={{
//         display: 'flex', 
//         flexDirection: 'column', 
//         alignItems: 'center',
//         marginTop: '20px',
//         height: '100%',
//         justifyContent: 'space-between'
//       }}>
        
//         {/* Error Feedback Display */}
//         {errorMessage && (
//           <div style={{ color: 'red', marginBottom: '10px', fontWeight: 'bold' }}>
//             {errorMessage}
//           </div>
//         )}

//         <div className='body' style={{ display: 'flex', gap: '20px' }}>
//           {/* 3. Pass state setters down into your InputBoxes */}
//           <InputBox inputType="original" onFileSelect={setOriginalFile} />
//           <InputBox inputType="tampered" onFileSelect={setTamperedFile} />
//         </div>

//         <button 
//           className='checkBtn'
//           disabled={isChecking} // Disable button while working
//           style={{
//             height: '40px',
//             width: '120px',
//             backgroundColor: isChecking ? '#cccccc' : '#4CAF50',
//             color: 'white',
//             border: 'none',
//             borderRadius: '5px',
//             cursor: isChecking ? 'not-allowed' : 'pointer',
//             marginTop: '20px',
//             marginBottom: '10px'
//           }}
//           onClick={handleClick}
//         >
//           {isChecking ? 'Checking...' : 'Check'}
//         </button>

//         <div className='footer'> 
//           <h2>Result</h2>
//           {/* 4. Display the live similarity score from the backend response schema */}
//           <span>{result ? `${result.similarity_score}%` : '--- %'}</span>
//           <h3>{result?.message || 'Awaiting Check'}</h3>
//         </div>
//       </div>
//     </div>
//   );
// }