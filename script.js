/*
1º Tratar eventos dos items
2º Tratar as áreas de drop
    necessário 3 eventos pelo menos:
        1º dragover: Vai fazer uma validação se os items na área for null então vai sinalizar que será possível fazer o drop com a classe que será adicionado no html.

        2º dragleave: Apenas irá remover a classe.

        3º drop: irá remover a classe adicionada no html, armazena a variável com a classe dragging no item e faz uma a mesma validação do dragover, porém se a área for null irá adicionar com appendChild() a variável com o elemento.

*/

let areas = {
    a:null,
    b:null,
    c:null
};

document.querySelectorAll('.item').forEach(item => {
    item.addEventListener('dragstart', dragstart);
    item.addEventListener('dragend', dragend);
});

document.querySelectorAll('.area').forEach(area => {
    area.addEventListener('dragover',dragover)
    area.addEventListener('dragleave',dragleave)
    area.addEventListener('drop',drop)
});


document.querySelectorAll('.neutralArea').forEach(neutralArea => {
    neutralArea.addEventListener('dragover',dragOver);
    neutralArea.addEventListener('dragleave',dragLeave);
    neutralArea.addEventListener('drop', Drop);
});


//functions items
function dragstart(e) {
    e.currentTarget.classList.add('dragging');
};

function dragend(e) {
    e.currentTarget.classList.remove('dragging');
};

//Functions Area 

function dragover(e) {
    if (e.currentTarget.querySelector('.item') === null) {
    e.preventDefault();
    e.currentTarget.classList.add('hover');
    }
};

function dragleave(e) {
    e.currentTarget.classList.remove('hover')
};


function drop(e) {
    e.currentTarget.classList.remove('hover')

    let dragItem = document.querySelector('.item.dragging');
    //Verificar se dentro da area existe a classe item ou não
    if (e.currentTarget.querySelector('.item') === null) {
        e.currentTarget.appendChild(dragItem);
        updateAreas()
    };
};


/*Neutral área zona de drop*/

function dragOver(e) {
    e.preventDefault();
    e.currentTarget.classList.add('hover');
}

function dragLeave(e) {
    e.currentTarget.classList.remove('hover')
}

function Drop(e) {
    e.currentTarget.classList.remove('hover');
    let dragItem = document.querySelector('.item.dragging');
    e.currentTarget.appendChild(dragItem);
    updateAreas();
}

// Logic functions

//rodará nos dois drops

//Cada uma das área verá se tem e qual item esta dentro.
function updateAreas() {
    document.querySelectorAll('.area').forEach(area =>{
     let name = area.getAttribute('data-name');
     
     if(area.querySelector('.item') !== null) {
        areas[name] = area.querySelector('.item').innerHTML;
     } else {
        area[name] = null
     }
     
    });

    if(areas.a === '1' && areas.b === '2' && areas.c === '3') {
        document.querySelector('.areas').classList.add('correct');
    } else {
        document.querySelector('.areas').classList.remove('correct');
    }
    
    console.log(areas)
}