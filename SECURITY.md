# Security Policy

## Overview
This document outlines the security measures implemented in the BPL Tech website and recommendations for production deployment.

## Implemented Security Features

### 1. Content Security Policy (CSP)
The website implements a strict Content Security Policy to prevent XSS attacks:

```html
<meta http-equiv="Content-Security-Policy" 
      content="default-src 'self'; 
               script-src 'self' https://cdn.jsdelivr.net; 
               style-src 'self' 'unsafe-inline' https://cdn.jsdelivr.net; 
               font-src 'self' https://cdn.jsdelivr.net; 
               img-src 'self' data: https:; 
               connect-src 'self';">
```

**What it does:**
- Only allows scripts from same origin and trusted CDN
- Restricts external resource loading
- Prevents inline script execution (except in style tags for Bootstrap compatibility)
- Limits image sources to same origin and HTTPS

### 2. Security Headers

#### X-Content-Type-Options
```html
<meta http-equiv="X-Content-Type-Options" content="nosniff">
```
Prevents MIME type sniffing attacks.

#### X-Frame-Options
```html
<meta http-equiv="X-Frame-Options" content="SAMEORIGIN">
```
Prevents clickjacking by disallowing iframe embedding from other domains.

#### Referrer Policy
```html
<meta name="referrer" content="strict-origin-when-cross-origin">
```
Controls referrer information sent with requests.

### 3. Input Sanitization
All user inputs are sanitized in JavaScript before processing:

```javascript
function sanitizeInput(input) {
    const div = document.createElement('div');
    div.textContent = input;
    return div.innerHTML;
}
```

This prevents XSS attacks by converting potentially dangerous characters to HTML entities.

### 4. Form Validation
Multiple layers of validation:
- Required field checks
- Email format validation using regex
- Phone number format validation
- Minimum length requirements
- Real-time feedback on invalid inputs

### 5. External Resources Security
- All CDN resources use HTTPS
- Subresource Integrity (SRI) hashes verify resource integrity
- Only trusted CDN sources (jsdelivr.net)

### 6. No Inline Scripts
All JavaScript code is in separate `.js` files, reducing XSS attack surface.

## Additional Security Recommendations for Production

### 1. HTTPS/SSL Certificate
**Priority: CRITICAL**

Install an SSL certificate to enable HTTPS:
- Obtain from Let's Encrypt (free)
- Or purchase from trusted CA
- Force HTTPS redirect in web server config

**Apache (.htaccess):**
```apache
RewriteEngine On
RewriteCond %{HTTPS} off
RewriteRule ^(.*)$ https://%{HTTP_HOST}%{REQUEST_URI} [L,R=301]
```

**Nginx:**
```nginx
server {
    listen 80;
    server_name bpltech.com;
    return 301 https://$server_name$request_uri;
}
```

### 2. Backend Security

#### API Endpoint Security
- Implement rate limiting (e.g., 10 requests per minute)
- Use authentication tokens for sensitive operations
- Validate all inputs server-side
- Use parameterized queries to prevent SQL injection
- Implement CSRF protection

#### Example Node.js/Express Setup:
```javascript
const rateLimit = require('express-rate-limit');
const helmet = require('helmet');

const limiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100 // limit each IP to 100 requests per windowMs
});

app.use(helmet());
app.use('/api/', limiter);
```

### 3. CAPTCHA Integration
Add reCAPTCHA to prevent bot submissions:

1. Register at: https://www.google.com/recaptcha
2. Add to forms:
```html
<div class="g-recaptcha" data-sitekey="YOUR_SITE_KEY"></div>
```
3. Verify on backend before processing

### 4. Database Security
- Use prepared statements/parameterized queries
- Encrypt sensitive data at rest
- Use environment variables for credentials
- Implement proper access controls
- Regular backups with encryption

### 5. Server Configuration

#### Additional Security Headers (via web server):

**Apache:**
```apache
Header set Strict-Transport-Security "max-age=31536000; includeSubDomains"
Header set X-XSS-Protection "1; mode=block"
Header set Permissions-Policy "geolocation=(), microphone=(), camera=()"
```

**Nginx:**
```nginx
add_header Strict-Transport-Security "max-age=31536000; includeSubDomains" always;
add_header X-XSS-Protection "1; mode=block" always;
add_header Permissions-Policy "geolocation=(), microphone=(), camera=()" always;
```

### 6. File Upload Security (if implemented)
- Validate file types and extensions
- Limit file sizes
- Scan for malware
- Store uploads outside web root
- Randomize file names

### 7. Session Management (for authenticated areas)
- Use secure, httpOnly cookies
- Implement session timeout
- Regenerate session IDs after login
- Use strong session ID generation

