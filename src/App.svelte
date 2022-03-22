<Header
        persistentHamburgerMenu={false}
        bind:isSideNavOpen>
    <div slot="skip-to-content">
        <SkipToContent />
    </div>
</Header>
<LeftNav isSideNavOpen={isSideNavOpen}/>
<Content>
    <Grid>
        <Row>
            <Column>
                <Router {routes}/>
            </Column>
        </Row>
    </Grid>
</Content>
<CustomPlayer />

<script>
    import {
        Header,
        SkipToContent,
        Content,
        Grid,
        Row,
        Column,
    } from "carbon-components-svelte";
    import LeftNav from './components/LeftNav.svelte'
    import Router from 'svelte-spa-router'
    import {routes} from './router'
    import CustomPlayer from "./components/CustomPlayer.svelte";



    let isSideNavOpen = false;

    export const params = {}


    let ref = null;
    let active = false;
    let value = "";
    let selectedResultIndex = 0;
    let events = [];

    /** @type {"white" | "g10" | "g90" | "g100"} */
    let theme = "g100";

    $: document.documentElement.setAttribute("theme", theme)


</script>


<style lang="scss" itemscope>
    //.header-tools{
    //    display: flex;
    //    align-items: center;
    //}
    .body{
        padding-bottom: 80px;
    }
</style>
