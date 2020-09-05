const ORDER_ASC_BY_PRICE = "Precio de menor a mayor";
const ORDER_DESC_BY_PRICE = "Precio de mayor a menor";
const ORDER_ASC_BY_NAME = "AZ";
const ORDER_DESC_BY_NAME = "ZA";
const ORDER_BY_RELEVANCE = "Reelevancia";
var currentProductsArray = [];
var currentSortCriteria = undefined;
var minPrice = undefined;
var maxPrice = undefined;
var searchTerm = undefined;

function sortProducts(criteria, array) {
	var result = [];
	switch (criteria) {
		case ORDER_ASC_BY_PRICE:
			result = array.sort(function(a, b) {
				if (a.cost < b.cost) return -1;
				if (a.cost > b.cost) return 1;
				return 0;
			});
			break;
		case ORDER_DESC_BY_PRICE:
			result = array.sort(function(a, b) {
				if (a.cost > b.cost) return -1;
				if (a.cost < b.cost) return 1;
				return 0;
			});
			break;
		case ORDER_ASC_BY_NAME:
			result = array.sort(function(a, b) {
				if (a.name < b.name) return -1;
				if (a.name > b.name) return 1;
				return 0;
			});
			break;
		case ORDER_DESC_BY_NAME:
			result = array.sort(function(a, b) {
				if (a.name > b.name) return -1;
				if (a.name < b.name) return 1;
				return 0;
			});
			break;
		case ORDER_BY_RELEVANCE:
			result = array.sort(function(a, b) {
				if (a.soldCount > b.soldCount) return -1;
				if (a.soldCount < b.soldCount) return 1;
				return 0;
			});
			break;
	}
	return (result);
}

function showProductsList() {
	var htmlContentToAppend = "";
	for (var i = 0; i < currentProductsArray.length; i++) {
		var product = currentProductsArray[i];
		
		if (((minPrice == undefined) || (minPrice != undefined && parseInt(product.cost) >= minPrice)) && ((maxPrice == undefined) || (maxPrice != undefined && parseInt(product.cost) <= maxPrice)) && (searchTerm == undefined || product.name.includes(searchTerm))) {
			htmlContentToAppend += `
            <a href="product-info.html" class="list-group-item list-group-item-action">
                <div class="row">
                    <div class="col-3">
                        <img src="` + product.imgSrc + `" alt="` + product.description + `" class="img-thumbnail">
                    </div>
                    <div class="col">
                        <div class="d-flex w-100 justify-content-between">
                            <h4 class="mb-1">`+ product.name +`</h4>
                            <small class="text-muted">Precio: ` + product.cost + ` ` + product.currency + `</small>
                        </div>
                        <p class="mb-1">` + product.description + `</p>
                    </div>
                </div>
            </a>
            `
		}
		
		document.getElementById("prod-list-container").innerHTML = htmlContentToAppend;
	}
}

function sortAndShowProducts(sortCriteria, productsArray) {
	currentSortCriteria = sortCriteria;
	if (productsArray != undefined) currentProductsArray = productsArray;
	currentProductsArray = sortProducts(currentSortCriteria, currentProductsArray);
	showProductsList();
}

document.addEventListener("DOMContentLoaded", function() {
	getJSONData(PRODUCTS_URL).then(function(resultObj) {
		if (resultObj.status === "ok") {
			sortAndShowProducts(ORDER_ASC_BY_NAME, resultObj.data);
		}
	});
	
	document.getElementById("filterList").addEventListener("change", function(evt) {
		switch(evt.target.options[evt.target.selectedIndex].value) {
			case "priceAsc":
				sortAndShowProducts(ORDER_ASC_BY_PRICE, currentProductsArray);
				break;
			case "priceDesc":
				sortAndShowProducts(ORDER_DESC_BY_PRICE, currentProductsArray);
				break;
			case "nameAsc":
				sortAndShowProducts(ORDER_ASC_BY_NAME, currentProductsArray);
				break;
			case "nameDesc":
				sortAndShowProducts(ORDER_DESC_BY_NAME, currentProductsArray);
				break;
			case "relevance":
				sortAndShowProducts(ORDER_BY_RELEVANCE, currentProductsArray);
				break;
		}
	});
	
	document.getElementById("rangeFilterCount").addEventListener("click", function() {
		minPrice = document.getElementById("rangeFilterCountMin").value;
        maxPrice = document.getElementById("rangeFilterCountMax").value;
		
		if ((minPrice != undefined) && (minPrice != "") && (parseInt(minPrice)) >= 0) {
            minPrice = parseInt(minPrice);
        } else {
            minPrice = undefined;
        }

        if ((maxPrice != undefined) && (maxPrice != "") && (parseInt(maxPrice)) >= 0) {
            maxPrice = parseInt(maxPrice);
        } else {
            maxPrice = undefined;
        }
		
		showProductsList();
		
	});
	
	document.getElementById("clearRangeFilter").addEventListener("click", function(){
        document.getElementById("rangeFilterCountMin").value = "";
        document.getElementById("rangeFilterCountMax").value = "";

        minPrice = undefined;
        maxPrice = undefined;
		searchTerm = undefined;
		
		document.getElementById("filterList").selectedIndex = 0;
		document.getElementById("tbBuscar").value = "";

        showProductsList();
    });
	
	document.getElementById("tbBuscar").addEventListener("input", function(e) {
		let inputText = e.target.value;
		console.log("Texto de búsqueda: " + inputText);
		if (inputText === "" || !inputText.trim()) {
			searchTerm = undefined;
		} else {
			searchTerm = inputText;
			showProductsList();
		}
	});
});