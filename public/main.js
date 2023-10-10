//For summit 
document.getElementById("apiForm").addEventListener("submit", function (event) {
    event.preventDefault();

    const description = document.getElementById("description").value;
    const numberOfPics = document.getElementById("numberOfPics").value;
    const url = "/generate-illustration"; // Reemplaza con la URL de tu API Node.js

    // Construir el objeto de datos a enviar
    const data = {
        description: description,
        numberOfPics: numberOfPics
    };

    // Realizar la solicitud POST a la API
    fetch(url, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
    })
        .then(response => {
            response.json();
            location.reload();

        })
        .then(data => {
            // Manejar la respuesta de la API
            console.log(data);
            document.getElementById("resultado").innerHTML = `<p>Respuesta de la API: ${JSON.stringify(data)}</p>`;
            location.reload();
        })
        .catch(error => {
            console.error("Error al enviar la solicitud:", error);
        });
});
//For list
// JavaScript code to fetch and display the list of images
const imageList = document.getElementById("imageList");

// Fetch images from your API
fetch("/show/images")
    .then(response => response.json())
    .then(data => {
        // Loop through the list of image filenames and create list items
        data.forEach(filename => {
            const listItem = document.createElement("li");
            const image = document.createElement("img");

            // Set the source (URL) of the image based on the filename
            image.src = `/pics/${filename}`; // Adjust the path if needed

            // Append the image to the list item and the list item to the list
            listItem.appendChild(image);
            imageList.appendChild(listItem);
        });
    })
    .catch(error => {
        console.error("Error fetching images:", error);
    });