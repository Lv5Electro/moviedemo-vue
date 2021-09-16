import {request} from './request'

export function getStudios() {
    return request({
        url: '/studio/findAllStudio',
    })
}

export function getMovieByIsScreen(isScreen, isLimit) {
    return request({
        url: '/movie/findMovieByIsScreen?isScreen=' + isScreen + '&isLimit=' + isLimit,
    })
}

export function getIsScreenMovieCount(isScreen) {
    return request({
        url: '/movie/findIsScreenMovieCount?isScreen=' + isScreen,
    })
}

export function validateUser(uName, uPassword) {
    return request({
        url: '/user/findUserByNameAndPwd?uName=' + uName + '&uPassword=' + uPassword,
    })
}

export function validateUName(uName, uNickName) {
    return request({
        url: '/user/findUserByNameNickName?uName=' + uName + '&uNickName=' + uNickName,
    })
}

export function saveUser(user) {
    return request({
        headers: {
            'Content-Type': 'application/json; charset=UTF-8'
        },
        url: '/user/saveUser',
        method: 'post',
        data: user,

    })
}


export function updateUser(user) {
    return request({
        headers: {
            'Content-Type': 'application/json; charset=UTF-8'
        },
        url: '/user/updateUser',
        method: 'post',
        data: user,

    })
}

export function saveTickets(tickets) {
    return request({
        headers: {
            'Content-Type': 'application/json; charset=UTF-8'
        },
        url: '/ticket/saveTickets',
        method: 'post',
        data: tickets,
    })
}


export function deleteTicket(tkId) {
    return request({
        url: '/ticket/deleteTicket?tkId=' + tkId,
    })
}

export function getSeats(mId, sId) {
    return request({
        url: '/ticket/findTicketByMIdSId?mId=' + mId + '&sId=' + sId,
    })
}

export function getTickets(uId) {
    return request({
        url: '/ticket/findTicketByUId?uId=' + uId,
    })
}

