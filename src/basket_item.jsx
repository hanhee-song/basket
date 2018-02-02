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
    this.handleEdit = this.handleEdit.bind(this);
  }
  
  handleEdit() {
    this.props.handleEdit({
      name: this.state.name,
      quantity: this.state.quantity,
    });
  }
  
  render () {
    return (
      <div className="basket-item">
        name: {this.props.name}
        quantity: {this.props.quantity}
        <input
          onClick={this.handleEdit}
          type="button"
          value="Edit"/>
        <input
          onClick={this.props.handleDelete}
          type="button"
          value="Delete"/>
      </div>
    );
  }
}

export default BasketItem;
