var product = {};
var commentArray = {};

function showImagesGallery(array) {
    let htmlContentToAppend = "";
    for (let i = 0; i < array.length; i++){
        let imageSrc = array[i];
        htmlContentToAppend += `
        <div class="col-lg-3 col-md-4 col-6">
            <div class="d-block mb-4 h-100">
                <img class="img-fluid img-thumbnail" src="` + imageSrc + `" alt="">
            </div>
        </div>
        `
        document.getElementById("productImagesGallery").innerHTML = htmlContentToAppend;
    }
}

function showComments() {
	getJSONData(PRODUCT_INFO_COMMENTS_URL).then(function(resultObj) {
		if(resultObj.status === "ok") {
			
			if (commentArray.length === undefined) {
				commentArray = resultObj.data;
			}
			
			let newHTML = "";
			
			for (let i = 0; i < commentArray.length; i++) {
				newHTML += `<div class="media">
								<a class="media-left mr-2" href="#">
									<img class="profile-icon" src="https://www.pngitem.com/pimgs/m/78-786420_icono-usuario-joven-transparent-user-png-png-download.png" alt="Foto de perfil del usuario">
								</a>
								<div class="media-body">
									<h4 class="media-heading user_name modal-dialog-centered mt-1">` + commentArray[i].user + `</h4>
									<p class="pull-right">
										<small class="float-right">` + commentArray[i].dateTime + `</small>
									</p>
									<p class="pull-right float-left">
                                    `
				for (let x = 0; x < parseInt(commentArray[i].score); x++) {
					newHTML += `<span class="float-left fa fa-star checked"></span>`;
				}
				for (let x = 0; x < 5 - parseInt(commentArray[i].score); x++) {
					newHTML += `<span class="float-left fa fa-star"></span>`;	
				}
				newHTML += `</p><br><p class="pull-left">` + commentArray[i].description + `</p></div></div>`;			
			}
			
			document.getElementById("comments").innerHTML = newHTML;
			document.getElementById("commentCount").innerHTML = commentArray.length + " comentarios";
			
		}
	});
}

function showRelatedProducts() {
	getJSONData(PRODUCTS_URL).then(function(resultObj) {
		if (resultObj.status === "ok") {
			
			let newHTML = "";
			let rpArray = product.relatedProducts;
			let productsInfo = resultObj.data;
			
			for (let i = 0; i < rpArray.length; i++) {
				newHTML += `<div class="col-lg-3 col-md-4 col-6">
								<div class="d-block mb-4 h-100">
									<p><b>` + productsInfo[rpArray[i]].name + `</b></p>
									<a href=""><img class="img-fluid img-thumbnail" src="` + productsInfo[rpArray[i]].imgSrc + `" alt="Imagen del producto ` + productsInfo[rpArray[i]].name + `"></a>
								</div>
							</div>`;
			}
			document.getElementById("relatedProductsGallery").innerHTML = newHTML;
		}
	});
}

function postComment() {
	/* 	Para formatear la fecha en formato yyyy-mm-dd HH-MM-ss como está en el JSON
		usé una librería escrita por Steven Levithan llamada "date.format"
		Toda la documentación está en: http://blog.stevenlevithan.com/archives/date-time-format
		Link de la librería (linkeada en product-info.html): http://stevenlevithan.com/assets/misc/date.format.js
	*/	
	let unformmatedDate = new Date();
	let newCommentData = {
		score: parseInt(document.getElementById("rateSlider").value),
		description: document.getElementById("commentText").value,
		user: localStorage.getItem("user"),
		dateTime: dateFormat(unformmatedDate, "yyyy-mm-dd HH-MM-ss")
	};
	commentArray.push(newCommentData);
	showComments();
	document.getElementById("commentText").value = "";
	window.location.href = "#comments"
}

document.addEventListener("DOMContentLoaded", function(){
	getJSONData(PRODUCT_INFO_URL).then(function(resultObj ){
        if (resultObj.status === "ok") {
            product = resultObj.data;

            document.getElementById("productName").innerHTML = product.name;
            document.getElementById("productDescription").innerHTML = product.description
            document.getElementById("productPrice").innerHTML = product.cost + " " + product.currency;
            document.getElementById("productCategory").innerHTML = product.category;
            document.getElementById("carname_warning_p").innerHTML = product.name;

            showImagesGallery(product.images);
        }
    });
	
	showComments();
	showRelatedProducts();
	
	document.getElementById("form_add_comment").addEventListener("submit", function(evt) {
		evt.preventDefault();
		postComment();
	});
});