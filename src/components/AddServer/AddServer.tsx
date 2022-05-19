import styles from './AddServer.module.scss';
import { Icon } from "../Icon/Icon";

import CustomInput from '../CustomInput/CustomInput';
import CustomButton from '../CustomButton/CustomButton';
import { createServer } from '../../services/ServerService';
import { useState } from 'react';

export function AddServer() {
  const [name, setName] = useState('');
  const [requestSent, setRequestSent] = useState(false);
  const [error, setError] = useState({message: '', path: ''});

  const onCreateClick = async () => {
    if (requestSent) return;
    setRequestSent(true);
    setError({message: '', path: ''});

    const server = await createServer(name).catch(setError);
    setRequestSent(false);


  }

  return <div className={styles.addServerContainer}>
    <Icon name="dns" size={30} className={styles.icon} />
    <CustomInput label='Server Name' error={error.message} onText={setName} />
    <CustomButton label='Create Server' iconName='add_circle_outline' onClick={onCreateClick}  />
  </div>
}