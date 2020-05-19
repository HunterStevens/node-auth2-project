
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('profiles').del()
    .then(function () {
      // Inserts seed entries
      return knex('profiles').insert([
        {
          username: "rocket",
          password: "Iamnotgroot!",
          department: 'Booking',
        },
        {
          username: "admin",
          password: "keepitsecret",
          department: 'Booking',
        },
        {
          username: "me",
          password: "changethepast",
          department:'Media',
        },
        {
          username: "nobody",
          password: "imsolonely",
          department:'Politcs'
        },
        {
          username: "notme",
          password: "hasnorole",
          department:'Politics'
        }
      ]);
    });
};
