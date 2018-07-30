// Sensible default JIRA host
const jiraHost = 'jira.atlassian.com';

chrome.runtime.onInstalled.addListener(function() {
    chrome.storage.sync.set({jiraHost: jiraHost}, function() {
    });
    chrome.declarativeContent.onPageChanged.removeRules(undefined, function() {
        chrome.declarativeContent.onPageChanged.addRules([{
          conditions: [new chrome.declarativeContent.PageStateMatcher({
            pageUrl: {hostEquals: jiraHost},
          })
          ],
              actions: [new chrome.declarativeContent.ShowPageAction()]
        }]);
      });
  });