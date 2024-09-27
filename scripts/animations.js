/*
function setup() {
    let canvas = createCanvas(300, 300); // Set canvas size
    canvas.parent('p5-canvas-container'); // Attach canvas to the container
    noFill(); // No fill for shapes
    frameRate(30); // Set frame rate
  }

  function draw() {
    background(20, 30, 50); // Dark background color

    // Create abstract, flowing shapes
    stroke(255, 100, 150, 150); // Set stroke color and transparency
    strokeWeight(2);

    // Create a looping dynamic shape
    for (let i = 0; i < 20; i++) {
      let t = frameCount * 0.01 + i;
      let x = width / 2 + sin(t) * 100;
      let y = height / 2 + cos(t) * 100;
      ellipse(x, y, 100, 100); // Draw ellipses that move and overlap
    }

    // Add some rotating lines
    stroke(100, 150, 255, 150);
    translate(width / 2, height / 2);
    rotate(frameCount * 0.01);
    for (let i = 0; i < 8; i++) {
      line(0, 0, 150, 0);
      rotate(PI / 4);
    }
  }
*/

// Animation 1: Interconnected Particles

var sketch1 = function (p) {
  let particles = [];
  const numParticles = 50;

  p.setup = function () {
    let canvas = p.createCanvas(300, 300);
    canvas.parent("p5-canvas-container-1");
    p.colorMode(p.HSB, 360, 100, 100, 100);
    p.noStroke();

    // Create particles
    for (let i = 0; i < numParticles; i++) {
      particles.push(new Particle());
    }
  };

  p.draw = function () {
    p.background(220, 50, 20); // Background color

    // Update and display particles
    for (let particle of particles) {
      particle.update();
      particle.display();
    }

    // Draw connections
    for (let i = 0; i < particles.length; i++) {
      for (let j = i + 1; j < particles.length; j++) {
        let d = p.dist(
          particles[i].pos.x,
          particles[i].pos.y,
          particles[j].pos.x,
          particles[j].pos.y
        );
        if (d < 60) {
          p.stroke(0, 0, 100, p.map(d, 0, 60, 100, 0));
          p.line(
            particles[i].pos.x,
            particles[i].pos.y,
            particles[j].pos.x,
            particles[j].pos.y
          );
        }
      }
    }
  };

  class Particle {
    constructor() {
      this.pos = p.createVector(p.random(p.width), p.random(p.height));
      this.vel = p.createVector(p.random(-1, 1), p.random(-1, 1));
      this.size = p.random(3, 6);
      this.hue = p.random(200, 280);
    }

    update() {
      this.pos.add(this.vel);

      // Wrap around edges
      if (this.pos.x > p.width) this.pos.x = 0;
      if (this.pos.x < 0) this.pos.x = p.width;
      if (this.pos.y > p.height) this.pos.y = 0;
      if (this.pos.y < 0) this.pos.y = p.height;
    }

    display() {
      p.noStroke();
      p.fill(this.hue, 80, 100);
      p.ellipse(this.pos.x, this.pos.y, this.size);
    }
  }
};

new p5(sketch1);

