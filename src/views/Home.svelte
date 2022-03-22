<div>
    <div class="album-area">
        {#if loading}
            <Loading />
        {/if}
        {#each pageData as {album}, i}
            <Albums data={album}/>
        {/each}
    </div>
    <div class="pagination">
        <CusotmerPagination
                bind:currentPage={currentPage}
                on:turnPage={handlePage}
                totalItems={totalItems}
                pageSize="15"
        />
    </div>
</div>
<script>
    import {link} from 'svelte-spa-router'
    import {Loading} from 'carbon-components-svelte'
    import {getAlbumList} from "../api";
    import CusotmerPagination from "../components/CusotmerPagination.svelte";
    import {onMount} from 'svelte'
    import Albums from "../components/Albums.svelte";

    export let params = {}

    let currentPage = 1
    let totalItems = 0
    let pageData = []
    let loading = false
    let lastId =  params.id

    onMount(() => {
        handleSearch(id,currentPage)
    })

    $: id = params.id
    $:{
        loading = true
        if(id!==lastId){
            currentPage = 1
            lastId = params.id
        }
        handleSearch(id,currentPage)
    }


    function showAlbum(data) {
        console.log(data)
    }
    function handlePage(e){
        if(e.detail.page!==currentPage){
            currentPage = e.detail.page
        }
    }


    async function handleSearch() {
        let data = {
            'page_size': 20,
            'id': id,
            'page': currentPage
        }
        let res = await getAlbumList(data)
        pageData = res.data.albumInfoList
        totalItems = res.data.total
        loading = false
    }

</script>

<style>
    .pagination{
        display: flex;
        justify-content: center;
    }
    .album-area{
        display: flex;
        flex-wrap: wrap;
    }
</style>
