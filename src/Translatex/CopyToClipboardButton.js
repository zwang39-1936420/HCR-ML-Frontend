import React, { useState, useRef} from 'react';

const CopyToClipboardButton = ({ textToCopy, textOnButton, buttonClass }) => {
  const [showReminder, setShowReminder] = useState(false);

  const textAreaRef = useRef(null);

  const handleCopyClick = () => {
    if (textAreaRef.current) {
      textAreaRef.current.select();
      document.execCommand('copy');
      setShowReminder(true);

      // Hide the reminder after 3 seconds
      setTimeout(() => {
        setShowReminder(false);
      }, 3000);
    }
  };

  return (
    <div>
      <textarea
        ref={textAreaRef}
        value={textToCopy}
        style={{ position: 'absolute', left: '-9999px' }}
        aria-label="invisible textarea for copying text"
        readOnly
      />
      <button className={buttonClass} onClick={handleCopyClick}>{textOnButton}</button>

      {showReminder && (
        <div className='copy-text'>
          Copied to clipboard
        </div>
      )}
    </div>
  );
};

export default CopyToClipboardButton;
