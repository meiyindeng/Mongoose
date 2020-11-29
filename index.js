const mongoose = require('mongoose');

const Dishes = require('./models/dishes');

const url = 'mongodb://localhost:27017/conFusion';

const connect = mongoose.connect(url);

connect.then((db) => {
    console.log("connected correctly to server");

    /*var newDish = Dishes({
        name: 'Uthappizza',
        description: 'test'
    });

    newDish.save()*/

    Dishes.create({
        name: 'Uthappizza',
        description: 'test'
    })
        .then( 
            (dish) => {
                console.log(JSON.stringify(dish, null, 2));
                //the exec method will ensure the find method will be executed and return all the Dishes
            return Dishes.findByIdAndUpdate(dish._id, 
                {
                    $set: { description: 'Updated test'},
                },
                //the new means once the updated complete, it will return the updated dish back.
                { new: true }
            ).exec();
            }
        )
        
        //This then method execute once Promise return all the dishes.
        .then(
            (dish) => {
                //show all the dishes in console and remove the dishes from driver
                console.log(JSON.stringify(dish, null, 2));

                dish.comments.push({
                    rating: 5,
                    comment: 'I\'m getting a sinking feeling!',
                    author: 'Leonardo di Carpaccio'

                });
                return dish.save();
            }
        )

        .then( (dish) => {
            console.log(JSON.stringify(dish, null, 2));
            return Dishes.remove({});

        })
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