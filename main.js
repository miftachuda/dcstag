import './style.css';
import './input.css';

import data from './data.json';
import Fuse from 'fuse.js';



var input = document.getElementById('keyword')
var output = document.getElementById('app')

input.addEventListener('input', (x) => {

  if (input.value != "") {
    var keys;
    if (isNaN(input.value)) {
      keys = ['tagname', 'desc']
    } else {
      keys = ['tagname']
    }

    const fuse = new Fuse(data, {
      shouldSort: true,
      includeScore: true,
      threshold: 0.3,
      ignoreFieldNorm: true,
      keys: keys
    })

    var result = fuse.search(input.value)
    if (result.length > 50) {
      result = result.splice(0, 50)
    }
    const regex = new RegExp(input.value, 'gi');
    var resulthtml = result.map((x) => {
      return `<div class="card"><div class="tag">${x.item.tagname}</div><div class="desc">${x.item.desc}</div></div>`
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




