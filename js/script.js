
/* HW-1 */
/* TO-DO List */

var to_load_file = true;

document.getElementById('task-description').style.maxWidth = document.getElementById('tasks-body').offsetWidth * 0.95 + 'px'


if (localStorage.getItem('todo')) {
  document.getElementById('tasks-body').innerHTML = localStorage.getItem('todo');
}

function getTasks() {
  var ancestor = document.getElementById('tasks-body'),
    descendents = $('#tasks-body div p');
    res = [];
  if (descendents.length == 0)
    return false;
  let status = descendents[0].parentElement.parentElement.style.textDecoration == 'line-through';
  console.log(status);
  if (descendents.length > 0)
    res.push(`[{"name":"${descendents[0].innerHTML}", "is_completed":${status}}`);
  for (let i = 1; i < descendents.length; ++i) {
    status = descendents[i].parentElement.parentElement.style.textDecoration == 'line-through';
    console.log(status);
    res.push(`{"name":"${descendents[i].innerHTML}", "is_completed":${status}}`);
  }
  res[descendents.length - 1] += ']';
  return res;
}

function save() {
  localStorage.setItem('todo', document.getElementById('tasks-body').innerHTML);
}

function download(data, filename, type) {
    var file = new Blob([data], {type: type});
    if (window.navigator.msSaveOrOpenBlob)
        window.navigator.msSaveOrOpenBlob(file, filename);
    else { // Others
        var a = document.createElement("a"),
                url = URL.createObjectURL(file);
        a.href = url;
        a.download = filename;
        document.body.appendChild(a);
        a.click();
        setTimeout(function() {
            document.body.removeChild(a);
            window.URL.revokeObjectURL(url);  
        }, 0); 
    }
}

document.getElementById('import').onclick = function() {
  if (to_load_file) {
    to_load_file = !(confirm('Are you sure you want to display the uploaded file?'));
    if (to_load_file)
      return false;
  }

  var files = document.getElementById('selectFiles').files;
  console.log(files);
  if (files.length <= 0) {
    to_load_file = true;
    return false;
  }

  var fr = new FileReader();

  fr.onload = function(e) { 
  	console.log(e);
    let input_list = JSON.parse(e.target.result);
    $('#tasks').empty();
    let tasks_body_div = document.getElementById('tasks');
    for (let i = 0; i < input_list.length; i++) {
      let new_div = document.createElement('div');
      new_div.innerHTML = `<div class="task-element"><div><p>${input_list[i]['name']}</p></div><div id='buttons-block'><svg version="1.0" xmlns="http://www.w3.org/2000/svg" id="task-edit-button" data-id="edited" width="38" height="38" viewBox="0 0 38.000000 38.000000" preserveAspectRatio="xMidYMid meet"><g transform="translate(0.000000,38.000000) scale(0.100000,-0.100000)" fill="#000000" stroke="none"><path d="M198 243 c-84 -84 -105 -130 -58 -125 16 1 54 32 104 82 79 78 80 79 61 100 -10 11 -21 20 -24 20 -4 0 -41 -35 -83 -77z m100 38 c3 -8 -1 -12 -9 -9 -7 2 -15 10 -17 17 -3 8 1 12 9 9 7 -2 15 -10 17 -17z m-32 -22 c7 -12 -94 -119 -113 -119 -25 0 -12 25 39 77 55 56 63 60 74 42z"/><path d="M12 258 c-17 -17 -17 -229 0 -246 17 -17 229 -17 246 0 15 15 17 168 2 168 -6 0 -10 -33 -10 -80 l0 -80 -115 0 -115 0 0 115 0 115 80 0 c47 0 80 4 80 10 0 15 -153 13 -168 -2z"/></g></svg><svg xmlns="http://www.w3.org/2000/svg" id="task-done-button" data-id="completed" viewBox="0 0 43 43" width="36px" height="36px"><path fill="#c8e6c9" d="M36,42H12c-3.314,0-6-2.686-6-6V12c0-3.314,2.686-6,6-6h24c3.314,0,6,2.686,6,6v24C42,39.314,39.314,42,36,42z"/><path fill="#4caf50" d="M34.585 14.586L21.014 28.172 15.413 22.584 12.587 25.416 21.019 33.828 37.415 17.414z"/></svg><svg xmlns="http://www.w3.org/2000/svg" id="task-cancelled-button" data-id="deleted" width="32px" height="32px" viewBox="0 0 32 32"><g transform="translate(0.000000,32.000000) scale(0.100000,-0.100000)" fill="#000000" stroke="none"><path d="M12 308 c-17 -17 -17 -279 0 -296 17 -17 279 -17 296 0 17 17 17 279 0 296 -17 17 -279 17 -296 0z m268 -148 l0 -120 -120 0 -120 0 0 120 0 120 120 0 120 0 0 -120z"/><path d="M90 218 c0 -6 10 -22 22 -35 l21 -23 -21 -23 c-24 -26 -29 -47 -10 -47 6 0 22 10 35 22 l23 21 23 -21 c44 -41 66 -19 25 25 l-21 23 21 23 c24 26 29 47 10 47 -6 0 -22 -10 -35 -22 l-23 -21 -23 21 c-26 24 -47 29 -47 10z"/></g></svg></div></div>`;
      if (input_list[i]['is_completed'])
        new_div.children[0].style.textDecoration = 'line-through';
      tasks_body_div.appendChild(new_div);
    }
    save();
    listButtons();
  }
  fr.readAsText(files.item(0));

};


