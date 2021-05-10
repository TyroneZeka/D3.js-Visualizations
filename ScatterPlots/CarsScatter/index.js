// import { selectAll } from d3;

svg = d3.select('svg');

let arrObj=[]

const width = +svg.attr('width');
const height = +svg.attr('height');

const render = data=>{
    const title = 'Cars: Acceleration VS HorsePower'
    const xValue = d=>d.acceleration;

    console.log(xValue);

    const xAxisLabel = 'Acceleration'
    const yValue = d=>d.horsepower;

    console.log(yValue);
    const yAxisLabel = 'Horsepower';
    const circleRadius = 10;
    const margin = {top: 50, right: 30, bottom: 80, left:200};
    const innerWidth = width -margin.left - margin.right;
    const innerHeight = height - margin.top - margin.bottom;

    const xScale = d3.scaleLinear()
        .domain(d3.extent(data,xValue))
        .range([0,innerWidth])
        .nice();
    
    
    const yScale = d3.scaleLinear()
        .domain(d3.extent(data,yValue))
        .range([0,innerHeight]);

// Appending a group element for your axis
    const g = svg.append('g')
        .attr('transform',`translate(${margin.left},${margin.top})`);

// Appending the y_axis and cleaning it up
    const yAxis = d3.axisLeft(yScale)
        .tickSize(-innerWidth);
    const yAxisG = g.append('g').call(yAxis);
        // .call(d3.axisLeft(yScale))
        
    yAxisG.selectAll('.domain')
            .remove();

// Appending yAxis Label
    yAxisG.append('text')
        .attr('y',-90)
        .attr('x',-innerHeight/2)
        .attr('transform','rotate(-90)')
        .attr('text-anchor','middle')
        .attr('fill','black')
        .text(yAxisLabel);
// Formatting the xAxis 
const xAxisTickFormat = number =>
d3.format('.3s')(number)
.replace('G','B');

// Appending the x_axis and cleaning it up
const xAxis = d3.axisBottom(xScale)
    .tickFormat(xAxisTickFormat)
    .tickSize(-innerHeight);

    const xAxisG =g.append('g').call(xAxis)
                    .attr('transform',`translate(0,${innerHeight})`);

    xAxisG.select('.domain').remove();

// Adding axis label for the x-axis and remember to set fill to black.
    xAxisG.append('text')
        .attr('y',60)
        .attr('x',innerWidth/2)
        .attr('fill','black')
        .text(xAxisLabel);

// Creating Bars
    g.selectAll('circle').data(data)
        .enter().append('circle')
            .attr('cy',d=>yScale(yValue(d)))
            .attr('cx',d=>xScale(xValue(d)))
            .attr('r',circleRadius);

    g.append('text')
        .attr('y',-10)
        .text(title);
};


// Representing a data table in Javascript

d3.csv('https://vizhub.com/curran/datasets/auto-mpg.csv').then(data=>{
    arrObj = data;
    data.forEach(d =>{
        d.mpg = +d.mpg;
        d.cylinders = +d.cylinders;
        d.displacement = +d.displacement;
        d.horsepower = +d.horsepower;
        d.weight = +d.weight;
        d.acceleration = +d.acceleration;
        d.year = +d.year;
    });
    render(data);
});