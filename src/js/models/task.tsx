import Model from '@core/components/abstract/model';
import React from 'react'
import { BASEURL, PORT } from '@core/generated/config';
import Helpers from '@core/helpers';
import { Image, Text, View } from 'react-native';
import { tailwind } from '@tailwind';
import style from '../style'
import Button from '@core/components/base/form/elements/button';

export class TaskModel extends Model {
  get config() {
    return ({
      load: { request: { url: `${BASEURL}:${PORT}/issues/get`, body: { issue: String(this.id) } } },
      save: { request: { url: `${BASEURL}:${PORT}/issues/update`, body: { issue: String(this.id) } } },
      delete: { request: { url: `${BASEURL}:${PORT}/issues/delete` } },
    })
  }

  render () {
    Helpers.log("вот эта lheufz хуйня", this.delet);
    return (
      <View style={tailwind('flex ml-2 mt-2 mb-2')}>
        <Image source={{ uri: this.data }} style={{ width: 80, height: 80 }}></Image>
        <View
                  style={{
            ...tailwind('absolute mt-0 mb-2 w-5 h-5 bg-blue text-white'),
            ...style.mainImageClose
          }}>
         <View  > 
          <Text onPress={()=>this.delet(this.igd)}>
            X
          </Text>
         </View>
          
        </View>
       </View>
    )
  }
}
export default TaskModel; 