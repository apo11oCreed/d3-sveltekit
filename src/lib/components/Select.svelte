<script lang="ts">
    export let name: string;
    export let id: string;
    export let data: { [key: string]: { name: string } };
    export let changeFunction: (event: Event) => void; // this should already be iterable from parent component
</script>
<select name="{name}" id="{id}" on:change={changeFunction}>
    <option value="" disabled selected>-- Select Rail --</option>
    {#each Object.entries(data) as [dataId,dataObj]}
        <option value={dataId}>{dataObj.name}</option>
    {/each}
</select>
<style lang="stylus">
$base_font_size = 16
$base_font_size_ems = unit($base_font_size / 16, em)
$px = unit(1 / $base_font_size, rem)
$px_em = unit(1 / $base_font_size, em)

select
    font-size 1.5rem
    padding 0.25rem
    border-radius 5 * $px
</style>