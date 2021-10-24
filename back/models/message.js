import _sequelize from 'sequelize';
const { Model, Sequelize } = _sequelize;
import { camelToSnake, snakeToCamel } from "./tools.js";
import Logger from '#loaders/logger';

export default class Message extends Model {
	static init(sequelize, DataTypes) {
		super.init({
			message_id: {
				autoIncrement: true,
				type: DataTypes.INTEGER,
				allowNull: false,
				primaryKey: true
			},
			sender: {
				type: DataTypes.STRING(45),
				allowNull: false,
				references: {
					model: 'users',
					key: 'username'
				}
			},
			receiver_type: {
				type: DataTypes.STRING(10),
				allowNull: false,
				references: {
					model: 'receiver_ref',
					key: 'type'
				}
			},
			receiver_detail: {
				type: DataTypes.STRING(45),
				allowNull: true
			},
			content: {
				type: DataTypes.TEXT,
				allowNull: false
			}
		}, {
			sequelize,
			tableName: 'message',
			modelName: 'Message',
			timestamps: false,
			indexes: [
				{
					name: "PRIMARY",
					unique: true,
					using: "BTREE",
					fields: [
						{ name: "message_id" },
					]
				},
				{
					name: "fk_message_users_idx",
					using: "BTREE",
					fields: [
						{ name: "sender" },
					]
				},
				{
					name: "fk_message_receiver_ref1_idx",
					using: "BTREE",
					fields: [
						{ name: "receiver_type" },
					]
				},
			]
		});
		return Message;
	}

	static createMessage = async (message) => {
		for (const key in message) {
			const snakeCaseKey = camelToSnake(key);
			if (snakeCaseKey !== key) {
				const tmp = message[key];
				message[snakeCaseKey] = tmp;
				delete message[key];
			}
		}
		this.create(message).then((res) => {
			Logger.info('Message stored');
			return res;
		}).catch((err) => {
			Logger.error(err);
			return null;
		})
	}

	static getMessageToAll = async () => {
		try {
			const res = await this.findAll(
				{
					// where: { receiver_type: 'Everyone' },
					limit: 20,
					order: [['updatedAt', 'DESC']]
				}
			)
			if (res === null)
				return null;
			const message = res.reduce((prev, curr) => {
				prev.push(curr?.dataValues);
				return prev;
			}, []);

			const result = message.map((_message) => {
				for (const key in _message) {
					const camelCaseKey = snakeToCamel(key);
					if (camelCaseKey !== key) {
						const tmp = _message[key];
						_message[camelCaseKey] = tmp;
						delete _message[key];
					}
				}
				return _message;
			})
			return result;
		} catch (err) {
			throw err;
		}
	}
}
