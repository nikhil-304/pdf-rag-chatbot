import config from "./config.js";

const API_BASE = config.API_BASE;

export async function uploadPdf(file, replaceAll = true) {
  const fd = new FormData();
  fd.append("file", file);
  fd.append("replace_all", replaceAll.toString());
  const res = await fetch(`${API_BASE}/upload`, {
    method: "POST",
    body: fd,
  });
  if (!res.ok) throw new Error("upload failed");
  return res.json();
}

export async function askQuestion(query, k = 5) {
  const res = await fetch(`${API_BASE}/chat`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ query, k }),
  });
  if (!res.ok) {
    const t = await res.text();
    throw new Error(t || "chat failed");
  }
  return res.json(); // { answer, sources }
}

export async function clearDocuments() {
  const res = await fetch(`${API_BASE}/clear`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
  });
  if (!res.ok) throw new Error("clear failed");
  return res.json();
}

export async function getStatus() {
  const res = await fetch(`${API_BASE}/status`, {
    method: "GET",
  });
  if (!res.ok) throw new Error("status check failed");
  return res.json();
}
