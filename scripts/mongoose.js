import mongoose from "mongoose";
import config from "../src/config";

const run = async () => {
  console.log(config.mongoUri);

  // await mongoose.connect(url);

  await mongoose.connect(config.mongoUri, config.mongoOptions);

  const schema = new mongoose.Schema({
    city: String,
    zip: String,
    loc: {
      y: Number,
      x: Number,
    },
    //validate: function(y){} validate object ได้
    pop: Number,
    state: {
      type: String,
      minLength: [2, "State must contains at least 2 chars"],
      maxLength: [10, "State must contains at most  10 chars"],
    },
  });
  const ZipModel = mongoose.model("zips", schema, "zips");
  //   ZipModel.findById('zip-001')
  //   ZipModel.find({});
  //   ZipModel.create();
  //   ZipModel.update({})
  //   ZipModel.deleteMany({})
  //   const zips = await ZipModel.find({});
  //   await ZipModel.updateMany({ city: "ALPINE" }, { pop: 1000 });
  //   console.log(zips[0]);
  const newZip = new ZipModel({
    city: "BKK",
    zip: "10600",
    loc: { x: 100, y: 13 },
    pop: 100000,
    state: "B",
  });
  await newZip.save();
};

run()
  .then(() => {
    console.log("Done");
    process.exit(0);
  })
  .catch((e) => {
    console.log(e);
    process.exit(1);
  });
