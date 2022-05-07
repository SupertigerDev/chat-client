import { Link, useNavigate } from 'react-router-dom';
import CustomInput from '../../components/CustomInput/CustomInput';
import { loginRequest } from '../../services/UserService';
import styles from './LoginPage.module.scss';
import {useEffect, useState} from 'preact/hooks';
import CustomButton from '../../components/CustomButton/CustomButton';

export default function LoginPage() {
  const navigate = useNavigate();
  const [requestSent, setRequestSent] = useState(false);
  const [error, setError] = useState({message: '', path: ''});
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  
  useEffect(() => {
    if (localStorage['token']) {
      navigate('/app');
    }
  }, [])

  const loginClicked = async () => {
    if (requestSent) return;
    setRequestSent(true);
    setError({message: '', path: ''});
    const response = await loginRequest(email.trim(), password.trim()).catch(err => {
      setError({message: err.message, path: err.path});
    })
    setRequestSent(false);
    if (!response) return;
    localStorage['token'] = response.token;
    navigate('/app')
  }

  return <div className={styles.loginPage}>
    <div className={styles.container}>
      <div className={styles.title}>Login to continue</div>
      <CustomInput label='Email' type='email' error={error} onText={setEmail} />
      <CustomInput label='Password' type='password' error={error} onText={setPassword} />
      <CustomButton iconName='login' label={requestSent ? 'Logging in...' : 'Login'} onClick={loginClicked} />
      <Link className={styles.link} to="/register">Create an account instead</Link>
    </div>
  </div>
}

