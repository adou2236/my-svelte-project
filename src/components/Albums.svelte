<div class="album-container">
    {#if data}
        <div>{data}</div>
    {:else}
        <SkeletonPlaceholder style="height: 12rem; width: 12rem;" />
    {/if}
</div>


<script>
    import { SkeletonPlaceholder } from "carbon-components-svelte";

    export let data = 1
</script>

<style>
    .album-container{
        width: 12rem;
        height: 15rem;
        margin: 2rem;
        background: red;
    }
</style>
