import './footer.css'

import React from 'react'
import { Business, CopyrightOutlined, EmailOutlined, Facebook, Instagram, Smartphone, Twitter, YouTube } from '@mui/icons-material'

export const Footer = () => {
    return (
        <div className='footerWrapper'>
            <div className="footerTop">
                <div className="footerTopItem footerTopAbout">
                    <div className="footerTopAboutTitle">Car Store</div>
                    <div className="footerTopAboutDescription">Sell your car for what it's really worth. Our car reviews are totally independent and come with verdicts you can trust</div>
                </div>
                <div className="footerTopItem footerTopFollow">
                    <div className="footerTopFollowTitle">Follow Us</div>
                    <div className="footerTopFollowDescription">Each car is extensively tested and rated by our team of expert reviewers</div>
                    <div className="footerTopFollowIcons">
                        <Facebook className='facebook' />
                        <Twitter className='twitter' />
                        <Instagram className='instagram' />
                        <YouTube className='youtube' />
                    </div>
                </div>
                <div className="footerTopItem footerTopContact">
                    <div className="footerTopContactTitle">Contact Us</div>
                    <div className="footerTopContactItem"><Business /> Paknajol, Kathmandu</div>
                    <div className="footerTopContactItem"><Smartphone /> 9840765132</div>
                    <div className="footerTopContactItem"><EmailOutlined />carstore@gmail.com</div>
                </div>
            </div>
            <div className="footerBottom">
                <CopyrightOutlined /> Copyright 2023. All RIghts Reserved
            </div>
        </div>
    )
}
