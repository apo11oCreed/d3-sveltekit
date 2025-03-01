<script>
    /** @type {import('./$types').PageData} */
    import Graph from '$lib/components/Graph.svelte';
    import Form from '$lib/components/Form.svelte';
    export let data;
</script>
<header>
    <h1>MBTA Trips Visualization</h1>
</header>
<main>
    <section class="intro">
        <p>This tool renders a bar chart that shows a comparison of routes by number of trips.</p>
    </section>
    
    <section class="move">
        <h2>MOVE</h2>
        <Form --bg-color="#f5f5f5" graphData={data} />
    </section>
</main>

<style lang="stylus">
</style>
