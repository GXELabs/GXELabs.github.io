const express = require('express');
const bodyParser = require('body-parser');
const multer = require('multer');
const path = require('path');
const session = require('express-session');

const app = express();
const PORT = process.env.PORT || 3003; // Change the port number here

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));

app.use(session({
    secret: 'your-secret-key',
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false }
}));

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'public/uploads/');
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname));
    }
});
const upload = multer({ storage: storage });

let articles = [];

// Dummy user data for demonstration
const users = {
    editor: { password: 'password', role: 'editor' }
};

// Middleware to check if user is authenticated
function isAuthenticated(req, res, next) {
    if (req.session.user) {
        next();
    } else {
        res.redirect('/login');
    }
}

// Middleware to check if user is an editor
function isEditor(req, res, next) {
    if (req.session.user && req.session.user.role === 'editor') {
        next();
    } else {
        res.redirect('/login');
    }
}

// Endpoint to get all articles
app.get('/articles', (req, res) => {
    res.json(articles);
});

// Endpoint to add a new article
app.post('/admin/add', isEditor, upload.single('file'), (req, res) => {
    const article = {
        title: req.body.title,
        description: req.body.description,
        image: `/uploads/${req.file.filename}`,
        file: `/uploads/${req.file.filename}`
    };
    articles.push(article);
    res.redirect('/admin'); // Redirect back to the admin page after submission
});

// Endpoint to edit an article
app.post('/admin/edit/:id', isEditor, upload.single('file'), (req, res) => {
    const articleId = parseInt(req.params.id, 10);
    const article = articles[articleId];
    if (article) {
        article.title = req.body.title || article.title;
        article.description = req.body.description || article.description;
        if (req.file) {
            article.image = `/uploads/${req.file.filename}`;
            article.file = `/uploads/${req.file.filename}`;
        }
        res.redirect('/admin');
    } else {
        res.status(404).send('Article not found');
    }
});

// Serve the admin page
app.get('/admin', isEditor, (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'admin.html'));
});

// Serve the login page
app.get('/login', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'login.html'));
});

// Handle login
app.post('/login', (req, res) => {
    const { username, password } = req.body;
    const user = users[username];
    if (user && user.password === password) {
        req.session.user = { username: username, role: user.role };
        res.redirect('/admin');
    } else {
        res.redirect('/login');
    }
});

// Logout endpoint
app.get('/logout', (req, res) => {
    req.session.destroy();
    res.redirect('/');
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
