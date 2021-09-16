import axios from 'axios'


export function request(config) {
    // 创建axios的实例
    const instance = axios.create({
        baseURL: 'http://39.99.198.179:9000',
        // baseURL: '/api',
        timeout: 5000
    });
    return instance(config)
}