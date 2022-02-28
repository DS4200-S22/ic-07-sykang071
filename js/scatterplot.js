/*

In-class activity 08 starter code
Prof. Mosca 
Modified: 12/08/21 

*/

const svg3 = d3
  .select("#csv-scatter")
  .append("svg")
  .attr("width", width-margin.left-margin.right)
  .attr("height", height - margin.top - margin.bottom)
  .attr("viewBox", [0, 0, width, height]);


d3.csv("data/scatter.csv").then((data) => {

//highest score for read in csv
let maxY3 = d3.max(data, function(d) { return d.score; });

let yScale3 = d3.scaleLinear() //sets the scale to be linear
            .domain([0,maxY3]) //represnts the inputs for the function, so 0 to max score value
            .range([height-margin.bottom,margin.top]); //outputs the data within margin range to fit SVG

// TODO: What does each line of this code do? 
let xScale3 = d3.scaleTime() //constructs new band scale
            .domain(d3.range(data.length)) //specifies input (array of values)
            .range([margin.left, width - margin.right]) 

/* 

  Tooltip Set-up  

*/

//for tooltip2

// TODO: What does each line of this code do? 
const tooltip3 = d3.select("#csv-scatter") //selects the id hard coded bar
                .append("div") // appends new element "div"
                .attr('id', "tooltip3") // sets id of new div to be tooltip2
                .style("opacity", 0) // sets opacity to 0
                .attr("class", "tooltip"); //sets class of new div to tooltip

// TODO: What does each line of this code do?  
const mouseover3 = function(event, d) {
  tooltip3.html("Name: " + d.name + "<br> Score: " + d.score + "<br>") // sets the inner html of tooltip name and score when mouse is hovered over specific bar
          .style("opacity", 1); //sets the opacity to 1
}

// TODO: What does each line of this code do? 
const mousemove3 = function(event, d) {
  tooltip3.style("left", (event.pageX)+"px") // sets the tooltip to be based off of the x and y pixel position of mouse 
          .style("top", (event.pageY + yTooltipOffset) +"px"); 
}

// TODO: What does this code do? 
const mouseleave3 = function(event, d) { 
  tooltip2.style("opacity", 0); //sets tooltip2 opacity to 0 once mouse leaves
}


// TODO: What does each line of this code do?  
svg3.append("g") //sets the placeholder svg "g"
   .attr("transform", `translate(${margin.left}, 0)`) //moves axis to left of svg
   .call(d3.axisLeft(yScale3)) // gives y axis scale
   .attr("font-size", '20px');  //set font size


// TODO: What does each line of this code do?  
svg3.append("g") //sets the placeholder svg "g"
  .attr("transform", `translate(0,${height - margin.bottom})`) //moves axis to bottom of svg
  .call(d3.axisBottom(xScale3) // gives y axis scale
            .tickFormat(i => data[i].name))
  .attr("font-size", '20px');  //set font size
/* 

  Bars 

*/

// TODO: What does each line of this code do? 
svg3.selectAll(".scatter") //selects everything with class bar
   .data(data) //sets the data to be data1
   .enter()  //create missing elements and returns enter selection
   .append("circle") //adds an element rectangle
     .attr("class", "scatter") //sets the class to be bar
     .attr("x", (d,i) => xScale3(i)) //sets the x position of the bar
     .attr("y", (d) => yScale3(d.score)) // sets the y position of the bar
     .attr("height", (d) => (height - margin.bottom) - yScale3(d.score)) //sets the height of the bar
     .attr("width", xScale3.bandwidth()) //sets the width of the bar
     .on("mouseover", mouseover3) //eventlistener for mouseover1
     .on("mousemove", mousemove3)// eventlistener for mousemove1
     .on("mouseleave", mouseleave3); // eventlistener for mouseleave1

})
