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

document.getElementById('filterSortToggle').addEventListener('click',function(){
  const sidebar = document.getElementById('sidebar');
  
  sidebar.classList.toggle('sidebar');
})