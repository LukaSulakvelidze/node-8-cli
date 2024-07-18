#! /usr/bin/env node
const fs = require("fs/promises");
const { Command } = require("commander");
const program = new Command();

program
  .command("cityName")
  .argument("<cityName>")
  .action(async (cityName) => {
    try {
      const data = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&units=metric&appid=895284fb2d2c50a520ea537456963d9c`
      );
      const res = await data.json();
      console.log(res.main.temp);
    } catch (error) {
      console.log(error);
    }
  });

program
  .command("Add")
  .argument("<number>")
  .action(async (number) => {
    const data = await fs.readFile("data.json", "utf-8");
    const parsedData = JSON.parse(data);
    parsedData.push(number);
    await fs.writeFile("data.json", JSON.stringify(parsedData));
    console.log("Added succesfully");
  });

program.command("showAll").action(async () => {
  console.log(await fs.readFile("data.json", "utf8"));
});

program
  .command("Delete")
  .argument("<id>")
  .action(async (number) => {
    const data = await fs.readFile("data.json", "utf-8");
    const parsedData = JSON.parse(data);
    const numIndex = parsedData.findIndex((el) => el === number);
    if (numIndex === -1) throw new Error("NO");
    const splicedData = parsedData.splice(numIndex, 1);
    await fs.writeFile("data.json", JSON.stringify(parsedData));
    console.log(splicedData, "Delete succesfully");
  });
program.parse();
