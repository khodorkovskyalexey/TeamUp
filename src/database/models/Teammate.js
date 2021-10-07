const { Sequelize } = require('sequelize')
const sequelize = require('../sequelize_conf')

const Teammate = sequelize.define('teammate', {
    /**
     * job
     * тут указывается, чем человек занимается в проекте
     * (например: программист, дизайнер, член группы поддержки и тд)
     */
    job: { type: Sequelize.STRING, defaultValue: "Участник" },
    /** 
     * role
     * тут указывается статус человека в команде, насколько он высоко поднялся по карьерной лестнице, 
     * он может быть владельцем/тимлидом/рядовым участником и тд. в мвп будет только owner и member
    */
    role: { type: Sequelize.ENUM("member", "owner"), defaultValue: "member" },
    /**
     * is_accepted
     * если true - то человек участник команды, 
     * если false - то это всего лишь приглашение в команду, которое еще не приняли
    */
    is_accepted: Sequelize.BOOLEAN,
    /**
     * senting_by_user
     * если true - то заявку должен принять тимлид проекта, 
     * если false - то заявку должен принять сам пользователь
    */
    senting_by_user: Sequelize.BOOLEAN, 
})

module.exports = Teammate