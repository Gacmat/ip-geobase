import Geolocation from "../models/geolocation";
import ipStackCall from "../helpers/ipStackCall";
import {validationResult} from "express-validator/check";

export default {
    async findOne(req, res, next) {
        const geolocation = await Geolocation.findOne({slug: req.params.slug});
        if (!geolocation) return next();
        return res.status(200).send({data: geolocation});
    },

    async findAll(req, res) {
        const sort_by = {};
        sort_by[req.query.sort_by || 'createdAt'] = req.query.order_by || 'desc';
        const offset = parseInt(req.query.offset) || 0;
        const per_page = parseInt(req.query.per_page) || 5;
        const geoPromise =
            Geolocation
                .find(req.filters)
                .skip(offset)
                .limit(per_page)
                .sort(sort_by);
        const countAllPromise = Geolocation.count();
        const countPromise = Geolocation.count(req.filters);
        const [geolocations, count, countAll] = await Promise.all([geoPromise, countPromise, countAllPromise]);
        return res.status(200).send(
            {
                geolocations,
                perPage: per_page,
                offset: offset,
                count: count,
                countAll: countAll,
                sortBy: req.query.sort_by || 'createdAt',
                orderBy: req.query.order_by || 'desc'
            });
    },

    async create(req, res, next) {
        let ipStackResponse;

        try {
            ipStackResponse = await ipStackCall(req.body.ip);
        }catch(err){
            return next(err);
        }

        const geoData = JSON.parse(ipStackResponse.body);

        const geolocation = await new Geolocation({
            ip: geoData.ip,
            type: geoData.type || "",
            continent_name: geoData.continent_name || "",
            country_name: geoData.country_name || "",
            region_name: geoData.region_name || "",
            city: geoData.city || "",
            latitude: geoData.latitude || 0,
            longitude: geoData.longitude || 0
        }).save();

        return res.status(201).send({data: geolocation, message: `Geolocation coordinates record was created.`})
    },

    async update(req, res, next) {
        const geolocation = await Geolocation.findOneAndUpdate({'slug': req.params.slug}, req.body);
        if (!geolocation) return next();
        return res.status(200).send({data: geolocation, message: `Geolocation coordinates record was updated`});
    },

    async remove(req, res, next) {
        const geolocation = await Geolocation.findOneAndDelete({'slug': req.params.slug});
        if (!geolocation) return next();
        return res.status(200).send({message: `Geolocation coordinates record was removed`});
    },

    checkValidation(req, res, next){
        const errorFormatter = ({ location, msg, param, value, nestedErrors }) => {
            return `${location}[${param}]: ${msg} - actual value: ${value}`;
        };
        const result = validationResult(req).formatWith(errorFormatter);
        if (!result.isEmpty()) {
            return res.json({ errors: result.array() });
        }
        next();
    }
}