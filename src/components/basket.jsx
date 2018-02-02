import React from 'react';
import BasketForm from './basket_form';
import BasketItem from './basket_item';
import { deepCopy } from '../util/deep_copy';

class Basket extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      items: [],
      hideInBasketItems: false,
      history: [],
    };
    this.handleAddItem = this.handleAddItem.bind(this);
    this.handleDeleteItem = this.handleDeleteItem.bind(this);
    this.handleEditItem = this.handleEditItem.bind(this);
    this.handleToggleHideBasketItems = this.handleToggleHideBasketItems.bind(this);
    this.handleDeleteBasketItems = this.handleDeleteBasketItems.bind(this);
    this.updateHistory = this.updateHistory.bind(this);
    this.handleUndoChange = this.handleUndoChange.bind(this);
  }
  
  handleAddItem(itemToAdd) {
    this.updateHistory();
    let newItem;
    
    // Look in items for item of same name
    // If found, just update the quant
    for (var i = 0; i < this.state.items.length; i++) {
      const item = this.state.items[i];
      if (item.name.toLowerCase() === itemToAdd.name.toLowerCase()) {
        newItem = Object.assign({}, item);
        newItem.quantity += itemToAdd.quantity;
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
      this.updateHistory();
      const newItems = this.state.items.filter(item => item.id !== id);
      this.setState({ items: newItems });
    };
  }
  
  updateHistory() {
    const newEntry = {
      items: deepCopy(this.state.items),
      hideInBasketItems: this.state.hideInBasketItems,
    };
    this.setState({
      history: this.state.history.slice(this.state.history.length - 40).concat(newEntry)
    });
  }
  
  handleUndoChange() {
    const pastEntry = this.state.history[this.state.history.length - 1];
    this.setState({
      items: pastEntry.items,
      hideInBasketItems: pastEntry.hideInBasketItems,
      history: this.state.history.slice(0, this.state.history.length - 1),
    });
  }
  
  handleEditItem(id) {
    return newItem => {
      this.updateHistory();
      const newItems = this.state.items.map(item => {
        return item.id === id ? Object.assign({}, item, newItem) : item;
      });
      this.setState({ items: newItems });
    };
  }
  
  handleToggleHideBasketItems() {
    this.updateHistory();
    this.setState({ hideInBasketItems: !this.state.hideInBasketItems });
  }
  
  handleDeleteBasketItems() {
    this.updateHistory();
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
        <div className="title">Basket</div>
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
          <input className="undo-change button"
            type="button"
            onClick={this.handleUndoChange}
            value="Undo Change"
            disabled={this.state.history.length === 0}/>
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
