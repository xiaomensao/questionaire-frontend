import jsonRequest from '@/utils/jsonRequest';

export function loginReq(username,password) {
    return jsonRequest.post('login',{
        username: username,
        password: password
    })
}