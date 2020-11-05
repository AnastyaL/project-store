//заглушки (имитация базы данных)
const image = 'https://placehold.it/200x150';
const cartImage = 'https://placehold.it/100x80';
const API_URL = 'https://raw.githubusercontent.com/AnastyaL/project-store/master/json';

let userCart = []

class List {
	constructor (url, container) {
		this.container = container
		this.goods = []
		this._init()
		this.allProducts = []
		this.url = url
		//this.handleData(fetchGoods())
	}
	_init() {
		return false
	} 
	getJSON(url) {
		return fetch(url ? url : `${API_URL + this.url}`)
			.then(result => result.json())
			.catch(error => {console.log(error)})
	}
	render () {
		const block = document.querySelector(this.container)
		for (let product of this.goods) {
			const prod = new lists[this.constructor.name] (product)
			this.allProducts.push(prod)
			block.insertAdjacentHTML ('beforeend', prod.render())
		}
	}
	handleData (data) {
		this.goods = [...data]
		this.render()
	}
}

class Item {
	constructor (el, img = 'https://placehold.it/200x150') {
		this.product_name = el.product_name
		this.price = el.price
		this.id_product = el.id_product
		this.img = img
	}
	render() {
		return `<div class="product-item" data-id="${this.id_product}">
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
	constructor (cart, url = `/product_base.json`, container = '.products') {
		super (url, container)
		this.cart = cart
		this.getJSON()
			.then(data =>this.handleData(data))
	}
	_init() {
		document.querySelector(this.container).addEventListener('click', evt=>{
			if (evt.target.classList.contains('buy-btn')) {
				evt.preventDefault()
				this.cart.addProduct(evt.target)
			}
		})
	}
}

class Cart extends List {
	constructor (cart, url= `/getBasket.json`, container = '.cart-block') {
		super(url, container)
		this.getJSON()
			.then (data => this.handleData(data.contents))
	}
	addProduct (element) {
		this.getJSON(`${API_URL}/addToBasket.json`)
			.then(data =>{
				if (data.result) {
					let productID = +element.dataset['id']
					let find = this.allProducts.find(product => product.id_product === productID)
					if (find) {
						find.quantity++
						this._updateCart(find)
					} else {
						let product = {
							id_product: productID,
							price: +element.dataset['price'],
							product_name: element.dataset['name'],
							quantity: 1
						}
						this.goods=[product]
						this.render()
					}
				} else {
					console.log('some err')
				}
			})
	}
	removeProduct(element){
		this.getJSON(`${API_URL}/removeFromBasket.json`)
			.then(data =>{
				if (data.result) {
					let productId = +element.dataset['id']
					let find = this.allProducts.find(product => product.id_product === productId)
					if (find.quantity>1) {
						find.quantity--
						this._updateCart(find) 
					} else {
						this.allProducts.splice(this.allProducts.indexOf(find),1)
						document.querySelector(`.cart-item[data-id="${productId}"]`).remove()
					}
				}
			})
	}
	_init(){
		document.querySelector(this.container).addEventListener('click', evt =>{
			if (evt.target.classList.contains('del-btn')) {
				this.removeProduct(evt.target)
			}
		})
		document.querySelector('.btn-cart').addEventListener('click', () =>{
			document.querySelector(this.container).classList.toggle('invisible')
		})
	}
	_updateCart(product) {
		let block = document.querySelector(`.cart-item[data-id="${product.id_product}"]`)
		block.querySelector('.product-quantity').textContent = `${product.quantity}`
		block.querySelector('.product-price').textContent = `${product.quantity}*${product.price}`
	}
}

class ProductItem extends Item {

}

class CartItem extends Item {
	constructor (el, img = 'https://placehold.it/50x100') {
		super (el, img)
		this.quantity = el.quantity
	}
	render() {
		return `<div class="cart-item" data-id="${this.id_product}">
					<div class="product-bio">
						<img src="${this.img}" alt="Some img">
						<div class="product-desc">
							<p class="product-title">${this.product_name}</p>
							<p class="product-quantity">К-во: ${this.quantity}</p>
							<p class="product-single-price">${this.price}</p>
						</div>
					</div>
					<div class="right-block">
						<p class="product-price">${this.quantity*this.price}</p>
						<button class="del-btn" data-id="${this.id_product}">&times;</button>
					</div>
				</div>
				`
	}
}

let lists = {
	ProductsList: ProductItem,
	Cart: CartItem,
}

let cart = new Cart()
let pr = new ProductsList(cart)


// document.querySelector ('.btn-cart').addEventListener ('click', () => {
// 	document.querySelector ('.cart-block').classList.toggle ('invisible')
// })



