import Model from '@core/components/abstract/model';
import { BASEURL, PORT } from '@core/generated/config';
import Helpers from '@core/helpers';

export class TaskModel extends Model {
  get config() {
    return ({
      load: { request: { url: `${BASEURL}:${PORT}/issues/get`, body: { issue: String(this.id) } } },
      save: { request: { url: `${BASEURL}:${PORT}/issues/update`, body: { issue: String(this.id) } } },
      delete: { request: { url: `${BASEURL}:${PORT}/issues/delete` } },
    })
  }

  render () {
    return (
      <View style={tailwind('flex ml-2 mt-2 mb-2')}>
        <Image source={{ uri: url }} style={{ width: 80, height: 80 }}></Image>
        <View
          data={index}
          style={{
            ...tailwind('absolute mt-0 mb-2 w-5 h-5 bg-blue'),
            ...style.mainImageClose
          }}>
          <Text style={style.textClose} onPress={() => Task.delete}>
            X
          </Text>
        </View>
      </View>
    )
  }
}
export default TaskModel; 