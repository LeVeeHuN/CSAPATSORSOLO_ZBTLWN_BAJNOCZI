let inputCounter = 2

class OutBoundData
{
    constructor(teamsCount, names, ages)
    {
        this.TeamsCount = teamsCount
        this.Names = names
        this.Ages = ages.map(Number)
    }
}

// Event hozzáadása a gombhoz
document.getElementById("saveChanges").addEventListener("click", () => {console.log("Nothing to see yet")})

function GetInputFieldsValues(event)
{
    // By doing this the page no longer reloads after submitting the form
    event.preventDefault()

    // Átiterálok az összes számon 1-től az inputCounter értékéig (belevéve azt) és kiszedem az összes nevet és kort
    // Ezeken kívül a csapatok számát is kiszedem
    const namesContainer = []
    const agesContainer = []

    // Csapatok számának megszerzése
    let teamsCount = document.getElementById("teamCount").value

    // Nevek és korok megszerzése
    const nameBase = "name-"
    const ageBase = "age-"
    for (let i = 1; i <= inputCounter; i++)
    {
        namesContainer.push(document.getElementById(nameBase+i).value)
        agesContainer.push(document.getElementById(ageBase+i).value)
    }

    const outBoundDataObject = new OutBoundData(teamsCount, namesContainer, agesContainer)
    // console.log(outBoundDataObject)
    return outBoundDataObject
}

function AddNewInputField()
{
    // ezen belülre jönnek majd a plussz input sorok
    const baseDataContainer = document.getElementById("members")

}