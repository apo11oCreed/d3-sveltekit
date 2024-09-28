/* global fetch */
import { APIKEY, APISTRING } from "$lib/js/constants.js"

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