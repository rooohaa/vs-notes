const btn = document.getElementById('btn');

btn.textContent = 'Send from JS';

btn.addEventListener('click', () => {
  console.log('btn clicked');
});
