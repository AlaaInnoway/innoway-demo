/* eslint-disable no-console */
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import authService from '../services/auth.service';
import Input from '@component/form/Input';
import Checkbox from '@component/form/Checkbox';
import FormAction from './FormAction';

export default function FormLogin() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);

  useEffect(() => {
    // Check if there are saved credentials in local storage
    const savedEmail = localStorage.getItem('savedEmail');
    const savedPassword = localStorage.getItem('savedPassword');

    if (savedEmail && savedPassword) {
      setEmail(savedEmail);
      setPassword(savedPassword);
      setRememberMe(true);
    }
  }, []);

  const handleLogin = async () => {
    try {
      await authService.login(email, password);
      navigate('/');
      console.log('success !!!');
      // Save credentials to local storage if "Remember Me" is checked
      if (rememberMe) {
        localStorage.setItem('savedEmail', email);
        localStorage.setItem('savedPassword', password);
      } else {
        localStorage.removeItem('savedEmail');
        localStorage.removeItem('savedPassword');
      }
    } catch (error) {
      console.log('error !!!');
      // Handle login error
    }
  };

  return (
    <form className="mt-8 space-y-6">
      <div className="space-y-4">
        <Input
          id="email-address"
          label="Email address"
          type="email"
          value={email}
          handleChange={(e) => setEmail(e.target.value)}
          placeholder="Email address"
          required
        />
        <Input
          id="password"
          label="Password"
          type="password"
          value={password}
          handleChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
          required
        />
      </div>
      <div className="flex items-center">
        <Checkbox
          id="remember-me"
          name="remember-me"
          label="Remember me"
          value={rememberMe}
          handleChange={() => setRememberMe(!rememberMe)}
        />
      </div>
      <FormAction
        label="Login to your account"
        handleSubmit={() => handleLogin()}
      />
    </form>
  );
}
