const mongoose = require('mongoose');

mongoose.set("strictQuery", true);


// mongoose.connect("mongodb://localhost:27017/Hackprints")
//     .then(() => {
//         console.log(`db connection successfully...`);
//     })
//     .catch((err) => {
//         console.log(err);
//     });
mongoose
    .connect("mongodb+srv://harshilsarariya:harshilsarariya@cluster0.ntbnnqv.mongodb.net/?retryWrites=true&w=majority")
    .then(() => {
        console.log(`db connection successfully...`);
    })
    .catch((err) => {
        console.log(err);
    });