### 8. Error Handling
- Never expose stack traces to users
- Log errors securely server-side
- Use generic error messages for users
- Monitor error logs for suspicious activity

### 9. Dependency Management
- Regularly update dependencies (Bootstrap, etc.)
- Use `npm audit` or similar for vulnerability scanning
- Remove unused dependencies
- Pin dependency versions

### 10. Monitoring & Logging
- Implement security logging
- Monitor for suspicious patterns
- Set up alerts for security events
- Regular security audits
- Penetration testing

## Security Checklist for Production

### Pre-Launch
- [ ] SSL certificate installed and configured
- [ ] All forms submit to secure (HTTPS) endpoints
- [ ] Backend validation implemented
- [ ] Rate limiting configured
- [ ] CAPTCHA integrated on public forms
- [ ] Database credentials secured (env variables)
- [ ] Security headers configured on web server
- [ ] Error pages don't expose sensitive info
- [ ] All dependencies updated to latest secure versions
- [ ] CSP policy tested and working
- [ ] Remove any debug/console logs
- [ ] Backup strategy implemented

### Post-Launch
- [ ] Monitor security logs daily
- [ ] Set up automated vulnerability scanning
- [ ] Schedule regular security audits
- [ ] Keep dependencies updated
- [ ] Test form submissions for exploits
- [ ] Monitor SSL certificate expiration
- [ ] Review access logs for suspicious activity
- [ ] Test disaster recovery procedures

## Common Vulnerabilities & Prevention

### 1. Cross-Site Scripting (XSS)
**Prevention:**
- Input sanitization (✅ implemented)
- Output encoding
- CSP headers (✅ implemented)
- Avoid innerHTML with user input

### 2. SQL Injection
**Prevention:**
- Parameterized queries (backend)
- ORM usage
- Input validation
- Least privilege database accounts

### 3. Cross-Site Request Forgery (CSRF)
**Prevention:**
- Anti-CSRF tokens
- SameSite cookie attribute
- Origin header validation
- Double-submit cookies

### 4. Clickjacking
**Prevention:**
- X-Frame-Options header (✅ implemented)
- Frame-ancestors CSP directive
- JavaScript frame-busting code

### 5. Man-in-the-Middle (MITM)
**Prevention:**
- HTTPS everywhere (🔜 required)
- HSTS headers (🔜 recommended)
- Secure cookies
- Certificate pinning (advanced)

## Incident Response Plan

### If a Security Breach Occurs:
1. **Immediate Response**
   - Take affected systems offline
   - Preserve logs and evidence
   - Notify security team/admin

2. **Assessment**
   - Identify scope of breach
   - Determine what data was accessed
   - Find entry point

3. **Containment**
   - Close security hole
   - Reset compromised credentials
   - Apply patches

4. **Recovery**
   - Restore from clean backups
   - Verify system integrity
   - Monitor for suspicious activity

5. **Post-Incident**
   - Document lessons learned
   - Update security measures
   - Notify affected parties (if required by law)

## Contact for Security Issues

If you discover a security vulnerability:
- **DO NOT** disclose publicly
- Email: security@bpltech.com
- Use encrypted email if possible
- Include detailed description
- We commit to responding within 48 hours

## Compliance Considerations

### GDPR (if serving EU users)
- Obtain explicit consent for data collection
- Provide privacy policy
- Allow data export/deletion
- Implement data retention policies

### CCPA (if serving California users)
- Disclose data collection practices
- Provide opt-out mechanisms
- Honor data deletion requests

### ADA/WCAG (Accessibility)
- Ensure site is accessible
- Test with screen readers
- Maintain proper contrast ratios
- Provide alt text for images

## Regular Security Tasks

### Daily
- Monitor error logs
- Check for failed login attempts (if auth implemented)

### Weekly
- Review access logs
- Check SSL certificate validity
- Update dependencies (patch versions)

### Monthly
- Full security audit
- Penetration testing (automated)
- Review and update security policies
- Backup verification

### Quarterly
- Professional security audit
- Disaster recovery drill
- Review and update documentation
- Employee security training

## Resources

### Security Testing Tools
- [OWASP ZAP](https://www.zaproxy.org/) - Free security scanner
- [Burp Suite](https://portswigger.net/burp) - Web vulnerability scanner
- [SSL Labs](https://www.ssllabs.com/ssltest/) - SSL configuration test
- [Security Headers](https://securityheaders.com/) - Header analyzer

### Security Guidelines
- [OWASP Top 10](https://owasp.org/www-project-top-ten/)
- [CWE Top 25](https://cwe.mitre.org/top25/)
- [Mozilla Web Security Guidelines](https://infosec.mozilla.org/guidelines/web_security)

---

**Last Updated:** November 2024  
**Version:** 1.0  
**Review Schedule:** Quarterly
