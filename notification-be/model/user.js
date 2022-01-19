// {
//     "login": "Jealh-h",
//     "id": 65482530,
//     "node_id": "MDQ6VXNlcjY1NDgyNTMw",
//     "avatar_url": "https://avatars.githubusercontent.com/u/65482530?v=4",
//     "gravatar_id": "",
//     "url": "https://api.github.com/users/Jealh-h",
//     "html_url": "https://github.com/Jealh-h",
//     "followers_url": "https://api.github.com/users/Jealh-h/followers",
//     "following_url": "https://api.github.com/users/Jealh-h/following{/other_user}",
//     "gists_url": "https://api.github.com/users/Jealh-h/gists{/gist_id}",
//     "starred_url": "https://api.github.com/users/Jealh-h/starred{/owner}{/repo}",
//     "subscriptions_url": "https://api.github.com/users/Jealh-h/subscriptions",
//     "organizations_url": "https://api.github.com/users/Jealh-h/orgs",
//     "repos_url": "https://api.github.com/users/Jealh-h/repos",
//     "events_url": "https://api.github.com/users/Jealh-h/events{/privacy}",
//     "received_events_url": "https://api.github.com/users/Jealh-h/received_events",
//     "type": "User",
//     "site_admin": false,
//     "name": "Jealh",
//     "company": null,
//     "blog": "https://jealh.xyz",
//     "location": "undefined",
//     "email": null,
//     "hireable": null,
//     "bio": null,
//     "twitter_username": null,
//     "public_repos": 18,
//     "public_gists": 1,
//     "followers": 1,
//     "following": 16,
//     "created_at": "2020-05-17T06:37:07Z",
//     "updated_at": "2022-01-14T03:03:46Z",
//     "private_gists": 0,
//     "total_private_repos": 1,
//     "owned_private_repos": 1,
//     "disk_usage": 358444,
//     "collaborators": 0,
//     "two_factor_authentication": false,
//     "plan": {
//         "name": "free",
//         "space": 976562499,
//         "collaborators": 0,
//         "private_repos": 10000
//     }
// }

var mongoose = require('mongoose');
const UserInfoSchema = new mongoose.Schema({
    "login": String,
    "name": String,
    "id": Number,
    "avatar_url": String,
})
// 在连接的数据库中创建user表
var UserModoel = mongoose.model('user', UserInfoSchema);
module.exports = UserModoel;
