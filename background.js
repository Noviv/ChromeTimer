var currDomainIdx = null;
var domains = [];
var times = [];

localStorage.setItem("domains", JSON.stringify(domains));
localStorage.setItem("times", JSON.stringify(times));

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
			}
		});
	});
};

chrome.tabs.onActivated.addListener(function(activeInfo) {
	update();//udpate when user switches tabs
});

chrome.tabs.onUpdated.addListener(function(tabId, changeInfo, tab) {
	update();//update when a new URL is entered on a tab
});

update();

var lastTime = Date.now();
setInterval(function() {
	var currTime = Date.now();
	times[currDomainIdx] += currTime - lastTime;
	lastTime = currTime;
	
	localStorage.setItem("domains", JSON.stringify(domains));
	localStorage.setItem("times", JSON.stringify(times));
}, 0);
