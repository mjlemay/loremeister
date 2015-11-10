// config/auth.js

// expose our config directly to our application using module.exports
module.exports = {

    'facebookAuth' : {
        'clientID'      : '1642093399364058', // your App ID
        'clientSecret'  : 'dcd0f28968da59bf08ce383bd84c6f85', // your App Secret
        'callbackURL'   : 'http://localhost:3000/user/auth/facebook/callback'
    },

    'googleAuth' : {
        'clientID'      : '179299479745-8bdfbkt8j8unfr86nsj035bgj9sum18i.apps.googleusercontent.com',
        'clientSecret'  : 'bWhCRSjqLFB5acQDWZ9QimvK',
        'callbackURL'   : 'http://localhost:3000/user/auth/google/callback'
    }

};