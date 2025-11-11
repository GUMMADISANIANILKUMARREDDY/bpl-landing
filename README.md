# BPL Tech Website

## Overview
Professional single-page application for BPL Tech - a leading technology solutions provider specializing in:
- Modern web development
- Startup prototypes
- Legacy system modernization
- Customer support solutions
- Professional training & internship programs

## Project Structure
```
EduTech/
├── index.html          # Main HTML file
├── css/
│   └── styles.css      # All styling and animations
├── js/
│   └── main.js         # JavaScript functionality
└── images/             # Image assets (placeholder)
```

## Features

### 🎨 Design & UI/UX
- Modern, professional design with gradient accents
- Smooth animations and transitions
- Responsive design for all devices
- Interactive hover effects
- Animated hero section with floating background
- Smooth scroll behavior
- Scroll-to-top button

### 📱 Sections
1. **Navigation Bar** - Sticky header with smooth scroll navigation
2. **Hero Section** - Eye-catching introduction with CTAs
3. **About Section** - Company information with statistics
4. **Services Section** - 6 comprehensive service cards:
   - Startup Prototypes
   - Legacy System Modernization
   - Customer Support Solutions
   - Custom Web Development
   - UI/UX Design
   - Technology Consulting
5. **Training & Internships** - Programs for students and professionals
6. **CTA Section** - Call-to-action with engaging background
7. **Contact Section** - Contact form with validation
8. **Footer** - Comprehensive footer with links and social media

### 🔒 Security Features
- Content Security Policy (CSP) headers
- X-Content-Type-Options header
- X-Frame-Options header
- Referrer policy
- Input sanitization to prevent XSS attacks
- Form validation (client-side)
- HTTPS-only external resources with SRI hashes
- No inline scripts (separated JS file)

### ⚡ Functionality
- Smooth scroll navigation
- Active navigation link tracking
- Form validation with real-time feedback
- Email and phone number validation
- Input sanitization
- Modal forms for registration
- Responsive mobile menu
- Intersection Observer for scroll animations
- Bootstrap 5 components

## Technologies Used
- **HTML5** - Semantic markup
- **CSS3** - Modern styling with CSS variables, Grid, Flexbox
- **JavaScript (ES6+)** - Vanilla JS for functionality
- **Bootstrap 5.3.2** - Responsive framework
- **SVG** - Custom logo graphics

## Browser Support
- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)
- Mobile browsers

## Setup & Installation

### Basic Setup
1. Clone or download the project
2. No build process required - pure HTML/CSS/JS
3. Open `index.html` in a browser

### Local Server (Recommended)
For better development experience:

**Using Python:**
```bash
# Python 3
python -m http.server 8000

# Python 2
python -m SimpleHTTPServer 8000
```

**Using Node.js:**
```bash
npx http-server -p 8000
```

**Using PHP:**
```bash
php -S localhost:8000
```

Then open: `http://localhost:8000`

## Configuration

### Customization
- **Colors**: Edit CSS variables in `css/styles.css`
- **Content**: Modify text in `index.html`
- **Forms**: Update form handlers in `js/main.js`

### Environment Variables
For production deployment, configure:
- API endpoints for form submissions
- Google Analytics (optional)
- reCAPTCHA keys (optional)

## Form Integration

### Backend Integration
The forms currently use console logging. To integrate with a backend:

1. Replace the commented-out fetch calls in `js/main.js`
2. Update API endpoints:
   - Registration: `/api/register`
   - Contact: `/api/contact`

Example backend endpoint structure:
```javascript
fetch('/api/register', {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json',
    },
    body: JSON.stringify(formData)
})
```

## Security Best Practices

### Implemented
✅ Content Security Policy (CSP)
✅ XSS Prevention (input sanitization)
✅ Secure headers
✅ SRI for external resources
✅ No inline scripts
✅ Form validation

### Recommended for Production
- [ ] HTTPS certificate
- [ ] Backend form validation
- [ ] Rate limiting on forms
- [ ] CAPTCHA integration
- [ ] SQL injection prevention (backend)
- [ ] CSRF protection
- [ ] Regular security audits

## Performance Optimization
- Minimal external dependencies
- Lazy loading ready structure
- Optimized CSS animations
- No unnecessary JavaScript libraries
- CDN for Bootstrap (cached across sites)

## Accessibility
- Semantic HTML5 elements
- ARIA labels on interactive elements
- Keyboard navigation support
- Focus states on interactive elements
- Alt text ready for images

## SEO Optimization
- Meta tags for description and keywords
- Semantic HTML structure
- Proper heading hierarchy (h1-h4)
- Clean URL structure ready
- Fast loading times

## Future Enhancements
- [ ] Add actual images to `/images/` folder
- [ ] Implement blog section
- [ ] Add testimonials slider
- [ ] Create portfolio showcase
- [ ] Integrate with CMS
- [ ] Add multi-language support
- [ ] Implement dark mode toggle
- [ ] Add Progressive Web App (PWA) features
- [ ] Backend API integration
- [ ] Database for form submissions
- [ ] Email notification system
- [ ] Admin dashboard

## Maintenance
- Regularly update Bootstrap version
- Review and update security headers
- Test forms functionality
- Check cross-browser compatibility
- Update content as needed
- Monitor console for errors

## Support
For questions or support:
- Email: info@bpltech.com
- Phone: +1 (555) 123-4567

## License
© 2024 BPL Tech. All rights reserved.

## Credits
- Design & Development: BPL Tech Team
- Icons: Unicode Emoji
- Framework: Bootstrap 5
- Fonts: System fonts (Segoe UI, Roboto)

---

**Version:** 1.0.0  
**Last Updated:** November 2024  
**Status:** Production Ready
