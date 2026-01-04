# Portfolio Website

A modern, responsive portfolio website built with HTML, CSS, and JavaScript.

## Features

- **Responsive Design**: Works beautifully on all devices (desktop, tablet, mobile)
- **Modern UI**: Clean, professional design with smooth animations
- **Smooth Scrolling**: Enhanced navigation experience
- **Interactive Elements**: Hover effects and animations throughout
- **Contact Form**: Ready-to-use contact form (needs backend integration)
- **Mobile Menu**: Hamburger menu for mobile devices

## Sections

1. **Hero Section**: Introduction with call-to-action buttons
2. **About Section**: Personal information and statistics
3. **Projects Section**: Showcase your work with project cards
4. **Skills Section**: Display your technical skills
5. **Contact Section**: Contact information and form

## Getting Started

### Local Development

1. Simply open `index.html` in your web browser, or
2. Use a local server:

```bash
# Using Python 3
python -m http.server 8000

# Using Node.js (if you have http-server installed)
npx http-server

# Using PHP
php -S localhost:8000
```

Then navigate to `http://localhost:8000` in your browser.

## Customization

### Personal Information

1. **Name**: Update "Sarah Knebel" throughout the HTML file
2. **Title**: Change "Creative Developer & Problem Solver" in the hero section
3. **Description**: Update the about section text
4. **Contact Info**: Update email, LinkedIn, and GitHub links in the contact section

### Projects

1. Replace the placeholder project cards with your actual projects
2. Update project titles, descriptions, and tags
3. Add links to live demos and GitHub repositories
4. Replace placeholder images with actual project screenshots

### Skills

1. Update the skill items to match your actual skills
2. Add or remove skill categories as needed
3. Modify the skill tags to reflect your expertise

### Colors

The color scheme can be customized in `styles.css` by modifying the CSS variables in the `:root` selector:

```css
:root {
    --primary-color: #6366f1;
    --primary-dark: #4f46e5;
    --secondary-color: #8b5cf6;
    /* ... other colors ... */
}
```

### Images

Replace the placeholder SVG in the hero section with your actual photo or a professional image.

## Deploying

### GitHub Pages

1. Push your code to a GitHub repository
2. Go to Settings > Pages
3. Select your branch and folder
4. Your site will be available at `https://yourusername.github.io/repository-name`

### Netlify

1. Drag and drop the project folder to [Netlify](https://www.netlify.com/)
2. Or connect your GitHub repository for automatic deployments

### Vercel

1. Install Vercel CLI: `npm i -g vercel`
2. Run `vercel` in the project directory
3. Follow the prompts

## Contact Form

The contact form currently shows an alert on submission. To make it functional:

1. **Formspree**: Sign up at [formspree.io](https://formspree.io/) and add the form action
2. **EmailJS**: Use [EmailJS](https://www.emailjs.com/) for client-side email sending
3. **Backend API**: Create your own backend endpoint to handle form submissions

Example with Formspree:

```html
<form action="https://formspree.io/f/YOUR_FORM_ID" method="POST" class="contact-form">
    <!-- form fields -->
</form>
```

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## License

This project is open source and available under the MIT License.

## Credits

- Fonts: [Google Fonts - Inter](https://fonts.google.com/specimen/Inter)
- Icons: Emoji icons (can be replaced with icon libraries like Font Awesome)

---

Made with ❤️ for showcasing your work

