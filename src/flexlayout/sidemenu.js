


import React from 'react';
// import * as mobxReact from 'mobx-react';
// import shortid from 'shortid';
import Tree, { TreeNode } from 'rc-tree';


const menu = [
  {
    title: 'Dashboard',
    key: 'dashboard',
    children: [
      {title: 'Accounts', key: 'dashboard.accounts'},
      {title: 'Users', key: 'dashboard.users'},
      {title: 'Offers', key: 'dashboard.offers'},
    ]
  },
  {
    title: 'New',
    key: 'new',
    children: [
      {
        title: 'Account',
        key: 'new.account',
      },
      {
        title: 'User',
        key: 'new.user',
      },
      {
        title: 'Offer',
        key: 'new.offer',
      },
    ]
  },
  {
    title: 'Accounts',
    key: 'accounts',
  },
  {
    title: 'Users',
    key: 'users',
  },
  {
    title: 'Offers',
    key: 'offers',
  },
]


class SideMenu extends React.Component {

  onSelect = (item, info) => {
    const action = info.node.props['data-action'];
    // console.log('selected:', { item, info, action });

    let node = { name: 'Empty Component', component: 'EmptyComponent', id: `empty-component` };
    if (action) {
      node = {...action};
    }

    this.props.addNode(node);

  }

  loop = data => {
    return data.map(item => {
      const { key } = item;

      if (!key) console.log('no key:', { item });

      const { children, ...rest} = item;

      if (children) {
        return (
          <TreeNode
            {...rest}
          >
            {this.loop(item.children)}
          </TreeNode>
        );
      }

      return <TreeNode {...rest} />;
    });
  };

  render() {
    // const { data } = this.props.menu;

    return <div>Sidemenu</div>

    console.log('sidemenu render')

    return (
      <Tree
        onSelect={this.onSelect}
        defaultExpandAll={true}
        showLine
      >
        {this.loop(menu)}
      </Tree>
    )
  }
}

export default SideMenu;


// 
// import React from 'react';
// import Tree, { TreeNode } from 'rc-tree';
// import shortid from 'shortid';
// 
// import 'rc-tree/assets/index.css';
// 
// const menu = [
//   {
//     title: 'Dashboard',
//     key: 'dashboard',
//     'data-action': {
//       id: 'DashboardTab'
//     },
//   },
//   {
//     title: 'New',
//     key: 'dashboard',
//     children: [
//       {
//         title: 'Account',
//         key: 'new.account',
//       },
//       {
//         title: 'User',
//         key: 'new.user',
//       },
//       {
//         title: 'Offer',
//         key: 'new.offer',
//       },
//     ]
//   },
//   {
//     title: 'Accounts',
//     key: 'accounts',
//     'data-action': {
//       enableRename: false,
//       component: 'AccountSearch',
//       id: 'account-search',
//       name: 'Account Search',
//     }
//   },
//   {
//     title: 'Reports',
//     key: 'reports',
//     'data-action': {
//       enableRename: false,
//       id: 'reports',
//       name: 'Reports',
//     }
//   },
//   {
//     title: 'Finder',
//     key: 'finder',
//     'data-action': {
//       enableRename: false,
//       id: 'finder',
//       name: 'Finder',
//       component: 'finder',
//     }
//   },
// ]
// 
// class SideMenu extends React.Component {
// 
//   onSelect = (item, info) => {
//     const action = info.node.props['data-action'];
//     console.log('selected:', { item, info, action });
// 
//     let node = { component: 'dummy', id: 'dummy-component' };
//     if (action) {
//       node = {...action};
//     }
// 
//     this.props.addNode(node);
// 
//   }
// 
// 
//   render() {
//     const items = menu.map(item => {
//       const props = {...item};
//       return (
//         <TreeNode {...props} />
//       )
//     })
//     return (
//       <Tree onSelect={this.onSelect} showIcon={false} >
//         {items}
//       </Tree>
//     )
//   }
// }
// 
// export default SideMenu;
