import { ApiConfig } from "$lib/js/classes.js"
import { TYPES } from "$lib/js/constants.js"
import "$lib/css/styles.styl"
export const prerender = true

const types = TYPES;
  
export function _buildData(){
    // Request and push routes of each rail to mbta in store
    let mbta = {
        rails:{}
    };
    
    types.forEach(type=>{
      let rail = new ApiConfig(type.id,'routes?filter[type]=');
      
      rail.requestId = type.id;
      rail.requestString = type.id;
      
      rail.apiRequest()
      .then(data=>{
          return mbta.rails[type.id] = {name:type.name,data:data};
      });
    });
    
    return mbta;
}