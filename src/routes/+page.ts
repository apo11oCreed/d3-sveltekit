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
        const routeObjs: {}[] = [];
        for(let item in data){
          
          const route = new ApiConfig(type.id,'trips?filter[route]=');
          const routeObj = {};
          let tripCount=0;
          
          route.requestId = data[item as keyof object].id;
          route.requestString = data[item as keyof object].id;
          
          routeObj.id=data[item as keyof object].id;
          //https://stackoverflow.com/a/69198602
          
          route.apiRequest()
          .then((data: object)=>{
            tripCount=data.length;
          }).then(()=>{
            routeObj.trips=tripCount;
            routeObjs.push(routeObj);
          });
        }
        return mbta.rails[type.id] = {
          name:type.name,
          routes: routeObjs
        };
      });
    });
    
    return mbta;
}

//https://www.typescriptlang.org/tsconfig/