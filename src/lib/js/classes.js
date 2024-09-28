/* global fetch */
//https://www.sitepoint.com/javascript-private-class-fields/
const APIKEY = '1b8be318d66b41ba87c7e47dd32db7a4';
const APISTRING = 'https://api-v3.mbta.com/';

export class ApiConfig {
  #key;
  constructor(input,api){
    this.#key = APIKEY;
    this.api = `${APISTRING}${api}`;
    this.request = '';
    this.id = '';
  }
  set requestDate(input){
    this.date = this.formatDate(input);
  }
  get requestDate(){
    return this.data;
  }
  formatDate(date = new Date()){// If no date defined, set as new Date()
    return `${date.getFullYear()}-${('0' + (+(date.getMonth()) + 1)).slice(-2)}-${('0' + date.getDate()).slice(-2)}`;
  }
  
  set requestId(input){
    //this.id = `${this.api}${input}&api_key=${this.#key}`;
    this.id = input;
  }
  get requestId(){
    return this.id;
  }
  
  set requestString(input){
    this.request = `${this.api}${input}&api_key=${this.#key}`;
  }
  get requestString(){
    //https://www.sitepoint.com/community/t/how-do-i-use-promise-in-an-variable-assignment-statement-in-a-getter-function/429614
    return this.request;
  }
  apiRequest=async ()=>{
    
    return await fetch(this.request)
    .then(res=>{
      let response = res.json();
      return response;
    })
    .then(response=>{
      return response.data;
    });
    
  };
}