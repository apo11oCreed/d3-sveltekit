<script lang="ts">
  import Select from '$lib/components/Select.svelte';
  import { SUBWAYCOLORS } from '$lib/js/constants';
  import * as d3 from 'd3';
  export let graphData;

  let graphContainer;

  function optionsBuilder(data: { index: string, id: string } []) {
    let options = [];
    for (const item in data) {
      options.push({
        index: item,
        id: graphData.rails[item].name
      });
    }
    return options;
  }

  let selectedChildValueRails = '',
  selectedChildValueRoutes = '',
  optionRail,
  optionRoute;

  $: optionRail = selectedChildValueRails;
  $: optionRoute = selectedChildValueRoutes;
  // If the rail selection has been changed, reset the route select
  $: if (optionRail) {
    selectedChildValueRoutes = '';
  }
  // If the route selection has been changed, run the route data request
  $: if (optionRail) {

    const data = graphData.rails[optionRail].routes,
    container = d3.select('#graphContainer'),
    containerWidth = container.node().getBoundingClientRect().width;

    d3
      .select("#graphContainer")
      .select("svg")
      .remove();

    const svg = d3
      .select("#graphContainer")
      .append("svg")
      .attr('width', '100%');

    const g = svg
      .selectAll("g")
      .data(data)
      .enter()
      .append("g");

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
        return `${(d.trips/containerWidth) * 10}%`;
      });
      
    svg
      .attr('height', function() {
        const rects = d3.selectAll('svg g');
        return rects._groups[0].length * 40;
      });

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
      console.log(SUBWAYCOLORS[route]);
      if(Object.keys(SUBWAYCOLORS[route])[0] == id){
        return Object.values(SUBWAYCOLORS[route])[0];
      }
    }
  }
</script>
<form>
  <legend><h2>Chart settings</h2></legend>
  <Select name="rail" id="rail" bind:selected={selectedChildValueRails} data={optionsBuilder(graphData.rails)} />
  {#if optionRail}
  <Select name="route" id="route" bind:selected={selectedChildValueRoutes} data={graphData.rails[optionRail].routes} />
  {/if}
</form>
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
