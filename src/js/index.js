import { gsap } from "gsap";
import SimpleParallax from "simple-parallax-js/vanilla";

document.addEventListener("DOMContentLoaded", function (event) {
    // Countdown Timer Script
    const weddingDate = new Date("December 14, 2024 15:00:00").getTime();
    const countdownInterval = setInterval(() => {
        const now = new Date().getTime();
        const distance = weddingDate - now;

        const days = Math.floor(distance / (1000 * 60 * 60 * 24));
        const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));

        document.getElementById("days").textContent = days;
        document.getElementById("hours").textContent = hours;
        document.getElementById("minutes").textContent = minutes;

        if (distance < 0) {
            clearInterval(countdownInterval);
            document.getElementById("countdown").innerHTML = "We're Married!";
        }
    }, 1000);

    function closeMenu() {
        document.getElementById("header").classList.remove("open-menu");
        document.getElementById("menuOpen").style.display = 'block';
        document.getElementById("menuClose").style.display = 'none';
        let tl = gsap.timeline({onComplete: () => {
            if (window.scrollY > 100 && window.scrollY < window.innerHeight) {
                let headerTimeline = gsap.timeline({onComplete: () => {
                    document.getElementById("header").classList.remove("fixed-header");
                }});
                headerTimeline.to("header", { top: -100, backgroundColor: "transparent", duration: 0.5 });
                headerTimeline.set("header", { top: 0, backgroundColor: "transparent", position: "absolute" });
            }
        }});
        tl.to("#mainMenuDropdown", { left: 400 });
        tl.set("#mainMenuDropdown", { display: "none", left: 0 });

        if (window.scrollY < 100) {
            let headerTimeline = gsap.timeline();
            headerTimeline.to("header", {backgroundColor: "transparent", duration: 0.5 });
            headerTimeline.set("header", { top: 0, backgroundColor: "transparent", position: "absolute" });
            document.getElementById("header").classList.remove("fixed-header");
        }
    }

    function openMenu() {
        document.getElementById("header").classList.add("open-menu");
        document.getElementById("menuClose").style.display = 'block';
        document.getElementById("menuOpen").style.display = 'none';
        gsap.set("#mainMenuDropdown", { display: "block" });
        gsap.from("#mainMenuDropdown", { left: 400, display: "block" });

        if (!document.getElementById("header").classList.contains("fixed-header")) {
            document.getElementById("header").classList.add("fixed-header");
            gsap.to("header", { backgroundColor: "#e1c59c" });
            gsap.set("header", { position: "fixed" });
        }
    }

    // Menu
    document.getElementById("menuClose").addEventListener("click", closeMenu)

    document.getElementById("menuOpen").addEventListener("click", openMenu)

    document.addEventListener("scroll", () => {
        if (window.scrollY >= window.innerHeight
            && !document.getElementById("header").classList.contains("fixed-header")
            && !document.getElementById("header").classList.contains("open-menu")) {
            document.getElementById("header").classList.add("fixed-header");
            let tl = gsap.timeline();
            tl.set("header", { position: "fixed" });
            tl.fromTo("header", { top: -100, backgroundColor: "transparent" }, { top: 0, backgroundColor: "#e1c59c" });
        }

        if (window.scrollY < window.innerHeight 
            && document.getElementById("header").classList.contains("fixed-header") 
            && !document.getElementById("header").classList.contains("open-menu")) {
            let tl = gsap.timeline({
                onComplete: () => {
                    document.getElementById("header").classList.remove("fixed-header");
                }
            });
            tl.to("header", { top: -100, backgroundColor: "transparent", duration: 0.5 });
            tl.set("header", { position: "absolute", top: 0 });
        }
    });

    // Parallax
    const breakImage = document.getElementsByClassName('break-image');
    new SimpleParallax(breakImage, {
        delay: 1,
        scale: 1.1,
    });

    // Image Animations
    function animateImage(listener, imageClass, imageCoverClass) {
        let image = document.getElementsByClassName(imageClass);
        let imageClassSelector = "." + imageClass;
        let imageCoverClassClassSelector = "." + imageCoverClass;
        if (image[0].getBoundingClientRect().top - window.innerHeight / 2 <= 0) {
            let tl = gsap.timeline();
            tl.set(imageCoverClassClassSelector, {opacity: 1});
            tl.fromTo(imageCoverClassClassSelector, { x: -500 }, { x: 0 });
            tl.set(imageClassSelector, {opacity: 1});
            tl.to(imageCoverClassClassSelector, { x: 700, duration: 1 });
            tl.fromTo(imageClassSelector + " img", { scale: 1.25 }, {scale: 1, duration: 1.5}, "-=1.25");
            tl.set(imageCoverClassClassSelector, {display: "none"});
            document.removeEventListener("scroll", listener);
        }
    }

    function noteImagelistener() {
        animateImage(noteImagelistener, 'note-image', 'note-image-cover');
    }
    function detailsImagelistener() {
        animateImage(detailsImagelistener, 'details-image', 'details-image-cover');
    }
    
    document.addEventListener("scroll", noteImagelistener);
    document.addEventListener("scroll", detailsImagelistener);
});
