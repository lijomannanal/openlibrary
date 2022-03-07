import React from 'react';
import './style.scss';

type AppProps = {
  title: JSX.Element | undefined;
  body: JSX.Element | undefined,
  onClose:() => void,
};

const Popup = ({ title, body, onClose }: AppProps): JSX.Element => (
  <div data-testid="popup" className="popup">
    <div className="popup-content">
      <span title="Close" onClick={onClose} aria-hidden="true" className="popup-close">&times;</span>
      <div className="popup-title">
        {title}
      </div>
      <div className="popup-body">
        { body}
      </div>
    </div>

  </div>
);
export default Popup;
