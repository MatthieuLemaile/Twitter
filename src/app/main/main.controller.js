export class MainController {
  constructor (TwitterService,$interval) {
    'ngInject';
    const intervalValue=3500;
    this.$interval = $interval;
    this.twitterService = TwitterService;
    this.getTweets();
    this.$interval(()=>{
      this.getTweets();
    },intervalValue);
  }

  getTweets(){
    this.twitterService.getTweets().then((response) => {
      this.tweets = response;
    })
  }

  deleteTweet(tweet){
    this.twitterService.deleteTweet(tweet).then(()=>{
      this.getTweets();
    });

  }
}
