// This is a failed attempt to export translated Latex as PNG file. 

import React, { useRef } from 'react';
import 'katex/dist/katex.min.css';
import html2canvas from 'html2canvas';

const CopyLatexToClipboardButton = ({ latexCode }) => {
  const imageRef = useRef(null);

  const handleCopyClick = async () => {
    try {
      // const imageDataUrl = await convertLatexToImage(latexCode);
      // copyImageToClipboard(imageDataUrl);
    } catch (error) {
      console.error('Error converting LaTeX to image:', error);
    }
  };

  const captureImage = () => {
    const node = document.getElementById('latex-container');

    html2canvas(node).then((canvas) => {
      const imageData = canvas.toDataURL('image/png');
      console.log(imageData);
    });
  };

  const copyImageToClipboard = (imageDataUrl) => {
    if (imageRef.current) {
      imageRef.current.src = imageDataUrl;

      // Create a temporary input element to hold the image URL
      const tempInput = document.createElement('input');
      tempInput.setAttribute('type', 'text');
      tempInput.setAttribute('value', imageDataUrl);
      document.body.appendChild(tempInput);

      // Select and copy the image URL to the clipboard
      tempInput.select();
      document.execCommand('copy');
      document.body.removeChild(tempInput);
    }
  };

  return (
    <div>
      <button onClick={captureImage}>Copy LaTeX as PNG</button>
      <img className="copy-btn" ref={imageRef} alt="LaTeX as PNG" style={{ display: 'none' }} />
    </div>
  );
};

export default CopyLatexToClipboardButton;
