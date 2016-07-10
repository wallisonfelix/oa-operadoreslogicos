var elementoP = undefined;
var elementoQ = undefined;
var elementoS = undefined;
var notElementoP = false;
var notElementoQ = false;
var notElementoS = false;
var operador = "AND";
var operador2 = "AND";

function indexOfRegex(array, regex) {
    for (var index = 0; index < array.length; index++) {
		if (array[index].toString().match(regex)) {
        	return index;
		}
	}
	return -1;
}

function loadImageOptions(numberOfOptions, element) {
	for (var index = 1; index < numberOfOptions + 1; index++) {			
		document.getElementById("imgOpcao" + index + "Elemento" + element).src = 
			diretorioImagens + imagens[indexOfRegex(imagens, "^opcao" + index + "_elemento" + element)];
	}
}

function findResultText(arrayResults, result) {
	for (var index = 0; index < arrayResults.length; index++) {
		if (arrayResults[index][0] == result) {
			return arrayResults[index][1];
		}	
	}
}

function OR(elementA, elementB) {
	return (elementA || elementB);
}

function AND(elementA, elementB) {
	return (elementA && elementB);
}

function XOR(elementA, elementB) {
	return ((elementA && !elementB) || (!elementA && elementB));
}

function setOperator(operator) {
	if(operator === "AND" || operator === "OR" || operator === "XOR") {
		operador = operator;
	} else {
		operador = undefined;
	}	

	verifyResult();
}

function setOperator2(operator2) {
	if(operator2 === "AND" || operator2 === "OR" || operator2 === "XOR") {
		operador2 = operator2;
	} else {
		operador2 = undefined;
	}	

	verifyResult();
}

function setNotElement(component, element) {
	var checked = component.checked;
	if (element == 'P') {
    	notElementoP = checked;
    } else if (element == 'Q') {
    	notElementoQ = checked;
    } else if (element == 'S') {
    	notElementoS = checked;
    }     
    document.getElementById("imgLabel" + element).src = diretorioImagens + (checked ? "barra_" + element + ".png" : element + ".png");

	verifyResult();
}

function allowDrop(ev) {
	ev.preventDefault();
}

function drag(ev) {
    ev.dataTransfer.setData("id", ev.target.id);
}

function elementDrop(ev, element) {    
	ev.preventDefault();
    
    if (ev.target.childNodes.length == 1) {    
    	var divTargetId = ev.target.id;
	    var imageId = ev.dataTransfer.getData("id");

	    if (divTargetId.slice(divTargetId.length - 1) == imageId.slice(imageId.length - 1)) {
	    	var image = document.getElementById(imageId);
		    var strBoolean = image.src.substring(image.src.lastIndexOf('_') + 1, image.src.lastIndexOf('.'));

		    if (element == 'P') {
		    	elementoP = (strBoolean.toUpperCase() === "TRUE" ? true : false);
		    } else if (element == 'Q') {
		    	elementoQ = (strBoolean.toUpperCase() === "TRUE" ? true : false);
		    } else if (element == 'S') {
		    	elementoS = (strBoolean.toUpperCase() === "TRUE" ? true : false);
		    }

		    ev.target.appendChild(image);
		}
	}

	verifyResult();
}

function elementUndrop(ev, element) {    
	ev.preventDefault();
    
    if (ev.target.childNodes.length == 2) {    	
    	var divTargetId = ev.target.id;
    	var imageId = ev.dataTransfer.getData("id");
    	
    	if (divTargetId.replace("div", "") == imageId.replace("img", "")) {
		    var image = document.getElementById(imageId);

		    if (element == 'P') {
		    	elementoP = undefined;
		    } else if (element == 'Q') {
		    	elementoQ = undefined;
		    } else if (element == 'S') {
		    	elementoS = undefined;
		    }

		    ev.target.appendChild(image);
		}
	}

	verifyResult();
}
