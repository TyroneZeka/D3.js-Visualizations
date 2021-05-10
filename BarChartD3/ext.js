
svg = d3.select('svg');

const width = +svg.attr('width');
const height = +svg.attr('height');

const render = data=>{
    d3.selectAll('svg > *').remove();
    var years = [];
    years.push(data.columns);

    var selector = document.getElementById('selector');

    selector.addEventListener('change', handleSelectChange);

    //Loading options to the selector tag
    for (var i = 1; i < years.length - 1; i++) {
        option = document.createElement("option");
        option.text = years[0][i];
        if (i == 4) {
            option.defaultSelected = true;
        }
        selector.add(option);

    }

    function handleSelectChange(event) {

        var selectedElement = event.target;
        var value = selectedElement.value;

        for (var i = 1; i < years.length; i++) {
            if (data[i]["name"] == value) {
                selecttest.innerHTML = `${data[i]["name"]} score is ${data[i]["c_score"]}`;

            }
        }

    }

    
    console.log(years);
    const xValue = d=>d.country;
    const yValue = d=>d[2010];
    const margin = {top: 50, right: 30, bottom: 80, left:200};
    innerWidth = width -margin.left - margin.right;
    innerHeight = height - margin.top - margin.bottom;

    const xScale = d3.scaleBand()
        .domain(data.map(xValue))
        .range([0,innerWidth])
        .padding(0.1);

    const yScale = d3.scaleLinear()
        .domain([d3.max(data,yValue),0])
        .range([0,innerHeight]);

// Appending a group element for your axis
    const g = svg.append('g')
        .attr('transform',`translate(${margin.left},${margin.top})`);

// Appending the y_axis and cleaning it up

// Formatting the xAxis 
    const yAxisTickFormat = number =>
    d3.format('.3s')(number)
    .replace('G','B');

    g.append('g')
        .call(d3.axisLeft(yScale)
        .tickFormat(yAxisTickFormat))
        .selectAll('.domain, .tick line')
            .remove();


// Appending the x_axis and cleaning it up
const xAxis = d3.axisBottom(xScale)
    .tickSize(-innerHeight);

    const xAxisG =g.append('g').call(xAxis)
                    .attr('transform',`translate(0,${innerHeight})`)
                    .selectAll("text")
                         .attr("transform", "translate(-10,0)rotate(-45)")
                         .style("text-anchor", "end");
                    

    xAxisG
        .select('.domain') 
            .remove();

// Adding axis label for the x-axis and remember to set fill to black.
    xAxisG.append('text')
        .attr('y',60)
        .attr('x',innerWidth/2)
        .attr('fill','black')
        .text('Population');

// Creating Bars
    g.selectAll('rect')
        .data(data)
        .enter()
            .append('rect')
            .attr('y',d=>yScale(yValue(d)))
            .attr('x',d=>xScale(xValue(d)))
            .attr('height',function(d){return innerHeight - yScale(yValue(d));})
            .attr('width',xScale.bandwidth())
            .attr("fill", "#69b3a2");

    g.append('text')
        .attr('y',-10)
        .text('2010 GDP_PER_CAPITA');
};


// Representing a data table in Javascript

d3.csv('gdppercapita_us_inflation_adjusted.csv',d3.autoType).then(data=>{
    data.forEach(d =>{})
    // console.log(data);
    render(data);
});