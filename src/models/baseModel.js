const Sequelize = require("sequelize");

class BaseModel extends Sequelize.Model {
  static async findByTenant(tenantId, conditions = {}) {
    return this.findAll({
      where: { tenantId, ...conditions },
    });
  }
}

module.exports = BaseModel;
