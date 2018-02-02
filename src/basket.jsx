import React from 'react';
import BasketForm from './basket_form';
import BasketItem from './basket_item';

class Basket extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      items: [],
    };
  }
  
  handleAddItem() {
    this.setState({ items: this.state.items.concat() });
  }
  
  render () {
    return (
      <div className="basket">
        This is a basket
        <BasketForm />
      </div>
    );
  }
}

export default Basket;
