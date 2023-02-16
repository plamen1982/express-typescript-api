import { db } from  "../src/utils/db.server";

type Author = {
    firstName: string;
    lastName: string;
}

type Book = {
    title: string;
    isFiction: boolean;
    datePublished: Date;
}

/**
 * @function 
 * @name seed
 * @description populate the database(Author and Book) with some dummy data, and return some record for testing purposes
 */

async function seed() {

    await Promise.all(
        getAuthors().map((author) => {
            /**
             *  for every author return from our seed function connect with the database with the db(PrismClient)
             *  when connected seed the data object(he will not be considered as a field from the database)
             *  create these records in this case in Author table in the database
             */
            return db.author.create({
                data: {
                    firstName: author.firstName,
                    lastName: author.lastName
                }
            })
        })
        
    )

    await Promise.all(
        getBooks().map((book, index) => {
            const { title, isFiction, datePublished } = book;
            return db.book.create({
                data: {
                    title,
                    isFiction,
                    datePublished,
                    authorId: index + 1
                }
            })
        })
    )
    /**
     * @returns single record from the database of author, by single criteria
     */

    const author = await db.author.findFirst({
        where: {
            firstName: "Yuval Noah"
        }
    })
}

seed();
/**
 * @function
 * @name getBooks
 * @returns Array of objects from type Book
 */

function getBooks(): Array<Book> {
    return [
        {
            title: "Sapiens",
            isFiction: false,
            datePublished: new Date()
        },
        {
            title: "Homo Deus",
            isFiction: false,
            datePublished: new Date()
        },
        {
            title: "The Ugly Duckling",
            isFiction: false,
            datePublished: new Date()
        }
    ]
}

/**
 * @function
 * @name getAuthors
 * @returns Array of objects from type Author
 */

function getAuthors(): Array<Author> {
    return [
        {
            firstName: "John",
            lastName: "Doe"
        },
        {
            firstName: "William",
            lastName: "Shakespeare"
        },
        {
            firstName: "Yuval Noah",
            lastName: "Harari"
        }
    ]
}