import data from './data.json';
import exe from 'itemsjs';

var itemsjs = exe(data, {
  sortings: {
    name_asc: {
      field: 'tagname',
      order: 'asc'
    }
  },
  searchableFields: ['tagname', 'desc']
});

var seacrh = itemsjs.search({
  per_page: 15,
  sort: 'name_asc',
  query: '024LIC',

})
console.log(seacrh);


var item = document.getElementById('app')
item.innerText = JSON.stringify(seacrh, null, 2)