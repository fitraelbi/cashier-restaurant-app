var ctx = document.getElementById('myChart').getContext('2d');
ctx.canvas.parentNode.style.width = "1500px";
ctx.canvas.parentNode.style.height = "400px";
var chart = new Chart(ctx, {
    // The type of chart we want to create
    type: 'line',

    // The data for our dataset
    data: {
        labels: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
        datasets: [{
            label: 'Last Week',
            borderColor: 'rgb(255, 99, 132)',
            data: [10, 60, 30, 10, 50, 30, 45]
        },
        {
            label: 'This Week',
            borderColor: '#00F1FF',
            data: [0, 30, 40, 20, 25, 50, 60]
        },]
    },

    // Configuration options go here
    options: {
        responsive: true
        
    }
});