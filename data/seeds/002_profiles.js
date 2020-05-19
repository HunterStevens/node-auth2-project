
exports.seed = function(knex) {
  const users =[
    {
      username: "groot",
      password: "Iamgroot!",
      department: 'Booking',
    },
    {
      username: "admin",
      password: "keepitsecret,keepitsafe.",
      department: 'Booking',
    },
    {
      username: "me",
      password: "changethepass",
      department:'Media',
    },
    {
      username: "nobody",
      password: "hasnorole",
      department:'Politcs'
    },
    {
      username: "notme",
      password: "hasnorole",
      department:'Politics'
    }
  ];

  return knex('accounts').insert(users)
};
