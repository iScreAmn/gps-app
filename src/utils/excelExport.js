import * as XLSX from "xlsx-js-style";

/** Синий фон и белый текст для строки заголовков (строка 1). */
function applyHeaderRowStyle(worksheet) {
  const ref = worksheet["!ref"];
  if (!ref) {
    return;
  }
  const range = XLSX.utils.decode_range(ref);
  const style = {
    font: { bold: true, color: { rgb: "FFFFFF" }, name: "Calibri", sz: 11 },
    fill: { patternType: "solid", fgColor: { rgb: "2F5597" } },
    alignment: { horizontal: "center", vertical: "center", wrapText: true },
  };
  for (let c = range.s.c; c <= range.e.c; c += 1) {
    const addr = XLSX.utils.encode_cell({ r: 0, c });
    const cell = worksheet[addr];
    if (!cell) {
      continue;
    }
    cell.s = style;
  }
}

/**
 * @param {Array<{
 *   productName?: string;
 *   cleanCode: string;
 *   count?: number;
 *   timestamp: number;
 * }>} scans
 */
function buildScansWorkbook(scans) {
  if (!Array.isArray(scans) || scans.length === 0) {
    return null;
  }

  const dataForExcel = scans.map((item) => ({
    "სახელი": item.productName || "—",
    "კოდი": item.cleanCode,
    "რაოდენობა": item.count ?? 1,
    "სკანირების თარიღი": new Date(item.timestamp).toLocaleString("ru-RU"),
  }));

  const worksheet = XLSX.utils.json_to_sheet(dataForExcel);
  applyHeaderRowStyle(worksheet);

  const wscols = [{ wch: 30 }, { wch: 20 }, { wch: 10 }, { wch: 25 }];
  worksheet["!cols"] = wscols;

  const workbook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(workbook, worksheet, "Сканирования");
  return workbook;
}

/**
 * @param {Array<{
 *   productName?: string;
 *   cleanCode: string;
 *   count?: number;
 *   timestamp: number;
 * }>} scans
 */
export function exportScansToExcel(scans) {
  const workbook = buildScansWorkbook(scans);
  if (!workbook) {
    return;
  }
  const date = new Date().toISOString().slice(0, 10);
  XLSX.writeFile(workbook, `scans_report_${date}.xlsx`);
}

/**
 * @param {Array<{
 *   productName?: string;
 *   cleanCode: string;
 *   count?: number;
 *   timestamp: number;
 * }>} scans
 * @returns {{ base64: string; filename: string } | null}
 */
export function scansToXlsxBase64(scans) {
  const workbook = buildScansWorkbook(scans);
  if (!workbook) {
    return null;
  }
  const date = new Date().toISOString().slice(0, 10);
  const filename = `scans_report_${date}.xlsx`;
  const buf = XLSX.write(workbook, { bookType: "xlsx", type: "array" });
  const u8 = new Uint8Array(buf);
  let binary = "";
  const chunk = 0x8000;
  for (let i = 0; i < u8.length; i += chunk) {
    binary += String.fromCharCode.apply(null, u8.subarray(i, i + chunk));
  }
  const base64 = btoa(binary);
  return { base64, filename };
}
