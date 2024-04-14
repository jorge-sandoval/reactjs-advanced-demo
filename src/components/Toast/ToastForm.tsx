import { FormEvent, useRef } from 'react';
import { useToast } from '../../hooks/useToast';
import { DEFAULT_TOAST_OPTIONS, ToastPosition } from '../../models/toast';

export default function ToastForm() {
  const { addToast } = useToast();
  const textRef = useRef<HTMLInputElement>(null);
  const autoDismissTimeoutRef = useRef<HTMLInputElement>(null);
  const positionRef = useRef<ToastPosition>('top-right');

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!textRef.current?.value) return;

    const autoDismissTimeout =
      Number(autoDismissTimeoutRef.current?.value) ||
      DEFAULT_TOAST_OPTIONS.autoDismissTimeout;

    const position = positionRef.current;

    addToast(textRef.current.value, {
      autoDismissTimeout,
      position,
    });

    textRef.current.value = '';
    if (autoDismissTimeoutRef.current) {
      autoDismissTimeoutRef.current.value =
        autoDismissTimeoutRef.current.value ??
        DEFAULT_TOAST_OPTIONS.autoDismissTimeout;
    }
  }

  function setPosition(e: React.ChangeEvent<HTMLInputElement>) {
    positionRef.current = e.target.value as ToastPosition;
  }

  return (
    <>
      <form
        className="row g-3 rounded border shadow-sm"
        onSubmit={handleSubmit}
      >
        <div className="col-12 text-center">
          <span className="fs-4">Add Toast</span>
        </div>
        <div className="col-12">
          <label className="form-label" htmlFor="text">
            Text
          </label>
          <input id="text" className="form-control" type="text" ref={textRef} />
        </div>
        <div className="col-12">
          <label className="form-label">Position</label>
          <div>
            <label className="me-2">
              <input
                type="radio"
                name="position"
                value="top-right"
                defaultChecked
                onChange={setPosition}
              />{' '}
              Top Right
            </label>

            <label className="me-2">
              <input
                type="radio"
                name="position"
                value="top-left"
                onChange={setPosition}
              />{' '}
              Top Left
            </label>
            <label className="me-2">
              <input
                type="radio"
                name="position"
                value="bottom-right"
                onChange={setPosition}
              />{' '}
              Bottom Right
            </label>
            <label className="me-2">
              <input
                type="radio"
                name="position"
                value="bottom-left"
                onChange={setPosition}
              />{' '}
              Bottom Left
            </label>
          </div>
        </div>
        <div className="col-12">
          <label className="form-label" htmlFor="autoDismissTimeout">
            Auto Dismiss Timeout
          </label>
          <input
            id="autoDismissTimeout"
            className="form-control"
            type="number"
            defaultValue="2500"
            ref={autoDismissTimeoutRef}
          />
        </div>
        <div className="col-12 d-flex justify-content-end mb-3">
          <button className="btn btn-primary">Add Toast</button>
        </div>
      </form>
    </>
  );
}
