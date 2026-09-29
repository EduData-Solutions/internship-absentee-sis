export type StaffProfile = {
  id: string;
  firstName: string;
  lastName: string;
  photoInitials: string;
  jobTitle: string;
  district: string;
  schools: Array<{
    name: string;
    scope: string;
  }>;
  workEmail: string;
  workPhone: string;
  extension?: string;
  department: string;
  roles: Array<{
    name: string;
    permissionSummary: string;
  }>;
  certifications: Array<{
    type: string;
    area: string;
    issuingAuthority: string;
    issueDate: string;
    expirationDate?: string;
  }>;
};

export const administratorProfiles: StaffProfile[] = [
  {
    id: "maria-santos",
    firstName: "Maria",
    lastName: "Santos",
    photoInitials: "MS",
    jobTitle: "Principal",
    district: "EduSchool Unified District",
    schools: [
      {
        name: "Northview High School",
        scope: "Primary assignment",
      },
      {
        name: "District Leadership Team",
        scope: "District-wide committee",
      },
    ],
    workEmail: "m.santos@school.edu",
    workPhone: "(555) 014-2290",
    extension: "1804",
    department: "School Administration",
    roles: [
      {
        name: "School Administrator",
        permissionSummary:
          "Can manage attendance review, school staff, school reports, and family communications.",
      },
      {
        name: "Attendance Approver",
        permissionSummary:
          "Can review attendance submissions and approve absence corrections.",
      },
    ],
    certifications: [
      {
        type: "Administrative Services Credential",
        area: "K-12 School Administration",
        issuingAuthority: "State Department of Education",
        issueDate: "2021-07-01",
        expirationDate: "2027-06-30",
      },
      {
        type: "Teaching Credential",
        area: "Secondary Mathematics",
        issuingAuthority: "State Department of Education",
        issueDate: "2015-08-15",
        expirationDate: "2029-08-14",
      },
    ],
  },
];

export function getAdministratorProfile(id: string) {
  return administratorProfiles.find((profile) => profile.id === id);
}
