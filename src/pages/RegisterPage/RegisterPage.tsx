import { Link, useNavigate } from 'react-router-dom';
import CustomInput from '../../components/CustomInput/CustomInput';
import { registerRequest } from '../../services/UserService';
import styles from './RegisterPage.module.scss';
import {useEffect, useState} from 'preact/hooks';
import CustomButton from '../../components/CustomButton/CustomButton';
import { getStorageString, setStorageString, StorageKeys } from '../../common/localStorage';

export default function RegisterPage() {
  const navigate = useNavigate();
  const [requestSent, setRequestSent] = useState(false);
  const [error, setError] = useState({message: '', path: ''});
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  
  useEffect(() => {
    if (getStorageString(StorageKeys.USER_TOKEN, null)) {
      navigate('/app');
    }
  }, [])

  const registerClicked = async () => {
    if (requestSent) return;
    setRequestSent(true);
    setError({message: '', path: ''});

    if (password !== confirmPassword) {
      setError({message: 'Confirm password does not match.', path: 'Confirm Password'});
      setRequestSent(false);
      return;
    }

    const response = await registerRequest(email, username.trim(), password.trim()).catch(err => {
      setError({message: err.message, path: err.path});
    })
    setRequestSent(false);
    if (!response) return;
    setStorageString(StorageKeys.USER_TOKEN, response.token);
    navigate('/app')
  }

  return <div className={styles.registerPage}>
    <div className={styles.container}>
      <div className={styles.title}>Welcome to Nertivia!</div>
      <CustomInput label='Email' type='email' error={error} onText={setEmail} />
      <CustomInput label='Username' error={error} onText={setUsername} />
      <CustomInput label='Password' type='password' error={error} onText={setPassword} />
      <CustomInput label='Confirm Password' type='password' error={error} onText={setConfirmPassword} />
      <CustomButton iconName='login' label={requestSent ? 'Registering...' : 'Register'} onClick={registerClicked} />
      <Link className={styles.link} to="/login">Login Instead</Link>
    </div>
  </div>
}

