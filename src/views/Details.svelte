<div class="details">
    {#if loading}
        <Loading />
    {/if}
    <div class="header">
        <img alt={baseInfo.name}
             class="mask-background"
             src="{coverUrl}"/>
        <div class="block-mask"></div>
        <div class="cover">
            <ImageLoader alt={baseInfo.name} src="{coverUrl}">
                <div slot="loading">
                    <InlineLoading />
                </div>
                <div slot="error">封面丢失</div>
            </ImageLoader>
        </div>
        <div class="message">
            <div class="title">{baseInfo.name}</div>
            <div class="description">{baseInfo.desc}</div>
        </div>
    </div>
    <Breadcrumb>
        {#each cates as cate,i}
            <BreadcrumbItem href={`/#/${cate.categoryId}`}>{cate.categoryName}</BreadcrumbItem>
        {/each}
        <BreadcrumbItem isCurrentPage>{baseInfo.name}</BreadcrumbItem>
    </Breadcrumb>
    <div class="shows-header">节目列表({totalItems})</div>
    <div class="list">
        {#each searchData as {show}, i}
            <ListItem show={show}
                    index={i}/>
        {/each}
    </div>
    <div class="pagination">
        <CusotmerPagination
                bind:currentPage={currentPage}
                on:turnPage={handlePage}
                totalItems={totalItems}
                pageSize={pageSize}
        />
    </div>
</div>

<script>
    import {onMount, tick} from 'svelte'
    import {getShowList,getShowDetailsList} from '../api'
    import {Loading, ImageLoader, InlineLoading, Breadcrumb, BreadcrumbItem} from 'carbon-components-svelte'
    import CusotmerPagination from "../components/CusotmerPagination.svelte";
    import ListItem from "../components/ListItem.svelte";
    import {deepCopy} from "../func";



    export let params = {}

    let showsList = []
    let currentPage = 1
    let pageSize = 15 //一页多少条数据
    let loading = false
    let searchData = []
    let baseInfo = {}
    let title = ''


    onMount(async ()=>{
        loading = true
        baseInfo = {}
        showsList = await showInit()
        let firstPage = showsList.slice(0,pageSize)
        searchData = await searchById(firstPage)
        baseInfo = searchData[0].album
        console.log(baseInfo)
        loading = false

    })
    $:totalItems = showsList.length
    $:pageData = showsList.slice((currentPage - 1)*pageSize,currentPage*pageSize) //当前页的数据
    $:cates = baseInfo.vecCate || []
    $:coverUrl = baseInfo.cover ? baseInfo.cover.urls[0].url : '' || ''



    async function showInit() {
        let data = {
            id : params.id
        }
        return await getShowList(data)
    }
    async function searchById(array) {
        let data = {
            id : params.id,
            shows : array.toString()
        }
        return await getShowDetailsList(data)
    }
    async function handlePage(e) {
        if(e.detail.page!==currentPage){
            loading = true
            currentPage = e.detail.page
            await tick()
            searchData = await searchById(pageData)
            loading = false
        }
    }
</script>

<style lang="scss" itemscope>
    .details{
        position: relative;
        .header{
            height: 320px;
            margin-bottom: 20px;
            padding: 60px;
            display: flex;
            flex-direction: row;
            align-items: center;
            position: relative;
            text-shadow: 0 1px 3px rgba(0,0,0,50%);
            .mask-background{
                position: absolute;
                left: 0;
                top: 0;
                right: 0;
                bottom: 0;
                width: 100%;
                height: 100%;
                text-align: center;
                overflow: hidden;
                z-index: -1;
                -webkit-filter: blur(20px);
                -moz-filter: blur(20px);
                -ms-filter: blur(20px);
                filter: blur(20px);
                object-fit: cover;
            }
            .block-mask{
                width: 100%;
                height: 100%;
                position: absolute;
                left: 0;
                right: 0;
                top: 0;
                bottom: 0;
                z-index: -1;
                background: rgba(0,0,0,.4);
                -webkit-filter: blur(20px);
                -moz-filter: blur(20px);
                -ms-filter: blur(20px);
                filter: blur(20px);
            }
            .cover{
                width: 190px;
                height: 190px;
            }
            .message{
                margin-left: 20px;
                height: 190px;
                display: flex;
                flex-direction: column;
                justify-content: flex-start;
                .title{
                    font-size: 20px;
                    padding: 15px 0 20px;
                    overflow: hidden;
                    text-overflow: ellipsis;
                    white-space: nowrap;
                }
                .description{
                    ine-height: 1.5;
                    overflow: hidden;
                    height: 58px;
                    word-wrap: break-word;
                    display: -webkit-box;
                    -webkit-line-clamp: 3;
                    -webkit-box-orient: vertical
                }
            }
        }
        .shows-header{
            font-size: 18px;
            font-weight: 400;
            margin-bottom: 18px;
            margin-top: 40px;
        }

    }
    .pagination{
        display: flex;
        justify-content: center;
    }
</style>
