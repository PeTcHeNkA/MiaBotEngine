import * as SequelizeLib from "sequelize";

class User extends SequelizeLib.default.Model {};
const sequelize = new SequelizeLib.Sequelize(`sqlite:./data/bot.sqlite`, {logging:false});

export default class dbLogic {
    constructor(mia) {
        this.mia = mia;
        this.userModel = {
            userid: SequelizeLib.default.INTEGER,
            name: SequelizeLib.default.STRING,
            money: SequelizeLib.default.INTEGER,
            exp:  SequelizeLib.default.INTEGER,
            lvl: SequelizeLib.default.INTEGER,
            coookie: SequelizeLib.default.INTEGER
        };
        this.User = User;
        this.sequelize = sequelize;
    }

    async init() {
        try {
          await this.sequelize.authenticate();
          this.User = this.sequelize.define('user', this.userModel, { timestamps: false });
          this.mia.log('Database has been connected.');
        } catch (error) {
          this.mia.error('Unable to connect to the database:', error);
        }
    }

    async create(userid,name) {
          this.sequelize.sync();
          this.User.create({
            userid: userid,
            name: name,
            money: 15000,
            exp: 0,
            lvl: 1,
            coookie: 123
          }).then((user) => {
            this.mia.log('Success:');
            console.log(user.toJSON());
          })
          .catch((err) => {
            this.mia.error(`Error to create user: ${err}`);
          });
    }
}