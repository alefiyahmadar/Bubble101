import { v4 as uuid } from "uuid";

/**
 * User Database can be added here.
 * You can add default users of your wish with different attributes
 * */

export const users = [
  {
    _id: uuid(),

    someUserAttribute1: "Adarsh",
    someUserAttribute2: "Balika",
    username: "adarshbalika",
    password: "adarshBalika123",
    profileImg:
      "https://images.unsplash.com/photo-1483909796554-bb0051ab60ad?q=80&w=1000&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8Z2lybCUyMHByb2ZpbGV8ZW58MHx8MHx8fDA%3D",
    followers: [],
    following: [],
    bookMark: [],
    status: "HalalAsHell",
  },
  {
    _id: uuid(),
    someUserAttribute1: "Shubham",
    someUserAttribute2: "Soni",
    username: "shubhamsoni",
    password: "shubhamsoni890",

    profileImg:
      "https://images.unsplash.com/photo-1529665253569-6d01c0eaf7b6?q=80&w=1000&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8cHJvZmlsZXxlbnwwfHwwfHx8MA%3D%3D",
    followers: [],
    following: [],
    status: "LiviinnTruee",
    bookMark: [],
  },

  {
    _id: uuid(),
    someUserAttribute1: "Soham",
    someUserAttribute2: "Shah",
    username: "sohamshah",
    password: "sohamshah567",

    profileImg:
      "https://media.sproutsocial.com/uploads/2022/06/profile-picture.jpeg",
    followers: [],
    following: [],
    status: "Sohaammm Heree",
    bookMark: [],
  },
  {
    _id: uuid(),
    someUserAttribute1: "Mary",
    someUserAttribute2: "Jane",
    username: "maryy",
    password: "maryjane990",

    profileImg:
      "https://wallpapers.com/images/hd/aesthetic-profile-picture-1rgefsojys253ard.jpg",
    followers: [],
    following: [],
    status: "MaryGoAround",
    bookMark: [],
  },
];
