<script>
    /** @type {import('./$types').PageData} */
    import Form from '$lib/components/Form.svelte';
    import Graph from '$lib/components/Graph.svelte';
    import { setContext } from 'svelte';
    export let data;
    setContext('data', data);
</script>
<header>
    <h1>MBTA Trips Visualization</h1>
</header>
<main>
    <section class="intro">
        <p>This tool renders a bar chart that shows a comparison of routes by number of trips.</p>
    </section>
    <section class="form">
        <Form --bg-color="#f5f5f5" />
        <Graph />
    </section>
</main>

<style lang="stylus">
</style>
