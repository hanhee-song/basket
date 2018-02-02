import React from 'react';

class BasketItem extends React.Component {
  constructor(props) {
    super(props);
    // this.props.name
    // this.props.quantity
    // this.props.handleDelete
    // this.props.handleEdit
    
    this.state = {
      name: this.props.name,
      quantity: this.props.quantity,
    };
    this.changeInBasket = this.changeInBasket.bind(this);
    this.handleIncrement = this.handleIncrement.bind(this);
  }
  
  changeInBasket() {
    this.props.handleEdit(Object.assign(
      {},
      this.props.item,
      { inBasket: !this.props.item.inBasket }
    ));
  }
  
  handleIncrement(num) {
    return (e) => {
      this.props.handleEdit(Object.assign(
        {},
        this.props.item,
        { quantity: this.props.item.quantity + num }
      ));
    };
  }
  
  render () {
    const item = this.props.item;
    return (
      <div className={`basket-item ${item.inBasket ? "opaque" : ""}`}>
        <div className="col-1">
          <div className="checkbox"
            onClick={this.changeInBasket}>
            <i className={`fa fa${item.inBasket ? "-check" : ""}-square-o`}></i>
          </div>
        </div>
        <div className="col col-2">
          <div className="quantity">{item.quantity}</div>
        </div>
        <div className="col col-3">
          <div className="name">{item.name}</div>
        </div>
        <div className="col col-4">
          <input className="button increment-down"
            onClick={this.handleIncrement(-1)}
            disabled={this.props.item.quantity <= 1}
            type="button"
            value="-"/>
          <input className="button increment-up"
            onClick={this.handleIncrement(1)}
            type="button"
            value="+"/>
        </div>
        <div className="col col-5">
          <input className="button delete"
            onClick={this.props.handleDelete}
            type="button"
            value="Delete"/>
        </div>
      </div>
    );
  }
}

export default BasketItem;
