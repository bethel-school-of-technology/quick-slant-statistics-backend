class teamModel
{
    constructor(uid, team_name, division, wins, losses)
    {
        this.uid = uid;
        this.team_name = team_name;
        this.division = division;
        this.wins = wins;
        this.losses = losses;
    }
}
module.exports = teamModel;