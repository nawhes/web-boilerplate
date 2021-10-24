import Sequelize from 'sequelize';

import config from '#config/index';
import Users from './users.js';
import Message from './message.js';
import Receiver_ref from './receiver_ref.js';

const db = {};

const sequelize = new Sequelize(config.sequelize.database,
	config.sequelize.username,
	config.sequelize.password,
	{
		host: config.sequelize.host,
		dialect: config.sequelize.dialect
	});
db.sequelize = sequelize;
db.Sequelize = Sequelize;

const _Users = Users.init(sequelize, Sequelize);
const _Message = Message.init(sequelize, Sequelize);
const _Receiver_ref = Receiver_ref.init(sequelize, Sequelize);

_Message.belongsTo(_Receiver_ref, { as: "receiver_type_receiver_ref", foreignKey: "receiver_type" });
_Receiver_ref.hasMany(_Message, { as: "messages", foreignKey: "receiver_type" });
_Message.belongsTo(_Users, { as: "sender_user", foreignKey: "sender" });
_Users.hasMany(_Message, { as: "messages", foreignKey: "sender" });

db.Users = _Users;
db.Message = _Message;

export default db;