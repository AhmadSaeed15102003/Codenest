// here is the cursor
 

var cursor  = document.querySelector("#cursor")
var main = document.querySelector("#main")
var codenest= document.querySelector(".codenest ")
var main = document.querySelector("body");
var circle = document.querySelector("#circle");
var logocodenest = document.querySelector("#codenest");

let isAttached = false;
let isExpanded = false;

// Get initial circle position
const updateInitialPosition = () => {
  const rect = circle.getBoundingClientRect();
  return {
    x: rect.left + rect.width / 2,
    y: rect.top + rect.height / 2
  };
};

let initialPos = updateInitialPosition();

// Update position on resize
window.addEventListener('resize', () => {
  initialPos = updateInitialPosition();
});

main.addEventListener("mousemove", function(dets) {
  // Your original cursor movement
  gsap.to(cursor, {
    x: dets.x - cursor.offsetWidth / 2,
    y: dets.y - cursor.offsetHeight / 2,
    duration: 0.7,
    ease: "easeIn",
  });

  // Added magnetic effect
  const currentRect = circle.getBoundingClientRect();
  const currentCenterX = currentRect.left + currentRect.width / 2;
  const currentCenterY = currentRect.top + currentRect.height / 2;
  
  const dx = dets.x - currentCenterX;
  const dy = dets.y - currentCenterY;
  const distance = Math.sqrt(dx * dx + dy * dy);
  
  const attractionZone = 150;
  const snapZone = 60;
  const growZone = 30;

  if (distance < growZone) {
    if (!isExpanded) {
      isExpanded = true;
      isAttached = false;
      
      gsap.to(circle, {
        scale: 2,
        duration: 0.5,
        ease: "elastic.out(1, 0.3)"
      });
      
      gsap.to(cursor, {
        opacity: 0,
        duration: 0.3
      });

      gsap.to(circle, {
        x: 0,
        y: 0,
        duration: 0.5,
        ease: "power2.out"
      });
    }
  } else if (distance < snapZone) {
    if (isExpanded) {
      isExpanded = false;
      
      gsap.to(circle, {
        scale: 1,
        duration: 0.3,
        ease: "power2.out"
      });
      
      gsap.to(cursor, {
        opacity: 1,
        duration: 0.3
      });
    }

    isAttached = true;
    gsap.to(circle, {
      x: dx,
      y: dy,
      duration: 0.3,
      ease: "power2.out"
    });
  } else if (distance < attractionZone) {
    isAttached = false;
    isExpanded = false;
    
    const strength = 1 - (distance / attractionZone);
    gsap.to(circle, {
      x: dx * strength * 0.5,
      y: dy * strength * 0.5,
      scale: 1,
      duration: 0.5,
      ease: "power2.out"
    });
    
    gsap.to(cursor, {
      opacity: 1,
      duration: 0.3
    });
  } else {
    if (isAttached || isExpanded) {
      isAttached = false;
      isExpanded = false;
      
      gsap.to(circle, {
        x: 0,
        y: 0,
        scale: 1,
        duration: 0.5,
        ease: "elastic.out(1, 0.3)"
      });
      
      gsap.to(cursor, {
        opacity: 1,
        duration: 0.3
      });
    }
  }
});

// here is the box animation

    // Select all elements with the class "box"
    let boxes = document.querySelectorAll(".box");

    // Loop through each box and add hover effects
    boxes.forEach((box) => {
        box.addEventListener("mouseenter", () => {
          box.style.cursor = "none";
          gsap.to(cursor,{
            scale:0,
            opacity:0,
            duration: 0.3,
            ease: "power2.out"
          });
            gsap.to(box, {
                scale: 5,  // Scale up on hover
                duration: 0.3,
                ease: "power2.out"
            });
        });

        box.addEventListener("mouseleave", () => {
          box.style.cursor = "default";
          gsap.to(cursor,{
            scale:1,
            opacity:1,
            duration: 0.3,
            ease: "power2.out"
          });

            gsap.to(box, {
                scale: 1,  // Scale back to normal when not hovering
                duration: 0.3,
                ease: "power2.out"
            });
        });
    });


// here is the video
const imageBlock = document.getElementById("imageblock");
const resetDuration = 300;
const gridSize = 10; // 10x10 grid

// Create a 10x10 grid (100 blocks)
for (let i = 0; i < gridSize * gridSize; i++) {
    let block = document.createElement("div");
    block.className = "block w-full h-full bg-stone-300 mix-blend-hard-light transition-opacity duration-300 ease-in";

    // Add hover effect
    let timeoutId;
    block.addEventListener("mouseenter", () => {
        clearTimeout(timeoutId);
        block.classList.add("active");

        timeoutId = setTimeout(() => {
            block.classList.remove("active");
        }, resetDuration);
    });

    // Append block to the grid
    imageBlock.appendChild(block);
}

