export class TwitterService{
  constructor($http){
    this.http = $http;
    this.url = 'http://10.0.1.137:8080/api'
  }
}
