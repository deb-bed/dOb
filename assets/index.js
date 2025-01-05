var upload = document.querySelector(".upload");

document.querySelector(".go").addEventListener('click', () => {
    var empty = [];
    var params = new URLSearchParams();

    // Pobieramy URL obrazka z pola tekstowego
    var imageUrl = document.querySelector("#imageUrl").value;
    if (!imageUrl) {
        empty.push(upload);
        upload.classList.add("error_shown");
    } else {
        params.append("image", imageUrl);
    }

    document.querySelectorAll(".input_holder").forEach((element) => {
        var input = element.querySelector(".input");
        params.append(input.id, input.value);

        if (isEmpty(input.value)) {
            empty.push(element);
            element.classList.add("error_shown");
        }
    });

    if (empty.length != 0) {
        empty[0].scrollIntoView();
    } else {
        forwardToId(params);
    }

});

function isEmpty(value) {
    let pattern = /^\s*$/;
    return pattern.test(value);
}

function forwardToId(params) {
    // Tutaj zmieniamy adres URL, aby generować i przekierować do pliku id.html
    var fileContent = `
    <!DOCTYPE html>
    <html lang="pl">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Twoje ID</title>
    </head>
    <body>
        <h1>Twoje ID</h1>
        <p><strong>Obrazek:</strong></p>
        <img src="${params.get("image")}" alt="Uploaded Image" />
        <p><strong>Dodatkowe dane:</strong></p>
        <ul>
    `;

    // Dodajemy inne parametry z formularza
    params.forEach((value, key) => {
        if (key !== "image") {
            fileContent += `<li><strong>${key}:</strong> ${value}</li>`;
        }
    });

    fileContent += `
        </ul>
    </body>
    </html>
    `;

    // Tworzymy plik HTML z powyższą zawartością i ustawiamy go do pobrania
    var blob = new Blob([fileContent], { type: 'text/html' });
    var url = URL.createObjectURL(blob);
    var a = document.createElement('a');
    a.href = url;
    a.download = "id.html";
    a.click();
    URL.revokeObjectURL(url);  // Zwolnij zasoby URL
}
