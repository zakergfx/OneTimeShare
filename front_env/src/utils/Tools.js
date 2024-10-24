export function calcRemainingDays(timestamp){
    const now = Date.now()/1000

    const diff = parseInt((timestamp-now)/3600)

    return diff
}