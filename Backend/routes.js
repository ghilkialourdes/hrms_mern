import express from 'express';
import {eventRoutes} from './Modules/Event/eventRoutes.js';

const routes = express.Router();

eventRoutes.use('/events', eventRoutes);

export default routes;