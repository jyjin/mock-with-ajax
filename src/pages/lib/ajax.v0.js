/**
 * Http 请求组件
 *
 * author:  jyjin
 * date  :   create at 2018.09.18
 * remark:
 *
 *          老数据格式api调用类
 */

import { message } from 'antd';
import config from '../../../config';
import { createUrlSearch } from './util';

const ERROR = {
    TIMEOUT: "TIMEOUT_ERROR",
    NET: 'NET_ERROR',
    HTTP: 'HTTP_ERROR',
    SYSTEM: 'SYSTEM_ERROR',
    DATA: 'DATA_ERROR',
    UNKNOWEN: 'UNKNOWEN_ERROR'
}

let httpQueue = []
let httpRequestId = 0


const obj2String = (obj, arr = [], idx = 0) => {
    for (let item in obj) {
        arr[idx++] = [item, obj[item]]
    }
    return new URLSearchParams(arr).toString()
}

const cleanTimeout = (httpRequestId) => {
    let index = httpQueue.findIndex(item => item.httpRequestId === httpRequestId)
    if (~index) {
        let request = httpQueue[index]
        // console.log('clear == ', request.timer)
        clearTimeout(request.timer)
        httpQueue.splice(index, 1)
        // console.log('clear queue == ', httpQueue)
    }
}

const myFetch = (requestPromise, timeout = 10, httpRequestId) => {
    const timerPromise = new Promise((resolve, reject) => {
        let timer = setTimeout(() => {
            reject(ERROR.TIMEOUT)
        }, timeout * 1000)
        httpQueue.push({ httpRequestId, timer })
        // console.log('https => ', httpQueue)
    })
    return Promise.race([requestPromise, timerPromise])
}

const getOption = (url, data, type = 'POST') => {
    let options = {
        url,
        method: type,
    }
    if (type === 'GET') {
        options.query = data
    } else if (type === 'PUT') {
        options.query = data
    } else if (type === "DELETE") {
        options.query = data
    } else {
        options.data = data;
    }
    return options
}

const request = (options) => {

    let header = {
        'Content-Type': 'application/json',
    }
    let token = localStorage.getItem('token')
    let isLan = ~options.url.indexOf('/prompts/multi/zh')
    if (token && !isLan) {
        header['Authorization'] = `Bearer ${token}`
    }

    let url = `${config.siteUrl}${options.url}`
    let setting = {
        method: options.method,
        headers: header,
    }

    if (options.method == 'GET' || options.method == 'PUT' || options.method == 'DELETE') {
        const searchStr = obj2String(options.query)
        if (searchStr) {
            url += '?' + searchStr
        }
    } else {
        setting.body = JSON.stringify(options.data)
    }

    // let response
    const ajaxFetch = new Promise((resolve, reject) => {
        fetch(url, setting).then(res => {
            return res.json()
        }, reject => {
            reject(ERROR.HTTP)
        }).then(json => {
            if (json) {
                resolve(json)
            } else {
                console.error(json.errorMsg)
                message.error(json.errorMsg)
                reject(ERROR.DATA)
            }
        }).catch((e) => {
            reject(ERROR.SYSTEM)
        })
    })

    httpRequestId += 1
    return ((httpRequestId) => {
        return myFetch(ajaxFetch, config.timeout, httpRequestId).then((res) => {
            cleanTimeout(httpRequestId)
            return res
        }, (error) => {
            throw new Error(error)
        }).catch(function (error) {
            if (error.message === ERROR.TIMEOUT) {
                console.error(`[${ERROR.TIMEOUT}] 网络异常，请稍后重试`)
                message.error(`网络异常，请稍后重试`)
            } else {
                cleanTimeout(httpRequestId)
                if (error.message === ERROR.SYSTEM) {
                    console.error(`[${ERROR.SYSTEM}] 系统错误，请联系管理员`)
                    message.error(`系统错误，请联系管理员`)
                } else if (error.message === ERROR.HTTP) {
                    console.error(`[${ERROR.HTTP}] 网络异常，请稍后重试`)
                    message.error(`网络异常，请稍后重试`)
                } else if (error.message === ERROR.DATA) {
                    // message.error('网络异常，请稍后重试')
                } else {
                    console.error(`系统未知错误，前联系管理员`)
                    message.error(`[${ERROR.UNKNOWEN}] 系统未知错误，前联系管理员`)
                }
            }
        })
    })(httpRequestId)
}

module.exports = {
    getV0: (url, data) => {
        return request(getOption(url, data, 'GET'))
    },
    postV0: (url, data) => {
        return request(getOption(url, data))
    },
    putV0: (url, data) => {
        return request(getOption(url, data, 'PUT'))
    },
    delV0: (url, data) => {
        return request(getOption(url, data, 'DELETE'))
    }
}
