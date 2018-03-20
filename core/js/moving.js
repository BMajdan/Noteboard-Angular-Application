"use strict";

function moveResizeNote(item, scope, boardService){

  var minWidth = 200;
  var minHeight = 200;

  var FULLSCREEN_MARGINS = -10;
  var MARGINS = 4;

  var clicked = null;
  var onRightEdge, onBottomEdge, onLeftEdge, onTopEdge;

  var rightScreenEdge, bottomScreenEdge;
  var b, x, y, e;;
  var redraw = false;
  var pane = angular.element(document.getElementById('note_' + item))[0];

  function setBounds(element, x, y, w, h) {
    element.style.left = x + 'px';
    element.style.top = y + 'px';
    element.style.width = w + 'px';
    element.style.height = h + 'px';
  }

  pane.addEventListener('mousedown', onMouseDown);
  document.addEventListener('mousemove', onMove);
  document.addEventListener('mouseup', onUp);
  pane.addEventListener('touchstart', onTouchDown);
  document.addEventListener('touchmove', onTouchMove);
  document.addEventListener('touchend', onTouchEnd);


  function onTouchDown(e) {
    onDown(e.touches[0]);
    
  }

  function onTouchMove(e) {
    onMove(e.touches[0]);   
  }

  function onTouchEnd(e) {
    if (e.touches.length ==0) 
      onUp(e.changedTouches[0]);
  }

  function onMouseDown(e) {
    onDown(e);
  }

  function onDown(e) {
    calc(e);
    var isResizing = onRightEdge || onBottomEdge || onTopEdge || onLeftEdge;
    clicked = {
      x: x,
      y: y,
      cx: e.clientX,
      cy: e.clientY,
      w: b.width,
      h: b.height,
      isResizing: isResizing,
      isMoving: !isResizing && canMove(),
      onTopEdge: onTopEdge,
      onLeftEdge: onLeftEdge,
      onRightEdge: onRightEdge,
      onBottomEdge: onBottomEdge
    };
  }

  function canMove() {
    return x > 0 && x < b.width && y > 0 && y < b.height
    && y < 30;
  }

  function calc(e) {
    b = pane.getBoundingClientRect();
    x = e.clientX - b.left;
    y = e.clientY - b.top;
    onTopEdge = y < MARGINS;
    onLeftEdge = x < MARGINS;
    onRightEdge = x >= b.width - MARGINS;
    onBottomEdge = y >= b.height - MARGINS;
  }

  function onMove(ee) {
    calc(ee);
    e = ee;
    redraw = true;
  }

  function animate() {

    requestAnimationFrame(animate);
    if (!redraw) 
      return;

    redraw = false;
    if (clicked && clicked.isResizing) {
      if (clicked.onRightEdge){
        pane.style.width = parseInt(Math.max(x, minWidth)) + 'px';
        scope.noteArray[pane.id.split("_")[1]].note.width = pane.style.width;
      } 
        

      if (clicked.onBottomEdge){
        pane.style.height = parseInt(Math.max(y, minHeight)) + 'px';
        scope.noteArray[pane.id.split("_")[1]].note.height = pane.style.height;
      } 
        

      if (clicked.onLeftEdge) {
        var currentWidth = parseInt(Math.max(clicked.cx - e.clientX  + clicked.w, minWidth));
        if (currentWidth > minWidth) {
          pane.style.width = currentWidth + 'px';
          pane.style.left = e.clientX + 'px';

          scope.noteArray[pane.id.split("_")[1]].note.width = pane.style.width;
          scope.noteArray[pane.id.split("_")[1]].note.left = pane.style.left;  
        }
      }

      if (clicked.onTopEdge) {
        var currentHeight = parseInt(Math.max(clicked.cy - e.clientY  + clicked.h, minHeight));
        if (currentHeight > minHeight) {
          pane.style.height = currentHeight + 'px';
          pane.style.top = e.clientY + 'px';

          scope.noteArray[pane.id.split("_")[1]].note.height = pane.style.height;
          scope.noteArray[pane.id.split("_")[1]].note.top = pane.style.top;  
        }
      }

      return;
    }

    if (clicked && clicked.isMoving) {
      pane.style.top = (e.clientY - clicked.y) + 'px';
      pane.style.left = (e.clientX - clicked.x) + 'px';
      scope.noteArray[pane.id.split("_")[1]].note.top = pane.style.top;
      scope.noteArray[pane.id.split("_")[1]].note.left = pane.style.left; 
      return;
    }

    if (onRightEdge && onBottomEdge || onLeftEdge && onTopEdge) {
      pane.style.cursor = 'nwse-resize';
    } else if (onRightEdge && onTopEdge || onBottomEdge && onLeftEdge) {
      pane.style.cursor = 'nesw-resize';
    } else if (onRightEdge || onLeftEdge) {
      pane.style.cursor = 'ew-resize';
    } else if (onBottomEdge || onTopEdge) {
      pane.style.cursor = 'ns-resize';
    } else if (canMove()) {
      pane.style.cursor = 'move';
    } else {
      pane.style.cursor = 'default';
    }
  }

  function onUp(e) {
    calc(e);
    clicked = null;
    boardService.updateNote(scope.noteArray[pane.id.split("_")[1]].note).then(function(data){});
  }

  animate();

}