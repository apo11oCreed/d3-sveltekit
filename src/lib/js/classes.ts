import { APIKEY, APISTRING } from "$lib"

export class ApiConfig {
  _key:string;
  api:string;
  request:string;
  id:string;
  constructor(index:string,api:string){
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
  formatDate(date = new Date()){// If no date defined, set as new Date()
    return `${date.getFullYear()}-${('0' + (+(date.getMonth()) + 1)).slice(-2)}-${('0' + date.getDate()).slice(-2)}`;
  }
  
  set requestId(input){
    //this.id = `${this.api}${input}&api_key=${this._key}`;
    this.id = input;
  }
  get requestId(){
    return this.id;
  }
  
  set requestString(input){
    this.request = `${this.api}${input}&api_key=${this._key}`;
  }
  get requestString(){
    //https://www.sitepoint.com/community/t/how-do-i-use-promise-in-an-variable-assignment-statement-in-a-getter-function/429614
    return this.request;
  }
  apiRequest=async ()=>{
    
    return await fetch(this.request)
    .then(res=>{
      const response = res.json();
      return response;
    })
    .then(response=>{
      return response.data;
    });
    
  };
}