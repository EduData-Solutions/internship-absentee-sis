"use server";

import { db } from "@/db";
import { attendance } from "@/db/schema";
import { and, eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";

// Type for a single student's status update
interface AttendanceUpdate {
  studentId: number;
  classId: number;
  status: "present" | "absent" | "tardy" | "excused";
  notes?: string;
}

/**
 * markingAttendance handles batch upserts (Insert or Update).
 * This ensures that if a teacher submits twice for the same day,
 * it updates the existing record rather than creating duplicates.
 */
export async function markAttendance(
  date: string,
  updates: AttendanceUpdate[],
) {
  try {
    // 1. We map through the updates and perform a 'transaction' or individual upserts
    // In a real-world SIS, using a database transaction ensures all or nothing.
    await db.transaction(async (tx) => {
      for (const update of updates) {
        await tx
          .insert(attendance)
          .values({
            studentId: update.studentId,
            classId: update.classId,
            date: date,
            status: update.status,
            notes: update.notes,
          })
          .onConflictDoUpdate({
            target: [attendance.studentId, attendance.classId, attendance.date],
            set: {
              status: update.status,
              notes: update.notes,
            },
          });
      }
    });

    // 2. Clear the cache so the UI reflects the new data immediately
    revalidatePath(`/dashboard/classes/${updates[0].classId}`);

    return { success: true };
  } catch (error) {
    console.error("Failed to mark attendance:", error);
    return { success: false, message: "Database operation failed." };
  }
}
