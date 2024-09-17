import qrcodegen from "qrcode-generator";

export default function generateCompactQRSVG(data: string, color = "#6a1a4c") {
  const qr = qrcodegen(0, "L"); // Lower error correction level 'L' for smaller size
  qr.addData(data);
  qr.make();

  const moduleCount = qr.getModuleCount();
  let path = "";

  for (let y = 0; y < moduleCount; y++) {
    let consecutiveX = -1; // To track consecutive dark modules in the same row
    for (let x = 0; x < moduleCount; x++) {
      if (qr.isDark(y, x)) {
        if (consecutiveX === -1) {
          consecutiveX = x;
        }
      } else if (consecutiveX !== -1) {
        // Group consecutive modules in the same row into a single path command
        path += `M${consecutiveX},${y}h${x - consecutiveX}v1h-${
          x - consecutiveX
        }z`;
        consecutiveX = -1;
      }
    }
    if (consecutiveX !== -1) {
      // Close off the row if there were dark modules at the end of the row
      path += `M${consecutiveX},${y}h${moduleCount - consecutiveX}v1h-${
        moduleCount - consecutiveX
      }z`;
    }
  }

  // Create the compact SVG string
  const svgString = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${moduleCount} ${moduleCount}"><path fill="${color}" d="${path}"/></svg>`;

  // Compress the SVG string by removing redundant spaces and newlines
  const minifiedSVG = svgString.replace(/\s+/g, " ").trim();

  // Convert the minified SVG string to Base64
  return Buffer.from(minifiedSVG).toString("base64");
}
