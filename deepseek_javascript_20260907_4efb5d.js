/* WOLFCAT ENTERPRISES - SCRIPT.JS */

// --------------------------
// MOBILE NAVIGATION TOGGLE
// --------------------------
document.addEventListener('DOMContentLoaded', function() {
    const mobileMenuBtn = document.getElementById('mobileMenuBtn');
    const navLinks = document.querySelector('.nav-links');

    if (mobileMenuBtn) {
        mobileMenuBtn.addEventListener('click', function() {
            navLinks.classList.toggle('active');
        });
    }

    // Close mobile menu when clicking a link
    const navLinkItems = document.querySelectorAll('.nav-links a');
    navLinkItems.forEach(link => {
        link.addEventListener('click', () => {
            navLinks.classList.remove('active');
        });
    });
});

// --------------------------
// SCROLL FADE-IN ANIMATIONS
// --------------------------
document.addEventListener('DOMContentLoaded', function() {
    // Add fade-in class to all sections and cards
    const sections = document.querySelectorAll('.section');
    const cards = document.querySelectorAll('.problem-card, .solution-card, .cdfi-card, .ask-card, .pipeline-step, .lending-card, .wealth-card');
    const branchBlocks = document.querySelectorAll('.branch-block');

    const fadeElements = [...sections, ...cards, ...branchBlocks];

    fadeElements.forEach(el => {
        el.classList.add('fade-in');
    });

    // Intersection Observer
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, observerOptions);

    fadeElements.forEach(el => {
        observer.observe(el);
    });
});

// --------------------------
// CONTACT FORM SUBMISSION
// --------------------------
document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('investorForm');

    if (form) {
        form.addEventListener('submit', function(e) {
            e.preventDefault();

            // Get form data
            const formData = new FormData(form);
            const name = formData.get('name');
            const email = formData.get('email');
            const phone = formData.get('phone');
            const investorType = formData.get('investorType');
            const heard = formData.get('heard');
            const message = formData.get('message');

            // Build email body
            const body = `
Name: ${name}
Email: ${email}
Phone: ${phone || 'N/A'}
Investor Type: ${investorType}
How Did You Hear About Us: ${heard || 'N/A'}

Message:
${message || 'N/A'}
            `;

            // For Formspree (Recommended) - you'll need to create a free account
            // at formspree.io and replace YOUR_FORM_ID below with your actual ID
            const formspreeEndpoint = 'https://formspree.io/f/YOUR_FORM_ID';

            // Show loading state
            const submitBtn = form.querySelector('button[type="submit"]');
            const originalBtnText = submitBtn.textContent;
            submitBtn.textContent = 'Sending...';
            submitBtn.disabled = true;

            // Submit via fetch
            fetch(formspreeEndpoint, {
                method: 'POST',
                body: JSON.stringify({
                    name: name,
                    email: email,
                    phone: phone,
                    investorType: investorType,
                    heard: heard,
                    message: message
                }),
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                }
            })
            .then(response => {
                if (response.ok) {
                    // Show success modal
                    const modal = document.getElementById('successModal');
                    modal.classList.add('active');
                    form.reset();
                } else {
                    throw new Error('Form submission failed');
                }
            })
            .catch(error => {
                console.error('Error:', error);
                alert('There was an error submitting the form. Please try again or email us directly at admin@wolfcatathletics.com.');
            })
            .finally(() => {
                // Reset button
                submitBtn.textContent = originalBtnText;
                submitBtn.disabled = false;
            });
        });
    }
});

// --------------------------
// MODAL CLOSE
// --------------------------
function closeModal() {
    const modal = document.getElementById('successModal');
    modal.classList.remove('active');
}

// Close modal on outside click
document.addEventListener('DOMContentLoaded', function() {
    const modal = document.getElementById('successModal');
    if (modal) {
        modal.addEventListener('click', function(e) {
            if (e.target === modal) {
                closeModal();
            }
        });
    }
});

// --------------------------
// GATED DOWNLOAD LINK
// --------------------------
document.addEventListener('DOMContentLoaded', function() {
    const downloadBtn = document.getElementById('housingMemoBtn');

    if (downloadBtn) {
        downloadBtn.addEventListener('click', function(e) {
            e.preventDefault();
            // Redirect to contact form
            document.getElementById('contact').scrollIntoView({ behavior: 'smooth' });
            
            // Optional: Highlight the contact form
            const form = document.getElementById('investorForm');
            if (form) {
                form.style.boxShadow = '0 0 0 3px #c9a227';
                setTimeout(() => {
                    form.style.boxShadow = '';
                }, 2000);
            }
        });
    }
});