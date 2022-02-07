import FormElement from '@core/components/abstract/formElement'

export class BaseGalery extends FormElement {
  constructor(_props) {
    super(_props)
    this.state = {
      images: this.props.element.getActiveImages(),
      title: this.props.element.title,
      style: this.props.element.style,
      onPress: this.props.element.onPress()
    }
  }
}
