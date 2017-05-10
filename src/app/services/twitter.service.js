export class TwitterService{
  constructor($http){
    'ngInject';
    this.$http = $http;
    this.url = 'http://10.0.1.137:8080/api'
  }

  getTweets(pageNumber){
    return this.$http.get(`${this.url}/tweets?size=30&page=${pageNumber}&sort=createdDate,desc`).then(
      (response) => {
        let formattedTweets = [];
        let tweets = response.data._embedded.tweet;
        tweets.forEach((elem)=>{
          let formattedTweet = this.createBasicTweet(elem);
          formattedTweets.push(formattedTweet);
        });

        //create an array of new tweet
        // return the array
        return {tweets: formattedTweets,maxPage: response.data.page.totalPages};
    });
  }

  createBasicTweet(data){
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

  createTweet(tweet){
    return this.$http.post(`${this.url}/tweets`,tweet,null);
  }
}
