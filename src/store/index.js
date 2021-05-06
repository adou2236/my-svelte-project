import { writable } from 'svelte/store';

const default_info = {
    id:'',
    name:'unknow',
    url:'#',
    cover:null
}
export const music_info = writable(default_info);
