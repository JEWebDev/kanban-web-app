# Kanban Task Management App - README

Initial readme

## Challenges i found during development

### User Auth

Initially, I only considered implementing login functionality using email and password. However, I realized that users would need to register first, which would require email verification, same for resetting password.

After exploring Supabase's documentation, I discovered that while they provide an SMTP server, its capabilities are limited and do not meet the needs of this project. I considered alternative solutions, such as building a custom SMTP server, but most of these options required owning a domain to send verification emails to users, rather than a sandbox or personal email.

#### Solution:

To simplify the process, I decided to create a test user. This allows users to log in using the test account (email and password) or sign in using GitHub (OAuth). GitHub is a widely accepted standard, and this approach also provides an option for users who want to test the app without using their GitHub account.
