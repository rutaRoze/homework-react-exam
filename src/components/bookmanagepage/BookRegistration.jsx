import axios from 'axios';
import { useEffect, useState } from 'react';
import Config from '../config/Config.js';
import ModalSuccess from '../modal/ModalSuccess.jsx';
import { useNavigate } from 'react-router-dom';

function BookRegistration() {
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
  const navigate = useNavigate();

  useEffect(() => {
    const url = Config.apiDomain + Config.endpoints.category.getAll;
    axios.get(url)
      .then(response => {
        setCategories(response.data);
      })
      .catch(error => {
        console.error('There was an error fetching the categories!', error);
      });
  }, []);

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
    navigate("/book")
  };

  const sendDataToBackend = () => {
    const url = Config.apiDomain + Config.endpoints.book.create;
    axios
      .post(url, {
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
      <div className="container-fluid background-form ">
        <div className="row justify-content-center">
          <form
            onSubmit={handleSubmit}
            className=" col-8 col-sm-8 col-md-6 col-xl-4 mt-3"
          >
            <fieldset>
              <legend className="mt-5 my-2" style={{ color: 'black', fontWeight: '200' }}>
                Register New Book
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
                  placeholder="Enter book book picture URL"
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
                Add
              </button>
            </fieldset>
          </form>
        </div>
      </div>
      <ModalSuccess show={showModal} handleClose={closeModal} customMessage={'Book added successfully'} />
    </>
  );
}

export default BookRegistration;
