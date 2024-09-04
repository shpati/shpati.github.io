// Get the modal
var modal = document.getElementById('modal');

// Get the image and insert it inside the modal - use its "alt" text as a caption
var modalImg = document.getElementById('modal-image');
var captionText = document.getElementById('caption');

var images = document.getElementsByClassName('gallery-item');
var currentIndex;

// Open the modal and display the image at the given index
function openModal(index) {
    modal.style.display = 'block';
    modalImg.src = images[index].src;
    captionText.innerHTML = "© Shpati Koleka - " + images[index].alt;
    currentIndex = index;

    // Add click event listeners for navigation
    modalImg.addEventListener('click', handleImageClick);
    modalImg.addEventListener('contextmenu', handleImageRightClick);
}


// Handle left click to show the next image
function handleImageClick(event) {
    showNextImage();
}

// Handle right click to show the previous image
function handleImageRightClick(event) {
    event.preventDefault(); // Prevent default context menu from appearing
    showPrevImage();
}

// Loop through images and attach click event
for (var i = 0; i < images.length; i++) {
    (function(index){
        images[index].onclick = function() {
            openModal(index);
        }
    })(i);
}

// Get the <span> element that closes the modal
var span = document.getElementsByClassName('close')[0];

// When the user clicks on <span> (x), close the modal
span.onclick = function() {
    modal.style.display = 'none';
    // Remove click event listeners to avoid memory leaks
    modalImg.removeEventListener('click', handleImageClick);
    modalImg.removeEventListener('contextmenu', handleImageRightClick);
}

// Get the arrow elements for navigation
var prev = document.getElementsByClassName('prev')[0];
var next = document.getElementsByClassName('next')[0];

// Show previous image
prev.onclick = function() {
    showPrevImage();
}

// Show next image
next.onclick = function() {
    showNextImage();
}

// Show the previous image
function showPrevImage() {
    currentIndex = (currentIndex > 0) ? currentIndex - 1 : images.length - 1;
    openModal(currentIndex);
}

// Show the next image
function showNextImage() {
    currentIndex = (currentIndex < images.length - 1) ? currentIndex + 1 : 0;
    openModal(currentIndex);
}

// Keyboard navigation
document.onkeydown = function(event) {
    if (modal.style.display === 'block') {
        if (event.key === 'ArrowLeft') {
            showPrevImage();
        } else if (event.key === 'ArrowRight') {
            showNextImage();
        } else if (event.key === 'Escape') {
            modal.style.display = 'none';
            // Remove click event listeners to avoid memory leaks
            modalImg.removeEventListener('click', handleImageClick);
            modalImg.removeEventListener('contextmenu', handleImageRightClick);
        }
    }
}