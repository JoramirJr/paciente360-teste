const express = require('express')
const cors = require('cors')

const app = express()

app.use(express.json())
app.use(cors())

const db = require("knex")({
    client: "pg",
    connection: {
        host: "localhost",
        user: "postgres",
        password: "postgres",
        database: "postgres"
    }
})

app.get('/data', async (req, res) => {

    try {

        const people = await db.select("*").from("pessoa").then(rows => rows)

        const profs = await Promise.all(people.map(async person => {

            return db.select("*").from("profissao").where({ prof_id: person.prof_id })

        }))

        // res.send([
        //     { prof: profs[0][0] },
        //     { prof: profs[1][0] },
        // ])

        res.send(people.map((person, index) => ({ ...person, prof: profs[index][0] })))

    } catch (e) {

        console.log(e)

        res.sendStatus(500).send()

    }

})

app.get('/data/:id', async (req, res) => {

    try {

        const response = await db("pessoa").where({ pes_id: req.params.id })

        res.send(response)

    } catch (e) {

        console.log(e)

        res.sendStatus(500).send()

    }

})

app.get('/profs', async (req, res) => {

    try {

        const profs = await db.select("*").from("profissao").then(rows => rows)

        res.send(profs)

    } catch (e) {

        console.log(e)

        res.sendStatus(500).send()

    }


})

app.post('/data', async (req, res) => {

    try {

        // const prof = await db.from("profissao").select("*").where("id", prof_id).first()

        const response = await db.insert({ ...req.body }).into("pessoa").returning("*").then(rows => rows[0])

        res.send(response)

    } catch (e) {

        console.log(e)

        res.sendStatus(500).send()

    }

})

app.put('/data/:id', async (req, res) => {

    try {

        await db("pessoa").where({ pes_id: req.params.id }).update({ ...req.body })

        res.status(204).end()

    } catch (e) {

        console.log(e)

        res.sendStatus(500).send()

    }

})

app.delete('/data/:id', async (req, res) => {

    try {

        await db("pessoa").where({ pes_id: req.params.id }).delete()

        res.status(204).end()

    } catch (e) {

        console.log(e)

        res.status(500).send()

    }

})

app.set("db", db)

app.listen(3001, () => console.log('Server is Running'))