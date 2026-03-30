# OsteoCare — Solo Practitioner Osteopathy Website

A professional, responsive website template for an individual osteopath / manual therapy practitioner. Built with Bootstrap 5, modern CSS, and vanilla JavaScript. Includes dark/light mode toggle.

## 📁 Project Structure

```
osteocare-solo/
├── index.html          # Main HTML page (semantic, accessible markup)
├── css/
│   └── style.css       # All custom styles (organised with table of contents)
├── js/
│   └── main.js         # All JavaScript functionality (documented modules)
├── images/             # Place your images here (profile photo, clinic, hero)
├── fonts/              # Custom fonts if needed (currently using Google Fonts CDN)
├── .gitignore          # Git ignore rules
└── README.md           # This file
```

## 🚀 Getting Started

1. Extract the zip file
2. Drag the `osteocare-solo` folder onto VS Code
3. Install "Live Server" extension → right-click `index.html` → "Open with Live Server"

## ✏️ What to Customise

### Must Change (placeholder content)
- **Practitioner name**: `Dr. James Mitchell` → your real name
- **Qualifications**: `M.Ost, BSc (Hons)` → your actual qualifications
- **GOsC number**: `#12345` → your real registration number
- **Phone number**: `020 7123 4567` → your real number
- **Email**: `james@osteocare.co.uk` → your real email
- **Address**: `42 Harley Street, London W1G 9PR` → your real address
- **Testimonials**: Replace with real patient reviews
- **Pricing**: Update to your actual fees
- **Images**: Replace placeholder icon divs with real `<img>` tags (see HTML comments)
- **Social links**: Update `href="#"` with your actual social media URLs
- **Bio text**: Update the About Me section with your own story

### Optional Customisation
- **Brand colours**: Edit CSS variables in `:root` at the top of `css/style.css`
- **Fonts**: Change `--serif` and `--sans` variables
- **Services**: Add, remove, or edit service cards
- **FAQ**: Update questions and answers

## 📬 Making the Booking Form Work

See `js/main.js` for ready-to-uncomment Formspree integration, or use Formsubmit.co (no sign-up needed).

## 🌙 Dark Mode

Includes dark/light mode toggle (bottom-left button). Preference persists via localStorage.

## 📄 Licence

Free to use for personal and commercial projects.
