import Sample, { SampleModel } from "../model/Payment";
import { Types } from "mongoose";

async function findById(id: Types.ObjectId): Promise<Sample | null> {
  return SampleModel.findOne({ _id: id, status: false }).lean().exec();
}
async function findBy15Minute(id: Types.ObjectId): Promise<Sample | null> {
  const fifteenMinutesAgo = new Date(Date.now() - 15 * 60 * 1000);
  return SampleModel.findOne({
    user: id,
    status: false,
    createdAt: { $gte: fifteenMinutesAgo },
  })
    .lean()
    .exec();
}
async function create(sample: Sample): Promise<Sample> {
  const now = new Date();
  sample.createdAt = now;
  sample.updatedAt = now;
  const created = await SampleModel.create(sample);
  await created.populate("user bank");
  return created.toObject();
}

async function update(sample: Sample): Promise<Sample | null> {
  sample.updatedAt = new Date();
  return SampleModel.findByIdAndUpdate(sample._id, sample, { new: true })
    .lean()
    .exec();
}

export default {
  findById,
  create,
  update,
  findBy15Minute,
};
