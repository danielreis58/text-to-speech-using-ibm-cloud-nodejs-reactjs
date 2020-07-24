import axios from 'axios';
import {SERVER_URL} from './servicesURLs'

export async function setComment(comment) {
    const body = `{
        "comment": "${comment}"        
    }`
    const response = await axios.post(`${SERVER_URL}/comment/setcomment`, body, {
        headers: {
            'Content-Type': 'application/json',
            'Accept': '*/*'
        }
    }).then(function (response) {
        //console.log(response.data);
        return response.data.insertId
    }).catch((err) => {
        return {
            status: "error",
            err: err
        }
    })
    //console.log(response);
    return response;
}

export async function getComments() {
    const response = await axios.get(`${SERVER_URL}/comment/getcomments`, {
        headers: {
            'Content-Type': 'application/json',
            'Accept': '*/*'
        }
    }).then(function (response) {
        //console.log(response.data);
        return response.data
    }).catch((err) => {
        return {
            status: "error",
            err: err
        }
    })
    //console.log(response);
    return response;
}

export async function synthesize(id, comment) {
    const body = `{
        "id": ${id},
        "comment": "${comment}"        
    }`
    const response = await axios.post(`${SERVER_URL}/voice/synthesize`, body, {
        headers: {
            'Content-Type': 'application/json',
            'Accept': '*/*'
        }
    }).then(function (response) {
        //console.log(response.data);
        return response
    }).catch((err) => {
        return {
            status: "error",
            err: err
        }
    })
    //console.log(response);
    return response;
}