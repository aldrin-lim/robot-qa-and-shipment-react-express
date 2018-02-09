import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Header from './Header';
import Content from './Content';

// Entry Point for Table Component
class Table extends Component {
  render() {
    return (
      <table className="table table-responsive">
        <Header headers={this.props.headers} />
        <Content rowOnClick={this.props.rowOnClick} headers={this.props.headers} contents={this.props.contents} />
      </table>
    );
  }
}
Table.propTypes = {
  headers: PropTypes.array,
  content: PropTypes.array
};

Table.defaultProps = {
  headers: ["ID", "Default Header"],
  contents: []
};
export default Table;