import _sequelize from 'sequelize';
const { Model, Sequelize } = _sequelize;

export default class Receiver_ref extends Model {
	static init(sequelize, DataTypes) {
		super.init({
			type: {
				type: DataTypes.STRING(10),
				allowNull: false,
				primaryKey: true
			}
		}, {
			sequelize,
			tableName: 'receiver_ref',
			timestamps: false,
			indexes: [
				{
					name: "PRIMARY",
					unique: true,
					using: "BTREE",
					fields: [
						{ name: "type" },
					]
				},
			]
		});
		return Receiver_ref;
	}
}
