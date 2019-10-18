export default class Update {
  constructor (read) {
    this.read = read;
    this.read.list.addEventListener('dblclick', this.handleEvent.bind(this));
  }

  handleEvent (evt) {
    evt.preventDefault();
    this.updateItem(evt);
  }

  updateItem (evt) {
    const clickedEl = evt.target,
      targetInput = clickedEl.previousSibling,
      targetButton = clickedEl.nextSibling;

    if (clickedEl.nodeName === 'SPAN') {
      clickedEl.hidden = true;
      targetInput.hidden = false;
      targetButton.hidden = true;
      targetInput.focus();
      clickedEl.value = targetInput.value;
      targetInput.addEventListener('blur', this.blurEvent);
      targetInput.addEventListener('change', () => {
        this.lookUpTarget(clickedEl, targetInput);
      });
    }
  }

  blurEvent (evt) {
    const targetInput = evt.target,
      targetSpan = targetInput.nextSibling,
      targetButton = targetSpan.nextSibling;

    targetInput.hidden = true;
    targetSpan.hidden = false;
    targetButton.hidden = false;
    targetInput.value = targetSpan.value;
  }

  lookUpTarget (span, input) {
    const oldValue = span.value,
      newValue = input.value;

    fetch('https://test-users-api.herokuapp.com/users/')
      .then(response => response.json())
      .then(listOfUsers => {
        listOfUsers.data.find(el => {
          if (el.name === oldValue) {
            return this.updateTarget(el.id, newValue, el.age);
          }

          return null;
        });
      })
      .catch(error => console.log(`ERROR ${error}`));
  }

  updateTarget (itemId, itemValue, itemAge) {
    return fetch(`https://test-users-api.herokuapp.com/users/${itemId}`, {
      method: 'PUT',
      body: JSON.stringify({
        name: itemValue,
        age: itemAge,
      }),
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    })
      .then(async () => await this.read.getListItem())
      .catch(error => console.log(`ERROR ${error}`));
  }
}
