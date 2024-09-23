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

// Animation 2: Flowing Gradient Background

var sketch2 = function (p) {
    let colors = [];
    let colorIndex = 0;
    let gradientSpeed = 0.005;
  
    p.setup = function () {
      let canvas = p.createCanvas(300, 300);
      canvas.parent("p5-canvas-container-2");
      p.noStroke();
  
      // Define gradient colors
      colors = [
        p.color(255, 102, 102),   // Red
        p.color(102, 255, 178),   // Green
        p.color(102, 178, 255),   // Blue
        p.color(255, 102, 255),   // Purple
      ];
    };
  
    p.draw = function () {
      // Calculate indices
      let i1 = Math.floor(colorIndex) % colors.length;
      let i2 = (i1 + 1) % colors.length;
      let i3 = (i1 + 2) % colors.length;
  
      // Fractional part between 0 and 1
      let t = colorIndex % 1;
  
      for (let y = 0; y < p.height; y++) {
        let interY = y / p.height;
  
        // Gradient from colors[i1] to colors[i2]
        let gradient1 = p.lerpColor(colors[i1], colors[i2], interY);
        // Gradient from colors[i2] to colors[i3]
        let gradient2 = p.lerpColor(colors[i2], colors[i3], interY);
  
        // Interpolate between the two gradients over time
        let c = p.lerpColor(gradient1, gradient2, t);
  
        p.stroke(c);
        p.line(0, y, p.width, y);
      }
  
      // Update colorIndex
      colorIndex += gradientSpeed;
      if (colorIndex >= colors.length) {
        colorIndex -= colors.length;
      }
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
  
    p.draw = function() {
      p.background(210, 50, 20); // Light background color
  
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
  