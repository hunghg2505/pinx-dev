import React from 'react';

import ReactDOM from 'react-dom';

import PopUpEkyc from '@components/PopUpEkyc';
import PopUpHome from '@components/PopUpHome';

export enum TypePopup {
  Success = 'success',
  Error = 'error',
  Warning = 'warning',
}
export interface PopupOptions {
  type: TypePopup;
  title: string;
  subTitle: string;
  labelButton: string;
  url?: string;
  id: string;
}
class PopupComponent {
  public static open(options?: PopupOptions) {
    ReactDOM.render(
      React.createElement(PopUpHome, options),
      document.querySelector('#md-popup-container'),
    );
  }

  public static close() {
    ReactDOM.unmountComponentAtNode(document.querySelector('#md-popup-container') as HTMLElement);
  }

  public static openEKYC() {
    ReactDOM.render(React.createElement(PopUpEkyc), document.querySelector('#md-popup-container'));
  }

  public static closeEKYC() {
    ReactDOM.unmountComponentAtNode(document.querySelector('#md-popup-container') as HTMLElement);
  }
}

export default PopupComponent;
