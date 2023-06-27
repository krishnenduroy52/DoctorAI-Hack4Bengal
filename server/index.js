const express = require("express");
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const cors = require("cors");
require("dotenv").config();

const Doctor = require("./models/DoctorModel");

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

const DB = process.env.VITE_APP_MONGO_SERVER;
mongoose
    .connect(DB, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        bufferCommands: false,
    })
    .then(() => {
        console.log("Connection successful");
    })
    .catch((err) => {
        console.log(err);
        console.log("Error in Connecting the server");
    });

const userSchema = new mongoose.Schema({
    username: String,
    email: String,
    phoneNumber: String,
    gender: String,
    dob: Date,
    password: String,
    schedule: [String],
});

// Create the User model
const User = mongoose.model("User", userSchema);

const appointmentSchema = new mongoose.Schema({
    doctorId: String,
    clientId: String,
    meetingId: String,
    timeOfAppointment: String,
    dateOfAppointment: Date,
    about: String,
});

const Appointment = mongoose.model("Appointment", appointmentSchema);

const generateMeetingCode = () => {
    const characters = "abcdefghijklmnopqrstuvwxyz";
    let code = "";

    for (let i = 0; i < 3; i++) {
        for (let j = 0; j < 3; j++) {
            const randomChar = characters.charAt(
                Math.floor(Math.random() * characters.length)
            );
            code += randomChar;
        }

        if (i < 2) {
            code += "-";
        }
    }

    return code;
};

// Define your routes and middleware here

// Example route
app.get("/", (req, res) => {
    res.send("Hello, world!");
});

app.post("/signup", async (req, res) => {
    const { username, email, phoneNumber, gender, dob, password } = req.body;
    console.log(req.body); // Logging the entire request body

    try {
        // Check if the email already exists in the database
        const existingUser = await User.findOne({ email });
        const existingUserName = await User.findOne({ username });

        if (existingUser) {
            return res.status(400).json({ error: "Email already exists" });
        }
        if (existingUserName) {
            return res.status(400).json({ error: "Username already exists" });
        }
        // Create a new user document
        const newUser = new User({
            username,
            email,
            phoneNumber,
            gender,
            dob,
            password,
        });

        // Save the new user to the database
        await newUser.save();

        // Send a success response
        res.status(200).json({ message: "User created successfully" });
    } catch (err) {
        // Handle any errors that occurred during saving
        console.error("Error while saving user:", err);
        res.status(500).json({ error: "Internal server error" });
    }
});

app.post("/login", async (req, res) => {
    const { username, password } = req.body;
    console.log(req.body); // Logging the entire request body

    try {
        // Find the user in the database by username
        const user = await User.findOne({ username });

        if (!user) {
            // User not found
            return res.status(404).json({ error: "User not found" });
        }

        // Compare the provided password with the hashed password stored in the database
        const isPasswordValid = await bcrypt.compare(password, user.password);

        if (!isPasswordValid) {
            // Invalid password
            return res.status(401).json({ error: "Incorrect password" });
        }

        // Password is valid, user is authenticated
        // You can perform additional actions or generate a token here for authentication

        // Send a success response
        res
            .status(200)
            .json({ message: "User logged in successfully", user: user._id });
    } catch (err) {
        // Handle any errors that occurred during the login process
        console.error("Error while logging in:", err);
        res.status(500).json({ error: "Internal server error" });
    }
});

app.get("/user/:id", async (req, res) => {
    const { id } = req.params;

    try {
        // Find the user in the database by ID
        const user = await User.findById(id);

        if (!user) {
            // User not found
            return res.status(404).json({ error: "User not found" });
        }

        // User found, return the user details
        res.status(200).json({ user });
    } catch (err) {
        // Handle any errors that occurred during the retrieval
        console.error("Error while retrieving user:", err);
        res.status(500).json({ error: "Internal server error" });
    }
});

app.put("/user/:userId", async (req, res) => {
    const userId = req.params.userId;
    const updatedData = req.body;

    try {
        // Find the user by ID and update the data
        const user = await User.findByIdAndUpdate(userId, updatedData, {
            new: true,
        });

        if (!user) {
            return res.status(404).json({ error: "User not found" });
        }

        res.status(200).json({ message: "User data updated successfully", user });
    } catch (error) {
        console.error("Error updating user data:", error);
        res.status(500).json({ error: "Internal server error" });
    }
});

