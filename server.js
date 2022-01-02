const express = require('express');
const connectDB = require('./config/db');
const app = express();
const path = require('path');
const PORT = process.env.PORT || 5000;

// app.get('/', (req, res) =>
//   res.json({ msg: 'welcome to the contact keeper app' })
// );

//Connect DataBase
connectDB();

//init middleware
app.use(express.json({ extended: false }));

//Define routes
app.use('/api/users', require('./routes/users'));
app.use('/api/auth', require('./routes/auth'));
app.use('/api/contacts', require('./routes/contacts'));

if (process.env.NODE_ENV === 'production') {
  //set static folder
  app.use(express.static('client/build'));

  //if it not found route then again check
  app.get('*', (req, res) =>
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'))
  );
}

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
