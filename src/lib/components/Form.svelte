<script lang="ts">
  import Select from '$lib/components/Select.svelte';
  import { getContext } from 'svelte';
  import { railState } from '$lib/js/state.svelte.js';

  interface Rail {
    id: string;
    routes: any[];
  }
  
  const graphData = getContext('data') as {
    rails: Record<string, Rail>;
  };

  let selectedRail = $state<string>('');
  // uncomment below if using the route selection
  // selectedRoute = $state<string>('');
  
  // $effect(()=>{
    
  //   if(selectedRail!==railState.option){
  //     selectedRoute = '';
  //   }
    
  // });
  
  // BUILD DATA TO RAIL OPTIONS
  function forRailOptions(data: Record<string, Rail>) {
    let options = [];
    for (const item in data) {
      options.push({
        id: data[item].id,
        index: item
      });
    }
    return options;
  }
                                              
</script>

<form>
  <legend><h2>Chart settings</h2></legend>
  <Select name="rail" id="rail" bind:selected={railState.option} data={forRailOptions(graphData.rails)} />
  <!-- Uncomment below if using the route selection -->
  <!--{#if railState.option}-->
  <!--  <Select name="route" id="route" bind:selected={selectedRoute} data={graphData.rails[railState.option].routes} />-->
  <!--{/if}-->
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