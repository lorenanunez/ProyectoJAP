const CATEGORIES_URL = "https://japdevdep.github.io/ecommerce-api/category/all.json";
const PUBLISH_PRODUCT_URL = "https://japdevdep.github.io/ecommerce-api/product/publish.json";
const CATEGORY_INFO_URL = "https://japdevdep.github.io/ecommerce-api/category/1234.json";
const PRODUCTS_URL = "https://japdevdep.github.io/ecommerce-api/product/all.json";
const PRODUCT_INFO_URL = "https://japdevdep.github.io/ecommerce-api/product/5678.json";
const PRODUCT_INFO_COMMENTS_URL = "https://japdevdep.github.io/ecommerce-api/product/5678-comments.json";
const CART_INFO_URL = "https://japdevdep.github.io/ecommerce-api/cart/987.json";
const CART_BUY_URL = "https://japdevdep.github.io/ecommerce-api/cart/buy.json";

const SECTION_MAIN_PAGE = 1;
const SECTION_CATEGORIES_PAGE = 2;
const SECTION_PRODUCTS_PAGE = 3;
const SECTION_SELL_PAGE = 4;
const SECTION_CART_PAGE = 5;
var currentSection = SECTION_MAIN_PAGE;

var showSpinner = function(){
  document.getElementById("spinner-wrapper").style.display = "block";
}

var hideSpinner = function(){
  document.getElementById("spinner-wrapper").style.display = "none";
}

var getJSONData = function(url){
    var result = {};
    showSpinner();
    return fetch(url)
    .then(response => {
      if (response.ok) {
        return response.json();
      }else{
        throw Error(response.statusText);
      }
    })
    .then(function(response) {
          result.status = 'ok';
          result.data = response;
          hideSpinner();
          return result;
    })
    .catch(function(error) {
        result.status = 'error';
        result.data = error;
        hideSpinner();
        return result;
    });
}

function showMain() {
	const maincontent = document.getElementById("mainSection");
	maincontent.innerHTML = `<main role="main">
      <section class="jumbotron text-center">
        <div class="m-5">
          <h1></h1>
        </div>
      </section>
      <div class="album py-5 bg-light">
        <div class="container">
          <div class="row">
            <div class="col-md-4">
              <a onclick="showCategories();" class="card mb-4 shadow-sm custom-card">
                <img class="bd-placeholder-img card-img-top"  src="img/cat1.jpg">
                <h3 class="m-3">Autos (122)</h3>
                <div class="card-body">
                  <p class="card-text">Los mejores precios en autos 0 kilómetro, de alta y media gama.</p>
                </div>
              </a>
            </div>
            <div class="col-md-4">
                <a onclick="showCategories();" class="card mb-4 shadow-sm custom-card">
                  <img class="bd-placeholder-img card-img-top" src="img/cat2.jpg">
                  <h3 class="m-3">Juguetes (354)</h3>
                  <div class="card-body">
                    <p class="card-text">Encuentra aquí los mejores precios para niños/as de cualquier edad.</p>
                  </div>
                </a>
            </div>
            <div class="col-md-4">
                <a onclick="showCategories();" class="card mb-4 shadow-sm custom-card">
                  <img class="bd-placeholder-img card-img-top" src="img/cat3.jpg">
                  <h3 class="m-3">Muebles (157)</h3>
                  <div class="card-body">
                    <p class="card-text">Muebles antiguos, nuevos y para ser armados por uno mismo.</p>
                  </div>
                </a>
            </div>
            <div class="col-md-4">
                <a onclick="showCategories();" class="card mb-4 shadow-sm custom-card">
                  <img class="bd-placeholder-img card-img-top" src="img/cat4.jpg">
                  <h3 class="m-3">Herramientas (452)</h3>
                  <div class="card-body">
                    <p class="card-text">Herramientas para cualquier tipo de trabajo.</p>
                  </div>
                </a>
            </div>
            <div class="col-md-4">
                <a onclick="showCategories();" class="card mb-4 shadow-sm custom-card">
                  <img class="bd-placeholder-img card-img-top" src="img/cat5.jpg">
                  <h3 class="m-3">Computadoras (724)</h3>
                  <div class="card-body">
                    <p class="card-text">Todo en cuanto a computadoras, para uso de oficina y/o juegos.</p>
                  </div>
                </a>
            </div>
            <div class="col-md-4">
                <a onclick="showCategories();" class="card mb-4 shadow-sm custom-card">
                  <img class="bd-placeholder-img card-img-top" src="img/cat6.jpg">
                  <h3 class="m-3">Vestimenta (841)</h3>
                  <div class="card-body">
                    <p class="card-text">Gran variedad de ropa, nueva y de segunda mano.</p>
                  </div>
                </a>
            </div>
          </div>
          <div class="row">
              <a type="button" class="btn btn-light btn-lg btn-block" onclick="showCategories();">Ver todas</a>
          </div>
        </div>
      </div>
    </main>`;
}

