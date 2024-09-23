class EventDatabase {

  constructor() {
    this._db_local_name = "eventsystem"
    this._people = []
    this._activities = []
    this._events = []
    this._registrations = []
  }

  addPerson(p) {
    console.log(`addPerson(${p.name}) `)
    this._people.push(p)
  }

  getPerson(pid) { return this._people.find(e => e.id === pid) }

  getPeople() {
    console.log("getPeople()")
    return this._people
  }

  addEvent(e) {
    this._activities.push(e)
  }
  loadData(d) {
    const jp = JSON.parse(d)
  
    if (jp._people) { this._people = jp._people }
    if (jp._activities) { this._activities = jp._activities }

  }
  loadDatabaseFromLocalStorage() {
    console.log("loadDatabaseFromLocalStorage()")
    const stored_db = localStorage.getItem(this._db_local_name)

    if (stored_db) {
      this.loadData(stored_db)
    }
  }
  toJson() { return JSON.stringify(this) }

  toLocalStorage() {
    localStorage.setItem(this._db_local_name, this.toJson())
  }
}

class Person {
  constructor(start_number, name, house, team) {
    this._id = "p_" + cerealnum.next
    this._sn = start_number
    this._name = name
    this._house = house
    this._team = team
    this._active = true
  }

  get id() { return this._id }
  get name() { return this._name }

}

function download_db(database, name) {
  // Download database as JSON file.

  let json_data = database.toJson()
  let filename = name != "" ? name : "eventdatabase"

  var el = document.createElement("a")
  let dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(json_data)
  el.setAttribute("href", dataStr)
  el.innerHTML = "Click here to download file " + filename + ".json"
  el.setAttribute("download", filename + ".json")
  document.querySelector("#dl").replaceWith(el)
}

const cerealnum = {
  _n: 100,
  get next() { return this._n++ },
}

function display_users() {

  const n = document.querySelector("tr persons_row")
  
  const m = document.createElement("td")
  const users = db.getPeople()
  for (u in users) {
    console.log(u.name)
    const m = document.createElement("td")
    m.value = u.start_number
    n.appendChild(m)
  }
  
}

function add_user() {

  const n = document.querySelector("#add_name")

  console.log(n.value)
  if (n.value != "") {
    db.addPerson(new Person(33, n.value, "hkhk", "hjkh", "yy"))
    db.toLocalStorage()
  }
}