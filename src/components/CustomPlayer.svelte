<!-- 播放器 -->
<div class="{isOpen?'music-player':'music-player close'}">
    <!--    打开开关-->
    <div class="open-btn" on:click={handleOpen}>
        {#if isOpen}
            <ArrowRight16></ArrowRight16>
        {:else }
            <ArrowLeft16></ArrowLeft16>
        {/if}
    </div>
    <!-- audio标签 -->
    <audio class="music-player__audio" ></audio>
    <!-- 播放器主体 -->
    <div class="music-player__main">
        <!-- 模糊背景 -->
        <img width="100%" class="music-player__blur" src={$music_info.cover} alt="cover">
        <!-- 唱片 -->
        <div class="music-player__disc">
            <!-- 唱片图片 -->
            <div class={$isPause?'music-player__image':'music-player__image play'}>
                <img width="100%" src={$music_info.cover} alt="cover" />
            </div>
            <!-- 指针 -->
            <div class={$isPause?'music-player__pointer':'music-player__pointer play'}><img width="100%" src="/static/img/cd_tou.png" alt="" /></div>
        </div>
        <!-- 控件主体 -->
        <div class="music-player__controls">
            <!-- 歌曲信息 -->
            <div class="music__info">
                <h3 class="music__info--title">{$music_info.name}</h3>
<!--                <p class="music__info&#45;&#45;singer">...</p>-->
            </div>
            <!-- 控件... -->
            <div class="player-control">
                <div class="player-control__content">
                    <div class="player-control__btns">
                        <div class="player-control__btn player-control__btn--prev" >
                            <SkipBack16/>
                        </div>
                        <div class="player-control__btn player-control__btn--play" on:click={handleClick}>
                            {#if $isPause}
                                <Play16/>
                            {:else }
                                <Pause16/>
                            {/if}
                        </div>
                        <div class="player-control__btn player-control__btn--next" on:click={nextSong}>
                            <SkipForward16/>
                        </div>
<!--                        <div class="player-control__btn player-control__btn&#45;&#45;mode">模式</div>-->
                    </div>
                    <div class="player-control__volume">
                        <div class="control__volume--icon player-control__btn"><i class="iconfont icon-volume"></i></div>
                        <div class="control__volume--progress progress"></div>
                    </div>
                </div>

                <!-- 歌曲播放进度 -->
                <div class="player-control__content">
                    <div class="player__song--progress progress">
                        <div class="back"></div>
                        <div class="pointer"></div>
                    </div>
                    <div class="player__song--timeProgess nowTime">{currentTimeFormatter}</div>
                    <div class="player__song--timeProgess totalTime">{durationFormatter}</div>
                </div>

            </div>

        </div>
    </div>
    <!-- 歌曲列表 -->
<!--    <div class="music-player__list">-->
<!--        <ul class="music__list_content">-->
<!--            &lt;!&ndash; <li class="music__list__item play">123</li>-->
<!--            <li class="music__list__item">123</li>-->
<!--            <li class="music__list__item">123</li> &ndash;&gt;-->
<!--        </ul>-->
<!--    </div>-->
</div>
<audio
        autoplay="{!$isPause}"
        on:canplay={onCanplay}
        on:timeupdate={onPlaying}
        on:pause={onPause}
        on:play={onPlay}
        bind:this={player}
        src={$music_info.url}>
    您的浏览器不支持该媒体
</audio>

<script>
    import jQuery from "jquery"
    import {onMount} from 'svelte'
    import {timeTranser} from "../func";
    import Add16 from "carbon-icons-svelte/lib/Add16";
    import Play16 from "carbon-icons-svelte/lib/Play16";
    import Pause16 from "carbon-icons-svelte/lib/Pause16";
    import SkipBack16 from "carbon-icons-svelte/lib/SkipBack16";
    import SkipForward16 from "carbon-icons-svelte/lib/SkipForward16";
    import ArrowLeft16 from "carbon-icons-svelte/lib/ArrowLeft16";
    import ArrowRight16 from "carbon-icons-svelte/lib/ArrowRight16";







    import {music_info,play_list,isPause} from '../store'
    //音频相关属性设置
    let player = null
    let duration = 1
    let currentTime = 0
    let progress = null
    let isOpen = false


    $:durationFormatter = timeTranser(duration)
    $:currentTimeFormatter = timeTranser(currentTime)
    $:{
        if($isPause){
            console.log("暂停")
            // pause()
        }
        else {
            console.log("播放")

        }
    }
    onMount(async ()=>{
    })
    function handleChange(e){
        music_info.set(e)
    }
    function timeChange(){
        console.log("鼠标抬起")
    }
    function handleClick(){
        if($isPause)
            play()
        else pause()
    }
    function play() {
        player.play()
    }
    function pause() {
        player.pause()
    }
    function onPlay() {
        isPause.set(false)
    }
    function onPause() {
        isPause.set(true)
    }
    function onCanplay(){
        duration = parseInt(player.duration)
        if (progress) {
            progress.max = duration; //切换歌曲后更新时长
            return false;
        }
        progress = new Progress('.player__song--progress', {
            min: 0,
            max: duration,
            value: 0,
            handler: (value) => {
                player.currentTime = value
            }
        })
    }
    function onPlaying(){
        currentTime = parseInt(player.currentTime)
        progress.setValue(currentTime);
    }
    function nextSong(){
        music_info.next($music_info.id)
    }
    function handleOpen(){
        isOpen  = !isOpen
    }

    //进度条
    class Progress {
        constructor(selector, options) {
            jQuery.extend(this, options);
            ///给this挂载传入的参数
            this.$el = jQuery(selector);
            this.width = this.$el.width();
            this.init();
        }

        //进度条初始化
        init() {
            this.renderBackAndPointer();
            this.bindEvents();
            // this.drag();
            this.value;
            this.changeDOMStyle(this.width * this.value);
        }
        //为进度条渲染back和pointer
        renderBackAndPointer() {
            this.$back = jQuery('.back');
            this.$pointer = jQuery('.pointer');
            // this.$el.append(this.$back);
            // this.$el.append(this.$pointer);
        }

        setValue(value) { //主动调用，传入value值，设置进度条样式
            let _distance = this.width * value / (this.max - this.min);
            this.changeDOMStyle(_distance);
        }

        //拖动事件，暂时先不做
        // drag() {
        //     let ele = this.$pointer;
        //     let father = this.$el;
        //     let flag = false; //鼠标是否点击
        //     ele.mousedown((e) => {
        //         flag = true;
        //         let mousePos = {
        //             x: e.offsetX
        //         }
        //         jQuery(document).mousemove((e) => {
        //             if (flag === true) {
        //                 let _left = e.clientX - father.offset().left - mousePos.x;
        //                 let _distance = Math.max(0, Math.min(_left, father.outerWidth(false) - ele.outerWidth(false)))
        //                 let _ratio = _distance / father.outerWidth(false);
        //                 let _value = _ratio * (this.max - this.min); //当前的音量值
        //                 this.changeDOMStyle(_distance);
        //                 this.handler(_value); //更改进度之后，执行回调
        //             }
        //         })
        //     })
        //     jQuery(document).mouseup(() => {
        //         flag = false;
        //     })
        //
        // }

        bindEvents() { //鼠标点击时更改
            this.$el.click((e) => {
                let _x = e.offsetX; //鼠标距离元素左边的距离
                let _ratio = _x / this.width;
                let _value = _ratio * (this.max - this.min); //当前的音量值
                this.changeDOMStyle(_x);
                this.handler(_value); //更改进度之后，执行回调
            })
        }
        //更改pointer和back
        changeDOMStyle(distance) {
            this.$back.width(distance + 7 == 7 ? 0 : distance + 7);//进度为0时将进度条背景改为0否则加上进度按钮的长度
            this.$pointer.css('left', distance + 'px');
        }
    }

</script>

<style lang="scss">
    /* 播放器大小 */
    .music-player {
        width: 550px;
        z-index: 1000;
    }

    /* 播放器位置 */
    .music-player {
        position: fixed;
        right: 0;
        bottom: 100px;
        transition: all 0.3s;
    }
    .music-player.close{
      transform: translateX(100%);
    }
    .open-btn{
      position: absolute;
      left: -30px;
      bottom: 0;
      width: 30px;
      height: 30px;
      background: black;
      cursor: pointer;
      display: flex;
      align-items: center;
      justify-content: center;

    }

    /* 歌曲列表 */

    .music-player__list {
        width: 100%;
        padding: 10px;
        margin-top: 50px;
        background: rgba(0, 0, 0, 0.5);
        border-radius: 5px;
        -webkit-box-shadow: 0 2px 6px rgba(0, 0, 0, 0.5);
        box-shadow: 0 2px 6px rgba(0, 0, 0, 0.5);
    }

    .music__list__item {
        padding-left: 25px;
        color: #ccc;
        position: relative;
        margin-bottom: 10px;
        font-size: 14px;
        cursor: pointer;
    }

    .music__list__item:last-of-type {
        margin: 0;
    }

    .music__list__item.play {
        color: #fff;
    }

    .music__list__item.play:before {
        font-family: 'iconfont';
        content: "\e87a";
        position: absolute;
        left: 0px;
        top: 4px;
    }


    /* 播放器主体 */
    .music-player__main {
        height: 180px;
        padding: 25px;
        -webkit-box-shadow: 0 0 40px rgba(0, 0, 0, 0.8);
        box-shadow: 0 0 40px rgba(0, 0, 0, 0.8);
        border-radius: 10px;
        position: relative;
        overflow: hidden;
        background: #6d6d6d;
        z-index: -2;
    }

    /* 播放器主体模糊背景 */
    .music-player__blur {
        width: 100%;
        height: 100%;
        position: absolute;
        left: 0;
        top: 0;
        z-index: -1;
        -webkit-filter: blur(20px);
        filter: blur(20px);
        overflow: hidden;
    }



    /* 播放器唱片效果 */
    .music-player__disc {
        float: left;
        width: 130px;
        height: 130px;
        background: url('/static/img/cd.png') no-repeat center;
        background-size: 100%;
        position: relative;
    }

    /* 唱片指针 */
    .music-player__pointer {
        width: 25px;
        position: absolute;
        right: -10px;
        top: 0;
        -webkit-transform-origin: right top;
        -ms-transform-origin: right top;
        transform-origin: right top;
        -webkit-transform: rotate(-15deg);
        -ms-transform: rotate(-15deg);
        transform: rotate(-15deg);
        -webkit-transition: all 0.3s;
        -o-transition: all 0.3s;
        transition: all 0.3s;
    }

    /* 唱片指针播放状态 加play类名 */
    .music-player__pointer.play {
        -webkit-transform: rotate(0deg);
        -ms-transform: rotate(0deg);
        transform: rotate(0deg);
    }

    /* 唱片歌曲图片 */
    .music-player__image {
        width: 80px;
        height: 80px;
        border-radius: 50%;
        position: absolute;
        overflow: hidden;
        left: 0;
        right: 0;
        top: 0;
        bottom: 0;
        margin: auto;
    }


    /* 播放器控件 */

    .music-player__controls {
        width: 330px;
        height: 130px;
        float: right;
    }

    /* 歌曲信息 */
    .music__info {
        width: 100%;
        height: 50px;
        margin-bottom: 15px;
    }

    .music__info .music__info--title,
    .music__info .music__info--singer {
        color: #fff;
    }

    .music__info .music__info--title {
        font-size: 16px;
    }

    .music__info .music__info--singer {
        color: #ccc;
        font-size: 14px;
        margin-top: 10px;
    }

    /* 控件 */

    .player-control {
        width: 100%;
    }

    .player-control__content {
        margin-bottom: 5px;
        overflow: hidden;
    }

    /* 播放暂停按钮 */
    .player-control__btns {
        float: left;
        overflow: hidden;
    }

    .player-control__btn {
        float: left;
        margin: 0 5px;
        font-weight: bolder;
        color: #fff;
        cursor: pointer;
    }

    .player-control__volume {
        float: right;
        overflow: hidden;
    }

    .control__volume--progress {
        float: left;
        width: 100px;
        position: relative;
        top: 8px;
    }

    .player__song--timeProgess{
        font-size: 12px;
        color: #fff;
        margin-top: 5px;
        padding: 0px 3px;
        background: rgba(0, 0, 0, 0.3);
        border-radius: 5px;
    }

    .nowTime{
        float: left;
    }
    .totalTime{
        float: right;
    }

    .progress {
        background: rgba(0, 0, 0, 0.3);
        height: 5px;
        -webkit-box-shadow: 0 1px 2px rgba(0, 0, 0, 0.5) inset;
        box-shadow: 0 1px 2px rgba(0, 0, 0, 0.5) inset;
        overflow: hidden;
        border-radius: 2px;
        position: relative;
        cursor: pointer;
    }

    .progress .back {
        width: 0;
        height: 100%;
        border-radius: 2px;
        background: rgb(12, 182, 212);
    }

    .progress .pointer {
        width: 7px;
        height: 7px;
        background: #fff;
        border-radius: 50%;
        opacity: 0;
        -webkit-transition: opacity 0.3s;
        -o-transition: opacity 0.3s;
        transition: opacity 0.3s;
        position: absolute;
        top: -1px;
        left: 0;
    }

    .progress:hover .pointer {
        opacity: 1;
    }


    /* 播放 画片 动画 */

    @-webkit-keyframes disc {
        from {
            -webkit-transform: rotate(0deg);
            transform: rotate(0deg);
        }

        to {
            -webkit-transform: rotate(360deg);
            transform: rotate(360deg);
        }
    }

    @keyframes disc {
        from {
            -webkit-transform: rotate(0deg);
            transform: rotate(0deg);
        }

        to {
            -webkit-transform: rotate(360deg);
            transform: rotate(360deg);
        }
    }

    .music-player__image.play {
        -webkit-animation: disc 5s linear 0s infinite;
        animation: disc 5s linear 0s infinite;
    }


    /*  播放进度  */

    .player__song--progress {
        width: 100%;
        margin-top: 15px;
    }


</style>
