<script lang="ts">
    //https://sveltekit.io/blog/svelte-each-blocks
    //https://javascript.plainenglish.io/update-arrays-and-objects-in-svelte-40c6a84f8a28
    import { TYPES } from "$lib/js/constants.ts"
    export let selected;
    export let data;
    
    let options: { index: string; id: string }[] = [];
    $: options=[];
    $: {
      if(selected != ''){
        options=[];
        for(let item in data.rails[selected].data){
            options.push({
                index: item,
                id: data.rails[selected].data[item].id
            });
        }
      } else {
          for(let item in data.rails[0].data){
            options.push({
                index: item,
                id: data.rails[0].data[item].id
            });
        }
      }
    }
</script>
<ul>
        {#each options as {index,id}, i}
            <li>{id}</li>
        {/each}
</ul>