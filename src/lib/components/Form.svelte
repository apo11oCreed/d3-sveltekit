<script lang="ts">
  import Select from '$lib/components/Select.svelte';
  import Graph from '$lib/components/Graph.svelte';
  import { setContext } from 'svelte';
  let {graphData} = $props();
  
  //https://svelte.dev/docs/svelte/$derived
  //https://svelte.dev/docs/svelte/$effect
  
  // BUILD DATA TO RAIL OPTIONS
  function forRailOptions(data: { index: string, id: string } []) {
    console.log(data);
    let options = [];
    for (const item in data) {
      options.push({
        id: graphData.rails[item].id,
        index: item
      });
    }
    return options;
  }
  
  let selectedRail = $state('');
  let selectedRoute = $state('');
  
  let optionRail = $state(selectedRail);
  let optionRoute = $state(selectedRoute);
  
  $effect(()=>{
    
    if(optionRail){
      setContext('optionRail',optionRail);
      selectedRoute = '';
    }
  });
  
  let context = $state(optionRail);
  setContext('optionRail', optionRail);
                                              
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