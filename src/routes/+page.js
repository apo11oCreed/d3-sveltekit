import { ApiConfig } from "$lib/js/classes.js"
import { TYPES } from "$lib/js/constants.js"
import "$lib/css/styles.stylus"
export const prerender = true

const types = TYPES;
  
export function _buildData(){
    // Request and push routes of each rail to mbta in store
    let mbta = {
        routes: []
    };
    types.forEach(type=>{
      let rail = new ApiConfig(type.id,'routes?filter[type]=');
      
      rail.requestId = type.id;
      rail.requestString = type.id;
      
      rail.apiRequest()
      .then(data=>{
          return mbta.routes[type.id]=data;
      });
    });
    
    return mbta;
}