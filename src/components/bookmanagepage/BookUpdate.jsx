import axios from 'axios';
import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Config from '../config/Config.js';
import ModalSuccess from '../modal/ModalSuccess.jsx';

function BookUpdate() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    isbn: '',
    pictureUrl: '',
    pageNumber: '',
    categoryId: ''
  });
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const categoryUrl = Config.apiDomain + Config.endpoints.category.getAll;
    axios.get(categoryUrl)
      .then(response => {
        setCategories(response.data);
      })
      .catch(error => {
        console.error('There was an error fetching the categories!', error);
      });

    // Fetch the existing book data
    const bookUrl = `${Config.apiDomain}${Config.endpoints.book.getOne.replace('{id}', id)}`;
    axios.get(bookUrl)
      .then(response => {
        setFormData(response.data);
      })
      .catch(error => {
        console.error('There was an error fetching the book data!', error);
      });
  }, [id]);

  const handleForm = (event) => {
    setFormData((previousFormData) => ({
      ...previousFormData,
      [event.target.name]: event.target.value
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    sendDataToBackend();
  };

  const closeModal = () => {
    setShowModal(false);
    navigate('/book'); // Navigate back to the book list after closing the modal
  };

  const sendDataToBackend = () => {
    const url = `${Config.apiDomain}${Config.endpoints.book.update.replace('{id}', id)}`;

    axios.put(url, {
      title: formData.title,
      description: formData.description,
      isbn: formData.isbn,
      pictureUrl: formData.pictureUrl,
      pageNumber: formData.pageNumber,
      categoryId: formData.categoryId
    })
      .then((response) => {
        setShowModal(true);
      })
      .catch((error) => console.log(error));
  };

  return (
    <>
      <div className="container-fluid background-form">
        <div className="row justify-content-center">
          <form
            onSubmit={handleSubmit}
            className="col-8 col-sm-8 col-md-6 col-xl-4 mt-3"
          >
            <fieldset>
              <legend className="mt-5 my-2" style={{ color: 'black', fontWeight: '200' }}>
                Update Book
              </legend>
              <div className="mb-3">
                <input
                  type="text"
                  required={true}
                  className="form-control"
                  placeholder="Enter book title"
                  name="title"
                  value={formData.title}
                  onChange={handleForm}
                />
              </div>
              <div className="mb-3">
                <textarea
                  required={true}
                  cols={30}
                  rows={5}
                  className="form-control"
                  placeholder="Enter book description"
                  name="description"
                  value={formData.description}
                  onChange={handleForm}
                />
              </div>
              <div className="mb-3">
                <input
                  required={true}
                  type="text"
                  className="form-control"
                  placeholder="Enter book ISBN"
                  name="isbn"
                  value={formData.isbn}
                  onChange={handleForm}
                />
              </div>
              <div className="mb-3">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Enter book picture URL"
                  name="pictureUrl"
                  value={formData.pictureUrl}
                  onChange={handleForm}
                />
              </div>
              <div className="mb-3">
                <input
                  required={true}
                  type="number"
                  className="form-control"
                  placeholder="Enter book page number"
                  name="pageNumber"
                  value={formData.pageNumber}
                  onChange={handleForm}
                />
              </div>
              <div className="mb-3">
                <select
                  className="form-select"
                  name="categoryId"
                  value={formData.categoryId}
                  onChange={handleForm}
                >
                  <option value="">Select category from list</option>
                  {categories.map(category => (
                    <option key={category.id} value={category.id}>
                      {category.name}
                    </option>
                  ))}
                </select>
              </div>
              <button type="submit" className="create-category-button">
                Update
              </button>
            </fieldset>
          </form>
        </div>
      </div>
      <ModalSuccess show={showModal} handleClose={closeModal} customMessage={'Book updated successfully'} />
    </>
  );
}

export default BookUpdate;
