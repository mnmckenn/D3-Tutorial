'use strict';

var margin = {top: 20, right: 20, bottom: 30, left: 50};
var outerWidth = 1300;
var outerHeight = 700;
var innerWidth = outerWidth - margin.left - margin.right;
var innerHeight = outerHeight - margin.top - margin.bottom;

var parseDate = d3.time.format("%d-%b-%y").parse;

var x = d3.time.scale()
    .range([0, innerWidth]);

var y = d3.scale.linear()
    .range([innerHeight, 0]);

var xAxis = d3.svg.axis()
    .scale(x)
    .orient("bottom");

var yAxis = d3.svg.axis()
    .scale(y)
    .orient("left");

var line = d3.svg.line()
    .x(function(d) { return x(d.date); })
    .y(function(d) { return y(d.close); });

var svg = d3.select(".main").append("svg")
    .attr("width", outerWidth)
    .attr("height", outerHeight)
  .append("g")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

var render = function(data) {
    x.domain(d3.extent(data, function(d) { return d.date; }));
    y.domain(d3.extent(data, function(d) { return d.close; }));

    svg.append("g")
      .attr("class", "x axis")
      .attr("transform", "translate(0," + innerHeight + ")")
      .call(xAxis);

    svg.append("g")
      .attr("class", "y axis")
      .call(yAxis)
    .append("text")
      .attr("transform", "rotate(-90)")
      .attr("y", 6)
      .attr("dy", ".71em")
      .style("text-anchor", "end")
      .text("Price ($)");

    svg.append("path")
      .datum(data)
      .attr("class", "line")
      .attr("d", line);
}

var type = function(d) {
    d.date = parseDate(d.date);
    d.close = +d.close;
    return d;
}

d3.tsv("data/data.tsv", type, render);