import './promote.css'

import React from 'react'
import { CardMembershipOutlined, MoneyOffOutlined, VerifiedUserOutlined } from '@mui/icons-material'

export const Promote = () => {
    return (
        <div className='promoteWrapper'>
            <div className="promoteHeading">The free, easy way to change your car online</div>
            <div className="promoteContents">
                <div className="promoteContent">
                    <MoneyOffOutlined className='promoteContentIcon' />
                    <div className="promoteContentTitle">Free</div>
                    <div className="promoteContentDescription">No haggling, no fees, just great prices</div>
                </div>
                <div className="promoteContent">
                    <CardMembershipOutlined className='promoteContentIcon' />
                    <div className="promoteContentTitle">Convenient</div>
                    <div className="promoteContentDescription">3000+ trusted partners to buy or sell within a few clicks</div>
                </div>
                <div className="promoteContent">
                    <VerifiedUserOutlined className='promoteContentIcon' />
                    <div className="promoteContentTitle">Trusted</div>
                    <div className="promoteContentDescription">100s of independent reviews and the world's most popular car YouTube channel</div>
                </div>
            </div>
        </div>
    )
}
