//your code here
 const items = document.querySelectorAll('.image');


let activeItem = null;

items.forEach(item => {
  item.addEventListener('dragstart', dragStart);
});

items.forEach(box => {
  box.addEventListener('dragenter', dragEnter);
  box.addEventListener('dragover', dragOver);
  box.addEventListener('dragleave', dragLeave);
  box.addEventListener('drop', drop);
});

function dragStart(e) {
  if (activeItem) {
    e.preventDefault();
    return;
  }

  activeItem = this;
  e.dataTransfer.setData('text/plain', e.target.id);
  e.target.classList.add('hide');
}

function dragEnter(e) {
  e.preventDefault();
  e.target.classList.add('drag-over');
}

function dragOver(e) {
  e.preventDefault();
  e.target.classList.add('drag-over');
}

function dragLeave(e) {
  e.target.classList.remove('drag-over');
}

function drop(e) {
  e.target.classList.remove('drag-over');

  const id = e.dataTransfer.getData('text/plain');
  const draggable = document.getElementById(id);
  const targetItem = e.target.querySelector('.item');

  if (targetItem) {
    // Swap the positions of the dropped item and the existing item
    const tempParent = draggable.parentNode;
    const tempSibling = draggable.nextSibling === targetItem ? draggable : draggable.nextSibling;
    targetItem.parentNode.insertBefore(draggable, targetItem);
    tempParent.insertBefore(targetItem, tempSibling);
  } else {
    e.target.appendChild(draggable);
  }

  draggable.classList.remove('hide');

  activeItem = null;
}
