const express = require('express');
const app = express();
const path = require('path'); 
const {User,Product,Order,checkin}=require(path.join(__dirname, 'db'));

// const port = 3000;

app.use(express.static(path.join(__dirname, 'public')));
app.use('/images', express.static(path.join(__dirname, 'images')));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.listen(process.env.PORT || 3000);

// Express route for handling checkout requests


app.get('/favicon.ico', (req, res) => {
    res.sendFile(path.join(__dirname, 'favicon.ico'));
});

app.get('/', (req, res) => {
    res.sendFile('main.html', {root: path.join(__dirname, 'public')});
});
app.get('/home', (req, res) => {
    res.sendFile('home.html', {root: path.join(__dirname, 'public')}); 
});
app.get('/error', (req, res) => {
    res.sendFile('error.html', {root: path.join(__dirname, 'public/')});
});

app.get('/signup', (req, res) => {
    res.sendFile('signup.html', {root: path.join(__dirname, 'public/')});
});



app.get('/signin', (req, res) => {
    res.sendFile('main.html', {root: path.join(__dirname, 'public/')});
});

app.get('/payment', (req, res) => {
    res.sendFile('payment.html', {root: path.join(__dirname, 'public/')});
});


app.get('/confirm', (req, res) => {
    res.sendFile('confirmation.html', {root: path.join(__dirname, 'public/')});
});


app.get('/cart', (req, res) => {
    res.sendFile('cart.html', {root: path.join(__dirname, 'public/')});
});

app.get('/checkout', (req, res) => {
    res.sendFile('checkout.html', {root: path.join(__dirname, 'public/')});
});


app.post('/buy', async (req, res) => {
    try {
       
        // Extract the product data from the request body
        const { p_id, p_name, p_price, p_desc, img } = req.body;

        // Look up the order in the database based on the product ID
        const order = await Order.findOne({ p_id: p_id });

        // Log the request body for debugging
      

        if (order) {
            // If the order exists, increment the quantity and save
            order.quantity += 1;
            await order.save();
            res.redirect('/home');
        } else {
            // If the order doesn't exist, create a new one
            await Order.create({
                p_id: p_id,
                p_name: p_name,
                p_price: p_price,
                p_desc: p_desc,
               img: img,
                quantity: 1
            });
            res.redirect('/home');
        }
    } catch (error) {
        // Log the error for debugging purposes
        console.error('Error during buy request:', error);

        // Redirect to the error page
        res.redirect('/error');
    }
});


app.post('/checkout', async (req, res) => {
    try {
       
        // Extract the product data from the request body
        const { firstName,lastName,userName,email,add1,add2,country,state,zip } = req.body;

      
            await checkin.create({
                firstName:firstName,
                lastName:lastName,
                userName:userName,
                email:email,
                add1:add1,
                add2:add1,
                country:country,
                state:state,
                zip:zip,
            });
            res.redirect('/payment');
        }
     catch (error) {
        // Log the error for debugging purposes
        console.error('Error during buy request:', error);
     
        // Redirect to the error page
        res.redirect('/error');}
    });


    app.get('/fetch-cart-items',async (req,res)=>{
        try{
const cartItems=await Order.find();
        res.json(cartItems);}
        catch (error) {
            // If an error occurs, log the error and send an error response
            console.error('Error fetching product data:', error);
            res.status(500).json({ error: 'Internal server error' });
        }
    });


app.get('/preorder', (req, res) => {
    res.sendFile('preorders.html', {root: path.join(__dirname, 'public/')});
})


// app.get('/cart', async (req, res) => {
//     try {
//         // Fetch cart items from the database
//         const cartItems = await Order.find();
//         res.json(cartItems);
//     } catch (error) {
//         console.error('Error fetching cart items:', error);
//         res.status(500).json({ error: 'Internal Server Error' });
//     }
// });



// Define a new GET route to fetch product data from the database
app.get('/products', async (req, res) => {
    try {
        // Fetch product data from the database
        const products = await Product.find();

        // Send the product data as JSON to the frontend
        res.json(products);
    } catch (error) {
        // If an error occurs, log the error and send an error response
        console.error('Error fetching product data:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});




app.post('/signup', async (req, res) => {
    try {
       const n=req.body.Name;
       const em=req.body.Email
       const num=req.body.Mobile;
       const pass=req.body.PWord;

      

        // Attempt to create a new user
      
        const a=await User.findOne({ email: em})
        if (a) {
         
            res.send('<script>alert("User Already exists, login "); window.location.href = "/";</script>');
        }
        
    else{   await  User.create({
        name:n,  
        email:em,
      p_no:num,
      pass:pass
        })

        // Redirect the user to the home page after successful signup
        res.redirect('/');}
    } catch (error) {
        // Log the error for debugging purposes
        console.error('Error during signup:', error);
        // Redirect to the error page
        res.redirect('/error');
    }
});







app.post('/signin', async (req, res) => {
    try {
        const { Email, PWord } = req.body;

        // Look up the user in the database
        const user = await User.findOne({ email: Email, pass: PWord });

        if (user) {
            // User found, redirect to the mandala page
            res.redirect('/home')
        }
         else {
            // User not found, redirect to the error page
            res.redirect('/error');
        }
    } catch (error) {
        // Log the error for debugging purposes
        console.error('Error during signin:', error);

        // Redirect to the error page
        res.redirect('/error');
    }
});


    app.post('/delete', async (req, res) => {
        try {
            // Delete all cart items from the database
            await Order.deleteMany({});
            console.log('Cart items deleted successfully.');
            // Redirect the user to the payment page after successful deletion
            res.redirect('/payment');
        } catch (error) {
            // Log the error for debugging purposes
            console.error('Error during deletion:', error);
            // Redirect to the error page
            res.redirect('/error');
        }
    });






module.exports = app;