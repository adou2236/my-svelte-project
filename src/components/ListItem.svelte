<ClickableTile class="item"
      light="{index%2===1}">
    <div class="title">{name}</div>
    <div class="sub-title">总时长：{duration}</div>
</ClickableTile>

<script>
    import {onMount} from 'svelte'
    import {ClickableTile} from 'carbon-components-svelte'
    import {timeTranser} from '../func'

    export let show = {}
    export let index = 0

    $:name = show.name
    $:duration = timeTranser(show.duration)

    onMount(()=>{
    })


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
