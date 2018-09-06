const SLACK_MULTILINE_CODE_REGEXP = /```/g;
const JIRA_MULTILINE_OUTPUT = '{code}'
const SLACK_STRIKETHROUGH = /\~(.*)\~/g;
const JIRA_STRIKETHROUGH_OUTPUT = '-'
const SLACK_PREFORMAT = /\`(.*)\`/g;
const JIRA_PREFORMAT_OUTPUT = '{{' // this won't work, think of better solution

let jiraHosts = [];

/* Check the storage that is loaded on install for our JIRA URLs */ 
chrome.storage.sync.get('jiraHost', function(data) {
  jiraHosts.push(data.jiraHost);
  console.log("JiraURLs: " + jiraHosts);
  
  if (jiraHosts.includes(window.location.hostname)) {
    console.log("Site detected as JIRA. Adding Slack to JIRA listener.");
    document.addEventListener("paste", function(e) {
      // Prevent the default pasting event and stop bubbling
      e.preventDefault();
      e.stopPropagation();
  
      // Get the clipboard data
      let paste = (e.clipboardData || window.clipboardData).getData('text');
      console.log("Captured clipboard text: " + paste);
      
      // Edit the clipboard data
      translatedPaste = translatePasteData(paste)
      
      console.log("Pasting in replacement text: " + translatedPaste)
      document.execCommand("insertHTML", false, translatedPaste);
    });
  } else {
    console.log("Not injecting code.");
  }
});

/* The below should go into its own file eventually */

function translatePasteData(originalData) {
  jiraString = fromSlackToJira(originalData);
	return jiraString;
}

function fromSlackToJira(rawString) {
	/* Takes in a string of the type:
   *
   * ` ```This is some code``` `
   *
   * and returns:
   *
   * ` {code}This is some code{code}`
   */
   
   jiraString = rawString.replace(SLACK_MULTILINE_CODE_REGEXP, JIRA_MULTILINE_OUTPUT);
   jiraString = jiraString.replace(SLACK_STRIKETHROUGH, JIRA_STRIKETHROUGH_OUTPUT)
   
   return jiraString;
}