import React from 'react';
import BasketForm from './basket_form';
import BasketItem from './basket_item';

class Basket extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      items: [],
    };
    this.handleAddItem = this.handleAddItem.bind(this);
  }
  
  handleAddItem(item) {
    this.setState({ items: this.state.items.concat(item) });
  }
  
  render () {
    const basketItems = this.state.items.map((item) => {
      return (
        <BasketItem
          key={item.id}
          name={item.name}
          quantity={item.quantity}/>
      );
    });
    
    return (
      <div className="basket">
        This is a basket
        <BasketForm
          handleAddItem={this.handleAddItem}/>
        {basketItems}
      </div>
    );
  }
}

export default Basket;
