var domains = JSON.parse(localStorage.domains);
var times = JSON.parse(localStorage.times);

var ihtml = "<table>";

for (var i = 0; i < domains.length; i++) {
	ihtml += "<tr>";
	ihtml += "<td>" + domains[i] + "</td>";
	ihtml += "<td>" + times[i] + "</td>";
	ihtml += "</tr>";
}

ihtml += "</table>";

document.getElementById('demo').innerHTML = ihtml;