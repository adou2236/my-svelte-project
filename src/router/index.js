import {wrap} from 'svelte-spa-router/wrap'

import Home from '../views/Home.svelte'
import Details from '../views/Details.svelte'
import NotFind from '../views/NotFind.svelte'

export const routes = {
    '/details/:id': Details,
    '/:id': Home,
    '*': NotFind
}
