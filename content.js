console.log("Elon Tweet Filter extension loaded");

// Function to check if a tweet should be displayed
function shouldDisplayTweet(tweet) {
  console.log("Checking tweet:", tweet);
  const authorElement = tweet.querySelector('a[role="link"][href^="/elonmusk"]');
  if (authorElement) {
    console.log("Found Elon Musk tweet");
    const tweetText = tweet.textContent.toLowerCase();
    return tweetText.includes("spacex") || tweetText.includes("tesla") || tweetText.includes("neuralink");
  }
  return true; // Display tweets from other users
}

// Function to handle a single tweet
function handleTweet(tweet) {
  if (!shouldDisplayTweet(tweet)) {
    console.log("Hiding tweet:", tweet);
    tweet.style.display = "none";
  } else {
    tweet.style.display = ""; // Ensure the tweet is visible
  }
}

// Function to handle tweets
function handleTweets() {
  console.log("Handling tweets");
  const tweets = document.querySelectorAll('article[data-testid="tweet"]:not([data-checked])');
  console.log("Found", tweets.length, "unchecked tweets");
  tweets.forEach(tweet => {
    tweet.dataset.checked = 'true';
    handleTweet(tweet);
  });
}

// Create a MutationObserver to watch for changes in the DOM
const observer = new MutationObserver((mutations) => {
  console.log("DOM changed, handling tweets");
  handleTweets();
});

// Start observing the document with the configured parameters
observer.observe(document.body, { childList: true, subtree: true });

// Run handleTweets initially and periodically
handleTweets();
setInterval(handleTweets, 1000);

// Also run handleTweets on scroll events
window.addEventListener('scroll', handleTweets);

console.log("Elon Tweet Filter extension setup complete");
