/*
 * The downloadable CV. Server only (reads the file size at build time).
 * To update the CV, replace public/cv/Fawad_Liaqat_CV.pdf with a file of
 * the same name and rebuild; the size label updates itself.
 */
import fs from "node:fs";
import path from "node:path";

export interface CvLink {
  href: string;
  /** File name suggested to the browser when downloading. */
  fileName: string;
  /** Format and size, for example "PDF, 15 KB". */
  meta: string;
}

const FILE = "Fawad_Liaqat_CV.pdf";

export function cvLink(): CvLink {
  let meta = "PDF";
  try {
    const bytes = fs.statSync(path.join(process.cwd(), "public", "cv", FILE)).size;
    meta =
      bytes >= 1024 * 1024
        ? `PDF, ${(bytes / (1024 * 1024)).toFixed(1)} MB`
        : `PDF, ${Math.max(1, Math.round(bytes / 1024))} KB`;
  } catch {
    // File missing at build time: keep the plain label.
  }
  return { href: `/cv/${FILE}`, fileName: FILE, meta };
}
