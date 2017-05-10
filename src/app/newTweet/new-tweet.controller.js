export class NewTweetController{

  constructor(TwitterService,$state){
    'ngInject';
    this.$state = $state;
    this.twitterService = TwitterService;
    this.name="Ariel";
    this.message="";
  }

  createTweet(){
    var tweet = {
      name: this.name,
      message: this.message
    }
    this.twitterService.createTweet(tweet).then(()=>{
      this.$state.go('home');
    });
  }

  returnHome(){
    this.$state.go('home');
  }

}
