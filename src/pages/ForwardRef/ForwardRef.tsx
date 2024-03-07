import { FormEvent, useRef } from 'react';
import CustomInput from './CustomInput';

function ForwardRef() {
  const inputRef = useRef<HTMLInputElement>(null);

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!inputRef.current) return;
    alert(inputRef.current?.value);
  }

  return (
    <>
      <h1 className="page-title">Custom Input</h1>
      <h2 className="page-sub-title">using forwardRef Hook</h2>
      <form onSubmit={handleSubmit}>
        <label htmlFor="input">Query</label>
        <CustomInput type="text" ref={inputRef} />
        <button type="submit">Submit</button>
      </form>
    </>
  );
}

export default ForwardRef;
