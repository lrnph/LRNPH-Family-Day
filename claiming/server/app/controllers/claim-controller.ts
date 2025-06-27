import { type Context } from "hono";
import { Registration } from "../models/registration-entity";
import { Employee } from "../models/employee-entity";
import { Booth } from "../models/booth-entity";
import { Claim } from "../models/claim-entity";
import { familyDayDataSource, masterListDataSource } from "../db";


export const claimRewards = async (c: Context) => {
  const { employee_id, booth_id } = await c.req.json();

  try {
    // Initiate the model
    const employeeModel = masterListDataSource.getRepository(Employee)
    const registrationModel = familyDayDataSource.getRepository(Registration);
    const boothModel = familyDayDataSource.getRepository(Booth)

    const employee = await employeeModel.findOneBy({ employeeID: employee_id})
    
    if (!employee) {
      return c.json({ message: 'The employee does not exist' }, 404);
    }

    const registration = await registrationModel.findOneBy({ employee_id });
    // Return an error if the employee did not register
    if (!registration) {
      return c.json({ message: 'The employee is not registered' }, 404);
    }

    const booth = await boothModel.findOneBy({ id: booth_id, is_active: true })

    if (!booth) {
      return c.json({ message: "The booth does not exist" }, 404)
    }

    const claimModel = familyDayDataSource.getRepository(Claim)
    const claim = await claimModel.findOneBy({ employee_id, booth_id })

    if (claim) {
      return c.json({ message: "The employee had already claimed."}, 404)
    }

    await claimModel.insert({
      employee_id, 
      booth_id,
      booth_name: booth.booth_name,
      department: employee.department,
      first_name: employee.firstName,
      middle_name: employee.middleName,
      last_name: employee.lastName,
      created_at: new Date(),
    })

    const data = {
      employeeId: employee.employeeID,
      firstName: employee.firstName,
      middleName: employee.middleName,
      lastName: employee.lastName,
      department: employee.department,
      guests: registration.invited_guests
    }

    return c.json(data, 200);
  } catch (error) {
    console.error(error);
    return c.json({ message: 'Server error' }, 500);
  }
}
