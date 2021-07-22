import joi from 'joi';

const recommendationSchema = joi.object({
    name: joi.string()
    .min(3)
    .required(),
    youtubeLink: joi.string()
    .min(3)
    .uri() // melhorar, deve ser um link do youtube
    .required()
});

export { recommendationSchema };