import * as XLSX from "xlsx";
import { Context } from "hono";
import { Claim } from "../models/claim-entity";
import { Registration } from "../models/registration-entity";
import { familyDayDataSource } from "../database/db";

export const exportToExcel = async (c: Context) => {
  try {
    const claimRepository = familyDayDataSource.getRepository(Claim);
    const registrationRepository = familyDayDataSource.getRepository(Registration);

    const claims = await claimRepository.find()

    const registrations = await registrationRepository.find();

    const wb = XLSX.utils.book_new();

    XLSX.utils.book_append_sheet(wb, XLSX.utils.json_to_sheet(claims), "Claims");
    XLSX.utils.book_append_sheet(wb, XLSX.utils.json_to_sheet(registrations), "Registrations");

    const excelBuffer = XLSX.write(wb, { type: "buffer", bookType: "xlsx" });

    return c.body(excelBuffer, 200, {
      "Content-Type": "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
      "Content-Disposition": "attachment; filename=Family_Day_Booth_Report_.xlsx",
    });

  } catch (error) {
    console.error("Error exporting to Excel:", error);
    return c.text("Internal Server Error", 500);
  }
};
