// npm modules
import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'

// services
import * as authService from '../../services/authService'

// types
import { AuthFormProps } from '../../types/props'
import { SignupFormData, PhotoFormData } from '../../types/forms'
import { handleErrMsg } from '../../types/validators'

const SignupForm = (props: AuthFormProps): JSX.Element => {
  const { updateMessage, handleAuthEvt } = props
  const navigate = useNavigate()

  const [isSubmitted, setIsSubmitted] = useState(false)
  const [formData, setFormData] = useState<SignupFormData>({
    name: '',
    userName: '',
    email: '',
    password: '',
    passwordConf: '',
  })
  const [photoData, setPhotoData] = useState<PhotoFormData>({
    photo: null
  })

  const handleChange = (evt: React.ChangeEvent<HTMLInputElement>) => {
    updateMessage('')
    setFormData({ ...formData, [evt.target.name]: evt.target.value })
  }

  const handleChangePhoto = (evt: React.ChangeEvent<HTMLInputElement>) => {
    if (evt.target.files) setPhotoData({ photo: evt.target.files.item(0) })
  }

  const handleSubmit = async (evt: React.FormEvent): Promise<void> => {
    evt.preventDefault()
    if (isSubmitted) return
    try {
      setIsSubmitted(true)
      await authService.signup(formData, photoData)
      handleAuthEvt()
      navigate('/')
    } catch (err) {
      console.log(err)
      handleErrMsg(err, updateMessage)
      setIsSubmitted(false)
    }
  }

  const { name, userName, email, password, passwordConf } = formData

  const isFormInvalid = (): boolean => {
    return !(name && email && password && password === passwordConf)
  }

  return (

    <form
      autoComplete="off"
      onSubmit={handleSubmit}
    >
      <div className="title">Welcome</div>
      <div className="subtitle">Signup for Sell!</div>

      <div className="input-container ic1">
        <input
          className="input"
          placeholder=" "
          type="text"
          id="name"
          value={name}
          name="name"
          onChange={handleChange}
        />
        <div className="cut"></div>
        <label
          className="placeholder"
          htmlFor="name"
        >Name</label>
      </div>

      <div className="input-container ic2">
        <input
          className="input"
          placeholder=" "
          type="text"
          id="userName"
          value={userName}
          name="userName"
          onChange={handleChange}
          autoComplete="off"

        />
        <div className="cut"></div>
        <label
          className="placeholder"
          htmlFor="userName">User name</label>
      </div>

      <div className="input-container ic2">
        <input
          className="input"
          placeholder=" "
          type="text"
          id="email"
          value={email}
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
          value={password}
          name="password"
          onChange={handleChange}
          autoComplete="off"
        />
        <div className="cut"></div>
        <label
          className="placeholder"
          htmlFor="password">Password</label>
      </div>

      <div className="input-container ic2">
        <input
          className="input"
          placeholder=" "
          type="password"
          id="confirm"
          value={passwordConf}
          name="passwordConf"
          onChange={handleChange}
        />
        <div className="cut"></div>
        <label
          className="placeholder"
          htmlFor="confirm">Confirm Password</label>
      </div>

      <div className="photo-trade">
        <h3>Upload Profile Photo</h3>
        <div className="input-container ic2" id="photo-upload">
          <input
            type="file"
            id="photo-upload"
            name="photo"
            onChange={handleChangePhoto}
          />
        </div>
      </div>

      <button 
          disabled={isFormInvalid() || isSubmitted} 
          className="submit"
        >
          {!isSubmitted ? "Sign Up" : "???? Sending..."}
        </button>
        <Link to="/">
          <button className="submit">Cancel</button>
        </Link>
    </form>

  )
}

export default SignupForm
