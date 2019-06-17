var popupID = Math.random().toString(36).replace(/[^a-z]+/g, '').substr(0, 5);

chrome.runtime.onMessage.addListener(function(data, sender, sendResponse) {
  console.log(arguments);
});
document.addEventListener('DOMContentLoaded', function() {
  document.getElementById('changelinks').addEventListener('click', function () {
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
      chrome.tabs.sendMessage(tabs[0].id, {action: 'fillParams', params: "?ServiceId=418&LocationId=24&ProviderId=36&j=1"}, function(response) {
        console.log('received repsonse about change params');
        console.log(arguments);
      });
    });
  });


  flatpickr("#datepick", {
    mode: "multiple",
    dateFormat: '"Y-m-d"'
  });
});
