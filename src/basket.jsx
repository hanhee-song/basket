import React from 'react';
import BasketForm from './basket_form';
import BasketItem from './basket_item';

class Basket extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      items: [],
      hideInBasketItems: false,
    };
    this.handleAddItem = this.handleAddItem.bind(this);
    this.handleDeleteItem = this.handleDeleteItem.bind(this);
    this.handleEditItem = this.handleEditItem.bind(this);
    this.handleToggleHideBasketItems = this.handleToggleHideBasketItems.bind(this);
    this.handleDeleteBasketItems = this.handleDeleteBasketItems.bind(this);
  }
  
  handleAddItem(itemToAdd) {
    let newItem;
    
    // Look in items for item of same name
    // If found, just update the quant
    for (var i = 0; i < this.state.items.length; i++) {
      const item = this.state.items[i];
      if (item.name.toLowerCase() === itemToAdd.name.toLowerCase()) {
        newItem = Object.assign({}, item);
        newItem.quantity += 1;
        const items = this.state.items.slice(0, i)
          .concat(newItem)
          .concat(this.state.items.slice(i+1));
        this.setState({ items });
        return;
      }
    }
    // Otherwise, add it to the end
    newItem = Object.assign({}, itemToAdd,
        {
          inBasket: false,
          id: Math.random(),
        }
      );
    this.setState({ items: this.state.items.concat(newItem) });
  }
  
  handleDeleteItem(id) {
    return () => {
      const newItems = this.state.items.filter(item => item.id !== id);
      this.setState({ items: newItems });
    };
  }
  
  handleUndoDelete() {
    // TODO: bonus feature
  }
  
  handleEditItem(id) {
    return (newItem) => {
      const newItems = this.state.items.map(item => {
        return item.id === id ? Object.assign({}, item, newItem) : item;
      });
      this.setState({ items: newItems });
    };
  }
  
  handleToggleHideBasketItems() {
    this.setState({ hideInBasketItems: !this.state.hideInBasketItems });
  }
  
  handleDeleteBasketItems() {
    const items = this.state.items.filter(item => !item.inBasket);
    this.setState({ items });
  }
  
  render () {
    let basketItems = this.state.items;
    if (this.state.hideInBasketItems) {
      basketItems = basketItems.filter(item => !item.inBasket);
    }
    basketItems = basketItems.map(item => {
      return (
        <BasketItem
          handleDelete={this.handleDeleteItem(item.id)}
          handleEdit={this.handleEditItem(item.id)}
          key={item.id}
          item={item}/>
      );
    });
    
    return (
      <div className="basket">
        <div className="title">This is a basket</div>
        <BasketForm
          handleAddItem={this.handleAddItem}/>
        <div className="basket-controls">
          <div className="toggle-in-basket button"
            onClick={this.handleToggleHideBasketItems}>
            {`${this.state.hideInBasketItems ? "Show" : "Hide"} Basket Items`}
          </div>
          <div className="delete-in-basket button"
            onClick={this.handleDeleteBasketItems}>
            Delete Basket Items
          </div>
        </div>
        <div className="basket-item-index">
          <div className="basket-item-header">
            <div className="col-1"><i className="fa fa-shopping-cart" aria-hidden="true"></i>
            </div>
            <div className="col-2">No.</div>
            <div className="col-3">Name</div>
          </div>
          {basketItems}
        </div>
      </div>
    );
  }
}

export default Basket;
