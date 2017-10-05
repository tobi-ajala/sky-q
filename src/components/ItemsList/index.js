import React from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

// import * as itemActions from '../actions';
// itemActions.deleteItem()
import  { deleteItem, changeItemStatus  } from '../../actions';

import './styles.css';

export class ItemsList extends React.Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      items: [],
      currentStatus: '',
    }
  }
  // lifecycle methods
  // componentWillMount
  // componentDidMount
  // componentWillReceiveProps
  // componentWillUpdate
  // componentShouldUpdate
  // componentUnMount
  componentDidMount() {
    this.setState({
      items: this.props.items
    });
  }

  toggle = (itemStatus, itemId) => {
    return this.props.changeItemStatus(itemStatus, itemId);
  }

  changeStatus = (event) => {
    this.setState({
      currentStatus: event.target.value
    })
  }

  render() {

    const filteredData = this.state.currentStatus !== '' ? this.state.items
      .filter((item) => item.status === this.state.currentStatus) : this.props.items;

    return(
      <div>
      <select onChange={this.changeStatus}>
        <option value="">All</option>
        <option value="complete">Complete</option>
        <option value="pending">Pending</option>
      </select>

        <ul className={'itemsList-ul'}>
          {filteredData.length < 1 && <p id={'items-missing'}>Add some tasks above.</p>}
          {filteredData.map((item, index) => <li key={item.id}>{item.content}
            <input
              className={'itemDelete-button'}
              type="button"
              value={"Delete"}
              onClick={() => this.props.deleteItem(index)}
            />
            <label className="switch">
              <input
              onChange={() => this.toggle(item.status, item.id)}
              type="checkbox"
              checked={item.status === 'complete'}/>
              <span className="slider round"></span>
            </label>
            </li>)}
        </ul>
      </div>
    );
  }
}

// export const ItemsList = ({ items, deleteItem }) => {
//   return (
//     <div>
//       <label className="switch">
//         <input type="checkbox" checked/>
//         <span className="slider round"></span>
//       </label>
//       <ul className={'itemsList-ul'}>
//         {items.length < 1 && <p id={'items-missing'}>Add some tasks above.</p>}
//         {items.map((item, index) => <li key={item.id}>{item.content}
//           <input
//             className={'itemDelete-button'}
//             type="button"
//             value={"Delete"}
//             onClick={() => deleteItem(index)}
//           />
//           </li>)}
//       </ul>
//     </div>
//   );
// };

ItemsList.propTypes = {
  items: PropTypes.array.isRequired,
  deleteItem: PropTypes.func.isRequired,
};

const mapStateToProps = state => {
  return { items: state.todos.items };
};

const mapDispatchToProps = (dispatch) => {
  return {
    deleteItem: bindActionCreators(deleteItem, dispatch),
    changeItemStatus: bindActionCreators(changeItemStatus, dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ItemsList);

//{items.map(item => <li key={item.id}>{item.content}
