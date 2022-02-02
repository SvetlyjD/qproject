import React from 'react';
import InputLib from '@core/components/base/input'
import { getColor } from '@tailwind';
import FormElement from '@core/components/abstract/formElement';
import Helpers from '@core/helpers';

export class Input extends FormElement {
  element;

  getValue = () => {
    return this.element?.getState().value
  }

  isValid = () => {
    return this.validate(this.element.getState()).status
  }

  validate = (state, defaultInput = { status: 'control' }) => {
    const { element, validate } = this.props;
    if (validate) return validate(state)
    return Helpers.validate(
      {
        [element.name]: element.validation,
      },
      { [element.name]: state.value },
      state.changed,
      element.externalError,
      defaultInput,
    )
  }

  showErrors = () => {
    return this.element?.changeState({ isBlured: true, isFocused: false })
  }

  update = (value) => {
    return this.element?.changeState({ value })
  }

  reset = () => {
    return this.element?.changeState({ value: this.props.element.defaultValue, isBlured: false, isFocused: false, showPassword: false })
  }

  clear = () => {
    return this.element?.changeState({ value: '', isBlured: false, isFocused: false, showPassword: false })
  }

  render() {
    const { element, onChangeValue, mult, minHeight } = this.props
    return <InputLib
      placeholderTextColor={getColor('grey')}
      onChangeValue={onChangeValue}
      multiline={mult}
      textStyle={minHeight}
      {...element}
      element={element}
      validate={this.validate}
      _ref={ref => this.element = ref}
    />
  }
}

export default Input;