<script lang="ts">
  import Select from '$lib/components/Select.svelte';
  import { SUBWAYCOLORS } from '$lib/js/constants';
  import * as d3 from 'd3';
  export let graphData;

  let graphContainer, // INIT VAR TO HOLD THE GRAPH CONTAINER
  graphContainerWidth, // INIT VAR TO HOLD WIDTH OF THE GRAPH CONTAINER
  barWidth,
  graphContainerStyles; // INIT VAR TO HOLD WIDTH OF PARENT SVG. BARS' WIDTH SHOULD CHANGE BASED ON THIS EVERY TIME THE WINDOW RESIZES.

  // BUILD DATA TO RENDER OPTIONS
  function forRailOptions(data: { index: string, id: string } []) {
    let options = [];
    for (const item in data) {
      options.push({
        id: graphData.rails[item].id,
        index: item
      });
    }
    return options;
  }

  let selectedRail,
  selectedRoute;
  
  $: graphContainerWidth;
  
  $: optionRail = selectedRail;
  $: optionRoute = selectedRoute;
  
  
  // If the rail selection has been changed, reset the route select
  $: if (optionRail) {
    selectedRoute = '';
  }
  // If the route selection has been changed, run the route data request
  $: if (optionRail) {

    // get routes data of selected rail
    const data = graphData.rails[optionRail].routes;
    // this does not work
    // const tripData = data.forEach(d => {
    //   return d.trips = +d.trips;
    // });
    
    // get the target container
    graphContainer = d3.select('#graphContainer');
    graphContainerWidth = graphContainer.node().offsetWidth;
    graphContainerStyles = window.getComputedStyle(graphContainer.node());
    
    console.log(graphContainerStyles.getPropertyValue('padding-left'));
    
    const margin = {top: 70, right: 40, bottom: 60, left: 175},
    
    width = (graphContainerWidth - (parseInt(graphContainerStyles.getPropertyValue('padding-left')) * 2)) - margin.left - margin.right,
    height = 400 - margin.top - margin.bottom;
    
    graphContainer.attr('style','border: 2px solid red');
    
    // remove existing svg
    d3
      .select('#graphContainer')
      .select('svg')
      .remove();
    
    // add new svg
    const svg = d3
      .select('#graphContainer')
      .append('svg')
      .attr('width', width + margin.left + margin.right)
      .attr('height', height + margin.top + margin.bottom)
      .append('g')
      .attr('transform', 'translate(' + margin.left + ',' + margin.top + ')');
      
    const g = svg
      .selectAll("g")
      .data(data)
      .enter()
      .append("g");
      
    const tripsArray=data.map(item=>{
      return item.trips;
    });
      
    const x = d3.scaleLinear()
      .domain([0, d3.max(tripsArray)])
      .range([0, width])
      .nice();
      
    console.log(d3.max(tripsArray));
      
    const y = d3.scaleBand()
      .range([height, 0])
      .padding(0.1)
      .domain(data.map(function (d) { return d.id; }));
      
    const xAxis = d3.axisBottom(x);
    const yAxis = d3.axisLeft(y);
    
    svg
      .append("g")
      .attr('class','x axis')
      .attr('transform','translate(0, ' + height + ')')
      // .attr("x1", "100%")
      .call(xAxis);
    
    
      
    d3
      .ticks(1, 9, 5);
      
    // const xScale = d3.scaleLinear()
    //   .domain([0, 100])
    //   .range([0, 200]);
      
    // const xAxis = d3.axisBottom(xScale)
    //   .ticks(10);

    g.append("rect")
      .attr("width", 0)
      .attr("height", 20)
      .attr("x", 0)
      .attr("y", function(d, i) {
        d.rectheight = i * 40;
        return i * 40;

      })
      .attr("fill", d => {
        let color;
        switch(optionRail){
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
      })
      .transition()
      .duration(500)
      .ease(d3.easeLinear)
      .style('width', d => {
        return `${(d.trips/width) * 10}%`;
      });
      
    // svg
    //   .attr('height', function() {
    //     const rects = d3.selectAll('svg g');
    //     return rects._groups[0].length * 40;
    //   })
    //   .attr('width',graphContainerWidth)
    //   .append("g")
    //   .attr('class','x axis')
    //   .attr('transform','translate(0,' + height + ')')
    //   .attr("x1", "100%")
    //   .call(xAxis);

    g.append('text')
      .text(function(d) {
        return `${d.id} = ${d.trips} trips`;
      })
      .attr('x', '0')
      .attr('y', function(d) {
        return d.rectheight + 15;
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
  
  function logThis(){
    graphContainerWidth = graphContainer.node().offsetWidth;
  }
</script>
<form>
  <legend><h2>Chart settings</h2></legend>
  <Select name="rail" id="rail" bind:selected={selectedRail} data={forRailOptions(graphData.rails)} />
  {#if optionRail}
  <Select name="route" id="route" bind:selected={selectedRoute} data={graphData.rails[optionRail].routes} />
  {/if}
</form>
<svelte:window on:resize={logThis} />
<figure id="graphContainer"></figure>
<style lang="stylus">
@import '../css/vars-functions.styl'
    
form
    padding 1rem
    background-color var(--bg-color)
    box-shadow 0 0 2px 0 inset rgba(0,0,0,0.25)
  h2
    line-height 1
    margin-top 0
    margin-bottom 1rem
figure
  margin 0
  padding 1rem
  
</style>
