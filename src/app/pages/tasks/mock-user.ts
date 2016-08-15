import { User } from './user'

export const mockUser: User = {
  username: "pandypaw",
  password: "passwordy",
  firstname: "Nasta",
  lastname: "Schwimmer",
  email: "nschwimmer@schwin.com",
  notificationFrequency: 1,
  description: "I am a person that has an account on this website.",
  assets: ["Santa", "Alien", "Vector", "Surfer"],
  locations: ["San Diego", "Houston", "Chicago"],
  image: "IMAGE",
  myTasks: [1, 5],
  participatingTasks: [2, 4],
  specificallyRequest: [3] // ON TIMEOUT: THROW AWAY, ELSE MOVE TO PARTICIPATING TASKS
}