import React from 'react';

class BasketForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      quantity: 1,
    };
    // this.props.handleAddItem
    this.handleAddItem = this.handleAddItem.bind(this);
    this.handleNameChange = this.handleNameChange.bind(this);
    this.handleQuantityChange = this.handleQuantityChange.bind(this);
  }
  
  handleAddItem(e) {
    e.preventDefault();
    if (this.state.name) {
      this.props.handleAddItem({
        name: this.state.name,
        quantity: parseInt(this.state.quantity),
      });
      this.setState({
        name: "",
        quantity: 1,
      });
    }
  }
  
  handleNameChange(e) {
    this.setState({ name: e.target.value });
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
        <div className="quantity-input-container">
          <input className="increment-button up"
            onClick={this.handleQuantityChange(1)}
            type="button"
            value="+" />
          <input className="increment-button down"
            onClick={this.handleQuantityChange(-1)}
            disabled={this.state.quantity <= 1}
            type="button"
            value="-" />
          <input className="quantity input"
            onChange={this.handleQuantityChange()}
            value={this.state.quantity} />
        </div>
        <input className="name input"
          onChange={this.handleNameChange}
          placeholder="What would you like to add?"
          value={this.state.name} />
        <input className="add-item-button"
          disabled={!this.state.name}
          type="submit"
          value="Add Item" />
      </form>
    );
  }
}

export default BasketForm;
