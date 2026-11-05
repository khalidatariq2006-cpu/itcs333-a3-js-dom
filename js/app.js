(function () {
  'use strict';

  document.addEventListener('DOMContentLoaded', function () {
    var form = document.getElementById('todo-form');
    var input = document.getElementById('todo-input');
    var errorMsg = document.getElementById('error-msg');
    var list = document.getElementById('todo-list');
    var counter = document.getElementById('counter');
    var filter = 'all';

    function refresh() {
      var items = list.querySelectorAll('li');
      var left = 0;
      items.forEach(function (li) {
        var done = li.classList.contains('completed');
        if (!done) left++;
        var show = filter === 'all' ||
                   (filter === 'active' && !done) ||
                   (filter === 'done' && done);
        li.classList.toggle('hidden', !show);
      });
      counter.textContent = left + ' item(s) left';
    }

    function addItem() {
      var text = input.value.trim();
      if (text === '') {
        errorMsg.classList.remove('hidden');
        return;
      }
      errorMsg.classList.add('hidden');

      var li = document.createElement('li');
      var span = document.createElement('span');
      span.className = 'item-text';
      span.textContent = text;
      var del = document.createElement('button');
      del.type = 'button';
      del.className = 'delete-btn';
      del.textContent = 'Delete';
      li.appendChild(span);
      li.appendChild(del);
      list.appendChild(li);

      input.value = '';
      refresh();
    }

    form.addEventListener('submit', function (e) {
      e.preventDefault();
      addItem();
    });

    list.addEventListener('click', function (e) {
      var li = e.target.closest('li');
      if (!li) return;
      if (e.target.closest('.delete-btn')) {
        li.remove();
      } else if (e.target.closest('.item-text')) {
        li.classList.toggle('completed');
      }
      refresh();
    });

    document.getElementById('filter-all').addEventListener('click', function () { filter = 'all'; refresh(); });
    document.getElementById('filter-active').addEventListener('click', function () { filter = 'active'; refresh(); });
    document.getElementById('filter-done').addEventListener('click', function () { filter = 'done'; refresh(); });

    refresh();
  });
})();