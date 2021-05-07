<ClickableTile
        on:click={handleClick}
        class="item"
      light="{index%2===1}">
    <div class="title">{name}</div>
    <div class="sub-title">总时长：{duration}</div>
    {#if isInPlaying}
        <Play32/>
    {/if}
</ClickableTile>

<script>
    import {onMount} from 'svelte'
    import {ClickableTile} from 'carbon-components-svelte'
    import {timeTranser} from '../func'
    import { createEventDispatcher } from 'svelte';
    import Play32 from "carbon-icons-svelte/lib/Play32";


    const dispatch = createEventDispatcher();



    export let show = {}
    export let index = 0
    export let isInPlaying = false

    $:name = show.name
    $:duration = timeTranser(show.duration)

    function handleClick(){
        dispatch('sequence', {
            data: show
        });
    }

</script>

<style lang="scss" itemscope>
    .item{
        overflow: hidden;
        height: 80px;
        padding: 0 20px;
        width: 100%;
        display: flex;
        flex-direction: column;
        justify-content: center;
        &:hover{
            text-decoration: none;
        }
    }
    .title{
        display: inline-block;
        max-width: 80%;
        font-size: 14px;
        margin-bottom: 10px;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
    }
    .sub-title{
        color: #b8b8b8;
        font-size: 12px;
    }
    a:hover{
        text-decoration: none;
    }
</style>
