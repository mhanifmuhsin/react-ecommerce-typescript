import React, { FC, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faShoppingCart,faTrashAlt } from '@fortawesome/free-solid-svg-icons'
import productList from './data';

interface IProducts {
    id: number,
    name: string,
    category: string,
    price: number,
    picture: string,
    detail: string
}

interface ICarts {
    id: number
    name: string,
    price: number
}

const Home: FC = () => {
    // products state
    const [products, setProduct] = useState<IProducts[]>(productList)
    // product preview state
    const [productPreview, setProductPreview] = useState<IProducts[]>()
    // carts state
    const [carts, setCart] = useState<ICarts[]>([])
    // initial carts state
    const initialState: ICarts[] = [];
    // function for find by id
    const findById = (id: number) => {
        setProductPreview(products.filter(product => product.id === id));
    }
    // function for find by category
    const findByCategory = (category: string) => {
        setProduct(products.filter(product => product.category === category))
    }
    // on change for set product list to normal
    const onChangeCategory = () => {
        setProduct(productList);
    }
    // function for handle cart (add to cart)
    const handleCart = (name: string, price: number) => {
        const id = Math.floor(Math.random() * 100)
        const data = { id: id, name: name, price: price }
        setCart([...carts, data]);
    }
    // function for delete item in cart
    const deleteItem = (id: number) => setCart(carts.filter(item => item.id !== id));
    // function for calculate total payment 
    const totalPayment = carts.reduce((total: number, item: ICarts) => {
        return total + (item.price)
    }, 0)
    // function for reset cart to 0
    const resetCart = () => {
        setCart(initialState);
    }
    return (
        <>
        {/* Navbar */}
            <nav className="navbar navbar-expand-lg navbar-light bg-light fixed-top">
                <a className="navbar-brand" href="#">E-Commerce</a>
                <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
                    <div className="navbar-nav">
                        <a className="nav-item nav-link" href="#" data-toggle="modal" data-target="#cart"><FontAwesomeIcon icon={faShoppingCart} /> Cart <span className='totalItem'>{carts.length}</span></a>
                    </div>
                </div>
                <form className="form-inline my-2 my-lg-0">
                    <input className="form-control mr-sm-2" type="search" placeholder="Enter category" id='search' aria-label="Search" onChange={onChangeCategory} />
                    <button className="btn btn-outline-success my-2 my-sm-0" type="button" onClick={(e) => findByCategory((document.getElementById("search") as HTMLInputElement).value)}>Show</button>
                </form>
            </nav>

        {/* Content */}
            <div className='container'>
                <div className='flex row'>
                    {products.length > 0 ? (
                        products.map((product, index) => {
                            return (
                                <div className="card m-auto pt-2" style={{ width: '18rem' }} key={index}>
                                    <img className="card-img-top" src={product.picture} alt="Card image cap" />
                                    <div className="card-body">
                                        <h5 className="card-title">{product.name}</h5>
                                        <ul className="list-group list-group-flush">
                                            <li className="list-group-item"><strong>Category</strong> : {product.category}</li>
                                            <li className="list-group-item"><strong>Price</strong> : $ {product.price}</li>
                                        </ul>
                                        <button type="button" className="btn btn-secondary btn-sm m-2" data-toggle="modal" data-target="#detail" onClick={() => findById(product.id)} >
                                            Details
                                        </button>
                                        <button type="button" className="btn btn-primary btn-sm m-2" onClick={() => handleCart(product.name, product.price)}>
                                            Add to cart
                                        </button>
                                    </div>
                                </div>
                            )
                        })
                    ) : (
                        <div className="alert alert-warning mx-auto mt-10" role="alert">
                            Category Not found
                        </div>
                    )}

                    {/* modal detail */}
                    <div className="modal fade" id="detail" tab-index="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
                        <div className="modal-dialog modal-dialog-centered" role="document">
                            <div className="modal-content">
                                <div className="modal-header">
                                    <h5 className="modal-title" id="exampleModalLongTitle">Details</h5>
                                    <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                        <span aria-hidden="true">&times;</span>
                                    </button>
                                </div>
                                <div className="modal-body">
                                    {productPreview && productPreview.map((item, index) => {
                                        return (<ul className="list-group list-group-flush" key={index}>
                                            <li className="list-group-item"><strong>Name</strong> : {item.name}</li>
                                            <li className="list-group-item"><strong>Category</strong>  : {item.category}</li>
                                            <li className="list-group-item"><strong>Price</strong>  : $ {item.price}</li>
                                            <li className="list-group-item"><strong>Detail</strong>  : {item.detail}</li>
                                        </ul>)
                                    })}
                                </div>
                                <div className="modal-footer">
                                    <button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* modal cart */}
                    <div className="modal fade" id="cart" tab-index="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
                        <div className="modal-dialog modal-dialog-centered" role="document">
                            <div className="modal-content">
                                <div className="modal-header">
                                    <h5 className="modal-title" id="exampleModalLongTitle">Cart</h5>
                                    <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                        <span aria-hidden="true">&times;</span>
                                    </button>
                                </div>
                                <div className="modal-body">
                                    {carts.length > 0 ? (
                                        <div>
                                            <table className="table table-sm">
                                                <thead>
                                                    <tr>
                                                        <th scope="col">Name</th>
                                                        <th scope="col">Price</th>
                                                        <th scope="col">Action</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {carts && carts.map((item, index) => {
                                                        return <tr key={index}>
                                                            <td>{item.name}</td>
                                                            <td>{item.price}</td>
                                                            <td><button type='button' onClick={() => deleteItem(item.id)}><FontAwesomeIcon icon={faTrashAlt} /> </button></td>
                                                        </tr>
                                                    })}
                                                </tbody>
                                            </table>
                                            <p>Total payment : $ {totalPayment}</p>
                                        </div>
                                    ) : (
                                        <div className="alert alert-warning" role="alert">
                                            The shopping cart is empty, please select the item first
                                        </div>
                                    )}
                                </div>
                                <div className="modal-footer">
                                    {carts.length > 0 ? (
                                        <div>
                                            <button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
                                            <button type="button" className="btn btn-primary m-2" data-dismiss="modal" data-toggle="modal" data-target="#payment" onClick={resetCart} >Pay</button>
                                        </div>
                                    ) : (
                                        <div>
                                            <button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* modal payment */}

                    <div className="modal fade" id="payment" tab-index="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
                        <div className="modal-dialog modal-dialog-centered" role="document">
                            <div className="modal-content">
                                <div className="modal-header">
                                    <h5 className="modal-title" id="exampleModalLongTitle">Payment</h5>
                                    <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                        <span aria-hidden="true">&times;</span>
                                    </button>
                                </div>
                                <div className="modal-body">
                                    <div className="alert alert-success" role="alert">
                                        <p>Thank's Muhamad Hanif Muhsin, Purchased items will be sent to the address : Baleendah</p>
                                        <p>Payment is successful, thank you for shopping at our shop</p>
                                    </div>
                                </div>
                                <div className="modal-footer">
                                    <button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
                                </div>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </>

    )
}

export default Home;