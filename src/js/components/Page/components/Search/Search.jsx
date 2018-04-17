import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import { applyFilter } from '../../../../actions';
import styles from './search.scss';

class Search extends PureComponent {
    state = {
        searchText: ''
    };

    handleChange = (e) => {
        this.setState({
            searchText: e.target.value
        });
    }

    handleSubmit = (e) => {
        e.preventDefault();
        const value = this.state.searchText
          .trim()
          .toLocaleLowerCase();
        this.props.applySearch(value);
    }

    render() {
        return (
          <form className={styles.search} onSubmit={this.handleSubmit}>
              <input
                type="text"
                className={styles.searchInput}
                value={this.state.searchText}
                onChange={this.handleChange}
                placeholder="Search"
              />
          </form>
        );
    }
};

export default connect(
  null,
  (dispatch) => ({
      applySearch: text => {
          dispatch(applyFilter('search', text));
      }
  })
)(Search);