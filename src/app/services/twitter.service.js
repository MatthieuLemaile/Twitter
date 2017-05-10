export class TwitterService{
  constructor($http){
    'ngInject';
    this.$http = $http;
    this.url = 'http://10.0.1.137:8080/api'
  }

  getTweets(){
    return this.$http.get(`${this.url}/tweets`).then(
      (response) => {
        let formattedTweets = [];
        let tweets = response.data._embedded.tweet;
        tweets.forEach((elem)=>{
          let formattedTweet = this.createTweet(elem);
          formattedTweets.push(formattedTweet);
        });

        //create an array of new tweet
        // return the array
        return formattedTweets;
    });
  }

  createTweet(data){
    let dateFormatted = new Date(
        data.createdDate.year,
        data.createdDate.monthValue-1,
        data.createdDate.dayOfMonth,
        data.createdDate.hour,
        data.createdDate.minute,
        data.createdDate.second
      );
    var tweet = {
      name: data.name,
      message: data.message,
      date: dateFormatted,
      selfLink: data._links.self.href
    }
    return tweet;
  }

  deleteTweet(tweet){
    return this.$http.delete(tweet.selfLink);
  }
}
