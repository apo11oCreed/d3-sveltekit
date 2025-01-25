import { ApiConfig, TYPES } from "$lib"
import "$lib/css/styles.styl"
export const prerender = true

const types = TYPES;

interface RouteObjs extends Array<object> {}

interface RouteObj {
  id: string,
  trips: number
}

interface Mbta {
  rails: {
    [key: string]: { 
      name: string,
      routes: object
    }
  }
}

export function _buildData(){
    // Request and push routes of each rail to mbta in store
    const mbta: Mbta = {
      rails: {}
    };
    
    types.forEach((type: {id: string, name: string})=>{
      
      const rail = new ApiConfig('routes?filter[type]=');
      
      rail.requestId = type.id;
      rail.requestString = type.id;
      
      rail.apiRequest()
      .then((data: object)=>{
        
        const routeObjs: RouteObjs = [];
        
        for(const item in data){
          
          const route = new ApiConfig('trips?filter[route]=');
          
          let tripCount = 0;
          
          route.requestId = data[item as keyof object].id;
          route.requestString = data[item as keyof object].id;
          
          const routeObj: RouteObj = {
            id: data[item as keyof object].id,
            trips: tripCount
          };
          
          //https://stackoverflow.com/a/69198602
          
          route.apiRequest()
          .then((data: object)=>{// type safety skipped as only the length of trips objects is needed
            tripCount=data.length;
          }).then(()=>{
            routeObj.trips=tripCount;
            routeObjs.push(routeObj);
          });
        }
        return mbta.rails[type.id] = {
          name: type.name,
          routes: routeObjs
        };
      });
    });
    
    return mbta;
}

//https://www.typescriptlang.org/tsconfig/