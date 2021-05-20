import mongoose from 'mongoose';

function connection(){

    try {
        mongoose.connect('mongodb+srv://admin:admin@backend.azxej.mongodb.net/<dbname>?retryWrites=true&w=majority', {
            useNewUrlParser: true,
            useUnifiedTopology: true  
           }, ()=>{
               console.log('conectado');
           });
    } catch (error) {
        console.log('erro ao conectar com o banco');
    }
  
}

export default connection;