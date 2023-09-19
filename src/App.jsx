import lazySofa from "./assets/lazy-sofa.jpg"
import { useState, useEffect } from "react"

export default function App(){

    if (!localStorage.getItem("cartItem")){
        localStorage.setItem("cartItem", JSON.stringify({}))
    }

    const [item, setItem] = useState({
        id: 1,
        total: 1,
        name: "La-Z-Sofa",
        price: 120,
        img: lazySofa,
        explanation: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Iusto provident modi optio omnis ut ipsa voluptatem soluta fugit? Aliquam labore nam voluptate debitis nesciunt! Cum architecto repellat earum excepturi ut.",
        texture: "Kapok",
        weight: 4,
        size: "150cm x 75cm"
    })

    const [isShoppingCartOpen, setIsShoppingCartOpen] = useState(false)

    const [cartItem, setCartItem] = useState(JSON.parse(localStorage.getItem("cartItem")))

    useEffect(() => {
        localStorage.setItem("cartItem", JSON.stringify(cartItem))
    }, [cartItem])

    function addQuantity(itemName){
        if (itemName === "item"){
            let total = item.total + 1
            let price = item.price / item.total
            setItem(item => ({...item, total: total, price: price * total}))

            return
        }

        let total = cartItem.total + 1
        let price = cartItem.price / cartItem.total
        setCartItem(cartItem => ({...cartItem, total: total, price: price * total}))
    }
    
    function minQuantity(itemName){
        if (itemName === "item"){
            if (item.total > 1){
                let total = item.total - 1
                let price = item.price / item.total
                setItem(item => ({...item, total: total, price: price * total}))

                return
            }
        }

        if (cartItem.total > 1){
            let total = cartItem.total - 1
            let price = cartItem.price / cartItem.total
            setCartItem(cartItem => ({...cartItem, total: total, price: price * total}))
        }
    }

    function addItemToShoppingCart(){
        setCartItem(item)
    }

    return (
        <>
        <nav className="navbar">
            <div className={`overlay ${isShoppingCartOpen ? "active" : ""}`} onClick={() => setIsShoppingCartOpen(false)}></div>
            <div className="title">Shopping Cart</div>
            <div className="shopping-cart-btn" onClick={() => setIsShoppingCartOpen(true)}>
                <svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-shopping-cart" width="24" height="24" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round">
                    <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
                    <path d="M6 19m-2 0a2 2 0 1 0 4 0a2 2 0 1 0 -4 0"></path>
                    <path d="M17 19m-2 0a2 2 0 1 0 4 0a2 2 0 1 0 -4 0"></path>
                    <path d="M17 17h-11v-14h-2"></path>
                    <path d="M6 5l14 1l-1 7h-13"></path>
                </svg>
                {
                    cartItem.id &&
                    <div className="cart-item-length">1</div>
                }
            </div>
            <div className={`shopping-cart ${isShoppingCartOpen ? "active" : ""}`}>
                <div className="header">
                    <div className="title">Shopping cart({cartItem.id ? "1" : "0"})</div>
                    <div className="close-shopping-cart" onClick={() => setIsShoppingCartOpen(false)}>
                        <svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-x" width="24" height="24" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round">
                            <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
                            <path d="M18 6l-12 12"></path>
                            <path d="M6 6l12 12"></path>
                        </svg>
                    </div>
                </div>
                {
                    cartItem.id &&
                    <div className="cart-items">
                        <div className="item">
                            <div className="img">
                                <img src={cartItem.img} alt="Image" />
                            </div>
                            <div className="content">
                                <div className="info">
                                    <div className="title">{cartItem.name}</div>
                                    <div className="delete" onClick={() => setCartItem({})}>
                                        <svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-trash" width="24" height="24" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round">
                                            <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
                                            <path d="M4 7l16 0"></path>
                                            <path d="M10 11l0 6"></path>
                                            <path d="M14 11l0 6"></path>
                                            <path d="M5 7l1 12a2 2 0 0 0 2 2h8a2 2 0 0 0 2 -2l1 -12"></path>
                                            <path d="M9 7v-3a1 1 0 0 1 1 -1h4a1 1 0 0 1 1 1v3"></path>
                                        </svg>
                                    </div>
                                </div>
                                <div className="plus-min-quantity-price">
                                    <div className="plus-min-quantity">
                                        <div className="min" onClick={() => minQuantity("cartItem")}>-</div>
                                        <div className="quantity">{cartItem.total}</div>
                                        <div className="plus" onClick={() => addQuantity("cartItem")}>+</div>
                                    </div>
                                    <div className="price">${cartItem.price}</div>
                                </div>
                            </div>
                        </div>
                    </div>
                }
            </div>
        </nav>
        <div className="items">
            <div className="item">
                <div className="img">
                    <img src={item.img} alt="Image" />
                </div>
                <div className="content">
                    <div className="info">
                        <div className="title">{item.name}</div>
                        <div className="text">{item.explanation}</div>
                        <div className="detail">
                            <div className="weight">
                                <div className="title">Weight</div>
                                <div className="value">{item.weight}kg</div>
                            </div>
                            <div className="texture">
                                <div className="title">Texture</div>
                                <div className="value">{item.texture}</div>
                            </div>
                            <div className="size">
                                <div className="title">Size</div>
                                <div className="value">{item.size}</div>
                            </div>
                        </div>
                        <div className="plus-min-quantity-price">
                            <div className="plus-min-quantity">
                                <div className="min" onClick={() => minQuantity("item")}>-</div>
                                <div className="quantity">{item.total}</div>
                                <div className="plus" onClick={() => addQuantity("item")}>+</div>
                            </div>
                            <div className="price">${item.price}</div>
                        </div>
                    </div>
                    <div className="add-to-cart-btn" onClick={addItemToShoppingCart}>Add to cart</div>
                </div>
            </div>
        </div>
        </>
    )
}