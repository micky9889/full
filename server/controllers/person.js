const Person = require("../models/Person");
const fs = require("fs");

exports.create = async (req, res) => {
  try {
    const { data } = req.body;
    const newData = {
      name: data,
      pic: req.file.filename,
    };
    // console.log(req.file);
    res.json(await new Person(newData).save());
  } catch (error) {
    console.log(error);
    res.status(400).send("create person failed");
  }
};
exports.list = async (req, res) => {
  res.json(await Person.find({}).sort({ createdAt: -1 }).exec());
};

exports.read = async (req, res) => {
  const persons = await Person.findOne({ _id: req.params.id }).exec();
  res.json(persons);
};

exports.update = async (req, res) => {
  try {
    const { data, fileold } = req.body;
    const newData = {
      name: data,
      pic: fileold,
    };

    if (typeof req.file !== "undefined") {
      // console.log("name kao:=> ",fileold);
      // console.log("name file:=> ",req.file);
      newData.pic = req.file.filename;
      await fs.unlink("./public/uploads/" + fileold, (err) => {
        if (err) console.log(err);
        console.log("remove succes");
      });
    }
    const updated = await Person.findOneAndUpdate(
      { _id: req.params.id },
      newData,
      { new: true }
    );
    res.json(updated);
  } catch (error) {
    console.log(error);
    res.status(400).send("update person failed");
  }
};

exports.remove = async (req, res) => {
  try {
    const deleted = await Person.findOneAndDelete({ _id: req.params.id });
    await fs.unlink("./public/uploads/" + deleted.pic, (err) => {
      if (err) console.log(err);
      console.log("remove succes");
    });
    res.json(deleted);
  } catch (error) {
    console.log(error);
    res.status(400).send("remove person failed");
  }
};
