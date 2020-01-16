const teamModel = require("../models/model.team");
let Validator = require('fastest-validator');
let teams = {};
let counter = 0;
/* create an instance of the validator */
let teamValidator = new Validator();
/* use the same patterns as on the client to validate the request */
let namePattern = /([A-Za-z\-\’])*/;
let passwordPattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])[a-zA-Z0-9]+$/;
/* team validator shema */
const teamVSchema = {
        guid: {type: "string"},
        
        team_name: { type: "string", min: 1, max: 50, pattern: namePattern},
        division: { type: "string", min: 1, max: 50, pattern: namePattern},
        wins: { type: "integer", max: 20 },
        losses: { type: "integer", max:20 }
    };
/* static team service class */
class teamService
{
    static create(data)
    {
        var vres = teamValidator.validate(data, teamVSchema);
        
        /* validation failed */
        if(!(vres === true))
        {
            let errors = {}, item;
            for(const index in vres)
            {
                item = vres[index];
                errors[item.field] = item.message;
            }
            
            throw {
                name: "ValidationError",
                message: errors
            };
        }
        let team = new teamModel(data.team_name, data.division, data.wins, data.losses);
        team.uid = 't' + counter++;
        teams[team.uid] = team;
        return team;
    }
    static retrieve(uid)
    {
        if(teams[uid] != null)
        {
            return teams[uid];
        }
        else
        {
            throw new Error('Unable to retrieve a team by (uid:'+ uid +')');
        }
    }
    static update(uid, data)
    {
        if(teams[uid] != null)
        {
            const team = teams[uid];
            
            Object.assign(team, data);
        }
        else
        {
            throw new Error('Unable to retrieve a team by (uid:'+ tuid +')');
        }
    }
    static delete(uid)
    {
        if(teams[uid] != null)
        {
            delete teams[uid];
        }
        else
        {
            throw new Error('Unable to retrieve a team by (uid:'+ tuid +')');
        }
    }
}
module.exports = teamService;