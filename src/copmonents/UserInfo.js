export default class UserInfo {
    constructor({ name, job }) {
        this._name = name;
        this._job = job;
    }
//возвращает объект с данными пользователя
    getUserInfo() {
        return {
            name: this._name.textContent,
            job: this._job.textContent
        }
    }

//принимает новые данные пользователя и добавляет их на страницу
    setUserInfo(name, job) {
        this._name.textContent = name;
        this._job.textContent = job;
    }
}
