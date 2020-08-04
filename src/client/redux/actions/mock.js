var users = []
var unreadMessages = []
var numOfUsers = 5
for (var i = 0; i < numOfUsers; i++) {
	users.push({
		id: i,
		firstName: 'User Number ',
		lastName: i,
		profileImage: '/assets/user.png',
		lastSeen: i < 12 ? i + ':20 AM' : 12 - i + ':PM',
		online: i % 3 === 0 ? true : false,
	})
	unreadMessages.push({
		id: i,
		count: i < 10 ? i : i - 5,
	})
}
export { unreadMessages, users }
