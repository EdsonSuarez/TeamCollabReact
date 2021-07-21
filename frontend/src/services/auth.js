const axios = require('axios');
// import axiosInstance from "../helpers/axios";

export const logout= () => {    
    localStorage.removeItem('token');
    localStorage.removeItem('team');
    localStorage.removeItem('project');
    localStorage.removeItem('sprint');
    localStorage.removeItem('task');    
}

export const isAdmin=()=> {
    let jwtToken = localStorage.getItem('token');
    if (jwtToken == null) {
        return;
    } else {
        let jwtData = jwtToken.split('.')[1];
        let decodedJwtJsonData = window.atob(jwtData);
        let decodedJwtData = JSON.parse(decodedJwtJsonData);
        return decodedJwtData.roleId.name !== 'admin' ? false : true;
    }
}

export const isScrumMaster =() => {
    let jwtToken = localStorage.getItem('token');
    if (jwtToken == null) {
        return;
    } else {
        let jwtData = jwtToken.split('.')[1];
        let decodedJwtJsonData = window.atob(jwtData);
        let decodedJwtData = JSON.parse(decodedJwtJsonData);
        return decodedJwtData.roleId.name !== 'scrumMaster' ? false : true;
    }
}

export const isUserLeader =()=> {
    let jwtToken = localStorage.getItem('token');
    if (jwtToken == null) {
        return;
    } else {
        let jwtData = jwtToken.split('.')[1];
        let decodedJwtJsonData = window.atob(jwtData);
        let decodedJwtData = JSON.parse(decodedJwtJsonData);
        return decodedJwtData.roleId.name !== 'user' && decodedJwtData.roleId.name !== 'technicalLeader' ? false : true;
    }
}

export const isUser =() =>{
    let jwtToken = localStorage.getItem('token');
    if (jwtToken == null) {
        return;
    } else {
        let jwtData = jwtToken.split('.')[1];
        let decodedJwtJsonData = window.atob(jwtData);
        let decodedJwtData = JSON.parse(decodedJwtJsonData);
        return decodedJwtData.roleId.name !== 'user' ? false : true;
    }
}