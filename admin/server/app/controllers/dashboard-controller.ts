import type { Context } from "hono"
import { Claim } from "../models/claim-entity"
import { Booth } from "../models/booth-entity"
import { Registration } from "../models/registration-entity"
import { familyDayDataSource } from "../database/db"



export const getChart = async (c: Context) => {
  let { department } = c.req.query()

  try {
    const claimRepository = familyDayDataSource.getRepository(Claim)
    const boothRepository = familyDayDataSource.getRepository(Booth)
    const registrationRepository = familyDayDataSource.getRepository(Registration)
    
    let claims;
    if (department === 'All') {
      claims = await claimRepository.find()
    } else {
      claims = await claimRepository.findBy({ department })
    }
    
    // Get registrations similarly
    let registrationPerDepartment;
    if (department === 'All') {
      registrationPerDepartment = await registrationRepository.find()
    } else {
      registrationPerDepartment = await registrationRepository.find({ where: { department }})
    }
    
    const totalPerDepartmentAttendees = registrationPerDepartment.reduce((total, registration) => {
      return total + (registration.invited_guests + 1);
    }, 0);

    const booths = await boothRepository.findBy({ is_active: true });


    const boothClaims = booths.map(booth => {
      const claimsPerBooth = claims.filter(claim => claim.booth_id === booth.id);

      const claimedCount = claimsPerBooth.reduce((sum, claim) => {
        const registration = registrationPerDepartment.find(r => r.employee_id === claim.employee_id);
        return sum + (registration ? registration.invited_guests + 1 : 1);
      }, 0);

      return {
        name: booth.booth_name,
        claimed: claimedCount,
        unclaimed: totalPerDepartmentAttendees - claimedCount
      };
    });


    return c.json({ data: boothClaims}, 200);

  } catch (error) {
    console.log(error)
    return c.json({ message: 'Server error' }, 500);
  }
}


export const getAnalytics = async (c: Context) => {


  try {
    const claimRepository = familyDayDataSource.getRepository(Claim)
    const boothRepository = familyDayDataSource.getRepository(Booth)
    const registrationRepository = familyDayDataSource.getRepository(Registration)

    const totalRegistration = await registrationRepository.count()
    const totalClaims = await claimRepository.count()
    const totalBooths = await boothRepository.countBy({ is_active: true})

    // Get registrations similarly
    const registrationPerDepartment = await registrationRepository.find()

    const totalAttendees = registrationPerDepartment.reduce((total, registration) => {
      return total + (registration.invited_guests + 1);
    }, 0);


    const data = {
      totalRegistered: totalRegistration, // You can adjust if you want to calculate this
      totalAttendees: totalAttendees,  // Same here
      totalBooth: totalBooths,
      totalClaims: totalClaims,
    }

    return c.json({data}, 200);

  } catch (error) {
    return c.json({ message: 'Server error' }, 500);
  }
}
