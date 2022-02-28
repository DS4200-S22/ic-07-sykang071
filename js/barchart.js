/*

In-class activity 08 starter code
Prof. Mosca 
Modified: 12/08/21 

*/

// Build your bar charts in this file 


// Set dimensions and margins for plots 
const width = 900; 
const height = 450; 
const margin = {left:50, right:50, bottom:50, top:50}; 
const yTooltipOffset = 15; 


// TODO: What does this code do?: steps are shown below
const svg1 = d3
  //selects the id "hard-coded-bar"
  .select("#hard-coded-bar")
  //adds the svg to that id
  .append("svg")
  //sets the width, height, and what the user views for the svg
  .attr("width", width-margin.left-margin.right)
  .attr("height", height - margin.top - margin.bottom)
  .attr("viewBox", [0, 0, width, height]);

  // TODO: What does this code do?: steps are shown below
const svg2 = d3
  //selects the id "hard-coded-bar"
  .select("#csv-bar")
  //adds the svg to that id
  .append("svg")
  //sets the width, height, and what the user views for the svg
  .attr("width", width-margin.left-margin.right)
  .attr("height", height - margin.top - margin.bottom)
  .attr("viewBox", [0, 0, width, height]);


// Hardcoded barchart data
const data1 = [
  {name: 'A', score: 92},
  {name: 'B', score: 15},
  {name: 'C', score: 67},
  {name: 'D', score: 89},
  {name: 'E', score: 53},
  {name: 'F', score: 91},
  {name: 'G', score: 18}
];

// TODO: What does this code do? 
// returns the highest score from data1
let maxY1 = d3.max(data1, function(d) { return d.score; });


// TODO: What does each line of this code do?   
let yScale1 = d3.scaleLinear() //sets the scale to be linear
            .domain([0,maxY1]) //represents the inputs for the function, so 0 to max score value
            .range([height-margin.bottom,margin.top]); //outputs the data within margin range to fit SVG

// TODO: What does each line of this code do? 
let xScale1 = d3.scaleBand() //constructs new band scale
            .domain(d3.range(data1.length)) //specifies input (array of values)
            .range([margin.left, width - margin.right]) //sets min/max extents of domain array to fit SVG
            .padding(0.1); //adds padding between bars

 

// TODO: What does each line of this code do?  
svg1.append("g") //sets the placeholder svg "g"
   .attr("transform", `translate(${margin.left}, 0)`) //moves axis to left of svg
   .call(d3.axisLeft(yScale1)) // gives y axis scale
   .attr("font-size", '20px');  //set font size
  

// TODO: What does each line of this code do? 
const tooltip1 = d3.select("#hard-coded-bar") //selects the id hard coded bar
                .append("div") // appends new element "div"
                .attr('id', "tooltip1") // sets id of new div to be tooltip1
                .style("opacity", 0) // sets opacity to 0
                .attr("class", "tooltip"); //sets class of new div to tooltip

// TODO: What does each line of this code do?  
const mouseover1 = function(event, d) {
  tooltip1.html("Name: " + d.name + "<br> Score: " + d.score + "<br>") // sets the inner html of tooltip name and score when mouse is hovered over specific bar
          .style("opacity", 1); //sets the opacity to 1
}

// TODO: What does each line of this code do? 
const mousemove1 = function(event, d) {
  tooltip1.style("left", (event.x)+"px") // sets the tooltip to be based off of the x and y pixel position of mouse 
          .style("top", (event.y + yTooltipOffset) +"px"); 
}

// TODO: What does this code do? 
const mouseleave1 = function(event, d) { 
  tooltip1.style("opacity", 0); //sets tooltip1 opacity to 0 once mouse leaves
}


// TODO: What does each line of this code do? 
svg1.selectAll(".bar") //selects everything with class bar
   .data(data1) //sets the data to be data1
   .enter()  //create missing elements and returns enter selection
   .append("rect") //adds an element rectangle
     .attr("class", "bar") //sets the class to be bar
     .attr("x", (d,i) => xScale1(i)) //sets the x position of the bar
     .attr("y", (d) => yScale1(d.score)) // sets the y position of the bar
     .attr("height", (d) => (height - margin.bottom) - yScale1(d.score)) //sets the height of the bar
     .attr("width", xScale1.bandwidth()) //sets the width of the bar
     .on("mouseover", mouseover1) //eventlistener for mouseover1
     .on("mousemove", mousemove1)// eventlistener for mousemove1
     .on("mouseleave", mouseleave1); // eventlistener for mouseleave1



  
