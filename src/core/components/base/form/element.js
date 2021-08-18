import React from 'react';
import BaseFormElements from '@core/components/base/form/elements'
import CustomFormElements from '@components/base/form/elements'
import { useTheme } from '@ui-kitten/components';

export function Element({ element, onSubmit, onChangeValue, getElements, _ref }) {
  const theme = useTheme();
  let props = { element, onSubmit, onChangeValue, _ref, getElements }

  if (element.style && typeof element.style === 'function') {
    props.element.style = element.style({ theme })
  }

  if (element.render && typeof element.render === 'function') {
    props.element.render = element.render({ theme })
  }

  if (element.condition && !element.condition()) return <></>;

  const CustomElement = CustomFormElements[element.elementType]
  if (CustomElement) return <CustomElement {...props} />

  const BaseElement = BaseFormElements[element.elementType]
  if (BaseElement) return <BaseElement {...props} />

  console.error('Element not found', element.elementType)
  return <></>
}

export default Element;