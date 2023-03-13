import { useState, useEffect, useContext } from 'react'
import { Footer } from '../../components/footer/Footer'
import { Topbar } from '../../components/topbar/Topbar'
import axios from 'axios'
import { AuthContext } from '../../context/AuthContext'
import './profile.css'
import { toast } from 'react-toastify'

export const Profile = () => {
    const { user } = useContext(AuthContext)

    const [posts, setPosts] = useState(null)

    useEffect(() => {
        const fetchUserPosts = async () => {
            const res = await axios.get(`http://localhost:4000/posts/user/${user._id}`)
            setPosts(res.data)
        }
        fetchUserPosts()
    }, [])

    const handleDelete = async (id) => {
        setPosts(prev => prev.filter(post => post._id !== id))
        const res = await axios.delete(`http://localhost:4000/posts/delete/${id}`, {
            data: { userId: user._id }
        });
        if (res.status === 200) {
            toast.info(res.data)
        } else {
            toast.error(res.data)
        }
    }

    return (
        <div className='homepageWrapper'>
            <Topbar />
            <div className='profileWrapper'>
                <h3 className='carListHeading'>Your Cars</h3>
                <div className="carsList">
                    {posts && posts.map((post, index) => {
                        return <div className="carListItem" key={index}>
                            {/* {JSON.stringify(post)} */}
                            <img src={`http://localhost:4000/images/${post.image}`} className='itemProperty carListItemImg' alt="" />
                            <span className='carListTitle itemProperty'>{post.title.length > 20 ? post.title.slice(0, 20) + '...' : post.title}</span>
                            <span className='itemProperty'>Rs.{post.price}</span>
                            <div className="actionButtons itemProperty">
                                <button className='actionButton editBtn'>Edit</button>
                                <button className='actionButton deleteBtn' onClick={() => handleDelete(post._id)}>Delete</button>
                            </div>
                        </div>
                    })}
                </div>
            </div>
            <Footer />
        </div>
    )
}
