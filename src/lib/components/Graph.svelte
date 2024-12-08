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
    let optionRoute;
    $: optionRail = selectedChildValueRails;
    $: optionRoute = selectedChildValueRoutes;
    // If the rail selection has been changed, reset the route select
    $: if (optionRail){
        selectedChildValueRoutes = '';
    }
    // If the route selection has been changed, run the route data request
    $: if (optionRoute){
        const id=graphData.rails[optionRail].routes[optionRoute].id;
        //console.log(`https://api-v3.mbta.com/trips?filter[route]=${id}&api_key=1b8be318d66b41ba87c7e47dd32db7a4`);
        let response = fetch(`https://api-v3.mbta.com/trips?filter[route]=${id}&api_key=1b8be318d66b41ba87c7e47dd32db7a4`);
        
        console.log(`https://api-v3.mbta.com/trips?filter[route]=${id}&api_key=1b8be318d66b41ba87c7e47dd32db7a4`);
    }
    
</script>
<form>
    <Select name="rail" id="rail" bind:selected={selectedChildValueRails} data={optionsBuilder(graphData.rails)} />
    {#if optionRail}
    <Select name="route" id="route" bind:selected={selectedChildValueRoutes} data={graphData.rails[optionRail].routes} />
    {/if}
    <p>
        {optionRoute}
    </p>
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