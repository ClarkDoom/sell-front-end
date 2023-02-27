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
    <nav>
      <h1>hello, {user ? user.name : 'friend'}</h1>
      {user ?
        <>
          <h2>Welcome to SELL</h2>
          <p>A place to put your used gear on the market!</p>
        </>
        :
        <>
          <Link to="/signup">Sign Up</Link>
          <Link to="/login">Log In</Link>
        </>

      }
    </nav>
  )
}

export default Landing
