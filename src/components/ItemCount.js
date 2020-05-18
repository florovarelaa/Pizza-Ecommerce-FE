import React, { Component } from 'react';
import { connect } from 'react-redux'

class ItemCount extends Component {

    render() {
        return (
            <div>
                {this.props.addedItems ? this.props.addedItems.reduce((accumulator, currentValue) => {
                    return accumulator + currentValue.quantity
                }, 0) : 0}
            </div>
        );
    }
}

const mapStateToProps = (state)=>{
    return {
        addedItems: state.addedItems,
    }
  }

export default connect(mapStateToProps)(ItemCount)