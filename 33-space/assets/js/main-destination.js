
document.addEventListener('click', e =>{
    
    const el = e.target;

    if(el.classList.contains('links-destination')){
        e.preventDefault();
        carregaPagina(el)
    }
});

async function carregaPagina(el){
    try{
        
        const href = el.getAttribute('href');
        const response = await fetch(href);
        if( response.status !== 200) throw new Error('ERRO 404')
        
        const html = await response.text();
        
        carregaResultado(html)


    } catch(e){
        console.log(e)
    }
    
}


function carregaResultado(response){
    const resultado = document.querySelector('.main');
    resultado.innerHTML = response;
}

