// var bgPort = chrome.runtime.connect({name: "fromBackground"});
// chrome.runtime.onInstalled.addListener(function() {
//   chrome.declarativeContent.onPageChanged.removeRules(undefined, function() {
//     chrome.declarativeContent.onPageChanged.addRules([{
//       conditions: [new chrome.declarativeContent.PageStateMatcher({
//         pageUrl: {hostEquals: 'programari.registru.md'},
//       })
//       ],
//       actions: [new chrome.declarativeContent.ShowPageAction()]
//     }]);
//   });
// });
var activeSearches = [];

function filterFormData(data) {
  var string = new URLSearchParams(data).toString();

}

chrome.webRequest.onBeforeRequest.addListener(function(details) {
    console.log('Request is happening:');
    console.log(arguments);
    console.log('---------------------');
    var tabId = details.tabId;

    // if (tabId && details.url && details.requestBody) {
    //   var res = {};
    //   if (details.requestBody.formData) {
    //     var serializedForm = filterFormData(details.requestBody.formData);
    //     if (activeSearches.indexOf(serializedForm) < 0) {
    //       res = {
    //         action: "requestSent",
    //         data: {
    //           url: details.url,
    //           headers: serializedForm
    //         }
    //       };
    //     }
    //     else {
    //       res = {
    //         action: "caughtCheater",
    //       };
    //     }
    //   }
    //
    //   if (res) {
    //     chrome.tabs.sendMessage(tabId, res);
    //   }
    // }
  },{urls: ["*://programari.registru.md/*"]},
  ["requestBody"]
);
// chrome.webRequest.onHeadersReceived.addListener(function(details) {
//     console.log(arguments);
//   },{urls: ["*://programari.registru.md/*"]},
//   ["responseHeaders"]
// );

// chrome.webRequest.onCompleted.addListener(function(details) {
//     if (details.tabId) {
//       chrome.tabs.sendMessage(details.tabId, {"action": "requestHappened", "data": details.requestBody });
//     }
//     console.log(arguments);
//     console.log(this);
//   },{urls: ["*://programari.registru.md/*"]},
//   ["responseHeaders"]
// );

chrome.runtime.onMessage.addListener(function(data, sender, sendResponse) {
  var response = {action: ''};
  data = data || {};

  switch (data.action) {
    case 'GetTabId':
      response = {tabId: sender.tab.id};
      break;
    case 'pageValidate':
      if (data.isValidPage) {
        chrome.pageAction.show(sender.tab.id)
      }
      return;
    case "":

      break;
    default:
      return;
  }

  sendResponse(response);
});
