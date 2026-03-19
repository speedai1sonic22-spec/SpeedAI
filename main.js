document.addEventListener("DOMContentLoaded", () => {
    // Intersection Observer for scroll animations
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    const fadeElements = document.querySelectorAll('.fade-in-up');
    fadeElements.forEach(el => observer.observe(el));

    // Smooth scrolling for anchor links
    document.querySelectorAll('.nav-link').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const href = this.getAttribute('href');
            
            // Only handle internal section links starting with #
            if (href && href.startsWith('#')) {
                e.preventDefault();
                const targetId = href.substring(1);
                const targetElement = document.getElementById(targetId);

                if (targetElement) {
                    window.scrollTo({
                        top: targetElement.offsetTop - 80, // Offset for fixed navbar
                        behavior: 'smooth'
                    });
                }
            }
            // External links or page links (like downloads.html) will work normally
        });
    });
    // --- Dynamic Job Loading from JSON ---
    const openingsGrid = document.querySelector('.openings-grid');
    const roleSelect = document.getElementById('role');

    async function loadJobs() {
        try {
            const response = await fetch('jobs.json');
            const jobs = await response.json();

            // Clear existing hardcoded jobs
            if (openingsGrid) openingsGrid.innerHTML = '';
            if (roleSelect) {
                roleSelect.innerHTML = '<option value="" disabled selected>Select a position</option>';
            }

            jobs.forEach(job => {
                // Add to Grid
                if (openingsGrid) {
                    const card = document.createElement('div');
                    card.className = 'opening-card';
                    card.onclick = () => selectRole(job.role);
                    card.innerHTML = `
                        <div class="opening-badge">${job.category}</div>
                        <div class="opening-content">
                            <h3>${job.role}</h3>
                            <p>${job.description}</p>
                        </div>
                        <div class="opening-footer">
                            <span class="btn-text">View Role & Apply →</span>
                        </div>
                    `;
                    openingsGrid.appendChild(card);
                }

                // Add to Select Dropdown
                if (roleSelect) {
                    const option = document.createElement('option');
                    option.value = job.role;
                    option.textContent = job.role;
                    roleSelect.appendChild(option);
                }
            });

            // Add "Other" option
            if (roleSelect) {
                const otherOpt = document.createElement('option');
                otherOpt.value = "Other";
                otherOpt.textContent = "Other Position";
                roleSelect.appendChild(otherOpt);
            }
        } catch (error) {
            console.error('Error loading jobs:', error);
        }
    }

    loadJobs();

    // --- Careers Form Logic ---
    const careersForm = document.getElementById('careers-form');
    const formSuccess = document.getElementById('form-success');

    if (careersForm) {
        careersForm.addEventListener('submit', (e) => {
            e.preventDefault();

            // 1. IMMEDIATE UI FEEDBACK
            const submitBtn = careersForm.querySelector('button[type="submit"]');
            const originalBtnText = submitBtn.textContent;
            submitBtn.textContent = 'Sending...';
            submitBtn.disabled = true;

            const application = {
                id: Date.now(),
                fullName: document.getElementById('full-name').value,
                role: roleSelect.value,
                workType: document.getElementById('work-type').value,
                email: document.getElementById('email').value,
                portfolio: document.getElementById('portfolio').value,
                message: document.getElementById('message').value,
                date: new Date().toLocaleString()
            };

            // 2. Persist success state in session immediately
            sessionStorage.setItem('speedai_submitted', 'true');

            // 3. SHOW MESSAGE INSTANTLY (to fix "lag")
            careersForm.classList.add('hidden');
            formSuccess.classList.remove('hidden');
            formSuccess.scrollIntoView({ behavior: 'auto', block: 'center' });

            // 4. SAVE TO LOCALSTORAGE
            const applications = JSON.parse(localStorage.getItem('speedai_apps') || '[]');
            applications.push(application);
            localStorage.setItem('speedai_apps', JSON.stringify(applications));

            // 5. HYBRID SAVING (Set mode to "cloud" to test email/formspree right now)
            const mode = "cloud";
            const FORMSPREE_ID = "mqedrkeb";
            const isLocalHost = window.location.hostname === "localhost" || window.location.hostname === "127.0.0.1";

            // If mode is "cloud" OR if we are NOT on localhost, use Formspree
            const endpoint = (mode === "local" && isLocalHost) ? 'http://localhost:8000/apply' : `https://formspree.io/f/${FORMSPREE_ID}`;

            fetch(endpoint, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                },
                body: JSON.stringify(application)
            })
                .then(response => {
                    if (response.ok) {
                        console.log('Successfully saved to:', endpoint);
                    }
                })
                .catch(err => {
                    console.error('Save failed:', err);
                });
        });
    }

    // This ensures the success state persists across auto-refreshes
    function checkSubmissionState() {
        if (careersForm && formSuccess) {
            if (sessionStorage.getItem('speedai_submitted') === 'true') {
                careersForm.classList.add('hidden');
                formSuccess.classList.remove('hidden');
            } else {
                careersForm.classList.remove('hidden');
                formSuccess.classList.add('hidden');
                careersForm.reset();
            }
        }
    }

    // Run check on load
    checkSubmissionState();

    // Global selector function
    window.selectRole = (role) => {
        if (roleSelect) {
            roleSelect.value = role;
            const formContainer = document.getElementById('apply-form-container');
            if (formContainer) {
                window.scrollTo({
                    top: formContainer.offsetTop - 120,
                    behavior: 'smooth'
                });
            }
        }
    };
});


