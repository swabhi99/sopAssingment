import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import nodemailer from "nodemailer"
import Mailgen from 'mailgen';
import path from 'path'
 import { config } from "dotenv"; 
// import { EMAIL,PASSWORD } from "./env.js";
config()
const app = express();
app.use(express.json());
app.use(cors());
const __dirname = path.resolve();
app.use(express.static(path.join(__dirname+"/public")))

console.log(process.env.EMAIL,process.env.PASSWORD,process.env.PORT)

mongoose
  .connect(
    process.env.MONGOURI,
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }
  )
  .then(() => console.log("db connected"))
  .catch((e) => console.log(e));

const formSchema = new mongoose.Schema({
  name: String,
  email: String,
  age: Number,
  education: String,
  institute: String,
  experience: String,
  institute2: String,
  gic: String,
  pay: String,
});

const FormData = new mongoose.model("FormData", formSchema);

app.post("/register", async (req, res) => {
  const {
    name,
    email,
    age,
    education,
    institute,
    experience,
    institute2,
    gic,
    pay,
  } = req.body;
  const user = new FormData({
    name,
    email,
    age,
    education,
    institute,
    experience,
    institute2,
    gic,
    pay,
  });
  try {
    const t = await user.save();
    //Email setup 
    let config = {
      service:'gmail',
      auth:{
        user:process.env.EMAIL,
        pass:process.env.PASSWORD
      }
    }

    let transporter = nodemailer.createTransport(config);

    let MailGenerator = new Mailgen({
      theme: "default",
      product : {
          name: "Mailgen",
          link : 'https://mailgen.js/'
      }
  })

    let response = {
      body: {
          name : "SOP",
          intro: "Your data!",
          table : {
              data : [
                {
                  name:name,
                  email:email,
                  age:age,
                  education:education,
                  institute:institute,
                  experience:experience,
                  institute2:institute2,
                  gic:gic,
                  pay:pay,
                }
              ]
          },
          outro: "Looking forward to do more business"
      }
  }

  
  let mail = MailGenerator.generate(response)

  let message = {
    from : EMAIL,
    to : email,
    subject: "SOP Details",
    html: mail
}

transporter.sendMail(message).then(() => {
  return res.status(201).json({
      msg: "you should receive an email"
  })
}).catch(error => {
  console.log('e',error)
  return res.status(500).json({ error })
})

  } catch (error) {
    res.send({msg:'not saved'});
  }
});

const port = process.env.PORT || 5000

app.listen(port, () => {
  console.log(`started at port ${port}`);
});
