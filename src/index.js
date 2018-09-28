import React from 'react';
import ReactDOM from 'react-dom';

import 'rc-tree/assets/index.css';
import './index.css';
import './site.css';
import './finderjs.css';
import 'codemirror/lib/codemirror.css';

import App from './App';
// import registerServiceWorker from './registerServiceWorker';

import SQLEditor from './lib/components/sqlEditor';



function Temp(props) { // eslint-disable-line
  const stuff = {
    id: '123',
    properties: 
    { "sql": 
`SELECT 
  *,
  date_part('day', age(a1.trial_expired_at, now()))::int4 
    AS trial_expires,
  ( 
    SELECT count(ps.id) FROM posts ps INNER JOIN users u ON u.id = ps.sender_id AND u.role != 'demo-member' 
    WHERE ps.account_id = a1.id AND category = 'status-post'
  ) AS status_updates,
  ( 
    SELECT count(ps.id) FROM posts ps INNER JOIN users u ON u.id = ps.sender_id AND u.role != 'demo-member'
    WHERE ps.account_id = a1.id AND category IN ('recognition-post', 'group-recognition-post', 'team-recognition-post') 
  ) AS woos,
  ( 
    SELECT count(i.id) FROM invitations i WHERE i.account_id = a1.id 
  ) AS invitations,
  ( 
    SELECT count(u.id) FROM users u WHERE u.current_account_id = a1.id AND u.role != 'demo-member' 
  ) AS users,
  ( 
    SELECT count(r.id) FROM post_reactions r INNER JOIN posts p ON r.post_id = p.id AND p.account_id = a1.id 
  ) AS likes,
  ( 
    SELECT count(c.id) FROM post_comments c INNER JOIN posts p ON c.post_id = p.id AND p.account_id = a1.id 
  ) AS comments 
FROM accounts a1
WHERE status = 'free-trial'
`   },
  };

  return (
    <SQLEditor sql={stuff.properties.sql} />
  )
}

// ReactDOM.render(<Temp />, document.getElementById('root'));


ReactDOM.render(<App />, document.getElementById('root'));
// registerServiceWorker();
