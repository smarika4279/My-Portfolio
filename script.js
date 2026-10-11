class ImageSlider {
    constructor() {
        this.track = document.querySelector(".slider-track");
        this.slider = document.querySelector(".slider");
        this.dotsBox = document.querySelector(".slider-dots");
        this.slides = [...this.track.children];
        this.index = 0;

        // Create dots
        this.slides.forEach((slide, i) => {
            const dot = document.createElement("button");
            dot.className = "dots";
            dot.setAttribute("aria-label", `Slide ${i + 1}`);

            dot.onclick = () => {
                this.index = i;
                this.update();
            };

            this.dotsBox.appendChild(dot);
        });

        this.dots = [...this.dotsBox.children];
        this.update();

        // Arrow buttons
        document.querySelector(".next").onclick = () => this.move(1);
        document.querySelector(".prev").onclick = () => this.move(-1);

        // Automatic sliding
        this.start();

        // Pause on hover or touch
        this.slider.onmouseenter = () => this.stop();
        this.slider.onmouseleave = () => this.start();
        this.slider.ontouchstart = () => this.stop();
        this.slider.ontouchend = () => this.start();
    }

    update() {
        this.track.style.transform = `translateX(-${this.index * 100}%)`;

        this.dots.forEach((dot, i) => {
            dot.classList.toggle("active", i === this.index);
        });
    }

    move(step) {
        this.index = (this.index + step + this.slides.length)
                     % this.slides.length;
        this.update();
    }

    start() {
        this.stop();
        this.timer = setInterval(() => this.move(1), 3000);
    }

    stop() {
        clearInterval(this.timer);
    }
}

document.addEventListener("DOMContentLoaded", () => {
    new ImageSlider();
});