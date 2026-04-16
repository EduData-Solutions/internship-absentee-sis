"use client";

import { useState, useTransition } from "react";
import { markAttendance } from "@/lib/actions/attendance";
import { Button } from "@/components/ui/button";

interface Student {
  id: number;
  name: string;
}

interface Props {
  students: Student[];
  classId: number;
  date: string;
}

export default function AttendanceSheet({ students, classId, date }: Props) {
  const [isPending, startTransition] = useTransition();

  // Local state to track changes before saving
  const [records, setRecords] = useState(
    students.map((s) => ({
      studentId: s.id,
      classId,
      status: "present" as const,
    })),
  );

  const updateStatus = (
    studentId: number,
    status: "present" | "absent" | "tardy" | "excused",
  ) => {
    setRecords((prev) =>
      prev.map((r) => (r.studentId === studentId ? { ...r, status } : r)),
    );
  };

  const handleSave = () => {
    startTransition(async () => {
      const result = await markAttendance(date, records);
      if (result.success) {
        alert("Attendance saved successfully!");
      } else {
        alert("Error: " + result.message);
      }
    });
  };

  return (
    <div className="rounded-lg border border-slate-200 bg-white p-6 shadow-sm">
      <div className="mb-6 flex items-center justify-between">
        <h2 className="text-xl font-semibold text-slate-800">Class Roster</h2>
        <p className="text-sm text-slate-500">
          {new Date(date).toDateString()}
        </p>
      </div>

      <table className="w-full text-left">
        <thead>
          <tr className="border-b border-slate-100 text-sm font-medium text-slate-600">
            <th className="pb-3 pl-2">Student Name</th>
            <th className="pb-3">Status</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-slate-50">
          {students.map((student) => (
            <tr key={student.id} className="group hover:bg-slate-50">
              <td className="py-4 pl-2 font-medium text-slate-700">
                {student.name}
              </td>
              <td className="py-4">
                <div className="flex gap-2">
                  {["present", "absent", "tardy", "excused"].map((s) => {
                    const currentStatus = records.find(
                      (r) => r.studentId === student.id,
                    )?.status;
                    const isActive = currentStatus === s;

                    return (
                      <button
                        key={s}
                        onClick={() => updateStatus(student.id, s as any)}
                        className={`rounded px-3 py-1 text-xs font-semibold capitalize transition-colors ${
                          isActive
                            ? "bg-blue-600 text-white"
                            : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                        }`}
                      >
                        {s}
                      </button>
                    );
                  })}
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="mt-8 flex justify-end">
        <Button
          onClick={handleSave}
          disabled={isPending}
          className="bg-blue-700 hover:bg-blue-800"
        >
          {isPending ? "Saving..." : "Submit Attendance"}
        </Button>
      </div>
    </div>
  );
}
