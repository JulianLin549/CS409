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
                        <h2>關於</h2>
                        <p className="pr-5 text-white-50">No Ramen No Life！ 這個社團創立，是希望集結台灣喜好拉麵的同好可以有個共同討論的空間！：D
                            同時也以台灣為中心，讓世界各地愛好拉麵的麵友相聚在此為目標！(握拳 </p>
                    </div>
                    <div className="col-lg-4 col-xs-12 join-us">
                        <h4 className="mt-lg-0 mt-sm-4">加入我們</h4>
                        <p className="pt-2">
                            <a href="https://www.facebook.com/groups/RamenTW">
                                <FontAwesomeIcon icon={faFacebookSquare} />
                                <span className="ml-2">台灣拉麵愛好會(台湾ラーメン愛好会/Taiwan Ramen Club)</span>
                            </a>
                        </p>
                        <p>
                            <a href="https://www.facebook.com/TWRamen">
                                <FontAwesomeIcon icon={faFacebookSquare} />
                                <span className="ml-2">台灣拉麵愛好會</span>

                            </a>
                        </p>
                    </div>
                    <div className="col-lg-4 col-xs-12 location">
                        <h4 className="mt-lg-0 mt-sm-4">訂閱電子報</h4>
                        <form className="input-group mt-1">
                            <input type="text" className="form-control form-control-sm" placeholder="Your email"
                                   aria-label="Your email" aria-describedby="basic-addon2" />
                            <div className="input-group-append">
                                <button className="btn btn-sm btn-outline-light my-0" type="button">Sign up</button>
                            </div>
                        </form>
                        <h5 className="mt-4 text-white-50">聯絡資訊</h5>
                        <p className="mt-lg-1 mt-sm-4 text-white-50">如果網站壞掉或您有甚麼新的功能想加的話，請聯絡網管：

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
