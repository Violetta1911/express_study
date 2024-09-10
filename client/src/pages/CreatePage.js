import { useContext, useState } from "react"
import { useFetch } from "../hooks/useFetch";
import { AuthContext } from "../context/AuthContext"
import { useNavigate } from "react-router-dom";



export const CreatePage = () => {
    const [link, setLink] = useState('');
    const { request } = useFetch();
    const navigate = useNavigate();
    const { token } = useContext(AuthContext)

    const changeHandler = (event) => {
        setLink(event.target.value)
    }

    const save = async (event) => {
        if (!link || event.key !== 'Enter') {
            return
        }

        try {
            const res = await request('/api/links', 'POST', { from: link }, { Authorization: `Baer ${token}` })
            if (!res.ok) {
                return
            }
            const data = res.json()
            navigate(`/detail/${data.link._id}`)
            return res.json()

        } catch (error) {

        }
    }
    return (
        <div className="row">
            <div className='col s8 offset-s2' style={{ paddingTop: '2rem' }}>
                <div className="input-field">
                    <input
                        id="link"
                        type="text"
                        value={link}
                        onChange={changeHandler}
                        onKeyDown={save}
                    />
                    <label htmlFor="link">Enter link</label>
                </div>
            </div>
        </div>
    )
}