function showCategories() {
	
	document.getElementById("mainSection").innerHTML = `<main role="main" class="pb-5">
        <div class="text-center p-4">
            <h2>Categorías</h2>
            <p class="lead">Verás aquí todas las categorías del sitio.</p>
        </div>
        <div class="container">
            <div class="row">
                <div class="col text-right">
                    <div class="btn-group btn-group-toggle mb-4" data-toggle="buttons">
                        <label class="btn btn-light active" id="sortAsc" >
                            <input type="radio" name="options" autocomplete="off" checked>A-Z
                        </label>
                        <label class="btn btn-light" id="sortDesc" >
                            <input type="radio" name="options" autocomplete="off">Z-A
                        </label>
                        <label class="btn btn-light" id="sortByCount" >
                            <input type="radio" name="options" autocomplete="off"><i class="fas fa-sort-amount-down mr-1"></i>Cant.
                        </label>
                    </div>
                </div>
            </div>
            <div class="row justify-content-end">
              <div class="col-md-6"></div>
                <div class="col-md-6 col-sm-12 mb-1 container">
                  <div class="row container p-0 m-0">
                    <div class="col">
                      <p class="font-weight-normal text-right my-2">Cant.</p>
                    </div>
                    <div class="col">
                      <input class="form-control" type="number" placeholder="min." id="rangeFilterCountMin">
                    </div>
                    <div class="col">
                      <input class="form-control" type="number" placeholder="máx." id="rangeFilterCountMax">
                    </div>
                    <div class="col-3 p-0">
                      <div class="btn-group" role="group">
                        <button class="btn btn-light btn-block" id="rangeFilterCount">Filtrar</button>
                        <button class="btn btn-link btn-sm" id="clearRangeFilter">Limpiar</button>
                      </div>
                    </div>
                  </div>
                </div>
            </div>
            <div class="row">
                <div class="list-group" id="cat-list-container">
                </div>
            </div>
        </div>
    </main>`;
	
	getJSONData(CATEGORIES_URL).then(function(resultObj){
        if (resultObj.status === "ok"){
            sortAndShowCategories(ORDER_ASC_BY_NAME, resultObj.data);
        }
    });
	
	document.getElementById("sortAsc").addEventListener("click", function(){
        sortAndShowCategories(ORDER_ASC_BY_NAME);
    });
	
	document.getElementById("sortDesc").addEventListener("click", function(){
        sortAndShowCategories(ORDER_DESC_BY_NAME);
    });
	
	document.getElementById("sortByCount").addEventListener("click", function(){
        sortAndShowCategories(ORDER_BY_PROD_COUNT);
    });

    document.getElementById("clearRangeFilter").addEventListener("click", function(){
        document.getElementById("rangeFilterCountMin").value = "";
        document.getElementById("rangeFilterCountMax").value = "";

        minCount = undefined;
        maxCount = undefined;

        showCategoriesList();
    });

    document.getElementById("rangeFilterCount").addEventListener("click", function(){
        //Obtengo el mínimo y máximo de los intervalos para filtrar por cantidad
        //de productos por categoría.
        minCount = document.getElementById("rangeFilterCountMin").value;
        maxCount = document.getElementById("rangeFilterCountMax").value;

        if ((minCount != undefined) && (minCount != "") && (parseInt(minCount)) >= 0){
            minCount = parseInt(minCount);
        }
        else{
            minCount = undefined;
        }

        if ((maxCount != undefined) && (maxCount != "") && (parseInt(maxCount)) >= 0){
            maxCount = parseInt(maxCount);
        }
        else{
            maxCount = undefined;
        }

        showCategoriesList();
    });
}

