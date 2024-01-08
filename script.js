// https://jsonplaceholder.typicode.com/posts

// 1- Reading posts

async function readPosts(){

    // Using the postArea

    let postArea = document.querySelector('.posts');
    postArea.innerHTML = 'Carregando...'

    // Request in the jsonplaceholder

    let response = await fetch('https://jsonplaceholder.typicode.com/posts');

    // Turning the json to object

    let json = await response.json();

    // Verifying the length of the data

    if (json.length > 0){

        // Cleaning the postArea

        postArea.innerHTML = '';

        // Scrolling through data

        for (let i in json){
            let postHtml = `<div>${Number(i) + Number(1)}<h1><span>Title: </span>${json[i].title}<h1><span>Body: </span> ${json[i].body}<hr></div>`;
            postArea.innerHTML += postHtml;
        }


    } else {

        // Adding a message

        postArea.innerHTML = 'Nenhum post para exibir!'
    }

}

// Executing in the opening of the archive

readPosts();

// 2- Inserting posts

// Function to add posts

async function addNewPost(title, body){

    await fetch(
        'https://jsonplaceholder.typicode.com/posts',
        {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                title,
                body,
                userId: 2
            })
        }
    );

    // Cleaning the fields

    document.querySelector('#titleField').value = '';
    document.querySelector('#bodyField').value = '';

    // Calling the read function

    readPosts();

}

document.querySelector('#insertButton').addEventListener('click', ()=>{

    // Selecting the informations

    let title = document.querySelector('#titleField').value;
    let body = document.querySelector('#bodyField').value;

    if (title && body){

        addNewPost(title, body);

    } else {

        alert("Preencha todos os campos!");
        
    }

});

