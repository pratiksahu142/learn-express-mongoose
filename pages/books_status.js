let BookInstance = require('../models/bookinstance');
let Book = require('../models/book');

exports.show_all_books_status = async function (res) {

    try {
            const availableBooks = await BookInstance.find({ status: 'Available' }).populate({
                path: 'book',
                select: 'title'
            });
            const uniqueTitles = new Set();
            const formattedBooks = availableBooks.reduce((acc, bookInstance) => {
                const title = bookInstance.book.title;
                if (!uniqueTitles.has(title)) {
                    acc.push({ title: title, status: bookInstance.status });
                    uniqueTitles.add(title);
                }
                return acc;
            }, []);
            res.json(formattedBooks);
        } catch (err) {
            res.status(500).json({ message: err.message });
        }

 };