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
    this.handleDeleteItem = this.handleDeleteItem.bind(this);
    this.handleEditItem = this.handleEditItem.bind(this);
  }
  
  handleAddItem(item) {
    this.setState({ items: this.state.items.concat(item) });
  }
  
  handleDeleteItem(id) {
    return () => {
      const newItems = this.state.items.filter(item => item.id !== id);
      this.setState({ items: newItems });
    };
  }
  
  handleEditItem(id) {
    return (newItem) => {
      const newItems = this.state.items.map(item => {
        return item.id === id ? Object.assign({}, item, newItem) : item;
      });
      this.setState({ items: newItems });
    };
  }
  
  render () {
    const basketItems = this.state.items.map((item) => {
      return (
        <BasketItem
          handleDelete={this.handleDeleteItem(item.id)}
          handleEdit={this.handleEditItem(item.id)}
          key={item.id}
          name={item.name}
          quantity={item.quantity}/>
      );
    });
    
    return (
      <div className="basket">
        <div className="title">This is a basket</div>
        <BasketForm
          handleAddItem={this.handleAddItem}/>
        {basketItems}
      </div>
    );
  }
}

export default Basket;
