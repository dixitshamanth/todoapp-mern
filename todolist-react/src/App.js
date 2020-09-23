import React from 'react'
import List from "./components/list.component"
import {useParams} from "react-router-dom"

function App(props) {

  var urlPath = useParams().urlPath;

  if(props.type==="home"){
    urlPath = "";
  }
 
  return (
    <div >
    <List urlProp={urlPath}/>
    </div>
  );
}

export default App;
