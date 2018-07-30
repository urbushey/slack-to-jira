// Saves options to chrome.storage
function save_options() {
  var jiraHost = document.getElementById('jiraHost').value;
  chrome.storage.sync.set({
    jiraHost: jiraHost,
  }, function() {
    // Update status to let user know options were saved.
    var status = document.getElementById('status');
    status.textContent = 'Options saved as ' + jiraHost;
    setTimeout(function() {
      status.textContent = '';
    }, 750);
  });
}

// Restores option state using the preferences
// stored in chrome.storage.
function restore_options() {
  // Use a sensible default JIRA host and provide an example for formatting
  chrome.storage.sync.get({
    jiraHost: 'jira.atlassian.com',
  }, function(items) {
    document.getElementById('jiraHost').value = items.jiraHost;
  });
}
document.addEventListener('DOMContentLoaded', restore_options);
document.getElementById('save').addEventListener('click',
    save_options);