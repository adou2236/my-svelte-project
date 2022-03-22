import {writable,get} from 'svelte/store';

let list_in_storage = JSON.parse(window.localStorage.getItem('play_list'))||[]
//列表相关操作
function arrayClass(){
    const { subscribe, set, update } = writable(list_in_storage);
    return {
        subscribe,
        arrayPush: (arr) => update(n => arrayPush(n,arr)),
        arrayPop: (obj) => update(n => arrayPop(n,obj)),
        clear:() => {
            setStorage([])
            set([])
        }
    }
}
let play_list = arrayClass()

let store_data = get(play_list)

//当前播放相关操作
const default_info = store_data.length?store_data[0]:{
    id:'',
    name:'unknow',
    url:'#',
    cover:null
}

function musicClass(){
    const { subscribe, set, update } = writable(default_info);
    return {
        subscribe,
        set,
        update,
        next:(id) => set(nextSong(id)),
    }
}

const music_info = musicClass();
let isPause = writable(true)

//加入
function arrayPush(originalData,arr){
    let result = originalData
    for(let i=0; i<arr.length;i++){
        if(originalData.length<50){
            if(!originalData.find(item=>item.id===arr[i].id)){
                result.push(arr[i])
            }
        }else{
            break
        }
    }
    setStorage(result)
    return result
}
//弹出
function arrayPop(originalData,obj){
    let result =  originalData.filter(item => item.id !== obj.id)
    setStorage(result)
    return result

}
//下一首
function nextSong(id){
    if(store_data.length>1){
        let index = store_data.findIndex(item=>item.id === id)
        return store_data[(index+1)%store_data.length]
    }
}
//指定播放
function setStorage(arr){
    window.localStorage.setItem('play_list',JSON.stringify(arr))
}

export {
    play_list,
    music_info,
    isPause
}