// the video gsap
// Select the video element
const video = document.querySelector("#video");

video.addEventListener("mouseenter", () => {
  video.style.cursor = "none";});

// Register GSAP ScrollTrigger plugin
gsap.registerPlugin(ScrollTrigger);

// GSAP animation with ScrollTrigger
gsap.fromTo(
  video,
  { opacity: .5, y: 100, scaleX: 0.6 }, // Starts hidden and shifted down by 100px
  {
    opacity: 1,
    scaleX: 1,
    y: 0, // Moves to original position
    duration: 1,
    ease: "power2.out",
    scrollTrigger: {
      trigger: "#videoContainer", // Triggers when the video container enters viewport
      start: "top 70%", // Start animation when 70% of video is in view
      end: "top 30%", // End animation at 30% in view
      scrub: true, // Smooth scrolling effect
     // Debugging markers, remove in production
    }
  }
);


class ShuffleEffect {
  constructor(selector, settings = {}) {
    this.elements = document.querySelectorAll(selector);
    this.settings = Object.assign({ velocity: 50, iterations: 6 }, settings);
    this.init();
  }

  shuffleText(element) {
    let originalText = element.dataset.text || element.innerText;
    let textArray = originalText.split('');

    function shuffleArray(array) {
      for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
      }
    }

    let iteration = 0;
    const interval = setInterval(() => {
      if (iteration >= this.settings.iterations) {
        clearInterval(interval);
        element.innerText = originalText; // Restore original text
        return;
      }

      shuffleArray(textArray);
      element.innerText = textArray.join('');
      iteration++;
    }, this.settings.velocity);
  }

  init() {
    this.elements.forEach(element => {
      element.dataset.text = element.innerText; // Store original text

      // Hover Effect
      element.addEventListener('mouseenter', () => this.shuffleText(element));
      element.addEventListener('mouseleave', () => element.innerText = element.dataset.text);
    });
  }
}

class ScrollShuffleEffect {
  constructor(selector, settings = {}) {
    this.elements = document.querySelectorAll(selector);
    this.settings = Object.assign({ duration: 1.5 }, settings);
    this.init();
  }

  init() {
    gsap.registerPlugin(ScrollTrigger);

    this.elements.forEach(element => {
      gsap.to(element, {
        opacity: 1,
        duration: this.settings.duration,
        scrollTrigger: {
          trigger: element,
          start: "top 85%",
          onEnter: () => {
            element.style.animation = "shuffle 0.8s ease-in-out";
          }
        }
      });
    });
  }
}

// Initialize Shuffle Effects
new ShuffleEffect(".shuffle-text", { velocity: 50, iterations: 6 });
new ScrollShuffleEffect(".shuffle-scroll", { duration: 1 });

// here is the loading shuffle
function shuffleText(el, iterations = 15, speed = 62) {
  if (!el) return;
  const original = el.innerText, chars = [...original];
  let count = 0, interval = setInterval(() => {
      el.innerText = count < iterations ? chars.sort(() => Math.random() - 0.5).join('') : (clearInterval(interval), original);
      count++;
  }, speed);
}

window.onload = () => {
  document.querySelectorAll(".shuffle-load").forEach(el => shuffleText(el)); // Shuffle effect

  const preloaders = ["preloader", "preloader2"]; // Array of preloader IDs

  setTimeout(() => {
      preloaders.forEach(id => {
          const preloader = document.getElementById(id);
          if (preloader) {
              preloader.style.transition = "opacity 0.5s ease";
              preloader.style.opacity = 0;
              setTimeout(() => preloader.style.display = "none", 500);
          }
      });
  }, 2000); // Keep preloaders for at least 2 seconds
};



// scroll trigger starts here

// gsap for the nav

const tl = gsap.timeline();

gsap.registerPlugin(ScrollTrigger);

// Animate the nav coming down on page load


// Animate the nav coming down on load

// animating the images

const images = document.querySelectorAll(".images");

images.forEach((image) => {
  gsap.from(image, {
    
    scrollTrigger: {
      trigger: image,
      start: "top 70%",
     
      
    }
  });
});

// Animate the nav coming down on load

tl.from(".nav",{
  y:-200,
  duration:.5,
  ease:"power2.out",
  
},"enim")

tl.from(".codenest",{
  opacity:0,
  y:200,
  duration:.5,
  ease:"power4.inout",
  opacity:0
 
})
// gsap.from(".codenest-text",{
  
//   duration:2,
//   ease:"power2.out",
//   opacity:0
 
// })
tl.fromTo(".codenest-text", 
  { opacity: 0 }, 
  { opacity: 1, duration:.7, ease: "power2.out" }
);

