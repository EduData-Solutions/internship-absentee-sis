# Administrator Profiles Implementation Notes

## Repository decision

Two repositories were provided for the ticket:

- `https://github.com/EduData-Solutions/EduSchool`
- `https://github.com/EduData-Solutions/internship-absentee-sis`

The `EduSchool` clone attempt returned `Repository not found`, which likely means the repository is private, renamed, or unavailable to the current GitHub credentials.

The `internship-absentee-sis` repository was cloned successfully. It is a small Next.js/Drizzle starter app focused on attendance, with these current traits:

- `src/db/schema.ts` contains `teachers`, `classes`, `students`, and `attendance`.
- `src/app/page.tsx` was still the default Next.js starter page before this work.
- There are no existing Teacher Profile or Student Profile screens in this repository.

Because the ticket says Administrator Profiles should follow the same design language as existing Teacher and Student Profiles, the full product implementation most likely belongs in the unavailable `EduSchool` repository. This repository can still host a starter implementation for the shared staff-profile architecture requested by the ticket.

## Work started here

1. Added shared staff tables in `src/db/schema.ts`:
   - `staff_profiles`
   - `staff_schools`
   - `staff_roles`
   - `staff_certifications`
2. Added `teachers.staff_profile_id` as an optional bridge so existing teachers can later attach to the shared staff profile foundation.
3. Added a local sample administrator data module in `src/lib/staff-profile-data.ts`.
4. Replaced the starter home page with a staff workspace and administrator profile link.
5. Added the first administrator profile route at `src/app/staff/administrators/[id]/page.tsx`.

## Architecture direction

The implementation follows the requested shape:

```text
Person -> Staff Profile -> Role(s)
```

Instead of creating a standalone Administrator Profile model, administrator-specific behavior sits on top of shared staff records. This should make it easier to extend later to teachers, counselors, nurses, aides, substitutes, office staff, and employees with multiple roles.

## Remaining product work

- Confirm access to the main `EduSchool` repository.
- Reuse existing Teacher and Student Profile components once available.
- Replace the temporary local sample data with database-backed queries.
- Add permission checks before rendering edit controls or sensitive staff/personnel fields.
- Add real edit forms and server actions.
- Add certification expiration alert logic once notification requirements are defined.
- Generate and apply Drizzle migrations after the final target repository is confirmed.
