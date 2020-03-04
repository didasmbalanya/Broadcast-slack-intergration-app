##Broadcast 

Broadcast is a slack app that uses the slack bolt (A framework for building slack apps)
It allows a user to select a list of users from a drop down menu on the apps home.
After which a user can enter a message which will be sent as a broadcast to all the users selected.

#problem solved
- No need to look for users handle. all available on the drop down
- No need to send DM's individually to each user
- Works perfectly if you want to send to many without starting a group chat

#requried scopes:
bot:
 - chat.write
 - chat.write.customize
 - chat.write.public