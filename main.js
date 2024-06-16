document.addEventListener("DOMContentLoaded", function() {
    const body = document.querySelector("body");
    const content = document.querySelector(".content");
  
    function initializeNavside() {
        const darkLight = document.querySelector("#darkLight");
        const sidebar = document.querySelector(".sidebar");
        const submenuItems = document.querySelectorAll(".submenu_item");
        const sidebarOpen = document.querySelector("#sidebarOpen");
  
        darkLight.addEventListener("click", () => {
            body.classList.toggle("dark");
            darkLight.classList.toggle("fa-moon");
            darkLight.classList.toggle("fa-sun");
        });
  
        sidebarOpen.addEventListener("click", function() {
            sidebar.classList.toggle("close");
            if (sidebar.classList.contains("close")) {
                content.style.marginLeft = "0";
            } else {
                content.style.marginLeft = "260px";
            }
        });
  
        submenuItems.forEach(function(item) {
            item.addEventListener("click", function() {
                item.classList.toggle("show_submenu");
                submenuItems.forEach(function(otherItem) {
                    if (item !== otherItem) {
                        otherItem.classList.remove("show_submenu");
                    }
                });
            });
        });
  
        function updateSidebar() {
            if (window.innerWidth < 768) {
                sidebar.classList.add("close");
                content.style.marginLeft = "0";
            } else {
                sidebar.classList.remove("close");
                if (!sidebar.classList.contains("hoverable")) {
                    content.style.marginLeft = "260px";
                }
            }
        }
  
        window.addEventListener("load", updateSidebar);
        window.addEventListener("resize", updateSidebar);
  
        // Active warna menu sidebar ketika membuka sebuah halaman
        const currentPage = window.location.pathname.split('/').pop();
        const menuItems = document.querySelectorAll('.nav_link');
  
        menuItems.forEach(item => {
            const itemPage = item.getAttribute('href');
            if (itemPage === currentPage) {
                item.classList.add('active');
            }
        });
  
        // Menutup Sidebar ketika di klik di luar sidebar
        document.addEventListener("click", function(event) {
            if (!sidebar.contains(event.target) && !sidebarOpen.contains(event.target) && !sidebar.classList.contains("close")) {
                sidebar.classList.add("close");
                content.style.marginLeft = "0";
            }
        });
    }
  
    function includeHTML() {
        const includes = document.querySelectorAll('[data-include]');
        includes.forEach(el => {
            const file = el.getAttribute('data-include');
            fetch(file)
                .then(response => response.text())
                .then(data => {
                    el.innerHTML = data;
                    el.removeAttribute('data-include');
                    initializeNavside(); // Initialize the navside after it is loaded
                })
                .catch(error => console.error('Error loading navside:', error));
        });
    }
  
    includeHTML();
  });
  