/*
// Animation 2: Gentle Flowing Particles

var sketch2 = function(p) {
  let particles = [];
  const numParticles = 50;
  let flowField;
  let cols, rows;
  let scale = 10;
  let zOffset = 0;

  p.setup = function() {
    let canvas = p.createCanvas(300, 300);
    canvas.parent('p5-canvas-container-2');
    p.colorMode(p.HSB, 360, 100, 100, 100);
    p.background(220, 50, 20); // Soft background color
    p.noStroke();

    // Calculate columns and rows for the flow field
    cols = p.floor(p.width / scale);
    rows = p.floor(p.height / scale);
    flowField = new Array(cols * rows);

    // Create particles
    for (let i = 0; i < numParticles; i++) {
      particles.push(new Particle());
    }
  };

  p.draw = function() {
    // Generate flow field using Perlin noise
    let yOffset = 0;
    for (let y = 0; y < rows; y++) {
      let xOffset = 0;
      for (let x = 0; x < cols; x++) {
        let angle = p.noise(xOffset, yOffset, zOffset) * p.TWO_PI * 2;
        let vector = p5.Vector.fromAngle(angle);
        vector.setMag(0.5);
        flowField[x + y * cols] = vector;
        xOffset += 0.05;
      }
      yOffset += 0.05;
    }
    zOffset += 0.001;

    // Update and display particles
    for (let particle of particles) {
      particle.follow(flowField);
      particle.update();
      particle.edges();
      particle.display();
    }
  };

  class Particle {
    constructor() {
      this.pos = p.createVector(p.random(p.width), p.random(p.height));
      this.vel = p.createVector(0, 0);
      this.acc = p.createVector(0, 0);
      this.maxSpeed = 1.5;
      this.hue = p.random(200, 260); // Soft hues
      this.size = 2;
      this.prevPos = this.pos.copy();
    }

    follow(vectors) {
      let x = p.floor(this.pos.x / scale);
      let y = p.floor(this.pos.y / scale);
      let index = x + y * cols;
      let force = vectors[index];
      if (force) {
        this.applyForce(force);
      }
    }

    applyForce(force) {
      this.acc.add(force);
    }

    update() {
      this.vel.add(this.acc);
      this.vel.limit(this.maxSpeed);
      this.pos.add(this.vel);
      this.acc.mult(0);
    }

    edges() {
      if (this.pos.x > p.width) this.pos.x = 0;
      if (this.pos.x < 0) this.pos.x = p.width;
      if (this.pos.y > p.height) this.pos.y = 0;
      if (this.pos.y < 0) this.pos.y = p.height;

      this.prevPos = this.pos.copy();
    }

    display() {
      p.stroke(this.hue, 80, 100, 50);
      p.strokeWeight(this.size);
      p.line(this.pos.x, this.pos.y, this.prevPos.x, this.prevPos.y);
      this.prevPos = this.pos.copy();
    }
  }
};

new p5(sketch2);
*/

var sketch2 = function(p) {
  let particles = [];
  const numParticles = p.windowWidth < 768 ? 15 : 50; // Adjust particle count based on screen size
  let bursts = [];

  p.setup = function() {
    let canvas = p.createCanvas(p.windowWidth < 768 ? p.windowWidth - 20 : 300, 300);
    canvas.parent('p5-canvas-container-2');
    p.colorMode(p.HSB, 360, 100, 100, 100);
    p.background(220, 50, 20); // Soft background color
    p.noStroke();

    // Create gentle floating particles
    for (let i = 0; i < numParticles; i++) {
      particles.push(new Particle(p.random(p.width), p.random(p.height)));
    }

    // Schedule bursts randomly every few seconds
    setInterval(() => {
      bursts.push(new Burst(p.random(p.width), p.random(p.height)));
    }, p.random(2500, 5500)); // Burst every few seconds
  };

  p.draw = function() {
    p.background(220, 50, 20, 15); // Semi-transparent background to create a trailing effect

    // Update and display floating particles
    for (let particle of particles) {
      particle.move();
      particle.display();
    }

    // Update and display bursts
    for (let i = bursts.length - 1; i >= 0; i--) {
      bursts[i].update();
      bursts[i].display();
      if (bursts[i].isFinished()) {
        bursts.splice(i, 1); // Remove burst when it's finished
      }
    }
  };

  class Particle {
    constructor(x, y) {
      this.pos = p.createVector(x, y);
      this.vel = p.createVector(p.random(-1, 1), p.random(-1, 1));
      this.acc = p.createVector(0, 0);
      this.size = p.random(3, 6); // Small but visible particle size
      this.hue = p.random(200, 260); // Soft pastel hues
    }

    move() {
      this.acc = p5.Vector.random2D().mult(0.05); // Apply slight random acceleration for a smooth floating effect
      this.vel.add(this.acc);
      this.vel.limit(1); // Limit speed for gentle motion
      this.pos.add(this.vel);

      // Wrap edges to create continuous flow
      if (this.pos.x > p.width) this.pos.x = 0;
      if (this.pos.x < 0) this.pos.x = p.width;
      if (this.pos.y > p.height) this.pos.y = 0;
      if (this.pos.y < 0) this.pos.y = p.height;
    }

    display() {
      p.fill(this.hue, 80, 100, 50); // Soft, translucent particle fill
      p.ellipse(this.pos.x, this.pos.y, this.size);
    }
  }

  // Firework burst class
  class Burst {
    constructor(x, y) {
      this.pos = p.createVector(x, y);
      this.particles = [];
      this.lifespan = 255;

      // Create particles for the burst
      for (let i = 0; i < 50; i++) {
        let particle = new BurstParticle(this.pos.x, this.pos.y);
        this.particles.push(particle);
      }
    }

    update() {
      for (let particle of this.particles) {
        particle.update();
      }
      this.lifespan -= 4; // Decrease lifespan to fade out
    }

    display() {
      for (let particle of this.particles) {
        particle.display();
      }
    }

    isFinished() {
      return this.lifespan <= 0; // Burst is finished when lifespan reaches 0
    }
  }

  // Individual particle in the burst
  class BurstParticle {
    constructor(x, y) {
      this.pos = p.createVector(x, y);
      this.vel = p5.Vector.random2D().mult(p.random(2, 5)); // Random velocity in all directions
      this.acc = p.createVector(0, 0);
      this.hue = p.random(180, 260); // blue/purple
      this.size = p.random(3, 5);
      this.lifespan = 255;
    }

    update() {
      this.vel.mult(0.95); // Slow down over time
      this.pos.add(this.vel);
      this.lifespan -= 5; // Fade out over time
    }

    display() {
      p.fill(this.hue, 80, 100, this.lifespan);
      p.noStroke();
      p.ellipse(this.pos.x, this.pos.y, this.size);
    }
  }

  // Resize canvas on window resize
  p.windowResized = function() {
    let newWidth = p.windowWidth < 768 ? p.windowWidth - 20 : 300;
    let newHeight = p.windowWidth < 768 ? p.windowHeight / 2 : 300; // Adjust height
    p.resizeCanvas(newWidth, newHeight);
    p.background(220, 50, 20); // Redraw background on resize
  };
};

