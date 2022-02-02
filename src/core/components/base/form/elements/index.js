import keysEqualValuesObject from '@helpers/keysEqualValuesObject'
import Button from './button'
import Submit from './submit'
import Input from './input'
import Password from './password'
import Text from './text'
import Confirm_password from './confirm_password'
import TextArea from './textarea'

export const Elements = {
  Button,
  Submit,
  Input,
  Password,
  Text,
  Confirm_password
}

export const ElementTypes = keysEqualValuesObject(Elements)
export default Elements
