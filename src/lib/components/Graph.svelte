<script lang="ts">
    import Select from '$lib/components/Select.svelte';
    import * as d3 from 'd3';
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
    $: if (optionRail){
        //const id=graphData.rails[optionRail].routes[optionRoute].id;
        //let response = fetch(`https://api-v3.mbta.com/trips?filter[route]=${id}&api_key=1b8be318d66b41ba87c7e47dd32db7a4`);
        
        //console.log(graphData.rails[optionRail].routes[optionRoute]);
        const data = graphData.rails[optionRail].routes;
        const width = 30;
        const height = 30;
        const bg = 'red';
        //const test = d3.select('.test');
        const svg = d3.create("svg")
        .attr("width", width)
        .attr("height", height)
        .attr("fill",bg);
        
        const container=d3.select('.graph');
        
        const containerWidth = container.node().getBoundingClientRect().width;
        
        container.html("")
        .selectAll('li')
        .data(data)
        .enter()
        .append('li')
        .append('span')
        .attr('class','bars')
        .html(d => `<span>${d.id} = ${d.trips} trips</span>`)
        .style('display','block')
        .style('background-color','lightblue')
        .style('margin','5px')
        .style('padding','10px')
        .style('width',0)
        .transition()
        .duration(500)
        .ease(d3.easeLinear)
        .style('width', d => {
            return `${(d.trips/containerWidth) * 10}%`;
        });
        
    }
    
</script>
<form>
    <Select name="rail" id="rail" bind:selected={selectedChildValueRails} data={optionsBuilder(graphData.rails)} />
    {#if optionRail}
    <Select name="route" id="route" bind:selected={selectedChildValueRoutes} data={graphData.rails[optionRail].routes} />
    {/if}
</form>
<ul class="graph"></ul>
<style lang="stylus">
@import '../css/vars-functions.styl'
    
form
    border-radius 10 * $px
    border none
    box-shadow 0 0 3px 0 rgba(0,0,0,0.25)
    padding 1rem
    background-color var(--bg-color)
</style>