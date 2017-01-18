setInterval(function() {
	var domains = JSON.parse(localStorage.domains);
	var times = JSON.parse(localStorage.times);

	var ihtml = "<table id=\"t\">";
	
	ihtml += "<tr id=\"tcenter\">";
	ihtml += "<td>Website</td>";
	ihtml += "<td>Time spent</td>";
	ihtml += "</tr>";

	for (var i = 0; i < domains.length; i++) {
		ihtml += "<tr>";
		ihtml += "<td>" + domains[i] + "</td>";
		ihtml += "<td>" + (times[i] / 1000.0).toFixed(2) + " secs"  + "</td>";
		ihtml += "</tr>";
	}

	ihtml += "</table>";

	document.getElementById('demo').innerHTML = ihtml;
}, 0);