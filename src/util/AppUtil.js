import * as Property from "../property/property"

export default class AppUtil {

    static setJwtToken = (token) => {
        localStorage.setItem(Property.LOCAL_STORAGE_KEY.JWTTOKEN, token)
    }

    static getJwtToken = () => localStorage.getItem(Property.LOCAL_STORAGE_KEY.JWTTOKEN)
    
    static setUsername = (username) => {
        localStorage.setItem(Property.LOCAL_STORAGE_KEY.USERNAME, username)
    }

    static getUsername = () => localStorage.getItem(Property.LOCAL_STORAGE_KEY.USERNAME)

    static setRole = (role) => {
        localStorage.setItem(Property.LOCAL_STORAGE_KEY.ROLE, role)
    }

    static getRole = () => localStorage.getItem(Property.LOCAL_STORAGE_KEY.ROLE)

}