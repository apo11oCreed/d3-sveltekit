import { APIKEY, APISTRING } from "$lib"

interface Config {
  _key: string;
  api: string;
  request: string;
  id: string;
}

export class ApiConfig implements Config {
  _key: string;
  api: string;
  request: string;
  id: string;
  constructor(api:string){
    this._key = APIKEY;
    this.api = `${APISTRING}${api}`;
    this.request = '';
    this.id = '';
  }
  // set requestDate(input){
  //   this.date = this.formatDate(input);
  // }
  // get requestDate(){
  //   return this.data;
  // }
  // formatDate(date = new Date()){// If no date defined, set as new Date()
  //   return `${date.getFullYear()}-${('0' + (+(date.getMonth()) + 1)).slice(-2)}-${('0' + date.getDate()).slice(-2)}`;
  // }
  
  set requestId(input: string){
    this.id = input;
  }
  get requestId(){
    return this.id;
  }
  
  set requestString(input: string){
    this.request = `${this.api}${input}&api_key=${this._key}`;
  }
  get requestString(){
    //https://www.sitepoint.com/community/t/how-do-i-use-promise-in-an-variable-assignment-statement-in-a-getter-function/429614
    return this.request;
  }
  apiRequest = async()=>{
    
    return await fetch(this.request)
    .then(res=>{
      const response = res.json();
      return response;
    })
    .catch(error=>{
      console.log('THIS IS THE ERROR');
      alert(error);
    })
    .then(res=>{
      return res.data;
    })
    
  };
}