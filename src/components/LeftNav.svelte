<SideNav bind:isOpen={isSideNavOpen}>
    <SideNavItems>
        {#each albumType.allType as { id, name, children }, i}
            <SideNavMenu expanded={children.some(item=>item.index == activeTab)} text={name}>
                {#each children as { index, name }, i}
                    <SideNavMenuItem isSelected={activeTab==index.toString()} href={'/#/'+index} text={name}/>
                {/each}
            </SideNavMenu>
        {/each}
    </SideNavItems>
</SideNav>
<script>
    import {
        SideNav,
        SideNavItems,
        SideNavMenu,
        SideNavMenuItem,
    } from "carbon-components-svelte";
    import albumType from '../accect/json/albumType.json'
    import {location} from "svelte-spa-router";

    export let isSideNavOpen = true;

    $: activeTab = $location.slice($location.indexOf('/')+1)
</script>
