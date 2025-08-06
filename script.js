document.querySelectorAll('.century').forEach(link => {
    link.addEventListener('click', function (e) {
        e.preventDefault();
        const href = this.getAttribute('href');

        const container = document.querySelector('.timeline-container');
        const rect = container.getBoundingClientRect();
        const clickedRect = this.getBoundingClientRect();

        // Calculate the center of the clicked element relative to the container
        const originX = clickedRect.left + clickedRect.width / 2 - rect.left;
        const originY = clickedRect.top + clickedRect.height / 2 - rect.top;

        // Set the transform origin based on clicked element
        container.style.transformOrigin = `${originX}px ${originY}px`;

        // Add zoom-out class
        container.classList.add('zooming-out');

        // Wait for animation then redirect
        setTimeout(() => {
            window.location.href = href;
        }, 600);
    });
});
// Dataset of terms and corresponding HTML files
const dataset = [
    { name: "KHORENTASI", file: "kh.html" },
    { name: "EXAMPLE1", file: "example1.html" },
    { name: "EXAMPLE2", file: "example2.html" },
    // Add more entries here...
  ];
  
  const searchIcon = document.getElementById('searchIcon');
  const searchInput = document.getElementById('searchInput');
  
  // Toggle search input visibility when icon clicked
  searchIcon.addEventListener('click', () => {
    if (searchInput.classList.contains('active')) {
      searchInput.classList.remove('active');
      searchInput.value = '';
    } else {
      searchInput.classList.add('active');
      searchInput.focus();
    }
  });
  
  // Accessibility: toggle search input on Enter or Space key on icon
  searchIcon.addEventListener('keydown', (e) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      searchIcon.click();
    }
  });
  
  // Handle Enter key inside search input to trigger search
  searchInput.addEventListener('keydown', (e) => {
    if (e.key === "Enter") {
      handleSearch();
    }
    if (e.key === "Escape") {
      searchInput.classList.remove('active');
      searchInput.value = '';
    }
  });
  
  function handleSearch() {
    let query = searchInput.value;
    query = query.trim().replace(/\s+/g, ' ').toUpperCase();
  
    const result = dataset.find(entry => entry.name === query);
    if (result) {
      window.location.href = result.file;
    } else {
      alert("No page found for: " + query);
    }
  }
  
  