const cards = document.querySelectorAll('.card');

const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('slide-in-from-right'); 
    }
  });
}, {
  threshold: 0.1
});

cards.forEach(card => {
  observer.observe(card);
});


window.addEventListener('DOMContentLoaded', () => {
  document.body.classList.add('fade-in');
});

