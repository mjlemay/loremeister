// config/auth.js

// expose our config directly to our application using module.exports
module.exports = {

    'facebookAuth' : {
        'clientID'      : '1642093399364058', // your App ID
        'clientSecret'  : 'dcd0f28968da59bf08ce383bd84c6f85', // your App Secret
        'callbackURL'   : 'http://localhost:3000/user/auth/facebook/callback'
    },

    'googleAuth' : {
        'clientID'      : 'your-secret-clientID-here',
        'clientSecret'  : 'yourgit-client-secret-here',
        'callbackURL'   : 'http://localhost:3000/auth/google/callback'
    }

};