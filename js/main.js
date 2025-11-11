// ===== Main JavaScript for BPL Tech Website =====

// ===== Create Loading Overlay =====
function createLoadingOverlay() {
	const overlay = document.createElement('div');
	overlay.className = 'loading-overlay';
	overlay.id = 'loadingOverlay';
	overlay.innerHTML = `
		<div class="loader-content">
			<div class="loader-logo">
				<svg width="150" height="150" viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg">
					<defs>
						<linearGradient id="overlayGradient" x1="0" y1="0" x2="80" y2="80" gradientUnits="userSpaceOnUse">
							<stop stop-color="#f59e0b"/>
							<stop offset="0.5" stop-color="#10b981"/>
							<stop offset="1" stop-color="#06b6d4"/>
						</linearGradient>
					</defs>
					<rect x="5" y="5" width="70" height="70" rx="20" fill="url(#overlayGradient)"/>
					<text x="50%" y="50%" text-anchor="middle" dominant-baseline="central" font-family="'Segoe UI', Arial, sans-serif" font-size="28" font-weight="bold" fill="#fff" letter-spacing="-4">BPL</text>
					<circle cx="40" cy="40" r="32" stroke="#fff" stroke-width="3" fill="none"/>
					<path d="M20 60 Q40 20 60 60" stroke="#fff" stroke-width="2" fill="none"/>
					<circle cx="40" cy="40" r="6" fill="#fff" opacity="0.3"/>
				</svg>
			</div>
			<div class="loader-spinner"></div>
			<div class="loader-text">Processing<span class="loader-dots"></span></div>
		</div>
	`;
	document.body.appendChild(overlay);
	return overlay;
}

// ===== Show/Hide Loading Overlay =====
function showLoading() {
	let overlay = document.getElementById('loadingOverlay');
	if (!overlay) {
		overlay = createLoadingOverlay();
	}
	setTimeout(() => overlay.classList.add('active'), 10);
}

function hideLoading() {
	const overlay = document.getElementById('loadingOverlay');
	if (overlay) {
		overlay.classList.remove('active');
	}
}

// ===== Page Loader =====
window.addEventListener('load', function() {
	const loader = document.getElementById('pageLoader');
	const body = document.body;
	
	// Add particles to loader
	const loaderContent = loader.querySelector('.loader-content');
	const particlesDiv = document.createElement('div');
	particlesDiv.className = 'loader-particles';
	
	// Create 20 particles
	for (let i = 0; i < 20; i++) {
		const particle = document.createElement('div');
		particle.className = 'particle';
		particle.style.left = Math.random() * 100 + '%';
		particle.style.animationDelay = Math.random() * 3 + 's';
		particle.style.animationDuration = (2 + Math.random() * 2) + 's';
		particlesDiv.appendChild(particle);
	}
	loaderContent.appendChild(particlesDiv);
	
	// Minimum display time for the loader (2 seconds for better visibility)
	setTimeout(function() {
		loader.classList.add('hidden');
		body.classList.remove('loading');
		
		// Remove loader from DOM after transition
		setTimeout(function() {
			if (loader && loader.parentNode) {
				loader.parentNode.removeChild(loader);
			}
		}, 600);
	}, 2000);
});

