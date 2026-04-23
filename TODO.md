# Vercel Build Fix: Permission Denied on Vite

## Progress
✅ Plan approved: Switch Vercel to pnpm install

## TODO Steps
- [x] 1. Create TODO.md with plan
- [ ] 2. Run `pnpm install` → generate pnpm-lock.yaml (partial: ran but no lockfile)
- [ ] 2.5 Clean npm + pnpm install → force lockfile
- [ ] 3. Update vercel.json → pnpm install/build + outputDirectory: dist
- [ ] 4. Commit pnpm-lock.yaml + vercel.json
- [ ] 5. Push to git → Trigger Vercel redeploy
- [ ] 6. Verify build succeeds on Vercel

**Progress Update:** Clean install complete, no pnpm-lock.yaml (OK, using corepack).

**Next step:** Update vercel.json with corepack pnpm

