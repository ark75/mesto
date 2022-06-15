export default class UserInfo {
  constructor({profileSelectors}) {
    this._profileName = document.querySelector(profileSelectors.name);
    this._profileJob = document.querySelector(profileSelectors.job);
    this._profileAvatar = document.querySelector(profileSelectors.avatar),
      this._id = ''
  };

  getUserInfo() {
    return {
      name: this._profileName.textContent,
      job: this._profileJob.textContent,
      avatar: this._profileAvatar.src
    };
  };

  setUserInfo({name, job}) {
    this._profileName.textContent = userData.name;  //передаю значения полей попапа на страницу
    this._profileJob.textContent = userData.about;  //передаю значения полей попапа на страницу
    this._id = userData._id;
    this._profileAvatar.src = userData.avatar;
  };
  getId() {
    return this._id;
  }
};
