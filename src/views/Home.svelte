<div>
    主页<strong>{params.id}</strong>
    <p>{currentPage}</p>
    <a href="/details" use:link>二次跳转</a>
    <CusotmerPagination
            class="pagination"
            bind:currentPage={currentPage}
            totalItems={totalItems}
    />

</div>
<script>
    import {link} from 'svelte-spa-router'
    import {Button} from 'carbon-components-svelte'
    import {getAlbumList} from "../api";
    import CusotmerPagination from "../components/CusotmerPagination.svelte";
    import {onMount} from 'svelte'

    export let params = {}

    let currentPage = 1
    let totalItems = 0

    onMount(()=>{
        handleSearch()
    })


    async function handleSearch() {
        let data = {
            'page_size': 10,
            'id': 4,
            'page': currentPage
        }
        let res= await getAlbumList(data)
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
</style>
