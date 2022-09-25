
import './style.css';
import './input.css';

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

function searchTag(keyword) {
  return itemsjs.search({
    per_page: 35,
    sort: 'name_asc',
    query: keyword,

  })
}

var input = document.getElementById('keyword')
var output = document.getElementById('app')
input.addEventListener('input', (x) => {
  if (input.value != "") {
    const regex = new RegExp(input.value, 'gi');
    var result = searchTag(input.value)
    //console.log(result)
    var resulthtml = result.data.items.map((x) => {
      //console.log(x)
      return `<div class="card"><div class="tag">${x.tagname}</div><div class="desc">${x.desc}</div></div>`
    })
    output.innerHTML = resulthtml.join("")

    var tag = document.getElementsByClassName('tag')
    var desc = document.getElementsByClassName('desc')
    Array.from(tag).forEach(function (element) {
      highlight(element)
    });
    Array.from(desc).forEach(function (element) {
      highlight(element)
    });

    function highlight(el) {
      let text = el.innerHTML
      text.replace(/(<mark class="highlight">|<\/mark>)/gim, '');
      const newText = text.replace(regex, '<mark class="highlight">$&</mark>');
      el.innerHTML = newText
    }
  } else {
    output.innerHTML = `<div id="please">Please Input keyword</div>`
  }

})




