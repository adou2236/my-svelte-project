import axios from '../http'


//首先获取专辑列表，然后从专辑中拿个节目的id，最后根据每个节目的id获取详细信息
const BASE_URL = 'https://api.imjad.cn/qqfm/v1/'
const type = ['album', 'show', 'skip_show']


/**
 * 获取专辑列表
 * @param data
 * @returns {Promise<AxiosResponse<any>>}
 */
export function getAlbumList(data) {
    let params = {
        type:type[0],
        ...data
    }
    return axios.get(BASE_URL, {params}).then(content=>content)
}

/**
 * 获取节目列表
 * @param data
 * @returns {Promise<AxiosResponse<any>>}
 */
export function getShowList(data) {
    let params = {
        type:type[1],
        ...data
    }
    return axios.get(BASE_URL, {params}).then(content=>content)
}

/**
 * 获取节目列表详细信息
 * @param data
 * 将专辑的id与需要查询的节目id数据传入以逗号连接
 * @returns {Promise<AxiosResponse<any>>}
 */
export function getShowDetailsList(data) {
    let params = {
        type:type[2],
        ...data
    }
    return axios.get(BASE_URL, {params}).then(content=>Obj2Arr(content.data.showList))
}

function Obj2Arr(obj){
    let arr = []
    for(let i in obj){
        arr.push(obj[i])
    }
    return arr
}
