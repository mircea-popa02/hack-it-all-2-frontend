

const Footer = () => {
    return (

        <footer className="text-center text-lg-start text-muted">
            

            <section className="">
                <div className="container text-center text-md-start mt-5">
                    <div className="row mt-3">
                        <div className="col-md-3 col-lg-4 col-xl-3 mx-auto mb-4">
                            <h6 className="text-uppercase fw-bold mb-4">
                                <i className="fas fa-gem me-3 text-secondary"></i>Student Finance
                            </h6>
                            <p>
                                Manage your finances with ease with Student Finance.
                            </p>
                        </div>

                        <div className="col-md-2 col-lg-2 col-xl-2 mx-auto mb-4">
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
                            <p>
                                <a href="/" className="text-reset">Express</a>
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
                                <a href="/news" className="text-reset">News</a>
                            </p>
                            <p>
                                <a href="https://www.db.com/index?language_id=1&kid=sl.redirect-en.shortcut" className="text-reset">Deutsche Bank</a>
                            </p>
                            <p>
                                <a href="https://github.com/mircea-popa02/hack-it-all-2-backend" className="text-reset">Github</a>
                            </p>
                        </div>

                        <div className="col-md-4 col-lg-3 col-xl-3 mx-auto mb-md-0 mb-4">
                            <h6 className="text-uppercase fw-bold mb-4">Contact</h6>
                            <p><i className="fas fa-home me-3 text-secondary"></i> București, sector 6, RO</p>
                            <p>
                                <i className="fas fa-envelope me-3 text-secondary"></i>
                                info@example.com
                            </p>
                            <p><i className="fas fa-phone me-3 text-secondary"></i> +40 234 567 188</p>
                            <p><i className="fas fa-print me-3 text-secondary"></i> +40 234 567 189</p>
                        </div>
                    </div>
                </div>
            </section>

            <div className="text-center p-4">
                <span>© 2023 Copyright</span>  
            </div>
        </footer>
    );
};

export default Footer;