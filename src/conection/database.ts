import mongoose from 'mongoose';

function connection(){

    try {
        mongoose.connect('mongodb+srv://admin:<password>@login.goss8.mongodb.net/myFirstDatabase?retryWrites=true&w=majority', {
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