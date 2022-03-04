const baseUrl = process.env.NODE_ENV ? "http://127.0.0.1:3003" : "http://dev.jealh.xyz"
module.exports = {
    "client_id": "0c6871515bdc120db993",
    "oauth_url": "https://github.com/login/oauth/authorize",
    "client_secret": "fc1ae72a7e0e23cdd4b1425f2d1127e2a3e5fb0b",
    "scope": ['user'],
    "readirect_uri": baseUrl + "/login/github/oauth/callback"
}