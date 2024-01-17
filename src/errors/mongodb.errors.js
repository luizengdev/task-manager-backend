export const notFoundError = (res) => {
    return res
        .status(404)
        .send("Este dado não foi encontrado no banco de dados.");
};

export const objectIdCastError = (res) => {
    return res.status(500).send("O ID inserido é inválido.");
};
