import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import { useNavigate } from 'react-router-dom';
import './BookCard.css';
import axios from 'axios';
import { useAuth } from '../authentication/AuthContext.jsx';
import Config from '../config/Config.js';

function BookCard({ book }) {
  const { getUserData, getTokenHeader } = useAuth();
  const navigate = useNavigate();
  const { pictureUrl, title, categoryName, id } = book;

  const likeBook = async () => {
    const userData = getUserData();
    const headers = getTokenHeader();
    const url = Config.apiDomain + Config.endpoints.like.like;

    const likeRequest = {
      userId: userData.uuid,
      bookId: id
    };

    axios
      .post(url, likeRequest, headers)
      .then((response) => {
        console.log('Book liked successfully', response.data);
      })
      .catch((error) => {
        console.error('Error liking the book:', error);
      });
  };

  return (
    <div className="col p-4">
      <Card className="book-card">
        <div>
          <Card.Img className="image-size" variant="top" src={pictureUrl} />
        </div>
        <Card.Body>
          <Card.Title>{title}</Card.Title>
          <Card.Text>{categoryName}</Card.Text>
          <Button
            className="read-more-button ms-3"
            variant="primary"
            onClick={() => navigate(`/details/${id}`)}
          >
            Read More
          </Button>
          <Button className="like-button" variant="success" onClick={likeBook}>
            Like
          </Button>
        </Card.Body>
      </Card>
    </div>
  );
}

export default BookCard;
