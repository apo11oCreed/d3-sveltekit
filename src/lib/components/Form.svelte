<script lang="ts">
  import Select from '$lib/components/Select.svelte';
  import Graph from '$lib/components/Graph.svelte';
  // import { SUBWAYCOLORS } from '$lib/js/constants';
  // import * as d3 from 'd3';
  export let graphData;
  
  // BUILD DATA TO RAIL OPTIONS
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
  
  // signals
  $: optionRail = selectedRail;
  $: optionRoute = selectedRoute;
  
  // If the rail selection has been changed, reset the route select
  $: if (optionRail) {
    selectedRoute = '';
  }
                                              
</script>
<form>
  <legend><h2>Chart settings</h2></legend>
  <Select name="rail" id="rail" bind:selected={selectedRail} data={forRailOptions(graphData.rails)} />
  {#if optionRail}
  <Select name="route" id="route" bind:selected={selectedRoute} data={graphData.rails[optionRail].routes} />
  {/if}
</form>
<Graph --bg-color="#f5f5f5" dataInput={graphData} optionRailInput={optionRail} />
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
</style>