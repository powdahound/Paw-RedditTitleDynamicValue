(function() {
  var RedditTitleDynamicValue = function() {
    this.api_url_base = "https://www.reddit.com/";

    this.evaluate = function() {
      const request = new NetworkHTTPRequest();
      request.requestUrl = this.api_url_base + 'r/' + this._getSubreddit() + '.json';
      request.method = 'GET';
      request.send();

      const response = JSON.parse(request.responseBody);
      const posts = response.data.children;
      const postNum = Math.floor(Math.random() * posts.length);

      return response.data.children[postNum].data.title;
    };

    this.title = function() {
      return "Random Reddit Title";
    };

    this.text = function() {
      return "/r/" + this._getSubreddit();
    };

    // Simulate default value for subreddit config
    // https://github.com/luckymarmot/Paw-Issues/issues/25
    this._getSubreddit = function() {
      if (!this.subreddit) {
        return 'all';
      }
      return this.subreddit;
    }
  };

  RedditTitleDynamicValue.identifier = "com.powdahound.PawExtensions.RedditTitleDynamicValue";

  RedditTitleDynamicValue.title = "Random Reddit Title Dynamic Value";

  RedditTitleDynamicValue.inputs = [
    DynamicValueInput("subreddit", "Subreddit name", "String")
  ];

  registerDynamicValueClass(RedditTitleDynamicValue);

}).call(this);
