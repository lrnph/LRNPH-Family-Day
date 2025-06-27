import { type Context } from "hono";
import { Employee } from "../models/employee-entity";
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

    const data = {
      employeeId: employee.employeeID,
      firstName: employee.firstName,
      middleName: employee.middleName,
      lastName: employee.lastName,
      department: employee.department,
      isActive: employee.isActive,
    }

    return c.json(data);
  } catch (error) {
    console.error(error);
    return c.json({ message: 'Server error' }, 500);
  }
}