tl.from(".button",{
  y:200,
  duration:.7,
  ease:"power2.out",
  opacity:0
 
},"enim")


gsap.from(".images1",{
  y:200,
  duration:.3,
  delay:1,
  ease:"power2.out",
  opacity:0
 
})
gsap.from(".images2",{
  y:200,
  duration:.3,
  delay:1.1,
  ease:"power2.out",
  opacity:0
 
})
gsap.from(".images3",{
  y:200,
  duration:.3,
  delay:1.3,
  ease:"power2.out",
  opacity:0
 
})


// animating the page2


gsap.from(".box11", {
  scale: 0.1,              // Start the element at twice its original size
  opacity: 0,            // Start the element as invisible
  duration: 1,
  scrub:true,           // Duration for the effect
  scrollTrigger: {
    trigger: ".box11",     // The element to trigger the animation on
    start: "top 80%",     // Start when the top of the element reaches 80% of the viewport
    end: "top 60%",       // End when the top of the element reaches 30% of the viewport     // Debugging markers, remove in production
  },
  ease: "power2.out",    // Smooth easing for the animation
});
gsap.from(".box22", {
  scale: 0.1,              // Start the element at twice its original size
  opacity: 0,            // Start the element as invisible
  duration: 1,           // Duration for the effect
  scrollTrigger: {
    trigger: ".box22",     // The element to trigger the animation on
    start: "top 80%",     // Start when the top of the element reaches 80% of the viewport
    end: "top 60%",       // End when the top of the element reaches 30% of the viewport     // Debugging markers, remove in production
  },
  ease: "power2.out",    // Smooth easing for the animation
});
gsap.from(".box33", {
  scale: 0.1,              // Start the element at twice its original size
  opacity: 0,            // Start the element as invisible
  duration: 1,           // Duration for the effect
  scrollTrigger: {
    trigger: ".box33",     // The element to trigger the animation on
    start: "top 80%",     // Start when the top of the element reaches 80% of the viewport
    end: "top 60%",       // End when the top of the element reaches 30% of the viewport     // Debugging markers, remove in production
  },
  ease: "power2.out",    // Smooth easing for the animation
});

var Projects = document.querySelector(".Projects");



// here is the image part
let elems = document.querySelectorAll('.elem')

let page2 = document.querySelector('.page2')
elems.forEach((elem) => {
  elem.addEventListener('mouseenter', () => {
    var bgimg = elem.getAttribute('data-img');
    page2.style.backgroundImage = `url(${bgimg})`;
  });
});

  var testpage1 = document.querySelector("#testpage");



  // here is for the form

  
document.getElementById("contact-form").addEventListener("submit", function(event) {
  event.preventDefault(); // Prevent page reload

  let form = this;
  let submitBtn = document.getElementById("submit-btn");
  let originalText = submitBtn.innerHTML; // Store original button text
  let formData = new FormData(form);

  // Send form data using Fetch API
  fetch("https://api.web3forms.com/submit", {
      method: "POST",
      body: formData
  })
  .then(response => response.json())
  .then(result => {
      if (result.success) {
          // Change button to checkmark
          submitBtn.innerHTML = "✔️";
          submitBtn.style.backgroundColor = "#4CAF50"; // Green background
          submitBtn.style.color = "white";
          submitBtn.disabled = true;

          // Reset button after 2 seconds
          setTimeout(() => {
              submitBtn.innerHTML = originalText;
              submitBtn.style.backgroundColor = ""; // Reset background
              submitBtn.style.color = ""; // Reset color
              submitBtn.disabled = false;
              form.reset(); // Clear input fields
          }, 2000);
      } else {
          alert("Error submitting form. Please try again.");
      }
  })
  .catch(error => {
      console.error("Error:", error);
      alert("Something went wrong!");
  });
});


function mobileelemres(){
document.getElementById("menu-toggle").addEventListener("click", function() {
  document.getElementById("mobile-menu").classList.remove("hidden");
  document.getElementById("images").classList.add("hidden-mobile");
  document.getElementById("page2").classList.add("hidden"); // Hide images
  document.getElementById("testpage1").classList.add("hidden"); // Hide images
  document.getElementById("page5").classList.add("hidden"); // Hide images
  document.getElementById("page").classList.add("hidden"); // Hide images
  document.getElementById("nav").classList.add("hidden"); // Hide images
  document.getElementById("page1").classList.add("hidden"); // Hide images
  document.getElementById("page6").classList.add("hidden"); // Hide images
  document.getElementById("video").classList.add("hidden"); // Hide images
});

document.getElementById("close-menu").addEventListener("click", function() {
  document.getElementById("mobile-menu").classList.add("hidden");
  document.getElementById("images").classList.remove("hidden-mobile");
  document.getElementById("page2").classList.remove("hidden"); // Show images
  document.getElementById("testpage1").classList.remove("hidden"); // Show images
  document.getElementById("page5").classList.remove("hidden"); // Show images
  document.getElementById("page").classList.remove("hidden"); // Show images
  document.getElementById("nav").classList.remove("hidden"); // Show images
  document.getElementById("page1").classList.remove("hidden"); // Show images
  document.getElementById("page6").classList.remove("hidden"); // Show images
  document.getElementById("videomobile").classList.remove("hidden"); // Show images
});
}
mobileelemres()

