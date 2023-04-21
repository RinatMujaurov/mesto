export default class Api {
  constructor(baseUrl, token) {
    this._baseUrl = baseUrl;
    this._headers = {
      authorization: token,
      "Content-Type": "application/json",
    };
  }

  _getResponseData(res) {
    if (!res.ok) {
        return Promise.reject(`Ошибка: ${res.status}`);
    }
    return res.json();
  }

  getUserInfo() {
    return fetch(this._baseUrl + "/users/me", {
      method: "GET",
      headers: this._headers,
    }).then((res) => this._getResponseData(res));
  }

  setUserInfo(data) {
    return fetch(this._baseUrl + "/users/me", {
      method: "PATCH",
      headers: this._headers,
      body: JSON.stringify(data),
    }).then((res) => this._getResponseData(res));
  }

  getInitialCards() {
    return fetch(this._baseUrl + "/cards", {
      method: "GET",
      headers: this._headers,
    }).then((res) => this._getResponseData(res));
  }

  addCard(data) {
    return fetch(this._baseUrl + "/cards", {
      method: "POST",
      headers: this._headers,
      body: JSON.stringify(data),
    }).then((res) => this._getResponseData(res));
  }

  deleteCard(cardId) {
    return fetch(this._baseUrl + "/cards/" + cardId, {
      method: "DELETE",
      headers: this._headers,
    }).then((res) => this._getResponseData(res));
  }

  putLike(cardId) {
    return fetch(this._baseUrl + "/cards/" + cardId + "/likes", {
      method: "PUT",
      headers: this._headers,
    }).then((res) => this._getResponseData(res));
  }

  deleteLike(cardId) {
    return fetch(this._baseUrl + "/cards/" + cardId + "/likes", {
      method: "DELETE",
      headers: this._headers,
    }).then((res) => this._getResponseData(res));
  }

  setAvatar(data) {
    return fetch(this._baseUrl + "/users/me/avatar", {
      method: "PATCH",
      headers: this._headers,
      body: JSON.stringify(data),
    }).then((res) => this._getResponseData(res));
  }
}
