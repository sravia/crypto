module.exports = {
    'jwtExpireTime': 60 * 120,
    'jwtSecretKey': "elena",
    'facebookAuth': {
        'clientID': '262770377549118',
        'clientSecret': '63ecb5d93545524e204b1706b9419b2c',
        'callbackURL': 'http://localhost:3000/api/user/auth/facebook/callback',
        'profileURL': 'https://graph.facebook.com/v2.5/me?fields=first_name,last_name,email'
    }
};
