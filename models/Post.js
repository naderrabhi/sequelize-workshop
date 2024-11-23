module.exports = (db, type) => {
    return db.define('posts', {
        id: {
            type: type.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        title: {
            type: type.STRING,
            allowNull: false
        },
        body: {
            type: type.STRING,
            allowNull: false
        },
        userId: {
            type: type.INTEGER,
            allowNull: false,
            references: {
                model: 'users', // Name of the referenced table
                key: 'id'       // Key in the referenced table
            },
            onDelete: 'CASCADE'
        },
        categoryId: {
            type: type.INTEGER,
            allowNull: false,
            references: {
                model: 'categories', // Name of the referenced table
                key: 'id'
            },
            onDelete: 'CASCADE'
        }
    });
};
