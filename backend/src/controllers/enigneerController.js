import Engineer from "../models/Engineers.js";


export const showEngineers = async(req, res) => {
    try {
        const engineers = await Engineer.find();

        return res.status(200).send(engineers);

    } catch (err) {
        console.error("No engineers to show:", err);
        res.status(404).send({ status: false, message: err.message || "Unknown Error" });
    }
};

export const addEngineer = async (req, res) => {
    try {
const { name, email, age, experienceYears, programmingLanguage } = req.body;

        const isExist = await Engineer.findOne({ email });

        if (isExist) {
            return res.status(400).send({ status: false, message: "Same email already exists" });
        }

        const eng = new Engineer({
            name,
            email,
            age,
            experienceYears,
            programmingLanguage,
        });

        await eng.save();
        res.status(201).send({ status: true, message: "Engineer added successfully", engineer: eng });
    } catch (err) {
        console.error("Error adding new engineer:", err);
        res.status(500).send({ status: false, message: err.message || "Unknown Error" });
    }
};


export const removeEngineer = async (req, res) => {

    try {
        const engineer = await Engineer.findById(req.params.id);

        // If no engineer is found, send a 404 response
        if (!engineer) {
            return res.status(404).send("No Engineer found");
        }
    
        await Engineer.deleteOne({_id: req.params.id});

        res.status(200).send("Engineer deleted successfully");
    } catch (err) {
        console.error("Error removing engineer:", err);
        res.status(500).send({ status: false, message: err.message || "Unknown Error" });
    }



};


  

  export const updateEngineerToVerify = async (req, res) => {
    try {
        const engineer = await Engineer.findByIdAndUpdate(req.params.id,
            {
                $set: {verified: true}
            })

            if(!engineer) {
                return res.status(404).send("Engineer not found");
            }

            res.status(200).send("Engineer Verifed successfully")
        
    } catch (err) {
        console.log("Error updating engineer", err);
        res.status(404).send("Can't update the chosen engineer!")
    }
    }


export const updateEngineerToUnverify = async (req, res) => {
    try {
        const engineer = await Engineer.findByIdAndUpdate(req.params.id, {
            $set: { verified: false }
        });

        if (!engineer) {
            return res.status(404).send("Engineer not found");
        }

        res.status(200).send("Engineer unverified successfully");
    } catch (err) {
        console.error("Error updating engineer:", err);
        res.status(500).send("Internal server error");
    }
};


// Show only verified engineers

export const showVerifiedEngineers = async (req, res) => {
    try {
        const engineers = await Engineer.find({ verified: true }); // Only fetch engineers with verified set to true

        return res.status(200).send(engineers);
    } catch (err) {
        console.error("Error fetching verified engineers:", err);
        res.status(500).send({ status: false, message: err.message || "Unknown Error" });
    }
};

// Show only verified engineers

export const showUnverifiedEngineers = async (req, res) => {
    try {
        const engineers = await Engineer.find({ verified: false });

        return res.status(200).send(engineers);
    } catch (err) {
        console.error("Error fetching unverified engineers:", err);
        res.status(500).send({ status: false, message: err.message || "Unknown Error" });
    }
};
