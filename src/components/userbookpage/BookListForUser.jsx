import axios from 'axios';
import { useEffect, useState } from 'react';
import './BookListForUser.css';
import Config from '../config/Config.js';
import BookCard from './BookCard.jsx';

const ProductList = () => {
  const [bookList, setBookList] = useState();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const url = Config.apiDomain + Config.endpoints.book.getAll;
    axios
      .get(url)
      .then((response) => {
        setBookList(response.data);
        setIsLoading(false);
      })
      .catch((error) => console.log(error));
  }, []);

  if (isLoading) {
    return <div>Data is loading...</div>;
  }

  return (
    <>
    <div className="background-color-book-list">
    <div
      className="container-fluid text-center align-content-center position-relative background-color-book-list px-5">
      <div className="row row-cols-2 row-cols-md-3 row-cols-lg-4 row-cols-xl-6 ">
        {bookList.map((book) => (
          <BookCard key={book.id} book={book} />
        ))}
      </div>
    </div>
    </div>
</>
)
  ;
};

export default ProductList;
