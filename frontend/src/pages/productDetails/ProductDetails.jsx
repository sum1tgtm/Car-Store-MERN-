import { useParams } from 'react-router-dom'
import { Footer } from '../../components/footer/Footer'
import { Topbar } from '../../components/topbar/Topbar'
import './productDetails.css'
import { useState, useEffect, useContext } from 'react'
import axios from 'axios'
import { AccessTime, AccountBox, BookmarkAdd, BookmarkRemove, Business, Email, Phone, PhoneAndroid } from '@mui/icons-material';
import { AuthContext } from '../../context/AuthContext'
import { refreshCall } from '../../api/apiCall'
import { toast } from 'react-toastify'
import { Box, Modal } from '@mui/material'
import moment from 'moment'

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: '#E9F8F9',
    border: 'none',
    boxShadow: 24,
    p: 4,
    borderRadius: '5px',
    outline: 'none'
};

export const ProductDetails = () => {
    const { user, dispatch } = useContext(AuthContext)

    const [open, setOpen] = useState(false)

    const { id } = useParams()

    const [wishlist, setWishlist] = useState([])
    const [product, setProduct] = useState(null)
    const fetchProductData = async () => {
        const res = await axios.get(`http://localhost:4000/posts/${id}`)
        setProduct(res.data)
        if (user) {
            setWishlist(user.wishlist)
        }
    }
    useEffect(() => {
        fetchProductData()
    }, [id])

    const [seller, setSeller] = useState(null)
    const fetchSeller = async () => {
        if (product) {
            const res = await axios.get(`http://localhost:4000/user/${product.userId}`)
            setSeller(res.data)
        }
    }
    useEffect(() => {
        fetchSeller()
    }, [product])

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
        <div className='homepageWrapper'>
            <Topbar />
            {product &&
                <div className='productWrapper'>
                    <div className="detailsImage">
                        <img src={`http://localhost:4000/images/${product.image}`} alt="" className="detailsImg" />
                    </div>
                    <div className="detailsMain">
                        <h2 className="detailsTitle">{product.title}</h2>
                        <h4 className='carBrand'>{product.carInfo.brand} {product.carInfo.model}</h4>
                        <p className='detailsDescription'>{product.description}</p>
                        {wishlist.includes(id) ?
                            <button className='detailsWishlistBtn detailsBtn' onClick={() => handleWatchlist(id)}> <BookmarkRemove />Remove from Watchlist</button>
                            :
                            <button className='detailsWishlistBtn detailsBtn' onClick={() => handleWatchlist(id)}> <BookmarkAdd />Add To Watchlist</button>
                        }
                        <span className='detailsPrice'>Rs.{product.price}</span>
                        <button className='detailsContactBtn detailsBtn' onClick={() => setOpen(true)}><Phone />Contact Seller</button>
                        <Modal
                            open={open}
                            onClose={() => setOpen(false)}
                            aria-labelledby="modal-modal-title"
                            aria-describedby="modal-modal-description"
                        >
                            <Box sx={style}>
                                {seller &&
                                    <div className="detailsModal">
                                        <div className="modalItem modalName"><AccountBox />{seller.name}</div>
                                        <div className="modalItem modalSince">Since: {moment(seller.createdAt).fromNow()}</div>
                                        <div className="modalItem modalEmail"><Email />{seller.email}</div>
                                        <div className="modalItem modalEmail"><PhoneAndroid />{seller.phone}</div>
                                        <div className="modalItem"><Business />Kathmandu, Nepal</div>
                                    </div>
                                }
                            </Box>
                        </Modal>
                    </div>
                </div>
            }
            <Footer />
        </div>
    )
}
