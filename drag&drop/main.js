const fill = document.querySelector('.fill');
const empites = document.querySelectorAll('.empty');

// Fill listiners

fill.addEventListener('dragstart', dragStart);
fill.addEventListener('dragend', dragEnd);


for(const empty of empites){
    empty.addEventListener('dragover', dragOver)
    empty.addEventListener('dragenter', dragEnter)
    empty.addEventListener('dragleave', dragLeave)
    empty.addEventListener('drop', dragDrop)
}


function  dragOver(e){
    e.preventDefault();

}

function  dragEnter(e){
    e.preventDefault();
    this.className += ' hovered';

}


function dragLeave(){
    this.className = 'empty';

}


function dragDrop(){
    this.className = 'empty';
    this.append(fill)

}


function dragStart() {
    this.className += ' hold'
    setTimeout(() => this.className += ' invisible', 0)
}

function dragEnd() {
    this.className = 'fill'
}