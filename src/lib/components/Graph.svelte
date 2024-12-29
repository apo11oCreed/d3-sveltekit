<script lang="ts">
  import Select from '$lib/components/Select.svelte';
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

  let selectedChildValueRails = '';
  let selectedChildValueRoutes = '';

  let optionRail;
  let optionRoute;

  $: optionRail = selectedChildValueRails;
  $: optionRoute = selectedChildValueRoutes;
  // If the rail selection has been changed, reset the route select
  $: if (optionRail) {
    selectedChildValueRoutes = '';
  }
  // If the route selection has been changed, run the route data request
  $: if (optionRail) {

    const data = graphData.rails[optionRail].routes;

    const container = d3.select('#graphContainer');

    const containerWidth = container.node().getBoundingClientRect().width;

    d3
      .select("#graphContainer")
      .select("svg")
      .remove();

    const svg2 = d3
      .select("#graphContainer")
      .append("svg")
      .attr('width', '100%');

    const g = svg2
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
      .attr("fill", "red")
      .transition()
      .duration(500)
      .ease(d3.easeLinear)
      .style('width', d => {
        return `${(d.trips/containerWidth) * 10}%`;
      });

    svg2
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
        console.log(d.rectheight + 15);
        return d.rectheight + 15;
      });
  }
</script>
<form>
  <Select name="rail" id="rail" bind:selected={selectedChildValueRails} data={optionsBuilder(graphData.rails)} />
  {#if optionRail}
    <Select name="route" id="route" bind:selected={selectedChildValueRoutes} data={graphData.rails[optionRail].routes} />
    {/if}
</form>
<div id="graphContainer"><ul class="graph"></ul></div>
<style lang="stylus">
@import '../css/vars-functions.styl'
    
form
    border-radius 10 * $px
    border none
    box-shadow 0 0 3px 0 rgba(0,0,0,0.25)
    padding 1rem
    background-color var(--bg-color)
g > text 
    dominant-baseline text-before-edge
    text-anchor middle
</style>
