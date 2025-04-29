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
document.getElementById("addMemberBtn").addEventListener("click", AddNewInputField)

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
    inputCounter++

    // ezen belülre jönnek majd a plussz input sorok
    const baseDataContainer = document.getElementById("members")

    // create row element
    const rowContainer = document.createElement("div")
    //set classes
    rowContainer.setAttribute("class", "row")
    rowContainer.classList.add("mb-2")
    rowContainer.classList.add("align-items-center")

    // create name input
    const nameInputDiv = document.createElement("div")
    nameInputDiv.setAttribute("class", "col-md-7")
    const nameInput = document.createElement("input")
    nameInput.setAttribute("type", "text")
    nameInput.setAttribute("class", "form-control")
    nameInput.setAttribute("name", "name-"+inputCounter)
    nameInput.setAttribute("placeholder", "Név")
    nameInput.setAttribute("id", "name-"+inputCounter)

    // Add name input to the base
    nameInputDiv.appendChild(nameInput)
    rowContainer.appendChild(nameInputDiv)

    // create age input
    const ageInputDiv = document.createElement("div")
    ageInputDiv.setAttribute("class", "col-md-3")
    const ageInput = document.createElement("input")
    ageInput.setAttribute("type", "number")
    ageInput.setAttribute("class", "form-control")
    ageInput.setAttribute("name", "age-"+inputCounter)
    ageInput.setAttribute("placeholder", "Életkor")
    ageInput.setAttribute("id", "age-"+inputCounter)
    ageInput.setAttribute("min", "0")

    // add age input to the base
    ageInputDiv.appendChild(ageInput)
    rowContainer.appendChild(ageInputDiv)

    // create delete buttons
    const deleteBtnDiv = document.createElement("div")
    deleteBtnDiv.setAttribute("class", "col-md-2")
    deleteBtnDiv.classList.add("d-flex")
    deleteBtnDiv.classList.add("justify-content-end")
    const deleteBtn = document.createElement("button")
    deleteBtn.setAttribute("type", "button")
    deleteBtn.setAttribute("class", "btn")
    deleteBtn.classList.add("btn-danger")
    deleteBtn.classList.add("btn-sm")
    deleteBtn.classList.add("delete-row")
    deleteBtn.setAttribute("id", "delete-"+inputCounter)
    deleteBtn.innerHTML = "Törlés"

    // add delete buttons to the base
    deleteBtnDiv.appendChild(deleteBtn)
    rowContainer.appendChild(deleteBtnDiv)

    baseDataContainer.appendChild(rowContainer)
}