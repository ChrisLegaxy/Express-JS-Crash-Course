// Imports
const express = require('express')
const members = require("../../Members")
const uuid = require("uuid") // Universal ID Generator

// Initializing Express Router
const router = express.Router()

// Get Method (All)
router.get("/", (req, res) => res.json(members))

// Get Method (Single)
router.get("/:id", (req, res) => {
    /**
     * some method (return boolean) check if the condition is met
     * filter method (return array) will return only the value which the filter condition is met 
     */
    const found = members.some(member => member.id === parseInt(req.params.id))

    if (found) {
        res.json(members.filter(member => member.id === parseInt(req.params.id)))
    } else {
        res.status(400).json({
            msg: `No member with the id of ${req.params.id}`
        })
    }
})

// Post Method
router.post("/", (req, res) => {
    const newMember = {
        id: uuid.v4(),
        name: req.body.name,
        email: req.body.email,
        status: "active"
    }

    // Check if the value is empty
    if (!newMember.name || !newMember.email) {
        return res.status(400).json({
            msg: "Please include a name and an email"
        })
    }

    // Add element into an array
    members.push(newMember)
    // res.json(members)
    res.redirect('/')
})

// Update Method
router.put("/:id", (req, res) => {
    const found = members.some(member => member.id === parseInt(req.params.id))

    if (found) {
        const updateMember = req.body
        members.forEach(member => {
            if (member.id === parseInt(req.params.id)) {
                // Check if the updateMember.value is empty, if not empty member.value = updateMember value else member.value = member.value
                member.name = updateMember.name ? updateMember.name : member.name
                member.email = updateMember.email ? updateMember.email : member.email

                res.json({
                    msg: "Member updated",
                    member
                })
            }
        })
    } else {
        res.status(400).json({
            msg: `No member with the id of ${req.params.id}`
        })
    }
})

// Delete Method
router.delete("/:id", (req, res) => {
    const found = members.some(member => member.id === parseInt(req.params.id))

    if (found) {
        res.json({
            msg: `Member with id of ${req.params.id} is deleted`,
            members: members.filter(member => member.id !== parseInt(req.params.id))
        })
    } else {
        res.status(400).json({
            msg: `No member with the id of ${req.params.id}`
        })
    }
})

module.exports = router