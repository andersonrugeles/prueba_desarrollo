const express= require('express');
const morgan= require('morgan');
const exphbs= require('express-handlebars');
const path= require('path');
//inicio
const app= express();

//configuraciones
app.set('port',process.env.PORT || 4000);
app.set('views',path.join(__dirname,'views'));
app.engine('.hbs',exphbs({
    defaultLayout:'main',
    layoutsDir: path.join(app.get('views'),'layouts'),
    partialsDir: path.join(app.get('views'),'partials'),
    extname:'.hbs',
    helpers:require('./src/lib/handlebars')
}));
app.set('view engine','.hbs');

//mongoose
const mongoose= require('mongoose');
mongoose.connect("mongodb+srv://user:3XUzuxufUWiXlWUV@cluster0.uunw6.mongodb.net/prueba",
{useNewUrlParser:true,
useUnifiedTopology: true},
).then(db=>console.log('base de datos conectada'))
.catch(err=>console.log(err));

//peticiones
app.use(morgan('dev'));
app.use(express.urlencoded({extended:false}));
app.use(express.json());

//variables globales
app.use((req,res,next)=>{
    next();
});

//rutas
app.use(require('./src/routes/movies'));
app.use(require('./src/routes/categories'));


//public
app.use('/static',express.static(path.join(__dirname,'public')));

//inicia el server
app.listen(app.get('port'),()=>{
    console.log('server on port',app.get('port'))
});