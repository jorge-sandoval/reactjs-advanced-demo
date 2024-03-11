import { useRef, useState } from 'react';
import PageHeader from '../components/PageHeader';
import Tooltip from '../components/ToolTip';

export default function TooltipPage() {
  const [isOpen, setIsOpen] = useState(false);
  const buttonRef = useRef<HTMLButtonElement>(null);

  return (
    <>
      <PageHeader title="tooltip" subTitle="Using useLayoutEffect Hook" />

      <button
        ref={buttonRef}
        className="btn btn-primary"
        onClick={() => setIsOpen((o) => !o)}
      >
        Show Tooltip
      </button>

      <Tooltip isOpen={isOpen} setIsOpen={setIsOpen} triggerRef={buttonRef}>
        This is a tooltip
      </Tooltip>

      <div className="row mt-3">
        <div className="col col-sm-10 col-md-8 col-lg-6 col-xl-5 col-xxl-4">
          <p>
            <small>
              <strong>Note:</strong> The tooltip is a customizable component
              that provides helpful hints or additional information when users
              interact with elements on the page. The position of the tooltip
              dynamically adjusts based on the position of the triggering
              element, thanks to the use of the <code>useLayoutEffect</code> and{' '}
              hook. This ensures a seamless user experience across different
              screen sizes and devices.
            </small>
          </p>
        </div>
      </div>
    </>
  );
}
