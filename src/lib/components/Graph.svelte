<script>
    import RoutesForm from '$lib/components/RoutesForm.svelte';
    export let mbta;
    
    let rail = '';
    
    /** @param {MouseEvent} event */
    function railSelected(){
        rail = event.target.value;
    }
    
</script>
<form>
    <select name="railType" id="railType" on:change={railSelected} >
        <option value="" disabled selected>-- Select Rail --</option>
        {#each Object.entries(mbta.rails) as [railId,railObj]}
        <option value={railId}>{railObj.name}</option>
    	{/each}
    </select>
</form>
<RoutesForm selected={rail} />
<style lang="stylus">
$base_font_size = 16
$base_font_size_ems = unit($base_font_size / 16, em)
$px = unit(1 / $base_font_size, rem)
$px_em = unit(1 / $base_font_size, em)
    
form
    border-radius 10px;
    border none
    box-shadow 0 0 3px 0 rgba(0,0,0,0.25)
    padding 1rem
    background-color var(--bg-color)
    select
        font-size 1.5rem
        padding 0.25rem
        border-radius 5 * $px
</style>