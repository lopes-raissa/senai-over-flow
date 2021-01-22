const {celebrate, Segments, Joi} = require("celebrate");

module.exports = {
    create: celebrate ({
            [Segments.BODY]:Joi.object().keys({
                description: Joi.string().min(10).max(255).required(),
                gist: Joi.string().min(20).max(255),
                categories: Joi.array().required()
            }),
            [Segments.PARAMS]: Joi.object().keys({
                id: Joi.number().required()
            })
        }),
    };