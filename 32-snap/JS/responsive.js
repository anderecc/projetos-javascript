(function(){
    window.addEventListener('resize', trocaMenu)
    trocaMenu();
        function trocaMenu(){
            if (window.innerWidth > 700){
                $Menu.removeAttribute('style');
                $Menu.classList.add('header-menu-desktop');
                $Menu.classList.remove('header-menu-mobile');
                $divImage.innerHTML = '<img src="./images/image-hero-desktop.png" alt="laptop">';
                $LoginRegister.classList.remove('efeito-li')
                $spanHeader.setAttribute("style", "display:none;")

            } else if(window.innerWidth <= 700){
                $Menu.setAttribute("style", "display:none;");
                $Menu.classList.add('header-menu-mobile');
                $Menu.classList.remove('header-menu-desktop');
                $divImage.innerHTML = '<img src="./images/image-hero-mobile.png" alt="laptop">';
                $LoginRegister.classList.add('efeito-li')
                $spanHeader.removeAttribute('style')

                
            }
    
        }

    
})()