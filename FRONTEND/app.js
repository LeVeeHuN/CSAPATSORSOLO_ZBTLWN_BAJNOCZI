let inputCounter = 0

class OutBoundData
{
    constructor(teamsCount, names, ages)
    {
        this.TeamsCount = Number(teamsCount)
        this.Names = names
        this.Ages = ages.map(Number)
    }
}

// Event hozzáadása a gombhoz
document.getElementById("saveChanges").addEventListener("click", SendDataToServer)
document.getElementById("addMemberBtn").addEventListener("click", AddNewInputField)

function GetInputFieldsValues()
{
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
        const nameInput = document.getElementById(nameBase+i)
        const ageInput = document.getElementById(ageBase+i)
        if (nameInput != null && ageInput != null)
        {
            namesContainer.push(nameInput.value)
            agesContainer.push(ageInput.value)
        }
    }

    const outBoundDataObject = new OutBoundData(teamsCount, namesContainer, agesContainer)
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
    rowContainer.setAttribute("id", "row-"+inputCounter)
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
    deleteBtn.addEventListener("click", DeleteRow)

    // add delete buttons to the base
    deleteBtnDiv.appendChild(deleteBtn)
    rowContainer.appendChild(deleteBtnDiv)

    baseDataContainer.appendChild(rowContainer)

    CheckIfDeleteRowIsPossible()
}

function DeleteRow(event)
{
    const rowId = event.target.id.split("-")[1]

    // Delete specified row
    const parentContainer = document.getElementById("members")
    const rowToDelete = document.getElementById("row-"+rowId)
    parentContainer.removeChild(rowToDelete)

    CheckIfDeleteRowIsPossible()
}

function CheckIfDeleteRowIsPossible()
{
    // Ha csak 2 row van, akkor kikapcsoljuk a törlés gombokat, egyébként aktiváljuk őket
    const rowsNumber = document.getElementById("members").childElementCount

    // get all the buttons
    const btns = document.getElementsByClassName("delete-row")

    if (rowsNumber <= 2)
    {
        // Disable buttons
        for (let i = 0; i < btns.length; i++)
        {
            btns[i].disabled = true
        }
    }
    else
    {
        // Enable buttons
        for (let i = 0; i < btns.length; i++)
        {
            btns[i].disabled = false
        }
    }
}

function Reset()
{
    const membersParent = document.getElementById("members")
    const resultsParent = document.getElementById("teamClusterContainer")

    while (resultsParent.firstChild)
    {
        resultsParent.removeChild(resultsParent.firstChild)
    }

    while (membersParent.firstChild)
    {
        membersParent.removeChild(membersParent.firstChild)
    }

    for (let i = 0; i < 2; i++)
    {
        AddNewInputField()
    }
}

function SendDataToServer(event)
{
    // By doing this the page no longer reloads after submitting the form
    event.preventDefault()

    // Get the data and convert it to json
    const outBoundDataObject = GetInputFieldsValues()
    const jsonString = JSON.stringify(outBoundDataObject)
    Reset()

    fetch("http://localhost:5008/teamcluster", {
        method: "POST",
        headers: {
            "Content-Type": "application/json; charset=UTF-8"
        },
        body: jsonString
    })
    .then(response => response.json())
    .then(responseData => {
        // Adatok megjelenítése
        const teams = responseData.teams
        const teamsContainer = document.getElementById("teamClusterContainer")

        // átiterálok az összes csapaton
        for (let i = 0; i < teams.length; i++)
        {
            const teamContainer = document.createElement("div")
            teamContainer.setAttribute("class", "p-3")
            teamContainer.classList.add("rounded")
            teamContainer.classList.add("shadow")
            teamContainer.style.cssText = "background: " + GetRandomBrightColor() + "; min-width: 250px; max-width: 300px;"

            // add team name
            const teamName = document.createElement("h5")
            teamName.setAttribute("class", "mb-3")
            teamName.classList.add("text-black")
            teamName.innerHTML = "Csapat: " + (i+1)
            teamContainer.appendChild(teamName)

            // add list for members
            const list = document.createElement("ul")
            list.setAttribute("class", "list-group")
            list.classList.add("list-group-flush")

            // add members to list
            for (let j = 0; j < teams[i].members.length; j++)
            {
                const memberItem = document.createElement("li")
                memberItem.setAttribute("class", "list-group-item")
                memberItem.classList.add("bg-transparent")
                memberItem.innerHTML = teams[i].members[j].name + " (" + teams[i].members[j].age + ")"
                list.appendChild(memberItem)
            }
            teamContainer.appendChild(list)
            teamsContainer.appendChild(teamContainer)
        }
    })
    .catch(error => {
        console.error("Error: " + error)
    })
}

function GetRandomBrightColor() {
    // Hue: 0-360 (full spectrum)
    // Saturation: 80-100% (vivid)
    // Lightness: 60-70% (bright)
    const hue = Math.floor(Math.random() * 361);
    const saturation = Math.floor(Math.random() * 21) + 80; // 80-100%
    const lightness = Math.floor(Math.random() * 11) + 60;  // 60-70%
    return `hsl(${hue}, ${saturation}%, ${lightness}%)`;
}
  
  







// Initialize page (add 2 input row)
Reset()