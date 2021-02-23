import {wrap} from 'svelte-spa-router/wrap'

import Home from '../views/Home.svelte'
import Details from '../views/Details.svelte'
import NotFind from '../views/NotFind.svelte'

export const routes = {
    '/':Home,
    '/details': Details,
    '/:id': Home,
    '*': NotFind
}

export const routes2 = {
    '/detail/:id': Details,
    '/detail': Details,
}
