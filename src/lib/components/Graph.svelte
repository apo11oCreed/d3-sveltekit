<script>
    export let mbta;
</script>
<form>
    <select name="railType" id="railType">
        {#each Object.entries(mbta.rails) as [railId,railObj]}
        <option value={railId}>{railObj.name}</option>
    	{/each}
    </select>
</form>
<style lang="stylus">
form
    border-radius 5px;
    border none
    box-shadow 0 0 3px 0 rgba(0,0,0,0.25)
    padding 1rem
    background-color var(--bg-color)
    select
        font-size 1.5rem
</style>