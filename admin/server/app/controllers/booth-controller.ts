import { type Context } from "hono";
import { Booth } from "../models/booth-entity";
import { familyDayDataSource } from "../database/db";

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
    return c.json(booths, 200);
  } catch (error) {
    return c.json({ message: 'Failed to fetch booths' }, 500);
  }
}

export const createBooth = async (c: Context) => {
  try {
    const { booth_name } = await c.req.json();

    const boothModel = familyDayDataSource.getRepository(Booth);

    const newBooth = boothModel.insert({booth_name, is_active: true});

    return c.json(newBooth, 200);
  } catch (error) {
    return c.json({ message: 'Failed to create booth' }, 500);
  }
}

export const updateBooth = async (c: Context) => {
  try {
    const { booth_id, status } = await c.req.json()

    const boothModel = familyDayDataSource.getRepository(Booth)

    await boothModel.update({ id: booth_id }, { is_active: status });

    return c.json({ message: "Booth updated successfully." });
  } catch (error) {
    return c.json({ message: "Internal server error." }, 500);
  }
}