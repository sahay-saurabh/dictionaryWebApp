const express=require('express');
const app=express();
const ejs=require('ejs');
const googleDictionaryApi=require('google-dictionary-api');
app.set('view engine','ejs');
app.use(express.urlencoded({extended:true}));
app.use(express.static('public'));
var meaning,example,synonyms=[];
app.get('/',(req,res)=>{
    res.render('home')
   
})


app.post('/',(req,res)=>{
    const word=req.body.word;
    googleDictionaryApi.search(word, 'en')
    .then(results=>{
    meaning=results[0].meaning.noun[0].definition;
    example=results[0].meaning.noun[0].example;
    synonyms=results[0].meaning.noun[0].synonyms;
    // console.log(results[0].meaning.noun[0].definition)
    // console.log(results[0].meaning)
    res.render('dictionary',{word:word,meaning:meaning,example:example,synonyms:synonyms});
    })
    .catch(error=>{
    console.log(error)
    })
    // res.render('dictionary',{word:word,meaning:meaning,example:example,synonyms:synonyms});
})

app.listen(3000,console.log('server started on port 3000'));