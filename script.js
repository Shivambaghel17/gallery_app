 // Initialize gallery and events
        function loadGallery() {
            const gallery = document.getElementById("gallery");
            gallery.innerHTML = ''; // Clear gallery

            const storedImages = JSON.parse(localStorage.getItem('images')) || [];

            storedImages.forEach((imageData, index) => {
                const galleryItem = document.createElement('div');
                galleryItem.classList.add('gallery-item');

                // Create image element
                const imgElement = document.createElement('img');
                imgElement.src = imageData.url;
                imgElement.alt = imageData.name;

                // Create delete button
                const deleteButton = document.createElement('button');
                deleteButton.classList.add('delete-btn');
                deleteButton.innerText = 'X';
                deleteButton.addEventListener('click', () => deleteImage(index));

                // Append to gallery item
                galleryItem.appendChild(imgElement);
                galleryItem.appendChild(deleteButton);
                gallery.appendChild(galleryItem);
            });
        }

        // Add photo
        document.getElementById("addPhoto").addEventListener("click", function() {
            const input = document.createElement('input');
            input.type = 'file';
            input.accept = 'image/*';
            input.click();

            input.addEventListener('change', (event) => {
                const file = event.target.files[0];
                if (file) {
                    const reader = new FileReader();
                    reader.onload = () => {
                        const imageData = {
                            url: reader.result,
                            name: file.name
                        };
                        const storedImages = JSON.parse(localStorage.getItem('images')) || [];
                        storedImages.push(imageData);
                        localStorage.setItem('images', JSON.stringify(storedImages));
                        loadGallery();
                    };
                    reader.readAsDataURL(file);
                }
            });
        });

        // Delete image from localStorage
        function deleteImage(index) {
            const storedImages = JSON.parse(localStorage.getItem('images')) || [];
            storedImages.splice(index, 1);
            localStorage.setItem('images', JSON.stringify(storedImages));
            loadGallery();
        }

        // Clear all images
        document.getElementById("clearGallery").addEventListener("click", function() {
            localStorage.removeItem('images');
            loadGallery();
        });

        // Load gallery when page is loaded
        window.onload = loadGallery;