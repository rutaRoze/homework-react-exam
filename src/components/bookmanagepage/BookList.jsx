import axios from 'axios';
import { useEffect, useState } from 'react';
import Config from '../config/Config.js';
import { useNavigate } from 'react-router-dom';

function BookList() {
  const [bookList, setBookList] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [search, setSearch] = useState('');
  const navigate = useNavigate();

  const getBookList = () => {
    const url = Config.apiDomain + Config.endpoints.book.getAll;

    axios
      .get(url)
      .then((response) => {
        setBookList(response.data);
        console.log([bookList])
        setIsLoading(false);
      })
      .catch((error) => console.log(error));
  };

  useEffect(() => {
    getBookList();
  }, []);

  const deleteBook = (id) => {
    const url = `${Config.apiDomain}${Config.endpoints.book.delete.replace('{id}', id)}`;

    axios
      .delete(url)
      .then(() => {
        getBookList();
      })
      .catch((error) => console.error(error));
  };

  return (
    <>
      {isLoading && "Data is loading..."}

      <h3 className="mt-5 fw-bolder">Book List</h3>
      <div className="container">
        <form>
          <div className="my-5">
            <input
              type="text"
              onChange={(event) => setSearch(event.target.value)}
              className="form-control"
              placeholder="Search for book by title or category"
            />
          </div>
        </form>

        <table className="table table-striped table-hover mt-5 mb-5">
          <thead>
          <tr>
            <th scope="col">ID</th>
            <th scope="col">Title</th>
            <th scope="col">Category</th>
            <th scope="col">Mange books</th>
          </tr>
          </thead>
          <tbody>
          {bookList
            .filter((book) =>
                search.trim() === '' ||
                book.title.toLowerCase().includes(search.toLowerCase()) ||
                book.categoryName.toLowerCase().includes(search.toLowerCase())
              )
            .map((book) => (
              <tr key={book.id}>
                <th scope="row">{book.id}</th>
                <td>{book.title}</td>
                <td>{book.categoryName}</td>
                <td>
                  <button
                    type="button"
                    onClick={() => navigate(`/details/${book.id}`)}
                    className="btn btn-success me-2"
                  >
                    See Details
                  </button>
                  <button
                    type="button"
                      onClick={() => navigate(`/update/${book.id}`)}
                    className="btn btn-warning me-2"
                  >
                    Update
                  </button>
                  <button
                    type="button"
                    // disabled={category.isDeleting}
                    onClick={() => deleteBook(book.id)}
                    className="btn btn-danger"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}

export default BookList;
