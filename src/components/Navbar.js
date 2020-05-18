import React from 'react';
import { Link } from 'react-router-dom'
import ItemCount from './ItemCount'

 const Navbar = ()=>{
    return(
            <nav className="nav-wrapper">
                <div className="container">
                    <Link to="/" className="brand-logo">Pizza Store</Link>
                    <ul className="right">
                        <li><Link to="/cart"><i className="material-icons">shopping_cart</i></Link></li>
                        <li><ItemCount /></li>
                    </ul>
                </div>
            </nav>
    )
}

export default Navbar;