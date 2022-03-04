const ENV = process.env.NODE_ENV;
const api = ENV === 'development' ? "http://localhost:3003" : "http://dev.jealh.xyz";
export default {
    api: api,
    SESSION_NAME: '--session-id--',
    MAIL_COOLDOWN: 60,
    TASK_FINISH: 'success',
    TASK_ONGOING: 'ongoing'
}