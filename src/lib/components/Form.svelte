<script lang="ts">
  import Select from '$lib/components/Select.svelte';
  import { setContext, getContext } from 'svelte';
  const graphData = getContext('data');

  let selectedRail = $state<string>(''),
  selectedRoute = $state<string>(''),
  optionRail = $state<string>(''),
  optionRoute = $state<string>('');
  
  $effect(()=>{
    
    if(selectedRail!==optionRail){
      optionRail = selectedRail;
      selectedRoute = '';
    }
    
    optionRoute = selectedRoute;
    
  });
  
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
                                              
</script>

<form>
  <legend><h2>Chart settings</h2></legend>
  <Select name="rail" id="rail" bind:selected={selectedRail} data={forRailOptions(graphData.rails)} />
  {#if optionRail}
    <Select name="route" id="route" bind:selected={selectedRoute} data={graphData.rails[optionRail].routes} />
  {/if}
</form>

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