new p5(sketch2);

  
// Animation 3: Pulsating Waves

var sketch3 = function (p) {
  p.setup = function () {
    let canvas = p.createCanvas(300, 300);
    canvas.parent("p5-canvas-container-3");
    p.noFill();
    p.strokeWeight(2);
  };

  p.draw = function () {
    p.background(30, 20, 50); // Dark background color

    p.translate(p.width / 2, p.height / 2);

    let maxRadius = p.min(p.width, p.height) / 2;
    let numCircles = 8;

    for (let i = 0; i < numCircles; i++) {
      p.stroke((p.frameCount + i * 20) % 360, 80, 100);
      let radius =
        (i + 1) * (maxRadius / numCircles) +
        p.sin(p.frameCount * 0.05 + i) * 10;
      p.ellipse(0, 0, radius * 2);
    }
  };
};

new p5(sketch3);

// Enhanced Animation 4: Fluid Network with Perlin Noise

var sketch4 = function(p) {
    let nodes = [];
    const numNodes = 25;
    let time = 0;
  
    p.setup = function() {
      let canvas = p.createCanvas(300, 300);
      canvas.parent('p5-canvas-container-4');
      p.colorMode(p.HSB, 360, 100, 100, 100);
      p.noStroke();
  
      // Initialize nodes with random positions
      for (let i = 0; i < numNodes; i++) {
        nodes.push(new Node(p.random(p.width), p.random(p.height)));
      }
    };
  
    p.draw = function() {
      p.background(220, 20, 20); // Soft background color
      time += 0.005; // Increment time for Perlin noise
  
      // Update and display nodes
      for (let node of nodes) {
        node.update(time);
        node.display();
      }
  
      // Draw connections
      p.strokeWeight(1);
      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          let d = p5.Vector.dist(nodes[i].pos, nodes[j].pos);
          if (d < 80) {
            p.stroke(0, 0, 100, p.map(d, 0, 80, 100, 0));
            p.line(nodes[i].pos.x, nodes[i].pos.y, nodes[j].pos.x, nodes[j].pos.y);
          }
        }
      }
    };
  
    class Node {
      constructor(x, y) {
        this.pos = p.createVector(x, y);
        this.hue = p.random(0, 360);
      }
  
      update(t) {
        // Use Perlin noise to update position
        let nX = p.noise(this.pos.x * 0.005, this.pos.y * 0.005, t);
        let nY = p.noise(this.pos.y * 0.005, this.pos.x * 0.005, t + 100);
        this.pos.x += p.map(nX, 0, 1, -1, 1);
        this.pos.y += p.map(nY, 0, 1, -1, 1);
  
        // Keep nodes within canvas bounds
        this.pos.x = p.constrain(this.pos.x, 0, p.width);
        this.pos.y = p.constrain(this.pos.y, 0, p.height);
      }
  
      display() {
        p.noStroke();
        p.fill(this.hue, 80, 100);
        p.ellipse(this.pos.x, this.pos.y, 6);
      }
    }
  };
  
  new p5(sketch4);
  
