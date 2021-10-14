import logo from './logo.svg';
import './App.css';
import {useState,createContext,useReducer} from 'react';
import Picker from './picker.js'
import * as icons from 'react-icons/fi';

const rowsInOnePage=5, 
      columnsInOnePage=9,
      iconSize=30,
      pickerHeight='500px',
      pickerWidth='500px';

 const initialState='';
 function reducer(state,action){
  if(action.type === 'selectedIcon')return action.payload;
  if(action.type === 'reset')return "";
  return state;
}
export const iconContext = createContext();

function App() {
  
  const [state, dispatch] = useReducer(reducer, initialState);
  const [showPicker,setShowPicker] = useState(false);

  function reset(){
    setShowPicker(false);
    dispatch({type:'reset'});
  }

  return (
    <> 
    <div style={{width:'100px',height:'100px',border:"1px solid black"}} onClick={()=>setShowPicker(!showPicker)}>
    {state.length>0?
    icons[state]({size:iconSize})
    :
    "Click here to Select Icon"
}
    </div>
     {showPicker?
     <div style={{width:pickerWidth,height:pickerHeight}}>
     <span style={{display:'flex',justifyContent:"flex-end"}} onClick={()=>{reset()}}>X</span>
     <iconContext.Provider value={dispatch}>
          <Picker  
              rowsInOnePage={rowsInOnePage} 
              columnsInOnePage={columnsInOnePage}
              iconSize={iconSize}
              pickerHeight={pickerHeight}
              pickerWidth={pickerWidth}
            /> 
      </ iconContext.Provider>
      <div style={{display:'flex',justifyContent:"flex-end",position:"relative",bottom:"300px"}}>
        <button onClick={()=>{reset()}}>Cancel</button>
        <button onClick={()=>setShowPicker(false)}>Done</button>
      </div>
      </div>
      :
      null
     }
    </>
  );
}

export default App;
