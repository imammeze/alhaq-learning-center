import { fetchWithAuth } from "./auth";

export async function getChildren() {
  const res = await fetchWithAuth("/parent/children");
  return res.json();
}

export async function registerNewChild(data: any) {
  const res = await fetchWithAuth("/parent/children/register", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  return res.json();
}

export async function updateChildAccount(studentId: string, data: any) {
  const res = await fetchWithAuth(`/parent/children/${studentId}/account`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  return res.json();
}

export async function getChildRegistrations(studentId: string) {
  const res = await fetchWithAuth(`/parent/children/${studentId}/registrations`);
  return res.json();
}

export async function getChildGrades(studentId: string) {
  const res = await fetchWithAuth(`/parent/children/${studentId}/grades`);
  return res.json();
}

export async function getChildSchedules(studentId: string) {
  const res = await fetchWithAuth(`/parent/children/${studentId}/schedules`);
  return res.json();
}

export async function getStudentProfile() {
  const res = await fetchWithAuth("/student/profile");
  return res.json();
}

export async function getStudentModules() {
  const res = await fetchWithAuth("/student/modules");
  return res.json();
}

export async function getStudentRegistrations() {
  const res = await fetchWithAuth("/student/registrations");
  return res.json();
}

export async function getMe() {
  const res = await fetchWithAuth("/me");
  return res.json();
}
