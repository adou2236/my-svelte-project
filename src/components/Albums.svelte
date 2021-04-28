<div class="album-container">
    {#if data}
        <a href={`/details/${data.albumID}`}
           use:link>
            <ImageLoader alt={data.name} src={data.cover.urls[0].url} class="cover">
                <div slot="loading">
                    <InlineLoading />
                </div>
                <div slot="error">An error occurred.</div>
            </ImageLoader>
            <div class="name">{data.name}</div>
        </a>
    {:else}
        <SkeletonPlaceholder class="fake-cover"/>
    {/if}
</div>


<script>
    import { SkeletonPlaceholder, ImageLoader, InlineLoading} from "carbon-components-svelte";
    import {onMount} from "svelte";
    import { createEventDispatcher } from 'svelte';
    import {link} from 'svelte-spa-router';

    export let data = null
    export let index = 0

    const dispatch = createEventDispatcher();

    onMount(() => {
    })
    function handleClick() {
        dispatch('click', data);
    }
</script>

<style lang="scss" itemscope>
    .album-container{
        width: 190px;
        height: 190px;
        margin: 0 0 1rem 1rem;
        position: relative;
        overflow: hidden;
    }
    .cover{
        width: 100%;
        height: 100%;
        object-fit: contain;
        cursor: pointer;
    }
    .name{
        position: absolute;
        bottom: 0;
        left: 0;
        right: 0;
        height: 20px;
        line-height: 20px;
        padding: 0 5px;
        opacity: 0.7;
        overflow: hidden;
        text-overflow: ellipsis;
        background: black;
        z-index: 2;
        color: white;
    }
    .fake-cover{
        width: 100%;
        height: 100%;
    }
</style>
