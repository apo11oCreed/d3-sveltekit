
<script>
    /** @type {import('./$types').PageData} */
    import Graph from '$lib/components/Graph.svelte'
	export let data;
	
</script>
<h1>Graph</h1>
<Graph --bg-color="#f5f5f5" mbta={data} />
<style lang="stylus">
</style>