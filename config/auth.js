// config/auth.js

// expose our config directly to our application using module.exports
module.exports = {
    'facebookAuth' : {
        'clientID'      : process.env.FB_CLIENT_ID || '', // your App ID
        'clientSecret'  : process.env.FB_CLIENT_SECRET || '', // your App Secret
        'callbackURL'   : process.env.FB_CALLBACK_URL || ''
    },

    'googleAuth' : {
        'clientID'      : process.env.GA_CLIENT_ID || '',
        'clientSecret'  : process.env.GA_CLIENT_SECRET || '',
        'callbackURL'   : process.env.GA_CALLBACK_URL || ''
    }

};