import './catalogItem.css'
import { BookmarkAddOutlined, BookmarkAddedOutlined } from '@mui/icons-material';
import axios from 'axios';
import { refreshCall } from '../../api/apiCall';
import { useContext } from 'react';
import { AuthContext } from '../../context/AuthContext';
import { toast } from 'react-toastify';
import { Link, useNavigate } from 'react-router-dom';



export const CatalogItem = ({ product, wishlist, setWishlist, user }) => {
    const formatter = Intl.NumberFormat('en', {
        notation: 'compact',
    })

    const navigate = useNavigate()

    const { dispatch } = useContext(AuthContext)

    const handleWatchlist = async (_id) => {
        if (wishlist.includes(_id)) {
            setWishlist(prev => prev.filter(id => id !== _id))
        } else {
            setWishlist([...wishlist, _id])
        }
        const res = await axios.put(`http://localhost:4000/user/${user._id}/wishlist`, {
            userId: product.userId,
            "carId": _id
        })
        if (res.status === 200) {
            toast.success(res.data)
        }
        await refreshCall(user._id, dispatch)
    }

    return (
        <div className='catalogItem'>
            <img src={`http://localhost:4000/images/${product.image}`} onClick={() => navigate(`/details/${product._id}`)} alt="" className="catalogItemImage" />
            <span className="catalogItemTitle">{product.title.length > 17 ? product.title.slice(0, 14) + '...' : product.title}</span>
            <div className="catalogItemDetails">
                <span className="catalogItemPrice">Rs. {formatter.format(product.price)}</span>
                {
                    wishlist.includes(product._id)
                        ? <BookmarkAddedOutlined className='bookmarkAdd' onClick={() => handleWatchlist(product._id)} />
                        : <BookmarkAddOutlined className='bookmarkAdd' onClick={() => handleWatchlist(product._id)} />
                }
            </div>
        </div>
    )
}
