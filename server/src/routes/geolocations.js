import {Router} from 'express';
import {catchAsync} from "../middlewares/errors";
import jwtAuth from '../middlewares/auth';
import GeolocationController from "../controllers/geolocationController";
import getFilters from '../middlewares/filters/geolocations'
import {body} from "express-validator/check";

export default () => {
    const api = Router();

    //GET /geolocation/:slug
    api.get('/:slug', catchAsync(GeolocationController.findOne));

    //GET /geolocation
    api.get('/', getFilters, catchAsync(GeolocationController.findAll));

    //POST /geolocation
    api.post('/',
        jwtAuth,
        body('ip').isLength({min: 4}).withMessage("IP or URL is required"),
        GeolocationController.checkValidation,
        catchAsync(GeolocationController.create));

    //PUT /geolocation/:slug
    api.put('/:slug', jwtAuth, catchAsync(GeolocationController.update));

    //DELETE /geolocation/:slug
    api.delete('/:slug', jwtAuth, catchAsync(GeolocationController.remove));

    return api;
}

