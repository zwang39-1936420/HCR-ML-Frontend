import React, { useState, useEffect,useRef} from 'react';
import './TranslationHistory.css'; // Import your CSS file for styling
import CopyToClipboardButton from './CopyToClipboardButton';

function TranslationHistory(props){
    const [showHistory, setShowHistory] = useState(false);
    const dropdownRef = useRef(null);

    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        // Click occurred outside the dropdown, close it
        setShowHistory(false);
      }
    };
  
    useEffect(() => {
      // Add event listener when the component mounts
      document.addEventListener('click', handleClickOutside);
  
      // Clean up the event listener when the component unmounts
      return () => {
        document.removeEventListener('click', handleClickOutside);
      };
    }, []); 

    useEffect (() => {
        localStorage.removeItem("history");
        localStorage.setItem("history", JSON.stringify(props.history));
    }
    ,[props.history])

    const handleShowHistory = () => {
        setShowHistory(!showHistory);
    }
  return (
    <div className="translation-history-container" ref={dropdownRef}>
    <button className="documentation-btn" onClick={handleShowHistory}>History</button>
    {showHistory && (
        <div className="history-dropdown">
        {props.history.length ? (
            props.history.map((item, index) => (
            <div key={index} className="history-item">
                <p>{item}</p>
                <CopyToClipboardButton textToCopy={item} buttonClass={"history-copy-btn"} textOnButton={"Copy"}></CopyToClipboardButton>
            </div>
            ))
        ) : (
            <div className="history-item">No history yet</div>
        )}
        </div>
    )}
    </div>

  );
};

export default TranslationHistory;
