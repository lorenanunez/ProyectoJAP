// Trayendo los productos del desafíate
const PRODUCT_CART_URL = "https://japdevdep.github.io/ecommerce-api/cart/654.json";
var cpArray = [];


function fetchAndShowCartProducts() {
	getJSONData(PRODUCT_CART_URL).then(function(resultObj) {
		if (resultObj.status === "ok") {
			cpArray = resultObj.data.articles;
			showCartProducts();
		}
	});
}

function showCartProducts() {
	// Mostrando los productos que hay en el JSON del carrito
	let newHTML = "";
	let pTotal = 0;
	let pTable = document.getElementById("products_table");
	for (let i = 0; i < cpArray.length; i++) {
		newHTML += `<tr>
								<td data-th="Product">
									<div class="row">
										<div class="col-sm-2 hidden-xs"><img class="prod-img" src="` + cpArray[i].src + `" alt="Foto del producto" class="img-responsive"/></div>
										<div class="col-sm-10">
											<h4 class="nomargin product_description">` + cpArray[i].name + `</h4>
											<p class="product_description">Descripción del producto</p>
										</div>
									</div>
								</td>
								<td data-th="Precio: ">` + cpArray[i].currency + " " + cpArray[i].unitCost + `</td>
								<td data-th="Quantity">
									<input type="number" min="1" max="999" class="form-control text-center num_scroll" value="` + cpArray[i].count + `">
								</td>
								<td data-th="Subtotal" class="text-center price_tag">` + calcularTotal(cpArray[i].currency, cpArray[i].unitCost, cpArray[i].count) + `</td>
								<td class="actions" data-th="">
									<button class="btn btn-danger btn-sm btn_del"><i class="fa fa-trash-o"></i></button>								
								</td>
							</tr>`;
		pTotal += calcularTotal(cpArray[i].currency, cpArray[i].unitCost, cpArray[i].count)
	}
	
	pTable.innerHTML = newHTML;
	
	// Calculando el precio total
	let tagTotal = document.getElementById("pTotal");
	tagTotal.innerHTML = "Total: $" + pTotal;
	
	let scrolls = document.getElementsByClassName("num_scroll");
	let pricetags = document.getElementsByClassName("price_tag");
	let delbuttons = document.getElementsByClassName("btn_del");
	
	for (let i = 0; i < scrolls.length; i++) {
		let element = scrolls[i];
		let price = pricetags[i];
		let initialValue = cpArray[i].count;
		element.onchange = function(evt) {
			let newValue = evt.target.value;
			if (newValue > 0) {
				price.innerHTML = `<td data-th="Subtotal" class="text-center price_tag">` + calcularTotal(cpArray[i].currency, cpArray[i].unitCost, evt.target.value) + `</td>`;
				
				if (initialValue > newValue) {
					newValue -= calcularTotal(cpArray[i].currency, cpArray[i].unitCost, evt.target.value);	
				} else {
					newValue += calcularTotal(cpArray[i].currency, cpArray[i].unitCost, evt.target.value);
				}
				initialValue = newValue;
				tagTotal.innerHTML = "Total: $" + newValue;
			}
			
		}
	}
	
	for (let z = 0; z < delbuttons.length; z++) {
		let button = delbuttons[z];
		button.onclick = function() {
			removeItem(z);
		}
	}
}

function removeItem(index) {
	cpArray.pop(index);
	showCartProducts();
}

function calcularTotal(currency, price, prodCount) {
	let retorno = 0;
	if (currency === "USD") {
		retorno = price * prodCount * 40;
	} else {
		retorno = price * prodCount;
	}
	return (retorno);
}

document.addEventListener("DOMContentLoaded", function() {
	fetchAndShowCartProducts();
	
	
	
	
	
	
	
});