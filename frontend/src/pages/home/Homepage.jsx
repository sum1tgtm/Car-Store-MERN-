import { Carousel } from '../../components/carousel/Carousel'
import { Catalog } from '../../components/catalog/Catalog'
import { Footer } from '../../components/footer/Footer'
import { Promote } from '../../components/promote/Promote'
import { Topbar } from '../../components/topbar/Topbar'

export const Homepage = () => {
    return (
        <div className='homepageWrapper'>
            <Topbar />
            <Carousel />
            <Catalog />
            <Promote />
            <Footer />
        </div>
    )
}
