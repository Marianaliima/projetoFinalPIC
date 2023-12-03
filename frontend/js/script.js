
let modalKey = 0

let quantcupcakes = 1

let cart = [] 

const seleciona = (elemento) => document.querySelector(elemento)
const selecionaTodos = (elemento) => document.querySelectorAll(elemento)

const formatoReal = (valor) => {
    return valor.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })
}

const formatoMonetario = (valor) => {
    if(valor) {
        return valor.toFixed(2)
    }
}

const abrirModal = () => {
    seleciona('.cupcakeWindowArea').style.opacity = 0 
    seleciona('.cupcakeWindowArea').style.display = 'flex'
    setTimeout(() => seleciona('.cupcakeWindowArea').style.opacity = 1, 150)
}

const fecharModal = () => {
    seleciona('.cupcakeWindowArea').style.opacity = 0 
    setTimeout(() => seleciona('.cupcakeWindowArea').style.display = 'none', 500)
}

const botoesFechar = () => {
    selecionaTodos('.cupcakeInfo--cancelButton, .cupcakeInfo--cancelMobileButton').forEach( (item) => item.addEventListener('click', fecharModal) )
}

const preencheDadosDascupcakes = (cupcakeItem, item, index) => {
	cupcakeItem.setAttribute('data-key', index)
    cupcakeItem.querySelector('.cupcake-item--img img').src = item.img
    cupcakeItem.querySelector('.cupcake-item--price').innerHTML = formatoReal(item.price[2])
    cupcakeItem.querySelector('.cupcake-item--name').innerHTML = item.name
    cupcakeItem.querySelector('.cupcake-item--desc').innerHTML = item.description
}

const preencheDadosModal = (item) => {
    seleciona('.cupcakeBig img').src = item.img
    seleciona('.cupcakeInfo h1').innerHTML = item.name
    seleciona('.cupcakeInfo--desc').innerHTML = item.description
    seleciona('.cupcakeInfo--actualPrice').innerHTML = formatoReal(item.price[2])
}

const pegarKey = (e) => {
    let key = e.target.closest('.cupcake-item').getAttribute('data-key')
    console.log('cupcake clicada ' + key)
    console.log(cupcakeJson[key])

    quantcupcakes = 1

    modalKey = key

    return key
}

const preencherTamanhos = (key) => {
    seleciona('.cupcakeInfo--size.selected').classList.remove('selected')

    selecionaTodos('.cupcakeInfo--size').forEach((size, sizeIndex) => {
        (sizeIndex == 2) ? size.classList.add('selected') : ''
        size.querySelector('span').innerHTML = cupcakeJson[key].sizes[sizeIndex]
    })
}

const escolherTamanhoPreco = (key) => {
    selecionaTodos('.cupcakeInfo--size').forEach((size, sizeIndex) => {
        size.addEventListener('click', (e) => {
            seleciona('.cupcakeInfo--size.selected').classList.remove('selected')
            size.classList.add('selected')

            seleciona('.cupcakeInfo--actualPrice').innerHTML = formatoReal(cupcakeJson[key].price[sizeIndex])
        })
    })
}

const mudarQuantidade = () => {
    seleciona('.cupcakeInfo--qtmais').addEventListener('click', () => {
        quantcupcakes++
        seleciona('.cupcakeInfo--qt').innerHTML = quantcupcakes
    })

    seleciona('.cupcakeInfo--qtmenos').addEventListener('click', () => {
        if(quantcupcakes > 1) {
            quantcupcakes--
            seleciona('.cupcakeInfo--qt').innerHTML = quantcupcakes	
        }
    })
}

const adicionarNoCarrinho = () => {
    seleciona('.cupcakeInfo--addButton').addEventListener('click', () => {
        console.log('Adicionar no carrinho')

    	console.log("cupcake " + modalKey)
	    let size = seleciona('.cupcakeInfo--size.selected').getAttribute('data-key')
	    console.log("Tamanho " + size)
    	console.log("Quant. " + quantcupcakes)
        let price = seleciona('.cupcakeInfo--actualPrice').innerHTML.replace('R$&nbsp;', '')
    
	    let identificador = cupcakeJson[modalKey].id+'t'+size

        let key = cart.findIndex( (item) => item.identificador == identificador )
        console.log(key)

        if(key > -1) {
            cart[key].qt += quantcupcakes
        } else {
            let cupcake = {
                identificador,
                id: cupcakeJson[modalKey].id,
                size, 
                qt: quantcupcakes,
                price: parseFloat(price) 
            }
            cart.push(cupcake)
            console.log(cupcake)
            console.log('Sub total R$ ' + (cupcake.qt * cupcake.price).toFixed(2))
        }

        fecharModal()
        abrirCarrinho()
        atualizarCarrinho()
    })
}