document.getElementById('add-task-btn').onclick = function() {
  let task_description = document.getElementById('task-description').value;
  if (task_description == '')
    alert("You haven't entered your task's description yet.");
  else {
    let new_div = document.createElement('div');
    new_div.innerHTML = `<div class="task-element"><div><p>${task_description}</p></div><div id='buttons-block'><svg version="1.0" xmlns="http://www.w3.org/2000/svg" id="task-edit-button" data-id="edited" width="38px" height="38px" viewBox="0 0 38 38" preserveAspectRatio="xMidYMid meet"><g transform="translate(0.000000,38.000000) scale(0.100000,-0.100000)" fill="#000000" stroke="none"><path d="M198 243 c-84 -84 -105 -130 -58 -125 16 1 54 32 104 82 79 78 80 79 61 100 -10 11 -21 20 -24 20 -4 0 -41 -35 -83 -77z m100 38 c3 -8 -1 -12 -9 -9 -7 2 -15 10 -17 17 -3 8 1 12 9 9 7 -2 15 -10 17 -17z m-32 -22 c7 -12 -94 -119 -113 -119 -25 0 -12 25 39 77 55 56 63 60 74 42z"/><path d="M12 258 c-17 -17 -17 -229 0 -246 17 -17 229 -17 246 0 15 15 17 168 2 168 -6 0 -10 -33 -10 -80 l0 -80 -115 0 -115 0 0 115 0 115 80 0 c47 0 80 4 80 10 0 15 -153 13 -168 -2z"/></g></svg><svg xmlns="http://www.w3.org/2000/svg" id="task-done-button" data-id="completed" viewBox="0 0 43 43" width="36px" height="36px"><path fill="#c8e6c9" d="M36,42H12c-3.314,0-6-2.686-6-6V12c0-3.314,2.686-6,6-6h24c3.314,0,6,2.686,6,6v24C42,39.314,39.314,42,36,42z"/><path fill="#4caf50" d="M34.585 14.586L21.014 28.172 15.413 22.584 12.587 25.416 21.019 33.828 37.415 17.414z"/></svg><svg xmlns="http://www.w3.org/2000/svg" id="task-cancelled-button" data-id="deleted" width="32px" height="32px" viewBox="0 0 32 32"><g transform="translate(0.000000,32.000000) scale(0.100000,-0.100000)" fill="#000000" stroke="none"><path d="M12 308 c-17 -17 -17 -279 0 -296 17 -17 279 -17 296 0 17 17 17 279 0 296 -17 17 -279 17 -296 0z m268 -148 l0 -120 -120 0 -120 0 0 120 0 120 120 0 120 0 0 -120z"/><path d="M90 218 c0 -6 10 -22 22 -35 l21 -23 -21 -23 c-24 -26 -29 -47 -10 -47 6 0 22 10 35 22 l23 21 23 -21 c44 -41 66 -19 25 25 l-21 23 21 23 c24 26 29 47 10 47 -6 0 -22 -10 -35 -22 l-23 -21 -23 21 c-26 24 -47 29 -47 10z"/></g></svg></div></div>`;
    document.getElementById('tasks').appendChild(new_div);
    to_load_file = true;
  }
  save();
  listButtons();
}


document.getElementById('download').onclick = function() {
  let data = getTasks();
  if (data)
    download(data, 'list', 'json');
  else
    alert('Your To-Do list is empty!');
}

// console.log(document.getElementById('task-done-button').getAttribute('data-id'));
function listButtons() {
  var buttons = document.querySelectorAll('svg[data-id]');
  for (let i = 0; i < buttons.length; ++i) {
    if (buttons[i].getAttribute('data-id') == 'edited') {
      buttons[i].onclick = function() {
        let text = buttons[i].parentElement.parentElement.children[0].children[0].innerHTML;
        text = prompt('Editing the task', text);
        if (text || text == '')
          buttons[i].parentElement.parentElement.children[0].children[0].innerHTML = text;
        save();
      }
    }

    else if (buttons[i].getAttribute('data-id') == 'completed') {
      buttons[i].onclick = function() {
        console.log(buttons[i].parentElement.parentElement);
        if (buttons[i].parentElement.parentElement.style.textDecoration != 'line-through')
          buttons[i].parentElement.parentElement.style.textDecoration = 'line-through';
        else
          buttons[i].parentElement.parentElement.style.textDecoration = 'none';
        save();
      }
    }

    else {
      buttons[i].onclick = function() {
        buttons[i].parentElement.parentElement.remove();
        save();
      }
    }
  }
}

listButtons();







