Example GraphiQL Queries

Adding New Logo: <br />
mutation{
  addLogo(
    text: "CSE316 Logo",
    color: "#86a3b0",
    fontSize: 45,
    backgroundColor: "#b8c8e9",
    borderColor: "#625070",
    borderRadius: 45,
    borderWidth: 30,
    padding: 45,
    margin: 50
  ) {
    lastUpdate
  }
}

Getting All Logos: <br />
{
  logos{
    _id
    text
    color
    fontSize
    backgroundColor
    borderColor
    borderRadius
    borderWidth
    padding
    margin
    lastUpdate
  }
}

Getting a Single Logo:<br />
{
  logo(id: "5e8e2f65d64f5414b48e48a5"){
    _id
    text
    color
    fontSize
    backgroundColor
    borderColor
    borderRadius
    borderWidth
    padding
    margin
  }
}

(It should be noted that the id will vary depending on the logo you want to get.)

Updating a Logo: <br />
mutation{
  updateLogo(
    id: "5e8e2f65d64f5414b48e48a5"
    text: "CSE316 Logo Improved",
    color: "#b8c8e9",
    fontSize: 44,
    backgroundColor: "#625070",
    borderColor: "#86a3b0",
    borderRadius: 10,
    borderWidth: 50,
    padding: 20,
    margin: 70
  ) {
    lastUpdate
  }
}

Removing a Logo: <br />
mutation{
  removeLogo (id: "5e8e2f65d64f5414b48e48a5"){
    _id
  }
}

(It should be noted that the id will vary depending on the logo you want to remove.)