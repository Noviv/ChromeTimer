var currDomainIdx = null;
var domains = [];
var times = [];

var update = function() {
	chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
		chrome.tabs.sendMessage(tabs[0].id, {message: "act"}, function(response) {
			if (response == null) {
				currDomainIdx = null;
			} else {
				if (domains.indexOf(response) < 0) {
					domains.push(response);
					times.push(0);
				}
				
				currDomainIdx = domains.indexOf(response);
				for (i = 0; i < domains.length; i++) {
					console.log(domains[i] + ": " + (times[i] / 1000.0) + " seconds");
				}
			}
		});
	});
};

chrome.tabs.onActivated.addListener(function(activeInfo) {
	update();
});

chrome.tabs.onUpdated.addListener(function(tabId, changeInfo, tab) {
	update();
});

var lastTime = Date.now();
setInterval(function() {
	var currTime = Date.now();
	times[currDomainIdx] += currTime - lastTime;
	lastTime = currTime;
}, 0);
