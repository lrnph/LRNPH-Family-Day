import { type Context } from "hono";
import { Registration } from "../models/registration-entity";
import { Employee } from "../models/employee-entity";
import { familyDayDataSource, masterListDataSource } from "../db";


export const createRegistration = async (c: Context) => {
  const { employee_id, invited_guests } = await c.req.json();

  try {
    // Initiate the model
    const employeeModel = masterListDataSource.getRepository(Employee)
    const registrationModel = familyDayDataSource.getRepository(Registration);

    const employee = await employeeModel.findOneBy({ employeeID: employee_id})
    
    if (!employee) {
      return c.json({ message: 'The employee does not exist' }, 404);
    }

    const registration = await registrationModel.findOneBy({ employee_id: employee_id})

    if (registration) {
      return c.json({ message: "The employee is already registered!"}, 404)
    }

    await registrationModel.insert({
      employee_id, 
      invited_guests,
      department: employee.department,
      first_name: employee.firstName,
      middle_name: employee.middleName,
      last_name: employee.lastName,
    })

    return c.json({ message: "The employee has been registered"}, 200);
  } catch (error) {
    console.error(error);
    return c.json({ message: 'Server error' }, 500);
  }
}
