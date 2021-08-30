module.exports.json = `{"menu": {
    "id": "file",
    "value": "File",
    "popup": {
      "menuitem": [
        {"value": "New", "onclick": "CreateNewDoc()"},
        {"value": "Open", "onclick": "OpenDoc()"},
        {"value": "Close", "onclick": "CloseDoc()"}
      ]
    }
  }}`;

module.exports.html = `
  <!DOCTYPE html>
  <html><body>
  <h1>My First Heading</h1><p>My first paragraph.</p>
  </body></html>
  `;

module.exports.css = `
<!DOCTYPE html>
<html lang="en">
<head><title>CSS Template</title>
<meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1">
<style>
* {  box-sizing: border-box;
}
body {
  font-family: Arial, Helvetica, sans-serif;
}
/* Style the header */
.header {
  background-color: #f1f1f1;
  padding: 30px;
  text-align: center;
  font-size: 35px;
}`;

module.exports.javascript = `
const rows = [["name1", "city1", "some other info"],["name2", "city2", "more info"]
];
let csvContent = "data:text/csv;charset=utf-8,";
rows.forEach(function(rowArray) {    let row = rowArray.join(",");
    csvContent += row;
});
`

module.exports.base64encode = `Hello world!`
module.exports.base64decode = `SGVsbG8gd29ybGQh`

module.exports.csv = `이름,생년,월,일,국어 점수,영어 점수,수학 점수
홍길동,1992,7,17,100,90,70
희동이,1992,4,3,90,100,100`