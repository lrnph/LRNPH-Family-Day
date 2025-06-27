import { type Context } from "hono";
import { Employee } from "../models/employee-entity";
import { Registration } from "../models/registration-entity";
import { familyDayDataSource, masterListDataSource } from "../db";


export const getEmployee = async (c: Context) => {
  const { id } = c.req.param()

  if (!id) {
    return c.json({ message: "The employee ID is required"}, 404)
  }
  
  try {
    // Initiate the model
    const employeeModel = masterListDataSource.getRepository(Employee)
    // Find the employee
    const employee = await employeeModel.findOneBy({ employeeID: id})
    // Return an error if the employee doesnt exist
    if (!employee) {
      return c.json({ message: 'The employee does not exist' }, 404);
    }

    const registrationModel = familyDayDataSource.getRepository(Registration);
    // Find the registration
    const registration = await registrationModel.findOneBy({ employee_id: id });
    // Return an error if the employee did not register
    if (!registration) {
      return c.json({ message: 'The employee is not registered' }, 404);
    }

    const data = {
      employeeId: employee.employeeID,
      firstName: employee.firstName,
      middleName: employee.middleName,
      lastName: employee.lastName,
      department: employee.department,
      isActive: employee.isActive,
      guests: registration.invited_guests,
    }

    return c.json(data);
  } catch (error) {
    console.error(error);
    return c.json({ message: 'Server error' }, 500);
  }
}