export class MainController {
  constructor () {
    'ngInject';
    this.array= [1,5,7,2,12,-5,1,8,4];
    this.date = new Date();
  }
  clearInput(){
    this.name="";
  }
}
