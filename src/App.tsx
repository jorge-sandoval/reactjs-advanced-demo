import { FormEvent, useRef } from 'react';
import './App.css';
import CustomInput from './CustomInput';

function App() {
  const inputRef = useRef<HTMLInputElement>(null);

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!inputRef.current) return;
    alert(inputRef.current?.value);
  }

  return (
    <>
      <h1>forwardRef</h1>
      <form onSubmit={handleSubmit}>
        <label htmlFor="input">Query</label>
        <CustomInput type="text" ref={inputRef} />
        <button type="submit">Submit</button>
      </form>
    </>
  );
}

export default App;
