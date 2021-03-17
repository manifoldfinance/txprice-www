google.charts.load('current', {
	packages: ['corechart', 'line']
});
google.charts.setOnLoadCallback(drawLineColors);

function drawLineColors() {
	const data = new google.visualization.DataTable();

	data.addColumn('datetime', 'Date');
	data.addColumn('number', 'Fastest');
	data.addColumn('number', 'Fast');
	data.addColumn('number', 'Average');
	data.addColumn('number', 'Safe Low');

	const options = {
		hAxis: {
			title: 'Date'
		},
		vAxis: {
			title: 'Gas price (Gwei)'
		},
	};

	$.getJSON('https://gas-api.0xff.sh/gas-price?res=hour', (res) => {
		const rows = res['data'].map(x => [new Date(x['date']), x['fastest'], x['fast'], x['average'], x['safeLow']]);
		data.addRows(rows);
		const chart = new google.visualization.LineChart(document.getElementById('chart_div'));
		chart.draw(data, options);
	});
}