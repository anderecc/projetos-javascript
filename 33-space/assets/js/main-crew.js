document.addEventListener('click', e =>{
    const elemnt = e.target;
    const elNode = elemnt.parentNode;
    const elText = elemnt.id.toLowerCase();
    const hrefLink = elemnt.getAttribute('href')


    if(elText === 'commander' || elText === 'pilot' || elText === 'specialist' || elText === 'engineer' ){
        e.preventDefault();
        carregaPagina(elNode)
    } else if (hrefLink === 'crew-commander.html' || hrefLink === 'crew-pilot.html' || hrefLink === 'crew-specialist.html' || hrefLink === 'crew-engineer.html'){
        e.preventDefault();
        carregaPagina(elemnt)

    }
});

async function carregaPagina(paramenter){
    try{
        
        const href = paramenter.getAttribute('href');
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

