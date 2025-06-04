// Show section by ID
function showSection(id) {
  const sections = document.querySelectorAll(".section");
  sections.forEach((section) => {
    section.classList.remove("active");
  });

  const target = document.getElementById(id);
  if (target) {
    target.classList.add("active");
  }
}

// Scroll to a specific section
function scrollToSection(id) {
  const element = document.getElementById(id);
  if (element) {
    element.scrollIntoView({ behavior: "smooth" });
  }
}

// All modal elements
const modals = document.querySelectorAll(".modal");

// Change profile picture
function changeProfilePic(src) {
  const profileImg = document.querySelector(".profile-img");
  if (profileImg) {
    profileImg.src = src;
  }
  closeModal(); // Close profile modal
}

// Zoom feature for gallery images
const galleryImages = document.querySelectorAll(".gallery img");
const modalImg = document.getElementById("modal-img");

if (galleryImages.length > 0 && modalImg) {
  galleryImages.forEach((img) => {
    img.addEventListener("click", () => {
      openModal(1); // Open zoom modal (index=1)
      modalImg.src = img.src;
    });
  });
}

// Open modal by index
function openModal(index = 0) {
  if (modals[index]) {
    modals.forEach((m) => (m.style.display = "none"));
    modals[index].style.display = "flex";
  }
}

// Close all modals
function closeModal() {
  modals.forEach((m) => (m.style.display = "none"));
}

// Close modal when clicking outside the content
modals.forEach((modal) => {
  modal.addEventListener("click", (e) => {
    if (e.target === modal) {
      modal.style.display = "none";
    }
  });
});

// Close modal via close (X) buttons
document.querySelectorAll(".close").forEach((btn) => {
  btn.addEventListener("click", () => {
    closeModal();
  });
});

// Close modal on Escape key press
document.addEventListener("keydown", function (event) {
  if (event.key === "Escape") {
    closeModal();
  }
});

// Handle profile image upload
function handleUpload(files) {
  if (files.length === 0) return;

  const file = files[0];
  const reader = new FileReader();

  reader.onload = function (e) {
    const profileImg = document.querySelector(".profile-img");
    if (profileImg) {
      profileImg.src = e.target.result;
    }
    closeModal(); // Close modal after upload
  };

  reader.readAsDataURL(file);
}

// Like system for gallery
const galleryItems = document.querySelectorAll(".gallery-item");
const modal = document.querySelector(".zoom-modal-content");
const modalLikeIcon = modal.querySelector(".like-icon");

// Map to store liked states based on image src
const likesMap = new Map();

function toggleLike(src) {
  const isLiked = likesMap.get(src) === true ? false : true;
  likesMap.set(src, isLiked);

  // Update gallery like icons
  galleryItems.forEach((item) => {
    const img = item.querySelector("img");
    const likeIcon = item.querySelector(".like-icon");
    if (img.src === src) {
      likeIcon.classList.toggle("liked", isLiked);
      likeIcon.textContent = isLiked ? "❤️" : "🤍";
    }
  });

  // Update modal like icon if the same image is open
  if (modalImg.src === src) {
    modalLikeIcon.classList.toggle("liked", isLiked);
    modalLikeIcon.textContent = isLiked ? "❤️" : "🤍";
  }
}

// Handle like click in gallery
galleryItems.forEach((item) => {
  const img = item.querySelector("img");
  const likeIcon = item.querySelector(".like-icon");

  likeIcon.addEventListener("click", (e) => {
    e.stopPropagation(); // Prevent opening the modal
    toggleLike(img.src);
  });

  img.addEventListener("click", () => {
    modal.style.display = "flex";
    modalImg.src = img.src;

    // Update modal like icon
    const isLiked = likesMap.get(img.src) === true;
    modalLikeIcon.classList.toggle("liked", isLiked);
    modalLikeIcon.textContent = isLiked ? "❤️" : "🤍";
  });
});

// Handle like inside zoom modal
modalLikeIcon.addEventListener("click", (e) => {
  e.stopPropagation();
  toggleLike(modalImg.src);
});
