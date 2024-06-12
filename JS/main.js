let nameInput = document.querySelector('#name');
let urlInput = document.querySelector('#url');
let addBtn = document.querySelector('#addBtn');
let tableBody = document.querySelector('#tableBody');
let nameLabel = document.querySelector('#nameLabel');
let urlLabel = document.querySelector('#urlLabel');

let Bookmarks;
let updateIndex = 0;


if (localStorage.getItem('Bookmarks') == null) {
    Bookmarks = [];
} else {
    Bookmarks = JSON.parse(localStorage.getItem('Bookmarks'));
    display(Bookmarks);
}


let nameRegex = /^([a-zA-Zا-ي ]){1,15}$/
function validName() {
    if (nameRegex.test(nameInput.value)) {
        nameLabel.innerHTML = ` <div> </div>`
        return true;
    } else {
        nameLabel.innerHTML = `<div class="mt-1 form-control bg-danger-subtle text-muted text-start">Invalid name</div>`
        return false;
    }
}



let urlRegex = /^(http(s)?:\/\/)[\w.-]+(?:\.[\w\.-]+)+[\w\-\._~:/?#[\]@!\$&'\(\)\*\+,;=.]+$/
function validURL() {
    if (urlRegex.test(urlInput.value)) {
        urlLabel.innerHTML = ` <div> </div>`
        return true;
    } else {
        urlLabel.innerHTML = `<div class="mt-1 form-control bg-danger-subtle text-muted text-start">Invalid URL </div>`
        return false;
    }
}

$(nameInput).keyup(function () {
    if (validName() && validURL()) {
        addBtn.removeAttribute('disabled')
    } else {
        addBtn.disabled = 'true';
    }
});

$(urlInput).keyup(function () {
    if (validName() && validURL()) {
        addBtn.removeAttribute('disabled')
    } else {
        addBtn.disabled = 'true';
    }
});


$(addBtn).click(function () {
    if (nameInput.value !== '' && urlInput.value !== '') {

        if (addBtn.innerHTML == 'Update') {
            addBtn.innerHTML = 'Add'
            let bookmark = {
                name: nameInput.value,
                url: urlInput.value,
            }
            Bookmarks.splice(updateIndex, 1, bookmark)
        } else {
            let bookmark = {
                name: nameInput.value,
                url: urlInput.value,
            }
            Bookmarks.push(bookmark)
            console.log(Bookmarks);
        }
        localStorage.setItem('Bookmarks', JSON.stringify(Bookmarks))
        display(Bookmarks);
        clearInput();
    }

});




function display(anyArray) {
    let marks = ``;
    for (let i = 0; i < anyArray.length; i++) {
        marks += `
        <tr>
            <td class="py-3">${anyArray[i].name}</td>
            <td class="py-3"><a href="${anyArray[i].url}" target="_blank"><button class="btn btn-sm  btn-info">Visit</button></a></td>
            <td class="py-3"><button onclick="updateBook(${i})" class="btn btn-sm  btn-warning">Update</button></td>
            <td class="py-3"><button onclick="deleteBook(${i})" class="btn btn-sm  btn-danger">Delete</button></td>
        </tr>
        `
        console.log(anyArray[i].url);
    }
    tableBody.innerHTML = marks;

}

function deleteBook(index) {
    Bookmarks.splice(index, 1);
    localStorage.setItem('Bookmarks', JSON.stringify(Bookmarks))
    display(Bookmarks);
}

function clearInput() {
    nameInput.value = '';
    urlInput.value = '';
}

function updateBook(index) {
    nameInput.value = Bookmarks[index].name
    urlInput.value = Bookmarks[index].url
    addBtn.innerHTML = 'Update'
    updateIndex = index;
}

function search(term) {
    let searchBooks = [];
    for (let i = 0; i < Bookmarks.length; i++) {
        if (Bookmarks[i].name.toLowerCase().includes(term.toLowerCase())) {
            searchBooks.push(Bookmarks[i])
        }
    }
    display(searchBooks)
}