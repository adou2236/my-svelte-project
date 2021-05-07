<div class="player">
<!--    <Slider-->
<!--            class="slider"-->
<!--            labelText="标题"-->
<!--            hideTextInput-->
<!--            minLabel={currentTimeFormatter}-->
<!--            maxLabel={durationFormatter}-->
<!--            max={duration}-->
<!--            value={currentTime}-->
<!--            on:change={handleChange}-->
<!--            on:onmouseup={mouseUp}-->
<!--    />-->
    <ImageLoader src={$music_info.cover} class="cover">
        <div slot="loading">
            <InlineLoading />
        </div>
        <div slot="error">An error occurred.</div>
    </ImageLoader>
    <audio  controls
            on:canplay={onCanplay}
            on:timeupdate={onPlaying}
            on:pause={onPause}
            on:play={onPlay}
            bind:this={player}
            src="{$music_info.url}">
        您的浏览器不支持该媒体
    </audio>
    <OverflowMenu size="xl"
                  class="menu"
                  flipped direction="top"
                  icon={TableOfContents32}>
        <div class="menu-container">
            {#each $play_list as item,index}
                <PlayingListItem name={item.name}
                                 index={index}
                                 isInPlaying={item.id === $music_info.id}
                                 on:click={()=>handleChange(item)}
                />
            {/each}
        </div>

    </OverflowMenu>
    <div on:click={nextSong}>下一个</div>
</div>


<script>
    import {onMount} from 'svelte'
    import { Slider, Icon, ImageLoader, InlineLoading,OverflowMenu } from "carbon-components-svelte";
    import TableOfContents32 from "carbon-icons-svelte/lib/TableOfContents32";
    import {timeTranser} from "../func";
    import {music_info,play_list} from '../store'
    import PlayingListItem from '../components/PlayingListItem.svelte'



    let cover_url = 'https://imgcache.qq.com/fm/photo/album/rmid_album_720/a/e/003v8thW1HWSae.jpg?time=1522487745'
    let music_url = 'http://ws.stream.fm.qq.com/vfm.tc.qq.com/R196000DnA3B2moKBq.m4a?fromtag=36&vkey=2D2D2039411C9F0AE953A62191E0C9B1E5D009A1439433B9C72E0A9C84D0D262A46F6A5594E9BB968F164991B8F71212FA8E642155071CEE&guid=10000'
    //音频相关属性设置
    let player = null
    let duration = 1
    let currentTime = 0
    let isPause = true

    $:durationFormatter = timeTranser(duration)
    $:currentTimeFormatter = timeTranser(currentTime)
    $:status = isPause?'播放':'暂停'
    onMount(async ()=>{
    })
    function handleChange(e){
        music_info.set(e)
    }
    function mouseUp(e){
        console.log("鼠标抬起")
    }
    function handleClick(){
        if(isPause)
            play()
        else pause()
    }
    function play() {
        player.play()
    }
    function pause() {
        player.pause()
        console.log("暂停")
    }
    function onPlay() {
        isPause = false
    }
    function onPause() {
        isPause = true
    }
    function onCanplay(){
        duration = parseInt(player.duration)
    }
    function onPlaying(){
        currentTime = parseInt(player.currentTime)
    }
    function nextSong(){
        music_info.next($music_info.id)
    }

</script>
<style lang="scss" global>
  .player{
    height: 80px;
    width: 100%;
    background: black;
    position: fixed;
    bottom: 0;
    left: 50%;
    transform: translateX(-50%);
    z-index: 10000;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0 80px;
    .cover{
      width: 60px!important;
      height: 60px;
      object-fit: contain;
    }
    audio{
      width: 80%;
      background: transparent;
    }
    .menu{
      width: 60px;
      height: 60px;
      .menu-container{
        width: 300px;
        height: 400px;
        transform: translateX(-100px);
        display: flex;
        flex-direction: column;
        overflow-y: scroll;

      }

    }
  }

</style>
