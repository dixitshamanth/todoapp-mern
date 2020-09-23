import React, { useState } from "react"
const _ = require("lodash")


function InputBox(props){

    
    const [newText, setText] = useState("");

    function handleChange(event) {
        const text = event.target.value;
        setText(text);
    };

    return(

        <div className="item">
            <input type="text" name="newItem" onChange={handleChange} value={newText} placeholder={props.ph} autoComplete="off" />
            {props.flag==="d"?(
                <button onClick={() => {
                    if (props.flag === "d") {
                        props.addFunction(newText);
                        setText("");
                    }
                }
                }>+</button>
            ) : (
                    <button><a href={"/" + _.capitalize(newText)} >Go</a></button>
                )
            }
            
        </div>

    )
}

export default InputBox;