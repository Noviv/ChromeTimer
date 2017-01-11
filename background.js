var currDomainIdx = null;
var domains = [];
var times = [];
var locked = false;

var update = function() {
	locked = true;
	chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
		chrome.tabs.sendMessage(tabs[0].id, {message: "act"}, function(response) {
			if (domains.indexOf(response.domain) < 0) {
				domains.push(response.domain);
				times.push(0);
			}
			
			currDomainIdx = domains.indexOf(response.domain);
			document.getElementById('smname')[0].value = 100;
		});
	});
	locked = false;
};

chrome.tabs.onActivated.addListener(function(activeInfo) {
	update();
});

chrome.tabs.onUpdated.addListener(function(tabId, changeInfo, tab) {
	update();
});

var lastTime = Date.now();
setInterval(function() {
	if (!locked) {
		var currTime = Date.now();
		times[currDomainIdx] += currTime - lastTime;
		lastTime = currTime;
	}
}, 0);
