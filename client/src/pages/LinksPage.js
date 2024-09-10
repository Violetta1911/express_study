import React, { useCallback, useContext, useEffect, useState } from 'react'
import { AuthContext } from '../context/AuthContext'
import { Loader } from '../components/Loader'
import { LinksList } from '../components/LinksList'
import { useFetch } from '../hooks/useFetch'

export const LinksPage = () => {
    const [links, setLinks] = useState([])
    const { loading, request } = useFetch()
    const { token } = useContext(AuthContext)

    const fetchLinks = useCallback(async () => {
        try {
            const data = await request('/api/links', 'GET', null, {
                Authorization: `Bearer ${token}`
            })
            setLinks(data)
        } catch (e) { }
    }, [token, request])

    useEffect(() => {
        fetchLinks()
    }, [fetchLinks])

    if (loading) {
        return <Loader />
    }

    return (
        <>
            {!loading && <LinksList links={links} />}
        </>
    )
}