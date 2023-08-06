import { getFirestoreCoverageMeta } from "./getFirestoreCoverageMeta";
import { createWriteStream } from "node:fs";
import { get } from "node:http";
import { FIREBASE_JSON, PROJECT_ID } from ".";


export async function saveCoverageReport() {
  const { coverageUrl } = getFirestoreCoverageMeta(PROJECT_ID, FIREBASE_JSON);
  const coverageFile = './firestore-coverage.html';
  const fstream = createWriteStream(coverageFile);
  await new Promise((resolve, reject) => {
    get(coverageUrl, (res) => {
      res.pipe(fstream, { end: true });
      res.on("end", resolve);
      res.on("error", reject);
    });
  });
}