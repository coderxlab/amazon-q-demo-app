# 🔖 [Feature] Short, clear description
> Example: [Feature] Add User Profile Picture Upload

---

## 🎯 Summary
A high-level overview of the feature, what it enables, and why it’s needed.

> This feature allows users to upload and manage their profile pictures to personalize their account experience.

---

## 🧩 Background / Context
Why is this feature needed? Reference any customer feedback, OKRs, or linked tickets.

> Users have requested more personalization. This aligns with Q3 goal to improve retention through profile customization (OKR 3.2).

---

## ✅ Acceptance Criteria (Definition of Done)
Use checkboxes or Gherkin-style to define expected behavior.

- [ ] Users can upload a profile picture from their device.
- [ ] Image formats supported: JPEG, PNG, WebP.
- [ ] Max file size: 5MB.
- [ ] On successful upload, profile image displays in the user header and profile page.
- [ ] If upload fails, show appropriate error message.

> *(Optional Gherkin-style)*  
> **Given** I am logged in  
> **When** I visit the profile page and upload a valid image  
> **Then** I should see the new profile picture appear

---

## 📱 UI/UX Design
Include links or images.

- [Figma link](https://www.figma.com/file/...)
- Screenshot:  
  ![Profile Upload](https://your-image-url.com/profile-upload.png)

---

## 🧪 Technical Notes / Implementation Plan
Outline the dev approach, tech stack, or anything notable.

- API: `POST /api/user/profile-picture`
- Save to S3, use presigned URLs
- Update `User` schema with `avatarUrl` field
- Add validation with Yup on frontend

---

## 🔗 Dependencies
Mention required backend work, libraries, or external APIs.

- Backend endpoint required (linked to `BE-203`)
- Needs image validation lib installed (e.g., sharp or mime-type checker)

---

## 📅 Timeline / Priority

- **Sprint**: Sprint 23  
- **Priority**: High  
- **ETA**: 3 days after backend API is ready

---

## 🧷 Related Tickets / Epic

- **Epic**: User Personalization Features  
- **Linked Bugs**: `BUG-1123`  
- **Parent Ticket**: `PROJ-00123`

---

## ✅ Best Practices Checklist

- [x] Title is concise and follows naming convention  
- [x] Acceptance Criteria is testable and clear  
- [x] Linked to designs and dependencies  
- [x] Includes business context  
- [x] Uses proper labels/components
