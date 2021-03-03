<div>
    主页<strong>{params.id}</strong>
    <p>{currentPage}</p>
    <a href="/details" use:link>二次跳转</a>
    <div class="album-area">
        {#each pageData as data, i}
            <Albums on:data={i}></Albums>
        {/each}
    </div>
    <CusotmerPagination
            class="pagination"
            bind:currentPage={currentPage}
            on:turnPage={handlePage}
            totalItems={totalItems}
            pageSize="15"
    />

</div>
<script>
    import {link} from 'svelte-spa-router'
    import {Button} from 'carbon-components-svelte'
    import {getAlbumList} from "../api";
    import CusotmerPagination from "../components/CusotmerPagination.svelte";
    import {onMount} from 'svelte'
    import Albums from "../components/Albums.svelte";

    export let params = {}

    let currentPage = 1
    let totalItems = 0
    let pageData = []

    onMount(() => {
        handleSearch(1)
    })

    $:{
        console.log("当前页码是a",currentPage)
    }

    function handlePage(e){
        if(e.detail.page!==currentPage){
            currentPage = e.detail.page
            handleSearch(currentPage)
        }
    }


    async function handleSearch(page) {
        let data = {
            'page_size': 15,
            'id': 4,
            'page': page
        }
        let res = await getAlbumList(data)
        pageData = res.data.albumInfoList
        totalItems = res.data.total
    }

</script>

<style>
    .pagination{
        position: absolute;
        bottom: 20px;
        left: 50%;
        transform:translateX(-50%);
    }
    .album-area{
        display: flex;
        flex-wrap: wrap;
    }
</style>
