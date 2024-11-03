<script lang="ts">
    import RoutesForm from '$lib/components/RoutesForm.svelte';
    import Select from '$lib/components/Select.svelte';
    export let mbta: { rails: { [key: string]: { name: string } } };
    
    let rail: string = '';
    $: rail;
    
    /** @param {Event} e */
    function railSelected(e: Event){
        rail = (e.target as HTMLInputElement).value;
    }
    
</script>
<form>
    <Select name="railType" id="railType" data="{mbta.rails}" changeFunction="{railSelected}" />
</form>
<RoutesForm selected={rail} data={mbta} />
<style lang="stylus">
@import '../css/vars-functions.styl'
    
form
    border-radius 10 * $px
    border none
    box-shadow 0 0 3px 0 rgba(0,0,0,0.25)
    padding 1rem
    background-color var(--bg-color)
</style>