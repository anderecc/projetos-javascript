var $html = document.querySelector('html');
$html.classList.remove('no-js');
$html.classList.add('js');

var menu = new Menu({
    container: '.header-nav',
    toggleBtn: '.header-icon-menu',
})

var carouselImgs = new Carousel({
    container: '.slideshow',
    itens: 'figure',
    btnPrev: '.prev',
    btnNext: '.next',
    containerIcons: '.main-carousel-icon',
    icons: 'div'

})

function Menu(config){
    this.nav = (typeof config.container === 'string') ? 
    document.querySelector(config.container) : config.container;
    
    this.btn = (typeof config.toggleBtn === 'string') ? 
    document.querySelector(config.toggleBtn) : config.toggleBtn;

    var _opened = false;
    var _this = this;

    this.btn.addEventListener('click', openOrClose);

    function openOrClose(){
        if (!_opened){
            openMenu();
        } else {
            closeMenu();
        }
    }

    function openMenu(){
        var _top = _this.nav.getBoundingClientRect().top + 'px'

        var _style = {
            maxHeight: 'calc(100vh - ' + _top + ')',
            overflow: 'hidden',
            transition: 'all .5s',
        }
        var btnstyle = {
            transform: 'rotate(90deg)',
            transition: 'all .5s',
        }

        
        ApplyStyleToNav(_style)
        ApplyStyleToBtn(btnstyle)

        _opened = true;
    }

    function ApplyStyleToNav(_style){
        Object.keys(_style).forEach( stl => {
            _this.nav.style[stl] = _style[stl]
        })
    }
    function ApplyStyleToBtn(btnstyle){
        Object.keys(btnstyle).forEach( stl => {
            _this.btn.style[stl] = btnstyle[stl]
        })
    }

    function closeMenu(){
        var _style = {
            maxHeight: '0px',
            overflow: 'hidden',
            transition: 'all .5s',
        }
        var btnstyle = {
            transform: 'rotate(0deg)',
            transition: 'all .5s',
        }

        
        ApplyStyleToNav(_style)
        ApplyStyleToBtn(btnstyle)


        _opened = false;
    }

}

function Carousel(config){
    this.container = (typeof config.container === 'string') ? document.querySelector(config.container) : config.container;
    this.itens = (typeof config.itens === 'string') ? this.container.querySelectorAll(config.itens) : config.itens;
    this.btnPrev = (typeof config.btnPrev === 'string') ? this.container.querySelector(config.btnPrev) : config.btnPrev;
    this.btnNext = (typeof config.btnNext === 'string') ? this.container.querySelector(config.btnNext) : config.btnNext;
    this.containerIcons = (typeof config.containerIcons === 'string') ? document.querySelector(config.containerIcons) : config.containerIcons;
    this.icons = (typeof config.icons === 'string') ? this.containerIcons.querySelectorAll(config.icons) : config.icons;
    
    var _this = this;
    var _currentSlide = 0;
    
    init()
    
    function init(){
        var _show = _this.container.querySelectorAll('.show')
        var _active = _this.containerIcons.querySelectorAll('#active')
        var arrIcons = Array.from(_this.icons)
        
        Array.prototype.forEach.call(_show, function(sh){
            sh.classList.remove('show')
        })
        Array.prototype.forEach.call(_active, function(ac){
            ac.removeAttribute('id')
        })
        _this.itens[0].classList.add('show')

        addListeners();
    };

    function addListeners(){
        _this.btnNext.addEventListener('click', showNextSlide)
        _this.btnPrev.addEventListener('click', showPrevSlide)
        _this.icons.forEach((icon, i) => icon.addEventListener('click', () => {
            _currentSlide = i
            showSlide()
        })
        );
    };

    function showNextSlide(){
        _currentSlide++;
        showSlide()
        
    };
    
    function showPrevSlide(){
        _currentSlide--;
        showSlide()
        
    };

    function showSlide(){
        var qtd = _this.itens.length;
        var slide = _currentSlide % qtd;
        slide = Math.abs(slide);

        _this.container.querySelector('.show').classList.remove('show');
        _this.containerIcons.querySelector('.active').classList.remove('active');
        _this.itens[slide].classList.add('show');
        _this.icons[slide].classList.add('active');
    };
    }

const btnTop = document.querySelector('.p-back-top')
btnTop.addEventListener('click', scrollToTop);
function scrollToTop () {
    const c = document.documentElement.scrollTop || document.body.scrollTop;
    if (c > 0) {
      window.requestAnimationFrame(scrollToTop);
      window.scrollTo(0, c - c / 8);
    }
  };


    





