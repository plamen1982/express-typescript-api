import express from 'express';
import { Request, Response } from 'express';
import { body, validationResult } from 'express-validator';

import * as AuthorService from './author.service';

export const authorRouter = express.Router();

//GET all authors
authorRouter.get('/', async (request: Request, response: Response) => {
    try{
        const authors = await AuthorService.listAuthors();
        return response.status(200).json(authors);
    } catch(error: any) {
        return response.status(500).json(error.message)
    }
})

//GET author by id
authorRouter.get('/:id', async (request: Request, response: Response) => {

    const id: number = parseInt(request.params.id, 10);

    try {
        const author = await AuthorService.getAuthorById(id);
        if(author) {
            return response.status(200).json(author);
        }
        return response.status(404).json('No such author found');
    }

    catch(error: any) {
        return response.status(500).json(error.message);
    }
})

/**
 * @POST
 * @description creating a new author by first and last name
 * */ 

authorRouter.post(
    '/', 
    body("firstName").isString(), 
    body("lastName").isString(), 
    async(request: Request, response: Response) => {
        const errors = validationResult(request);

        if(!errors.isEmpty()) {
            response.status(400).json({ errors: errors.array() })
        };

        try {
            const author = request.body;
            const newAuthor = await AuthorService.createAuthor(author);
            return response.status(201).json(newAuthor);
        }

        catch(error: any) {
            return response.status(500).json(error.message);
        }
})

/**
 * @PUT
 * @description updating an author first and last name by authors id
 * */ 

authorRouter.put(
    '/:id',
    body("firstName").isString(),
    body("lastName").isString(),
    async(request: Request, response: Response) => {
        const errors = validationResult(request);
        if(!errors.isEmpty()) {
            return response.status(400).json({ errors: errors.array() })
        }

        const id: number = parseInt(request.params.id, 10);

        try {
            const author = request.body;
            const updatedAuthor = await AuthorService.updateAuthor(author, id);
            return response.status(200).json(updatedAuthor);
        }

        catch(error: any) {
            return response.status(500).json(error.message);
        }

    }
);

authorRouter.delete('/:id', async (request: Request, response: Response) => {
    const id: number = parseInt(request.params.id, 10)
    try{
        const deletedAuthor = await AuthorService.deleteAuthor(id);
        return response.status(200).json(`This is author:MR. ${deletedAuthor.lastName} is no more existing our DB`);
    } catch(error: any) {
        return response.status(500).json(error.message)
    }
});