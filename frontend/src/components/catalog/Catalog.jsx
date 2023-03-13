import './catalog.css'

import { CatalogContainer } from './CatalogContainer';

export const Catalog = () => {
    return (
        <div className='catalogWrapper'>
            <div className="catalogTitle">EXPLORE</div>
            <CatalogContainer />
            <div className="catalogMore">More</div>
        </div>
    )
}
