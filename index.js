const mongoose = require('mongoose');

const Dishes = require('./models/dishes');

const url = 'mongodb://localhost:27017/conFusion';

const connect = mongoose.connect(url);

connect.then((db) => {
    console.log("connected correctly to server");

    var newDish = Dishes({
        name: 'Uthappizza',
        description: 'test'
    });

    newDish.save()
        .then( 
            (dish) => {
            console.log(dish);
            //the exec method will ensure the find method will be executed and return all the Dishes
            return Dishes.find({}).lean().exec();
            }
        )
        
        //This then method execute once Promise return all the dishes.
        .then(
            (dishes) => {
                //show all the dishes in console and remove the dishes from driver
                console.log(dishes);
                return Dishes.remove({});
            }
        )
        .then(
            () => {
                return mongoose.connection.close();
            }
        )
        .catch(
            (err) => {
                console.log(err);
            }
        )    
});