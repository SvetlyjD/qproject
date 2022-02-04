import React from 'react'
import { Button } from '@ui-kitten/components'
import { setAlert } from '@core/generated/actions'
import { Image, View } from 'react-native'
import { connect } from 'react-redux'
import tailwind from 'tailwind-rn'
import Helpers from '@core/helpers'
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { faTimes } from '@fortawesome/free-solid-svg-icons'

const mapDispatchToProps = dispatch => {
  return {
    setAlertAction: props => dispatch(setAlert(props))
  }
}

const mapStateToProps = state => {
  return {}
}

export class ImageItem extends React.Component {
  onButtonPress = () => {
    Helpers.log(this.props.item.id)
let c = this.props.item.id;
    //при нажатии модальное окно
    this.props.setAlertAction({
      title: 'Удалить комментарий?',
      buttons: [
        {
          text: 'Да',
          onPress: () => {Helpers.Store.set("del",c)}
        },
        {
          text: 'Нет',
          style: tailwind('text-red')
        }
      ]
    })
  }

  render() {
    const { item } = this.props
    return (
      <View style={tailwind('flex  ml-2 mt-2 mb-2')}>
        <Image source={{ uri: item.url }} style={{ width: 80, height: 80 }} />
        <Button
          // appearance="ghost"
          style={tailwind('absolute left-10 top-0 w-5 h-5 z-30')}
          onPress={this.onButtonPress}>
          <FontAwesomeIcon
            style={tailwind('text-white')}
            icon={faTimes}
            size={20}
          />
        </Button>
      </View>
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ImageItem)
