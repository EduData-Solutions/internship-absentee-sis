import Link from "next/link";
import { ArrowRight, GraduationCap, ShieldCheck, Users } from "lucide-react";

import { administratorProfiles } from "@/lib/staff-profile-data";

export default function Home() {
  return (
    <main className="min-h-screen bg-slate-50 text-slate-950">
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-8 px-6 py-8 lg:px-8">
        <header className="flex flex-col gap-3 border-b border-slate-200 pb-6 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="text-sm font-medium text-slate-500">EduSchool</p>
            <h1 className="mt-1 text-3xl font-semibold tracking-tight">
              Staff workspace
            </h1>
          </div>
          <div className="inline-flex w-fit items-center gap-2 rounded-md border border-emerald-200 bg-emerald-50 px-3 py-2 text-sm font-medium text-emerald-800">
            <ShieldCheck className="size-4" aria-hidden="true" />
            Authorized staff view
          </div>
        </header>

        <section className="grid gap-4 md:grid-cols-3">
          <div className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm">
            <Users className="size-5 text-slate-500" aria-hidden="true" />
            <h2 className="mt-4 text-lg font-semibold">Administrator profiles</h2>
            <p className="mt-2 text-sm leading-6 text-slate-600">
              Shared staff records for employment, contact, assignment, role, and
              certification details.
            </p>
          </div>
          <div className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm">
            <GraduationCap className="size-5 text-slate-500" aria-hidden="true" />
            <h2 className="mt-4 text-lg font-semibold">Teacher alignment</h2>
            <p className="mt-2 text-sm leading-6 text-slate-600">
              Administrators and teachers can use one staff foundation with
              role-specific profile sections.
            </p>
          </div>
          <div className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm">
            <ShieldCheck className="size-5 text-slate-500" aria-hidden="true" />
            <h2 className="mt-4 text-lg font-semibold">Permission aware</h2>
            <p className="mt-2 text-sm leading-6 text-slate-600">
              Sensitive personnel details can be gated behind staff profile
              permissions as access control is added.
            </p>
          </div>
        </section>

        <section aria-labelledby="administrator-list-title">
          <div className="mb-3 flex items-center justify-between">
            <h2 id="administrator-list-title" className="text-xl font-semibold">
              Administrators
            </h2>
          </div>
          <div className="grid gap-3">
            {administratorProfiles.map((profile) => (
              <Link
                key={profile.id}
                href={`/staff/administrators/${profile.id}`}
                className="group grid gap-4 rounded-lg border border-slate-200 bg-white p-4 shadow-sm transition hover:border-slate-300 hover:shadow md:grid-cols-[auto_1fr_auto]"
              >
                <div className="flex size-12 items-center justify-center rounded-md bg-slate-900 text-sm font-semibold text-white">
                  {profile.photoInitials}
                </div>
                <div>
                  <h3 className="font-semibold">
                    {profile.firstName} {profile.lastName}
                  </h3>
                  <p className="mt-1 text-sm text-slate-600">
                    {profile.jobTitle} · {profile.department}
                  </p>
                  <p className="mt-1 text-sm text-slate-500">
                    {profile.schools.map((school) => school.name).join(", ")}
                  </p>
                </div>
                <div className="flex items-center text-sm font-medium text-slate-700">
                  View profile
                  <ArrowRight
                    className="ml-2 size-4 transition group-hover:translate-x-0.5"
                    aria-hidden="true"
                  />
                </div>
              </Link>
            ))}
          </div>
        </section>
      </div>
    </main>
  );
}
