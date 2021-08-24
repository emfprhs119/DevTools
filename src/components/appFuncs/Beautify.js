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
      //const jsObj = JSON.parse(str);
      return "html";
      }catch(e){
        return 'Wrong Json String !!!';
      }
      
  }
  function css(str){    
    try{
      //const jsObj = JSON.parse(str);
      return "css";
      }catch(e){
        return 'Wrong Json String !!!';
      }
      
  }
  function javascript(str){    
    try{
      //const jsObj = JSON.parse(str);
      return "javascript";
      }catch(e){
        return 'Wrong Json String !!!';
      }
      
  }
  export default (c)=>json(c);
  export {json,html,css,javascript}