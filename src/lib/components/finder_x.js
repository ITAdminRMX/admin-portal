
import React from 'react';
import ReactDOM from 'react-dom';

import ReactFinder from 'react-finderjs';
import Chance from 'chance';
const chance = new Chance();

const list = [
  // {label: 'Item 1', id:1,},
  // {label: 'Item 2', id:2,},
];

const data = [
  {
    id: 1,
    label: 'properties',
    children: [
      {
        id: 10,
        label: 'sql',
      },
      {
        id: 11,
        label: 'component',
        children: [
          {label: 'name', value: 'DataTable'},
          {label: 'props', children: [{label: 'columnOrder', children: [{label:'id'}]}]},
        ]
      },
      {
        id: 11,
        label: 'subcomponent',
        children: [
          {label: 'name', value: 'Posts'},
          {label: 'props'},
        ]
      },
    ],
  }
];

let reactFinder = null;

function generateChildren(n, limit = 0) {
  const children = [];
  for(let i = 0; i < n; i += 1) {
    const node = {
      label: chance.name(),
      id: chance.guid({ version: 4 }),
    }
    if (limit < 3) node.children = generateChildren(chance.integer({ min: 2, max: 8}), limit+1);
    children.push(node);
  }
  return children;
}

function setupList() {
  const limit = chance.integer({ min: 15, max: 40});
  for(let id = 0; id < limit; id += 1) {
    const children = generateChildren(chance.integer({ min: 3, max: 40}));
    list.push({
      label: `Item ${id+1}`,
      id,
      children,
    });
  }
}

function colCreator(parent) {
  console.log('colCreator:',parent);

  const element = document.createElement('div');
  ReactDOM.render(<pre>${JSON.stringify(parent)}</pre>, element);
  return element;
}

function finderData(parent, cfg, callback) {
  // console.log('finderData:', {parent, cfg});
  if (parent) {
    if (parent.children) { 
      callback(parent.children);
    } else {
      reactFinder.createColumn(colCreator(parent));
    }
  } else {
    callback(list);
  }
}

class Finder extends React.Component {
  constructor(props) {
    super(props);
    setupList();
  }
  
  componentDidMount() {
    // console.log('reactFinder:', this.reactFinder);
    reactFinder = this.reactFinder;
    // this.reactFinder._finder.on('leaf-selected', (n)=>{ console.log('reactFinder-leaf-selected', n)});
    // this.reactFinder._finder.on('column-created', (n)=>{ console.log('reactFinder-column-created', n)});
    // this.reactFinder._finder.on('item-selected', (n)=>{ console.log('reactFinder-item-selected', n)});
    // this.reactFinder._finder.on('create-column', (n)=>{ console.log('reactFinder-create-column', n)});
    
  }
  
  onLeafSelected = (node) => {
    console.log('LeafSelected:', node);
    this.reactFinder.createColumn(colCreator(node));
  }
  
  onItemSelected = (node) => {
    console.log('ItemSelected:', node);
  }
  
  onColumnCreated = (node) => {
    console.log('ColumnCreated:', node);
  }
  
  render() {
    return (
      <ReactFinder 
        ref={(r) => this.reactFinder = r}
        data={data /* finderData */}
        onLeafSelected={this.onLeafSelected}
        onItemSelected={this.onItemSelected}
        onColumnCreated={this.onColumnCreated}
      />
    )
  }
}

export default Finder;
