var id = chrome.i18n.getMessage("@@extension_id");

var audio = new Audio(chrome.extension.getURL('t-rex-roar.mp3'));
// audio.play();

function decodeSearch(search) {
  search = search || window.location.search;
  return parsedSearch = search ? JSON.parse(
  '{"' + search.replace(/&/g, '","').replace(/=/g,'":"') + '"}',
  function(key, value) {
      return key === "" ? value : decodeURIComponent(value)
    }
  ) : {};
}

function getForm () {
  var form = {};
  Object.keys(document.forms).forEach(function(key) {
    if (document.forms[key].id && document.forms[key].id.indexOf('booking-form') >= 0) {
      form = document.forms[key];
    }
  });
  return form;
}

var pageState = {
  form: getForm(),
  search: window.location.search.substring(1),
  params: decodeSearch(window.location.search.substring(1)),
};

pageState.form = getForm();
console.log(pageState);



var tabId = NaN;

// let contentPort = chrome.runtime.connect({
//   name: 'background-content'
// });

function interceptData() {
  // var s = document.createElement('script');
  // s.src = chrome.extension.getURL('js/pageScript.js');
  // (document.head || document.documentElement).appendChild(s);
  // document.head.prepend(s);
}

function checkForDOM() {
  if (document.body && document.head) {
    interceptData();
  } else {
    requestIdleCallback(checkForDOM);
  }
}
requestIdleCallback(checkForDOM);


chrome.runtime.sendMessage({ action: "GetTabId" }, function(data) {
  if (!data || !data.tabId) {return}
  console.log('My tabId is', data.tabId);
  tabId = data.tabId;

});

chrome.runtime.sendMessage({ action: 'pageValidate', isValidPage: !!pageState.form });

chrome.runtime.onMessage.addListener(function (data, sender, sendResponse) {
  var response = {action: ''};
  data = data || {};

  switch (data.action) {
    case 'start':
      response.action = 'initialCheck';
      response.isOnCorrectPage = window.location.host === "programari.registru.md";
      break;
    case 'fillParams':
      if (data.params) {
        window.location.search = data.params;
      }
      break;
    case 'requestFields':
      if (pageState.form) {

        if (data.specificFieldName) {
          response.fields[data.specificFieldName] = pageState.form.elements[data.specificFieldName].outerHTML;
        }
        else {
          response.fields = {
            "ServiceId": pageState.form.elements["ServiceId"].outerHTML,
            "LocationId": pageState.form.elements["LocationId"].outerHTML
          };
        }
      }
      break;
    case 'requestSent':
      if (data.data.url) {

      }

      break;
  }



  sendResponse({data: response, success: true});
});


window.addEventListener('message', function (event) {
  if (event.data.action === 'zaur:RequestReport') {
    if (true) {
      console.log()
    }
  }
}, false);




