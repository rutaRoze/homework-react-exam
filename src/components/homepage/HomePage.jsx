import { useNavigate } from 'react-router-dom';
import './HomePage.css';
import bookNatureImg from '../../assets/bookNatureImg.jpg';

function HomePage() {
  const navigate = useNavigate();

  return (
    <>
      <div className="container-fluid text-center mt-5 home-page-style">
        <div className="row justify-content-center row-cols-1 row-cols-lg-4">
          <div className="col mb-5">
            <img
              src={bookNatureImg}
              alt="book"
              className="img"
            />
          </div>
          <div className="col text-start m-5">
            <h1>Books to enjoy. Books to recommend.</h1>
            <p>
              Whether delving into the realms of fantasy, uncovering historical events, or exploring the depths of human
              emotions, each book invites us to embark on a unique adventure.
              The joy of reading lies not only in escaping into different worlds but also in discovering new
              perspectives and ideas that challenge and inspire.
              With each page turned, we expand our horizons, nurturing a lifelong love for learning and exploration
              through the magic of storytelling.
            </p>
            <button type="button" className="btn home-button me-2 mt-2" onClick={() => navigate(`/register`)}>Register</button>
            <button type="button" className="btn home-button mt-2" onClick={() => navigate(`/login`)}>Login</button>
          </div>
        </div>
      </div>
    </>
  );
}

export default HomePage;
