document.addEventListener('DOMContentLoaded', function () {
    const addPhotoText = document.getElementById('addPhotoText');
    const fileInput = document.getElementById('photo');
    const imageNameDiv = document.getElementById('imageName');

    addPhotoText.addEventListener('click', function () {
        fileInput.click(); // opens the file picker
    });

    //if file is selected, display the file name below the input
    function previewImage() {
        const file = fileInput.files[0];

        if (file) {
            imageNameDiv.textContent = 'Selected file: ' + file.name; 
        } else {
            imageNameDiv.textContent = ''; // clear the file name if no file is selected
        }
    }
    window.previewImage = previewImage;
});