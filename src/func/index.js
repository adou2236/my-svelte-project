export function timeTranser(second){
    let sec = second
    let min = 0
    let hour = 0
    hour = parseInt(sec/3600)>0 ? parseInt(sec/3600)>0 +'h':''
    min = parseInt(sec%3600/60) ? parseInt(sec%3600/60)+'m' :''
    sec = parseInt(sec%60) +'s'
    return hour+min+sec
}

export function deepCopy(obj){

    return JSON.parse(JSON.stringify(obj))
}
