

function getFromClipboard(navigator){
        if (!navigator.clipboard) {
          return;
        }
        navigator.clipboard.readText().then(function(text){
            console.log(text);
        })
    }
    function setToClipboard(navigator,text) {
        if (!navigator.clipboard) {
            console.log('fallbackCopyTextToClipboard(text)');
          return;
        }
        navigator.clipboard.writeText(text).then(function() {
          console.log('Async: Copying to clipboard was successful!');
        }, function(err) {
          console.error('Async: Could not copy text: ', err);
        });
      }
export {getFromClipboard,setToClipboard};