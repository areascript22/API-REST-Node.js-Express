const users_controller = require('../controllers/users_controller');

module.exports = (app) =>{
    app.get('/api/users/getall', users_controller.getAll);
    app.post('/api/users/create', users_controller.register);
    app.delete('/api/users/delete/:id',users_controller.delete);
    app.put('/api/users/update/:id',users_controller.updateUsers)
};