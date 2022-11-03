const express = require('express')
const path = require('path')
const cors = require('cors')
const volleyball = require('volleyball')
const app = express()
const Sequelize = require('sequelize')
const { STRING } = require('sequelize')
const sequelize = new Sequelize(process.env.DATABASE_URL || "postgres://localhost/strixhaven_db")

// static middleware
app.use(express.static(path.join(__dirname, '..','public')))

app.use(cors())
app.use(volleyball)

app.use("*", (req, res) => {
  res.sendFile(path.join(__dirname, "../public/index.html"));
});

const Campuses = sequelize.define("campus", {
  name: {
    type: STRING,
    allowNull: false
  }
})

const syncDB = async () => {
  await sequelize.sync({force: true})

  console.log("Creating Campuses")

  await Campuses.create({
    name: "Prismari"
  })
  await Campuses.create({
    name: "Quandix"
  })
  await Campuses.create({
    name: "Lorehold"
  })
  await Campuses.create({
  name: "Witherbloom",
  });
  await Campuses.create({
    name: "Silverquill",
  });

  console.log("Finished Creating Campuses")
}

const startUp = async () => {
  try {
    console.log("Connecting to Strixhaven Database")
    await syncDB()
    console.log("Database connected")
  } catch (error) {
    console.log(error)
  }
}

startUp()

module.exports = {Campuses, app};

