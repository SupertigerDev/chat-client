import { useEffect, useState } from 'preact/hooks';
import styles from './CustomInput.module.scss';

interface Props {
  label: string, 
  type?: string, 
  value?: string,
  onText?: (value: string) => void, 
  error?: Error
}

interface Error {message: string, path: string};

export default function Input(props: Props) {
  const [error, setError] = useState('');

  useEffect(() => {
    if (props.error?.path.toLowerCase() !== props.label.toLowerCase()) {
      setError('');
      return;
    }
    setError(props.error.message);
  }, [props.error])

  const onChange = (event: any) => props.onText?.(event.target.value);
  return (
    <div className={styles.inputContainer}>
      <div className={styles.label}>{props.label}</div>
        <input onChange={onChange} className={styles.input} type={props.type || "text"} value={props.value || undefined} />
        {typeof props.error === 'string' && <div className={styles.errorMessage}>{props.error}</div>}
        {error && <div className={styles.errorMessage}>{error}</div>}
    </div>

  )
}