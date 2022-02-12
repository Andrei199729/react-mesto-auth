class Api {
    constructor({ address, token }) {
        this.address = address;
        this.token = token;
    }

    _getResponseData(res) {
        return res.ok ? res.json() : Promise.reject(new Error(`Ошибка: ${res.status}`));
    } 

    getInitialCards() {
        return fetch(`${this.address}/cards`, {
            headers: {
                authorization: this.token
            }
        })
            .then(this._getResponseData);
    }

    getAboutUser() {
        return fetch(`${this.address}/users/me`, {
            headers: {
                authorization: this.token
            }
        })
            .then(this._getResponseData)
    }

    editProfile(data) {
        return fetch(`${this.address}/users/me`, {
            method: 'PATCH',
            headers: {
                authorization: this.token,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                name: data.name,
                about: data.about
            })
        })
            .then(this._getResponseData)
    }

    addCard(data) {
        return fetch(`${this.address}/cards`, {
            method: 'POST',
            headers: {
                'authorization': `${this.token}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                name: data.name,
                link: data.link
            })
        })
            .then(this._getResponseData)
    }

    deleteCard(dataId) {
        return fetch(`${this.address}/cards/${dataId}`, {
            method: 'DELETE',
            headers: {
                'authorization': this.token,
                'Content-Type': 'application/json'
            }
        })
            .then(this._getResponseData)
    }

    changeLikeCardStatus(dataId, isLiked) {
        const method = isLiked ? 'DELETE' : 'PUT';
        return fetch(`${this.address}/cards/${dataId}/likes`, {
            method,
            headers: {
                'authorization': this.token,
                'Content-Type': 'application/json'
            }
        })
            .then(this._getResponseData)
    }

    updateAvatar(data) {
        return fetch(`${this.address}/users/me/avatar`, {
            method: 'PATCH',
            headers: {
                'authorization': this.token,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                avatar: data.avatar
            })
        })
            .then(this._getResponseData)
    }
}

const api = new Api({
    address: 'https://mesto.nomoreparties.co/v1/cohort-32',
    token: 'f0863dcb-641a-48c7-ae1b-e19e122bd627'
});

export default api;