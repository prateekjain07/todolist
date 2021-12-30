import React, { useState } from 'react';
import { TextField } from '@material-ui/core';

function Form(props){
    const [text, changeText] = useState("");

    const handleChange = (e) => {
        const newText = e.target.value;
        changeText(newText);
    }
    const handleKeyDown = (e) => {
        if(e.key === 'Enter'){
            props.submit(text);
            return e.target.value;
        }
    }



    return (    
        <TextField id="standard-basic"
        onChange = {handleChange} 
        onKeyDown = {handleKeyDown}
        value={text}
        label="New Task" fullWidth/>
    )
}

export default Form