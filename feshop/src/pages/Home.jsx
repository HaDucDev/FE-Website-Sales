import React from 'react';
import { Card, Button, Image } from 'react-bootstrap';
import './home.css';

const data = [
    {
        title: 'Card 1',
        image: 'https://via.placeholder.com/300x200',
        text: 'This is card 1',
        button: 'Go to card 1',
    },
    {
        title: 'Card 2',
        image: 'https://via.placeholder.com/300x200',
        text: 'This is card 2',
        button: 'Go to card 2',
    },
    {
        title: 'Card 3',
        image: 'https://via.placeholder.com/300x200',
        text: 'This is card 3',
        button: 'Go to card 3',
    },
    {
        title: 'Card 1',
        image: 'https://via.placeholder.com/300x200',
        text: 'This is card 1',
        button: 'Go to card 1',
    },
    {
        title: 'Card 2',
        image: 'https://via.placeholder.com/300x200',
        text: 'This is card 2',
        button: 'Go to card 2',
    },
    {
        title: 'Card 3',
        image: 'https://via.placeholder.com/300x200',
        text: 'This is card 3',
        button: 'Go to card 3',
    },
    {
        title: 'Card 1',
        image: 'https://via.placeholder.com/300x200',
        text: 'This is card 1',
        button: 'Go to card 1',
    },
    {
        title: 'Card 2',
        image: 'https://via.placeholder.com/300x200',
        text: 'This is card 2',
        button: 'Go to card 2',
    },
    {
        title: 'Card 3',
        image: 'https://via.placeholder.com/300x200',
        text: 'This is card 3',
        button: 'Go to card 3',
    }
    
];


const Home = () => {
    return (
        <>
            <div className="card-list-container" >
                {data.map((item, index) => (
                    <Card key={index} className="card-container">
                        <Image src={item.image} fluid className="card-image" />
                        <Card.Body>
                            <Card.Title className="card-title">{item.title}-{index}</Card.Title>
                            <Card.Text className="card-text">{item.text}</Card.Text>
                            <Button variant="primary" className="card-button">{item.button}</Button>
                        </Card.Body>
                    </Card>
                ))}
            </div>
        </>
    );// ngoac tong
}

export default Home;