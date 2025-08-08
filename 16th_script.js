// Intersection animation for cards
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

// Fade-in on load
window.addEventListener('DOMContentLoaded', () => {
  document.body.classList.add('fade-in');
});



const timeline = document.getElementById('timeline');
const rightBtn = document.getElementById('scrollRight');

// When the button is clicked, scroll by the width of the visible wrapper
rightBtn.addEventListener('click', () => {
  const scrollWrapper = document.querySelector('.scroll-wrapper');
  const scrollAmount = scrollWrapper.offsetWidth; // width of visible area
  timeline.scrollBy({ left: scrollAmount, behavior: 'smooth' });
});
