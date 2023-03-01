// npm modules
import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'

// services
import styles from './LoginForm.module.css'

// stylesheets
import * as authService from '../../services/authService'

// types
import { AuthFormProps } from '../../types/props'
import { LoginFormData } from '../../types/forms'
import { handleErrMsg } from '../../types/validators'

const LoginForm = (props: AuthFormProps): JSX.Element => {
  const { updateMessage, handleAuthEvt } = props
  const navigate = useNavigate()

  const [formData, setFormData] = useState<LoginFormData>({
    email: '',
    password: '',
  })

  const handleChange = (evt: React.ChangeEvent<HTMLInputElement>): void => {
    updateMessage('')
    setFormData({ ...formData, [evt.target.name]: evt.target.value })
  }

  const handleSubmit = async (evt: React.FormEvent): Promise<void> => {
    evt.preventDefault()
    try {
      await authService.login(formData)
      handleAuthEvt()
      navigate('/')
    } catch (err) {
      console.log(err)
      handleErrMsg(err, updateMessage)
    }
  }

  const { email, password } = formData

  const isFormInvalid = (): boolean => {
    return !(email && password)
  }

  return (
    <div className="login-page">
      <form
        autoComplete="off"
        onSubmit={handleSubmit}
        className={styles.container}
      >

        <div className="input-container ic2">
          <input
            className="input"
            placeholder=" "
            type="text"
            id="email"
            value={formData.email}
            name="email"
            onChange={handleChange}
          />
          <div className="cut"></div>
          <label
            className="placeholder"
            htmlFor="email">Email</label>
        </div>


        <div className="input-container ic2">
          <input
            className="input"
            placeholder=" "
            type="password"
            id="password"
            value={formData.password}
            name="password"
            onChange={handleChange}
          />
          <div className="cut"></div>
          <label
            className="placeholder"
            htmlFor="password">Password</label>
        </div>

        <div className="login-btns">
          <button className="submit" disabled={isFormInvalid()}>
            Log In
          </button>
          <Link to="/">
            <button className="submit">Cancel</button>
          </Link>
        </div>
      </form>

    </div>
  )
}

export default LoginForm
