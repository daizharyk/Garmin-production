document.querySelectorAll('.nav-menu').forEach(menu => {
  menu.addEventListener('mouseover', () => {
    const dropdownClass = menu.classList.contains('smartwatches') ? '.smartwatches-dropdown' : '.marine-dropdown';
    const dropdown = document.querySelector(dropdownClass);
    

    dropdown.style.display = 'flex';
    

    dropdown.addEventListener('mouseover', () => {
      dropdown.style.display = 'flex';
    });


    dropdown.addEventListener('mouseout', () => {
      dropdown.style.display = 'none';
    });
  });

  menu.addEventListener('mouseout', () => {
    const dropdownClass = menu.classList.contains('smartwatches') ? '.smartwatches-dropdown' : '.marine-dropdown';
    const dropdown = document.querySelector(dropdownClass);
    dropdown.style.display = 'none';
  });
});