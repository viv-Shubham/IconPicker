import React,{useContext,useState} from 'react';
import * as icons from "react-icons/fi";
import {iconContext} from './App'

function Picker({rowsInOnePage, 
                columnsInOnePage,
                iconSize,
                pickerHeight,
                pickerWidth})
    {
    const dispatch = useContext(iconContext);
    const numberOfIcons = rowsInOnePage*columnsInOnePage;
    const [pageNumber,setPageNumber] = useState(0);
    const totalIcons = Object.keys(icons).length;
    const lastPage = Math.ceil(totalIcons/numberOfIcons*(1.0))-1;
    const start = numberOfIcons*pageNumber;


    const style = {
        display: "grid",
        gridTemplateColumns: `repeat(${columnsInOnePage},auto)`,
        gridTemplateRows: `repeat(${rowsInOnePage}, auto)`
    }
    const styledContainer = {
        width: pickerWidth,
        height: pickerHeight
    }

    return (
        <div style={styledContainer}>
            <div style={{display: "flex",justifyContent: "center"}}>
                <button disable={pageNumber <= 0} onClick={() => pageNumber > 0 ? setPageNumber(pageNumber-1) : null}>{'<'}</button>
                <span>  Page {pageNumber+1} of {lastPage+1}  </span>
                <button diable={pageNumber >= lastPage} onClick={() => pageNumber < lastPage ? setPageNumber(pageNumber+1):null}>{'>'}</button>
            </div>
            <div style={style}>
                {
                    Object.keys(icons).slice(start,start+numberOfIcons).map((icon,idx)=>{
                        return <div key={idx} onClick={()=>{dispatch({type:'selectedIcon',payload:icon})}}>{icons[icon]({size:iconSize})}</div>
                    })
                }
            </div>
            
        </div>
    );
}

export default Picker;