// Show loader initially
document.addEventListener('DOMContentLoaded', function() {
	document.body.classList.add('loading');
	
	// ===== Navbar Scroll Effect =====
	const navbar = document.getElementById('mainNav');
	const scrollTop = document.getElementById('scrollTop');
	
	let lastScrollY = window.scrollY;
	
	window.addEventListener('scroll', function() {
		const currentScrollY = window.scrollY;
		
		if (currentScrollY > 100) {
			navbar.classList.add('scrolled');
			scrollTop.classList.add('visible');
		} else {
			navbar.classList.remove('scrolled');
			scrollTop.classList.remove('visible');
		}
		
		lastScrollY = currentScrollY;
	});
	
	// ===== Smooth Scrolling for Navigation Links with Loader =====
	document.querySelectorAll('a[href^="#"]').forEach(anchor => {
		anchor.addEventListener('click', function(e) {
			const href = this.getAttribute('href');
			
			// Skip if href is just "#" or modal toggle
			if (href === '#' || this.hasAttribute('data-bs-toggle')) {
				return;
			}
			
			e.preventDefault();
			const target = document.querySelector(href);
			
			if (target) {
				// Show mini loading indicator
				showLoading();
				
				setTimeout(() => {
					const offsetTop = target.offsetTop - 80;
					window.scrollTo({
						top: offsetTop,
						behavior: 'smooth'
					});
					
					// Update active nav link
					updateActiveNavLink(href);
					
					// Close mobile menu if open
					const navbarCollapse = document.getElementById('navbarNav');
					if (navbarCollapse.classList.contains('show')) {
						const bsCollapse = new bootstrap.Collapse(navbarCollapse);
						bsCollapse.hide();
					}
					
					hideLoading();
				}, 300);
			}
		});
	});
	
	// ===== Scroll to Top Button =====
	scrollTop.addEventListener('click', function() {
		showLoading();
		setTimeout(() => {
			window.scrollTo({
				top: 0,
				behavior: 'smooth'
			});
			hideLoading();
		}, 200);
	});
	
	// ===== Update Active Navigation Link on Scroll =====
	const sections = document.querySelectorAll('section[id]');
	const navLinks = document.querySelectorAll('.navbar-nav .nav-link');
	
	window.addEventListener('scroll', function() {
		let current = '';
		sections.forEach(section => {
			const sectionTop = section.offsetTop - 100;
			const sectionHeight = section.clientHeight;
			if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
				current = section.getAttribute('id');
			}
		});
		
		if (current) {
			updateActiveNavLink('#' + current);
		}
	});
	
	function updateActiveNavLink(href) {
		navLinks.forEach(link => {
			link.classList.remove('active');
			if (link.getAttribute('href') === href) {
				link.classList.add('active');
			}
		});
	}
	
	// ===== Form Validation and Submission =====
	
	// Sanitize input to prevent XSS
	function sanitizeInput(input) {
		const div = document.createElement('div');
		div.textContent = input;
		return div.innerHTML;
	}
	
	// Validate email format
	function isValidEmail(email) {
		const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
		return emailRegex.test(email);
	}
	
	// Validate phone number (basic validation)
	function isValidPhone(phone) {
		const phoneRegex = /^[\d\s\-\+\(\)]+$/;
		return phoneRegex.test(phone) && phone.replace(/\D/g, '').length >= 10;
	}
	
	// Show alert message
	function showAlert(message, type = 'success') {
		const alertDiv = document.createElement('div');
		alertDiv.className = `alert alert-${type} alert-dismissible fade show position-fixed top-0 start-50 translate-middle-x mt-3`;
		alertDiv.style.zIndex = '9999';
		alertDiv.style.minWidth = '300px';
		alertDiv.innerHTML = `
			${message}
			<button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
		`;
		document.body.appendChild(alertDiv);
		
		// Auto remove after 5 seconds
		setTimeout(() => {
			alertDiv.remove();
		}, 5000);
	}
	
	// ===== Registration Form Handling =====
	const registerForm = document.getElementById('registerForm');
	const submitRegisterBtn = document.getElementById('submitRegister');
	
	if (submitRegisterBtn) {
		submitRegisterBtn.addEventListener('click', function(e) {
			e.preventDefault();
			
			// Get form values
			const name = document.getElementById('regName').value.trim();
			const email = document.getElementById('regEmail').value.trim();
			const phone = document.getElementById('regPhone').value.trim();
			const interest = document.getElementById('regInterest').value;
			const message = document.getElementById('regMessage').value.trim();
			
			// Validation
			if (!name) {
				showAlert('Please enter your full name', 'danger');
				document.getElementById('regName').focus();
				return;
			}
			
			if (name.length < 3) {
				showAlert('Name must be at least 3 characters long', 'danger');
				document.getElementById('regName').focus();
				return;
			}
			
			if (!email) {
				showAlert('Please enter your email address', 'danger');
				document.getElementById('regEmail').focus();
				return;
			}
			
			if (!isValidEmail(email)) {
				showAlert('Please enter a valid email address', 'danger');
				document.getElementById('regEmail').focus();
				return;
			}
			
			if (!phone) {
				showAlert('Please enter your phone number', 'danger');
				document.getElementById('regPhone').focus();
				return;
			}
			
			if (!isValidPhone(phone)) {
				showAlert('Please enter a valid phone number', 'danger');
				document.getElementById('regPhone').focus();
				return;
			}
			
			if (!interest) {
				showAlert('Please select your area of interest', 'danger');
				document.getElementById('regInterest').focus();
				return;
			}
			
			// Show loading state
			const originalHTML = submitRegisterBtn.innerHTML;
			submitRegisterBtn.classList.add('loading');
			submitRegisterBtn.innerHTML = '<span class="mini-loader"></span>Submitting...';
			submitRegisterBtn.disabled = true;
			
			showLoading();
			
			// Sanitize inputs
			const sanitizedData = {
				name: sanitizeInput(name),
				email: sanitizeInput(email),
				phone: sanitizeInput(phone),
				interest: sanitizeInput(interest),
				message: sanitizeInput(message)
			};
			
			// Simulate form submission (replace with actual API call)
			setTimeout(() => {
				console.log('Registration Data:', sanitizedData);
				
				hideLoading();
				
				// Show success message
				showAlert('🎉 Registration submitted successfully! We will contact you soon.', 'success');
				
				// Reset form and button
				registerForm.reset();
				submitRegisterBtn.innerHTML = originalHTML;
				submitRegisterBtn.classList.remove('loading');
				submitRegisterBtn.disabled = false;
				
				// Close modal
				const modal = bootstrap.Modal.getInstance(document.getElementById('registerModal'));
				if (modal) {
					modal.hide();
				}
			}, 2000);
			
			// In production, you would send this data to your backend:
			/*
			fetch('/api/register', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify(sanitizedData)
			})
			.then(response => response.json())
			.then(data => {
				hideLoading();
				showAlert('Registration submitted successfully!', 'success');
				registerForm.reset();
				submitRegisterBtn.innerHTML = originalHTML;
				submitRegisterBtn.classList.remove('loading');
				submitRegisterBtn.disabled = false;
				modal.hide();
			})
			.catch(error => {
				hideLoading();
				showAlert('An error occurred. Please try again.', 'danger');
				submitRegisterBtn.innerHTML = originalHTML;
				submitRegisterBtn.classList.remove('loading');
				submitRegisterBtn.disabled = false;
				console.error('Error:', error);
			});
			*/
		});
	}
	
	// ===== Contact Form Handling =====
	const contactForm = document.getElementById('contactForm');
	
	if (contactForm) {
		contactForm.addEventListener('submit', function(e) {
			e.preventDefault();
			
			// Get form values
			const name = document.getElementById('contactName').value.trim();
			const email = document.getElementById('contactEmail').value.trim();
			const subject = document.getElementById('contactSubject').value.trim();
			const message = document.getElementById('contactMessage').value.trim();
			
			// Validation
			if (!name) {
				showAlert('Please enter your name', 'danger');
				document.getElementById('contactName').focus();
				return;
			}
			
			if (name.length < 3) {
				showAlert('Name must be at least 3 characters long', 'danger');
				document.getElementById('contactName').focus();
				return;
			}
			
			if (!email) {
				showAlert('Please enter your email address', 'danger');
				document.getElementById('contactEmail').focus();
				return;
			}
			
			if (!isValidEmail(email)) {
				showAlert('Please enter a valid email address', 'danger');
				document.getElementById('contactEmail').focus();
				return;
			}
			
			if (!subject) {
				showAlert('Please enter a subject', 'danger');
				document.getElementById('contactSubject').focus();
				return;
			}
			
			if (!message) {
				showAlert('Please enter your message', 'danger');
				document.getElementById('contactMessage').focus();
				return;
			}
			
			if (message.length < 10) {
				showAlert('Message must be at least 10 characters long', 'danger');
				document.getElementById('contactMessage').focus();
				return;
			}
			
			// Show loading
			const submitBtn = contactForm.querySelector('button[type="submit"]');
			const originalHTML = submitBtn.innerHTML;
			submitBtn.classList.add('loading');
			submitBtn.innerHTML = '<span class="mini-loader"></span>Sending...';
			submitBtn.disabled = true;
			
			showLoading();
			
			// Sanitize inputs
			const sanitizedData = {
				name: sanitizeInput(name),
				email: sanitizeInput(email),
				subject: sanitizeInput(subject),
				message: sanitizeInput(message)
			};
			
			// Simulate form submission (replace with actual API call)
			setTimeout(() => {
				console.log('Contact Form Data:', sanitizedData);
				
				hideLoading();
				
				// Show success message
				showAlert('✅ Message sent successfully! We will get back to you soon.', 'success');
				
				// Reset form and button
				contactForm.reset();
				submitBtn.innerHTML = originalHTML;
				submitBtn.classList.remove('loading');
				submitBtn.disabled = false;
			}, 2000);
			
			// In production, you would send this data to your backend:
			/*
			fetch('/api/contact', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify(sanitizedData)
			})
			.then(response => response.json())
			.then(data => {
				hideLoading();
				showAlert('Message sent successfully!', 'success');
				contactForm.reset();
				submitBtn.innerHTML = originalHTML;
				submitBtn.classList.remove('loading');
				submitBtn.disabled = false;
			})
			.catch(error => {
				hideLoading();
				showAlert('An error occurred. Please try again.', 'danger');
				submitBtn.innerHTML = originalHTML;
				submitBtn.classList.remove('loading');
				submitBtn.disabled = false;
				console.error('Error:', error);
			});
			*/
		});
	}
	
	// ===== Animate on Scroll (Simple Implementation) =====
	const observerOptions = {
		threshold: 0.1,
		rootMargin: '0px 0px -50px 0px'
	};
	
	const observer = new IntersectionObserver(function(entries) {
		entries.forEach(entry => {
			if (entry.isIntersecting) {
				entry.target.style.opacity = '1';
				entry.target.style.transform = 'translateY(0)';
			}
		});
	}, observerOptions);
	
	// Observe all cards and sections
	document.querySelectorAll('.service-card, .training-card, .feature-item, .stat-box').forEach(el => {
		el.style.opacity = '0';
		el.style.transform = 'translateY(30px)';
		el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
		observer.observe(el);
	});
	
	// ===== Add Loading State to Buttons =====
	function addLoadingState(button) {
		const originalText = button.innerHTML;
		button.disabled = true;
		button.innerHTML = '<span class="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>Submitting...';
		
		setTimeout(() => {
			button.disabled = false;
			button.innerHTML = originalText;
		}, 2000);
	}
	
	// ===== Prevent Multiple Form Submissions =====
	let isSubmitting = false;
	
	document.querySelectorAll('form').forEach(form => {
		form.addEventListener('submit', function(e) {
			if (isSubmitting) {
				e.preventDefault();
				return false;
			}
		});
	});
	
	// ===== Real-time Input Validation Feedback =====
	const emailInputs = document.querySelectorAll('input[type="email"]');
	emailInputs.forEach(input => {
		input.addEventListener('blur', function() {
			if (this.value && !isValidEmail(this.value)) {
				this.classList.add('is-invalid');
			} else {
				this.classList.remove('is-invalid');
			}
		});
		
		input.addEventListener('input', function() {
			if (this.classList.contains('is-invalid') && isValidEmail(this.value)) {
				this.classList.remove('is-invalid');
			}
		});
	});
	
	// ===== Console Welcome Message =====
	console.log('%c🚀 Welcome to BPL Tech!', 'color: #10b981; font-size: 24px; font-weight: bold; text-shadow: 2px 2px 4px rgba(0,0,0,0.2);');
	console.log('%c💼 Interested in joining our team? Contact us at info@bpltech.com', 'color: #4b5563; font-size: 14px;');
	console.log('%c🎨 Loving our design? We can build one for you too!', 'color: #06b6d4; font-size: 14px;');
	
	// ===== Initialize Bootstrap Tooltips (if any) =====
	const tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'));
	tooltipTriggerList.map(function(tooltipTriggerEl) {
		return new bootstrap.Tooltip(tooltipTriggerEl);
	});
	
	// ===== Add hover effects to cards =====
	const cards = document.querySelectorAll('.service-card, .training-card');
	cards.forEach(card => {
		card.addEventListener('mouseenter', function() {
			this.style.zIndex = '10';
		});
		card.addEventListener('mouseleave', function() {
			this.style.zIndex = '1';
		});
	});
	
	// ===== Add click loader to Register buttons =====
	document.querySelectorAll('.register-btn').forEach(btn => {
		if (!btn.hasAttribute('data-bs-toggle')) {
			btn.addEventListener('click', function() {
				showLoading();
				setTimeout(hideLoading, 500);
			});
		}
	});
	
	// ===== Clock/Time Display (Optional Enhancement) =====
	function updateTime() {
		const now = new Date();
		const timeString = now.toLocaleTimeString('en-US', { 
			hour: '2-digit', 
			minute: '2-digit',
			hour12: true 
		});
		// You can display this somewhere if needed
		// console.log('Current time:', timeString);
	}
	
	// Update time every minute
	setInterval(updateTime, 60000);
	updateTime();
});

// ===== Service Worker Registration for PWA (Optional) =====
if ('serviceWorker' in navigator) {
	// Uncomment when you have a service worker file
	/*
	window.addEventListener('load', function() {
		navigator.serviceWorker.register('/sw.js').then(
			function(registration) {
				console.log('ServiceWorker registration successful');
			},
			function(err) {
				console.log('ServiceWorker registration failed: ', err);
			}
		);
	});
	*/
}
