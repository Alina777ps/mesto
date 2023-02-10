export default class UserInfo {
    constructor(name, job) {
        this._name = name;
        this._job = job;
    }
//возвращает объект с данными пользователя
    getUserInfo(nameInput, jobInput) {
        this._name.textContent = nameInput.value;
        this._job.textContent = jobInput.value;
    }
//принимает новые данные пользователя и добавляет их на страницу
    setUserInfo(nameInput, jobInput) {
        nameInput.value = this._name.textContent;
        jobInput.value = this._job.textContent;
    }
}
