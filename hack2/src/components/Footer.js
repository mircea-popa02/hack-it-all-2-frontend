
import "./Footer.css";
const Footer = () => {
    return (
        <div className="footer-container">
            <footer className="text-center text-lg-start text-muted">
                <section className="">
                    <div className="container text-center text-md-start mt-5">
                        <div className="row mt-3">

                            <div className="col-md-3 col-lg-2 col-xl-2 mx-auto mb-4">
                                <h6 className="text-uppercase fw-bold mb-4">
                                    Technologies
                                </h6>
                                <p>
                                    <a href="/" className="text-reset">React</a>
                                </p>
                                <p>
                                    <a href="/" className="text-reset">NodeJS</a>
                                </p>
                                <p>
                                    <a href="/" className="text-reset">MongoDB</a>
                                </p>
                            </div>

                            <div className="col-md-3 col-lg-2 col-xl-2 mx-auto mb-4">
                                <h6 className="text-uppercase fw-bold mb-4">
                                    Useful links
                                </h6>
                                <p>
                                    <a href="https://chat.openai.com/chat" className="text-reset">ChatGPT</a>
                                </p>
                                <p>
                                    <a href="https://www.db.com/index?language_id=1&kid=sl.redirect-en.shortcut" className="text-reset">Deutsche Bank</a>
                                </p>
                                <p>
                                    <a href="https://github.com/mircea-popa02/hack-it-all-2-backend" className="text-reset">Github</a>
                                </p>
                            </div>

                            <div className="col-md-3 col-lg-2 col-xl-2 mx-auto mb-4">
                                <h6 className="text-uppercase fw-bold mb-4">
                                    Info
                                </h6>
                                <p>
                                    <a href="/" className="text-reset">About us</a>
                                </p>
                                <p>
                                    <a href="/" className="text-reset">Contact</a>
                                </p>
                                <p>
                                    <a href="/" className="text-reset">FAQ</a>
                                </p>
                            </div>
                        </div>
                    </div>
                </section>

                <div className="text-center p-4">
                    <span>© 2023 Copyright</span>  
                </div>
            </footer>
        </div>
    );
};

export default Footer;