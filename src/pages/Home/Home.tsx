// npm 
import { Link } from 'react-router-dom';

// stylesheets
import styles from './Home.module.css'

// types
import { User } from '../../types/models'

interface LandingProps {
  user: User | null;
}

const Landing = (props: LandingProps): JSX.Element => {
  const { user } = props

  return (
    <div className="home-page" >
      {user ?
        <>
          <h1>Howdy,</h1>
          <h1>Welcome to SELL</h1>
          <h3>A place to put your used media on the market!</h3>
          <p>Create your first listing.</p>
          <Link to="/listings/create">
            <button className="home-link">Create Listing</button>
          </Link>
          <p>Or check out posted listings.</p>
          <Link to="/listings">
            <button className="home-link">Browse Listings</button>
          </Link>
        </>
        :
        <div className="home-btns">
          <Link className="home-btn" to="/signup">Sign Up</Link>
          <Link className="home-btn" to="/login">Log In</Link>
        </div>

      }
    </div>
  )
}

export default Landing
