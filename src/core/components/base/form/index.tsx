import React from 'react';
import { View } from 'react-native';
import Helpers from '@core/helpers';
import { connect } from 'react-redux';
import * as yup from 'yup';
import axios from 'axios';
import Element from '@core/components/base/form/element'
import { ElementTypes as BaseElementTypes } from '@core/components/base/form/elements'
import { ElementTypes as CustomElementTypes } from '@components/base/form/elements'
import MSGS from '@configs/validationMsgs';
import { setPreloader } from '@core/generated/actions';
import { bindActionCreators } from 'redux';
import Log from '@core/helpers/log';

interface P {
  url?: string
  method?: string
  wrapperProps?: any
  elements?: any[]
  formRef?: Function
  model?: any
  onError?: Function
  setPreloader: Function
  requestType?: string
}
export class Form extends React.Component<P> {
  static BaseElementTypes = BaseElementTypes;

  static CustomElementTypes = CustomElementTypes;

  static Validation = {
    default: yup.string().required(MSGS.required),
    email: yup.string().email(MSGS.email).required(MSGS.required),
    login: yup.string().min(6, MSGS.length).required(MSGS.required),
    password: yup.string().min(8, MSGS.length).required(MSGS.required),
    room: yup.number().typeError(MSGS.number).required(MSGS.required),
    confirm_password: yup.string().required(MSGS.required),
    confirm_password_front: yup
      .string()
      .oneOf([yup.ref('password'), null], MSGS.passDifferents)
      .required(MSGS.required),
  }
  elements: any;
  static defaultProps: { url: string; method: string; wrapperProps: {}; elements: never[]; formRef: () => boolean; };

  constructor(props: any) {
    super(props)
    this.state = {}

    if (props.formRef) {
      props.formRef(this)
    }

    this.elements = {}
  }

  resultHandler = (status: string, data: any, cb: Function, body: any) => {
    const { elements, onError } = this.props;
    if (status) {
      if (cb) cb({ body, data })
    }
    else {
      let errors: any = {};
      let onlyInputs = elements

      if (!data.message) {
        errors = { [`${onlyInputs && onlyInputs[0].name}Error`]: 'Ошибка' };
      } else if (typeof data.message === 'string') {
        errors = { [`${onlyInputs && onlyInputs[0].name}Error`]: data.message };
      } else {
        Object.keys(data.message).map((name) => {
          errors[`${name}Error`] = data.message[name];
        });
      }
      if (onError && typeof onError === 'function') onError({ status, errors })
      this.setState(errors);
    }
  }

  onSubmitNative = (e: any, cb: Function, body: any) => {
    const { url, method } = this.props;
    const settings: any = { url, method, body }
    return Helpers.fetch(settings, this.props.setPreloader)
      .then(({ status, data }) => this.resultHandler(status, data, cb, body));
  }

  onSubmitAxios = async (e: any, cb: Function, body: any) => {
    const url: any = this.props.url;
    let formData = new FormData();
    Object.keys(body).forEach((name) => {
      if (name === 'images') {
        body[name].forEach((img: any) => {
          formData.append('files', {
            name: `${Helpers.randomKey(10)}.jpg`,
            type: 'image/jpeg',
            uri: img.source.uri,
          });
        });
      }
      else {
        let element = this.props.elements?.find(element => element.name === name);
        let value = body[name];
        if (element.beforeSendFormatter) {
          value = element.beforeSendFormatter(value)
        }
        formData.append(name, value);
      }
    })

    this.props.setPreloader(true)

    let result = await axios
      .post(url, formData)
      .then((res) => {
        const { status, data } = res.data;
        this.resultHandler(status, data, cb, body)
      })

    this.props.setPreloader(false)

    return result
  }

  getValue = (name: string | number) => {
    return this.elements[name].getValue()
  }

  onSubmit = async (e: any, cb: Function) => {
    const request = this.props.requestType === 'axios' ? this.onSubmitAxios : this.onSubmitNative;
    let body: any = {};
    let isValid = true;
    Object.keys(this.elements).forEach((element: string) => {
      if (element && this.elements[element]) {
        if (this.elements[element].getValue()) {
          body[element] = this.elements[element].getValue();
        }
        let fieldIsValid = this.elements[element].isValid();
        if (!fieldIsValid) {
          this.elements[element].showErrors();
          isValid = fieldIsValid;
        }
      }
    });

    if (isValid) {
      if (this.props.url) {
        await request(e, cb, body)
      }
      else {
        cb({ body })
      }
    }
  };

  reset = (fieldNames: string[] = []) => {
    let elements = Object.keys(this.elements)
    if (fieldNames && fieldNames.length) {
      elements = elements.filter((name: string) => fieldNames?.indexOf(name) !== -1)
    }

    elements.forEach((name => {
      this.elements[name].reset()
    }))
  }

  clear = (fieldNames: string[] = []) => {
    let elements = Object.keys(this.elements)
    if (fieldNames && fieldNames.length) {
      elements = elements.filter((name: string) => fieldNames?.indexOf(name) !== -1)
    }

    elements.forEach((name => {
      this.elements[name].clear()
    }))
  }


  update = (fieldNames: any = {}) => {
    if (fieldNames) {
      Object.keys(fieldNames).forEach(name => {
        this.elements[name].update(fieldNames[name])
      })
    }
  }

  render() {
    const { wrapperProps, elements, model } = this.props;

    return (
      <View {...wrapperProps}>
        {elements?.map((element, key) => {
          const _state: any = this.state;
          const _element: any = {
            ...element,
            externalError: _state[`${element.name}Error`]
          }
          return <Element
            element={_element}
            getElements={() => this.elements}
            key={key}
            onSubmit={this.onSubmit}
            _ref={(name: any, elementInstance: any) => this.elements[name] = elementInstance}
            {..._element}
          />
        })}
      </View>
    )
  }
}

Form.defaultProps = {
  url: '',
  method: 'POST',
  wrapperProps: {},
  elements: [],
  formRef: () => false
}

export default connect(undefined, (dispatch) => bindActionCreators({ setPreloader }, dispatch))(Form)