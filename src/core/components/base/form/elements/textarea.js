import React from 'react'
import InputLib from '@core/components/base/input'
import { getColor } from '@tailwind'
import FormElement from '@core/components/abstract/formElement'
import Helpers from '@core/helpers'

export class TextArea extends FormElement {
  element;

  getValue = () => {
    return this.element?.getState().value
  }

  update = value => {
    return this.element?.changeState({ value })
  }

  reset = () => {
    return this.element?.changeState({
      value: this.props.element.defaultValue,
      isBlured: false,
      isFocused: false,
      showPassword: false
    })
  }

  clear = () => {
    return this.element?.changeState({
      value: '',
      isBlured: false,
      isFocused: false,
      showPassword: false
    })
  }

  render() {
    const { element, onChangeValue } = this.props
    return (
      <TextArea
        placeholderTextColor={getColor('grey')}
        onChangeValue={onChangeValue}
        {...element}
        element={element}
        validate={this.validate}
        _ref={ref => (this.element = ref)}
      />
    )
  }
}

export default TextArea
