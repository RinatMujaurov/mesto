export default class UserInfo {
  constructor({ nameSelector, aboutSelector, avatarSelector }) {
    this._name = document.querySelector(nameSelector);
    this._about = document.querySelector(aboutSelector);
    this._avatar = document.querySelector(avatarSelector);
  }

  getUserInfo() {
    return {
      id: this._id,
      name: this._name.textContent,
      about: this._about.textContent,
      avatar: this._avatar.src,
    };
  }

  setUserInfo({ _id, name, about, avatar }) {
    this._id = _id;
    this._name.textContent = name;
    this._about.textContent = about;
    if (avatar) {
      this._avatar.src = avatar;
    }
  }
}
