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

    function getMenuWidth() {
        return window.innerWidth < 994 ? window.innerWidth : 460;
    }

    function closeMenu() {
        document.getElementById("header").classList.remove("open-menu");
        let tl = gsap.timeline({onComplete: () => {
            if (window.scrollY > 100 && window.scrollY < window.innerHeight) {
                let headerTimeline = gsap.timeline({onComplete: () => {
                    document.getElementById("header").classList.remove("fixed-header");
                }});
                headerTimeline.to("header", { top: -100, backgroundColor: "transparent", duration: 0.5 });
                headerTimeline.set("header", { top: 0, backgroundColor: "transparent", position: "absolute" });
            }
        }});
        tl.to("#mainMenuDropdown", { right: -getMenuWidth() });
        tl.set("#mainMenuDropdown", { display: "none", right: 0 });
        tl.set(".menu-item", { opacity: 0});

        if (window.scrollY < 100) {
            let headerTimeline = gsap.timeline();
            headerTimeline.to("header", {backgroundColor: "transparent", duration: 0.5 });
            headerTimeline.set("header", { top: 0, backgroundColor: "transparent", position: "absolute" });
            document.getElementById("header").classList.remove("fixed-header");
        }
    }

    function openMenu() {
        gsap.killTweensOf("header");
        gsap.killTweensOf("#mainMenuDropdown");
        gsap.killTweensOf(".menu-item");
        document.getElementById("header").classList.add("open-menu");
        gsap.set("#mainMenuDropdown", { display: "block", width: getMenuWidth() + "px" });
        gsap.fromTo("#mainMenuDropdown", { right: -getMenuWidth() }, { right: 0 });
        let tl = gsap.timeline();
        tl.fromTo(".menu-item", { height: 0}, { height: 76, stagger: 0.25, delay: 0.5});
        tl.fromTo(".menu-item", { opacity: 0}, { opacity: 1, stagger: 0.25, delay: 0.5 }, "0.25");

        if (!document.getElementById("header").classList.contains("fixed-header")) {
            document.getElementById("header").classList.add("fixed-header");
            gsap.to("header", { backgroundColor: "#fffaf4" });
            gsap.set("header", { position: "fixed" });
        }
    }

    function toggleMenu() {
        if (document.getElementById("header").classList.contains("open-menu")) {
            closeMenu();
        }
        else {
            openMenu();
        }
    }

    // Menu
    document.getElementById("menuButton").addEventListener("click", toggleMenu)

    document.addEventListener("scroll", () => {
        if (window.scrollY >= window.innerHeight
            && !document.getElementById("header").classList.contains("fixed-header")
            && !document.getElementById("header").classList.contains("open-menu")) {
            document.getElementById("header").classList.add("fixed-header");
            let tl = gsap.timeline();
            tl.set("header", { position: "fixed" });
            tl.fromTo("header", { top: -100, background: "transparent" }, { top: 0, backgroundColor: "#fffaf4" });
        }

        if (window.scrollY < window.innerHeight 
            && document.getElementById("header").classList.contains("fixed-header") 
            && !document.getElementById("header").classList.contains("open-menu")) {
            let tl = gsap.timeline({
                onComplete: () => {
                    document.getElementById("header").classList.remove("fixed-header");
                }
            });
            tl.to("header", { top: -100, background: "transparent", duration: 0.25 });
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
    function animateImage(listener, imageClass, imageCoverClass, toLeft) {
        let image = document.getElementsByClassName(imageClass);
        let imageClassSelector = "." + imageClass;
        let imageCoverClassClassSelector = "." + imageCoverClass;
        if (image[0].getBoundingClientRect().top - window.innerHeight / 2 <= 0) {
            let tl = gsap.timeline();
            tl.set(imageCoverClassClassSelector, {opacity: 1});
            tl.fromTo(imageCoverClassClassSelector, { xPercent: toLeft ? 100 : -100 }, { xPercent: 0 });
            tl.set(imageClassSelector, {opacity: 1});
            tl.to(imageCoverClassClassSelector, { xPercent: toLeft ? -100 : 100, duration: 1 });
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
    function scheduleImagelistener() {
        animateImage(scheduleImagelistener, 'schedule-image', 'schedule-image-cover', true);
    }
    function accommodationsImagelistener() {
        animateImage(accommodationsImagelistener, 'accommodations-image', 'accommodations-image-cover');
    }
    function photosImagelistener() {
        animateImage(photosImagelistener, 'photos-image', 'photos-image-cover', true);
    }
    
    document.addEventListener("scroll", noteImagelistener);
    document.addEventListener("scroll", detailsImagelistener);
    document.addEventListener("scroll", scheduleImagelistener);
    document.addEventListener("scroll", accommodationsImagelistener);
    document.addEventListener("scroll", photosImagelistener);

    // RSVP
    function animateRSVPIcons() {
        if (document.getElementsByClassName("rsvp-offset")[0].getBoundingClientRect().top - window.innerHeight / 2 <= 50) {
            let tl = gsap.timeline();
            tl.fromTo(".rsvp-buttons", { height: 0 }, { height: 110, delay: 0.5 });
            tl.to(".rsvp-buttons", { opacity: 1 });
            document.removeEventListener("scroll", animateRSVPIcons);
        }
    }

    document.addEventListener("scroll", animateRSVPIcons);
});
