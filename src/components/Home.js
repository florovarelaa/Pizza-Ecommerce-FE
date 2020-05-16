import React, { Component } from 'react';
import { connect } from 'react-redux'
import { addToCart, loadData } from './actions/cartActions'
import pizza_not_found from '../images/404_pizza_not_found.jpg';
import Spinner from './Spinner';

class Home extends Component {

    componentDidMount() {
        this.props.loadData(`${this.props.apiUrl}products`);
    }

    handleClick = (id) => {
        this.props.addToCart(id);
    }

    render() {
        let itemList = this.props.items.map(item => {
            return (
                <div className="card" key={item.id}>
                    <div className="card-image">
                        <img className="product-image" src={item.img ? item.img : pizza_not_found} alt={item.title} />
                        <span to="/" className="btn-floating halfway-fab waves-effect waves-light red" onClick={() => { this.handleClick(item.id) }}><i className="material-icons">add</i></span>
                    </div>
                    <span className="card-title">{item.title}</span>

                    <div className="card-content">
                        <p>{item.desc}</p>
                        <p><b>Price: {item.price}$</b></p>
                    </div>
                </div>
            )
        })

        if (this.props.loading === true) {
            return (
                <div className="center-spinner">
                    <Spinner />
                </div>
            );
        } else {
            return (
                <div className="container">
                    <h3 className="center">Our Products</h3>
                    <div className="box">
                        {itemList}
                    </div>
                </div>
            )
        }
    }
}

const mapStateToProps = (state)=>{
    return {
      items: state.items,
      products: state.products,
      loading: state.loading,
      apiUrl: state.apiUrl
    }
  }
const mapDispatchToProps= (dispatch)=>{
    
    return{
        addToCart: (id)=>{dispatch(addToCart(id))},
        loadData: (url) => {dispatch(loadData(url))}
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(Home)