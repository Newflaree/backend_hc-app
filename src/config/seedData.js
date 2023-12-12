import bcrypt from 'bcryptjs';


export const initialData = {
  users: [
    {
      location: {
        latitude: -33.609159,
        longitude: -70.5859767
      },
      name: 'Test_1',
      email: 'test1@email.com',
      password: bcrypt.hashSync( '123456' ),
      tags: [],
      role: 'USER_ROLE',
      applicationstatus: 'WITHOUT_STATUS',
    },
    {
      location: {
        latitude: -33.5184583,
        longitude: -70.6002804
      },
      name: "MALL_VESPUCIO",
      email: "narrator1@email.com",
      password: bcrypt.hashSync( '123456' ),
      tags: [ 'seguridad' ],
      role: "NARRATOR_ROLE",
      applicationstatus: 'ACTIVE_STATUS',
    },
    {
      location: {
        latitude: -33.5810468,
        longitude: -70.5894303
      },
      name: "SOTERO_PUENTE",
      email: "narrator2@email.com",
      password: bcrypt.hashSync( '123456' ),
      tags: [],
      role: "NARRATOR_ROLE",
      applicationstatus: 'ACTIVE_STATUS',
    },
    {
      location: {
        latitude: -33.6094881,
        longitude: -70.5873
      },
      name: "PLAZA_PUENTE",
      email: "narrator3@email.com",
      password: bcrypt.hashSync( '123456' ),
      tags: [],
      role: "NARRATOR_ROLE",
      applicationstatus: 'ACTIVE_STATUS',
    },
    {
      location: {
        latitude: -33.5691861,
        longitude: -70.5910864
      },
      name: "TOBALABA_PUENTE",
      email: "narrator4@email.com",
      password: bcrypt.hashSync( '123456' ),
      tags: [ 'seguridad' ],
      role: "NARRATOR_ROLE",
      applicationstatus: 'ACTIVE_STATUS',
    },
    {
      location: {
        latitude: -33.5934589,
        longitude: -70.58741
      },
      name: "INACAP_PUENTE",
      email: "narrator5@email.com",
      password: bcrypt.hashSync( '123456' ),
      tags: [],
      role: "NARRATOR_ROLE",
      applicationstatus: 'ACTIVE_STATUS',
    },
  ]
}
