const express = require('express')
const app = express(); 

//middlewares
app.use(express.json());

let courses = [
    {
        id: 1, 
        name: "php"
    }, 
    {
        id: 2, 
        name: "java"
    }, 
    {
        id: 3, 
        name: "node"
    }
]


app.get('/', (req, res)=>{
    res.send("this is working now")
})

app.get('/courses', (req, res)=>{
    res.json(courses)
})

// getting an individual element 
app.get('/courses/:id', (req, res)=>{
    // to find the items in the array based on id
    const course = courses.find(c => c.id === +req.params.id)
    // checking if the courses exists of not
    if (!course) {
        res.status(404).send('courses is not available in the array try another one')
    }
    res.json(course);
})

app.post('/courses', (req, res)=>{
    const postCourse = req.body;

    courses.push({ id: courses.length + 1 , ...postCourse})
    res.send(postCourse)

})

app.put('/courses/:id', (req, res)=>{
    // finding the id of the element and tracing it to the object itself 
    const putCourse = courses.find(c => c.id === +req.params.id)
    if (!putCourse) {
        res.status(404).json({
            status: false, 
            messag: "404!!! course not found. update cannot be possible",
            error: "error error"
        })
    }

    putCourse.name = req.body.name
    res.send({
        status: true, 
        data: putCourse
    })
})

app.delete('/courses/:id', (req, res)=>{
    // finding the user id 
    const { id } = req.params
    const del_course = courses.find(c => c.id === +id); 

    if (!del_course) res.status(404).send({
        status: false, 
        data: null,
        message: "course id inserted cannot be founf in the array list"
    })

    // filtering the whole array and taking the object out 
    const index = courses.indexOf(del_course)
    courses.splice(index, 1);

    res.send({
        status: true, 
        data: del_course, 
        message:  `${id} delete from the array succesfully`
    })

})


app.listen(3000, ()=>{
    console.log('server runnnig on locahost 3000')
})
