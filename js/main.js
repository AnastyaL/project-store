//заглушки (имитация базы данных)
const image = 'https://placehold.it/200x150';
const cartImage = 'https://placehold.it/100x80';

const items = ['Notebook', 'Display', 'Keyboard', 'Mouse', 'Phones', 'Router', 'USB-camera', 'Gamepad'];
const prices = [1000, 200, 20, 10, 25, 30, 18, 24];
const ids = [1, 2, 3, 4, 5, 6, 7, 8];

let userCart = []

function fetchData () {
	let arr = [];
	for (let i = 0; i < items.length; i++) {
		arr.push({
			id: ids[i],
			title: items[i],
			price: prices[i],
			img: image
		})
	}
	return arr
}

class List {
	constructor (container) {
		this. container = container
		this.goods = []
		this._init()
		this.allProducts = []
		this.handleData(fetchData())
	}
	_init() {
		return false
	} 
	_render () {
		const block = document.querySelector(this.container)
		for (let product of this.goods) {
			const prod = new lists[this.constructor.name] (product)
			this.allProducts.push(prod)
			block.insertAdjacentHTML ('beforeend', prod.render())
		}
	}

	handleData(data) {
		this.goods = [...data]
		this._render()
	}
}

class Item {
	constructor (el, img = 'https://placehold.it/200x150') {
		this.product_name = el.title
		this.price = el.price
		this.id_product = el.id
		this.img = img
	}
	render() {
		return `<div class="product-item" data-id=${this.id_product}>
					<img src="${this.img}" alt="Some img">
					<div class="desc">
						<h3>${this.product_name}</h3>
						<p>${this.price} $</p>
						<button class="buy-btn" 
						data-name="${this.product_name}"
						data-image="${this.img}"
						data-price="${this.price}"
						data-id="${this.id_product}">Купить</button>
					</div>
				</div>`
	}
	

}

class ProductsList extends List {
	constructor (container = '.products') {
		super (container)
	}
}

class Cart extends List {
	constructor (container = '.cart-block') {
		super (container)
	}
}

class ProductItem extends Item {

}

class CartItem extends Item {

}

let lists = {
	ProductsList: ProductItem,
	Cart: CartItem,
}

let pr = new ProductsList()


//Глобальные сущности 
// var list = fetchData ();
// var userCart = [];

document.querySelector ('.btn-cart').addEventListener ('click', () => {
	document.querySelector ('.cart-block').classList.toggle ('invisible')
})

// document.querySelector ('.products').addEventListener ('click', (evt) => {
// 	if (evt.target.classList.contains ('buy-btn')) {
// 		addProduct (evt.target);
// 	}
// })

// document.querySelector ('.cart-block').addEventListener ('click', (evt) => {
// 	if (evt.target.classList.contains ('del-btn')) {
// 		removeProduct (evt.target);
// 	}
// })

// function fetchData () {
// 	let arr = [];
// 	for (let i = 0; i < items.length; i++) {
// 		arr.push (createProduct (i));
// 	}
// 	return arr
// }

// function createProduct (i) {
// 	return {
// 		id: i,
// 		name: items[i],
// 		price: prices[i],
// 		img: image,
// 		quantity: 0,
// 		createTemplate: function () {
// 			return `<div class="product-item" data-id="${this.id}">
//                         <img src="${this.img}" alt="Some img">
//                         <div class="desc">
//                             <h3>${this.name}</h3>
//                             <p>${this.price} $</p>
//                             <button class="buy-btn" 
//                             data-id="${this.id}"
//                             data-name="${this.name}"
//                             data-image="${this.img}"
//                             data-price="${this.price}">Купить</button>
//                         </div>
//                     </div>`
// 		}
// 	}
// }

// function renderProducts () {
// 	let arr = [];
// 	for (item of list) {
// 		arr.push (item.createTemplate ())
// 	}
// 	document.querySelector ('.products').innerHTML = arr.join ('');
// }

// renderProducts ();


// //CART
// function addProduct (product) {
// 	let productId = +product.dataset['id'];
// 	let find = userCart.find (element => element.id === productId)
// 	//либо find = userCart [?] (obj) || false

// 	if (!find) {
// 		userCart.push ({
// 			name: product.dataset['name'],
// 			id: productId,
// 			img: cartImage,
// 			price: +product.dataset['price'],
// 			quantity: 1
// 		})
// 	} else {
// 		find.quantity++
// 	}
// 	renderCart ();
// }	

// function removeProduct (product) {
// 	let productId = +product.dataset['id'];
// 	let find = userCart.find (element => element.id === productId)
// 	//либо find = userCart [?] (obj) || false

// 	if (find.quantity > 1) {
// 		find.quantity--
// 	} else {
// 		userCart.splice (userCart.indexOf(find), 1);
// 		document.querySelector (`.cart-item[data-id="${productId}"]`).remove ()
// 	}
// 	renderCart ();
// }

// function renderCart () {
// 	let allProducts = '';
// 	for (item of userCart) {
// 		allProducts += `<div class="cart-item" data-id="${item.id}">
//                             <div class="product-bio">
//                                 <img src="${item.img}" alt="Some image">
//                                 <div class="product-desc">
//                                     <p class="product-title">${item.name}</p>
//                                     <p class="product-quantity">Quantity: ${item.quantity}</p>
//                                     <p class="product-single-price">$${item.price} each</p>
//                                 </div>
//                             </div>
//                             <div class="right-block">
//                                 <p class="product-price">${item.quantity * item.price}</p>
//                                 <button class="del-btn" data-id="${item.id}">&times;</button>
//                             </div>
//                         </div>`
// 	}
// 	document.querySelector ('.cart-block').innerHTML = allProducts;
// }

