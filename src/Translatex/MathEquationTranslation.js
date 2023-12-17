import React, {useState, useEffect} from 'react';
import CopyToClipboardButton from './CopyToClipboardButton';
import TranslationHistory from './TranslationHistory.js';
import FileUploadArea from './FileUploadArea';
import './style.css';

function MathEquationTranslation() {

  const ifHasLocalStorage = () => {
    if(localStorage.getItem("history")){
        return JSON.parse(localStorage.getItem("history"));
    } 
    return [];
    }

  const [responseText, setResponseText] = useState('');
  const [imageSrc, setImageSrc] = useState(null);
  const [timerId, setTimerId] = useState(null);
  const [errorMessage, setErrorMessage] = useState("");
  const [selectedFile, setSelectedFile] = useState(null);
  const [isDragOver, setIsDragOver] = useState(false);
  const [history, setHistory] = useState(ifHasLocalStorage());


  useEffect(() => {
    // Clear any existing timeout (if it exists)
    if (timerId) {
      clearTimeout(timerId);
    }
    const newTimerId = setTimeout(() => {
      setErrorMessage('');
    }, 3000); // 3 seconds

    // Store the new timeout ID in state
    setTimerId(newTimerId);
  }, [errorMessage]);


  const handleFileRemove = () => {
    // Remove the selected file by updating state to null
    setSelectedFile(null);
  };

  useEffect(() => {
    // Set the Latex Output
    if (responseText !== ''){
      setImageSrc(responseText.image);
    } 
  }, [responseText]);


  const handlePostRequest = async () => {
    try {

      const formData = new FormData();
      formData.append('file', selectedFile);

      const options = {
        math_inline_delimiters: ['$', '$'],
        rm_spaces: true,
      };

      formData.append('options_json', JSON.stringify(options));
      
      const response = await fetch('http://127.0.0.1:5000/predict', {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const responseData = await response.json();
      console.log(responseData);
      if (!responseData.error) {
        setResponseText(responseData);
        setHistory([responseData.prediction, ...history]);
      } else {
        setErrorMessage('Error: ' + responseData.error + "please  try  again!");
      }

    } catch (error) {
      console.error('Error during POST request:', error);
    }
  };
  
  return (
    <div className="app-container">
      <nav className="navbar">
        <div className="logo">OCR Recognizer</div>
        <div className="nav-links">
          {/* <button className="documentation-btn">History</button> */}
          <TranslationHistory 
            history = {history}
            setHistory = {setHistory}
          ></TranslationHistory>
        </div>
      </nav>

      <p id="headline">Upload your handwritten letters to translate into digital format!</p>

      <div className="main-content">
        <FileUploadArea 
          selectedFile={selectedFile}
          setSelectedFile={setSelectedFile}
          handlePostRequest={handlePostRequest}
          isDragOver={isDragOver}
          setIsDragOver={setIsDragOver}
          handleFileRemove={handleFileRemove}
        />

        <div className="output">
          <div className="text-box-container">
            <p className='output-text'>{responseText.prediction}</p>
            <CopyToClipboardButton textToCopy = {responseText.prediction} buttonClass={"copy-btn"} textOnButton={"Copy"}></CopyToClipboardButton>
          </div>

          <div className="text-box-container">
            <div>
                <p>Formula preview: </p>
                { imageSrc && (
                  <img className="preview_img" src={`data:image/png;base64,${imageSrc}`} alt="Processed Image" />
                )}
                <p>{errorMessage}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default MathEquationTranslation;
