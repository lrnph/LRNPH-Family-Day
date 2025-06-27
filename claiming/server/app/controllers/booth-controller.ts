import { type Context } from "hono";
import { familyDayDataSource } from "../db";
import { Booth } from "../models/booth-entity";

export const getBooth = async (c: Context) => {

  const { filter } = c.req.query()

  try {
    const boothModel = familyDayDataSource.getRepository(Booth);
    let booths;
    if (filter === 'active') {
      booths = await boothModel.findBy({ is_active: true });
    } else {
      booths = await boothModel.find();
    }
    return c.json(booths);
  } catch (error) {
    console.error(error);
    return c.json({ message: 'Failed to fetch booths' }, 500);
  }
}

