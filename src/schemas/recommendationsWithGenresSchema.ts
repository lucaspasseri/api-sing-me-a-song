import joi from 'joi';

const recommendationWithGenresSchema = joi.object({
    name: joi.string()
    .min(3)
    .required(),
    youtubeLink: joi.string()
    .min(3)
    .uri() // melhorar, deve ser um link do youtube
    .required(),
    genresIds: joi.array()
    .required()
});

export { recommendationWithGenresSchema };