const express = require('express');
const router = express.Router();
const Conversation = require('../models/Conversation');
const checkAuth = require('./check_auth');
const path = require('path');

// GET /messages/all
router.get('/all', checkAuth, async (req, res) => {
    let user_id = req.jwtData.user_id;
    try {
        let dbResp = await Conversation.find(
            { participants_id:user_id }
        );
        // let dbResp = await Conversation.aggregate(
        //     [
        //         {
        //             $project: {
        //                 participants_details: {
        //                     $filter: {
        //                         input: '$participants_details',
        //                         as: 'detail',
        //                         cond: {
        //                             '$ne': {'$$detail.user_id': user_id}
        //                         } 
        //                     }
        //                 }
        //             }
        //         }
        //     ]
        // )
        console.log(dbResp);
        res.status(200).json(dbResp);
    } catch (err) {
        console.log('error: ', err);
        res.status(500).send(err);        
    } 
});

// POST /messages/new
router.post('/new', checkAuth, async (req, res) => {
    const user_id = req.jwtData.user_id;
    const { // req params required:
        to_user_id, 
        to_user_name, 
        to_avatar_path,
        from_user_name,
        from_avatar_path,
        content 
        } = req.body;
    console.log('req body:', req.body);
    try {
        const participantDetailsList = [
            {
                user_id: user_id, 
                user_name: from_user_name, 
                avatar_path: from_avatar_path
            },
            {
                user_id: to_user_id, 
                user_name: to_user_name, 
                avatar_path: to_avatar_path
            }
        ];
        const messageData = {
            from: user_id, // from id
            time: Date.now(),
            content
        }

        let result = await Conversation.findOne(
            { participants_id: {$all: [user_id, to_user_id] }}
        );
        let dbResp = null;
        if(!result) { //create new conv
            console.log('creating new conversation....');
            dbResp = await Conversation.create(
                {
                    participants_id: [user_id, to_user_id],
                    participants_details: participantDetailsList,
                    messages: [messageData] 
                }
            );
        } else { // update 
            console.log('update conversation....');
            dbResp = await Conversation.findByIdAndUpdate(
                result._id ,
                { $push: { messages: messageData } },
                { new: true }
            );
        }
        /*
        let dbResp = await Conversation.findOneAndUpdate(
            // { participants_id: { $elemMatch: { $eq:user_id, $eq:to_user_id } } },
            { participants_id: {$all: [user_id, to_user_id] }},
            {
                participants_id: [user_id, to_user_id],
                participants_details: participantDetailsList,
                $push: { messages: messageData }
            },
            { upsert: true, new: true }
        );
        console.log(dbResp)
        */
        res.status(200).json(dbResp);
    } catch (err) {
        console.log('error: ', err);
        res.status(500).send(err);        
    } 
});

// POST /messages/new
router.post('/test', checkAuth, async (req, res) => {
    const user_id = req.jwtData.user_id;
    const { // req params required:
        to_user_id, 
        to_user_name, 
        to_avatar_path,
        from_user_name,
        from_avatar_path,
        content 
        } = req.body;
    console.log('req body:', req.body);
    try {
        const participantDetailsList = [
            {
                user_id: user_id, 
                user_name: from_user_name, 
                avatar_path: from_avatar_path
            },
            {
                user_id: to_user_id, 
                user_name: to_user_name, 
                avatar_path: to_avatar_path
            }
        ];
        const messageData = {
            from: user_id, // from id
            time: Date.now(),
            content
        }

        let dbResp = await Conversation.findOneAndUpdate(
            // { participants_id: { $elemMatch: { $eq:user_id, $eq:to_user_id } } },
            { participants_id: {$all: [user_id, to_user_id] }},
            {
                participants_id: [user_id, to_user_id],
                participants_details: participantDetailsList,
                $push: { messages: messageData }
            },
            { upsert: true, new: true }
        );
        console.log(dbResp)

        res.status(200).json(dbResp);
    } catch (err) {
        console.log('error: ', err);
        res.status(500).send(err);        
    } 
});

module.exports = router;