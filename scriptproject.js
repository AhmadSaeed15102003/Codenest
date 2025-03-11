const scrollContainer = document.getElementById("scrollContainer");
      
              function scrollLeft() {
                  scrollContainer.scrollBy({ left: -250, behavior: 'smooth' });
                  checkScroll();
              }
      
              function scrollRight() {
                  scrollContainer.scrollBy({ left: 250, behavior: 'smooth' });
                  checkScroll();
              }
      
              function checkScroll() {
                  if (scrollContainer.scrollLeft + scrollContainer.clientWidth >= scrollContainer.scrollWidth) {
                      cloneItems();
                  }
              }
      
              function cloneItems() {
                  const items = scrollContainer.querySelectorAll('.scroll-item');
                  items.forEach(item => {
                      const clone = item.cloneNode(true);
                      scrollContainer.appendChild(clone);
                  });
              }


              // here is the cursor part of this page
              let main1 =document.querySelector("#main1");

              main1.addEventListener("mousemove", function(dets) {
                // Your original cursor movement
                gsap.to(cursor, {
                  x: dets.x - cursor.offsetWidth / 2,
                  y: dets.y - cursor.offsetHeight / 2,
                  duration: 0.7,
                  ease: "easeIn",
                });
              });



              var over = document.querySelectorAll(".scroll-item");

bovers.forEach(bover => {
  bover.addEventListener("mouseenter", function() {
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

  bover.addEventListener("mouseleave", function() {
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
              