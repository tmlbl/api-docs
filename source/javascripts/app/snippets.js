(function (global) {
  
  global.injectSnippet_usingStringSub = injectSnippet_usingStringSub;
  global.injectSnippet_usingDivClass = injectSnippet_usingDivClass;
  global.test_function = test_function;

  function test_function(sValue) {
	alert(sValue);
  }
  
  function injectSnippet_usingDivClass(divClass, snippetContents) {

	// Option #1  (need to fix issue with reading multiple-line files into string)
	//------------
	// Works, but Files must contain contents within an HTML container tag.
	alert(divClass);
	var sClass = "." + divClass;
	$(snippetContents).replaceAll($(sClass));
  }

  function injectSnippet_usingStringSub(placeholderText, snippetContents) {
	
	// Option #2 (need to fix issue with reading multiple-line files into string...AND issue with broken side nav)
	//------------
	// ISSUE: this breaks the side nav
	alert(placeholderText);
	var re = new RegExp(placeholderText,'g');
	document.body.innerHTML = document.body.innerHTML.replace(re, snippetContents);
  }

})(window);
