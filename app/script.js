const input = document.querySelector('#searchInput')
const userList = document.querySelector('#users')

let users = []

window.addEventListener('DOMContentLoaded', async () => {
    userList.innerHTML = "<small>loading... </small>"
    const data = await loadUsers();
    users = data.data
    renderUsers(users)
})

async function loadUsers (){
    const response = await fetch('https://fakerapi.it/api/v1/users?_quantity=80')
    return await response.json()
}

input.addEventListener('keyup', e => {
    const newUsers = users.filter(user=> `${user.firstname.toLowerCase()} ${user.lastname.toLowerCase()}`.includes(input.value.toLowerCase()))
    renderUsers(newUsers)
})

const createUserItems = users => users.map(user => `<li class="bgUsers bgUsers:hover">${user.firstname} ${user.lastname}</li>`).join('')

function renderUsers(users){
    const itemsString = createUserItems (users)
    userList.innerHTML = itemsString;
}