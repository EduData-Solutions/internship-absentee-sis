import {
  pgTable,
  serial,
  text,
  date,
  integer,
  pgEnum,
  uniqueIndex,
} from "drizzle-orm/pg-core";

export const attendanceStatusEnum = pgEnum("attendance_status", [
  "present",
  "absent",
  "tardy",
  "excused",
]);

export const teachers = pgTable("teachers", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  email: text("email").unique().notNull(),
});

export const classes = pgTable("classes", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  teacherId: integer("teacher_id").references(() => teachers.id),
});

export const students = pgTable("students", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  classId: integer("class_id").references(() => classes.id),
});

export const attendance = pgTable(
  "attendance",
  {
    id: serial("id").primaryKey(),
    studentId: integer("student_id")
      .references(() => students.id)
      .notNull(),
    classId: integer("class_id")
      .references(() => classes.id)
      .notNull(),
    date: date("date").notNull(),
    status: attendanceStatusEnum("status").default("present").notNull(),
  },
  (table) => ({
    // Prevents duplicate entries for the same student on the same day/class
    attendanceIdx: uniqueIndex("attendance_idx").on(
      table.studentId,
      table.classId,
      table.date,
    ),
  }),
);
