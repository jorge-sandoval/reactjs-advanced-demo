import PageHeader from '../components/PageHeader';
import ToastForm from '../components/Toast/ToastForm';

export default function ToastPage() {
  return (
    <>
      <PageHeader title="Toast" subTitle="Using context & createPortal" />

      <div className="row mb-4">
        <div className="col">
          <p>
            Toasts provide a way to display messages to the user in a
            non-intrusive way.
          </p>
        </div>
      </div>

      <div className="row ms-0">
        <div className="col-12 col-sm-10 col-md-8 col-lg-6 col-xl-5 col-xxl-4">
          <ToastForm />
        </div>
      </div>
    </>
  );
}
