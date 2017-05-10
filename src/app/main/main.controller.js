export class MainController {
  constructor (TwitterService,$interval,$state) {
    'ngInject';
    const intervalValue=3500;
    this.$state = $state;
    this.$interval = $interval;
    this.twitterService = TwitterService;
    this.range=[];
    this.numPage=0;
    this.getTweets(0);
    this.intervalId = this.$interval(()=>{
      this.getTweets(this.numPage);
    },intervalValue);
  }

  getTweets(pageNumber){
    this.twitterService.getTweets(pageNumber).then((response) => {
      this.tweets = response.tweets;
      this.range=[];
      for(let i=0;i<response.maxPage;i=i+1){
        this.range.push(i);
      }
    })
  }

  deleteTweet(tweet){
    this.twitterService.deleteTweet(tweet).then(()=>{
      this.getTweets();
    });
  }
  newTweet(){
    this.$interval.cancel(this.intervalId);
    this.$state.go('newTweet');
  }
  loadPage(pageNumber){
    this.numPage = pageNumber;
    this.getTweets(pageNumber);
  }
}
