const faker = require('faker');

const db = require('../config/connection');
const { User, Meeting, Team } = require('../models');
const { gql } = require('apollo-server-express');

db.once('open', async () => {
  await User.deleteMany({});
  await Team.deleteMany({});
  await Meeting.deleteMany({});

  // create user data
  const createdUsers = [];

  for (let i = 0; i < 100; i += 1) {
    const username = faker.internet.userName();
    const email = faker.internet.email(username);
    const password = "123456" //faker.internet.password();

    const createdUser = await User.create({
      username: username,
      email: email,
      password: password
    });
    gql`
      mutation addSeedUser($userId: userId) {
        addUser(userId: $userId) {
          token
          user {
            _id
            username
          }
        }
      }
    `;
    createdUsers.push(createdUser);
  }

  const createdTeams = [];

  for(let i = 0; i < 98; i += 1) {
    const companyName = faker.company.companyName();

    //Create barebones team
    const createdTeam = await Team.create({
      name: companyName,
    });
  
    for(let j = 0; j < 9; j += 1) {
      const { _id: userId } = createdUsers[i];
      i++
      let memberId = userId;
      await Team.updateOne(
        { _id: createdTeam._id },
        { $push: { members: memberId} },
      );

      await User.updateOne(
        {_id: memberId },
        { team: createdTeam._id }
      );
    }
    const { _id: userId } = createdUsers[i];
    await User.updateOne(
      {_id: userId },
      { team: createdTeam._id }
    );
    const updatedTeam = await Team.findByIdAndUpdate(
      { _id: createdTeam._id },
      { $push: { admins: userId, members: userId}
      },
      { new: true,
        lean: true
      }
    );
    createdTeams.push(updatedTeam);
  }

  var createdMeetings = [];

  for(let i = 0; i < 300; i++){
    const meetingTitle = faker.company.bs();
    const meetingDate = faker.date.between('2021-01-01', '2021-12-31');
    const meetingMinutes = `# ${faker.company.bsNoun()}
## ${faker.company.bsNoun()}
1. ${faker.company.catchPhrase()}
2. ${faker.company.catchPhrase()}
3. ${faker.company.catchPhrase()}
## ${faker.company.bsNoun()}
* ${faker.company.catchPhrase()}
* ${faker.company.catchPhrase()}
* ${faker.company.catchPhrase()}
`;

    //Create barebones meeting
    const createdMeeting = await Meeting.create({
      title: meetingTitle,
      date: meetingDate,
      minutes: meetingMinutes,
    });

    //0-8 plus 2 returns 2-10 number of invitees
    var numOfInvitees = Math.floor(Math.random() * 8) + 2;
    const { members: memberArr } = createdTeams[Math.floor(Math.random() * createdTeams.length)]
    for(let j= 0; j < numOfInvitees; j++)
    {
      inviteeId = memberArr[j];
      //Add meeting to users
      await User.updateOne(
        { _id: inviteeId },
        { $push: { meetings: createdMeeting._id }}
      );
      //Update meeting with invitees
      await Meeting.updateOne(
        { _id: createdMeeting._id },
        { $push: { invitees: inviteeId} }
      );
    }

    var hostIndex = Math.floor(Math.random() * memberArr.length);
    var recordKeeperIndex = Math.floor(Math.random() * memberArr.length);
    const meetingHost = memberArr[hostIndex];
    const meetingRecordKeeper = memberArr[recordKeeperIndex];

  //Final update to meeting
  const updatedMeeting = await Meeting.findByIdAndUpdate(
    { _id: createdMeeting._id },
    {
      recordKeeper: meetingRecordKeeper,
      host: meetingHost
    },
    {new: true}
  );
    createdMeetings.push(updatedMeeting);  
  }

  console.log('all done!');
  process.exit(0);
});