const express = require('express');
const cors = require('cors');
const app = express()


//middleware
app.use(cors())
app.use(express.json())

//art
//art123
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
const uri = "mongodb+srv://art:art123@cluster0.drqortc.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";
// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
    serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
    }
});
async function run() {
    try {
        // Connect the client to the server	(optional starting in v4.7)
        await client.connect();

        //creatinng a data in database
        const artDatabase = client.db('arts').collection('item')
        const userDatabase = client.db('user').collection('user')
        const categoryDatabase = client.db('category').collection('category')

        // //user part
        //create user
        app.post('/createUser', async (req, res) => {
            const newData = req.body;
            console.log(newData)
            // Validate password
            // const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/;
            // if (!passwordRegex.test(newData.password)) {
            //     return res.status(400).json({ error: "Give strong passowrd" });

            // }

            // Check for duplicate email
            const duplicateEmail = await userDatabase.findOne({ User_email: newData.User_email });
            if (duplicateEmail) {
                return res.status(400).json({ error: "Email already exists" });
            }

            try {
                // Insert new data into the database
                const result = await userDatabase.insertOne(newData);
                res.json(newData);
            } catch (error) {
                return res.status(500).json({ error: "Internal Server Error" });
            }
        });
        
         //get one user data
         app.get('/user/:id', async (req, res) => {
            const id = req.params.id;

            try {
                // Retrieve all data from the database
                const cursor = await userDatabase.find({ _id: new ObjectId(id) });

                // Convert the cursor to an array of documents
                const hasUser = await cursor.toArray();

                // Send the retrieved data as the response
                res.json(hasUser);
            } catch (error) {
                // Handle errors
                res.status(500).json({ error: "Internal Server Error" });
            }
        });
       // get user by email
        app.get('/userByEmail/:email', async (req, res) => {
            const userEmail = req.params.email;
        
            try {
                // Retrieve user data from the database based on email
                const userData = await userDatabase.findOne({ User_email: userEmail });
        
                if (!userData) {
                    // If user data is not found, send a 404 response
                    return res.status(404).json({ error: "User not found" });
                }
        
                // Send the retrieved user data as the response
                res.json(userData);
            } catch (error) {
                // Handle errors
                res.status(500).json({ error: "Internal Server Error" });
            }
        });
        
        
        //Create category
        app.post('/createCategory', async (req, res) => {
            const newCategory = req.body;
            console.log(newCategory)
            try {
                // Insert new category into the database
                const result = await categoryDatabase.insertOne(newCategory);
                res.json(newCategory);
            } catch (error) {
                return res.status(500).json({ error: "Internal Server Error" });
            }
        });

        //all categories
        app.get('/categories', async (req, res) => {
            try {
                // Retrieve all categories from the database
                const categories = await categoryDatabase.find({}).toArray();
                res.json(categories);
            } catch (error) {
                return res.status(500).json({ error: "Internal Server Error" });
            }
        });
        
        





        //add item in cart 
        app.post('/user/:id/addItem', async (req, res) => {
            const userId = req.params.id;
            const { _id: itemId, ...itemData } = req.body; // Extracting _id as itemId from the request body
        
            try {
                // Update the user's document in the database to add the item
                const result = await userDatabase.updateOne(
                    { _id: new ObjectId(userId) },
                    { $push: { cart: { itemId, ...itemData } } } // Including itemId in the cart item
                );
                res.json({ message: "Item added to cart successfully" });
            } catch (error) {
                res.status(500).json({ error: "Internal Server Error" });
            }
        });

        //User Item
        //see item 
        app.get('/user/:id/cart', async (req, res) => {
            const userId = req.params.id;
        
            try {
                // Retrieve the user's document from the database
                const user = await userDatabase.findOne({ _id: new ObjectId(userId) });
        
                if (!user) {
                    return res.status(404).json({ error: "User not found" });
                }
        
                // Extract and return the user's cart
                const cart = user.cart || [];
                res.json(cart);
            } catch (error) {
                res.status(500).json({ error: "Internal Server Error" });
            }
        });
        
     
        
        //delete item (Is not working)
        app.delete('/user/:userId/cart/:itemId', async (req, res) => {
            const userId = req.params.userId;
            const itemId = req.params.itemId;
            console.log(userId, itemId);
            try {
                // Update the user's document in the database to remove the item from the cart
                const result = await userDatabase.updateOne(
                    { _id: new ObjectId(userId) },
                    { $pull: { cart: { itemId: new ObjectId(itemId) } } }
                );
        
                if (result.modifiedCount === 0) {
                    return res.status(404).json({ error: "Item not found in cart" });
                }
        
                res.json({ message: "Item deleted from cart successfully" });
            } catch (error) {
                res.status(500).json({ error: "Internal Server Error" });
            }
        });
        
        
        






        //Arts data part
        //creater data
        app.post('/create', async (req, res) => {
            const newData = req.body;
            try {

                const result = await artDatabase.insertOne(newData);
                res.send(newData)
            } catch (error) {
                return res.status(500).json({ "Massage": "Error data" })
            }
        })
        //get all data
        app.get('/arts', async (req, res) => {
            try {
                // Retrieve all data from the database
                const cursor = await artDatabase.find();

                // Convert the cursor to an array of documents
                const artsItems = await cursor.toArray();

                // Send the retrieved data as the response
                res.json(artsItems);
            } catch (error) {
                // Handle errors
                res.status(500).json({ error: "Internal Server Error" });
            }
        });
        //get one data
        app.get('/arts/:id', async (req, res) => {
            const id = req.params.id;

            try {
                // Retrieve all data from the database
                const cursor = await artDatabase.find({ _id: new ObjectId(id) });

                // Convert the cursor to an array of documents
                const artsItems = await cursor.toArray();

                // Send the retrieved data as the response
                res.json(artsItems);
            } catch (error) {
                // Handle errors
                res.status(500).json({ error: "Internal Server Error" });
            }
        });
        // delete a item
        app.delete('/arts/:id', async (req, res) => {
            const id = req.params.id;

            try {
                const result = await artDatabase.deleteOne({ _id: new ObjectId(id) })

                if (result.deletedCount === 1) {
                    // Document successfully deleted
                    res.json({ message: "Document deleted successfully" });
                } else {
                    // No document found with the specified ID
                    res.status(404).json({ error: "Document not found" });
                }
            } catch (error) {
                // Handle errors
                res.status(500).json({ error: "Internal Server Error" });
            }
        })
        //update data
        app.put('/arts/:id', async (req, res) => {
            const id = req.params.id;
            const newData = req.body;
            console.log(id, newData)

            try {
                const filter = { _id: new ObjectId(id) };
                const updateDoc = {
                    $set: newData
                };

                const result = await artDatabase.updateOne(filter, updateDoc);

                if (result.acknowledged) {
                    res.json({ message: "Document Updated successfully" });
                } else {
                    res.json({ message: "Document update failed" });
                }
            } catch (error) {
                res.status(500).json({ error: "Internal Server Error" });
            }


        });






        // Send a ping to confirm a successful connection
        await client.db("admin").command({ ping: 1 });
        console.log("Pinged your deployment. You successfully connected to MongoDB!");
    } finally {
        // Ensures that the client will close when you finish/error
        // await client.close();
    }
}
run().catch(console.dir);

app.get('/', (req, res) => {
    res.send("hello world")
})



app.listen(5000, () => {
    console.log(`Server is running on ${500}`)
})
