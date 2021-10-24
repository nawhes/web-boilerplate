import Sequelize from "sequelize";
import { camelToSnake, snakeToCamel } from "./tools.js";

export default class Users extends Sequelize.Model {
	static init(sequelize, DataTypes) {
		super.init({
			email: {
				type: DataTypes.STRING(45),
				allowNull: true
			},
			username: {
				type: DataTypes.STRING(45),
				allowNull: false,
				primaryKey: true
			},
			location_x: {
				type: DataTypes.INTEGER,
				allowNull: false,
				defaultValue: 0
			},
			location_y: {
				type: DataTypes.INTEGER,
				allowNull: false,
				defaultValue: 0
			},
			img: {
				type: DataTypes.STRING(300),
				allowNull: false,
				defaultValue: "\/avatar.png"
			},
			zone: {
				type: DataTypes.INTEGER,
				allowNull: false,
				defaultValue: 0
			},
			act: {
				type: DataTypes.INTEGER,
				allowNull: false,
				defaultValue: 0
			},
			oauthserver: {
				type: DataTypes.STRING(45),
				allowNull: false,
				defaultValue: "github"
			}
		}, {
			sequelize,
			tableName: 'users',
			modelName: 'Users',
			timestamps: false,
			indexes: [
				{
					name: "PRIMARY",
					unique: true,
					using: "BTREE",
					fields: [
						{ name: "id" },
					]
				},
			]
		});
		return Users;
	}

	static createData = async (userInfo) => {
		for (const key in userInfo) {
			const snakeCaseKey = camelToSnake(key);
			if (snakeCaseKey !== key) {
				const tmp = userInfo[key];
				userInfo[snakeCaseKey] = tmp;
				delete userInfo[key];
			}
		}
		try {
			const res = await this.create(userInfo);
			return res;
		} catch (err) {
			throw err;
		}
	}

	static getData = async (username) => {
		try {
			const res = await this.findOne({ where: { username: username } });

			if (res === null)
				return null;
			const userInfo = res.dataValues;
			for (const key in userInfo) {
				const camelCaseKey = snakeToCamel(key);
				if (camelCaseKey !== key) {
					const tmp = userInfo[key];
					userInfo[camelCaseKey] = tmp;
					delete userInfo[key];
				}
			}
			return userInfo;
		} catch (err) {
			throw err;
		}
	}

	static postData = async (userInfo) => {
		for (const key in userInfo) {
			const snakeCaseKey = camelToSnake(key);
			if (snakeCaseKey !== key) {
				const tmp = userInfo[key];
				userInfo[snakeCaseKey] = tmp;
				delete userInfo[key];
			}
		}
		try {
			const res = await this.update({
				zone: userInfo.zone ?? 0,
				location_x: userInfo.location_x ?? 0,
				location_y: userInfo.location_y ?? 0,
				act: userInfo.act ?? 0
			}, { where: { username: userInfo.username } });
			return res;
		} catch (err) {
			throw err;
		}
	}
}