import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import $ from "jquery";
import {get,post} from "./appData/Connector"
//import reportWebVitals from './reportWebVitals';

function makeid(length) {
  var result           = '';
  var characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  var charactersLength = characters.length;
  for ( var i = 0; i < length; i++ ) {
    result += characters.charAt(Math.floor(Math.random() * 
charactersLength));
 }
 return result;
}
const uid = makeid(16);
/** when using dist server
sessionStorage.setItem('api', 'http://localhost:3002/api');
$.post("http://localhost:3002/api", { uid: uid,appName: "Home"});
*/
sessionStorage.setItem('uid', uid);
post({ uid: uid,appName: "Home"},null);

if (window.location.href.split('/').pop() !== 'Home')
  window.location.href='Home';

ReactDOM.render(
  <React.Fragment>
    <App />
  </React.Fragment>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
//reportWebVitals();
