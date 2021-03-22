// insertone - many

 db.collection('users').insertOne({
        name: 'JMARX',
        age: 28
    }, (error, result) => {
        if (error) {
            return console.log('unable to insert user')
        }

        console.log(result.ops)
    } )

    db.collection('users').insertMany([{
        name: 'Mark',
        age: 29
    },
    {
        name: 'Gsus',
        age: 28
    }
    ], (error, result) => {
        if (error) {
            return console.log('unable to insert users')
        }

        console.log(result.ops)
    })

    db.collection('tasks').insertMany([{
        description: 'Play videogames',
        completed: true
    },
    {
        description: 'Study nodeJS',
        completed: true
    },
    {
        description: 'Get a job',
        completed: false
    }
    ], (error, result) => {
        if (error) {
            return console.log('Unable to insert tasks!')
        }

        console.log(result.ops)
    })
    
    //findone - findMany

    db.collection('users').findOne({ name: 'Mark', age: 1}, (error, user) => {
        if (error){
            return console.log('Unable to fetch')
        }

        console.log(user)
    })

    db.collection('users').find({age: 27}).toArray((error, users) => {
        console.log(users)
    })

    db.collection('tasks').findOne({ _id: new mongodb.ObjectID("602b285dbd59942514de3da4")}, (error, doc) => {
        if (error) {
            return console.log('Unable to fetch data')
        }
        console.log(doc)
    })

    db.collection('tasks').find({completed: false}).toArray((error, docs) => {
        if (error) {
            return console.log('Unable to fetch data')
        }
        console.log(docs)
    })

    //updateone - many

    db.collection('users').updateOne({
        _id : new mongodb.ObjectID("602b260567f327189c9d900e")
    }, {
        $set : {
            name: 'Jmarx-Updated2'
        }
    }).then((result) => {
        console.log(result)
    }).catch((error) => {
        console.log(error)
    })

    db.collection('users').updateOne({
        _id : new mongodb.ObjectID("602b260567f327189c9d900e")
    }, {
        $inc : {
            age: 1
        }
    }).then((result) => {
        console.log(result)
    }).catch((error) => {
        console.log(error)
    })

    db.collection('tasks').updateMany(
        { completed : false }
        , {
            $set : {
                completed : true
            }
        }).then((result) => {
            console.log(result.modifiedCount)
        }).catch((error) => {
            console.log(error)
        })