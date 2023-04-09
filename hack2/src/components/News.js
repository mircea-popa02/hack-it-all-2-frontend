import React, { useState, useEffect } from 'react';
import { Container } from 'react-bootstrap';
import './News.css';

import Navbar from './AppNavbar';
import Footer from './Footer';
import Chat from './Chat';
const News = () => {

    // 1. Get the data from the API
    const [news, setNews] = useState([]);

    useEffect(() => {
        fetch("https://api.spaceflightnewsapi.net/v4/articles/", {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            }
        })
            .then(res => {
                if (res.ok) {
                    return res.json();
                } else {
                    throw new Error('Something went wrong');
                }
            }
            )
            .then(data => {
                console.log(data);
                setNews(data.results);
            }
            )
            .catch(err => {
                console.log(err);
            }
        )

    }, []);

    console.log(news.results);
    // 2. Create the JSX for the News component
    return (
        <>
        <Navbar />
        <Chat />
        <Container className='home-container'>
            
            <div className='form-container'>
            <h1 className='headline'>News</h1>
            <br />
                {news.map((article, index) => (
                    <div className="article" key={index}>
                        <h2 className='user-name'>{article.title}</h2>
                        <p>{article.summary}</p>
                        <img src={article.image_url} alt={article.title} />
                    </div>
                ))}
                </div>
        </Container>

        <Footer />
        </>
    );
}

export default News;