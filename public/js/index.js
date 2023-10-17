(function() {
  const socket = io();

 const listProducts = document.getElementById('listProducts');
 
  function updateListProducts(products) {
    listProducts.innerText = '';
    products.forEach((product) => {
      const cart = document.createElement('div');
      cart.className='col-md-3 col-sm-6 mb-4'
      cart.innerHTML = `
      <em class="small">ID: ${product.id}</em>
         <div class="product-grid">
             <div class="product-image">
               
                 <a href="#" class="image">
                     ${ product.thumbnail.map((img) => {
                       return `<img class="pic-1" src="img/${img.url1}"><img class="pic-2" src="img/${img.url2}">`
                     } )}

                     
                 </a>
 
                 <a href=" " class="product-like-icon"><i class="fa fa-heart"></i></a>
 
                 <ul class="product-links">
                     <li><a href=" #"><i class="fa fa-heart"></i></a></li>
                     <li><a href=" #"><i class="fa fa-random"></i></a></li>
                     <li><a href=" #"><i class="fa fa-eye"></i></a></li>
                     <li><a href=" #"><i class="fa fa-shopping-cart"></i></a></li>
                 </ul>
 
             </div>
 
             <div class="product-content">
                 <h3 class="title"><a href=" #">${product.title}</a></h3>
                 <div class="price">$${product.price}</div>
             </div>
 
         </div>

      `;





      listProducts.appendChild(cart);
    });
  }

  


  socket.on('products', (products) => {
    updateListProducts(products);
  })

  socket.on('New-Product-from-api', (products) => {
    updateListProducts(products);
  });
})();