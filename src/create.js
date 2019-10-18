export default class Create {
  constructor (read) {
    this.read = read;
    this.form = document.querySelector('.form');
    this.input = document.querySelector('.form__input');

    this.form.addEventListener('submit', this.eventHandler.bind(this));
  }

  async eventHandler (evt) {
    evt.preventDefault();

    const inputValue = this.input.value;

    if (inputValue === ' ') {
      return;
    }
    await this.addListItem(inputValue, this.input);
    this.read.getListItem();
  }

  addListItem (value, inputObj) {
    const hundred = 100,
      randomNum = Math.floor(Math.random() * hundred);

    return fetch('https://test-users-api.herokuapp.com/users', {
      method: 'POST',
      body: JSON.stringify({
        name: value,
        age: randomNum,
      }),
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    })
      .then(inputObj.value = '')
      .catch(error => console.log(`ERROR ${error}`));
  }
}
