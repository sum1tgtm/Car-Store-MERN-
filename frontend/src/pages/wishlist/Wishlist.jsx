import { useEffect, useState, useContext } from 'react'
import './wishlist.css'
import { Topbar } from '../../components/topbar/Topbar'
import { Footer } from '../../components/footer/Footer'
import axios from 'axios'
import { AuthContext } from '../../context/AuthContext'
import { refreshCall } from '../../api/apiCall'
import { toast } from 'react-toastify'
import { BookmarkRemove } from '@mui/icons-material'

export const Wishlist = () => {
    const { user, dispatch } = useContext(AuthContext)
    const [wishList, setWishlist] = useState([])

    const fetchWishList = async () => {
        if (user) {
            const res = await axios.get(`http://localhost:4000/posts/user/wishlist/${user._id}`)
            setWishlist(res.data)
        }
    }
    useEffect(() => {
        fetchWishList()
    }, [])

    const handleDelete = async (id, userId) => {
        setWishlist(prev => prev.filter(item => item._id !== id))
        const res = await axios.put(`http://localhost:4000/user/${user._id}/wishlist`, {
            userId: userId,
            carId: id
        })
        if (res.status === 200) {
            await refreshCall(user._id, dispatch)
            toast.success(res.data)
        } else {
            toast.error(res.data)
        }
    }

    return (
        <div className='homepageWrapper'>
            <Topbar />
            <div className='profileWrapper'>
                <h3 className='carListHeading'>Your Watchlist</h3>
                <div className="carsList">
                    {wishList && wishList.map((post, index) => {
                        return <div className="carListItem" key={index}>
                            {/* {JSON.stringify(post)} */}
                            <img src={`http://localhost:4000/images/${post.image}`} className='itemProperty carListItemImg' alt="" />
                            <span className='carListTitle itemProperty'>{post.title.length > 20 ? post.title.slice(0, 20) + '...' : post.title}</span>
                            <span className='itemProperty'>Rs.{post.price}</span>
                            <div className="actionButtons itemProperty">
                                <button className='actionButton deleteBtn' onClick={() => handleDelete(post._id, post.userId)}><BookmarkRemove />Remove from Watchlist</button>
                            </div>
                        </div>
                    })}
                </div>
            </div>
            <Footer />
        </div>
    )
}
