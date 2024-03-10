import { FormEvent, useRef } from 'react';
import CustomInput from './CustomInput';

function ForwardRef() {
  const inputRef = useRef<HTMLInputElement>(null);

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!inputRef.current) return;

    const value = inputRef.current.value;
    if (!value) {
      if (!inputRef.current.classList.contains('is-invalid')) {
        inputRef.current.classList.add('is-invalid');
      }
      return;
    }
    alert(inputRef.current.value);
  }

  return (
    <>
      <h1 className="display-6 fw-medium">Custom Input</h1>
      <p className="lead">Using forwardRef Hook</p>

      <div className="row">
        <form
          className="col-12 col-sm-10 col-md-8 col-lg-6 col-xl-5 col-xxl-4"
          onSubmit={handleSubmit}
        >
          <label htmlFor="input" className="form-label">
            Query
          </label>
          <CustomInput
            id="input"
            type="text"
            name="input"
            className="form-control mb-2"
            ref={inputRef}
          />
          <button className="btn btn-primary" type="submit">
            Submit
          </button>
        </form>
      </div>
    </>
  );
}

export default ForwardRef;
