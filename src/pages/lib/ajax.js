/**
 * Http 请求组件
 *
 * author:  jyjin
 * date  :   create at 2018.08.10
 * remark:
 *          新数据api调用类
 *
 *          解析api数据格式的接口，封装成promise调用
 */

import { default as mockData, getModule } from '../../../mock';


/**
 * 注意
 * 1.这里的实现也可以不区分请求方式，直接用axios(url, data)
 * 2.无论何种实现，必须传入接口的url作为唯一索引
 */
export default {
    get: (url, data, openMock = 0) => {
        if (process.env.ENV === 'development' && openMock) {
            return new Promise(res => {
                res(mockData[getModule(url)])
            })
        } else {
            // request(url,data)ajax伪代码
            return new Promise(res => {
                res('AJAX DATA FROM SERVER')
            })
        }
    },
    post: (url, data, openMock = 0) => {
        if (process.env.ENV === 'development' && openMock) {
            return new Promise(res => {
                res(mockData[getModule(url)])
            })
        } else {
            // request(url,data) ajax伪代码
            return new Promise(res => {
                res('AJAX DATA FROM SERVER')
            })
        }
    },
    put: (url, data, openMock = 0) => {
        if (process.env.ENV === 'development' && openMock) {
            return new Promise(res => {
                res(mockData[getModule(url)])
            })
        } else {
            // request(url,data) ajax伪代码
            return new Promise(res => {
                res('AJAX DATA FROM SERVER')
            })
        }
    },
    del: (url, data, openMock = 0) => {
        if (process.env.ENV === 'development' && openMock) {
            return new Promise(res => {
                res(mockData[getModule(url)])
            })
        } else {
            // request(url,data) ajax伪代码
            return new Promise(res => {
                res('AJAX DATA FROM SERVER')
            })
        }
    }
}
