# 🔖 [Feature] Create Registration Form Matching Figma Design

---

## 🎯 Summary
Implement a user registration form that exactly matches the provided Figma design for the to-do list web app. The form should include proper styling, icons, validation, and integration with the existing Supabase authentication system.

---

## 🧩 Background / Context
The current application has basic Supabase authentication but lacks a polished registration UI. The Figma design provides a professional, user-friendly registration form that will improve the user onboarding experience and align with modern design standards.

---

## ✅ Acceptance Criteria (Definition of Done)

- [ ] Registration form matches the exact Figma design layout and styling
- [ ] Form includes all required fields: First Name, Last Name, Username, Email, Password, Confirm Password
- [ ] Form includes proper icons for each input field (user, email, password icons)
- [ ] Form includes "I agree to all terms" checkbox
- [ ] Form includes styled "Register" button with coral/pink background (#FF9090)
- [ ] Form includes "Already have an account? Sign In" link
- [ ] Form validation ensures password confirmation matches
- [ ] Form validation includes proper error messages
- [ ] Form integrates with existing Supabase auth API endpoints
- [ ] Form is responsive and works on mobile devices
- [ ] Form uses Montserrat font family as specified in design
- [ ] Background includes the decorative image/pattern from design

**Given** I am a new user  
**When** I visit the registration page  
**Then** I should see a form that exactly matches the Figma design  
**And** I can successfully create an account with all profile fields

---

## 📱 UI/UX Design

- **Figma Design**: https://www.figma.com/design/3Eu2OzDmojOosbVLku3A9m/To-do-List-Web-App-Design--Community-?node-id=449-1512&t=s4iHtQcGmo63bDKE-4

**Key Design Elements:**
- White card container with subtle shadow
- Coral/pink register button (#FF9090)
- Input fields with gray borders and icons
- Montserrat font (700 weight for title, 500 for body)
- Background decorative pattern
- Proper spacing and alignment

---

## 🧪 Technical Notes / Implementation Plan

**Frontend Components:**
- Create `RegistrationForm` component in `/src/components/auth/`
- Use Tailwind CSS for styling to match exact design specifications
- Implement form validation with proper error states
- Add icons using React Icons or similar library

**Integration:**
- Connect to existing `/api/auth/signup` endpoint
- Maintain existing user profile creation logic
- Ensure proper error handling and success states

**Styling:**
- Match exact colors: #FF9090 (button), #212427 (text), #999999 (placeholders)
- Use Montserrat font family
- Implement proper shadows and border radius
- Add background pattern/image

---

## 🔗 Dependencies

- Existing Supabase authentication system
- Current API endpoints: `/api/auth/signup`
- React Icons library for form icons
- Tailwind CSS for styling
- Montserrat font integration

---

## 📅 Timeline / Priority

- **Priority**: High  
- **ETA**: 1-2 days
- **Sprint**: Current Sprint

---

## 🧷 Related Tickets / Epic

- **Epic**: User Authentication & Onboarding
- **Related**: Existing Supabase auth implementation
- **Follows**: Architecture guidelines in `.amazonq/rules/`

---

## ✅ Best Practices Checklist

- [x] Title is concise and follows naming convention  
- [x] Acceptance Criteria is testable and clear  
- [x] Linked to designs and dependencies  
- [x] Includes business context  
- [x] Technical implementation plan provided
- [x] Follows existing architecture patterns