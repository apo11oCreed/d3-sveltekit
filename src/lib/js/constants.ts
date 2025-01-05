//https://www.sitepoint.com/javascript-private-class-fields/
const APIKEY = '1b8be318d66b41ba87c7e47dd32db7a4';
const APISTRING = 'https://api-v3.mbta.com/';
const TYPES = [
  {
    'id': '0',
    'name': 'Light Rail'
  },
  {
    'id': '1',
    'name': 'Heavy Rail'
  },
  {
    'id': '2',
    'name': 'Commuter Rail'
  },
  {
    'id': '3',
    'name': 'Bus'
  },
  {
    'id': '4',
    'name': 'Ferry'
  }
];
  
const SUBWAYCOLORS = [
{'Mattapan': '#da291c'},
{'Green-C': '#00843d'},
{'Green-D': '#00843d'},
{'Green-B': '#00843d'},
{'Green-E': '#00843d'},
{'Orange': '#ed8b00'},
{'Blue': '#003da5'},
{'Red': '#da291c'}
];
  
export { APIKEY, APISTRING, TYPES, SUBWAYCOLORS };