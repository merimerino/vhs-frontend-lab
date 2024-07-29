import { getTokenFromCookie } from "./authentication";

export const getMembers = (token:string | null) => {
    const myHeaders = new Headers();
    if (token) {
        token=getTokenFromCookie();
        myHeaders.append("x-jwt-token", token);
    }

    const requestOptions = {
    method: "GET",
    headers: myHeaders,
    redirect: "follow" as RequestRedirect,
    };

    return fetch("http://49.13.5.188:3000/users", requestOptions)
    
};

export const getMemberbyID = (token:string | null, id:string | null) => {
    const myHeaders = new Headers();
    if (token) {
        token=getTokenFromCookie();
        myHeaders.append("x-jwt-token", token);
    }

    const requestOptions = {
    method: "GET",
    headers: myHeaders,
    redirect: "follow" as RequestRedirect,
    };

    return fetch(`http://49.13.5.188:3000/user/${id}`, requestOptions)
    
};

