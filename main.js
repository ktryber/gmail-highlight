function convert() {
 	var selObj = window.getSelection();
  var selRange = selObj.getRangeAt(0);

  // only manipulate the dom if we are on the message contents
  if (hasSomeParentTheClass(selRange.startContainer, 'editable')) {
    if (selObj.rangeCount == 0) {
      alert('Please select the text to syntax highlight first');
      return;
    }

    var newElement = document.createElement("div");
    var documentFragment = selRange.extractContents();
    var block = $('<div></div>').append(documentFragment);
    hljs.highlightBlock(block[0]);
    applyStylesheet(block);
    newElement.appendChild(block[0]);
    selRange.insertNode(document.createElement("br"));
    selRange.insertNode(newElement);
    selRange.insertNode(document.createElement("br"));

    selObj.removeAllRanges();
  }
}
function applyStylesheet(elem) {
  elem
		.css('display', 'block')
		.css('overflow-x', 'auto')
		.css('padding', '0.5em')
		.css('color', '#333')
		.css('background', '#f8f8f8')
		.css('-webkit-text-size-adjust', 'none')
		.css('font-family', 'monospace');
  elem.find('.hljs')
  .css('display', 'block')
  .css('overflow-x', 'auto')
  .css('padding', '0.5em')
  .css('background', '#F0F0F0');
  elem.find('.hljs,.hljs-subst')
  .css('color', '#444');
  elem.find('.hljs-comment')
  .css('color', '#888888');
  elem.find('.hljs-keyword,.hljs-attribute,.hljs-selector-tag,.hljs-meta-keyword,.hljs-doctag,.hljs-name')
  .css('font-weight', 'bold');
  elem.find('.hljs-type,.hljs-string,.hljs-number,.hljs-selector-id,.hljs-selector-class,.hljs-quote,.hljs-template-tag,.hljs-deletion')
  .css('color', '#880000');
  elem.find('.hljs-title,.hljs-section')
  .css('color', '#880000')
  .css('font-weight', 'bold');
  elem.find('.hljs-regexp,.hljs-symbol,.hljs-variable,.hljs-template-variable,.hljs-link,.hljs-selector-attr,.hljs-selector-pseudo')
  .css('color', '#BC6060');
  elem.find('.hljs-literal')
  .css('color', '#78A960');
  elem.find('.hljs-built_in,.hljs-bullet,.hljs-code,.hljs-addition')
  .css('color', '#397300');
  elem.find('.hljs-meta')
  .css('color', '#1f7199');
  elem.find('.hljs-meta-string')
  .css('color', '#4d99bf');
  elem.find('.hljs-emphasis')
  .css('font-style', 'italic');
  elem.find('.hljs-strong')
  .css('font-weight', 'bold');
}

function hasSomeParentTheClass(element, classname) {
    if (element.className && element.className.split(' ').indexOf(classname)>=0) return true;
    return element.parentNode && hasSomeParentTheClass(element.parentNode, classname);
}

function addButton() {
  $( "div[role='toolbar'].J-Z" ).each(function() {
    if ($(this).find('.codebtn').length == 0) {
      var onclick = 'window.postMessage({ type: \'CONVERT\'}, \'*\')';
      var btn = $('<div onclick="' + onclick + '" class="codebtn J-Z-I J-J5-Ji" data-tooltip="Syntax Highlight" role="button">{...}</div>');
      $(this).append(btn);

      $(this).find('.codebtn').hover(function() { $(this).toggleClass('J-Z-I-JW')});
    }
	});
}
// Check every 3 seconds if there's a new toolbar without our button
var addButtonInterval = setInterval(addButton, 3000);

window.addEventListener("message", function(event) {
  // We only accept messages from ourselves
  if (event.source != window)
    return;

  if (event.data.type && (event.data.type == "CONVERT")) {
  	convert();
  }
}, false);
