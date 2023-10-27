export const createClientSwagger = () => ({
    schema: {
        tags: ['Client'],
        body: {
            type: 'object',
            properties: {
                cpf: { type: 'string' },
                email: { type: 'string' },
                name: { type: 'string' },
            }
        },
        response: {
            200: {
                type: 'object',
                properties: {
                    message: { type: 'string' },
                }
            },
            409: {
                type: 'object',
                properties: {
                    message: { type: 'string' },
                }
            }
        }
    }
})

export const getAllClientSwagger = () => ({
    schema: {
        tags: ['Client'],
        response: {
            200: {
                type: 'object',
                properties: {
                    clients: {
                        type: 'array',
                        properties: {
                            cpf: { type: 'string' },
                            email: { type: 'string' },
                            name: { type: 'string' },
                            id: { type: 'number' },
                        }
                    }
                }
            }
        }
    }
});

export const getByIdClientSwagger = () => ({
    schema: {
        tags: ['Client'],
        params: {
            id: { type: 'number' }
        },
        response: {
            200: {
                type: 'object',
                properties: {
                    message: { type: 'string' },
                    client: {
                        type: 'object',
                        properties: {
                            cpf: { type: 'string' },
                            email: { type: 'string' },
                            name: { type: 'string' },
                            id: { type: 'number' },
                        }
                    }
                }
            }
        }
    }
})

export const createItemSwagger = () => ({
    schema: {
        tags: ['Item'],
    }
})

export const getItemSwagger = () => ({
    schema: {
        tags: ['Item'],
    }
})

export const deleteItemSwagger = () => ({
    schema: {
        tags: ['Item'],
    }
})

export const updateItemSwagger = () => ({
    schema: {
        tags: ['Item'],
    }
})

export const createOrderSwagger = () => ({
    schema: {
        tags: ['Order'],
    }
})

export const getOrderSwagger = () => ({
    schema: {
        tags: ['Order'],
    }
})