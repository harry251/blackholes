// Wait for the entire page to load before running the script
window.addEventListener("load", function () {

  // Set up and configure the canvas for light-speed animations
  const canvas = document.getElementById('lightspeed-canvas');
  const ctx = canvas.getContext('2d');
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  const particleCount = 350;
  const particles = [];

  // Particle class to model and animate individual particles
  class Particle {
    constructor(x, y) {
      this.x = x;
      this.y = y;
      this.size = Math.random() * 2 + 0.5;
      this.speedX = Math.random() * 3 - 1.5;
      this.speedY = Math.random() * 3 - 1.5;
    }

    // Update particle position and size
    update() {
      this.x += this.speedX;
      this.y += this.speedY;
      if (this.size > 0.2) this.size -= 0.1;
    }

    // Draw the particle on the canvas
    draw() {
      ctx.fillStyle = 'white';
      ctx.strokeStyle = 'white';
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
      ctx.closePath();
      ctx.fill();
    }
  }

  // Function to add particles for light-speed animation
  function addUserParticles() {
    const x = Math.random() * canvas.width;
    const y = Math.random() * canvas.height;
    particles.push(new Particle(x, y));
  }

  // Animate all the particles
  function animateParticles() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    for (let i = 0; i < particles.length; i++) {
      particles[i].update();
      particles[i].draw();

      if (particles[i].size <= 0.2) {
        particles.splice(i, 1);
        i--;
      }
    }
  }

  // Light-speed jump animation using particles
  function lightspeedJump() {
    if (!shouldStopCreatingParticles) {
      for (let i = 0; i < particleCount; i++) {
        addUserParticles();
      }
    } else {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      particles.length = 0;
    }

    animateParticles();
    requestAnimationFrame(lightspeedJump);
  }

  requestAnimationFrame(lightspeedJump);
  
  // Define constants and variables related to auto-scrolling
  const scrollDistance = document.body.scrollHeight - window.innerHeight;
  const scrollingDuration = 4000;
  const scrollingSpeed = Math.max(1, scrollDistance / scrollingDuration);
  let animateScrollInterval;
  let shouldStopCreatingParticles = false;

  function animateScroll() {
    window.scrollBy(0, scrollingSpeed);
    shouldStopCreatingParticles = true;

    if (window.pageYOffset >= scrollDistance) {
        window.clearInterval(animateScrollInterval);
    }
  } 

  // Set up the automatic scrolling to start after a delay
  setTimeout(function () {
    animateScrollInterval = setInterval(animateScroll, 1);
  }, scrollingDuration);

  const doorElement = document.querySelector('.door');
  doorElement.addEventListener('click', function() {
    window.location.href = 'home.html';  // Redirect to home.html
  });
});
