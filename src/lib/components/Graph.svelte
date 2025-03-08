<script lang="ts">
  import Select from '$lib/components/Select.svelte';
  import { SUBWAYCOLORS } from '$lib/js/constants';
  import * as d3 from 'd3';
  export let dataInput;
  export let optionRailInput;
  
  let graphContainer, // INIT VAR TO HOLD THE GRAPH CONTAINER
  graphContainerWidth, // INIT VAR TO HOLD WIDTH OF THE GRAPH CONTAINER
  graphContainerStyles; 
  
  
  // If the route selection has been changed, run the route data request
  $: if (optionRailInput) {
    
    // remove existing svg
    d3
      .select('#graphContainer')
      .select('svg')
      .remove();

    // get routes data of selected rail
    const data = dataInput.rails[optionRailInput].routes;
    
    // get the target container
    graphContainer = d3.select('#graphContainer');
    graphContainerWidth = graphContainer.node().offsetWidth;
    graphContainerStyles = window.getComputedStyle(graphContainer.node());
    
    const margin = {top: 16, right: 75, bottom: 32, left: 125};
    const width = (graphContainerWidth - (parseInt(graphContainerStyles.getPropertyValue('padding-left')) * 2)) - margin.left - margin.right;
    const barHeight = 30;
    const barSpacing = 5;
    const chartHeight = (data.length * (barHeight + barSpacing)) - margin.top - margin.bottom;
    
    // add new svg
    const svg = d3
      .select('#graphContainer')
      .append('svg')
      .attr('width', width + margin.left + margin.right)
      .attr('height', chartHeight + margin.top + margin.bottom)
      .append('g')
      .attr('fill','#b3b3b3')
      .attr('transform', 'translate(' + margin.left + ',' + margin.top + ')');
    
    data.sort(function (a,b) {
      return d3.descending(a.id, b.trips);
    });
    
    // setup x axis scale
    const x = d3.scaleLinear()
      .range([0, width])
      .domain([0, d3.max(data,function(d){
        return d.trips;
      })])
      .nice();
      
    // setup y axis scale
    const y = d3.scaleBand()
      .range([chartHeight, 0])
      .padding(0.1)
      .paddingInner(0.5)
      .domain(data.map(function (d) {
        return d.id;
      }));
    
    // setup orientation of ticks on the y and x axis
    const xAxis = d3.axisBottom(x);
    const yAxis = d3.axisLeft(y);

    // create the groups, setup the position and assign props
    svg
      .append("g")
      .attr('class','x axis')
      .attr('transform','translate(0, ' + chartHeight + ')')
      .call(xAxis);
      
    svg
      .append("g")
      .attr('class','y axis')
      .call(yAxis);
    
    // create the bars and assign bar props
    svg.selectAll('.bar')
    .data(data)
    .enter()
    .append('rect')
    .attr('class','bar')
    .attr('y', function(d) {
      return y(d.id);
    })
    .attr('height', y.bandwidth())
    .attr('x', 0)
    .attr('width', function(d) {
      return x(d.trips);
    })
    .attr("fill", d => {
      let color;
      switch(optionRailInput){
        case '0':
          color = getSubwayColor(d.id);
        break;
        case '1':
          color = getSubwayColor(d.id);
        break;
        case '2':
          color = '#80276c';
        break;
        case '3':
          color = '#ffc72c';
        break;
        case '4':
          color = '#008eaa';
        break;
        default:
          color = '#494f5c';
        break;
      }
      return color;
    });
    
  }
  
  function getSubwayColor(id){
    for(const route in SUBWAYCOLORS){
      if(Object.keys(SUBWAYCOLORS[route])[0] == id){
        return Object.values(SUBWAYCOLORS[route])[0];
      }
    }
  }
  
  
  //https://www.youtube.com/watch?v=sTOHoueLVJE
  // function to update the bar widths triggered everytime the window is resized
  function updateBarWidths(){
    graphContainerWidth = graphContainer.node().offsetWidth;
  }
</script>

<svelte:window on:resize={updateBarWidths} />
<figure id="graphContainer"></figure>

<style lang="stylus">
figure
  margin 0
  padding 1rem
</style>
