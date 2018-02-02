import React from 'react';

class BasketItem extends React.Component {
  constructor(props) {
    super(props);
    // this.props.name
    // this.props.quantity
  }
  
  render () {
    return (
      <div className="basket-item">
        name: {this.props.name}
        quantity: {this.props.quantity}
      </div>
    );
  }
}

export default BasketItem;
