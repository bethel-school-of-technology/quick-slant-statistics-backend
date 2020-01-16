var express = require('express');
var router = express.Router();
var teamService = require('../services/service.team');
const mysql = require('mysql');
/* GET team listing. */
router.get('/team/:id', async function(req, res, next)
{
    let teamId = parseInt(req.params.guid)
    res.json({error: "Invalid Team ID."});
});
/*GET ALL teams in database. */
router.get('/allTeams', function (req, res, next) {
    console.log("is this working?")
    team.find()
        .then(result => {
            res.send(result);
        })
});
/* adds a new team to the list */
router.post('/addTeam', async (req, res, next) =>
{
    const body = req.body;
    try
    {
        const team = await teamService.create(body);
        if(body.guid != null)
        {
            team.guid = body.guid;
        }
        res.cookie('guid', team.guid, { httpOnly: true });
        // created the team! 
        return res.status(201).json({ team: team });
    }
    catch(err)
    {
        if (err.name === 'ValidationError')
        {
            return res.status(400).json({ error: err.message });
        }
        // unexpected error
        return next(err);
    }
});
/* retrieves a team by uid */
router.get('/:id', async (req, res, next) =>
{
    try
    {
        const team = await teamService.retrieve(req.params.id);
        return res.json({ team: team });
    }
    catch(err)
    {
        // unexpected error
        return next(err);
    }
});
/* updates the team by uid */
router.put('/:id', async (req, res, next) =>
{
    try
    {
        const team = await teamService.update(req.params.id, req.body);
        return res.json({ team: team });
    }
    catch(err)
    {
        // unexpected error
        return next(err);
    }
});
/* removes the team from the team list by uid */
router.delete('/:id', async (req, res, next) =>
{
    try
    {
        const team = await teamService.delete(req.params.id);
        return res.json({success: true});
    }
    catch(err)
    {
        // unexpected error
        return next(err);
    }
});
module.exports = router;
