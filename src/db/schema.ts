import {
  pgTable,
  serial,
  text,
  date,
  integer,
  pgEnum,
  uniqueIndex,
} from "drizzle-orm/pg-core";

export const staffStatusEnum = pgEnum("staff_status", ["active", "inactive"]);

export const staffProfiles = pgTable("staff_profiles", {
  id: serial("id").primaryKey(),
  firstName: text("first_name").notNull(),
  lastName: text("last_name").notNull(),
  profilePhotoUrl: text("profile_photo_url"),
  jobTitle: text("job_title").notNull(),
  district: text("district").notNull(),
  workEmail: text("work_email").unique().notNull(),
  workPhone: text("work_phone"),
  phoneExtension: text("phone_extension"),
  department: text("department"),
  status: staffStatusEnum("status").default("active").notNull(),
});

export const staffSchools = pgTable(
  "staff_schools",
  {
    id: serial("id").primaryKey(),
    staffProfileId: integer("staff_profile_id")
      .references(() => staffProfiles.id)
      .notNull(),
    schoolName: text("school_name").notNull(),
    assignmentScope: text("assignment_scope").notNull(),
  },
  (table) => ({
    staffSchoolIdx: uniqueIndex("staff_school_idx").on(
      table.staffProfileId,
      table.schoolName,
    ),
  }),
);

export const staffRoles = pgTable(
  "staff_roles",
  {
    id: serial("id").primaryKey(),
    staffProfileId: integer("staff_profile_id")
      .references(() => staffProfiles.id)
      .notNull(),
    roleName: text("role_name").notNull(),
    permissionSummary: text("permission_summary").notNull(),
  },
  (table) => ({
    staffRoleIdx: uniqueIndex("staff_role_idx").on(
      table.staffProfileId,
      table.roleName,
    ),
  }),
);

export const staffCertifications = pgTable("staff_certifications", {
  id: serial("id").primaryKey(),
  staffProfileId: integer("staff_profile_id")
    .references(() => staffProfiles.id)
    .notNull(),
  certificationType: text("certification_type").notNull(),
  certificationArea: text("certification_area").notNull(),
  issuingAuthority: text("issuing_authority").notNull(),
  issueDate: date("issue_date").notNull(),
  expirationDate: date("expiration_date"),
});

export const attendanceStatusEnum = pgEnum("attendance_status", [
  "present",
  "absent",
  "tardy",
  "excused",
]);

export const teachers = pgTable("teachers", {
  id: serial("id").primaryKey(),
  staffProfileId: integer("staff_profile_id").references(() => staffProfiles.id),
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
    notes: text("notes"),
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
