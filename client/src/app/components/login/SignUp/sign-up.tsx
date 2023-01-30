import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { register } from '../../../../services/api.service';
import { useAppDispatch } from '../../../hooks/hooks';
import Button from '../../button/Button';
import './sign-up.scss';

const defaultFormFields = {
  email: '',
  password: '',
};

export default function SignUp() {
  const [formFields, setFormFields] = useState(defaultFormFields);
  const { email, password } = formFields;
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      const userData = await register(email, password);

      localStorage.setItem('user', JSON.stringify({ userData }));
    } catch (err) {
      console.error(err);
    }
  };

  const handleChange = (event: any) => {
    const { name, value } = event.target;

    setFormFields({ ...formFields, [name]: value });
  };

  return (
    <div className="login-container">
      <div className="form-container">
        <form className="form" onSubmit={(event) => handleSubmit(event)}>
          <h1 id="login-header">Sign Up</h1>
          <div className="form-input">
            <label className="floating-label-email">Email Address</label>
            <input
              type="email"
              name="email"
              onChange={handleChange}
              value={email}
              required
            />
          </div>
          <div className="form-input">
            <label className="floating-label-password">Password</label>
            <input
              type="password"
              name="password"
              onChange={handleChange}
              value={password}
              required
            />
          </div>
          <div className="submit">
            <Button text="Sign in" type="submit" />
          </div>
        </form>
      </div>
      <div className="graphic"></div>
    </div>
  );
}
