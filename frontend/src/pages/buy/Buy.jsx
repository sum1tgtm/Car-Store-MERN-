import './buy.css'

import { Topbar } from '../../components/topbar/Topbar'
import { Footer } from '../../components/footer/Footer'
import { CatalogContainer } from '../../components/catalog/CatalogContainer'

export const Buy = () => {
  return (
    <div className='buypageWrapper'>
      <Topbar />
      <CatalogContainer />
      <Footer />
    </div>
  )
}
