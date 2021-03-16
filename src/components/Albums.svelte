<div class="album-container">
    {#if data}
        <div>
            <img alt={data.name} src={data.cover.urls[0].url} class="cover"/>
            <div class="name">{data.name}</div>
        </div>
    {:else}
        <SkeletonPlaceholder class="fake-cover"/>
    {/if}
</div>


<script>
    import { SkeletonPlaceholder } from "carbon-components-svelte";
    import {onMount} from "svelte";

    export let data = null
    export let index = 0

    onMount(() => {
    })
</script>

<style>
    .album-container{
        width: 190px;
        height: 190px;
        margin: 2rem;
        background: red;
        position: relative;
    }
    .cover{
        width: 100%;
        height: 100%;
        object-fit: cover;
    }
    .name{
        position: absolute;
        bottom: 0;
        left: 0;
        right: 0;
        height: 20px;
        line-height: 20px;
        opacity: 0.7;
        background: black;
        z-index: 2;
    }
    .fake-cover{
        width: 190px;
        height: 190px;
    }
</style>
