export default class Read {
  constructor () {
    this.list = document.querySelector('.guest-list');

    this.getListItem = this.getListItem;
    this.showListItem = this.showListItem;
  }

  getListItem () {
    return fetch('https://test-users-api.herokuapp.com/users/')
      .then(response => response.json())
      .then(obj => this.showListItem(obj))
      .catch(error => console.log(`ERROR ${error}`));
  }

  showListItem (obj) {
    const arrayOfUsers = obj.data,
      fullList = arrayOfUsers.reduce((acc, el) => `${acc}<li class="guest-list__item"><input class="guest-list__item-child" type="text" value="${el.name}" hidden/><span class="guest-list__item-child">${el.name}</span><button class="guest-list__btn">Delete</button></li>`,
        '');

    this.list.innerHTML = fullList;
  }
}
