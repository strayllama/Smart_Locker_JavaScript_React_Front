import React from 'react';
import './messageBox.css'

const MessageBox = ({ text })  => {
  return (
    <div id="message-box">
      <p id="message-text">{text}</p>
    </div>
  );
}

export default MessageBox
