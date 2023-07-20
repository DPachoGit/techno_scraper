import connection from '../db/mongoose.js';

const productoSchema = new connection.Schema({
    title: {
        type: String,
        required: true,
        trim: true
    },
    price: {
        type: String,
        trim: true
    },
    image: {
        type: String,
        trim: true
    },
    url: {
        type: String,
        trim: true
    },
    date: {
        type: Date,
        default: Date.now
    }
},{
    strict: false
});

const Producto = connection.model('Producto', productoSchema);

export default Producto;