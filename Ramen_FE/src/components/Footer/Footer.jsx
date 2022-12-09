import React from 'react';
import './Footer.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFacebookSquare } from "@fortawesome/free-brands-svg-icons"

const Footer = () => {
    return (
        <div className="footer-bg">
            <div className="footer">
                <div className="row">
                    <div className="col-lg-4 col-xs-12 about">
                        <h2>About</h2>
                        <p className="pr-5 text-white-50">Asian food in UIUC! </p>
                    </div>
                    <div className="col-lg-4 col-xs-12 join-us">
                        <h4 className="mt-lg-0 mt-sm-4">Join Us!</h4>
                        <p className="pt-2">
                            <a href="https://www.facebook.com/groups/RamenTW">
                                <FontAwesomeIcon icon={faFacebookSquare} />
                                <span className="ml-2">Asian food!</span>
                            </a>
                        </p>
                        <p>
                            <a href="https://www.facebook.com/TWRamen">
                                <FontAwesomeIcon icon={faFacebookSquare} />
                                <span className="ml-2">Asian food club</span>

                            </a>
                        </p>
                    </div>
                    <div className="col-lg-4 col-xs-12 location">
                        <h4 className="mt-lg-0 mt-sm-4">Subscribe</h4>
                        <form className="input-group mt-1">
                            <input type="text" className="form-control form-control-sm" placeholder="Your email"
                                   aria-label="Your email" aria-describedby="basic-addon2" />
                            <div className="input-group-append">
                                <button className="btn btn-sm btn-outline-light my-0" type="button">Sign up</button>
                            </div>
                        </form>
                        <h5 className="mt-4 text-white-50">Contact</h5>
                        <p className="mt-lg-1 mt-sm-4 text-white-50">Contact

                            mepowenlin@gmail.com</p>
                    </div>
                </div>
                <div className="row mt-2">
                    <div className="col copyright">
                        <p>
                            <small className="text-white-50">© 2020. All Rights Reserved.
                                <br />
                                <span>Ramen Icons made by </span>
                                <a href="https://www.flaticon.com/authors/monkik" title="monkik">monkik</a>
                                <span> from</span>
                                <a href="https://www.flaticon.com/" title="Flaticon"> www.flaticon.com</a>
                            </small>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Footer;
