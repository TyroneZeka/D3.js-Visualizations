// import { select } from '../d3';

const svg = d3.select('svg');
// svg.style('background-color','red'); 


const height = +svg.attr('height');
const width = +svg.attr('width');
const g = svg
    .append('g')
        .attr('transform',`translate(${width/2}, ${height/2})`);


const circle = g
    .append('circle')
        .attr('r',height/2)
        // .attr('cx',width/2)
        // .attr('cy',height/2)
        .attr('fill','yellow')
        .attr('stroke','black');


const eyeSpacing = 100;
const eyeOffset = -70;
const eyeRadius = 25;
const eyebrowWidth = 50;
const eyebrowHeight = 20;
const eyebrowOffset = -70;

const eyeG = g.append('g')
    .attr('transform',`translate(0,${eyeOffset})`);


const leftEye = eyeG
    .append('circle')
        .attr('r',eyeRadius)
        .attr('cx', - eyeSpacing);

const RightEye = eyeG
    .append('circle')
        .attr('r',eyeRadius)
        .attr('cx', + eyeSpacing);
   


const eyebrowG = eyeG
    .append('g')
        .attr('transform',`translate(0,${eyebrowOffset})`);
 
eyebrowG
    .transition().duration(2000)
        .attr('transform',`translate(0,${eyebrowOffset - 50})`)
    .transition().duration(2000)
        .attr('transform',`translate(0,${eyebrowOffset})`);


const leftEyebrow = eyebrowG
    .append('rect')
        .attr('width', eyebrowWidth)
        .attr('height',eyebrowHeight)
        .attr('x',-eyeSpacing - eyebrowWidth/2);

const rightEyebrow = eyeG
    .append('rect')
        .attr('width', eyebrowWidth)
        .attr('height',eyebrowHeight)
        .attr('x',eyeSpacing - eyebrowWidth/2);


const mouth = g
    .append('path')
        .attr('d',d3.arc()({
            innerRadius:150,
            outerRadius:170,
            startAngle:Math.PI/1.6,
            endAngle:Math.PI*3/2.2
        }));