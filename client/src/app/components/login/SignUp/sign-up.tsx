import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { register } from '../../../../services/api.service';
import { activeUser } from '../../../../store/slices/user.slice';
import { useAppDispatch } from '../../../hooks/hooks';
import IUser from '../../../interfaces/user.interface';
import Button from '../../button/Button';
import './sign-up.scss';
import signup from '../../../../images/signup.png'

const defaultFormFields = {
  firstname: '',
  lastname: '',
  email: '',
  password: '',
};

export default function SignUp() {
  const [formFields, setFormFields] = useState(defaultFormFields);
  const { firstname, lastname, email, password } = formFields;
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      const userData: IUser = await register(
        firstname,
        lastname,
        email,
        password
      );
      dispatch(activeUser(userData));

      localStorage.setItem('user', JSON.stringify({ userData }));
      navigate('/dashboard');
    } catch (err) {
      console.error(err);
    }
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;

    setFormFields({ ...formFields, [name]: value });
  };

  return (
    <div className="signup-container">
      <div className="signup-form-container">
        <form className="form" onSubmit={(event) => handleSubmit(event)}>
          <h1 id="signup-header">Sign up</h1>
          <div className="form-input">
            <label className="form-input-label">First Name</label>
            <input
              type="text"
              name="firstname"
              onChange={handleChange}
              value={firstname}
              required
            />
          </div>
          <div className="form-input">
            <label className="form-input-label">Last Name</label>
            <input
              type="text"
              name="lastname"
              onChange={handleChange}
              value={lastname}
              required
            />
          </div>
          <div className="form-input">
            <label className="form-input-label">Email Address</label>
            <input
              type="email"
              name="email"
              onChange={handleChange}
              value={email}
              required
            />
          </div>
          <div className="form-input">
            <label className="form-input-label">Password</label>
            <input
              type="password"
              name="password"
              onChange={handleChange}
              value={password}
              required
            />
          </div>
          <div className="submit">
            <Button text="Sign up" type="submit" />
          </div>
        </form>
      </div>
      <div className="graphic">
        <img src={signup} alt='signup-img' className='signup-img' />
      </div>
    </div>
  );
}
