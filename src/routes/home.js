module.exports = {
    path: '/waos',
    method: 'get',
    code: async t => {
        await t.res.status(200).send('xd');
    }
}