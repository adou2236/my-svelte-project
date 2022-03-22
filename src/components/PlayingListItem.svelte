<ClickableTile
        on:click={handleClick}
        class="list-item">
    {#if isInPlaying}
        <Play16 />
    {/if}
    <div class="title" title={name}>{name}</div>
</ClickableTile>
<script>
    import {ClickableTile} from 'carbon-components-svelte'
    import Play16 from "carbon-icons-svelte/lib/Play16";
    import {createEventDispatcher} from "svelte";
    const dispatch = createEventDispatcher();


    export const index = 0
    export let name = 'unknow'
    export let isInPlaying = false
    function handleClick(){
        dispatch('click')
    }

</script>
<style lang="scss">
    .list-item{
      width: 100%;
      height: 30px;
      margin: 0 10px;
      display: flex;
      justify-content: flex-start;
      align-items: center;
      white-space: nowrap;
      .title{
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
      }
    }

</style>
