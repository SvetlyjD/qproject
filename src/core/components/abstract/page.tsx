/**
 * Base class for pages
 */

import React from 'react';
import Helpers from '@core/helpers';
import Preloader from '@core/components/base/preloader';
import { setPreloader, setAlert, setPopupMenu, setSelect, setImageViewer } from '@core/generated/actions'
import { bindActionCreators } from 'redux';
import PopupMenu from '@core/components/base/popupMenu';
import Alert from '@core/components/base/alert';
import Select from '@core/components/base/select';
import ImageViewer from '@core/components/base/imageViewer'

interface GLOBAL {
  setPreloader: any
}
declare const global: GLOBAL;

export interface _P {
  history: any
  setPreloader: Function
  preloader: any
  alert: any
  popupMenu: any
  select: any
  imageViewer: any
}

export class Page<P extends _P, S> extends React.Component<P, S> {
  constructor(props: any) {
    super(props)
    global.setPreloader = props.setPreloader;
  }

  static mapStateToProps = (state: any, customState: any) => ({  // any - произвольный тип
    preloader: state.preloader,          // preloader, alert, popupMenu, select, ImageViewer  - 
    alert: state.alert,               // это this.props -  для классов созданных на основе Page
    popupMenu: state.popupMenu,
    select: state.select,
    imageViewer: state.imageViewer,
    ...customState
  })

  static mapDispatchToProps = (dispatch: any, customActions: any) => {
    const actions: any = {
      setPreloader,                  //  названия экшнов для классов на основе Page
      setAlert,               //расположены в папке src core generated, 
      setPopupMenu,         // например при нажатии кноки Button "alert" срабатывает диспатч setAlert
      setSelect,   // который прокидывает кучу данных, включая функцию нажатия в редакс?
      setImageViewer,
      ...customActions
    }

    return bindActionCreators(actions, dispatch)
  }

  back = () => this.props.history?.goBack()

  go = (path: string) => this.props.history?.push(path)

  fetch = async (data: any) => {
    let { setPreloader } = this.props;
    if (typeof setPreloader !== 'function') {
      if (setPreloader !== false) {
        console.warn(
          'setPreloader not found in redux store. Maybe you forgot to connect the storage to the page'
        );
      }
      setPreloader = () => { }
    }

    return await Helpers.fetch(data, setPreloader);
  };

  _render = (childs: any, _style?: any, _TESTID?: string) => {
    const { preloader, alert, popupMenu, select, imageViewer } = this.props;
    return (
      <>
        {childs}
        {!!preloader && <Preloader />}
        {!!alert && <Alert />}
        {!!popupMenu && <PopupMenu />}
        {!!select && <Select />}
        <ImageViewer />
      </>
    );
  };
}

export default Page