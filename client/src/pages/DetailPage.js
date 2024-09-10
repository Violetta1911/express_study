import { useCallback, useContext, useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { useFetch } from "../hooks/useFetch";
import { AuthContext } from "../context/AuthContext";
import { Loader } from "../components/Loader";
import { LinkCard } from "../components/LinkCard";



export const DetailPage = () => {
    const [linkData, setLinkData] = useState([])
    const { id } = useParams();
    const { request, loading } = useFetch();
    const { token } = useContext(AuthContext)
    const getLink = useCallback(async () => {
        const data = await request(`api/links/${id}`, 'GET', null, { Authorization: `Baer ${token}` })
        setLinkData(data)
        console.log("!!!!!!!!", data)
    }, [])

    useEffect(() => {
        getLink()
    }, [getLink])

    if (loading) {
        return <Loader />
    }

    return (
        <>
            {!loading && linkData && <LinkCard link={linkData} />}
        </>
    )
}