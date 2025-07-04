# AWSQDEMO-7: Login UI Design Implementation - Task List

**Jira Ticket**: [AWSQDEMO-7](https://your-jira-instance.atlassian.net/browse/AWSQDEMO-7)
**Figma Design**: https://www.figma.com/design/I4M4qXKktnjcnbkL09NoOe/To-do-List-Web-App-Design--Community-?node-id=449-1513

## Relevant Filestasks/AWSQDEMO-7/AWSQDEMO-7-implementation-specification.md

- `app/login/page.tsx` - Main login page component that needs visual redesign
- `components/auth/LoginForm.tsx` - New dedicated login form component to be created
- `tailwind.config.js` - Add Montserrat font and custom colors (#FF9090, etc.)
- `public/icons/user.svg` - User icon for username/email field
- `public/icons/password.svg` - Password icon for password field  
- `public/icons/eye.svg` - Eye icon for password visibility toggle
- `public/icons/google.svg` - Google social login icon (UI-only)
- `public/icons/facebook.svg` - Facebook social login icon (UI-only)
- `public/images/login-background.png` - Decorative image positioned on right side of login form (613x613px)
- `src/app/login/page.tsx` - Login page that uses the new LoginForm component

### Notes

- Focus on visual redesign while preserving existing Supabase authentication functionality
- Follow Figma design specifications exactly for colors, spacing, and typography
- Implement responsive design for mobile (320px+) and desktop (1024px+)
- Use React Hook Form with Yup validation as per existing patterns

## Tasks

- [x] 1.0 Setup Design System & Assets
  - [x] 1.1 Update tailwind.config.js to add Montserrat font family
  - [x] 1.2 Add custom colors to Tailwind config (#FF9090, #212427, #999999, #565454)
  - [x] 1.3 Create user.svg icon (20x20px) in /public/icons/
  - [x] 1.4 Create password.svg icon (20x26.25px) in /public/icons/
  - [x] 1.5 Create eye.svg icon for password visibility toggle in /public/icons/
  - [x] 1.6 Create google.svg and facebook.svg icons for social login buttons in /public/icons/
  - [x] 1.7 Add login-background.png (613x613px) as decorative image on right side (not background)
  
  **Comment**: Image downloaded from Figma - this is not a background image but a decorative image positioned on the right-hand side of the login form
- [x] 2.0 Create Login Form Component
  - [x] 2.1 Recheck Figma design for component structure and layout
  - [x] 2.2 Create /components/auth/LoginForm.tsx with basic structure
  - [x] 2.3 Add TypeScript interfaces for form data (email, password, rememberMe)
  - [x] 2.4 Create reusable InputField component with icon support
  - [x] 2.5 Add form container with white background and shadow effects
  - [x] 2.6 Implement "Sign In" heading with Montserrat 700, 36px
- [ ] 3.0 Implement Form Validation & Logic
  - [ ] 3.1 Recheck Figma design for validation states and error handling
  - [ ] 3.2 Set up React Hook Form with useForm hook
  - [ ] 3.3 Create Yup validation schema (email format, password min 6 chars)
  - [ ] 3.4 Add real-time validation with error messages below fields
  - [ ] 3.5 Implement password visibility toggle functionality
  - [ ] 3.6 Add Remember Me checkbox (UI-only, no backend logic)
- [ ] 4.0 Add Responsive Design & Styling
  - [ ] 4.1 Recheck Figma design for exact measurements, colors, and spacing
  - [ ] 4.2 Style form container (559x438px desktop, responsive mobile)
  - [ ] 4.3 Style input fields (559x60px, 8px border radius, #565454 border)
  - [ ] 4.4 Style login button (#FF9090 background, 5px border radius)
  - [ ] 4.5 Add social login buttons (Google, Facebook) as UI-only placeholders
  - [ ] 4.6 Implement mobile responsive design (320px+ width)
  - [ ] 4.7 Add "Don't have an account? Create One" link to registration
  - [ ] 4.8 Position decorative image on right side (613x613px)
- [ ] 5.0 Integrate with Existing Authentication
  - [ ] 5.1 Update /app/login/page.tsx to use new LoginForm component
  - [ ] 5.2 Connect form submission to existing Supabase auth logic
  - [ ] 5.3 Preserve existing error handling and user feedback
  - [ ] 5.4 Ensure proper redirect to dashboard after successful login
  - [ ] 5.5 Test authentication flow with new UI design
