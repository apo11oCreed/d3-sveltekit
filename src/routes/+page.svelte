
<script>
    /** @type {import('./$types').PageData} */
    import Graph from '$lib/components/Graph.svelte'
	export let data;
	
</script>
<h1>Graph</h1>
<div class="controls">
    <Graph --bg-color="#f5f5f5" mbta={data} />
</div>
<style lang="stylus">
</style>