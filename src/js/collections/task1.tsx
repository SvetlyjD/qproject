import React from 'react'
import Collection from '@core/components/abstract/collection';
import { BASEURL, PORT } from '@core/generated/config';
import TaskModel from '../models/task';

export class TaskCollection extends Collection {
  get model() {
    return TaskModel;
  }

  get config() { 
    return {
      load: () => [
         { id:0, item: 'https://cdn.trend.az/2016/07/21/pokemon_210716_01.jpg' },
         { id:1, item: 'https://autogear.ru/misc/i/gallery/14342/1365801.jpg' },
         { id:2, item: 'https://www.youloveit.ru/uploads/gallery/main/162/vaporeon.png', },
         { id:3, item: 'https://pokemon-go.name/wp-content/uploads/2019/07/027-pokemon-sandshrew.png' },
         { id:4, item: 'https://static.wikia.nocookie.net/pokemon/images/e/e2/133Eevee.png/revision/latest/smart/width/250/height/250?cb=20130818174825&path-prefix=ru' },
                    ],
      del:(item:any)=>{item.remove()}

                  }

    }



  async load() {
    const arr = this.config.load();
         this.list = {};
    arr.map((item: any) => {
      this.list[item.id] = new this.model({ id: item.id, data: item.item })
      this.list[item.id].parent = this;
      this.list[item.id].igd = item.id;
      // this.list[item.id].delet =this.config.del
      this.list[item.id].prepareData()
    })

      if (this.onLoad) {
      this.onLoad(this)
    }
    return arr;
  }
} 
 


export default TaskCollection;