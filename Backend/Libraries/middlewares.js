
export const validate = (schema) => async (req, res, next) => {
    try {
        const validated = await schema.validate(
            { body: req.body, query: req.query, params: req.params },
            { abortEarly: false, stripUnknown: true }
        );

        req.body = validated.body || req.body;
        req.query = validated.query || req.query;

        return next();
    } catch (err) {
        const errors = err.inner?.length
            ? err.inner.map((e) => ({ path: e.path, message: e.message }))
            : [{ path: err.path, message: err.message }];

        return res.status(400).json({
            success: false,
            message: 'Validation failed',
            errors,
        });
    }
};