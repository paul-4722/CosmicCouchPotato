import React, {Component} from 'react';

export const baseURL = "https://paul47224722.pythonanywhere.com/"

export async function HTTPMethod(option: String, url: RequestInfo|URL, data?: JSON)
{
    var response
    switch(option){
        case "GET":
            response = await fetch(url, {method: "GET"})
            break
        case "POST":
            response = await fetch(url, {
                method: "POST", 
                headers : {  
                    "Content-Type":"application/json; charset=utf-8"
                },
                body: JSON.stringify(data) 
            }   )
            break
        default:
            response = await fetch(url)
    }
    
    if(response)
        return response.json()
}