import { useCallback, useEffect, useState } from "react"

const USER_DATA = "userData";

export const useAuth = () => {
    const [authData, setAuthData] = useState({
        token: null,
        userId: null
    });

    const login = useCallback((data) => {
        setAuthData(data);
        localStorage.setItem(USER_DATA, JSON.stringify(data))

    }, [])
    const logout = useCallback(() => {
        // setAuthData({ token: null, userId: null })
        localStorage.removeItem(USER_DATA)
    }, [])

    useEffect(() => {
        const data = JSON.parse(localStorage.getItem(USER_DATA))

        if (data && data.token) {
            console.log("auth useEffect set data from local storage", data)
            setAuthData(data)
        }
    }, [])

    return { login, logout, authData }
}