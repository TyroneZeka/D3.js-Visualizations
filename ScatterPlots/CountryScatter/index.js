// import { selectAll } from d3;

svg = d3.select('svg');

const width = +svg.attr('width');
const height = +svg.attr('height');

const render = data=>{
    const xValue = d=>d.population;
    const yValue = d=>d.country;
    const margin = {top: 50, right: 30, bottom: 80, left:200};
    innerWidth = width -margin.left - margin.right;
    innerHeight = height - margin.top - margin.bottom;

    const xScale = d3.scaleLinear()
        .domain([0,d3.max(data,xValue)])
        .range([0,innerWidth])
        .nice();
    
    
    const yScale = d3.scalePoint()
        .domain(data.map(yValue))
        .range([0,innerHeight])
        .padding(0.3);

// Appending a group element for your axis
    const g = svg.append('g')
        .attr('transform',`translate(${margin.left},${margin.top})`);

// Appending the y_axis and cleaning it up
    const yAxis = d3.axisLeft(yScale)
        .tickSize(-innerWidth);

    g.append('g')
        // .call(d3.axisLeft(yScale))
        .call(yAxis)
        .selectAll('.domain')
            .remove();

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
        .text('Population');

// Creating Bars
    g.selectAll('circle').data(data)
        .enter().append('circle')
            .attr('cy',d=>yScale(yValue(d)))
            .attr('cx',d=>xScale(xValue(d)))
            .attr('r',10);

    g.append('text')
        .attr('y',-10)
        .text('Top 10 Most Populous Countries');
};


// Representing a data table in Javascript

d3.csv('data.csv').then(data=>{
    data.forEach(d =>{d.population = +d.population * 1000;})
    render(data);
});