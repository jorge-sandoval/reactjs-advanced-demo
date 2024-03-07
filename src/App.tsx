import { FormEvent, useRef } from 'react';
import './App.css';

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
        <input type="text" ref={inputRef} />
        <button type="submit">Submit</button>
      </form>
    </>
  );
}

export default App;