const abrirCarrinho = () => {
    console.log('Qtd de itens no carrinho ' + cart.length)
    if(cart.length > 0) {
	    seleciona('aside').classList.add('show')
        seleciona('header').style.display = 'flex' 
    }

    seleciona('.menu-openner').addEventListener('click', () => {
        if(cart.length > 0) {
            seleciona('aside').classList.add('show')
            seleciona('aside').style.left = '0'
        }
    })
}

const fecharCarrinho = () => {
    seleciona('.menu-closer').addEventListener('click', () => {
        seleciona('aside').style.left = '100vw' 
        seleciona('header').style.display = 'flex'
    })
}

const atualizarCarrinho = () => {
	seleciona('.menu-openner span').innerHTML = cart.length
	
	if(cart.length > 0) {

		seleciona('aside').classList.add('show')

		seleciona('.cart').innerHTML = ''

		let subtotal = 0
		let desconto = 0
		let total    = 0

		for(let i in cart) {
			let cupcakeItem = cupcakeJson.find( (item) => item.id == cart[i].id )
			console.log(cupcakeItem)

        	subtotal += cart[i].price * cart[i].qt

			let cartItem = seleciona('.models .cart--item').cloneNode(true)
			seleciona('.cart').append(cartItem)

			let cupcakeSizeName = cart[i].size

			let cupcakeName = `${cupcakeItem.name} (${cupcakeSizeName})`

			cartItem.querySelector('img').src = cupcakeItem.img
			cartItem.querySelector('.cart--item-nome').innerHTML = cupcakeName
			cartItem.querySelector('.cart--item--qt').innerHTML = cart[i].qt

			cartItem.querySelector('.cart--item-qtmais').addEventListener('click', () => {
				console.log('Clicou no botão mais')
				cart[i].qt++
				atualizarCarrinho()
			})

			cartItem.querySelector('.cart--item-qtmenos').addEventListener('click', () => {
				console.log('Clicou no botão menos')
				if(cart[i].qt > 1) {
					cart[i].qt--
				} else {
					cart.splice(i, 1)
				}

                (cart.length < 1) ? seleciona('header').style.display = 'flex' : ''

				atualizarCarrinho()
			})

			seleciona('.cart').append(cartItem)

		} 

		desconto = subtotal * 0
		total = subtotal - desconto

		
		seleciona('.subtotal span:last-child').innerHTML = formatoReal(subtotal)
		seleciona('.desconto span:last-child').innerHTML = formatoReal(desconto)
		seleciona('.total span:last-child').innerHTML    = formatoReal(total)

	} else {
		seleciona('aside').classList.remove('show')
		seleciona('aside').style.left = '100vw'
	}
}

const finalizarCompra = () => {
    seleciona('.cart--finalizar').addEventListener('click', () => {
        console.log('Finalizar compra')
        seleciona('aside').classList.remove('show')
        seleciona('aside').style.left = '100vw'
        seleciona('header').style.display = 'flex'
    })
}


cupcakeJson.map((item, index ) => {
    let cupcakeItem = document.querySelector('.models .cupcake-item').cloneNode(true)
    seleciona('.cupcake-area').append(cupcakeItem)

    preencheDadosDascupcakes(cupcakeItem, item, index)
    
    cupcakeItem.querySelector('.cupcake-item a').addEventListener('click', (e) => {
        e.preventDefault()
        console.log('Clicou na cupcake')

        let chave = pegarKey(e)

        abrirModal()

        preencheDadosModal(item)

        
        preencherTamanhos(chave)

		seleciona('.cupcakeInfo--qt').innerHTML = quantcupcakes

        escolherTamanhoPreco(chave)

    })

    botoesFechar()

}) 

mudarQuantidade()

adicionarNoCarrinho()
atualizarCarrinho()
fecharCarrinho()
finalizarCompra()

