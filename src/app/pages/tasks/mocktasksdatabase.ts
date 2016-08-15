export class MockTasksDatabase {
  createDb() {
    let tasks = [
      { // ACTIVE, MY TASKS
        id: 1,
        startTime: new Date(2017, 1),
        endTime: new Date(2017, 2),
        description: "Bonfire",
        assets: ["fire making", "praying", "swimming"]
      },
      { // ACTIVE (CURRENTLY)
        id: 2,
        startTime: new Date(2016, 7, 19),
        endTime: new Date(2016, 7, 28),
        description: "Furniture moving",
        assets: ["lifting", "vehicle", "Jesus"]
      },
      { //SPECIFICALLY REQUEST (CHECK DATE ON TIMEOUTJ)
        id: 3,
        startTime: new Date(2017, 4),
        endTime: new Date(2017, 5),
        description: "Furniture",
        assets: ["laughing", "getting hurt", "lifting"]
      },
      { // PREVIOUS TASK
        id: 4,
        startTime: new Date(2014, 1),
        endTime: new Date(2014, 2),
        description: "Drinking",
        assets: ["low tolerance", "laughing", "time"]
      },
      {// PREVIOUS TASK, MY TASKS 
        id: 5,  
        startTime: new Date(2015, 1),
        endTime: new Date(2015, 2),
        description: "High School Graduation",
        assets: ["vehicle"]
      },
      { // POTENTIAL TASK 
        id: 6,
        startTime: new Date(2017, 8),
        endTime: new Date(2017, 9),
        description: "Returning to school",
        assets: ["vehicle", "lifting", "running"]
      },
      { // POTENTIAL TASK
        id: 7,
        startTime: new Date(2018, 1),
        endTime: new Date(2018, 2),
        description: "Waterskiing",
        assets: ["lifting", "boating"]
      },
      { // POTENTIAL TASK
        id: 8,
        startTime: new Date(2019, 8),
        endTime: new Date(2019, 10),
        description: "Bonfire",
        assets: ["vehicle", "school"]
      },
      { // NO MATCHES (BUT WHEN THE SEARCH CHANGES)
        id: 9,
        startTime: new Date(2018, 2),
        endTime: new Date(2018, 3),
        description: "Card Gathering",
        assets: ["board games", "enthusiasm"]
      },
      { // NO MATCHES (BUT WHEN THE SEARCH CHANGES)
        id: 10,
        startTime: new Date(2018, 3),
        endTime: new Date(2018, 5),
        description: "Theater Play",
        assets: ["listening", "enthusiasm"]
      }
    ]
    return {tasks};
  }
}



// export class InMemoryDataService {
//   createDb() {
//     let heroes = [
//       { 
//         username: "PandaMan",
//         password: "pandapassword",
//         firstname: "Peter",
//         lastname: "George",
//         email: "pandaman@gmail.com",
//         notificationFrequency: 1
//       },
//       { 
//         username: "KoalaMan",
//         password: "koalapassword",
//         firstname: "Euco",
//         lastname: "Calypus",
//         email: "koalaman@gmail.com",
//         notificationFrequency: 2
//       },
//       { 
//         username: "Kingman",
//         password: "kingpassword",
//         firstname: "Kingly",
//         lastname: "Kinger",
//         email: "kingman@gmail.com",
//         notificationFrequency: 0
//       }
//     ];
//     return { heroes };
//   }
// }