import React from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

// import * as itemActions from '../actions';
// itemActions.deleteItem()
import  { deleteItem } from '../../actions';

import './styles.css';

export const ItemsList = ({ items, deleteItem }) => {
  return (
    <div>
      <ul className={'itemsList-ul'}>
        {items.length < 1 && <p id={'items-missing'}>Add some tasks above.</p>}
        {items.map((item, index) =><li key={item.id}>{item.content}
          <input
            className={'itemDelete-button'}
            type="button"
            value={"Delete"}
            onClick={() => deleteItem(index)}
          />
          </li>)}
      </ul>
    </div>
  );
};

ItemsList.propTypes = {
  items: PropTypes.array.isRequired,
  deleteItem: PropTypes.func.isRequired,
};

const mapStateToProps = state => {
  return { items: state.todos.items };
};

const mapDispatchToProps = (dispatch) => {
  return {
    deleteItem: bindActionCreators(deleteItem, dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ItemsList);

//{items.map(item => <li key={item.id}>{item.content}
