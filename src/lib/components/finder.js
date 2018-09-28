
import React from 'react';
import ReactDOM from 'react-dom';

import ReactFinder from 'react-finderjs';

import objectToTree from '../utils/objectToTree';

import SQLEditor from './sqlEditor';

// const data = [
//   {
//     id: 1,
//     label: 'Label A',
//     children: [
//       {
//         id: 10,
//         label: 'Label A1',
//       },
//       {
//         id: 11,
//         label: 'Label A2',
//       }
//     ],
//   },
//   {
//     id: 2,
//     label: 'Label B',
//     children: [],
//   },
// ];

const stuff = {
  id: '123',
  properties: 
  { "sql": 
`SELECT 
  *,
  date_part('day', age(a1.trial_expired_at, now()))::int4 
    AS trial_expires,
  ( 
    SELECT count(ps.id) 
    FROM posts ps 
      INNER JOIN users u ON u.id = ps.sender_id 
        AND u.role != 'demo-member' 
    WHERE ps.account_id = a1.id AND category = 'status-post'
  ) AS status_updates,
  ( 
    SELECT count(ps.id) 
    FROM posts ps 
      INNER JOIN users u ON u.id = ps.sender_id 
        AND u.role != 'demo-member'
    WHERE ps.account_id = a1.id 
      AND category IN ('recognition-post', 'group-recognition-post', 'team-recognition-post') 
  ) AS woos,
  ( 
    SELECT count(i.id) 
    FROM invitations i 
    WHERE i.account_id = a1.id 
  ) AS invitations,
  ( 
    SELECT count(u.id) 
    FROM users u 
    WHERE u.current_account_id = a1.id 
      AND u.role != 'demo-member' 
  ) AS users,
  ( 
    SELECT count(r.id) 
    FROM post_reactions r 
      INNER JOIN posts p ON r.post_id = p.id 
        AND p.account_id = a1.id 
  ) AS likes,
  ( 
    SELECT count(c.id) 
    FROM post_comments c 
      INNER JOIN posts p ON c.post_id = p.id 
        AND p.account_id = a1.id 
  ) AS comments 
  FROM accounts a1
  WHERE status = 'free-trial'
`   },
};

function process(data) {
  const objectTree = objectToTree(data);
  console.log('process:', {
    data,
    objectTree,
  });
  return objectTree;
}

class Finder extends React.Component {
  constructor(props) {
    super(props);
    this.reactFinder = null;
  }

  eventHandler = (type, item, dom) => {
    console.log(`eventHandler[${type}]:`, {
      item,
      dom,
    });
  }

  createSimpleColumn = (item) => {
    const div = document.createElement('div');
    const component = (
        <div className="fjs-col leaf-col">
          <div className="leaf-row">
            <div>{item.path}</div>
            <div>{item.id === 'sql' ? <SQLEditor sql={item.value} /> : JSON.stringify(item.value)}</div>
          </div>
        </div>
    );

    return ReactDOM.render(component,div);
  }

  leafSelected = (item, dom)  => {
    const { reactFinder } = this;
    console.log('leafSelected:', { item, dom, reactFinder });
    this.reactFinder._finder.emit('create-column', this.createSimpleColumn(item));
   // emitter.emit('create-column', createSimpleColumn(item));
  }

  render() {
    const { props } = this;
    console.log('Finder.props:', props);

    const objectTree = process(stuff);
    // for(let i = 0;i < 40; i += 1) {
    //   data[1].children.push({
    //     id: `2.${i+1}`,
    //     label: `Child ${i+1<10 ? `0${i+1}` : i+1}`,
    //   });
    // }
    return (
      <ReactFinder
        ref={r => this.reactFinder = r}
        className = ""
        data = {objectTree}
        _onItemSelected={(i,d) => { this.eventHandler('ItemSelected', i, d)}}
        onLeafSelected={this.leafSelected}
        _onColumnCreated={(i,d) => { this.eventHandler('ColumnCreated', i, d)}}
      />
    )
  }
}

export default Finder;