function showProducts() {
	document.getElementById("mainSection").innerHTML = `<main role="main" class="pb-5">
        <div class="text-center p-4">
            <h2>Productos</h2>
        </div>
        <div class="container">
            <div class="row">
                <div class="col text-right">
                    <div class="btn-group btn-group-toggle mb-4" data-toggle="buttons">
                        <label class="btn btn-light active" id="sortAsc" >
                            <input type="radio" name="options" autocomplete="off" checked>A-Z
                        </label>
                        <label class="btn btn-light" id="sortDesc" >
                            <input type="radio" name="options" autocomplete="off">Z-A
                        </label>
                        <label class="btn btn-light" id="sortByCount" >
                            <input type="radio" name="options" autocomplete="off"><i class="fas fa-sort-amount-down mr-1"></i>Precio
                        </label>
                    </div>
                </div>
            </div>
            <div class="row justify-content-end">
              <div class="col-md-6"><input id="tbBuscar" class="form-control" type="text" placeholder="Buscar..." aria-label="Search"></div>
                <div class="col-md-6 col-sm-12 mb-1 container">
                  <div class="row container p-0 m-0">
                    <div class="col">
                      <p class="font-weight-normal text-right my-2">Precio:</p>
                    </div>
                    <div class="col">
                      <input class="form-control" type="number" placeholder="min." id="rangeFilterCountMin">
                    </div>
                    <div class="col">
                      <input class="form-control" type="number" placeholder="máx." id="rangeFilterCountMax">
                    </div>
                    <div class="col-3 p-0">
                      <div class="btn-group" role="group">
                        <button class="btn btn-light btn-block" id="rangeFilterCount">Filtrar</button>
                        <button class="btn btn-link btn-sm" id="clearRangeFilter">Limpiar</button>
                      </div>
                    </div>
                  </div>
                </div>
            </div>
            <div class="row">
                <div class="list-group" id="prod-list-container">
                </div>
            </div>
        </div>
    </main>`;
}

function showSell() {
	document.getElementById("mainSection").innerHTML = `<div class="container">
        <div class="text-center p-4">
          <h2>Vender</h2>
          <p class="lead">Ingresa los datos del artículo a vender.</p>
        </div>
        <div class="row justify-content-md-center">
          <div class="col-md-8 order-md-1">
            <h4 class="mb-3">Información del producto</h4>
            <form class="needs-validation" id="sell-info">
              <div class="row">
                <div class="col-md-6 mb-3">
                  <label for="productName">Nombre</label>
                  <input type="text" class="form-control" id="productName" placeholder="" value="" >
                  <div class="invalid-feedback">
                    Ingresa un nombre
                  </div>
                </div>
              </div>
              <div class="row">
                <div class="col-md-8 order-md-1">
                    <label for="zip">Imágenes</label>
                    <div class="needsclick dz-clickable" id="file-upload">
                      <div class="dz-message needsclick">
                        Arrastra tus fotos aquí<br>
                      </div>
                    </div>
                </div>
              </div>
              <div class="row">
                  <div class="col-md-12 mb-3">
                      <label for="productDescription">Descripción</label>
                      <textarea class="form-control" id="productDescription" rows="3"></textarea>
                  </div>
                </div>
              <div class="row">
                <div class="col-md-3 mb-3">
                  <label for="zip">Costo</label>
                  <input type="number" class="form-control" id="productCostInput" placeholder="" required="" value="0" min="0">
                  <div class="invalid-feedback">
                    El costo debe ser mayor que 0.
                  </div>
                </div>
                <div class="col-md-4 mb-3">
                    <label for="state">Moneda</label>
                    <select class="custom-select d-block w-100" id="productCurrency" required="">
                      <option selected>Pesos Uruguayos (UYU)</option>
                      <option>Dólares (USD)</option>
                    </select>
                    <div class="invalid-feedback">
                      Ingresa una categoría válida.
                    </div>
                  </div>
              </div>
              <div class="row">
                  <div class="col-md-7 mb-3">
                  <label for="state">Categoría</label>
                  <select class="custom-select d-block w-100" id="productCategory">
                    <option value="">Elija la categoría...</option>
                    <option>Autos</option>
                    <option>Juguetes</option>
                    <option>Muebles</option>
                    <option>Herramientas</option>
                    <option>Computadoras</option>
                    <option>Vestimenta</option>
                  </select>
                  <div class="invalid-feedback">
                    Por favor ingresa una categoría válida.
                  </div>
                </div>
              </div>
              <div class="row">
                  <div class="col-md-3 mb-3">
                    <label for="productCountInput">Cantidad en stock</label>
                    <input type="number" class="form-control" id="productCountInput" placeholder="" required="" value="1" min="0">
                    <div class="invalid-feedback">
                      La cantidad es requerida.
                    </div>
                  </div>
                </div>
              <hr class="mb-4">
              <h5 class="mb-3">Tipo de publicación</h5>
              <div class="d-block my-3">
                <div class="custom-control custom-radio">
                  <input id="goldradio" name="publicationType" type="radio" class="custom-control-input" checked="" required="">
                  <label class="custom-control-label" for="goldradio">Gold (13%)</label>
                </div>
                <div class="custom-control custom-radio">
                  <input id="premiumradio" name="publicationType" type="radio" class="custom-control-input" required="">
                  <label class="custom-control-label" for="premiumradio">Premium (7%)</label>
                </div>
                <div class="custom-control custom-radio">
                  <input id="standardradio" name="publicationType" type="radio" class="custom-control-input" required="">
                  <label class="custom-control-label" for="standardradio">Estándar (3%)</label>
                </div>
                <div class="row">
                  <button type="button" class="m-1 btn btn-link" data-toggle="modal" data-target="#contidionsModal">Ver condiciones</button>
                </div>
              </div>
              <hr class="mb-4">
              <h4 class="mb-3">Costos</h4>
              <ul class="list-group mb-3">
                  <li class="list-group-item d-flex justify-content-between lh-condensed">
                    <div>
                      <h6 class="my-0">Precio</h6>
                      <small class="text-muted">Unitario del producto</small>
                    </div>
                    <span class="text-muted" id="productCostText">-</span>
                  </li>
                  <li class="list-group-item d-flex justify-content-between lh-condensed">
                    <div>
                      <h6 class="my-0">P0rcentaje</h6>
                      <small class="text-muted">Según el tipo de publicación</small>
                    </div>
                    <span class="text-muted" id="comissionText">-</span>
                  </li>
                  <li class="list-group-item d-flex justify-content-between">
                    <span>Total ($)</span>
                    <strong id="totalCostText">-</strong>
                  </li>
                </ul>
              <hr class="mb-4">
              <button class="btn btn-primary btn-lg" type="submit">Vender</button>
            </form>
          </div>
        </div>
      </div>`;
}

