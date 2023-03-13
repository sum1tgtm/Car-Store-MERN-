import { CatalogItem } from '../catalogItem/CatalogItem';
import { useState, useEffect, useContext } from 'react'
import { Pagination } from '@mui/material';
import axios from 'axios'
import { AuthContext } from '../../context/AuthContext';

export const CatalogContainer = () => {
    const [page, setPage] = useState(1)
    const [products, setProducts] = useState(null)

    const [wishlist, setWishlist] = useState([])

    const { user, dispatch } = useContext(AuthContext)

    useEffect(() => {
        const fetchAllCars = async () => {
            const res = await axios.get('http://localhost:4000/posts/all')
            setProducts(res.data)
            if (user) {
                setWishlist(user.wishlist)
            }
        }
        fetchAllCars()

    }, [])


    const handlePageChange = (event, page) => setPage(page)

    return (
        <>
            {products && (
                <>
                    {/* {user && JSON.stringify(user.wishlist)} */}
                    <div className='catalogContainer'>
                        {products.slice(8 * (page - 1), page * 8).map((product) => (<CatalogItem key={product._id} product={product} wishlist={wishlist} setWishlist={setWishlist} user={user} />))}
                    </div>
                    <Pagination className='pagination' count={Math.ceil(products.length / 8)} onChange={handlePageChange} />
                </>
            )}
        </>
    )
}
