var canvas = document.getElementById('grafico');

var grafico = new Chart(canvas, {
	type: 'bar',
	data: {

labels: ['Eventos','Lojas','Parques','Encontros'],
		datasets: [{
			label: 'Qtde de locais',
			data: [5,18,3,3],
			backgroundColor: ['red','green','yellow','blue'],
			borderColor: ['darkred','darkgreen','orange','navy'],
			borderWidth: 3
		}]
	},
	options: {
		responsive: false,
		plugins: {
			title: {
				display: true,
				text: 'Número de locais',
				font: {
					size: 20
				}
			},
			legend: {
				labels:{
					font: {
						size: 16
					}
				}
			}
		},
		scales:{
			y: {
				title:{
					display: true,
					text: 'número',
					font: {
						size: 18
					}
				}
			},
			x: {
				title:{
					display: true,
					text: 'locais',
					font: {
						size: 18
					}
				}
			}
		}
	}
});
