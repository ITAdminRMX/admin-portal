
import { decorate, observable} from 'mobx';
// import { observer } from 'mobx-react';

class MenuStore {
	data = [];

  add(item, parent = null) {
		if (parent) {
			console.log('add: looking for parent:', parent);
			const node = this.findParent(parent);
			if (node) { 
				console.log('add: found:', node);
				node.children.push({children: [], ...item});
			} else {
				throw new Error(`${parent} parent not found`);
			}
		} else {
			this.data.push({children: [], ...item});
		}
	}
	
	findParent(path, root = this.data, level = 0) {
		const pa = path.split('.');
		let result = null;
		console.log('MenuStore.findParent:', { path, pa, root, level });
		for(let i = 0; i < root.length; i += 1) {
			const item = root[i];
			const key = item.key.split('.');
			// console.log('checking:', key[level], pa[level]);
			if (key[level] === pa[level]) {
				if (level + 1 < pa.length) {
					console.log('traversing:', {...item});
					result = this.findParent(path, item.children, level + 1);
				} else {
					result = item;
					console.log('matched:', {...item});
					break;
				}
			}
		}
		return result ? {...result} : result;
	}
}

decorate(MenuStore, {
  data: observable,
});

const menuStore = new MenuStore();

menuStore.add({
	title: 'Dashboard', key: 'dashboard', children: [],
	'data-action': {monkey: true},
});
menuStore.add({
	title: 'Accounts', key: 'account', children: [
		{title: 'Search', key: 'account.search', children: []},
		{title: 'New', key: 'account.new', children: []},
	]
});
menuStore.add({
	title: 'Users', key: 'user', children: [
		{title: 'Search', key: 'user.search', children: []},
		{title: 'New', key: 'user.new', children: []},
	]
});
menuStore.add({
	title: 'Offers', key: 'offer', children: [
		{title: 'Search', key: 'offer.search', children: []},
		{title: 'New', key: 'offer.new', children: []},
	]
});
menuStore.add({
	title: 'Test', key: 'offer.search.test', children: []
},'offer.search');
menuStore.add({
	title: 'Bonkers', key: 'offer.search.test.bonkers', children: []
},'offer.search.test');


console.log('findParent(account.new):', menuStore.findParent('account.new'));
console.log('findParent(bozo.bongo):', menuStore.findParent('bozo.bongo'));

export default menuStore;
