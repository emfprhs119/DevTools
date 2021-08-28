import $ from 'jquery'
import '../css/SelectableTable.css';
import React,{ useEffect } from 'react';
import {setToClipboard} from './Tools/clipboard'

function GenerateTable(rows,cols){
  let tableElement = ''

  for(var r=0;r<rows;r++){
    tableElement+='<tr>'
    for(var c=0;c<cols;c++){
      tableElement+='<td>1</td>'
    }
    tableElement+='</tr>'
  }
  return tableElement
}

export default function App(props) {
    // eslint-disable-next-line no-unused-vars
    const [_, activate] = React.useState(false);
    var table = $("#table");    
    var isMouseDown = false;
    var startRowIndex = null;
    var startCellIndex = null;
    function selectTo(cell) {
        var row = cell.parent();    
        var cellIndex = cell.index();
        var rowIndex = row.index();
        var rowStart, rowEnd, cellStart, cellEnd;
        
        if (rowIndex < startRowIndex) {
            rowStart = rowIndex;
            rowEnd = startRowIndex;
        } else {
            rowStart = startRowIndex;
            rowEnd = rowIndex;
        }
        
        if (cellIndex < startCellIndex) {
            cellStart = cellIndex;
            cellEnd = startCellIndex;
        } else {
            cellStart = startCellIndex;
            cellEnd = cellIndex;
        }        
        
        for (var i = rowStart; i <= rowEnd; i++) {
            var rowCells = table.find("tr").eq(i).find("td");
            for (var j = cellStart; j <= cellEnd; j++) {
                rowCells.eq(j).addClass("selected");
            }        
        }
    }
    
    table.find("td").mousedown(function (e) {
        isMouseDown = true;
        var cell = $(this);
    
        table.find(".selected").removeClass("selected"); // deselect everything
        
        if (e.shiftKey) {
            selectTo(cell);                
        } else {
            cell.addClass("selected");
            startCellIndex = cell.index();
            startRowIndex = cell.parent().index();
        }
        
        return false; // prevent text selection
    })
    .mouseover(function () {
        if (!isMouseDown) return;
        table.find(".selected").removeClass("selected");
        selectTo($(this));
    })
    .bind("selectstart", function () {
        return false;
    });
    
    $(document).mouseup(function () {
        isMouseDown = false;
        //console.log("stop");
        //getSelectedCells();
    });
    
    function getDataForClipboard(){
        let str = ''
        let currRow = -1;
        $("#table td").each(function(){
            if($(this).hasClass('selected')){
               //var col = $(this).parent().children().index($(this));
                var row = $(this).parent().parent().children().index($(this).parent());
                //console.log('Row: ' + row + ', Column: ' + col);
                if (currRow === row) 
                    str+='\t';
                else if (currRow !== -1)
                    str+='\n';

                str+=$(this).html();
                currRow = row;
            }
        })
        return str;
    }

    $(document).ready(function() {
        let ctrlDown = false,
            ctrlKey = 17,
            cmdKey = 91,
            //vKey = 86,
            cKey = 67;
    
        $(document).keydown(function(e) {
            if (e.keyCode === ctrlKey || e.keyCode === cmdKey) ctrlDown = true;
        }).keyup(function(e) {
            if (e.keyCode === ctrlKey || e.keyCode === cmdKey) ctrlDown = false;
        });
        
        // Document Ctrl + C/V 
        $(document).keydown(function(e) {
            //console.log(data);
            if (ctrlDown && (e.keyCode === cKey)) {
                const data = getDataForClipboard();
                setToClipboard(navigator,data);
            }
            /*if (ctrlDown && (e.keyCode == vKey)) getFromClipboard(navigator);*/
        });
    });
    
    useEffect(() => { /*console.log("component updated");*/ });

    return <div id='wrapper'>
    <table id="table" onMouseOver={()=>activate()}
    dangerouslySetInnerHTML={{__html:GenerateTable(props.rows,props.cols)}}>
  </table>
  </div>
}
 