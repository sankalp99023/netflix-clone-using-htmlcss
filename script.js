// Wait for the entire page to load
document.addEventListener("DOMContentLoaded", () => {

    /* -----------------------------
       ✅ FAQ Expand/Collapse Feature
    ------------------------------ */
    const faqBoxes = document.querySelectorAll(".faqbox");

    faqBoxes.forEach((box) => {
        box.addEventListener("click", () => {
            const alreadyActive = box.classList.contains("active");

            // Close all FAQs first
            faqBoxes.forEach((b) => {
                b.classList.remove("active");
                let openAnswer = b.querySelector(".answer");
                if (openAnswer) {
                    openAnswer.style.maxHeight = null;
                    setTimeout(() => openAnswer.remove(), 300);
                }
            });

            // Open this one if it wasn’t already open
            if (!alreadyActive) {
                box.classList.add("active");

                const answer = document.createElement("div");
                answer.classList.add("answer");
                answer.innerText = getAnswerText(box.querySelector("span").innerText);

                // Initial style for animation
                answer.style.overflow = "hidden";
                answer.style.transition = "max-height 0.4s ease";
                answer.style.maxHeight = "0";
                answer.style.fontSize = "18px";
                answer.style.lineHeight = "1.5";
                answer.style.color = "white";
                answer.style.marginTop = "10px";

                box.appendChild(answer);

                // Trigger animation
                setTimeout(() => {
                    answer.style.maxHeight = "200px";
                }, 50);
            }
        });
    });

    // Function returning answers (customizable)
    function getAnswerText(question) {
        switch (question.trim()) {
            case "What is Netflix":
                return "Netflix is a streaming service that lets you watch movies, TV shows, and documentaries online. You can enjoy them on smart TVs, mobile devices, laptops, and more.";
            case "How much does Netflix cost?":
                return "Netflix plans in India start at ₹149 per month. You can cancel anytime, no extra fees.";
            case "What can I watch on Netflix?":
                return "Netflix offers thousands of titles across genres: action, comedy, drama, documentaries, anime, and more.";
            case "Where can I watch?":
                return "You can watch on your phone, tablet, laptop, or TV — anytime, anywhere, with the Netflix app or website.";
            default:
                return "Click a question above to see more information about Netflix.";
        }
    }

    /* -----------------------------
       ✅ Responsive Hero Input Adjustments
    ------------------------------ */
    const emailInput = document.querySelector(".main input");
    const getStartedBtn = document.querySelector(".btn-red");
    const heroSection = document.querySelector(".hero");

    function adjustHeroLayout() {
        const screenWidth = window.innerWidth;

        if (screenWidth <= 800) {
            heroSection.style.flexDirection = "column";
            heroSection.style.textAlign = "center";

            // Smaller inputs and buttons for small screens
            emailInput.style.width = "80%";
            emailInput.style.fontSize = "14px";
            emailInput.style.padding = "10px";
            getStartedBtn.style.width = "60%";
            getStartedBtn.style.fontSize = "16px";
            getStartedBtn.style.padding = "10px";
        } else {
            // Reset to default for large screens
            heroSection.style.flexDirection = "column";
            emailInput.style.width = "400px";
            emailInput.style.fontSize = "16px";
            emailInput.style.padding = "10px 20px";
            getStartedBtn.style.width = "180px";
            getStartedBtn.style.fontSize = "18px";
            getStartedBtn.style.padding = "10px 24px";
        }
    }

    // Run once at load and again on resize
    adjustHeroLayout();
    window.addEventListener("resize", adjustHeroLayout);

    /* -----------------------------
       ✉️ Email Confirmation Message
    ------------------------------ */
    getStartedBtn.addEventListener("click", (e) => {
        e.preventDefault(); // Prevent page reload if inside a form

        const emailValue = emailInput.value.trim();

        if (emailValue === "") {
            alert("Please enter your email address before proceeding!");
            return;
        }

        // Simple email format check
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailPattern.test(emailValue)) {
            alert("Please enter a valid email address!");
            return;
        }

        // Show success message (simulating a sent email)
        alert(`✅ A confirmation message has been sent to ${emailValue}. Welcome to Netflix!`);

        // Clear input field
        emailInput.value = "";
    });

});
