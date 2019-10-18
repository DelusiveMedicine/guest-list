export default class Delete {
  constructor (read) {
    this.read = read;
    this.read.list.addEventListener('click', this.itemLookup.bind(this));
  }

  itemLookup (evt) {
    evt.preventDefault();
    const targetItem = evt.target;

    if (targetItem.nodeName === 'BUTTON') {
      const parent = targetItem.parentNode;

      fetch('https://test-users-api.herokuapp.com/users/')
        .then(response => response.json())
        .then(listOfUsers => listOfUsers.data.find(el => {
          if (el.name === parent.firstChild.value) {
            return this.deleteItem(el.id, parent);
          }

          return null;
        }))
        .catch(error => console.log(`ERROR ${error}`));
    }
  }

  deleteItem (itemId, itemToDelete) {
    return fetch(`https://test-users-api.herokuapp.com/users/${itemId}`, { method: 'DELETE' })
      .then(itemToDelete.remove())
      .catch(error => console.log(`ERROR ${error}`));
  }
}
