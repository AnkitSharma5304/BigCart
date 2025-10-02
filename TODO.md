# Fix Login and Signup Functionality

## Issues Identified
- Session API returns `id: decoded.userId` but JWT payload has `id`
- Login API has duplicate cookie setting
- Prisma schema uses PostgreSQL but dev.db is SQLite
- Potential DB setup issues

## Steps
- [x] Fix session API to use `decoded.id` instead of `decoded.userId`
- [x] Refactor login API cookie setting to avoid duplication
- [x] Change Prisma schema to use SQLite for development
- [x] Run Prisma migrations to set up DB properly
- [x] Test login and signup flows
