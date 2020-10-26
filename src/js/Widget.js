import ball from '../pic/ball.png';
import att from '../pic/attention.png';

export default class Widget {
  constructor(url) {
    this.url = url;
    this.contentTypeHeader = { 'Content-Type': 'application/json' };
    this.form = document.querySelector('.form');
  }

  addMess(type, data) {
    // <div class="mess">
    //   <span class="date">01.01.2020 15:30</span>
    //   <span class="text">Событие 1 происходит здесь и сейчас</span>
    // </div>
    if (type === 'open') {
      const mess = document.createElement('div');
      mess.classList.add('mess');
      this.form.appendChild(mess);
      const date = new Date().toLocaleString();
      const dateEl = document.createElement('span');
      dateEl.classList.add('date');
      dateEl.textContent = date;
      mess.appendChild(dateEl);
      const text = document.createElement('span');
      text.classList.add('text');
      text.textContent = 'Игра началась';
      mess.appendChild(text);
    } else if (type === 'action') {
      const mess = document.createElement('div');
      mess.classList.add('mess');
      this.form.appendChild(mess);
      const date = new Date().toLocaleString();
      const dateEl = document.createElement('span');
      dateEl.classList.add('date');
      dateEl.textContent = date;
      mess.appendChild(dateEl);
      const text = document.createElement('span');
      text.classList.add('text');
      text.textContent = data;
      mess.appendChild(text);
    } else if (type === 'freekick') {
      // <img class="ball image" src="pic/ball.png">
      const mess = document.createElement('div');
      mess.classList.add('mess');
      this.form.appendChild(mess);
      const img = document.createElement('img');
      img.classList.add('attention');
      img.classList.add('image');
      img.src = att;
      mess.appendChild(img);
      const date = new Date().toLocaleString();
      const dateEl = document.createElement('span');
      dateEl.classList.add('date');
      dateEl.textContent = date;
      mess.appendChild(dateEl);
      const text = document.createElement('span');
      text.classList.add('text');
      text.textContent = data;
      mess.appendChild(text);
    } else if (type === 'goal') {
      const mess = document.createElement('div');
      mess.classList.add('mess');
      this.form.appendChild(mess);
      const img = document.createElement('img');
      img.classList.add('ball');
      img.classList.add('image');
      img.src = ball;
      mess.appendChild(img);
      const date = new Date().toLocaleString();
      const dateEl = document.createElement('span');
      dateEl.classList.add('date');
      dateEl.textContent = date;
      mess.appendChild(dateEl);
      const text = document.createElement('span');
      text.classList.add('text');
      text.textContent = data;
      mess.appendChild(text);
    } else if (type === 'end') {
      const mess = document.createElement('div');
      mess.classList.add('mess');
      this.form.appendChild(mess);
      const date = new Date().toLocaleString();
      const dateEl = document.createElement('span');
      dateEl.classList.add('date');
      dateEl.textContent = date;
      mess.appendChild(dateEl);
      const text = document.createElement('span');
      text.classList.add('text');
      text.textContent = 'Игра окончена';
      mess.appendChild(text);
    }
  }
}
