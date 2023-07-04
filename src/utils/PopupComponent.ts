import React from 'react';

import ReactDOM from 'react-dom';

import PopUpEkyc from '@components/UI/Popup/PopUpEkyc';
import PopUpHome from '@components/UI/Popup/PopUpHome';
import { POPUP_COMPONENT_ID } from 'src/constant';

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
      document.querySelector(`#${POPUP_COMPONENT_ID}`),
    );
  }

  public static close() {
    ReactDOM.unmountComponentAtNode(
      document.querySelector(`#${POPUP_COMPONENT_ID}`) as HTMLElement,
    );
  }

  public static openEKYC() {
    ReactDOM.render(
      React.createElement(PopUpEkyc),
      document.querySelector(`#${POPUP_COMPONENT_ID}`),
    );
  }

  public static closeEKYC() {
    ReactDOM.unmountComponentAtNode(
      document.querySelector(`#${POPUP_COMPONENT_ID}`) as HTMLElement,
    );
  }
}

export default PopupComponent;
