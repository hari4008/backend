var db = require('../config/config');
const cors = require('cors');
const sendEmail = require('../middleware/mail');

var contact = db.contact;

var addContact = async (req, res) => {
    try {
        // console.log("Mail Data",req.body.email)
        let data = await contact.create(req.body);

        const msg = ` <div className="order_details_table">
            <h2>Contact Form Conformation Details</h2>
            <div className="table-responsive" style={{'border':'1px solid black'}} >
                <p>Dear ${ req.body.name },<br/><br/>
                Thank you for reaching out to us! We have received your message and one of our team members will get back to you shortly.<br/><br/>     
                Here are the details of your submission:</p>
                <table className="table">
                    <thead>
                        <tr>
                            <th scope="col"></th>
                            <th scope="col"></th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>Name : </td>
                            <td>${req.body.name}</td>
                        </tr>
                        <br/>
                        <tr>
                            <td>Email : </td>
                            <td>${req.body.email}</td>
                        </tr>
                        <br/>
                        <tr>
                            <td>Mobile Number : </td>
                            <td>${req.body.mobileNum}</td>
                        </tr>
                        <br/>
                        <tr>
                            <td>Message : </td>
                            <td>${req.body.message}</td>
                        </tr>
                    </tbody>
                </table>
                <p>
                <br/>
                Best regards,  <br/>
                Uoni Watch Team
                </p>
            </div>
        </div>`

        // this mail send successfully but  it does not still need
        sendEmail(req.body.email, "Regarding your Contact Form comformation ", msg)
        res.status(201).json({ message: 'Message has been sended succesfully', data });
    } catch (error) {
        throw error
    }
}

var getAllContact = async (req, res) => {
    try {
        let data = await contact.findAll(req.body);
        res.status(201).json(data);
    } catch (error) {
        throw error
    }
}

var getOneContact = async (req, res) => {
    const id = req.params.id;
    try {
        let data = await contact.findOne({
            where: { id: id }
        });
        res.status(201).json(data);
    } catch (error) {
        throw error
    }
}


var deleteContact = async (req, res) => {
    const id = req.params.id;
    try {
        let data = await contact.destroy({
            where: { id: id }
        });
        res.status(201).json({ Message: 'data deleted succesfully', data });
    } catch (error) {
        throw error
    }
}

var updateContact = async (req, res) => {
    const id = req.params.id;
    try {
        let data = await contact.findOne({
            where: { id: id }
        });
        console.log(data)
        if (data) {
            let updatedData = await contact.update(req.body,{ where: { id: id }});
            res.status(201).json({ Message: "Data Updated Successfully", updatedData });
        }else{
            res.status(401).json({Message:"User not found"});
        }
    } catch (error) {
        throw error
    }
}


module.exports = {
    addContact,
    getAllContact,
    getOneContact,
    deleteContact,
    updateContact
}
