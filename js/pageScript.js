var XHR = XMLHttpRequest.prototype;
var send = XHR.send;
var open = XHR.open;
XHR.open = function(method, url) {
  this.url = url;
  return open.apply(this, arguments);
};
XHR.send = function(params) {
  this.params = params;
  this.addEventListener('load', function() {
    console.log('Response happened');
    console.log(this);
    console.log('--------------------------');
    window.postMessage({action: 'zaur:RequestReport', payload: JSON.parse(JSON.stringify(this))}, '*');
  });
  return send.apply(this, arguments);
};

window.addEventListener('zaurAttempt', function getDuckInPage(event) {

}, false);

