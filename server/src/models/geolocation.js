import mongoose, {Schema} from 'mongoose';
import URLSlugs from 'mongoose-url-slugs';

const geolocation = new Schema({
        ip: String,
        type: String,
        continent_name: String,
        country_name: String,
        region_name: String,
        city: String,
        latitude: Number,
        longitude: Number,
    }, {
    timestamps: true
});

geolocation.plugin(URLSlugs('city', {field: 'slug', update: true}));

export default mongoose.model('Geolocation', geolocation);