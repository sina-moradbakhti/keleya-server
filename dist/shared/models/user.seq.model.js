module.exports = (sequelize, Sequelize) => {
    const Users = sequelize.define('users', {
        id: {
            type: Sequelize.UUID,
            defaultValue: Sequelize.UUIDV4 // Or Sequelize.UUIDV1
        },
        name: {
            type: Sequelize.STRING
        },
        email: {
            type: Sequelize.STRING
        },
        password: {
            type: Sequelize.STRING
        },
        baby_birth_date: {
            type: Sequelize.DATE
        },
        onboarding_done: {
            type: Sequelize.BOOLEAN
        },
        accepted_privacy_policy: {
            type: Sequelize.BOOLEAN
        },
        accepted_terms_and_conditions: {
            type: Sequelize.BOOLEAN
        }
    });
};
//# sourceMappingURL=user.seq.model.js.map