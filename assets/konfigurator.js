var upload = document.querySelector(".upload");

var imageInput = document.createElement("input");
imageInput.type = "file";
imageInput.accept = ".jpeg,.png,.gif";

document.querySelectorAll(".input_holder").forEach((element) => {

    var input = element.querySelector(".input");
    input.addEventListener('click', () => {
        element.classList.remove("error_shown");
    })

});

upload.addEventListener('click', () => {
    imageInput.click();
});

imageInput.addEventListener('change', (event) => {
    upload.classList.remove("upload_loaded");
    upload.classList.add("upload_loading");

    upload.removeAttribute("selected");

    var file = imageInput.files[0];
    
    // Create a FileReader to read the file
    var reader = new FileReader();
    
    // Once the file is read, convert it to a Base64 string and save to Local Storage
    reader.onload = function(e) {
        var base64Image = e.target.result; // This is the Base64 string of the image

        // Save the Base64 string to Local Storage
        localStorage.setItem("photo", base64Image);

        // Update the UI
        upload.classList.remove("error_shown");
        upload.setAttribute("selected", base64Image);
        upload.classList.add("upload_loaded");
        upload.classList.remove("upload_loading");
        upload.querySelector(".upload_uploaded").src = base64Image;
    };

    // Read the image file as a Data URL (Base64)
    reader.readAsDataURL(file);
});


document.querySelector(".go").addEventListener('click', () => {

    var empty = [];


    if (!upload.hasAttribute("selected")){
        empty.push(upload);
        upload.classList.add("error_shown")
    }
    

    document.querySelectorAll(".input_holder").forEach((element) => {

        var input = element.querySelector(".input");

        if (isEmpty(input.value)){
            empty.push(element);
            element.classList.add("error_shown");
        }else{
            // console.log("SET " + input.id + " to " + input.value)
            localStorage.setItem(input.id, input.value);
        }

    })

    if (empty.length != 0){
        empty[0].scrollIntoView();
    }else{
        forwardToId();
    }

});

function isEmpty(value){

    let pattern = /^\s*$/
    return pattern.test(value);

}

function forwardToId(){

   location.href = "index2.html";

}
