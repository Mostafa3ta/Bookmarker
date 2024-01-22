let nameInput = document.querySelector('#name');
let urlInput = document.querySelector('#url');
let addBtn = document.querySelector('.addBtn');
let tableBody = document.querySelector('#tableBody');

let Bookmarks;
let updateIndex = 0;


if (localStorage.getItem('Bookmarks') == null) {
    Bookmarks = [];
} else {
    Bookmarks = JSON.parse(localStorage.getItem('Bookmarks'));
    display(Bookmarks);
}


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
            <th>${anyArray[i].name}</th>
            <td><a href="${anyArray[i].url}" target="_blank"><button class="btn btn-info">Visit</button></a></td>
            <td><button onclick="updateBook(${i})" class="btn btn-warning">Update</button></td>
            <td><button onclick="deleteBook(${i})" class="btn btn-danger">Delete</button></td>
        </tr>
        `
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
        if (Bookmarks[i].name.toLowerCase().includes(term)) {
            searchBooks.push(Bookmarks[i])
        }
    }
    display(searchBooks)
}