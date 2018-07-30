let monitorButton = document.getElementById('monitorForPaste');

/* Not really doing anything with this value yet */ 
chrome.storage.sync.get('jira_host', function(data) {
  alert("Running on host: " + data.jira_host);
});
  
monitorButton.onclick = function(element) {
  chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
    chrome.tabs.executeScript(
      tabs[0].id,
      {file: 'contentscript.js'
    });
  });
};