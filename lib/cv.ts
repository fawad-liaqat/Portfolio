/*
 * The CV. The site links to the /cv/ page, which shows the CV as an image
 * first and offers the PDF as a download.
 *
 * To update the CV: replace public/cv/Fawad_Liaqat_CV.pdf with a file of the
 * same name, run `bash scripts/make-cv-image.sh` from the site folder to
 * redraw public/cv/Fawad_Liaqat_CV.png, update CV_IMAGE.alt below if the
 * content changed, and rebuild.
 */

export interface CvLink {
  /** The CV page. Header, phone menu and contact links go here. */
  page: string;
  /** The PDF itself, for the Download button on the CV page. */
  pdf: string;
  /** File name suggested to the browser when downloading. */
  fileName: string;
}

const FILE = "Fawad_Liaqat_CV.pdf";

export function cvLink(): CvLink {
  return { page: "/cv/", pdf: `/cv/${FILE}`, fileName: FILE };
}

/** The rendered first page of the CV. Size matches the PNG from make-cv-image.sh. */
export const CV_IMAGE = {
  src: "/cv/Fawad_Liaqat_CV.png",
  width: 1275,
  height: 1650,
  alt:
    "One page CV. Headline: digital payments and open banking, with a focus on financial inclusion, customer protection and customer experience. " +
    "Sections: professional summary; skills in product, payments and open banking, and technical tools; " +
    "selected work (the four part series on Pakistan's digital public infrastructure, the Raast Adoption Gap Tracker, AwaazOnboard and a Pakistan fintech ecosystem mapping); " +
    "experience (moderator of an industry panel at FAST NUCES with JazzCash and Jazz product managers, and an AI research internship at Texinity Technologies); " +
    "education and training (BS Financial Technology at FAST NUCES Islamabad, three Saïd Business School courses on Coursera, and the EAG Associate programme). " +
    "The PDF download has the same content as selectable text.",
};
