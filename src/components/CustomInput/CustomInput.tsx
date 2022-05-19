import styles from './CustomInput.module.scss';

interface Props {
  label: string, 
  type?: string, 
  value?: string,
  onText?: (value: string) => void, 
  error?: Error | string
  errorName?: string
}

interface Error {message: string, path: string};

export default function Input(props: Props) {


  let error = "";
  
  if (props.error && typeof props.error !== 'string') {
    let errorField = props.errorName || props.label
    if (errorField.toLowerCase() === props.error.path){
      error = props.error.message;
    }
  }
  if (typeof props.error === 'string') {
    error = props.error;
  }

  const onChange = (event: any) => props.onText?.(event.target.value);
  return (
    <div className={styles.inputContainer}>
      <div className={styles.label}>{props.label}</div>
        <input onChange={onChange} className={styles.input} type={props.type || "text"} value={props.value || undefined} />
        {error && <div className={styles.errorMessage}>{error}</div>}
    </div>

  )
}