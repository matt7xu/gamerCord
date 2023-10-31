import React from 'react';
import './footer.css'

const Footer = () => {

    return (
        <footer>
            <div className='footer-credits'>
                <div className='connect-info'>
                    <p className='text'>Connect With Me</p>
                    <div className='f-icons'>
                        <p>Matthew Xu</p>
                        <a target="_blank" href='https://www.linkedin.com/in/matthew-xu-3360a5176/'><i className="fab fa-linkedin fa-2x"></i></a>
                        <a target="_blank" href='https://github.com/matt7xu'><i className="fab fa-github fa-2x"></i></a>
                    </div>
                </div>
            </div>
        </footer>
    )
}

export default Footer;
