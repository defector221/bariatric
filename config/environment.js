var environments = {
    staging: {
      FIREBASE_API_KEY: "blabla",
      FIREBASE_AUTH_DOMAIN: "blabla.firebaseapp.com",
      FIREBASE_DATABASE_URL: "https://blabla.firebaseio.com/",
      FIREBASE_PROJECT_ID: "blabla",
      FIREBASE_STORAGE_BUCKET: "blabla.appspot.com",
      FIREBASE_MESSAGING_SENDER_ID: "blabla",
      GOOGLE_CLOUD_VISION_API_KEY: "AIzaSyAFVDJcJu2Pj_62liCZ5ekofsH4abs1Rds"
    },
    production: {
      // Warning: This file still gets included in your native binary and is not a secure way to store secrets if you build for the app stores. Details: https://github.com/expo/expo/issues/83
    }
  };
  function getReleaseChannel() {
    let releaseChannel = null;
    if (releaseChannel === undefined) {
      return "staging";
    } else if (releaseChannel === "staging") {
      return "staging";
    } else {
      return "staging";
    }
  }
  function getEnvironment(env) {
    console.log("Release Channel: ", getReleaseChannel());
    return environments[env];
  }
  var Environment = getEnvironment(getReleaseChannel());
  export default Environment;