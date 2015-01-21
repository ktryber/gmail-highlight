function convert() {
 	var selObj = window.getSelection();
    if (selObj.rangeCount == 0) {
      alert('Please select the text to highlight first');
      return;
    }
    var selRange = selObj.getRangeAt(0);
    var newElement = document.createElement("div");
    var documentFragment = selRange.extractContents();
    var block = $('<div></div>').append(documentFragment);
    hljs.highlightBlock(block[0]);
    applyStylesheet(block);
    newElement.appendChild(block[0]);
    selRange.insertNode(newElement);
    selObj.removeAllRanges();
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


elem.find('.hljs-comment, .diff .hljs-header, .hljs-javadoc')
  .css('color', '#998')
  .css('font-style', 'italic')

elem.find('.hljs-keyword, .css .rule .hljs-keyword, .hljs-winutils, .nginx .hljs-title, .hljs-subst, .hljs-request, .hljs-status')
  .css('color', '#333')
  .css('font-weight', 'bold')

elem.find('.hljs-number, .hljs-hexcolor, .ruby .hljs-constant')
  .css('color', '#008080')

elem.find('.hljs-string, .hljs-tag .hljs-value, .hljs-phpdoc, .hljs-dartdoc, .tex .hljs-formula')
  .css('color', '#d14')

elem.find('.hljs-title, .hljs-id, .scss .hljs-preprocessor')
  .css('color', '#900')
  .css('font-weight', 'bold')

elem.find('.hljs-list .hljs-keyword, .hljs-subst')
  .css('font-weight', 'normal')

elem.find('.hljs-class .hljs-title, .hljs-type, .vhdl .hljs-literal, .tex .hljs-command')
  .css('color', '#458')
  .css('font-weight', 'bold')

elem.find('.hljs-tag, .hljs-tag .hljs-title, .hljs-rules .hljs-property, .django .hljs-tag .hljs-keyword')
  .css('color', '#000080')
  .css('font-weight', 'normal')

elem.find('.hljs-attribute, .hljs-variable, .lisp .hljs-body')
  .css('color', '#008080')

elem.find('.hljs-regexp')
  .css('color', '#009926')

elem.find('.hljs-symbol, .ruby .hljs-symbol .hljs-string, .lisp .hljs-keyword, .clojure .hljs-keyword, .scheme .hljs-keyword, .tex .hljs-special, .hljs-prompt')
  .css('color', '#990073')

elem.find('.hljs-built_in')
  .css('color', '#0086b3')

elem.find('.hljs-preprocessor, .hljs-pragma, .hljs-pi, .hljs-doctype, .hljs-shebang, .hljs-cdata')
  .css('color', '#999')
  .css('font-weight', 'bold')

elem.find('.hljs-deletion')
  .css('background', '#fdd')

elem.find('.hljs-addition')
  .css('background', '#dfd')

elem.find('.diff .hljs-change')
  .css('background', '#0086b3')

elem.find('.hljs-chunk')
  .css('color', '#aaa')
	
}

var addButtonInterval;
function addButton() {
	if (!$('#codebtn').length > 0) {
		var onclick = 'window.postMessage({ type: \'CONVERT\'}, \'*\')';
		$( "div[command='+removeFormat']" ).after('<div id="codebtn" onclick="' + onclick + '" class="J-Z-I J-J5-Ji">{...}</div>');
	} else {
    clearInterval(addButtonInterval);
  }
}

addButtonInterval = setInterval(addButton, 1000);

window.addEventListener("message", function(event) {
  // We only accept messages from ourselves
  if (event.source != window)
    return;

  if (event.data.type && (event.data.type == "CONVERT")) {
  	convert();
  }
}, false);