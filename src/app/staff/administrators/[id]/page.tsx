import Link from "next/link";
import { notFound } from "next/navigation";
import {
  ArrowLeft,
  BadgeCheck,
  Building2,
  CalendarClock,
  Edit,
  Mail,
  Phone,
  ShieldCheck,
} from "lucide-react";

import { getAdministratorProfile } from "@/lib/staff-profile-data";

type PageProps = {
  params: Promise<{
    id: string;
  }>;
};

export default async function AdministratorProfilePage({ params }: PageProps) {
  const { id } = await params;
  const profile = getAdministratorProfile(id);

  if (!profile) {
    notFound();
  }

  return (
    <main className="min-h-screen bg-slate-50 text-slate-950">
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-6 px-6 py-8 lg:px-8">
        <Link
          href="/"
          className="inline-flex w-fit items-center gap-2 text-sm font-medium text-slate-600 hover:text-slate-950"
        >
          <ArrowLeft className="size-4" aria-hidden="true" />
          Staff workspace
        </Link>

        <section className="rounded-lg border border-slate-200 bg-white p-6 shadow-sm">
          <div className="flex flex-col gap-6 md:flex-row md:items-start md:justify-between">
            <div className="flex flex-col gap-5 sm:flex-row">
              <div className="flex size-24 items-center justify-center rounded-lg bg-slate-900 text-2xl font-semibold text-white">
                {profile.photoInitials}
              </div>
              <div>
                <p className="text-sm font-medium text-slate-500">
                  {profile.department}
                </p>
                <h1 className="mt-1 text-3xl font-semibold tracking-tight">
                  {profile.firstName} {profile.lastName}
                </h1>
                <p className="mt-2 text-lg text-slate-700">{profile.jobTitle}</p>
                <div className="mt-4 flex flex-wrap gap-2 text-sm">
                  <span className="inline-flex items-center rounded-md bg-slate-100 px-3 py-1 font-medium text-slate-700">
                    {profile.district}
                  </span>
                  <span className="inline-flex items-center rounded-md bg-emerald-50 px-3 py-1 font-medium text-emerald-800">
                    Active staff profile
                  </span>
                </div>
              </div>
            </div>
            <button
              type="button"
              className="inline-flex h-9 w-fit items-center justify-center gap-2 rounded-lg border border-slate-300 bg-white px-3 text-sm font-medium text-slate-700 shadow-sm transition hover:bg-slate-50"
            >
              <Edit className="size-4" aria-hidden="true" />
              Edit profile
            </button>
          </div>
        </section>

        <div className="grid gap-6 lg:grid-cols-[1fr_360px]">
          <div className="flex flex-col gap-6">
            <section className="rounded-lg border border-slate-200 bg-white p-6 shadow-sm">
              <h2 className="text-lg font-semibold">Assignments</h2>
              <div className="mt-4 grid gap-3">
                {profile.schools.map((school) => (
                  <div
                    key={school.name}
                    className="flex gap-3 rounded-lg border border-slate-200 p-4"
                  >
                    <Building2
                      className="mt-0.5 size-5 text-slate-500"
                      aria-hidden="true"
                    />
                    <div>
                      <h3 className="font-medium">{school.name}</h3>
                      <p className="mt-1 text-sm text-slate-600">
                        {school.scope}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            <section className="rounded-lg border border-slate-200 bg-white p-6 shadow-sm">
              <h2 className="text-lg font-semibold">EduSchool roles</h2>
              <div className="mt-4 grid gap-3">
                {profile.roles.map((role) => (
                  <div
                    key={role.name}
                    className="rounded-lg border border-slate-200 p-4"
                  >
                    <div className="flex items-center gap-2">
                      <ShieldCheck
                        className="size-4 text-slate-500"
                        aria-hidden="true"
                      />
                      <h3 className="font-medium">{role.name}</h3>
                    </div>
                    <p className="mt-2 text-sm leading-6 text-slate-600">
                      {role.permissionSummary}
                    </p>
                  </div>
                ))}
              </div>
            </section>

            <section className="rounded-lg border border-slate-200 bg-white p-6 shadow-sm">
              <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
                <h2 className="text-lg font-semibold">Certifications</h2>
                <span className="inline-flex w-fit items-center gap-2 rounded-md bg-amber-50 px-3 py-1 text-sm font-medium text-amber-800">
                  <CalendarClock className="size-4" aria-hidden="true" />
                  Expiration-ready data
                </span>
              </div>
              <div className="mt-4 overflow-hidden rounded-lg border border-slate-200">
                <table className="w-full text-left text-sm">
                  <thead className="bg-slate-100 text-slate-600">
                    <tr>
                      <th className="px-4 py-3 font-medium">Type</th>
                      <th className="px-4 py-3 font-medium">Area</th>
                      <th className="px-4 py-3 font-medium">Authority</th>
                      <th className="px-4 py-3 font-medium">Issued</th>
                      <th className="px-4 py-3 font-medium">Expires</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-200">
                    {profile.certifications.map((certification) => (
                      <tr key={`${certification.type}-${certification.area}`}>
                        <td className="px-4 py-3 font-medium">
                          {certification.type}
                        </td>
                        <td className="px-4 py-3 text-slate-700">
                          {certification.area}
                        </td>
                        <td className="px-4 py-3 text-slate-700">
                          {certification.issuingAuthority}
                        </td>
                        <td className="px-4 py-3 text-slate-700">
                          {certification.issueDate}
                        </td>
                        <td className="px-4 py-3 text-slate-700">
                          {certification.expirationDate ?? "No expiration"}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </section>
          </div>

          <aside className="flex flex-col gap-6">
            <section className="rounded-lg border border-slate-200 bg-white p-6 shadow-sm">
              <h2 className="text-lg font-semibold">Contact</h2>
              <div className="mt-4 space-y-4 text-sm">
                <a
                  href={`mailto:${profile.workEmail}`}
                  className="flex items-center gap-3 text-slate-700 hover:text-slate-950"
                >
                  <Mail className="size-4 text-slate-500" aria-hidden="true" />
                  {profile.workEmail}
                </a>
                <div className="flex items-center gap-3 text-slate-700">
                  <Phone className="size-4 text-slate-500" aria-hidden="true" />
                  <span>
                    {profile.workPhone}
                    {profile.extension ? ` ext. ${profile.extension}` : ""}
                  </span>
                </div>
              </div>
            </section>

            <section className="rounded-lg border border-slate-200 bg-white p-6 shadow-sm">
              <div className="flex items-center gap-2">
                <BadgeCheck
                  className="size-5 text-slate-500"
                  aria-hidden="true"
                />
                <h2 className="text-lg font-semibold">Access note</h2>
              </div>
              <p className="mt-3 text-sm leading-6 text-slate-600">
                This screen shows work profile details only. Future sensitive
                personnel fields should be rendered from permission-gated
                sections instead of this public staff profile summary.
              </p>
            </section>
          </aside>
        </div>
      </div>
    </main>
  );
}