function showCart() {
	document.getElementById("mainSection").innerHTML = `<div class="container p-5">
    <div class="alert alert-danger" role="alert" style="position: relative; width:auto; top: 0;">
      <h4 class="alert-heading">¡A trabajar! :)</h4>
      <p>Esta sección corresponde a: Entrega 5 (Fecha de entrega: 11/10/2020) y Entrega 6 (Fecha de entrega: 25/10/2020).</p>
      <hr>
      <p class="mb-0">Para saber qué debes hacer, fijate en la actividad en CREA correspondiente a esta entrega.</p>
    </div>
  </div>`;
}

document.addEventListener("DOMContentLoaded", function(e){
	
	document.getElementById("nav_username").innerHTML = `<img id="nav_userpic" class="profile-icon mr-1" src="img/1024px-Crystal_Clear_kdm_user_female.svg.png" alt="Foto del usuario">` + localStorage.getItem("user");
	
	document.getElementById("nav_start").onclick = function() {
		currentSection = SECTION_MAIN_PAGE;
	};
	
	document.getElementById("nav_categories").onclick = function() {
		currentSection = SECTION_CATEGORIES_PAGE;
	};
	
	document.getElementById("nav_products").onclick = function() {
		currentSection = SECTION_PRODUCTS_PAGE;
	};
	
	document.getElementById("nav_sell").onclick = function() {
		currentSection = SECTION_SELL_PAGE;
	};
	
	document.getElementById("nav_cart").onclick = function() {
		currentSection = SECTION_CART_PAGE;
	};
	
	switch (currentSection) {
		case SECTION_MAIN_PAGE:
			showMain();
			break;
		case SECTION_CATEGORIES_PAGE:
			showCategories;
			break;
		case SECTION_PRODUCTS_PAGE:
			showProducts();
			break;
		case SECTION_SELL_PAGE:
			showSell();
			break;
		case SECTION_CART_PAGE:
			showCart();
			break;
			
	}
});