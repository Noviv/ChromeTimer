chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
	if (request.message == "act") {
		sendResponse({domain: document.domain});
	}
});