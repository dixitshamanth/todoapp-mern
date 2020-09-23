import React, { useState, useEffect } from "react";
import axios from "axios"
import date from "./date"
import InputBox from "./inputBox.component"


function List(props){

const today= date.getDate();

const [resultData, setData] = useState([]);

const [urlPath]=useState(props.urlProp);

useEffect(()=>{
    axios.get(`http://localhost:8000/${urlPath}`)
        .then((response) => {
               (urlPath === "" ? setData(response.data):setData(response.data.items))
        })
        }
, []);
    

function getDataFromList(){
    axios.get("http://localhost:8000/"+urlPath)
        .then((response) => {
            
                (urlPath === "" ? setData(response.data) : setData(response.data.items))
        })
};

function addItem(newText){
    axios.post("http://localhost:8000/", {newText,urlPath})
    .then((response)=>{
        console.log(newText);
        console.log(response.data);
        getDataFromList();
        
    });
    
};

function removeItem(event){
    var itemId=event.target.value;
    axios.post("http://localhost:8000/remove", {itemId,urlPath})
    .then((response)=>{
        console.log(response.data);
        getDataFromList();
    });
  
};

function customList(newText){
  
}
    
        return(
            <div>

                <div className="box" id="heading">
                    <h1>{urlPath === "" ? `Hello there! It is ${today} `: `Custom List - ${urlPath}`}</h1>
                </div>
                <div className="box">
                    {resultData.map((item, index) => {
                        return (
                            <div className="item" key={index}>
                                <input type="checkbox" name="check" />
                                <p>{item.item}</p>
                                <button className="customButton" value={item._id} onClick={removeItem}>-</button>
                            </div>
                        )
                    })}

                    <InputBox addFunction={addItem} ph="New item" flag="d"/>

                </div>
                <div className="box">
                    <InputBox customListFunction={customList} ph="Go to a custom list" flag="c"/>
                </div>
            </div>  

        )
    }
   
        
export default List;