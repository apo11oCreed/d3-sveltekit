<script lang="ts">
  import { onMount } from 'svelte';
  import Select from '$lib/components/Select.svelte';
  import { SUBWAYCOLORS } from '$lib/js/constants';
  import { getContext } from 'svelte';
  import * as d3 from 'd3';
  import { railState } from '$lib/js/state.svelte.js';
  
  type RouteData = { id: string; trips: number };
  
  interface RailData {
    rails: {
      [key: string]: {
        routes: Array<{ id: string; trips: number }>;
      };
    };
  }

  
  let graphContainer, // INIT VAR TO HOLD THE GRAPH CONTAINER
  graphContainerWidth = $state<number>(0), // INIT VAR TO HOLD WIDTH OF THE GRAPH CONTAINER
  graphContainerStyles,
  dataInput;
  
  // load data when component is mounted
  onMount(() => {
        dataInput = getContext<RailData>('data');
	});
  
  
  // If the route selection has been changed, run the route data request
  $effect(()=>{
    
    if (railState.option!='') {
      
      // remove existing svg
      d3
        .select('#graphContainer')
        .select('svg')
        .remove();
  
      // get routes data of selected rail
      const data = dataInput.rails[railState.option].routes;
      
      // get the target container
      graphContainer = d3.select('#graphContainer').node() as HTMLElement;
      graphContainerWidth = graphContainer.offsetWidth;
      graphContainerStyles = window.getComputedStyle(graphContainer);
      
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
      
      data.sort(function (a: { id: string, trips: number }, b: { id: string, trips: number }) {
        return d3.descending(a.trips, b.trips);
      });
      
      // setup x axis scale
      const x = d3.scaleLinear()
        .range([0, width])
        .domain([0, d3.max(data,function(d: {id:string, trips:number}){
          return d.trips;
        }) || 0])
        .nice();
        
      // setup y axis scale
      const y = d3.scaleBand()
        .range([chartHeight, 0])
        .padding(0.1)
        .paddingInner(0.5)
        .domain(data.map(function (d:{id:string, trips:number}) {
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
      .data(data as RouteData[])
      .enter()
      .append('rect')
      .attr('class','bar')
      .attr('y', (d: RouteData) =>{
        const yValue = y(d.id);
        // This ensures that the y attribute is always set to a valid number, preventing potential issues if the y scale function returns undefined
        return yValue !== undefined ? yValue : 0;
      })
      .attr('height', y.bandwidth())
      .attr('x', 0)
      .attr('width', (d: RouteData) =>{
        return x(d.trips);
      })
      .attr("fill", (d: RouteData) => {
        let color;
        switch(railState.option){
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
      
      svg.select('.y.axis')
        .selectAll('text')
        .attr('style','font-size: 0.8rem;font-weight:700;');
      
    }
    
  });
  
  function getSubwayColor(id: string){
    for(const route in SUBWAYCOLORS){
      if(Object.keys(SUBWAYCOLORS[route])[0] == id){
        return Object.values(SUBWAYCOLORS[route])[0];
      }
    }
  }
  
  
  //https://www.youtube.com/watch?v=sTOHoueLVJE
  // function to update the bar widths triggered everytime the window is resized
  function updateBarWidths(){
    const graphContainer = document.getElementById('graphContainer');
    graphContainerWidth = graphContainer?.offsetWidth ?? 0;
  }
</script>

<svelte:window on:resize={updateBarWidths} />
<figure id="graphContainer"></figure>

<style lang="stylus">
figure
  margin 0
  padding 1rem
</style>
