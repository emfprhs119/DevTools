/*
import React, { useRef, useEffect } from "react";
import jspreadsheet from "jspreadsheet-ce";
 
import "../../node_modules/jspreadsheet-ce/dist/jspreadsheet.css";
import "../../node_modules/jspreadsheet-ce/dist/jspreadsheet.theme.css"; // dark
export default function App(props) {
  const jRef = useRef(null);
  const options = {
    data: [[]],
    minDimensions: [9, 5],
    defaultColWidth: "50px",
    tableOverflow: true,
    //tableWidth: `calc((100vw - ${58}px)/2-{props.sideBarExpend?100px:0px})`,
  };
 
  useEffect(() => {
    console.log(jRef.current.jexcel.getMeta);
    if (!jRef.current.jspreadsheet) {
      options.tableWidth = ((props.sideBarExpend)?"600px":"300px");
      
      jspreadsheet(jRef.current, options);
      //jRef.current.tableWidth = "80px";
    }
    jRef.current.jexcel.tableWidth = (((props.sideBarExpend)?"300px":"100px"));
  }, [options,props.sideBarExpend]);
 
  const addRow = () => {
    jRef.current.jexcel.insertRow();
  };
 
  return (
    <div>
      <div ref={jRef} />
    </div>
  );
}
*/