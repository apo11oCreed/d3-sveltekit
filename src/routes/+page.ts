import { ApiConfig, TYPES } from "$lib"
import "$lib/css/styles.styl"
export const prerender = true

const types = TYPES;

export function _buildData(){
    // Request and push routes of each rail to mbta in store
    const mbta = {
        rails: {} as { [key: string]: { name: string, routes: object } }
    };
    
    types.forEach((type: object)=>{
      const rail = new ApiConfig(type.id,'routes?filter[type]=');
      
      rail.requestId = type.id;
      rail.requestString = type.id;
      
      rail.apiRequest()
      .then((data: object)=>{
        let routeObjs = [];
        for(let item in data){
          let routeObj = {
            index: item,
            id: data[item as keyof object].id
            //https://stackoverflow.com/a/69198602
          }
          routeObjs.push(routeObj);
        }
        return mbta.rails[type.id] = {
          name:type.name,
          routes:routeObjs
        };
      });
    });
    
    return mbta;
}

//https://www.typescriptlang.org/tsconfig/