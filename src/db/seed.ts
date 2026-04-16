import { db } from "./index"; // Your drizzle connection
import { teachers, classes, students, attendance } from "./schema";

async function main() {
  console.log("--- Seeding Database ---");

  // 1. Clean existing data
  await db.delete(attendance);
  await db.delete(students);
  await db.delete(classes);
  await db.delete(teachers);

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
    "✅ Seeding complete! 1 teacher, 2 classes, and 5 students created.",
  );
}

main().catch((err) => {
  console.error("❌ Seeding failed:", err);
  process.exit(1);
});
