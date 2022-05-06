element = document.querySelector('st-popup-menu');
element.addEventListener('show', (e) => {
  // Reference to popup html node
  console.log('show', e.detail);
});

element.addEventListener('hide', (e) => {
  // Reference to popup html node
  console.log('hide', e.detail);
});

element.addEventListener('click', (e) => {
  // Reference to popup html node
  console.log('click', e);
});