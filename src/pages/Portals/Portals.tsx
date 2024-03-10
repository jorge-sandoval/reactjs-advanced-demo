import { useState } from 'react';
import CustomModal from '../../components/CustomModal';
import PageHeader from '../../components/PageHeader';
import DialogModal from '../../components/DialogModal';

function Portals() {
  const [showModal, setShowModal] = useState(false);
  const [showDialogModal, setDialogShowModal] = useState(false);

  return (
    <>
      <PageHeader title="Modals" subTitle="Using createPortal" />

      <div className="row">
        <div className="col">
          <p>
            Portals provide a first-class way to render children into a DOM node
            that exists outside the DOM hierarchy of the parent component.
          </p>
        </div>
      </div>

      <div className="row">
        <div className="col-6 col-md-4 col-lg-3">
          <p>Custom Modal</p>
          <button
            className="btn btn-primary mb-3"
            onClick={() => setShowModal(true)}
          >
            Show Custom Modal
          </button>

          <CustomModal
            title="Custom Modal"
            isOpen={showModal}
            onClose={() => setShowModal(false)}
          >
            <p>
              This is a custom modal. It uses createPortal to render the modal
              outside the root element.
            </p>
          </CustomModal>
        </div>

        <div className="col-6 col-md-4 col-lg-3">
          <p>Dialog Modal</p>
          <button
            className="btn btn-primary mb-3"
            onClick={() => setDialogShowModal(true)}
          >
            Show Dialog Modal
          </button>

          <DialogModal
            title="Dialog Modal"
            isOpen={showDialogModal}
            onClose={() => setDialogShowModal(false)}
          >
            <p>
              This is a dialog modal. It uses createPortal to render the modal
              outside the root element.
            </p>
          </DialogModal>
        </div>
      </div>
    </>
  );
}

export default Portals;
