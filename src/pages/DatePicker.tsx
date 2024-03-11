import { useState } from 'react';
import DatePicker from '../components/DatePicker';
import PageHeader from '../components/PageHeader';
import { format } from 'date-fns';

export default function DatePickerPage() {
  const [value, setValue] = useState();
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <PageHeader title="Date Picker" subTitle="Custom Controlled Component" />

      <button
        onClick={() => {
          setIsOpen((o) => !o);
        }}
        className="btn btn-primary"
      >
        {!value ? 'Select a Date' : format(value, 'MMM do yyyy')}
      </button>

      <DatePicker
        value={value}
        onChange={setValue}
        isOpen={isOpen}
        setIsOpen={setIsOpen}
      />
      <div className="row mt-3">
        <div className="col col-sm-10 col-md-8 col-lg-6 col-xl-5 col-xxl-4">
          <p>
            <small>
              <strong>Note:</strong> The date picker is a controlled component.
              This means that its value and state are controlled by the parent.
              Controlled component offers advantages such as increased
              flexibility and the ability to keep the state synchronized with
              other components or data in your application.
            </small>
          </p>
        </div>
      </div>
    </>
  );
}