// TODO: What does each line of this code do? 
const tooltip1 = d3.select("#hard-coded-bar") //selects the id hard coded bar
                .append("div") // appends new element "div"
                .attr('id', "tooltip1") // sets id of new div to be tooltip1
                .style("opacity", 0) // sets opacity to 0
                .attr("class", "tooltip"); //sets class of new div to tooltip

// TODO: What does each line of this code do?  
const mouseover1 = function(event, d) {
  tooltip1.html("Name: " + d.name + "<br> Score: " + d.score + "<br>") // sets the inner html of tooltip name and score when mouse is hovered over specific bar
          .style("opacity", 1); //sets the opacity to 1
}

// TODO: What does each line of this code do? 
const mousemove1 = function(event, d) {
  tooltip1.style("left", (event.x)+"px") // sets the tooltip to be based off of the x and y pixel position of mouse 
          .style("top", (event.y + yTooltipOffset) +"px"); 
}

// TODO: What does this code do? 
const mouseleave1 = function(event, d) { 
  tooltip1.style("opacity", 0); //sets tooltip1 opacity to 0 once mouse leaves
}


/*

  Axes

*/ 


// FOR SECOND BAR CHART 

const data2 = d3.csv("data/barchart.csv").then((data) => {

//highest score for read in csv
let maxY2 = d3.max(data1, function(d) { return d.score; });

let yScale2 = d3.scaleLinear() //sets the scale to be linear
            .domain([0,maxY2]) //represents the inputs for the function, so 0 to max score value
            .range([height-margin.bottom,margin.top]); //outputs the data within margin range to fit SVG

// TODO: What does each line of this code do? 
let xScale2 = d3.scaleBand() //constructs new band scale
            .domain(d3.range(data2.length)) //specifies input (array of values)
            .range([margin.left, width - margin.right]) //sets min/max extents of domain array to fit SVG
            .padding(0.1); //adds padding between bars
           
// TODO: What does each line of this code do? 
svg2.append("g")//sets the placeholder svg "g"
    .attr("transform", `translate(0,${height - margin.bottom})`) //moves axis to bottom of svg
    .call(d3.axisBottom(xScale1) // gives x Axis scale
            .tickFormat(i => data2[i].name)) // sets the tick marker names as "names" from data1 for each tick
    .attr("font-size", '20px'); //sets the font size

/* 

  Tooltip Set-up  

*/

//for tooltip2

// TODO: What does each line of this code do? 
const tooltip2 = d3.select("#csv-bar") //selects the id hard coded bar
                .append("div") // appends new element "div"
                .attr('id', "tooltip1") // sets id of new div to be tooltip1
                .style("opacity", 0) // sets opacity to 0
                .attr("class", "tooltip"); //sets class of new div to tooltip

// TODO: What does each line of this code do?  
const mouseover2 = function(event, d) {
  tooltip2.html("Name: " + d.name + "<br> Score: " + d.score + "<br>") // sets the inner html of tooltip name and score when mouse is hovered over specific bar
          .style("opacity", 1); //sets the opacity to 1
}

// TODO: What does each line of this code do? 
const mousemove2 = function(event, d) {
  tooltip2.style("left", (event.pagex)+"px") // sets the tooltip to be based off of the x and y pixel position of mouse 
          .style("top", (event.pagey + yTooltipOffset) +"px"); 
}

// TODO: What does this code do? 
const mouseleave2 = function(event, d) { 
  tooltip2.style("opacity", 0); //sets tooltip1 opacity to 0 once mouse leaves
}


/* 

  Bars 

*/

// TODO: What does each line of this code do? 
svg2.selectAll(".bar") //selects everything with class bar
   .data(data2) //sets the data to be data1
   .enter()  //create missing elements and returns enter selection
   .append("rect") //adds an element rectangle
     .attr("class", "bar") //sets the class to be bar
     .attr("x", (d,i) => xScale2(i)) //sets the x position of the bar
     .attr("y", (d) => yScale2(d.score)) // sets the y position of the bar
     .attr("height", (d) => (height - margin.bottom) - yScale2(d.score)) //sets the height of the bar
     .attr("width", xScale2.bandwidth()) //sets the width of the bar
     .on("mouseover", mouseover1) //eventlistener for mouseover1
     .on("mousemove", mousemove1)// eventlistener for mousemove1
     .on("mouseleave", mouseleave1); // eventlistener for mouseleave1

})
