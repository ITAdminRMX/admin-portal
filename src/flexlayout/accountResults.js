
import React from 'react';

import ReactTable from 'react-table';
import 'react-table/react-table.css';

import JSONData from '../lib/JSONData';

const dummyColumns = [
  {
    Header: 'Email',
    accessor: 'email',
  }
];

const dummyData = [
  {email: 'gary@gmail.com'}
]

class AccountResults extends React.Component {
  
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      columns: [
        { Header: 'Name', accessor: 'name' },
        { Header: 'Email', accessor: 'email' },
      ],
    }
  }
  
  componentDidMount() {
    JSONData.load('users')
      .then(data => {
        
        // console.log('componentDidMount: data:', data);
        
        this.setState({ data });
      })
  }
  
  render() {
    const { data, columns } = this.state;
    
    // console.log('AccountResults.props:', this.props);
    // console.log('AccountResults.state:', this.state);
    
    return (
      <div style={{padding: '10px'}}>
        <h3>Account Results</h3>
        <ReactTable 
            className="-striped -highlight"
            columns={columns}
            data={data}
            pageSize={15}
            filterable
            defaultFilterMethod={(filter, row) => String(row[filter.id]).toLowerCase().includes(filter.value.toLowerCase())}
          />
      </div>
    )
  }
}

export default AccountResults;
