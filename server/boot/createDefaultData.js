module.exports = function(app){
	var User = app.models.user;
	var Role = app.models.Role;
	var RoleMapping = app.models.RoleMapping;

	var roles = [{
		name: 'administrator',
		users: [{
			username: 'administrator',
			email: 'administrator@qq.com',
			password: 'b933defa'
		}]
	}]

	if (!!User) {
		roles.forEach(function(role){
			Role.findOrCreate({
				where: { name: role.name }
			}, {
				name: role.name
			}, function(err, createRole, created) {
				if (err) {
					console.error('error create role');
				}

				role.users.forEach(function (roleUser) {
					User.findOrCreate({
						where: {username: roleUser.username}
					}, roleUser,
						function (err, createdUser, created) {
							if (err) {
								console.error('error creating roleUser', err);
							}

							createRole.principals.create({
								principalType: RoleMapping.USER,
								principalId: createdUser.id
							}, function (err, rolePrincipal) {
								if (err) {
									console.error('error create rolePrincipal');
								}
							})
						}
					)
				})
			})
		})
	}
}