import React from 'react';

class BasketForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      quantity: 1,
    };
  }
  
  handleAddItem(e) {
    e.preventDefault();
    // this.props.handleAddItem();
  }
  
  handleNameChange(e) {
    this.setState({ name: e.target.name });
  }
  
  handleQuantityChange(num) {
    return (e) => {
      if (num) {
        const newVal = this.state.quantity + num;
        if (newVal >= 1) {
          this.setState({ quantity: newVal });
        }
      } else {
        if (e.target.value >= 1) {
          this.setState({ quantity: e.target.value });
        } else {
          this.setState({ quantity: 1 });
        }
      }
    };
  }
  
  render () {
    return (
      <form className="add-item-form"
        onSubmit={this.handleAddItem}>
        <input className="name"
          onChange={this.handleNameChange}
          value={this.state.name} />
        <input className="quantity"
          onChange={this.handleQuantityChange()}
          value={this.state.quantity} />
        <input className="increment-up-button"
          onClick={this.handleQuantityChange(1)}
          type="button"
          value="+" />
        <input className="increment-down-button"
          onClick={this.handleQuantityChange(-1)}
          disabled={this.state.quantity <= 1}
          type="button"
          value="-" />
        <input className="button"
          type="submit"
          value="Add Item" />
      </form>
    );
  }
}

export default BasketForm;
