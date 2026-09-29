import { db } from "./index"; // Your drizzle connection
import {
  attendance,
  classes,
  staffCertifications,
  staffProfiles,
  staffRoles,
  staffSchools,
  students,
  teachers,
} from "./schema";

async function main() {
  console.log("--- Seeding Database ---");

  // 1. Clean existing data
  await db.delete(attendance);
  await db.delete(students);
  await db.delete(classes);
  await db.delete(teachers);
  await db.delete(staffCertifications);
  await db.delete(staffRoles);
  await db.delete(staffSchools);
  await db.delete(staffProfiles);

  const [administrator] = await db
    .insert(staffProfiles)
    .values({
      firstName: "Maria",
      lastName: "Santos",
      jobTitle: "Principal",
      district: "EduSchool Unified District",
      workEmail: "m.santos@school.edu",
      workPhone: "(555) 014-2290",
      phoneExtension: "1804",
      department: "School Administration",
    })
    .returning();

  await db.insert(staffSchools).values([
    {
      staffProfileId: administrator.id,
      schoolName: "Northview High School",
      assignmentScope: "Primary assignment",
    },
    {
      staffProfileId: administrator.id,
      schoolName: "District Leadership Team",
      assignmentScope: "District-wide committee",
    },
  ]);

  await db.insert(staffRoles).values([
    {
      staffProfileId: administrator.id,
      roleName: "School Administrator",
      permissionSummary:
        "Can manage attendance review, school staff, school reports, and family communications.",
    },
    {
      staffProfileId: administrator.id,
      roleName: "Attendance Approver",
      permissionSummary:
        "Can review attendance submissions and approve absence corrections.",
    },
  ]);

  await db.insert(staffCertifications).values([
    {
      staffProfileId: administrator.id,
      certificationType: "Administrative Services Credential",
      certificationArea: "K-12 School Administration",
      issuingAuthority: "State Department of Education",
      issueDate: "2021-07-01",
      expirationDate: "2027-06-30",
    },
    {
      staffProfileId: administrator.id,
      certificationType: "Teaching Credential",
      certificationArea: "Secondary Mathematics",
      issuingAuthority: "State Department of Education",
      issueDate: "2015-08-15",
      expirationDate: "2029-08-14",
    },
  ]);

  // 2. Insert a Teacher
  const [teacher] = await db
    .insert(teachers)
    .values({
      name: "Sarah Jenkins",
      email: "s.jenkins@school.edu",
    })
    .returning();

  // 3. Insert Classes
  const [mathClass] = await db
    .insert(classes)
    .values([
      { name: "Algebra II - Period 1", teacherId: teacher.id },
      { name: "Biology - Period 3", teacherId: teacher.id },
    ])
    .returning();

  // 4. Insert Students for the Math Class
  const studentData = [
    { name: "Alex Rivera", classId: mathClass.id },
    { name: "Jordan Smith", classId: mathClass.id },
    { name: "Casey Wong", classId: mathClass.id },
    { name: "Riley Taylor", classId: mathClass.id },
    { name: "Morgan Davis", classId: mathClass.id },
  ];

  await db.insert(students).values(studentData);

  console.log(
    "Seeding complete! 1 administrator, 1 teacher, 2 classes, and 5 students created.",
  );
}

main().catch((err) => {
  console.error("Seeding failed:", err);
  process.exit(1);
});
