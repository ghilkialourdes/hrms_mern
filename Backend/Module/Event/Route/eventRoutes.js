import express from 'express';

const routes = express.Router();

routes.use('/addEvents', validate(addEventValidation), addEventController);
routes.use('/updateEvents', validate(updateEventValidation), updateEventController);
routes.use('/deleteEvents', validate(deleteEventValidation), deleteEventController);
routes.use('/getEvents', getEventController);

export default routes;