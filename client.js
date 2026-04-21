const app = Vue.createApp({
  data() {
    return {
      bannerKeys: ['Home', 'Resume', 'Contact', 'About'],
      selectedBannerKey: 'Home'
    };
  },
  methods: {
    setActiveName(name) {
      this.selectedBannerKey = name;
    }
  }
});

// Each "page's" content
app.component('Home', {
  template: `<div id="mainContentArea">
            <div id="innerContent">
                <div id="leftClm">
                    <p></p>
                    <h1>Hi, I'm <span>Zach Rankin</span><br />Software Developer</h1>
                    <p>
                        I build clean, performant software and enjoy working across
                        full-stack systems, algorithms, and modern web technologies.
                    </p>
                    <div class="aboutCard" id="landingCard">
                      <h3>Best Skills On</h3>
                      <div id="hList">
                        <img class="landingIcon" src="./assets/cppLogo.png" alt="C++ Logo"/>
                        <img class="landingIcon" src="./assets/csLogoOld.png" alt="C# Logo"/>
                        <img class="landingIcon" src="./assets/javaLogo.png" alt="Java Logo"/>
                        <img class="landingIcon" src="./assets/pythonLogo.png" alt="Python Logo"/>
                      </div>
                    </div>
                </div>
                <img class="profile" src="./assets/me.jpg" alt="Zach Rankin" />
            </div>
        </div>`
});

app.component('Resume', {
  template: `    <div class="pdfWrapper">
      <iframe
        src="./assets/Resume_Zach_Rankin.pdf"
        title="Resume PDF"
        loading="lazy">
      </iframe>
    </div>
  `
});

app.component('Contact', {
  template: `
    <section class="contactPage">
      <div class="contactLeft">
        <h2>Let’s connect</h2>
        <p class="contactIntro">
          I’m open to internships, full-time roles, and collaborative projects.
          If you’re building something interesting or hiring, I’d love to talk.
        </p>

        <div class="availabilityCard">
          <h3>Availability</h3>
          <ul>
            <li>Open to internships, new-grad roles, part and full time positions</li>
            <li>Remote or on-site (US)</li>
            <li>Actively interviewing</li>
          </ul>
        </div>
      </div>

      <div class="contactRight">
        <div class="contactCard">
          <span>Email</span>
          <a href="mailto:zach.t.rankin@gmail.com">
            zach.t.rankin@gmail.com
          </a>
        </div>

        <div class="contactCard">
          <span>LinkedIn</span>
          <a href="https://www.linkedin.com/in/zachary-rankin-a84092243/" target="_blank">
            Connect with me →
          </a>
        </div>

        <div class="contactCard">
          <span>GitHub</span>
          <a href="https://github.com/" target="_blank">
            View my work →
          </a>
        </div>

        <div class="contactFooter">
          <p>Based in Marquette Michigan</p>
          <p>Typically responds within 24 hours</p>
        </div>
      </div>
    </section>
  `
});

app.component('About', {
  data() {
    return {
      images: [
        './assets/gradPhoto.jpg',
        './assets/truckAtCLB.JPG',
        './assets/meEaster2026.jpeg'
      ],
      selectedIndex: 0,
      touchStartX: 0,
      intervalId: null
    };
  },

  computed: {
    selectedImage() {
      return this.images[this.selectedIndex];
    }
  },

  methods: {
    setImage(index) {
      this.selectedIndex = index;
      this.restartAutoCycle();
    },

    nextImage() {
      this.selectedIndex = (this.selectedIndex + 1) % this.images.length;
    },

    prevImage() {
      this.selectedIndex =
        (this.selectedIndex - 1 + this.images.length) % this.images.length;
    },

    startAutoCycle() {
      this.intervalId = setInterval(() => {
        this.nextImage();
      }, 4000); // 4 seconds
    },

    stopAutoCycle() {
      clearInterval(this.intervalId);
    },

    restartAutoCycle() {
      this.stopAutoCycle();
      this.startAutoCycle();
    },

    handleTouchStart(e) {
      this.touchStartX = e.touches[0].clientX;
      this.stopAutoCycle(); // pause while swiping
    },

    handleTouchEnd(e) {
      const touchEndX = e.changedTouches[0].clientX;
      const diff = this.touchStartX - touchEndX;

      if (Math.abs(diff) > 50) {
        if (diff > 0) this.nextImage();
        else this.prevImage();
      }

      this.startAutoCycle(); // resume after swipe
    }
  },

  mounted() {
    this.startAutoCycle();
  },

  beforeUnmount() {
    this.stopAutoCycle();
  },


  template: `
    <section class="aboutPage">

      <!-- Top intro -->
      <div class="aboutIntro">
        <div class="aboutText">
          <h2>About Me</h2>
          <p>
            I’m pursuing Master's degree at Northern Michigan University in CS. 
            I have a strong interest in building clean, readable, and reliable code. 
            My major fields of interest are in Algorithms, Full-Stack development, and Complexity Theory. 
          </p>
          <p>
            I care about writing understandable code, solving problems, 
            and constantly improving my skills to be the best engineer that I can be.
          </p>
        </div>

        <div class="aboutImage">
          <!-- Left arrow -->
          <button class="arrow left" @click="prevImage">‹</button>

          <!-- Main image -->
          <transition name="fade" mode="out-in">
            <img 
              :key="selectedImage"
              :src="selectedImage"
              class="mainImage"
              @touchstart="handleTouchStart"
              @touchend="handleTouchEnd"
              @mouseenter="stopAutoCycle"
              @mouseleave="startAutoCycle"
            />
          </transition>

          <!-- Right arrow -->
          <button class="arrow right" @click="nextImage">›</button>

          <!-- Thumbnails -->
          <div class="thumbnailRow">
            <img 
              v-for="(img, index) in images" 
              :key="img"
              :src="img"
              class="thumb"
              :class="{ activeThumb: selectedIndex === index }"
              @click="setImage(index)"
            />
          </div>
        </div>
      </div>

      <!-- Middle section -->
      <div class="aboutMid">
        <div class="aboutCard">
          <h3>What I Work With</h3>
          <ul>
            <li>JavaScript / TypeScript / Python / Java / C++ / C# / C </li>
            <li>Vue, HTML, CSS, Node.js, Angular</li>
            <li>Data Structures & Algorithms</li>
            <li>Frontend & Backend Fundamentals</li>
          </ul>
        </div>

        <div class="aboutCard">
          <h3>What I Enjoy</h3>
          <p>
            I enjoy projects that involve problem-solving, system design,
            and algorithmic integration. I’m especially interested in work
            that has real-world impact.
          </p>
        </div>
      </div>

      <!-- Bottom image + text -->
      <div class="aboutBottom">
        <div class="aboutImageWide">
          <img src="./assets/MQTSkyline.jpg" alt="Skyline of Marquette, Michigan from the top of Sugarloaf Mountain." />
        </div>

        <div class="aboutTextWide">
          <h3>Beyond the Code</h3>
          <p>
            Outside of programming, I enjoy learning new skills, reading, and practicing the trumpet. 
            I am always looking for chances to grow — through collaboration, courses, or projects.
          </p>
        </div>
      </div>

    </section>
  `
});

app.mount('#app');