// cursor image
var overs = document.querySelectorAll(".elem1");

overs.forEach(over => {
  over.addEventListener("mouseenter", function() {
    cursor.innerHTML = '<div style="width: 100%; height: 100%; display: flex; align-items: center; justify-content: center; font-size: 0.5em;"><h1>[Open now]</h1></div>';
    cursor.style.cursor = "pointer";
    gsap.to(cursor, {
      scale: 3,
      opacity: 0.6,
      backgroundColor: "#ededed", 
      border: '0vw solid transparent',
      duration: 0.3
    });
  });

  over.addEventListener("mouseleave", function() {
    cursor.innerHTML = '';
    gsap.to(cursor, {
      scale: 1,
      opacity: 1,
      backgroundColor: "transparent",
      border: '.3vw solid #a8a29e',
      duration: 0.3
    });
  });
});

codenest.addEventListener("mouseenter", function() {
  // Create and append image
  cursor.innerHTML = '<img src="https://i.pinimg.com/236x/dd/51/9c/dd519c5ebdf283a02e71e9f31e855bf2.jpg" style="width: 100%; height: 100%; object-fit: cover; opacity: 0; transform: scale(0);">';
  
  // Get the image element
  const img = cursor.querySelector('img');
  
  // First animate the cursor container
  gsap.to(cursor, {
    scale: 3,
    duration: 0.6,
    overflow: "hidden", 
    border: '0vw solid transparent',
    ease: "elastic.out(1, 0.75)"
  });

  // Then animate the image inside
  gsap.to(img, {
    opacity: 1,
    scale: 1,
    duration: 0.5,
    delay: 0.1,
    ease: "power2.out"
  });
});

codenest.addEventListener("mouseleave", function() {
  cursor.innerHTML = '';
  gsap.to(cursor, {
    scale: 1,
    duration: 0, // Reduced duration to make recovery faster
    width: '3vw',
    height: '3vw',
    border: '.3vw solid #a8a29e',
    backgroundColor: 'transparent',
    ease: "power2.inOut" // Added easing for smoother transition
  });
});


var navelem = document.querySelectorAll(".navelem");

navelem.forEach(navelem => {
  navelem.addEventListener("mouseenter", function() {
    gsap.to(cursor, {
      scale: 1.7,
      opacity: 0.8,
      backgroundColor: "#c2c2c2", 
      border: '0vw solid transparent',
      duration: 0.3
    });
  });

  navelem.addEventListener("mouseleave", function() {
    cursor.innerHTML = '';
    gsap.to(cursor, {
      scale: 1,
      opacity: 1,
      backgroundColor: "transparent",
      border: '.3vw solid #a8a29e',
      duration: 0.3
    });
  });
});

var know = document.querySelector(".know");

know.addEventListener("mouseenter",function(){
  cursor.innerHTML = '<div style="width: 100%; height: 100%; display: flex; align-items: center; justify-content: center; font-size: 0.5em;"><h1>[Explore]</h1></div>';
  cursor.style.cursor = "pointer";
  gsap.to(cursor, {
    scale: 3,
    opacity: 1,
    backgroundColor: "#fbff04", 
    border: '0vw solid transparent',
    duration: 0.3
  });
});
know.addEventListener("mouseleave", function() {
  cursor.innerHTML = '';
  gsap.to(cursor, {
    scale: 1,
    opacity: 1,
    backgroundColor: "transparent",
    border: '.3vw solid #a8a29e',
    duration: 0.3
  });
});
var know1 = document.querySelector(".know1");

know1.addEventListener("mouseenter",function(){
  cursor.innerHTML = '<div style="width: 100%; height: 100%; display: flex; align-items: center; justify-content: center; font-size: 0.5em;"><h1>[Explore]</h1></div>';
  cursor.style.cursor = "pointer";
  gsap.to(cursor, {
    scale: 3,
    opacity: 1,
    backgroundColor: "#fbff04", 
    border: '0vw solid transparent',
    duration: 0.3
  });
});
know1.addEventListener("mouseleave", function() {
  cursor.innerHTML = '';
  gsap.to(cursor, {
    scale: 1,
    opacity: 1,
    backgroundColor: "transparent",
    border: '.3vw solid #a8a29e',
    duration: 0.3
  });
});

// from here starts the projects page