// Animation 5: Converging Particles

var sketch5 = function(p) {
    let particles = [];
    const numParticles = 100;
    let centralOrbSize = 20;
    let maxOrbSize = 30;
    let orbPulseSpeed = 0.03;
    let orbHue = 27; // Warm, inviting color
    let center;
  
    p.setup = function() {
      let canvas = p.createCanvas(300, 300);
      canvas.parent('p5-canvas-container-5');
      p.noStroke();
      p.colorMode(p.HSB, 360, 100, 100, 100);
      center = p.createVector(p.width / 2, p.height / 2);
  
      // Create particles at random edges
      for (let i = 0; i < numParticles; i++) {
        particles.push(new Particle());
      }
    };

    function drawCentralOrb() {
      // Pulsate the orb size
      centralOrbSize = 20 + p.sin(p.frameCount * orbPulseSpeed) * 5;
  
      // Optional: Make the orb respond to mouse proximity
      let distanceToMouse = p.dist(p.mouseX, p.mouseY, center.x, center.y);
      if (distanceToMouse < 100) {
        centralOrbSize = maxOrbSize;
      }
  
      p.noStroke();
      p.fill(orbHue, 80, 100, 80);
      p.ellipse(center.x, center.y, centralOrbSize);
  
      // Add a glow effect
      p.drawingContext.shadowBlur = 20;
      p.drawingContext.shadowColor = p.color(orbHue, 80, 100);
      p.ellipse(center.x, center.y, centralOrbSize);
      p.drawingContext.shadowBlur = 0;
    }
  
    p.draw = function() {
      p.background(210, 50, 20); // Light background color

    // Draw central glowing orb
    drawCentralOrb();
  
      for (let particle of particles) {
        particle.update();
        particle.display();
      }
    };
  
    class Particle {
      constructor() {
        this.reset();
      }
  
      reset() {
        // Start from a random edge
        let edge = p.floor(p.random(4));
        switch (edge) {
          case 0: // Top edge
            this.pos = p.createVector(p.random(p.width), 0);
            break;
          case 1: // Right edge
            this.pos = p.createVector(p.width, p.random(p.height));
            break;
          case 2: // Bottom edge
            this.pos = p.createVector(p.random(p.width), p.height);
            break;
          case 3: // Left edge
            this.pos = p.createVector(0, p.random(p.height));
            break;
        }
        // Set velocity towards the center
        this.vel = p5.Vector.sub(center, this.pos);
        this.vel.setMag(p.random(0.5, 1.5));
        this.size = p.random(2, 5);
        this.hue = p.random(0, 360);
        this.alpha = 100;
      }
  
      update() {
        this.pos.add(this.vel);
        this.alpha -= 0.5;
  
        // Reset particle if it reaches the center or becomes invisible
        if (p5.Vector.dist(this.pos, center) < 5 || this.alpha <= 0) {
          this.reset();
        }
      }
  
      display() {
        p.fill(this.hue, 80, 100, this.alpha);
        p.ellipse(this.pos.x, this.pos.y, this.size);
      }
    }
  };
  
  new p5(sketch5);
  