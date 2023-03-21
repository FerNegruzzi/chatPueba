const templatesConttoller = require('../templates/controller.templates')

const router = app => {
    app.use('/', templatesConttoller)
    // app.use('/products', productsController)
}

module.exports = router