app.delete("/appointment/delete/:id", async(req, res) => {
try {
        const id = req.params.id;
        const response = await Appointment.findByIdAndDelete(id);
        if(!response){
            return res.status(404).json({message: "Appointment not found", success: false});
        }
        res.status(200).json({message: "Appointment deleted successfully", success: true});
} catch (error) {
    return res.status(502).json({message: "Server Error", success: false});
}

})

app.post("/appointment", async (req, res) => {
    console.log("This is appointment page backend");
    const {
        doctorId,
        clientId,
        meetingId,
        timeOfAppointment,
        dateOfAppointment,
        about,
    } = req.body;
    console.log(req.body); // Logging the entire request body

    try {
        // Create a new user document
        const newAppointment = new Appointment({
            doctorId,
            clientId,
            meetingId: generateMeetingCode(),
            timeOfAppointment,
            dateOfAppointment,
            about,
        });

        // Save the new user to the database
        const result = await newAppointment.save();
        // console.log(result)
        const appointmentId = result._id;
        const user = await User.findById(clientId);
        if (!user) {
            return res.status(404).json({ error: "User not found" });
        }
        user.schedule.push(appointmentId);
        await user.save();

        // Send a success response
        res.status(200).json({ message: "Appointment created successfully" });
    } catch (err) {
        // Handle any errors that occurred during saving
        console.error("Error while saving appointment:", err);
        res.status(500).json({ error: "Internal server error" });
    }
});

app.get("/appointment/:id", async (req, res) => {
    const appointmentId = req.params.id;

    try {
        // Find the appointment in the database by ID
        const appointment = await Appointment.findById(appointmentId);

        if (!appointment) {
            // Appointment not found
            return res.status(404).json({ error: "Appointment not found" });
        }

        // Appointment found, return the appointment details
        res.status(200).json({ appointment });
    } catch (err) {
        // Handle any errors that occurred during the retrieval
        console.error("Error while retrieving appointment:", err);
        res.status(500).json({ error: "Internal server error" });
    }
});

app.post("/doctor/signup", async (req, res) => {
    const {
        username,
        email,
        phoneNumber,
        gender,
        dob,
        password,
        specialization,
    } = req.body;

    try {
        const existingUser = await Doctor.findOne({ email });

        if (existingUser) {
            return res.status(400).json({ error: "Email already exists" });
        }

        const newDoctor = new Doctor({
            username,
            email,
            phoneNumber,
            gender,
            dob,
            password,
            specialization,
        });

        await newDoctor.save();

        res.status(200).json({ message: "Doctor created successfully" });
    } catch (err) {
        console.error("Error while saving doctor:", err);
        res.status(500).json({ error: "Internal server error" });
    }
});

app.post('/doctor/login', async(req, res) => {
    const {username, password} = req.body;
    try{
        const doct = await Doctor.findOne({ username });
        if (!doct){
            return res.status(404).json({ message: "Doctor not found", success: false });
        }
        const isPasswordValid = await bcrypt.compare(password, doct.password);

        if (!isPasswordValid) {
            // Invalid password
            return res.status(401).json({ message: "Incorrect password" , success: false});
        }
        res
        .status(200)
        .json({ message: "Doctor logged in successfully!", success: true, user: doct._id });
    }catch(error){

    }
})

app.get("/doctor/details/:id", async (req, res) => {
    const doctorId = req.params.id;

    try {
        // Find the appointment in the database by ID
        const response = await Doctor.findById(doctorId);

        if (!response) {
            // Appointment not found
            return res.status(404).json({ error: "Doctor details not found" });
        }

        // Appointment found, return the appointment details
        res.status(200).json(response);
    } catch (err) {
        // Handle any errors that occurred during the retrieval
        console.error("Error while retrieving appointment:", err);
        res.status(500).json({ error: "Internal server error" });
    }
});

// CHAT WITH GPT

const runPrompt = async (prompt) => {
    const options = {
        method: "POST",
        headers: {
            Authorization: `Bearer ${process.env.API_KEY}`,
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            model: "gpt-3.5-turbo",
            messages: [{ role: "assistant", content: prompt }],
            max_tokens: 100,
        }),
    };

    try {
        const response = await fetch(
            "https://api.openai.com/v1/chat/completions",
            options
        );
        const data = await response.json();
        return data;
    } catch (error) {
        console.error("Some error occured*");
    }
    return;
};

app.post("/completion", async (req, res) => {
    const prompt = req.body.prompt;
    try {
        const response = await runPrompt(prompt);
        res.send(response);
    } catch (error) {
        console.error("Some error occured");
    }
});

// Start the server
const port = 3000; // Choose any port you prefer
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
