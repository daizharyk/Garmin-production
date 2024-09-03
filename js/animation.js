document.querySelectorAll('.nav-menu').forEach(menu => {
  menu.addEventListener('mouseover', () => {
    const dropdownClass = `${menu.classList[1]}-dropdown`;
    const dropdown = document.querySelector(`.${dropdownClass}`);
    

    dropdown.style.display = 'flex';
    

    dropdown.addEventListener('mouseover', () => {
      dropdown.style.display = 'flex';
    });


    dropdown.addEventListener('mouseout', () => {
      dropdown.style.display = 'none';
    });
  });


menu.addEventListener('mouseout', () => {
    const dropdownClass = `${menu.classList[1]}-dropdown`; 
    const dropdown = document.querySelector(`.${dropdownClass}`);
    dropdown.style.display = 'none';
  });
});



document.getElementById('filterSortToggle').addEventListener('click', function () {
  const sidebar = document.getElementById('sidebar');
  const filterDropdown = document.querySelector('.product-filter_dropdown');

  sidebar.style.display = sidebar.style.display === 'none' || sidebar.style.display === '' ? 'block' : 'none';
  filterDropdown.classList.toggle('active'); 
})

document.querySelectorAll('.nav-list-item').forEach(item => {
  item.addEventListener('click', () => {
    document.querySelectorAll('.nav-list-item.active').forEach(activeItem => {
      if (activeItem !== item) {
        activeItem.classList.remove('active');
      }
    });
    item.classList.toggle('active');
  });
});