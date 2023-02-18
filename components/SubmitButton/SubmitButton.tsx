import React, { useEffect, useState } from "react";
import "./SubmitButton.css";



function SubmitButton({}) {
  const [isClicked, setIsClicked] = useState(false);

  const handleClick = () => {
    if (isClicked) {
      setIsClicked(false);
      console.log('want to mod')
      //TODO: get the state by parameter of the current score, keep it static
    } else {
      setIsClicked(true);
      console.log('submit')
      //TODO: release the state so it can change
    }
  };

  return (
    <button 
    className ="submitButton" 
    onClick = {handleClick}>
    {isClicked ? "Modify" : "Submit"}
    </button>
  );
}

export default SubmitButton;
