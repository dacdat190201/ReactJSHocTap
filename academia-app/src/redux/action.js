function addProduct(giaban){
    localStorage.clear();
    let products = [];
    if(localStorage.getItem('products')){
        products = JSON.parse(localStorage.getItem('products'));
    }
    products.push({'giaban' : giaban, image : '<imageLink>'});
    localStorage.setItem('products', JSON.stringify(products));
}
function removeProduct(productId){

    // Your logic for your app.

    // strore products in local storage

    let storageProducts = JSON.parse(localStorage.getItem('products'));
    let products = storageProducts.filter(product => product.productId !== productId );
    localStorage.setItem('products', JSON.stringify(products));
}