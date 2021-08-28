import $ from "jquery";

function json(str){    
    try{
      const jsObj = JSON.parse(str);
      return JSON.stringify(jsObj, null, 2);
      }catch(e){
        return 'Wrong Json String !!!';
      }
      
  }
  function html(str){    
    try{
      return "beautifyJS.Beautify_javascriptHTML(str)";
      }catch(e){
        return 'Wrong Json String !!!';
      }
      
  }
  function css(str){    
    try{
      $.ajax({
        url: 'http://localhost:3002/api',
        method: 'GET',
        success: function(response) {
          console.log(response.greeting);
          return response.greeting;
        }
      });
      }catch(e){
        return 'Wrong Json String !!!';
      }
      
  }
  function javascript(str){    
    try{
      return "beautifyJS(str)";
      }catch(e){
        return 'Wrong Json String !!!';
      }
      
  }
  //export default (c)=>json(c);
  export {json,html,css,javascript}