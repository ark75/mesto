export default class UserInfo {
  constructor({popupProfileNameSelector, popupProfileJobSelector}) {
    this._profileName = document.querySelector(popupProfileNameSelector);
    this._profileJob = document.querySelector(popupProfileJobSelector);
  };

  getUserInfo() {
    return {
      name: this._profileName.textContent,
      job: this._profileJob.textContent
    };
  };

  setUserInfo({name, job}) {
    this._profileName.textContent = name;
    this._profileJob.textContent = job;
  };
};
