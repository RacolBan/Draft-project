const faker = require('@faker-js/faker').faker
const user = {
    name: faker.name.findName(),
    author: faker.name.findName()
}

console.log(user);