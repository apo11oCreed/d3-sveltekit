<script lang="ts">
    import Select from '$lib/components/Select.svelte';
    export let graphData;
    
    function optionsBuilder(data){
        let options=[];
        for(let item in data){
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
    $: optionRail = selectedChildValueRails;
    // If the rail selection has been changed, reset the route select
    $: if (optionRail){
        selectedChildValueRoutes = '';
    }
    
</script>
<form>
    <Select name="rail" id="rail" bind:selected={selectedChildValueRails} data={optionsBuilder(graphData.rails)} />
    {#if optionRail}
    <Select name="route" id="route" bind:selected={selectedChildValueRoutes} data={graphData.rails[optionRail].routes} />
    {/if}
</form>
<style lang="stylus">
@import '../css/vars-functions.styl'
    
form
    border-radius 10 * $px
    border none
    box-shadow 0 0 3px 0 rgba(0,0,0,0.25)
    padding 1rem
    background-color var(--bg-color)
</style>