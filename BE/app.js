// const express = require('express');
// const bodyParser = require('body-parser');
// const AWS = require('aws-sdk');
// const jwt = require('jsonwebtoken');
// const app =express();
// const port =3000;
// AWS.config.update({region: 'eu-north-1'});
// const cognito = new AWS.CognitoIdentityServiceProvider();

// const CLIENT_ID = '10dci2314pcn8u7fvp3tekn2q5';

// app.use(bodyParser.json());

// const authenticateJWT = (req , res , next) => {
//     const token = req.headers.authorization;
//     if (token){
//         jwt.verify(token,'shammtech',(err,user)=>{
//             if (err){
//                 return res.sendStatus(403);
//             }
//             req.user = user;
//             next();
//         });
//     }else{
//         res.sendStatus(401);
//     }
// };


// app.post('/signup', async (req, res) => {
//     const { username, password, email } = req.body;
  
//     const params = {
//       ClientId: CLIENT_ID, // Your Cognito App Client ID
//       Username: username, // Cognito Username
//       Password: password, // Cognito Password
//       UserAttributes: [
//         {
//           Name: 'email', // Name of the attribute
//           Value: email,  // Value of the attribute
//         },
//       ],
//     };
  
//     try {
//       const data = await cognito.signUp(params).promise();
//       res.json({
//         message: 'User signed up successfully.',
//         userSub: data.UserSub,
//         statusCode: 200,
//       });
//     } catch (err) {
//       res.status(400).json({
//         error: 'Signup failed',
//         message: err.message,
//       });
//     }
//   });

// app.post('/confirm', async (req, res) => {

//     const { username, confirmationCode } = req.body;
//     const params = {
//     ClientId: CLIENT_ID,
//     Username: username,
//     ConfirmationCode: confirmationCode,
//     };
    
//     try {
//     const data = await cognito.confirmSignUp(params).promise();
//     res.json(data);

//     } catch (err) {
//     res.status(400).json(err);
//     }
// });


// app.post('/signin', async (req, res) => {
//     const { username, password } = req.body;
  
//     const params = {
//       AuthFlow: 'USER_PASSWORD_AUTH',
//       ClientId: CLIENT_ID,
//       AuthParameters: {
//         USERNAME: username,
//         PASSWORD: password,
//       },
//     };
  
//     try {
//       const data = await cognito.initiateAuth(params).promise();
  
//       const token = jwt.sign(
//         { username:data.AuthenticationResult.AccessToken},
//         'shammtech',
//         { expiresIn: '1h' } 
//       );
  
//       res.json({ 
//         message: 'Sign-in successful',
//         token,
//         accessToken: data.AuthenticationResult.AccessToken,
//         idToken: data.AuthenticationResult.IdToken,
//         refreshToken: data.AuthenticationResult.RefreshToken,
//       });
//     } catch (err) {
//       res.status(400).json({
//         error: 'Authentication failed',
//         message: err.message,
//       });
//     }
//   });

// app.get('/demoPage',authenticateJWT,(req,res)=>{  
//     res.json({message :'welcome'});
// });


// app.post('/logout',authenticateJWT,async (req,res)=>{
//     const token = req.headers.authorization;
//     const params ={
//         AccessToken: token,
//     };
//     try{
//         await cognito.globalSignOut(params).promise();
//         res.json({message:'successfullt logged out'});

//     }catch(err){
//         res.status(400).json(err);
//     }
// });

// app.use((req,res)=>{
//     res.status(404).json({message:'Page not found'});
// });

// app.listen(port,()=>{
//     console.log(`server running on port ${port}`);
// });



require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const authRoutes = require('./routes/authRoutes');
const setupSwagger = require('./config/swagger');
const sequelize = require('./config/dbConfig'); // Import Sequelize instance


(async () => {
    try {
      // Synchronize the database
      await sequelize.sync({ alter: true }); // `alter` will update the table without deleting existing data
      console.log('Database synchronized successfully.');
    } catch (error) {
      console.error('Error synchronizing the database:', error);
    }
  })();

const app = express();
app.use(cors({ origin: '*' })); 
// app.use(cors({ origin: process.env.ALLOWED_ORIGIN || '*' })); // Allow specific origins or all (*)

app.use(bodyParser.json());

// Routes
app.use('/api/auth', authRoutes);

// Swagger
setupSwagger(app);

// Default 404
app.use((req, res) => {
  res.status(404).json({ message: 'Page not found' });
});

const PORT = process.env.PORT || 3000; // Use PORT from .env if defined
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
