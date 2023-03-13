import './sell.css'
import { Topbar } from '../../components/topbar/Topbar'
import { Footer } from '../../components/footer/Footer'
import { SellForm } from '../../components/sellForm/SellForm'

export const Sell = () => {
    return (
        <div className='sellpageWrapper'>
            <Topbar />
            <div className='sellHeading'>Easily list your car for sale by completing the details below</div>
            <SellForm />
            <Footer />
        </div>
    )
}
