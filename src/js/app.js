import Widget from './Widget';

const widget = new Widget('http://localhost:7070/football');

const eventSource = new EventSource(widget.url);
eventSource.addEventListener('action', (evt) => {
  const d = JSON.parse(evt.data);
  widget.addMess(d.type, d.text);
});
eventSource.addEventListener('freekick', (evt) => {
  const d = JSON.parse(evt.data);
  widget.addMess(d.type, d.text);
});
eventSource.addEventListener('goal', (evt) => {
  const d = JSON.parse(evt.data);
  widget.addMess(d.type, d.text);
});
eventSource.addEventListener('end', (evt) => {
  const d = JSON.parse(evt.data);
  widget.addMess(d.type, d.text);
  eventSource.close();
});
eventSource.addEventListener('open', (evt) => {
  widget.addMess('open', evt.data);
});
eventSource.addEventListener('error', () => {
  console.log('error');
});
