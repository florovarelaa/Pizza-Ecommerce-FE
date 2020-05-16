import React, { Component } from 'react';
import { connect } from 'react-redux'

class ItemCount extends Component {
    render() {
            return (
                <div>
                    {this.props.addedItems.length}
                </div>
            );
        }
}

const mapStateToProps = (state)=>{
    return {
        addedItems: state.addedItems,
    }
  }
const mapDispatchToProps= (dispatch)=>{
}

export default connect(mapStateToProps,mapDispatchToProps)(ItemCount)