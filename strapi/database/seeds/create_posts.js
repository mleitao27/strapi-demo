const postsTable = {
    name: "post",
    columns: {
        deleted_at: { type: 'datetime' },
        name: { type: 'string' },
    },
};

module.exports = { postsTable }