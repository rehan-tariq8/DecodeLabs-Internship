// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    
    // ==========================================
    // 1. Navbar Scroll Effect
    // ==========================================
    function handleNavbarScroll() {
        const navbar = document.querySelector(".navbar");
        
        if (!navbar) return;

        window.addEventListener("scroll", function() {
            if (window.scrollY > 50) {
                navbar.style.backgroundColor = "#ffffff";
                navbar.style.boxShadow = "0 2px 10px rgba(0,0,0,0.1)";
                navbar.style.transition = "0.3s ease";
            } else {
                navbar.style.backgroundColor = "antiquewhite";
                navbar.style.boxShadow = "none";
            }
        });
    }

    // ==========================================
    // 2. Smooth Scroll Navigation
    // ==========================================
    function initSmoothScroll() {
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener("click", function(e) {
                const targetId = this.getAttribute("href");
                
                if (targetId === "#") return;
                
                e.preventDefault();
                
                const targetElement = document.querySelector(targetId);
                
                if (targetElement) {
                    targetElement.scrollIntoView({
                        behavior: "smooth",
                        block: "start"
                    });
                }
            });
        });
    }

    // ==========================================
    // 3. Form Validation
    // ==========================================
    function initFormValidation() {
        const form = document.querySelector("form");
        
        if (!form) return;

        form.addEventListener("submit", function(e) {
            e.preventDefault();

            const fname = document.getElementById("fname").value.trim();
            const lname = document.getElementById("lname").value.trim();
            const email = document.getElementById("email").value.trim();
            const phone = document.getElementById("phnumber").value.trim();
            const address = document.getElementById("address").value.trim();
            const city = document.getElementById("city").value.trim();
            const rooms = document.getElementById("rooms").value.trim();

            if (!fname || !lname || !email || !phone || !address || !city || !rooms) {
                alert("Please fill all fields!");
                highlightEmptyFields(fname, lname, email, phone, address, city, rooms);
                return;
            }

            if (!email.includes("@") || !email.includes(".")) {
                alert("Please enter a valid email address!");
                document.getElementById("email").style.borderColor = "red";
                return;
            }

            if (phone.length < 10 || isNaN(phone)) {
                alert("Please enter a valid phone number (at least 10 digits)!");
                document.getElementById("phnumber").style.borderColor = "red";
                return;
            }

            alert("Your quote request has been submitted successfully! We will contact you soon.");
            
            form.reset();
            resetFieldBorders();
        });

        const inputs = form.querySelectorAll("input");
        inputs.forEach(input => {
            input.addEventListener("focus", function() {
                this.style.borderColor = "black";
            });
        });
    }

    function highlightEmptyFields(fname, lname, email, phone, address, city, rooms) {
        if (!fname) document.getElementById("fname").style.borderColor = "red";
        if (!lname) document.getElementById("lname").style.borderColor = "red";
        if (!email) document.getElementById("email").style.borderColor = "red";
        if (!phone) document.getElementById("phnumber").style.borderColor = "red";
        if (!address) document.getElementById("address").style.borderColor = "red";
        if (!city) document.getElementById("city").style.borderColor = "red";
        if (!rooms) document.getElementById("rooms").style.borderColor = "red";
    }

    function resetFieldBorders() {
        const fields = ["fname", "lname", "email", "phnumber", "address", "city", "rooms"];
        fields.forEach(fieldId => {
            const field = document.getElementById(fieldId);
            if (field) field.style.borderColor = "black";
        });
    }

    // ==========================================
    // 4. Scroll Reveal Animation (FAST Slide Up Effect)
    // ==========================================
    function initScrollReveal() {
        const revealElements = document.querySelectorAll(`
            .card,
            .service img,
            .service .col-xl-4,
            .step-item,
            .lists,
            .testimonial-card,
            .before .col-xl-3,
            .pictures .col-xl-3,
            #plans .card,
            section .container h1,
            footer section,
            img[alt="Cleaning Book"],
            img[alt="Towel Shelves"],
            img[alt="Before"],
            img[alt="After"]
        `);

        function revealOnScroll() {
            const windowHeight = window.innerHeight;
            const revealPoint = 50; // Trigger earlier for faster response

            revealElements.forEach((element) => {
                const elementTop = element.getBoundingClientRect().top;
                const elementBottom = element.getBoundingClientRect().bottom;

                // Reveal element when it enters viewport
                if (elementTop < windowHeight - revealPoint && elementBottom > 0) {
                    element.classList.add("revealed");
                }
            });
        }

        // Immediate reveal on page load
        revealOnScroll();
        
        // Use requestAnimationFrame for smooth performance
        let ticking = false;
        window.addEventListener("scroll", function() {
            if (!ticking) {
                window.requestAnimationFrame(function() {
                    revealOnScroll();
                    ticking = false;
                });
                ticking = true;
            }
        });
        
        window.addEventListener("resize", revealOnScroll);
    }

    // ==========================================
    // 5. Testimonials Slider with Hover Pause
    // ==========================================
    function initTestimonialsSlider() {
        const testimonialCards = document.querySelectorAll(".testimonial-card");
        
        if (testimonialCards.length === 0) return;
        
        let currentIndex = 0;
        const totalCards = testimonialCards.length;
        const cardsToShow = 4;
        let sliderInterval;
        let isPaused = false;

        function showTestimonials() {
            if (isPaused) return;

            testimonialCards.forEach(card => {
                card.style.opacity = "0";
                card.style.transform = "translateY(20px)"; // Reduced distance for speed
                card.style.transition = "all 0.3s ease"; // Faster transition
            });

            setTimeout(() => {
                for (let i = 0; i < cardsToShow; i++) {
                    const cardIndex = (currentIndex + i) % totalCards;
                    testimonialCards[cardIndex].style.opacity = "1";
                    testimonialCards[cardIndex].style.transform = "translateY(0)";
                }
            }, 50); // Reduced delay

            currentIndex = (currentIndex + 1) % totalCards;
        }

        function startSlider() {
            showTestimonials();
            sliderInterval = setInterval(showTestimonials, 3000);
        }

        function pauseSlider() {
            isPaused = true;
        }

        function resumeSlider() {
            isPaused = false;
        }

        const testimonialContainer = document.querySelector(".testimonials-container");
        if (testimonialContainer) {
            testimonialContainer.addEventListener("mouseenter", pauseSlider);
            testimonialContainer.addEventListener("mouseleave", resumeSlider);
        }

        startSlider();
    }

    // ==========================================
    // 6. Image Hover Tilt Effect
    // ==========================================
    function initImageTiltEffect() {
        const images = document.querySelectorAll(`
            .service img,
            .pictures img,
            img[alt="Cleaning Book"]
        `);

        images.forEach(image => {
            image.addEventListener("mousemove", function(e) {
                const rect = this.getBoundingClientRect();
                const x = e.clientX - rect.left;
                const y = e.clientY - rect.top;
                
                const centerX = rect.width / 2;
                const centerY = rect.height / 2;
                
                const rotateX = (y - centerY) / 10;
                const rotateY = (centerX - x) / 10;
                
                this.style.transform = `scale(1.1) perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
                this.style.transition = "transform 0.1s ease"; // Fast tilt response
            });

            image.addEventListener("mouseleave", function() {
                this.style.transform = "scale(1) perspective(1000px) rotateX(0) rotateY(0)";
                this.style.transition = "transform 0.3s ease";
            });
        });
    }

    // ==========================================
    // 7. Back to Top Button
    // ==========================================
    function initBackToTop() {
        const backToTopBtn = document.createElement("button");
        backToTopBtn.innerHTML = "↑";
        backToTopBtn.id = "backToTop";
        backToTopBtn.style.cssText = `
            position: fixed;
            bottom: 30px;
            right: 30px;
            z-index: 1000;
            width: 50px;
            height: 50px;
            border-radius: 50%;
            background-color: #4A5C5D;
            color: white;
            border: none;
            font-size: 24px;
            cursor: pointer;
            display: none;
            transition: all 0.2s ease;
            box-shadow: 0 2px 10px rgba(0,0,0,0.2);
            opacity: 0;
            transform: translateY(20px);
        `;
        
        document.body.appendChild(backToTopBtn);

        window.addEventListener("scroll", function() {
            if (window.scrollY > 300) {
                backToTopBtn.style.display = "block";
                requestAnimationFrame(() => {
                    backToTopBtn.style.opacity = "1";
                    backToTopBtn.style.transform = "translateY(0)";
                });
            } else {
                backToTopBtn.style.opacity = "0";
                backToTopBtn.style.transform = "translateY(20px)";
                setTimeout(() => {
                    if (window.scrollY <= 300) {
                        backToTopBtn.style.display = "none";
                    }
                }, 200);
            }
        });

        backToTopBtn.addEventListener("click", function() {
            window.scrollTo({
                top: 0,
                behavior: "smooth"
            });
        });

        backToTopBtn.addEventListener("mouseenter", function() {
            this.style.transform = "scale(1.15) translateY(0)";
            this.style.backgroundColor = "#333";
        });

        backToTopBtn.addEventListener("mouseleave", function() {
            this.style.transform = "scale(1) translateY(0)";
            this.style.backgroundColor = "#4A5C5D";
        });
    }

    // ==========================================
    // 8. Parallax Effect on Scroll
    // ==========================================
    function initParallaxEffect() {
        const bgImg = document.querySelector(".bg-img");
        const stepsSection = document.querySelector(".steps-section");

        let ticking = false;
        window.addEventListener("scroll", function() {
            if (!ticking) {
                window.requestAnimationFrame(function() {
                    const scrolled = window.pageYOffset;

                    if (bgImg) {
                        bgImg.style.backgroundPositionY = -(scrolled * 0.3) + "px";
                    }

                    if (stepsSection) {
                        const stepsPosition = stepsSection.getBoundingClientRect().top;
                        if (stepsPosition < window.innerHeight && stepsPosition > -stepsSection.offsetHeight) {
                            stepsSection.style.backgroundPositionY = -(scrolled * 0.1) + "px";
                        }
                    }
                    ticking = false;
                });
                ticking = true;
            }
        });
    }

    // ==========================================
    // 9. Counter Animation
    // ==========================================
    function initCounterAnimation() {
        const priceElement = document.querySelector("#plans .card-text");
        
        if (!priceElement) return;

        let animated = false;
        const targetPrice = 280;

        function animateCounter() {
            const elementPosition = priceElement.closest('#plans').getBoundingClientRect().top;
            const windowHeight = window.innerHeight;

            if (elementPosition < windowHeight - 50 && !animated) { // Trigger earlier
                animated = true;
                let current = 0;
                const increment = targetPrice / 30; // Fewer steps = faster
                const interval = setInterval(() => {
                    current += increment;
                    if (current >= targetPrice) {
                        current = targetPrice;
                        clearInterval(interval);
                    }
                    priceElement.innerHTML = `<sup>$</sup>${Math.floor(current)}`;
                }, 20); // Faster interval
            }
        }

        window.addEventListener("scroll", animateCounter);
        // Check immediately on load
        animateCounter();
    }

    // ==========================================
    // Initialize All Functions
    // ==========================================
    handleNavbarScroll();
    initSmoothScroll();
    initFormValidation();
    initScrollReveal();
    initTestimonialsSlider();
    initImageTiltEffect();
    initBackToTop();
    initParallaxEffect();
    initCounterAnimation();
    
    console.log("✅ The Cleanic - Fast animations initialized!");
});