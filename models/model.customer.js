class CustomerModel
{
	constructor(uid, first_name, last_name, email, username, password)
	{
		this.uid = uid;
		this.first_name = first_name;
		this.last_name = last_name;
		this.email = email;
		this.username = username;
		this.password = password;
	}
}

module.exports = CustomerModel;