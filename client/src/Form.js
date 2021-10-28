import React, { useState } from 'react';
import { TextField } from '@material-ui/core';

function Form(props){
    const [text, changeText] = useState("");

    const handleChange = (e) => {
        const newText = e.target.value;
        changeText(newText);
        // console.log(text);
    }
    const handleKeyDown = (e) => {
        if(e.key === 'enter'){
            props.submit(text);
            return e.target.value;
        }
    }



    return (    
        <TextField id="standard-basic"
        onChange = {handleChange} 
        onKeyDown = {handleKeyDown}
        label="New Task" fullWidth/>
    )
}

export default Form